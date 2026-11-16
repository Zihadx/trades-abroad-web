"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { destFacts, destinations, HUB, trades } from "@/lib/data";
import { isLand } from "@/lib/geo";

const W = 720, H = 360;
const px = (lon: number) => ((lon + 180) / 360) * W, py = (lat: number) => ((90 - lat) / 180) * H;

export default function RoutePlanner() {
  const [t, setT] = useState(trades[0].slug);
  const [d, setD] = useState(destinations[0].slug);
  const trade = trades.find((x) => x.slug === t)!, dest = destinations.find((x) => x.slug === d)!, f = destFacts[d];
  const dots = useMemo(() => { const a: [number, number][] = []; for (let y = 0; y < 60; y++) for (let x = 0; x < 120; x++) if (isLand(90 - (y + 0.5) * 3, -180 + (x + 0.5) * 3)) a.push([x * 6 + 3, y * 6 + 3]); return a; }, []);
  const x1 = px(HUB.lon), y1 = py(HUB.lat), x2 = px(dest.lon), y2 = py(dest.lat);
  const path = `M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - 50 - Math.abs(x2 - x1) * 0.14} ${x2} ${y2}`;
  const chip = (on: boolean) => `rounded-full border px-4 py-2 text-sm transition-all ${on ? "border-lime bg-lime text-ink" : "border-white/15 hover:border-lime/60"}`;
  const steps = [
    { h: `Profile your ${trade.name.toLowerCase()} experience`, p: trade.skills.join(" · ") },
    { h: `Research ${dest.name}`, p: "Visa pathways and trade licensing or recognition. Check official government sources." },
    { h: "Apply and assess", p: "Submit your profile and take part in employer screening and skills assessment." },
    { h: "If successful, prepare to move", p: "Offer, paperwork and practical onboarding. Nothing here is guaranteed." },
  ];
  return (
    <section className="relative py-24">
      <div className="container-x">
        <div className="mb-10 max-w-2xl"><span className="eyebrow">Route planner</span><h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-tight">Plot your path across the map.</h2><p className="mt-4 text-mute">Pick a trade and a destination to preview the steps ahead. An illustration of the journey, not an offer.</p></div>
        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div className="glass overflow-hidden rounded-[2rem] p-4 md:p-6">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Illustrative route to ${dest.name}`}>
              {dots.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={1.7} fill="#C8F169" opacity={0.28} />)}
              <motion.path key={path} d={path} fill="none" stroke="#C8F169" strokeWidth={2.2} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: "easeInOut" }} />
              <circle key={`p${path}`} r={4.5} fill="#F5FFD6"><animateMotion dur="3.4s" repeatCount="indefinite" path={path} /></circle>
              <circle cx={x1} cy={y1} r={5} fill="#fff" /><circle cx={x2} cy={y2} r={5} fill="#C8F169"><animate attributeName="r" values="5;11;5" dur="2s" repeatCount="indefinite" /><animate attributeName="opacity" values="1;.3;1" dur="2s" repeatCount="indefinite" /></circle>
            </svg>
            <div className="mt-5 space-y-5 px-2">
              <div><p className="mb-2 text-xs uppercase tracking-widest text-mute">Trade</p><div className="flex flex-wrap gap-2">{trades.map((x) => <button key={x.slug} aria-pressed={t === x.slug} onClick={() => setT(x.slug)} className={chip(t === x.slug)}>{x.name}</button>)}</div></div>
              <div><p className="mb-2 text-xs uppercase tracking-widest text-mute">Destination</p><div className="flex flex-wrap gap-2">{destinations.map((x) => <button key={x.slug} aria-pressed={d === x.slug} onClick={() => setD(x.slug)} className={chip(d === x.slug)}>{x.name}</button>)}</div></div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={t + d} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="glass rounded-[2rem] p-7 md:p-8">
              <p className="eyebrow">{trade.name} → {dest.name}</p>
              <ol className="mt-6 space-y-5 border-l border-lime/30 pl-6">
                {steps.map((s, i) => <li key={s.h} className="relative"><span className="absolute -left-[2.15rem] top-0 grid h-6 w-6 place-items-center rounded-full bg-lime text-xs font-bold text-ink">{i + 1}</span><h3 className="font-display text-lg font-semibold">{s.h}</h3><p className="mt-1 text-sm text-mute">{s.p}</p></li>)}
              </ol>
              <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 text-xs"><div><dt className="text-mute">Capital</dt><dd className="mt-1 text-sm">{f.capital}</dd></div><div><dt className="text-mute">Currency</dt><dd className="mt-1 text-sm">{f.currency.split(" (")[1]?.replace(")", "") ?? f.currency}</dd></div><div><dt className="text-mute">Language</dt><dd className="mt-1 text-sm">{f.language.split(",")[0]}</dd></div></dl>
              <div className="mt-6 flex flex-wrap gap-3"><Link href={`/trades/${trade.slug}`} className="btn btn-ghost !py-2.5 !text-sm">About {trade.name}</Link><Link href={`/destinations/${dest.slug}`} className="btn btn-lime !py-2.5 !text-sm">{dest.name} <ArrowRight size={15} /></Link></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
