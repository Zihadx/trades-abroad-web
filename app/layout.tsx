import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const body = Inter({ subsets: ["latin"], variable: "--f-body", display: "swap" });
const display = Inter_Tight({ subsets: ["latin"], variable: "--f-display", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Trades Abroad — Skilled Hands. Global Future.", template: "%s · Trades Abroad" },
  description: "Discover international opportunities for skilled trades professionals and connect with employers worldwide.",
};
export const viewport: Viewport = { themeColor: "#080B09" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
