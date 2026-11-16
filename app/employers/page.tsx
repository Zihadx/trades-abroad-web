import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { Band } from "@/components/Extras";
import { img } from "@/lib/images";
import { icons } from "@/lib/icons";
import { SectionHead } from "@/components/sections/Sections";
import ContactForm from "../contact/ContactForm";

export const metadata: Metadata = { title: "Employer Solutions" };
const items = [
  { t: "Access to skilled professionals", d: "Reach experienced tradespeople across electrical, plumbing, welding, construction, HVAC and more.", icon: "users" },
  { t: "Workforce recruitment solutions", d: "Support from role definition to screening, tailored to project needs.", icon: "clipboard" },
  { t: "Talent matching", d: "Structured matching of skills, experience and availability to your requirements.", icon: "target" },
  { t: "Transparent process", d: "Clear stages and communication so your team always knows where things stand.", icon: "shield" },
];
const process = ["Share your requirements", "Review matched profiles", "Interview and assess", "Offer and onboarding support"];
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Employer Solutions" title="Find the hands your projects need." body="Tell us what you are building. We help you connect with qualified skilled trades professionals." />
      <div className="container-x"><Reveal className="group"><Photo src={img.employers} label="Employer solutions" parallax className="aspect-[21/9] rounded-3xl border border-white/10" /></Reveal></div>
      <section className="py-24"><div className="container-x">
        <SectionHead eyebrow="What you get" title="Recruitment built around your project." />
        <div className="grid gap-4 md:grid-cols-2">{items.map((v, i) => { const I = icons[v.icon]; return (
          <Reveal key={v.t} delay={i * 0.07} className="glass flex gap-5 rounded-3xl p-7"><I className="shrink-0 text-lime" size={28} /><div><h3 className="font-display text-xl font-semibold">{v.t}</h3><p className="mt-2 text-sm text-mute">{v.d}</p></div></Reveal>); })}</div>
      </div></section>
      <Band src={img.bandWeld} eyebrow="The process" title="Four steps from brief to hire." />
      <section className="py-24"><div className="container-x grid gap-4 md:grid-cols-4">{process.map((p, i) => (
        <Reveal key={p} delay={i * 0.07} className="rounded-3xl border border-white/10 p-7"><span className="font-display text-4xl text-lime">0{i + 1}</span><p className="mt-4 font-display text-lg">{p}</p></Reveal>))}</div></section>
      <section className="pb-8"><div className="container-x max-w-2xl"><h2 className="mb-6 font-display text-3xl font-semibold">Employer inquiry</h2><ContactForm /></div></section>
    </>
  );
}
