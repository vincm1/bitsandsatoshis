# src/ — Routing & Seiten

> **Warum liegt diese Datei hier und nicht in `src/pages/`?** Astro routet
> jede Markdown-Datei in `src/pages/` als öffentliche Seite — eine
> `CLAUDE.md` dort würde als `/CLAUDE` live gehen. Die Doku für `src/pages/`
> lebt deshalb eine Ebene höher.

## src/pages/ — Zweck
Datei-basiertes Routing. Jede `.astro`-Datei = eine URL. **Hybrid**
(`output: 'static'` + Vercel-Adapter): statisch ist der Default, Seiten mit
`export const prerender = false` rendern serverseitig zur Request-Zeit.

**Keine `.md`-Dateien in `src/pages/` ablegen** — sie werden zu öffentlichen
Routen. Inhalts-Markdown gehört nach `src/content/`.

## Routen
```
index.astro             → /                    SSR       Hero, 3 Ausgaben, Autor,
                                                         Pullquote, Q&A, 2. CTA
archiv.astro            → /archiv              SSR       Alle Ausgaben
newsletter/[slug].astro → /newsletter/:slug    SSR       Einzel-Ausgabe (s.u.)
ueber.astro             → /ueber               SSR       Autor + Arbeitsweise
[wissen].astro          → /:slug               statisch  5 Wissensseiten aus
                                                         src/content/wissen/*.md
t/[...tag].astro        → /t/*                 SSR       beehiiv-Altlast → /archiv
abmelden.astro          → /abmelden            SSR       Action unsubscribe
willkommen.astro        → /willkommen          statisch  Ziel der Opt-in-Mail, noindex
impressum.astro         → /impressum           statisch  aus src/lib/site.ts
datenschutz.astro       → /datenschutz         statisch  aus src/lib/site.ts
404.astro               → Fehlerseite          statisch  greift auch bei SSR-404s
api/subscribe.ts        → POST /api/subscribe  SSR       Signup → beehiiv
sitemap.xml.ts          → /sitemap.xml         SSR       statische Routen + Slugs
rss.xml.ts              → /rss.xml             SSR       RSS 2.0, Links auf eigene Domain
```
`robots.txt` liegt in `public/` und verweist auf die Sitemap.
301-Redirects für alte beehiiv-Pfade stehen in `astro.config.mjs`.

## Muster für jede Seite
```astro
---
export const prerender = false;              // nur wenn die Seite Live-Daten braucht
import Layout from "../layouts/Layout.astro";
import SignupCta from "../components/SignupCta.astro";
import { getPosts } from "../lib/beehiiv";   // Daten serverseitig
const posts = await getPosts({ limit: 3 });  // beehiiv nur hier, nie im Client
---
<Layout title="… — Bits&Satoshis" description="…">
  <!-- Inhalt -->
  <SignupCta />
</Layout>
```

## Regeln
1. Immer in `Layout.astro` rendern, mit sinnvollem `title` + `description`.
2. beehiiv-Daten **nur** über `src/lib/beehiiv.ts` holen (nie direkt fetchen).
3. Jede inhaltliche Seite endet mit `<SignupCta />`. Steht der CTA doppelt auf
   einer Seite, bekommt nur der letzte den Anker (`anchorId={null}` am ersten)
   und jeder eine eigene `formId` — sonst doppelte Element-IDs.
4. Texte deutsch, Ton ruhig/klar. Kein Em-Dash (`DESIGN.md` §3).
5. 404 für nicht gefundene dynamische Inhalte:
   `return new Response(null, { status: 404 });`
6. Neue Seite anlegen? Nutze das Skill `/neue-seite`.

## newsletter/[slug].astro — Einzel-Ausgabe
- Liest `Astro.params.slug` und holt die Ausgabe via `getPost(slug)`
  (`src/lib/beehiiv.ts`), inkl. vollem Inhalt.
- Kein Treffer → `return new Response(null, { status: 404 })`.
- Rendert Datum, Titel, Untertitel, den Inhalt via `set:html={post.contentHtml}`
  in `.article-prose`, einen Fallback-Block mit Link zu beehiiv falls
  `contentHtml` fehlt, und den Signup-CTA.
- Satzbreite hier 720px statt 620px (dokumentierte Ausnahme, `DESIGN.md` §4).
- Übergibt das beehiiv-Thumbnail als `ogImage` an das Layout und ergänzt ein
  `Article`-JSON-LD.

### Sicherheit / Inhalt
`set:html` rendert HTML von beehiiv. Die Quelle ist die eigene Publikation und
damit vertrauenswürdig; `extractArticleHtml()` in `beehiiv.ts` strippt Skripte,
Styles und alle `style=`/`class=`-Attribute. Keine Nutzereingaben hier einsetzen.

### Slug vs. ID
beehiiv adressiert Posts per `post_…`-ID. `getPost` akzeptiert beides: bei einem
Slug ermittelt es die ID über die Postliste. URLs nutzen den menschenlesbaren
`slug` aus dem Post.
