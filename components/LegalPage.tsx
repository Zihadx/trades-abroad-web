import PageHero from "./PageHero";
export default function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} />
      <div className="container-x max-w-3xl pb-8">
        <p className="mb-10 rounded-2xl border border-lime/30 bg-lime/5 p-5 text-sm text-lime">Starter template. Have this reviewed and completed by qualified legal counsel in your jurisdiction before launch.</p>
        {sections.map((s) => <section key={s.h} className="mb-8"><h2 className="font-display text-2xl font-semibold">{s.h}</h2><p className="mt-3 text-mute">{s.p}</p></section>)}
      </div>
    </>
  );
}
