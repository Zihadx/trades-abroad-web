"use client";
import { useState } from "react";
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const f = "w-full rounded-2xl border border-white/15 bg-surface px-4 py-3 focus:border-lime focus:outline-none";
  if (sent) return <div className="glass rounded-3xl p-10 text-center"><h2 className="font-display text-2xl font-semibold">Thanks — demo submission received.</h2><p className="mt-2 text-mute">This form is not connected to a backend yet, so nothing was sent.</p></div>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-4">
      <label className="grid gap-2 text-sm">Name<input required className={f} /></label>
      <label className="grid gap-2 text-sm">Email<input required type="email" className={f} /></label>
      <label className="grid gap-2 text-sm">I am a<select className={f}><option>Skilled worker</option><option>Employer</option></select></label>
      <label className="grid gap-2 text-sm">Message<textarea required rows={5} className={f} /></label>
      <button className="btn btn-lime w-fit">Send message</button>
    </form>
  );
}
