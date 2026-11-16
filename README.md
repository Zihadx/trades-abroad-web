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

## Production notes
Included: SEO metadata, OG image, sitemap, robots, manifest, JSON-LD (Organization, WebSite, FAQPage), security headers, skip link, error/loading/404 states, honeypot + rate-limited contact/newsletter API (`/api/contact`, optional webhook via `CONTACT_WEBHOOK_URL`), privacy/terms templates, page transitions, custom cursor (fine pointers only), reduced-motion handling.

Before launch, you still need to: set `NEXT_PUBLIC_SITE_URL`; replace `hello@tradesabroad.example` in `lib/site.ts`; connect the contact API to a real destination (webhook/email/CRM) and a shared rate limiter; have the legal pages reviewed by counsel; replace placeholder testimonials with verified ones; verify every Unsplash link and licence; consider a Content-Security-Policy (not set, because it must allow Unsplash/unpkg/threejs.org); run Lighthouse and test on real devices; self-host the globe textures for reliability.

New signature features: pre-loader intro, scroll-lit manifesto, pinned horizontal trades gallery, interactive route planner (dotted world map), live destination clocks, giant footer wordmark.
