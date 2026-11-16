"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Globe2Icon } from "./icons-local";
import HeroGlobe from "./HeroGlobe";
import Photo from "./Photo";
import { destinations } from "@/lib/data";
import { img } from "@/lib/images";

const ease = [0.22, 1, 0.36, 1] as const;
export default function Hero() {
  const [active, setActive] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const globeY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const cur = destinations.find((d) => d.slug === active);
  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden pt-24">
      <div className="absolute inset-0 -z-20 bg-ink" />
      <Photo src={img.hero} label="Skilled trades at work" parallax priority className="absolute inset-0 -z-10 opacity-40" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_72%_42%,rgba(200,241,105,.14),transparent_65%),linear-gradient(90deg,#080b09_8%,rgba(8,11,9,.55)_55%,rgba(8,11,9,.2))]" />
      <div className="beam absolute -top-1/4 left-0 -z-10 h-[150%] w-1/5 bg-gradient-to-r from-transparent via-lime/15 to-transparent" />
      <motion.div style={{ y: globeY }} className="absolute inset-y-0 right-[-14%] z-0 w-[88%] sm:right-[-6%] sm:w-[64%]"><HeroGlobe active={active} onSelect={setActive} /></motion.div>
      <motion.div style={{ y: textY }} className="container-x pointer-events-none relative z-10 flex min-h-[calc(100svh-6rem)] flex-col justify-center pb-44 pt-10">
        <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="glass mb-7 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs"><Globe2Icon /> International Skilled Trades Recruitment <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" /></motion.span>
        <h1 className="font-display text-[clamp(3.1rem,9vw,8.4rem)] font-semibold leading-[0.9] tracking-[-0.03em]">
          <span className="block overflow-hidden"><motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.1 }}>Skilled Hands.</motion.span></span>
          <span className="block overflow-hidden pb-2"><motion.span className="block bg-gradient-to-r from-lime via-[#e9ffb0] to-lime bg-clip-text italic text-transparent" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.25 }}>Global Future.</motion.span></span>
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }} className="mt-6 max-w-md text-lg text-fg/75">Discover international opportunities for skilled trades professionals and connect with employers worldwide.</motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75, ease }} className="pointer-events-auto mt-9 flex flex-wrap gap-3">
          <Link href="/jobs" className="btn btn-lime">Explore Opportunities <ArrowRight /></Link>
          <Link href="/employers" className="btn btn-ghost">Hire Skilled Professionals</Link>
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1, ease }} className="glass float pointer-events-auto absolute inset-x-5 bottom-6 z-10 rounded-3xl p-4 md:left-auto md:right-8 md:w-[min(640px,60vw)]">
        <div className="mb-3 flex items-center justify-between px-1 text-sm">
          <span className="flex items-center gap-2 font-medium"><i className="h-2 w-2 animate-ping rounded-full bg-lime" />Explore Top Destinations</span>
          <span className="hidden text-xs text-mute sm:block" aria-live="polite">{cur ? cur.tagline : "Hover to trace the route on the globe"}</span>
        </div>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {destinations.map((d) => (
            <li key={d.slug}>
              <Link href={`/destinations/${d.slug}`} onMouseEnter={() => setActive(d.slug)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(d.slug)} onBlur={() => setActive(null)}
                className={`flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-xs transition-all ${active === d.slug ? "-translate-y-1 border-lime bg-lime/10 text-lime" : "border-white/10 hover:border-white/30"}`}>
                <b className="font-display text-base tracking-wider">{d.code}</b><span className="truncate">{d.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
