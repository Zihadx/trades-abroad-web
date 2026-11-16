"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe2Icon } from "./icons-local";
import HeroGlobe from "./HeroGlobe";
import Photo from "./Photo";
import { destinations } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;
export default function Hero() {
  const [active, setActive] = useState<string | null>(null);
  const cur = destinations.find((d) => d.slug === active);
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden pt-24">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(70%_60%_at_75%_40%,rgba(200,241,105,.12),transparent_65%),linear-gradient(180deg,#080b09,#0b100c)]" />
      <Photo src="/images/hero/worker.jpg" label="Hero · skilled worker" className="absolute inset-y-0 right-0 -z-10 w-full opacity-50 [mask-image:linear-gradient(to_left,black_35%,transparent)] md:w-[60%]" />
      <div className="absolute -left-40 bottom-0 -z-10 h-[50vh] w-[40vw] -skew-x-[28deg] bg-gradient-to-t from-lime/30 to-transparent blur-2xl" />
      <div className="absolute inset-y-0 right-[-12%] z-0 w-[85%] sm:right-[-4%] sm:w-[62%]" aria-hidden={false}>
        <HeroGlobe active={active} onSelect={setActive} />
      </div>
      <div className="container-x pointer-events-none relative z-10 flex min-h-[calc(100svh-6rem)] flex-col justify-center pb-40 pt-10">
        <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="glass mb-7 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs"><Globe2Icon /> International Skilled Trades Recruitment <i className="h-1.5 w-1.5 rounded-full bg-lime" /></motion.span>
        <h1 className="font-display text-[clamp(3.1rem,9vw,8.4rem)] font-semibold leading-[0.9] tracking-[-0.03em]">
          <span className="block overflow-hidden"><motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.1 }}>Skilled Hands.</motion.span></span>
          <span className="block overflow-hidden pb-2"><motion.span className="block italic text-lime" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.25 }}>Global Future.</motion.span></span>
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }} className="mt-6 max-w-md text-lg text-mute">Discover international opportunities for skilled trades professionals and connect with employers worldwide.</motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75, ease }} className="pointer-events-auto mt-9 flex flex-wrap gap-3">
          <Link href="/jobs" className="btn btn-lime">Explore Opportunities <ArrowRight /></Link>
          <Link href="/employers" className="btn btn-ghost">Hire Skilled Professionals</Link>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1, ease }} className="glass pointer-events-auto absolute inset-x-5 bottom-6 z-10 rounded-3xl p-4 md:left-auto md:right-8 md:w-[min(640px,60vw)]">
        <div className="mb-3 flex items-center justify-between px-1 text-sm">
          <span className="font-medium">Explore Top Destinations</span>
          <span className="hidden text-xs text-mute sm:block" aria-live="polite">{cur ? cur.tagline : "Hover a destination to trace the route"}</span>
        </div>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {destinations.map((d) => (
            <li key={d.slug}>
              <Link href={`/destinations/${d.slug}`} onMouseEnter={() => setActive(d.slug)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(d.slug)} onBlur={() => setActive(null)}
                className={`flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-xs transition-all ${active === d.slug ? "border-lime bg-lime/10 text-lime" : "border-white/10 hover:border-white/30"}`}>
                <b className="font-display text-base tracking-wider">{d.code}</b><span className="truncate">{d.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
