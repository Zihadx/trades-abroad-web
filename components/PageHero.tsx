import Reveal from "./Reveal";
export default function PageHero({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_80%_0%,rgba(200,241,105,.14),transparent_60%)]" />
      <div className="container-x">
        <Reveal><span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.6rem,6.5vw,5.5rem)] font-semibold leading-[0.98] tracking-tight">{title}</h1>
          {body && <p className="mt-6 max-w-2xl text-lg text-mute">{body}</p>}
        </Reveal>
      </div>
    </section>
  );
}
