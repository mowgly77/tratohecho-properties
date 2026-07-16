// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
// Run with bun so .env (VITE_SUPABASE_*) is auto-loaded.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://inmobiliariaorquideas.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/propiedades", changefreq: "daily", priority: "0.9" },
  { path: "/contacto", changefreq: "monthly", priority: "0.6" },
];

async function fetchPropertyEntries(): Promise<SitemapEntry[]> {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    console.warn("Supabase env vars missing; skipping dynamic property routes.");
    return [];
  }

  try {
    const res = await fetch(
      `${url}/rest/v1/properties?select=slug,updated_at&activa=eq.true`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    );
    if (!res.ok) {
      console.warn(`Could not fetch properties (${res.status}); skipping.`);
      return [];
    }
    const rows = (await res.json()) as { slug: string; updated_at: string }[];
    return rows
      .filter((r) => r.slug)
      .map((r) => ({
        path: `/propiedad/${r.slug}`,
        lastmod: r.updated_at ? new Date(r.updated_at).toISOString().split("T")[0] : undefined,
        changefreq: "weekly" as const,
        priority: "0.8",
      }));
  } catch (err) {
    console.warn("Error fetching properties; skipping dynamic routes.", err);
    return [];
  }
}

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n")
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

const entries = [...staticEntries, ...(await fetchPropertyEntries())];
writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
