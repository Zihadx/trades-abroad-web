"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Photo from "./Photo";
import { trades } from "@/lib/data";
import { tradeImg } from "@/lib/images";
import { icons } from "@/lib/icons";

export default function HorizontalTrades() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  useEffect(() => {
    const m = () => setDist(Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth));
    m(); window.addEventListener("resize", m);
    const t = setTimeout(m, 800); // after images/fonts settle
    return () => { window.removeEventListener("resize", m); clearTimeout(t); };
  }, []);
  return (
    <section ref={ref} className="relative h-[430vh]" aria-label="Skilled trades">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max items-stretch gap-6 pl-[6vw] pr-[10vw]">
          <div className="flex w-[min(520px,80vw)] shrink-0 flex-col justify-center pr-10">
            <span className="eyebrow">Skilled Trades</span>
            <h2 className="mt-4 font-display text-[clamp(3rem,6.5vw,6rem)] font-semibold leading-[0.95] tracking-tight">Ten trades.<br /><em className="text-lime">One horizon.</em></h2>
            <p className="mt-6 max-w-sm text-mute">Keep scrolling to travel through the crafts that build the world.</p>
          </div>
          {trades.map((t, i) => { const I = icons[t.icon]; return (
            <Link key={t.slug} href={`/trades/${t.slug}`} className="group relative h-[68vh] w-[min(440px,78vw)] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 transition-colors hover:border-lime/60">
              <Photo src={tradeImg[t.slug]} label={t.name} className="absolute inset-0" />
              <span className="absolute right-6 top-3 font-display text-[9rem] font-bold leading-none text-white/10">{String(i + 1).padStart(2, "0")}</span>
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink/60 text-lime backdrop-blur"><I size={22} /></span>
                <h3 className="mt-5 font-display text-4xl font-semibold">{t.name}</h3>
                <p className="mt-2 text-sm text-fg/80">{t.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">{t.skills.map((s) => <span key={s} className="glass rounded-full px-3 py-1 text-xs">{s}</span>)}</div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-lime">Explore <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>); })}
        </motion.div>
        <div className="absolute inset-x-[6vw] bottom-8 h-px bg-white/10"><motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-lime" /></div>
      </div>
    </section>
  );
}
