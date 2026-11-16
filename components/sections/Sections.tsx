import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import { icons } from "@/lib/icons";
import { articles, destinations, trades, why } from "@/lib/data";

export function SectionHead({ eyebrow, title, body, href, cta }: { eyebrow: string; title: string; body?: string; href?: string; cta?: string }) {
  return (
    <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl"><span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-tight">{title}</h2>
        {body && <p className="mt-4 text-mute">{body}</p>}</div>
      {href && <Link href={href} className="btn btn-ghost">{cta} <ArrowRight size={16} /></Link>}
    </Reveal>
  );
}

export function TradesGrid({ limit }: { limit?: number }) {
  const list = limit ? trades.slice(0, limit) : trades;
  return (
    <div className="grid auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {list.map((t, i) => {
        const I = icons[t.icon];
        return (
          <Reveal key={t.slug} delay={(i % 4) * 0.06} className={i === 0 ? "lg:col-span-2" : ""}>
            <Link href={`/trades/${t.slug}`} className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 transition-colors hover:border-lime/60">
              <Photo src={`/images/trades/${t.slug}.jpg`} label={t.name} className="absolute inset-0" />
              <div className="relative flex h-full flex-col justify-between p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink/60 text-lime backdrop-blur"><I size={20} /></span>
                <div>
                  <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
                  <p className="mt-1 line-clamp-2 max-h-0 overflow-hidden text-sm text-fg/80 opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100 group-focus-visible:max-h-16 group-focus-visible:opacity-100">{t.blurb}</p>
                </div>
                <ArrowUpRight className="absolute right-5 top-5 text-fg/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime" size={20} />
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}

export function Trades() {
  return (<section className="py-24"><div className="container-x"><SectionHead eyebrow="Skilled Trades" title="Your trade. Your route abroad." body="Ten disciplines, one platform. Pick yours and see where it can take you." href="/trades" cta="All trades" /><TradesGrid limit={8} /></div></section>);
}

export function DestinationCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((d, i) => (
        <Reveal key={d.slug} delay={(i % 3) * 0.07}>
          <Link href={`/destinations/${d.slug}`} className="group relative block h-[340px] overflow-hidden rounded-3xl border border-white/10 transition-colors hover:border-lime/60">
            <Photo src={`/images/destinations/${d.slug}.jpg`} label={d.name} className="absolute inset-0" />
            <span className="glass absolute left-5 top-5 rounded-full px-3 py-1 font-display text-sm tracking-widest">{d.code}</span>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
              <div><h3 className="font-display text-3xl font-semibold">{d.name}</h3><p className="mt-1 text-sm text-fg/75">{d.tagline}</p></div>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-all group-hover:border-lime group-hover:bg-lime group-hover:text-ink"><ArrowRight size={18} /></span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function Destinations() {
  return (<section className="bg-ink2 py-24"><div className="container-x"><SectionHead eyebrow="Global Destinations" title="Where could your skills go?" body="Illustrative destinations. Opportunities, visas and licensing vary and must be verified with official sources." href="/destinations" cta="All destinations" /><DestinationCards /></div></section>);
}

export function Why() {
  return (
    <section className="py-24"><div className="container-x">
      <SectionHead eyebrow="Why Trades Abroad" title="A clearer path to work beyond borders." />
      <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {why.map((w, i) => { const I = icons[w.icon]; return (
          <Reveal key={w.t} delay={(i % 3) * 0.06} className="group bg-surface/90 p-8 transition-colors hover:bg-[#1a2420]">
            <I className="text-lime" size={26} /><h3 className="mt-6 font-display text-xl font-semibold">{w.t}</h3><p className="mt-2 text-sm text-mute">{w.d}</p>
          </Reveal>); })}
      </div>
    </div></section>
  );
}

export function Employers() {
  return (
    <section className="py-24"><div className="container-x grid items-center gap-10 lg:grid-cols-2">
      <Reveal className="group"><Photo src="/images/hero/employers.jpg" label="Employer solutions" className="aspect-[4/3] rounded-3xl border border-white/10" /></Reveal>
      <Reveal delay={0.1}>
        <span className="eyebrow">Employer Solutions</span>
        <h2 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.02] tracking-tight">Find the hands your projects need.</h2>
        <ul className="mt-7 space-y-3 text-mute">{["Access to skilled professionals", "Workforce recruitment solutions", "Talent matching", "A clear recruitment process overview"].map((x) => <li key={x} className="flex gap-3"><i className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />{x}</li>)}</ul>
        <div className="mt-9 flex flex-wrap gap-3"><Link href="/contact" className="btn btn-lime">Employer Inquiry <ArrowRight size={16} /></Link><Link href="/employers" className="btn btn-ghost">Learn more</Link></div>
      </Reveal>
    </div></section>
  );
}

export function Stories() {
  return (
    <section className="bg-ink2 py-24"><div className="container-x">
      <SectionHead eyebrow="Success Stories" title="Real voices, coming soon." body="Placeholder content. Replace with verified testimonials, with permission, before launch." />
      <div className="grid gap-4 md:grid-cols-3">{["Worker", "Employer", "Worker"].map((r, i) => (
        <Reveal key={i} delay={i * 0.08} className="rounded-3xl border border-dashed border-white/20 p-8">
          <p className="font-display text-xl leading-snug text-fg/80">“[Placeholder testimonial — insert a verified quote here.]”</p>
          <p className="mt-6 text-sm text-mute">[Name, trade, country] · {r} · <span className="text-lime">Placeholder</span></p>
        </Reveal>))}</div>
    </div></section>
  );
}

export function Resources() {
  return (
    <section className="py-24"><div className="container-x">
      <SectionHead eyebrow="Insights & Resources" title="Know before you go." href="/resources" cta="All resources" />
      <div className="grid gap-4 md:grid-cols-3">{articles.map((a, i) => (
        <Reveal key={a.slug} delay={i * 0.08}><div className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-surface/60 transition-colors hover:border-lime/50">
          <Photo src={`/images/articles/${a.slug}.jpg`} label={a.t} className="aspect-[16/10]" />
          <div className="p-6"><span className="eyebrow">Article · Coming soon</span><h3 className="mt-3 font-display text-xl font-semibold">{a.t}</h3><p className="mt-2 text-sm text-mute">{a.d}</p></div>
        </div></Reveal>))}</div>
    </div></section>
  );
}

export function FinalCTA() {
  return (
    <section className="py-24"><div className="container-x">
      <Reveal className="relative overflow-hidden rounded-[2rem] border border-lime/30 px-8 py-20 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_90%_at_50%_120%,rgba(200,241,105,.35),transparent_70%)]" />
        <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-[0.98] tracking-tight">Your Skills Can Take You <em className="text-lime">Further.</em></h2>
        <p className="mx-auto mt-5 max-w-lg text-mute">Take the next step toward exploring international opportunities in your trade.</p>
        <Link href="/jobs" className="btn btn-lime mt-9">Explore Opportunities <ArrowRight size={16} /></Link>
      </Reveal>
    </div></section>
  );
}
