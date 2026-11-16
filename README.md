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

## Routes included
`/` (all 12 homepage sections), `/trades`, `/trades/[slug]`, `/destinations`, `/destinations/[slug]`, `/jobs` (filterable demo), `/how-it-works`, `/faq`, `/contact` (demo form), plus scaffolds for `/about`, `/employers`, `/resources`. Not yet built: `/jobs/[slug]`, `/resources/[slug]`.

## Photos
Drop licensed images in and they replace the placeholders automatically:
- `public/images/hero/worker.jpg`, `public/images/hero/employers.jpg`
- `public/images/trades/<slug>.jpg`: electrical, plumbing, welding, construction, carpentry, hvac, mechanical, heavy-equipment, automotive, other-trades
- `public/images/destinations/<slug>.jpg`: australia, canada, united-kingdom, germany, uae, new-zealand
- `public/images/articles/<slug>.jpg`: international-trades-careers, preparing-overseas, trades-in-demand
Your two mockups are in `public/reference/` (delete before deploying).

## Where to edit
- `lib/data.ts`: trades, destinations, steps, FAQ, demo jobs, route origin (`HUB`)
- `app/globals.css`: design tokens, buttons, glass
- `components/Globe.tsx`: 3D globe (procedural stylised continents; swap in a texture or GLB later)

## Content rules
No fake vacancies, partners, stats or testimonials; demo/placeholder content is labelled. GSAP and Lenis are not included; motion uses Framer Motion.
