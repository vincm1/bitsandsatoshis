// SSR: RSS-Feed unter der eigenen Domain — Items kommen live von beehiiv.
// Bewusst ohne Volltext (getPosts liefert keinen contentHtml): Titel + Teaser
// mit Link auf die Ausgabenseite reichen für Feed-Reader und ziehen Leser
// auf die eigene Site statt zu beehiiv.
export const prerender = false;

import type { APIRoute } from "astro";
import { getPosts } from "../lib/beehiiv";
import { escapeXml } from "../lib/format";

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts({ limit: 50 });

  const items = posts
    .map((post) => {
      const link = new URL(`/newsletter/${post.slug}`, site).href;
      const description = post.teaser || post.subtitle;
      const pubDate = post.publishedAt
        ? `\n      <pubDate>${post.publishedAt.toUTCString()}</pubDate>`
        : "";
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(description)}</description>${pubDate}
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bits&amp;Satoshis</title>
    <link>${escapeXml(site!.href)}</link>
    <description>Der ruhige Bitcoin-Newsletter für Menschen, die verstehen wollen, nicht spekulieren.</description>
    <language>de</language>
    <atom:link href="${escapeXml(new URL("/rss.xml", site).href)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
};
