import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { Band } from "@/components/Extras";
import { img } from "@/lib/images";
import { icons } from "@/lib/icons";
import { SectionHead } from "@/components/sections/Sections";

export const metadata: Metadata = { title: "About Us" };
const values = [
  { t: "Respect for the craft", d: "Skilled trades are the backbone of every city. We start from respect for the people who build them.", icon: "hammer" },
  { t: "Honest information", d: "We explain what is known, what varies and what must be verified. No guarantees we cannot keep.", icon: "shield" },
  { t: "Human-centred support", d: "Behind every application is a person and a family. Clear, kind communication comes first.", icon: "users" },
  { t: "Global outlook", d: "Careers do not stop at borders. We help people and employers look further.", icon: "globe" },
];
export default function Page() {
  return (
    <>
      <PageHero eyebrow="About Trades Abroad" title="We connect skilled hands to global demand." body="Trades Abroad is a platform concept built to help skilled trades professionals explore international careers, and to help employers reach qualified talent." />
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <Reveal className="group"><Photo src={img.about} label="Our mission" parallax className="aspect-[4/3] rounded-3xl border border-white/10" /></Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Our mission</h2>
          <p className="mt-5 text-mute">Too many skilled people never see the opportunities their experience qualifies them for, and too many employers struggle to find the right trades talent. We exist to close that gap with clarity, structure and respect.</p>
          <p className="mt-4 text-mute">We are not an immigration consultancy and we do not promise visas or jobs. We provide information, structure and connections, and we are transparent about every stage.</p>
          <Link href="/how-it-works" className="btn btn-ghost mt-7">See the process <ArrowRight size={16} /></Link>
        </Reveal>
      </div>
      <section className="py-24"><div className="container-x">
        <SectionHead eyebrow="Values" title="What guides us." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{values.map((v, i) => { const I = icons[v.icon]; return (
          <Reveal key={v.t} delay={i * 0.07} className="glass rounded-3xl p-7"><I className="text-lime" size={26} /><h3 className="mt-5 font-display text-xl font-semibold">{v.t}</h3><p className="mt-2 text-sm text-mute">{v.d}</p></Reveal>); })}</div>
      </div></section>
      <Band src={img.bandBuild} eyebrow="Join the journey" title="Your skills can take you further." cta="Get in touch" href="/contact" />
      <section className="py-16"><div className="container-x"><p className="max-w-3xl text-sm text-mute">Privacy &amp; Terms: this demo site collects no data. Before launch, add a full Privacy Policy and Terms &amp; Conditions reviewed by qualified legal counsel.</p></div></section>
    </>
  );
}
