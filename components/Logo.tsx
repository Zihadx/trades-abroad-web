import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/" aria-label="Trades Abroad home" className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime font-display text-lg font-extrabold italic text-ink">TA</span>
      <span className="font-display text-[0.95rem] font-semibold leading-[1.05] tracking-[0.12em]">TRADES<br />ABROAD</span>
    </Link>
  );
}
