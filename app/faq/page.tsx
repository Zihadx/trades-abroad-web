import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Faq from "@/components/sections/Faq";
export const metadata: Metadata = { title: "FAQ" };
export default function Page() { return (<><PageHero eyebrow="FAQ" title="Frequently asked questions" /><div className="container-x"><Faq /></div></>); }
