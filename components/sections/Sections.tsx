import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import { Tilt } from "@/components/Extras";
import { articleImg, destImg, img, tradeImg } from "@/lib/images";
import { icons } from "@/lib/icons";
import { articles, destFacts, destStyle, destinations, trades, why } from "@/lib/data";

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
            <Tilt className="h-full"><Link href={`/trades/${t.slug}`} className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 transition-colors hover:border-lime/60">
              <Photo src={tradeImg[t.slug]} label={t.name} className="absolute inset-0" />
              <div className="relative flex h-full flex-col justify-between p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink/60 text-lime backdrop-blur"><I size={20} /></span>
                <div>
                  <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
                  <p className="mt-1 line-clamp-2 max-h-0 overflow-hidden text-sm text-fg/80 opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100 group-focus-visible:max-h-16 group-focus-visible:opacity-100">{t.blurb}</p>
                </div>
                <ArrowUpRight className="absolute right-5 top-5 text-fg/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime" size={20} />
              </div>
            </Link></Tilt>
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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:[&>div:nth-child(3n+2)]:mt-10">
      {destinations.map((d, i) => {
        const st = destStyle[d.slug], f = destFacts[d.slug];
        return (
          <Reveal key={d.slug} delay={(i % 3) * 0.08}>
            <Tilt>
              <Link href={`/destinations/${d.slug}`} style={{ ["--ac" as string]: st.accent }} className="group relative block h-[440px] overflow-hidden rounded-[2rem] border border-white/10 transition-all duration-500 hover:border-[var(--ac)] hover:shadow-[0_40px_90px_-35px_var(--ac)]">
                <Photo src={destImg[d.slug]} label={d.name} className="absolute inset-0" />
                {/* flag-colour wash + tricolour edge */}
                <div className="absolute inset-0 opacity-40 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-80" style={{ background: `linear-gradient(135deg, ${st.stripes.join(", ")})` }} />
                <div className="absolute inset-x-0 top-0 flex h-1.5">{st.stripes.map((c, k) => <i key={k} className="flex-1" style={{ background: c }} />)}</div>
                <div className="absolute -bottom-10 -right-2 select-none font-display text-[9rem] font-bold leading-none text-transparent opacity-40 transition-all duration-500 [-webkit-text-stroke:1px_var(--ac)] group-hover:-translate-y-3 group-hover:opacity-80" aria-hidden>{d.code}</div>
                {/* mini flag + code */}
                <div className="absolute left-5 top-6 flex items-center gap-3">
                  <span className="h-8 w-12 rounded-md shadow-lg ring-1 ring-white/50 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110" style={{ background: st.flag }} />
                  <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 font-display text-sm tracking-widest backdrop-blur-md">{d.code}</span>
                </div>
                {/* frosted light-glass panel */}
                <div className="absolute inset-x-4 bottom-4 overflow-hidden rounded-3xl border border-white/25 bg-white/[0.11] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.35)] backdrop-blur-2xl">
                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                  <div className="relative flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-display text-3xl font-semibold leading-none">{d.name}</h3>
                      <p className="mt-2 text-sm text-white/80">{d.tagline}</p>
                    </div>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/40 bg-white/10 transition-all duration-300 group-hover:border-transparent group-hover:bg-[var(--ac)] group-hover:text-ink"><ArrowRight size={18} className="transition-transform group-hover:-rotate-45" /></span>
                  </div>
                  <div className="relative mt-4 flex flex-wrap gap-2 text-[11px] text-white/85">
                    <span className="rounded-full bg-white/12 px-3 py-1 ring-1 ring-white/20">Capital · {f.capital}</span>
                    <span className="rounded-full bg-white/12 px-3 py-1 ring-1 ring-white/20">{f.currency.split(" (")[1]?.replace(")", "") ?? f.currency}</span>
                  </div>
                </div>
              </Link>
            </Tilt>
          </Reveal>
        );
      })}
    </div>
  );
}

export function Destinations() {
  return (
    <section className="relative overflow-hidden bg-ink2 py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {destinations.map((d, i) => <span key={d.slug} className="absolute h-72 w-72 rounded-full opacity-[0.13] blur-[90px]" style={{ background: destStyle[d.slug].accent, left: `${(i % 3) * 36 - 4}%`, top: `${i < 3 ? 8 : 55}%` }} />)}
      </div>
      <div className="container-x relative"><SectionHead eyebrow="Global Destinations" title="Where could your skills go?" body="Illustrative destinations. Opportunities, visas and licensing vary and must be verified with official sources." href="/destinations" cta="All destinations" /><DestinationCards /></div>
    </section>
  );
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
      <Reveal className="group"><Photo src={img.employers} label="Employer solutions" className="aspect-[4/3] rounded-3xl border border-white/10" /></Reveal>
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
    <section className="relative isolate overflow-hidden py-24"><Photo src={img.bandCity} label="Cities" parallax className="absolute inset-0 -z-10 opacity-30" /><div className="absolute inset-0 -z-10 bg-ink/70" /><div className="container-x">
      <SectionHead eyebrow="Success Stories" title="Real voices, coming soon." body="Placeholder content. Replace with verified testimonials, with permission, before launch." />
      <div className="grid gap-4 md:grid-cols-3">{["Worker", "Employer", "Worker"].map((r, i) => (
        <Reveal key={i} delay={i * 0.08} className="glass rounded-3xl border-dashed p-8">
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
      <div className="grid gap-4 md:grid-cols-3">{articles.slice(0, 3).map((a, i) => (
        <Reveal key={a.slug} delay={i * 0.08}><Link href={`/resources/${a.slug}`} className="group block h-full overflow-hidden rounded-3xl border border-white/10 bg-surface/60 transition-colors hover:border-lime/50">
          <Photo src={articleImg(a.slug)} label={a.t} className="aspect-[16/10]" />
          <div className="p-6"><span className="eyebrow">Article · {a.read}</span><h3 className="mt-3 font-display text-xl font-semibold">{a.t}</h3><p className="mt-2 text-sm text-mute">{a.d}</p></div>
        </Link></Reveal>))}</div>
    </div></section>
  );
}

export function FinalCTA() {
  return (
    <section className="py-24"><div className="container-x">
      <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-lime/30 px-8 py-24 text-center">
        <Photo src={img.space} label="Earth from orbit" parallax className="absolute inset-0 -z-20 opacity-50" /><div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_90%_at_50%_120%,rgba(200,241,105,.35),transparent_70%),linear-gradient(rgba(8,11,9,.5),rgba(8,11,9,.7))]" />
        <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-[0.98] tracking-tight">Your Skills Can Take You <em className="text-lime">Further.</em></h2>
        <p className="mx-auto mt-5 max-w-lg text-mute">Take the next step toward exploring international opportunities in your trade.</p>
        <Link href="/jobs" className="btn btn-lime mt-9">Explore Opportunities <ArrowRight size={16} /></Link>
      </Reveal>
    </div></section>
  );
}
