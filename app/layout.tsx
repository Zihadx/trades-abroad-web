import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ScrollProgress } from "@/components/Extras";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import { SITE } from "@/lib/site";

const body = Inter({ subsets: ["latin"], variable: "--f-body", display: "swap" });
const display = Inter_Tight({ subsets: ["latin"], variable: "--f-display", display: "swap" });
const title = `${SITE.name} — Skilled Hands. Global Future.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: { type: "website", siteName: SITE.name, title, description: SITE.description, url: SITE.url },
  twitter: { card: "summary_large_image", title, description: SITE.description },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#080B09", colorScheme: "dark" };

const jsonLd = { "@context": "https://schema.org", "@graph": [
  { "@type": "Organization", name: SITE.name, url: SITE.url, description: SITE.description, email: SITE.email },
  { "@type": "WebSite", name: SITE.name, url: SITE.url },
] };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-lime focus:px-5 focus:py-2 focus:text-ink">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Preloader /><Cursor /><ScrollProgress /><Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
