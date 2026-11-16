"use client";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Tries each src in order; if all fail it shows a styled gradient, never a blank box. */
export default function Photo({ src, label, className = "", parallax = false, priority = false }: { src: string | string[]; label: string; className?: string; parallax?: boolean; priority?: boolean }) {
  const list = Array.isArray(src) ? src : [src];
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden bg-gradient-to-br from-[#1d3022] via-surface to-ink ${className}`}>
      <div className="grid-bg absolute inset-0 opacity-50" />
      <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.2em] text-mute/70">{label}</span>
      {i < list.length && (
        <div className="absolute inset-0 overflow-hidden transition-transform duration-[900ms] ease-out group-hover:scale-110">
          <motion.img key={list[i]} src={list[i]} alt={label} loading={priority ? "eager" : "lazy"} referrerPolicy="no-referrer" onError={() => setI((n) => n + 1)}
            initial={reduce ? false : { scale: 1.18, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            style={parallax && !reduce ? { y, height: "124%", top: "-12%" } : undefined} className="absolute inset-0 h-full w-full object-cover" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
    </div>
  );
}
