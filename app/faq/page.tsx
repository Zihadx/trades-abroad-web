import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Faq from "@/components/sections/Faq";
import { allFaqs } from "@/lib/data";
export const metadata: Metadata = { title: "FAQ" };
export default function Page() {
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: allFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /><PageHero eyebrow="FAQ" title="Frequently asked questions" /><div className="container-x"><Faq /></div></>);
}
