import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import HowItWorks from "@/components/sections/HowItWorks";
export const metadata: Metadata = { title: "How It Works" };
export default function Page() { return (<><PageHero eyebrow="Recruitment Process" title="Six steps. No guesswork." /><HowItWorks standalone /></>); }
