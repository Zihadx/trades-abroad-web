"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "sent">("idle");
  const [error, setError] = useState("");
  const f = "w-full rounded-2xl border border-white/15 bg-surface px-4 py-3 transition-colors focus:border-lime focus:outline-none";
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); setState("loading");
    const d = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...d, kind: "contact" }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error ?? "Something went wrong.");
      setState("sent");
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong."); setState("idle"); }
  }
  if (state === "sent") return <div role="status" className="glass rounded-3xl p-10 text-center"><CheckCircle2 className="mx-auto text-lime" size={36} /><h2 className="mt-4 font-display text-2xl font-semibold">Message received.</h2><p className="mt-2 text-mute">Thank you. We’ll get back to you as soon as we can.</p></div>;
  return (
    <form onSubmit={submit} className="grid gap-4" noValidate={false}>
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <label className="grid gap-2 text-sm">Name<input name="name" required minLength={2} maxLength={120} autoComplete="name" className={f} /></label>
      <label className="grid gap-2 text-sm">Email<input name="email" required type="email" autoComplete="email" className={f} /></label>
      <label className="grid gap-2 text-sm">I am a<select name="role" className={f}><option>Skilled worker</option><option>Employer</option><option>Other</option></select></label>
      <label className="grid gap-2 text-sm">Message<textarea name="message" required minLength={10} maxLength={4000} rows={5} className={f} /></label>
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <button disabled={state === "loading"} className="btn btn-lime w-fit disabled:opacity-60">{state === "loading" ? "Sending…" : "Send message"} <ArrowRight size={16} /></button>
    </form>
  );
}
