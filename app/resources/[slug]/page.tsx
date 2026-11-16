import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { articleImg } from "@/lib/images";
import { articles } from "@/lib/data";

export function generateStaticParams() { return articles.map((a) => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; return { title: articles.find((a) => a.slug === slug)?.t ?? "Article" };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  return (
    <>
      <PageHero eyebrow={`Article · ${a.read} read`} title={a.t} body={a.d} />
      <div className="container-x max-w-3xl">
        <div className="group"><Photo src={articleImg(a.slug)} label={a.t} parallax className="aspect-[16/9] rounded-3xl border border-white/10" /></div>
        <div className="mt-10 space-y-6 text-lg leading-relaxed text-fg/85">{a.body.map((p) => <p key={p}>{p}</p>)}</div>
        <p className="mt-10 rounded-2xl border border-white/10 p-5 text-sm text-mute">General information only. Rules, demand and requirements vary by country and change over time; verify with official sources.</p>
        <Link href="/resources" className="btn btn-ghost mt-8"><ArrowLeft size={16} /> All resources</Link>
      </div>
    </>
  );
}
