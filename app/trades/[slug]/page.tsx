import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { Band } from "@/components/Extras";
import { icons } from "@/lib/icons";
import { trades, tradeTools, jobs, destinations } from "@/lib/data";
import { tradeImg, img } from "@/lib/images";

export function generateStaticParams() { return trades.map((t) => ({ slug: t.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const t = trades.find((x) => x.slug === slug);
  return { title: t?.name ?? "Trade", description: t?.blurb };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = trades.find((x) => x.slug === slug);
  if (!t) notFound();
  const related = trades.filter((x) => x.slug !== t.slug).slice(0, 3);
  const demo = jobs.filter((j) => j.trade === t.slug);
  return (
    <>
      <PageHero eyebrow="Skilled Trade" title={t.name} body={t.blurb} />
      <div className="container-x grid gap-8 lg:grid-cols-2">
        <div className="group"><Photo src={tradeImg[t.slug]} label={t.name} parallax priority className="aspect-[4/3] rounded-3xl border border-white/10" /></div>
        <div>
          <h2 className="font-display text-2xl font-semibold">Core skills employers look for</h2>
          <ul className="mt-5 space-y-3">{t.skills.map((s) => <li key={s} className="glass rounded-2xl px-5 py-4">{s}</li>)}</ul>
          <h2 className="mt-8 font-display text-2xl font-semibold">Tools of the trade</h2>
          <div className="mt-4 flex flex-wrap gap-2">{tradeTools[t.slug].map((x) => <span key={x} className="rounded-full border border-white/15 px-4 py-1.5 text-sm">{x}</span>)}</div>
          <p className="mt-6 text-sm text-mute">Requirements, licensing and recognition of qualifications differ by country and employer.</p>
          <Link href="/jobs" className="btn btn-lime mt-8">See demo listings <ArrowRight size={16} /></Link>
        </div>
      </div>
      {demo.length > 0 && <section className="container-x pt-16"><h2 className="font-display text-2xl font-semibold">Demo listings in this trade</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{demo.map((j) => <Link key={j.id} href={`/jobs/${j.slug}`} className="glass rounded-3xl p-6 transition-colors hover:border-lime/50"><h3 className="font-display text-xl font-semibold">{j.title}</h3><p className="mt-1 text-sm text-mute">{destinations.find((d) => d.slug === j.country)?.name} · {j.type} · Demo</p></Link>)}</div></section>}
      <section className="container-x py-20"><h2 className="font-display text-2xl font-semibold">Related trades</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{related.map((r, i) => { const I = icons[r.icon]; return (<Reveal key={r.slug} delay={i * 0.06}><Link href={`/trades/${r.slug}`} className="glass group flex items-center gap-4 rounded-3xl p-6 transition-colors hover:border-lime/50"><I className="text-lime" size={24} /><span className="font-display text-lg">{r.name}</span><ArrowRight size={16} className="ml-auto transition-transform group-hover:translate-x-1" /></Link></Reveal>); })}</div></section>
      <Band src={img.bandBuild} eyebrow="Ready?" title="Your skills can take you further." cta="Explore opportunities" href="/jobs" />
    </>
  );
}
