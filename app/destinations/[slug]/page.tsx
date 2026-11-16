import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { LocalTime } from "@/components/Clocks";
import { Band } from "@/components/Extras";
import { destFacts, destinations, trades } from "@/lib/data";
import { destImg, img } from "@/lib/images";

export function generateStaticParams() { return destinations.map((d) => ({ slug: d.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const d = destinations.find((x) => x.slug === slug);
  return { title: d?.name ?? "Destination", description: d?.tagline };
}
const checklist = ["Visa categories that apply to your trade and situation", "Whether your trade is regulated, and how overseas qualifications are recognised", "Verified employers and written terms before you share documents or money", "Cost of living, housing and healthcare arrangements", "Tax, insurance and your obligations as a worker"];
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = destinations.find((x) => x.slug === slug);
  if (!d) notFound();
  const f = destFacts[d.slug];
  const facts = [["Capital", f.capital], ["Currency", f.currency], ["Language", f.language]];
  return (
    <>
      <PageHero eyebrow={`Destination · ${d.code}`} title={d.name} body={d.tagline} />
      <div className="container-x grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="group"><Photo src={destImg[d.slug]} label={d.name} parallax priority className="aspect-[16/10] rounded-3xl border border-white/10" /></div>
        <div className="glass rounded-3xl p-8">
          <p className="eyebrow">Local time</p><p className="mt-2 font-display text-5xl font-semibold"><LocalTime tz={f.tz} /></p>
          <dl className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">{facts.map(([k, v]) => <div key={k} className="flex justify-between gap-4"><dt className="text-mute">{k}</dt><dd className="text-right">{v}</dd></div>)}</dl>
          <h3 className="mt-6 text-sm uppercase tracking-widest text-lime">Browse trades</h3>
          <div className="mt-3 flex flex-wrap gap-2">{trades.slice(0, 6).map((t) => <Link key={t.slug} href={`/trades/${t.slug}`} className="rounded-full border border-white/15 px-4 py-1.5 text-sm hover:border-lime">{t.name}</Link>)}</div>
        </div>
      </div>
      <section className="container-x py-20">
        <h2 className="font-display text-3xl font-semibold">Before you plan for {d.name}</h2>
        <p className="mt-3 max-w-2xl text-mute">This page is an overview, not an offer of employment or visa sponsorship. Verify everything with official government and employer sources.</p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">{checklist.map((c) => <li key={c} className="glass flex gap-3 rounded-2xl p-5 text-sm"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-lime" />{c}</li>)}</ul>
        <Link href="/jobs" className="btn btn-lime mt-10">View demo listings <ArrowRight size={16} /></Link>
      </section>
      <Band src={img.bandCity} eyebrow="Keep exploring" title="Every destination starts with one step." cta="All destinations" href="/destinations" />
    </>
  );
}
