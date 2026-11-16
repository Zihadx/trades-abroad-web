import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { trades } from "@/lib/data";

export function generateStaticParams() { return trades.map((t) => ({ slug: t.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; return { title: trades.find((t) => t.slug === slug)?.name ?? "Trade" };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = trades.find((x) => x.slug === slug);
  if (!t) notFound();
  return (
    <>
      <PageHero eyebrow="Skilled Trade" title={t.name} body={t.blurb} />
      <div className="container-x grid gap-8 lg:grid-cols-2">
        <div className="group"><Photo src={`/images/trades/${t.slug}.jpg`} label={t.name} className="aspect-[4/3] rounded-3xl border border-white/10" /></div>
        <div>
          <h2 className="font-display text-2xl font-semibold">Core skills employers look for</h2>
          <ul className="mt-5 space-y-3">{t.skills.map((s) => <li key={s} className="glass rounded-2xl px-5 py-4">{s}</li>)}</ul>
          <p className="mt-5 text-sm text-mute">Requirements, licensing and recognition of qualifications differ by country and employer.</p>
          <Link href="/jobs" className="btn btn-lime mt-8">See demo listings <ArrowRight size={16} /></Link>
        </div>
      </div>
    </>
  );
}
