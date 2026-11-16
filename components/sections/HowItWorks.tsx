"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { icons } from "@/lib/icons";
import { steps } from "@/lib/data";

export default function HowItWorks({ standalone = false }: { standalone?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <section className={`bg-ink2 ${standalone ? "pb-24" : "py-24"}`}>
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        {!standalone && (
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow">How It Works</span>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-tight">Six steps from curiosity to career.</h2>
            <p className="mt-4 max-w-sm text-mute">A transparent journey. Each stage is explained before you take it.</p>
          </div>
        )}
        <div ref={ref} className={`relative pl-14 ${standalone ? "lg:col-span-2 max-w-3xl" : ""}`}>
          <div className="absolute bottom-6 left-5 top-6 w-px bg-white/10" />
          <motion.div className="absolute bottom-6 left-5 top-6 w-px origin-top bg-lime" style={{ scaleY: reduce ? 1 : fill }} />
          {steps.map((s, i) => { const I = icons[s.icon]; return (
            <motion.div key={s.t} initial={reduce ? false : { opacity: 0.25, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ margin: "-35% 0px -35% 0px" }} transition={{ duration: 0.5 }} className="relative pb-14 last:pb-0">
              <span className="absolute -left-14 top-0 grid h-10 w-10 place-items-center rounded-full border border-lime/50 bg-ink text-lime"><I size={18} /></span>
              <span className="font-display text-sm tracking-widest text-lime">0{i + 1}</span>
              <h3 className="font-display text-2xl font-semibold">{s.t}</h3><p className="mt-1 max-w-md text-mute">{s.d}</p>
            </motion.div>); })}
        </div>
      </div>
    </section>
  );
}
