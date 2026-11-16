"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Photo from "./Photo";
import Reveal from "./Reveal";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  return <motion.div style={{ scaleX: x }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-lime" />;
}

export function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 180, damping: 18 }), sy = useSpring(ry, { stiffness: 180, damping: 18 });
  return (
    <motion.div className={className} style={reduce ? undefined : { rotateX: sx, rotateY: sy, transformPerspective: 900 }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); ry.set(((e.clientX - r.left) / r.width - 0.5) * 9); rx.set(-((e.clientY - r.top) / r.height - 0.5) * 9); }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}>{children}</motion.div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-ink2 py-5" aria-hidden>
      <div className="marquee-track flex w-max gap-12 font-display text-2xl tracking-wide text-fg/70">
        {row.map((t, i) => <span key={i} className="flex items-center gap-12">{t}<i className="h-2 w-2 rotate-45 bg-lime" /></span>)}
      </div>
    </div>
  );
}

export function Band({ src, eyebrow, title, cta, href }: { src: string[]; eyebrow: string; title: string; cta?: string; href?: string }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <section ref={ref} className="relative isolate flex min-h-[70vh] items-center overflow-hidden">
      <Photo src={src} label={eyebrow} parallax className="absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,11,9,.88),rgba(8,11,9,.25))]" />
      <div className="container-x py-24">
        <Reveal><span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,6.5vw,5.6rem)] font-semibold leading-[0.96] tracking-tight">{title}</h2>
          {cta && href && <Link href={href} className="btn btn-lime mt-8">{cta} <ArrowRight size={16} /></Link>}
        </Reveal>
      </div>
    </section>
  );
}
