import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
export const metadata: Metadata = { title: "Terms & Conditions" };
export default function Page() {
  return <LegalPage title="Terms & Conditions" sections={[
    { h: "About this site", p: "Trades Abroad provides general information about international skilled trades careers. Content is for information only and is not legal, immigration or professional advice." },
    { h: "No guarantees", p: "We do not guarantee employment, visas, licences or any particular outcome. Opportunities, requirements and timelines depend on employers, governments and individual circumstances." },
    { h: "Listings", p: "Listings marked as demo or sample are illustrative and are not real vacancies. Always verify employers and roles through official sources before sharing documents or money." },
    { h: "Acceptable use", p: "You agree not to misuse the site, attempt unauthorised access, or submit unlawful or misleading information." },
    { h: "Changes", p: "We may update these terms and the site from time to time. Continued use means you accept the updated terms." },
  ]} />;
}
