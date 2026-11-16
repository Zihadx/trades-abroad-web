import { NextResponse } from "next/server";

// Simple in-memory rate limit. On serverless/multi-instance hosting, replace with Redis/Upstash or your host's WAF.
const hits = new Map<string, { n: number; t: number }>();
const WINDOW = 10 * 60 * 1000, MAX = 6;
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const rec = hits.get(ip);
  if (rec && now - rec.t < WINDOW) { if (rec.n >= MAX) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 }); rec.n++; } else hits.set(ip, { n: 1, t: now });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (clean(body.company, 100)) return NextResponse.json({ ok: true }); // honeypot: bots fill this

  const kind = body.kind === "newsletter" ? "newsletter" : "contact";
  const email = clean(body.email, 200), name = clean(body.name, 120), role = clean(body.role, 40), message = clean(body.message, 4000);
  if (!emailOk(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  if (kind === "contact" && (name.length < 2 || message.length < 10)) return NextResponse.json({ error: "Please add your name and a short message." }, { status: 422 });

  const payload = { kind, name, email, role, message, at: new Date().toISOString() };
  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (hook) {
    try { const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); if (!r.ok) throw new Error(String(r.status)); }
    catch { return NextResponse.json({ error: "We couldn't deliver your message. Please try again." }, { status: 502 }); }
  } else console.log("[contact]", JSON.stringify(payload)); // no destination configured: logged only
  return NextResponse.json({ ok: true });
}
