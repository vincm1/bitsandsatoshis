/**
 * beehiiv REST API v2 Client.
 *
 * Läuft ausschließlich serverseitig (SSR / Astro Actions). Der API-Key wird
 * über Environment-Variablen gelesen und niemals an den Client ausgeliefert.
 *
 * Solange BEEHIIV_API_KEY / BEEHIIV_PUBLICATION_ID nicht gesetzt sind, liefert
 * der Client Mock-Daten, damit die Seite ohne Konfiguration lauffähig ist.
 */

const API_BASE = "https://api.beehiiv.com/v2";

const API_KEY = import.meta.env.BEEHIIV_API_KEY as string | undefined;
const PUBLICATION_ID = import.meta.env.BEEHIIV_PUBLICATION_ID as
  | string
  | undefined;

export const isConfigured = Boolean(API_KEY && PUBLICATION_ID);

/** Für die UI normalisierte Newsletter-Ausgabe. */
export interface NewsletterPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  teaser: string;
  publishedAt: Date | null;
  thumbnailUrl: string | null;
  webUrl: string | null;
  /** Voller HTML-Inhalt (nur via getPost mit free_web_content). */
  contentHtml: string | null;
}

/** Rohform eines beehiiv-Posts (nur die genutzten Felder). */
interface BeehiivPost {
  id: string;
  title: string;
  subtitle?: string;
  slug?: string;
  status?: string;
  publish_date?: number | null;
  displayed_date?: number | null;
  thumbnail_url?: string | null;
  web_url?: string | null;
  preview_text?: string | null;
  meta_default_description?: string | null;
  content?: {
    free?: { web?: string | null; rss?: string | null };
  };
}

interface BeehiivListResponse {
  data: BeehiivPost[];
  page: number;
  total_pages: number;
  total_results: number;
}

interface BeehiivSingleResponse {
  data: BeehiivPost;
}

function authHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

function toUnixDate(value?: number | null): Date | null {
  if (!value) return null;
  // beehiiv liefert Unix-Sekunden.
  return new Date(value * 1000);
}

/**
 * Liefert den Inner-HTML eines <div>, dessen öffnender Tag bei `startIdx`
 * beginnt — per Tiefenzählung, da Regex verschachtelte Divs nicht kann.
 */
function extractDivInner(html: string, startIdx: number): string | null {
  const openEnd = html.indexOf(">", startIdx);
  if (openEnd === -1) return null;

  const re = /<div\b|<\/div>/gi;
  re.lastIndex = openEnd + 1;
  let depth = 1;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    depth += m[0].toLowerCase() === "</div>" ? -1 : 1;
    if (depth === 0) return html.slice(openEnd + 1, m.index);
  }
  return null;
}

/** Inner-HTML des ersten Divs, auf das `marker` passt (id/class-Selektor). */
function extractByMarker(html: string, marker: RegExp): string | null {
  const m = marker.exec(html);
  if (!m) return null;
  return extractDivInner(html, m.index);
}

/**
 * Entfernt beehiiv-Chrome: Scripts, Style-Blöcke und sämtliche
 * Inline-Styles/Klassen. Die Typografie kommt vollständig aus
 * `.article-prose` auf der Detailseite.
 */
function sanitizeContentHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\s(?:style|class)=(?:"[^"]*"|'[^']*')/gi, "")
    .trim();
}

/** True, wenn das HTML sichtbaren Inhalt enthält (Text oder Bilder). */
function hasVisibleContent(html: string): boolean {
  if (/<img\b/i.test(html)) return true;
  return html.replace(/<[^>]+>/g, "").trim().length >= 40;
}

/**
 * Extrahiert den reinen Artikel-Inhalt aus den beehiiv-Content-Varianten.
 *
 * Der RSS-Content ist die sauberste Quelle (kein Header, keine Share-Buttons).
 * Web-Content dient als Fallback — dort liegt der Artikel in
 * `#content-blocks`; bei reinen E-Mail-Posts (platform: email) ist dieser
 * Container leer, dann gibt es nichts zu zeigen.
 */
