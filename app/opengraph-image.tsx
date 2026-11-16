import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Trades Abroad — Skilled Hands. Global Future.";
export default function OG() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#080B09,#14200f)", color: "#F5F7F2" }}>
      <div style={{ fontSize: 28, letterSpacing: 8, color: "#C8F169" }}>TRADES ABROAD</div>
      <div style={{ fontSize: 110, fontWeight: 700, lineHeight: 1, marginTop: 30 }}>Skilled Hands.</div>
      <div style={{ fontSize: 110, fontWeight: 700, lineHeight: 1, color: "#C8F169" }}>Global Future.</div>
    </div>, { ...size });
}
