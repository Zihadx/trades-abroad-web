"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/data";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/10 border-y border-white/10">
      {faqs.map((f, i) => (
        <div key={f.q}>
          <h3><button className="flex w-full items-center justify-between gap-4 py-6 text-left font-display text-xl" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? null : i)}>
            {f.q}<Plus size={20} className={`shrink-0 text-lime transition-transform ${open === i ? "rotate-45" : ""}`} /></button></h3>
          <AnimatePresence initial={false}>
            {open === i && <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="pb-6 text-mute">{f.a}</p></motion.div>}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
