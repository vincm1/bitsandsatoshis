# src/ — Routing & Seiten

> **Warum liegt diese Datei hier und nicht in `src/pages/`?** Astro routet
> jede Markdown-Datei in `src/pages/` als öffentliche Seite — eine
> `CLAUDE.md` dort würde als `/CLAUDE` live gehen. Die Doku für `src/pages/`
> (und `src/pages/newsletter/`) lebt deshalb eine Ebene höher.

## src/pages/ — Zweck
Datei-basiertes Routing. Jede `.astro`-Datei = eine URL. **Hybrid**
(`output: 'static'` + Vercel-Adapter): statisch ist der Default, Seiten mit
`export const prerender = false` rendern serverseitig zur Request-Zeit.

**Keine `.md`-Dateien in `src/pages/` ablegen** — sie werden zu öffentlichen
Routen.

## Routen
```
index.astro            → /            SSR  Hero + Signup + letzte Ausgaben
archiv.astro           → /archiv      SSR  Alle Ausgaben
newsletter/[slug].astro→ /newsletter/:slug  SSR  Einzel-Ausgabe (s.u.)
ueber.astro            → /ueber       SSR  (progressives SignupForm braucht Request-Zeit)
impressum.astro        → /impressum   statisch  DSGVO-Platzhalter
datenschutz.astro      → /datenschutz statisch  DSGVO-Platzhalter
api/subscribe.ts       → POST /api/subscribe  SSR-Endpoint → beehiiv (Signup)
sitemap.xml.ts         → /sitemap.xml  SSR  statische Routen + Ausgaben-Slugs
rss.xml.ts             → /rss.xml      SSR  RSS 2.0 (Titel + Teaser, Links auf eigene Domain)
```
`robots.txt` liegt in `public/` und verweist auf die Sitemap.

## Muster für jede Seite
```astro
---
import Layout from "../layouts/Layout.astro";
import { getPosts } from "../lib/beehiiv";   // Daten serverseitig
const posts = await getPosts({ limit: 3 });  // beehiiv nur hier, nie im Client
---
<Layout title="… — Bits&Satoshis" description="…">
  <!-- Inhalt -->
  <!-- Seite endet mit <SignupForm /> CTA -->
</Layout>
```

## Regeln
1. Immer in `Layout.astro` rendern, mit sinnvollem `title` + `description`.
2. beehiiv-Daten **nur** über `src/lib/beehiiv.ts` holen (nie direkt fetchen).
3. Jede inhaltliche Seite endet mit einem Signup-CTA (`<SignupForm />` oder ein
   eingebetteter CTA-Block wie auf der Einzel-Ausgabe).
4. Texte deutsch, Ton ruhig/klar (siehe root-CLAUDE.md Positionierung).
5. 404 für nicht gefundene dynamische Inhalte:
   `return new Response(null, { status: 404 });`
6. Neue Seite anlegen? Nutze das Skill `/neue-seite`.

## newsletter/[slug].astro — Einzel-Ausgabe
- Liest `Astro.params.slug` und holt die Ausgabe via `getPost(slug)`
  (`src/lib/beehiiv.ts`), inkl. vollem Web-Inhalt (`expand[]=free_web_content`).
- Kein Treffer → `return new Response(null, { status: 404 })`.
- Rendert:
  - Datum (`formatDate`) + Titel + Untertitel
  - Voller Inhalt via `set:html={post.contentHtml}` in `.article-prose`.
  - Fallback-Block mit Link zu beehiiv, falls `contentHtml` fehlt.
  - Signup-CTA am Ende.
- Übergibt das beehiiv-Thumbnail als `ogImage` an das Layout.

### Sicherheit / Inhalt
- `set:html` rendert HTML von beehiiv. Die Quelle ist vertrauenswürdig (eigene
  Publikation), daher ok. Keine Nutzereingaben hier einsetzen.

### Slug vs. ID
beehiiv adressiert Posts per `post_…`-ID. `getPost` akzeptiert beides: bei einem
Slug ermittelt es die ID über die Postliste. URLs nutzen den menschenlesbaren
`slug` aus dem Post.
