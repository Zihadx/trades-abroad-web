"use client";
import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

const TEXT = "Every skyline, every power grid, every pipeline and every road began with skilled hands. The world is short of exactly those hands, and people who have them deserve to see how far they can go.";
const HOT = new Set(["skilled", "hands", "far", "go"]);
function Word({ w, p, a, b }: { w: string; p: MotionValue<number>; a: number; b: number }) {
  const o = useTransform(p, [a, b], [0.16, 1]);
  const hot = HOT.has(w.toLowerCase().replace(/[^a-z]/g, ""));
  return <motion.span style={{ opacity: o }} className={`mr-[0.28em] inline-block ${hot ? "italic text-lime" : ""}`}>{w}</motion.span>;
}
export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 45%"] });
  const words = TEXT.split(" ");
  return (
    <section ref={ref} className="relative py-32 md:py-48">
      <div className="container-x">
        <span className="eyebrow">Our belief</span>
        <p className="mt-8 max-w-5xl font-display text-[clamp(1.9rem,4.8vw,4.4rem)] font-medium leading-[1.12] tracking-tight">
          {words.map((w, i) => { const a = i / words.length; return <Word key={i} w={w} p={scrollYProgress} a={a} b={Math.min(1, a + 2 / words.length)} />; })}
        </p>
      </div>
    </section>
  );
}
