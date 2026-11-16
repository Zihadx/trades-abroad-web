import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { articleImg } from "@/lib/images";
import { articles } from "@/lib/data";

export const metadata: Metadata = { title: "Insights & Resources" };
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Insights & Resources" title="Know before you go." body="General guidance for skilled trades professionals exploring international work." />
      <div className="container-x grid gap-4 md:grid-cols-2 lg:grid-cols-3">{articles.map((a, i) => (
        <Reveal key={a.slug} delay={(i % 3) * 0.07}><Link href={`/resources/${a.slug}`} className="group block h-full overflow-hidden rounded-3xl border border-white/10 bg-surface/60 transition-colors hover:border-lime/50">
          <Photo src={articleImg(a.slug)} label={a.t} className="aspect-[16/10]" />
          <div className="p-6"><span className="eyebrow">Article · {a.read}</span><h2 className="mt-3 font-display text-xl font-semibold">{a.t}</h2><p className="mt-2 text-sm text-mute">{a.d}</p></div>
        </Link></Reveal>))}</div>
    </>
  );
}
