import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { articles, destinations, jobs, trades } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = ["", "/jobs", "/trades", "/destinations", "/how-it-works", "/about", "/employers", "/contact", "/resources", "/faq", "/privacy", "/terms"];
  const dyn = [...trades.map((t) => `/trades/${t.slug}`), ...destinations.map((d) => `/destinations/${d.slug}`), ...articles.map((a) => `/resources/${a.slug}`), ...jobs.map((j) => `/jobs/${j.slug}`)];
  return [...base, ...dyn].map((p) => ({ url: `${SITE.url}${p}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 }));
}