function extractArticleHtml(
  free?: { web?: string | null; rss?: string | null },
): string | null {
  const rss = free?.rss ?? null;
  if (rss) {
    const body =
      extractByMarker(rss, /<div\b[^>]*class=['"][^'"]*beehiiv__body[^'"]*['"]/i) ??
      rss;
    const clean = sanitizeContentHtml(body);
    if (hasVisibleContent(clean)) return clean;
  }

  const web = free?.web ?? null;
  if (web) {
    const blocks = extractByMarker(
      web,
      /<div\b[^>]*id=['"]content-blocks['"]/i,
    );
    if (blocks) {
      const clean = sanitizeContentHtml(blocks);
      if (hasVisibleContent(clean)) return clean;
    }
  }

  return null;
}

function mapPost(raw: BeehiivPost): NewsletterPost {
  return {
    id: raw.id,
    slug: raw.slug ?? raw.id,
    title: raw.title,
    subtitle: raw.subtitle ?? "",
    teaser: raw.preview_text ?? raw.meta_default_description ?? "",
    publishedAt: toUnixDate(raw.publish_date ?? raw.displayed_date),
    thumbnailUrl: raw.thumbnail_url ?? null,
    webUrl: raw.web_url ?? null,
    contentHtml: extractArticleHtml(raw.content?.free),
  };
}

export interface GetPostsOptions {
  limit?: number;
}

/** Veröffentlichte Ausgaben, neueste zuerst. */
export async function getPosts(
  opts: GetPostsOptions = {},
): Promise<NewsletterPost[]> {
  const { limit = 25 } = opts;

  if (!isConfigured) {
    return mockPosts.slice(0, limit);
  }

  const params = new URLSearchParams({
    status: "confirmed",
    order_by: "publish_date",
    direction: "desc",
    limit: String(limit),
  });

  const res = await fetch(
    `${API_BASE}/publications/${PUBLICATION_ID}/posts?${params}`,
    { headers: authHeaders() },
  );

  if (!res.ok) {
    throw new Error(
      `beehiiv getPosts fehlgeschlagen: ${res.status} ${res.statusText}`,
    );
  }

  const json = (await res.json()) as BeehiivListResponse;
  return json.data.map(mapPost);
}

/** Einzelne Ausgabe inkl. vollem Web-Inhalt. slug oder id. */
export async function getPost(
  slugOrId: string,
): Promise<NewsletterPost | null> {
  if (!isConfigured) {
    return mockPosts.find((p) => p.slug === slugOrId || p.id === slugOrId) ?? null;
  }

  // beehiiv-Detailendpoint adressiert per id. Falls ein Slug übergeben wird,
  // ermitteln wir die id über die Liste.
  let id = slugOrId;
  if (!slugOrId.startsWith("post_")) {
    const all = await getPosts({ limit: 100 });
    const match = all.find((p) => p.slug === slugOrId);
    if (!match) return null;
    id = match.id;
  }

  const params = new URLSearchParams();
  // RSS ist die sauberste Inhaltsquelle (ohne beehiiv-Header/Share-Chrome);
  // Web dient als Fallback für Posts, die nur im Web publiziert wurden.
  params.append("expand[]", "free_rss_content");
  params.append("expand[]", "free_web_content");

  const res = await fetch(
    `${API_BASE}/publications/${PUBLICATION_ID}/posts/${id}?${params}`,
    { headers: authHeaders() },
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(
      `beehiiv getPost fehlgeschlagen: ${res.status} ${res.statusText}`,
    );
  }

  const json = (await res.json()) as BeehiivSingleResponse;
  return mapPost(json.data);
}

export interface SubscribeResult {
  ok: boolean;
  message: string;
}

/** UTM-Herkunft einer Anmeldung — Datengrundlage der Akquise-Statistik. */
export interface SubscribeUtm {
  source?: string;
  medium?: string;
  campaign?: string;
}

/** E-Mail bei beehiiv anmelden. */
export async function subscribe(
  email: string,
  utm: SubscribeUtm = {},
): Promise<SubscribeResult> {
  if (!isConfigured) {
    // Ohne Keys: Erfolg simulieren, damit das UI testbar ist.
    return {
      ok: true,
      message: "Demo-Modus: Anmeldung simuliert (beehiiv noch nicht verbunden).",
    };
  }

  const res = await fetch(
    `${API_BASE}/publications/${PUBLICATION_ID}/subscriptions`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: utm.source || "website",
        ...(utm.medium ? { utm_medium: utm.medium } : {}),
        ...(utm.campaign ? { utm_campaign: utm.campaign } : {}),
      }),
    },
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `beehiiv subscribe fehlgeschlagen: ${res.status} ${detail}`,
    );
  }

  return {
    ok: true,
    message:
      "Fast fertig. Bestätige die Anmeldung in der Mail, die gerade rausgegangen ist.",
  };
}

/** Mock-Ausgaben für den Demo-Modus ohne API-Keys. */
const mockPosts: NewsletterPost[] = [
  {
    id: "post_mock_3",
    slug: "was-ist-eigentlich-ein-satoshi",
    title: "Was ist eigentlich ein Satoshi?",
    subtitle: "Die kleinste Einheit von Bitcoin — und warum sie zählt.",
    teaser:
      "100 Millionen Satoshis ergeben einen Bitcoin. Ein ruhiger Blick auf die Einheit, die Bitcoin teilbar und alltagstauglich macht.",
    publishedAt: new Date("2026-05-28T08:00:00Z"),
    thumbnailUrl: null,
    webUrl: "#",
    contentHtml:
      "<p>Dies ist eine <strong>Demo-Ausgabe</strong>. Sobald die beehiiv-API verbunden ist, erscheint hier der echte Newsletter-Inhalt.</p>",
  },
  {
    id: "post_mock_2",
    slug: "warum-21-millionen",
    title: "Warum 21 Millionen?",
    subtitle: "Über die feste Obergrenze und das Versprechen der Knappheit.",
    teaser:
      "Die magische Zahl, die Bitcoin von jeder anderen Währung unterscheidet. Wir schauen ruhig hin, ohne Hype.",
    publishedAt: new Date("2026-05-21T08:00:00Z"),
    thumbnailUrl: null,
    webUrl: "#",
    contentHtml:
      "<p>Dies ist eine <strong>Demo-Ausgabe</strong>. Sobald die beehiiv-API verbunden ist, erscheint hier der echte Newsletter-Inhalt.</p>",
  },
  {
    id: "post_mock_1",
    slug: "verstehen-statt-spekulieren",
    title: "Verstehen statt spekulieren",
    subtitle: "Warum dieser Newsletter existiert.",
    teaser:
      "Eine kurze Einführung in die Idee hinter Bits&Satoshis: Bitcoin in Ruhe verstehen, ohne Kursgeschrei.",
    publishedAt: new Date("2026-05-14T08:00:00Z"),
    thumbnailUrl: null,
    webUrl: "#",
    contentHtml:
      "<p>Dies ist eine <strong>Demo-Ausgabe</strong>. Sobald die beehiiv-API verbunden ist, erscheint hier der echte Newsletter-Inhalt.</p>",
  },
];
