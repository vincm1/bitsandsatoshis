// SSR: die Ausgaben-URLs kommen live von beehiiv — neue Ausgaben erscheinen
// ohne Redeploy in der Sitemap. @astrojs/sitemap kann dynamische SSR-Routen
// nicht erfassen, deshalb dieser eigene Endpoint.
export const prerender = false;

import type { APIRoute } from "astro";
import { getPosts } from "../lib/beehiiv";
import { escapeXml } from "../lib/format";

const STATIC_ROUTES = [
  "/",
  "/archiv",
  "/ueber",
  "/impressum",
  "/datenschutz",
  // Wissensseiten (§7) — statisch gebaut aus src/content/wissen/.
  "/was-ist-bitcoin",
  "/bitcoin-vs-gold",
  "/bitcoin-mythen",
  "/bitcoin-kaufen",
  "/bitcoin-verwahren",
];

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts({ limit: 100 });

  const urls = [
    ...STATIC_ROUTES.map((path) => ({ path, lastmod: null as Date | null })),
    ...posts.map((post) => ({
      path: `/newsletter/${post.slug}`,
      lastmod: post.publishedAt,
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(({ path, lastmod }) => {
    const loc = escapeXml(new URL(path, site).href);
    const lastmodTag = lastmod
      ? `\n    <lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>`
      : "";
    return `  <url>\n    <loc>${loc}</loc>${lastmodTag}\n  </url>`;
  })
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Eine Stunde CDN-Cache: entlastet die beehiiv-API, neue Ausgaben
      // erscheinen trotzdem zeitnah.
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
};
