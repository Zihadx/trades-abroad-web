"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHead } from "./sections/Sections";
import { destFacts, destinations } from "@/lib/data";

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { setNow(new Date()); const i = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(i); }, []);
  return now;
}
const fmt = (d: Date, tz: string) => new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).format(d);
const hour = (d: Date, tz: string) => Number(new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", hourCycle: "h23" }).format(d));

export function LocalTime({ tz }: { tz: string }) {
  const now = useNow();
  return <span className="tabular-nums">{now ? fmt(now, tz) : "--:--:--"}</span>;
}
export function ClocksSection() {
  const now = useNow();
  return (
    <section className="py-24"><div className="container-x">
      <SectionHead eyebrow="The world never sleeps" title="Right now, across your destinations." body="Live local time. Careers happen across time zones." />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {destinations.map((d, i) => { const tz = destFacts[d.slug].tz; const h = now ? hour(now, tz) : 12; const day = h >= 6 && h < 18; return (
          <Reveal key={d.slug} delay={i * 0.05} className="glass rounded-3xl p-5">
            <div className="flex items-center justify-between"><span className="eyebrow">{d.code}</span>{day ? <Sun size={16} className="text-lime" /> : <Moon size={16} className="text-mute" />}</div>
            <p className="mt-4 font-display text-3xl font-semibold tabular-nums">{now ? fmt(now, tz) : "--:--:--"}</p>
            <p className="mt-1 text-sm text-mute">{d.name}</p>
          </Reveal>); })}
      </div>
    </div></section>
  );
}
