import Link from "next/link";
import Logo from "./Logo";
const cols = [
  { h: "For Workers", l: [["Find Jobs", "/jobs"], ["Skilled Trades", "/trades"], ["Destinations", "/destinations"], ["How It Works", "/how-it-works"]] },
  { h: "For Employers", l: [["Employer Solutions", "/employers"], ["Hire Talent", "/contact"]] },
  { h: "Resources", l: [["Insights", "/resources"], ["FAQ", "/faq"], ["About Us", "/about"], ["Contact", "/contact"]] },
];
export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-ink2">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-mute">Connecting skilled trades professionals with international career opportunities, and helping employers reach qualified talent.</p>
          <form className="mt-6 flex gap-2" action="#" aria-label="Newsletter">
            <label htmlFor="nl" className="sr-only">Email address</label>
            <input id="nl" type="email" placeholder="Your email" className="min-w-0 flex-1 rounded-full border border-white/15 bg-transparent px-4 py-2.5 text-sm placeholder:text-mute focus:border-lime focus:outline-none" />
            <button type="button" className="btn btn-lime !px-5 !py-2.5 !text-sm">Subscribe</button>
          </form>
          <p className="mt-2 text-xs text-mute/70">Demo form — not connected to a mailing service yet.</p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <h3 className="eyebrow">{c.h}</h3>
            <ul className="mt-5 space-y-3 text-sm text-mute">{c.l.map(([t, h]) => <li key={t}><Link href={h} className="hover:text-fg">{t}</Link></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-mute sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Trades Abroad. All rights reserved.</p>
          <p className="flex gap-5"><Link href="/about">Privacy Policy</Link><Link href="/about">Terms &amp; Conditions</Link></p>
        </div>
      </div>
    </footer>
  );
}
