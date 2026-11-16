"use client";
/** Photo slot: drop a real image at `src` (under /public) and it replaces the placeholder automatically. */
export default function Photo({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#1d3022] via-surface to-ink ${className}`}>
      <div className="grid-bg absolute inset-0 opacity-50" />
      <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.2em] text-mute/70">Photo slot · {label}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
    </div>
  );
}
