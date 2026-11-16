import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { destinations, jobs, trades } from "@/lib/data";
import { tradeImg } from "@/lib/images";

export function generateStaticParams() { return jobs.map((j) => ({ slug: j.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; return { title: jobs.find((j) => j.slug === slug)?.title ?? "Job" };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const j = jobs.find((x) => x.slug === slug);
  if (!j) notFound();
  const t = trades.find((x) => x.slug === j.trade)!;
  const d = destinations.find((x) => x.slug === j.country)!;
  return (
    <>
      <PageHero eyebrow={`Demo listing · ${d.name} · ${j.type}`} title={j.title} body="This is sample content to preview the experience. It is not a real vacancy." />
      <div className="container-x grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="group"><Photo src={tradeImg[t.slug]} label={t.name} parallax className="aspect-[16/9] rounded-3xl border border-white/10" /></div>
          <h2 className="mt-10 font-display text-2xl font-semibold">Typical responsibilities</h2>
          <ul className="mt-4 space-y-3 text-mute">{t.skills.map((s) => <li key={s} className="flex gap-3"><i className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />{s}</li>)}</ul>
          <p className="mt-6 text-sm text-mute">Real listings would state employer, licensing requirements, pay and conditions as provided by the employer.</p>
        </div>
        <aside className="glass h-fit rounded-3xl p-8">
          <p className="rounded-full border border-lime/40 px-3 py-1 text-xs text-lime w-fit">Demo only</p>
          <dl className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><dt className="text-mute">Trade</dt><dd>{t.name}</dd></div><div className="flex justify-between"><dt className="text-mute">Destination</dt><dd>{d.name}</dd></div><div className="flex justify-between"><dt className="text-mute">Type</dt><dd>{j.type}</dd></div></dl>
          <Link href="/contact" className="btn btn-lime mt-7 w-full justify-center">Register interest <ArrowRight size={16} /></Link>
          <Link href="/jobs" className="btn btn-ghost mt-3 w-full justify-center"><ArrowLeft size={16} /> All listings</Link>
        </aside>
      </div>
    </>
  );
}
