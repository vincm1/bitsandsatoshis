const API_BASE = "https://api.beehiiv.com/v2";
const API_KEY = undefined                               ;
const PUBLICATION_ID = undefined                                      ;
const isConfigured = Boolean(API_KEY);
function authHeaders() {
  return {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json"
  };
}
function toUnixDate(value) {
  if (!value) return null;
  return new Date(value * 1e3);
}
function mapPost(raw) {
  return {
    id: raw.id,
    slug: raw.slug ?? raw.id,
    title: raw.title,
    subtitle: raw.subtitle ?? "",
    teaser: raw.preview_text ?? raw.meta_default_description ?? "",
    publishedAt: toUnixDate(raw.publish_date ?? raw.displayed_date),
    thumbnailUrl: raw.thumbnail_url ?? null,
    webUrl: raw.web_url ?? null,
    contentHtml: raw.content?.free?.web ?? null
  };
}
async function getPosts(opts = {}) {
  const { limit = 25 } = opts;
  if (!isConfigured) {
    return mockPosts.slice(0, limit);
  }
  const params = new URLSearchParams({
    status: "confirmed",
    order_by: "publish_date",
    direction: "desc",
    limit: String(limit)
  });
  const res = await fetch(
    `${API_BASE}/publications/${PUBLICATION_ID}/posts?${params}`,
    { headers: authHeaders() }
  );
  if (!res.ok) {
    throw new Error(
      `beehiiv getPosts fehlgeschlagen: ${res.status} ${res.statusText}`
    );
  }
  const json = await res.json();
  return json.data.map(mapPost);
}
async function getPost(slugOrId) {
  if (!isConfigured) {
    return mockPosts.find((p) => p.slug === slugOrId || p.id === slugOrId) ?? null;
  }
  let id = slugOrId;
  if (!slugOrId.startsWith("post_")) {
    const all = await getPosts({ limit: 100 });
    const match = all.find((p) => p.slug === slugOrId);
    if (!match) return null;
    id = match.id;
  }
  const params = new URLSearchParams();
  params.append("expand[]", "free_web_content");
  const res = await fetch(
    `${API_BASE}/publications/${PUBLICATION_ID}/posts/${id}?${params}`,
    { headers: authHeaders() }
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(
      `beehiiv getPost fehlgeschlagen: ${res.status} ${res.statusText}`
    );
  }
  const json = await res.json();
  return mapPost(json.data);
}
async function subscribe(email) {
  if (!isConfigured) {
    return {
      ok: true,
      message: "Demo-Modus: Anmeldung simuliert (beehiiv noch nicht verbunden)."
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
        utm_source: "website"
      })
    }
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `beehiiv subscribe fehlgeschlagen: ${res.status} ${detail}`
    );
  }
  return { ok: true, message: "Erfolgreich angemeldet." };
}
const mockPosts = [
  {
    id: "post_mock_3",
    slug: "was-ist-eigentlich-ein-satoshi",
    title: "Was ist eigentlich ein Satoshi?",
    subtitle: "Die kleinste Einheit von Bitcoin — und warum sie zählt.",
    teaser: "100 Millionen Satoshis ergeben einen Bitcoin. Ein ruhiger Blick auf die Einheit, die Bitcoin teilbar und alltagstauglich macht.",
    publishedAt: /* @__PURE__ */ new Date("2026-05-28T08:00:00Z"),
    thumbnailUrl: null,
    webUrl: "#",
    contentHtml: "<p>Dies ist eine <strong>Demo-Ausgabe</strong>. Sobald die beehiiv-API verbunden ist, erscheint hier der echte Newsletter-Inhalt.</p>"
  },
  {
    id: "post_mock_2",
    slug: "warum-21-millionen",
    title: "Warum 21 Millionen?",
    subtitle: "Über die feste Obergrenze und das Versprechen der Knappheit.",
    teaser: "Die magische Zahl, die Bitcoin von jeder anderen Währung unterscheidet. Wir schauen ruhig hin, ohne Hype.",
    publishedAt: /* @__PURE__ */ new Date("2026-05-21T08:00:00Z"),
    thumbnailUrl: null,
    webUrl: "#",
    contentHtml: "<p>Dies ist eine <strong>Demo-Ausgabe</strong>. Sobald die beehiiv-API verbunden ist, erscheint hier der echte Newsletter-Inhalt.</p>"
  },
  {
    id: "post_mock_1",
    slug: "verstehen-statt-spekulieren",
    title: "Verstehen statt spekulieren",
    subtitle: "Warum dieser Newsletter existiert.",
    teaser: "Eine kurze Einführung in die Idee hinter Bits&Satoshis: Bitcoin in Ruhe verstehen, ohne Kursgeschrei.",
    publishedAt: /* @__PURE__ */ new Date("2026-05-14T08:00:00Z"),
    thumbnailUrl: null,
    webUrl: "#",
    contentHtml: "<p>Dies ist eine <strong>Demo-Ausgabe</strong>. Sobald die beehiiv-API verbunden ist, erscheint hier der echte Newsletter-Inhalt.</p>"
  }
];

export { getPost as a, getPosts as g, subscribe as s };
