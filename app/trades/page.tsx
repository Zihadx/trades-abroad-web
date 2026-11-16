import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { TradesGrid } from "@/components/sections/Sections";
export const metadata: Metadata = { title: "Skilled Trades" };
export default function Page() {
  return (<><PageHero eyebrow="Skilled Trades" title="Every trade has a global stage." body="Explore the disciplines connected to international demand." /><div className="container-x pb-8"><TradesGrid /></div></>);
}
