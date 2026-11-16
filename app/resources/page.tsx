import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
export const metadata: Metadata = { title: "Insights and Resources" };
export default function Page() {
  return (<><PageHero eyebrow="Resources" title="Insights and Resources" body="This page is scaffolded and ready for content in the next release." /><div className="container-x"><Link href="/contact" className="btn btn-lime">Get in touch</Link></div></>);
}
