import Link from "next/link";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";
import { SITE } from "@/lib/site";
const cols = [
  { h: "For Workers", l: [["Find Jobs", "/jobs"], ["Skilled Trades", "/trades"], ["Destinations", "/destinations"], ["How It Works", "/how-it-works"]] },
  { h: "For Employers", l: [["Employer Solutions", "/employers"], ["Hire Talent", "/contact"]] },
  { h: "Resources", l: [["Insights", "/resources"], ["FAQ", "/faq"], ["About Us", "/about"], ["Contact", "/contact"]] },
];
export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-ink2">
      <div className="container-x grid gap-12 pb-12 pt-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-mute">Connecting skilled trades professionals with international career opportunities, and helping employers reach qualified talent.</p>
          <NewsletterForm />
          <a href={`mailto:${SITE.email}`} className="mt-5 inline-block text-sm text-fg/80 hover:text-lime">{SITE.email}</a>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <h3 className="eyebrow">{c.h}</h3>
            <ul className="mt-5 space-y-3 text-sm text-mute">{c.l.map(([t, h]) => <li key={t}><Link href={h} className="transition-colors hover:text-fg">{t}</Link></li>)}</ul>
          </div>
        ))}
      </div>
      <div aria-hidden className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[clamp(3rem,14.5vw,15rem)] font-bold leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(200,241,105,.28)]">TRADES ABROAD</div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-mute sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Trades Abroad. All rights reserved.</p>
          <p className="flex gap-5"><Link href="/privacy" className="hover:text-fg">Privacy Policy</Link><Link href="/terms" className="hover:text-fg">Terms &amp; Conditions</Link></p>
        </div>
      </div>
    </footer>
  );
}
