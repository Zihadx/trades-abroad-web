# Trades Abroad — first release

Next.js (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · React Three Fiber / drei · Lucide

## Run
```bash
npm install
npm run typecheck   # run this first
npm run dev         # http://localhost:3000
npm run build
```
Requires Node 20.9+.

## Status (read this)
Written in an offline sandbox: it was **never installed, type-checked, built or viewed in a browser.** Expect a few small fixes on first run.

## Routes
`/`, `/trades`, `/trades/[slug]`, `/destinations`, `/destinations/[slug]`, `/jobs`, `/jobs/[slug]` (demo), `/how-it-works`, `/about`, `/employers`, `/resources`, `/resources/[slug]`, `/faq`, `/contact` (demo form, no backend).

## Imagery
- **Globe:** real NASA Blue Marble satellite + night-lights textures loaded from `unpkg.com/three-globe` (clouds from `threejs.org`). A day/night shader, atmosphere glow, stars and animated routes sit on top. If the textures can't load, it falls back to a procedural dotted globe.
- **Photos:** all Unsplash direct links, defined in `lib/images.ts`. Each image has a list of fallbacks tried in order, and finally a styled gradient, so nothing renders blank. Some IDs were verified from Unsplash pages; others were written from memory and **could not be tested offline**. Replace any that 404 (swap the ID in `lib/images.ts`). Unsplash images are free to use, but check the licence and credit photographers where appropriate.

## Where to edit
- `lib/data.ts`: trades, destinations, steps, FAQ, articles, demo jobs, route origin (`HUB`)
- `lib/images.ts`: every photo
- `app/globals.css`: tokens, buttons, marquee, beam, grain
- `components/Globe.tsx`: 3D globe

## Content rules
No fake vacancies, partners, stats or testimonials; demo/placeholder content is labelled. GSAP/Lenis not used; motion is Framer Motion (scroll parallax, tilt, reveals, marquee, progress bar).
