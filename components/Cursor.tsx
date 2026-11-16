"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
export default function Cursor() {
  const [on, setOn] = useState(false);
  const [big, setBig] = useState(false);
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 38, mass: 0.5 }), sy = useSpring(y, { stiffness: 450, damping: 38, mass: 0.5 });
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);
    const mv = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setBig(!!(e.target as Element | null)?.closest?.("a,button,input,select,textarea,summary,[role=button]")); };
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, [x, y]);
  if (!on) return null;
  return (
    <>
      <motion.div aria-hidden style={{ x: sx, y: sy }} className={`pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-lime transition-[width,height,margin,background-color] duration-200 ${big ? "-ml-8 -mt-8 h-16 w-16 bg-lime/10" : "-ml-5 -mt-5 h-10 w-10"}`} />
      <motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[90] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-lime" />
    </>
  );
}
