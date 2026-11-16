"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function Preloader() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try { if (sessionStorage.getItem("ta-intro")) return; sessionStorage.setItem("ta-intro", "1"); } catch { /* storage blocked */ }
    setShow(true);
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div key="intro" exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-[100] grid place-items-center bg-ink" aria-hidden>
          <div className="text-center">
            <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-lime font-display text-4xl font-extrabold italic text-ink">TA</motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 font-display text-sm tracking-[0.35em] text-fg/70">SKILLED HANDS · GLOBAL FUTURE</motion.p>
            <div className="mx-auto mt-6 h-px w-56 overflow-hidden bg-white/10"><motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }} className="h-full bg-lime" /></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
