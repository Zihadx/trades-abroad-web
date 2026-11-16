"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Globe = dynamic(() => import("./Globe"), { ssr: false, loading: () => <div className="orb m-auto h-[70%] w-[70%] animate-pulse opacity-60" /> });

export default function HeroGlobe({ active, onSelect }: { active: string | null; onSelect: (s: string | null) => void }) {
  const [mode, setMode] = useState<"pending" | "full" | "lite" | "static">("pending");
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(reduce ? "static" : window.innerWidth < 768 ? "lite" : "full");
  }, []);
  if (mode === "pending") return null;
  if (mode === "static") return <div className="orb m-auto h-[70%] w-[70%]" role="img" aria-label="Globe illustration" />;
  return <Globe active={active} onSelect={onSelect} lite={mode === "lite"} />;
}
