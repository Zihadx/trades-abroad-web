"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { destinations, jobs, trades } from "@/lib/data";

export default function JobsBrowser() {
  const [q, setQ] = useState(""); const [trade, setTrade] = useState(""); const [country, setCountry] = useState("");
  const list = useMemo(() => jobs.filter((j) => (!trade || j.trade === trade) && (!country || j.country === country) && j.title.toLowerCase().includes(q.toLowerCase())), [q, trade, country]);
  const sel = "rounded-2xl border border-white/15 bg-surface px-4 py-3 text-sm focus:border-lime focus:outline-none";
  return (
    <div className="container-x">
      <p className="mb-8 max-w-2xl rounded-2xl border border-lime/30 bg-lime/5 px-5 py-4 text-sm text-lime">Demo content: these are sample listings to preview the experience, not real vacancies.</p>
      <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr]">
        <label className="relative"><span className="sr-only">Search roles</span><Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mute" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search roles" className={`${sel} w-full pl-11`} /></label>
        <select aria-label="Trade" value={trade} onChange={(e) => setTrade(e.target.value)} className={sel}><option value="">All trades</option>{trades.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}</select>
        <select aria-label="Destination" value={country} onChange={(e) => setCountry(e.target.value)} className={sel}><option value="">All destinations</option>{destinations.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}</select>
      </div>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {list.map((j) => (
          <li key={j.id}><Link href={`/jobs/${j.slug}`} className="glass group flex items-center justify-between gap-4 rounded-3xl p-6 transition-colors hover:border-lime/50">
            <div><h3 className="font-display text-xl font-semibold">{j.title}</h3><p className="mt-1 text-sm text-mute">{destinations.find((d) => d.slug === j.country)?.name} · {trades.find((t) => t.slug === j.trade)?.name} · {j.type}</p></div>
            <span className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs text-mute">Demo <ArrowUpRight size={14} className="group-hover:text-lime" /></span>
          </Link></li>))}
      </ul>
      {list.length === 0 && <div className="mt-8 rounded-3xl border border-dashed border-white/20 p-12 text-center text-mute">No matching demo listings. Try clearing a filter.</div>}
    </div>
  );
}
