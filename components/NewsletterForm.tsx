"use client";
import { useState } from "react";
export default function NewsletterForm() {
  const [s, setS] = useState<"idle" | "loading" | "sent" | "error">("idle");
  async function go(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setS("loading");
    const d = Object.fromEntries(new FormData(e.currentTarget));
    try { const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...d, kind: "newsletter" }) }); setS(r.ok ? "sent" : "error"); } catch { setS("error"); }
  }
  if (s === "sent") return <p role="status" className="mt-6 text-sm text-lime">You’re on the list. Thank you.</p>;
  return (
    <form onSubmit={go} className="mt-6" aria-label="Newsletter">
      <div className="flex gap-2">
        <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <label htmlFor="nl" className="sr-only">Email address</label>
        <input id="nl" name="email" type="email" required placeholder="Your email" className="min-w-0 flex-1 rounded-full border border-white/15 bg-transparent px-4 py-2.5 text-sm placeholder:text-mute focus:border-lime focus:outline-none" />
        <button disabled={s === "loading"} className="btn btn-lime !px-5 !py-2.5 !text-sm">{s === "loading" ? "…" : "Subscribe"}</button>
      </div>
      {s === "error" && <p role="alert" className="mt-2 text-xs text-red-300">Couldn’t subscribe. Check your email and try again.</p>}
    </form>
  );
}
