"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "/jobs", label: "Find Jobs" }, { href: "/trades", label: "Skilled Trades" },
  { href: "/destinations", label: "Destinations" }, { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" }, { href: "/employers", label: "Employer Solutions" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${solid || open ? "glass border-x-0 border-t-0" : ""}`}>
      <div className="container-x flex h-[76px] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-7 text-[0.88rem] text-fg/85 xl:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`relative py-1 transition-colors hover:text-lime ${path.startsWith(l.href) ? "text-lime" : ""}`}>{l.label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/employers" className="btn btn-ghost !py-2.5 !text-sm">Hire Talent</Link>
          <Link href="/jobs" className="btn btn-lime !py-2.5 !text-sm">Find Opportunities <ArrowRight size={16} /></Link>
        </div>
        <button className="grid h-11 w-11 place-items-center rounded-full border border-white/15 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="container-x flex h-[calc(100svh-76px)] flex-col overflow-y-auto pb-8 lg:hidden">
            <nav className="flex flex-col">
              {links.map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <Link href={l.href} className="flex items-center justify-between border-b border-white/10 py-4 font-display text-2xl">{l.label}<ArrowRight size={18} className="text-lime" /></Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto grid gap-3 pt-8">
              <Link href="/jobs" className="btn btn-lime justify-center">Find Opportunities <ArrowRight size={16} /></Link>
              <Link href="/employers" className="btn btn-ghost justify-center">Hire Talent</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
