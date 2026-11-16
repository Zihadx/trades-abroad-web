import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { tradeImg, destImg } from "@/lib/images";
import { destinations, trades } from "@/lib/data";

export function generateStaticParams() { return destinations.map((d) => ({ slug: d.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; return { title: destinations.find((d) => d.slug === slug)?.name ?? "Destination" };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = destinations.find((x) => x.slug === slug);
  if (!d) notFound();
  return (
    <>
      <PageHero eyebrow={`Destination · ${d.code}`} title={d.name} body={d.tagline} />
      <div className="container-x grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="group"><Photo src={destImg[d.slug]} label={d.name} className="aspect-[16/10] rounded-3xl border border-white/10" /></div>
        <div className="glass rounded-3xl p-8">
          <h2 className="font-display text-2xl font-semibold">Important</h2>
          <p className="mt-3 text-mute">This page is a destination overview, not an offer of employment or visa sponsorship. Opportunities, visa categories and trade licensing for {d.name} must be verified with official government and employer sources.</p>
          <h3 className="mt-6 text-sm uppercase tracking-widest text-lime">Browse trades</h3>
          <div className="mt-3 flex flex-wrap gap-2">{trades.slice(0, 6).map((t) => <Link key={t.slug} href={`/trades/${t.slug}`} className="rounded-full border border-white/15 px-4 py-1.5 text-sm hover:border-lime">{t.name}</Link>)}</div>
          <Link href="/jobs" className="btn btn-lime mt-8">View demo listings <ArrowRight size={16} /></Link>
        </div>
      </div>
    </>
  );
}
