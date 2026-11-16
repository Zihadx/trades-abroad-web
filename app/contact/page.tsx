import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "./ContactForm";
export const metadata: Metadata = { title: "Contact" };
export default function Page() { return (<><PageHero eyebrow="Contact" title="Let’s talk." body="Workers and employers are both welcome." /><div className="container-x max-w-2xl"><ContactForm /></div></>); }
