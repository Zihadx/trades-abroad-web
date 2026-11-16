import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JobsBrowser from "./JobsBrowser";
export const metadata: Metadata = { title: "Find Jobs" };
export default function Page() {
  return (<><PageHero eyebrow="Find Jobs" title="Browse the platform preview." /><JobsBrowser /></>);
}
