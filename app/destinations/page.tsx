import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { DestinationCards } from "@/components/sections/Sections";
export const metadata: Metadata = { title: "Global Destinations" };
export default function Page() {
  return (<><PageHero eyebrow="Global Destinations" title="Explore where trades are in demand." body="Illustrative destinations only. Always verify availability, visa and licensing rules with official sources." /><div className="container-x"><DestinationCards /></div></>);
}
