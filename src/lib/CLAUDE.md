# src/lib/

## Zweck
Server-seitige Logik & Helfer. Läuft nur im SSR / in Actions, **nie im Client**.

## Dateien
```
beehiiv.ts   ← beehiiv REST API v2 Client (Posts + Subscribe)
format.ts    ← reine Helfer: formatDate, readingTimeMinutes, escapeXml
site.ts      ← Betreiberdaten (OPERATOR) für Impressum und Datenschutz
```

Die Markdown-Quellen der Wissensseiten liegen **nicht** hier, sondern in
`src/content/wissen/*.md`; `src/pages/[wissen].astro` liest sie per
`import.meta.glob`.

## beehiiv.ts
Einziger Ort, an dem mit der beehiiv-API gesprochen wird.

- Liest `import.meta.env.BEEHIIV_API_KEY` + `BEEHIIV_PUBLICATION_ID`.
  Ohne `PUBLIC_`-Präfix → niemals im Browser-Bundle.
- `isConfigured`: true wenn beide Keys gesetzt sind.
- **Mock-Fallback:** ohne Keys liefern `getPosts`/`getPost` Demo-Ausgaben und
  `subscribe` simuliert Erfolg. So bleibt die Seite ohne Config lauffähig.

### Öffentliche Funktionen
```ts
getPosts(opts?: {
  limit?: number;          // Default 25
  withContent?: boolean;   // lädt den RSS-Inhalt mit, nur für die Lesezeit
}): Promise<NewsletterPost[]>                                    // neueste zuerst
getPost(slugOrId: string): Promise<NewsletterPost | null>        // inkl. contentHtml
subscribe(email: string): Promise<{ ok: boolean; message: string }>
```

`withContent` kostet pro Post einen größeren Response und ist deshalb nur für
kleine Listen gedacht: Die Startseite setzt es (drei Ausgaben, Lesezeit steht
in der Liste), das Archiv nicht.

### contentHtml — Bereinigung
`getPost` lädt `free_rss_content` (bevorzugt, sauber) + `free_web_content`
(Fallback, Artikel steckt in `#content-blocks`). `extractArticleHtml()` strippt
beehiiv-Chrome (Header/Byline/Share-Buttons), `<script>`/`<style>` sowie alle
`style=`/`class=`-Attribute — Typografie kommt allein aus `.article-prose` der
Detailseite. Bei reinen E-Mail-Posts ohne RSS-Inhalt ist `contentHtml` null
(Seite zeigt dann den Fallback-Block).
`NewsletterPost` ist die für die UI normalisierte Form (id, slug, title,
subtitle, teaser, publishedAt, thumbnailUrl, webUrl, contentHtml).

### Regeln
- Rohe beehiiv-Felder immer über `mapPost()` in `NewsletterPost` übersetzen —
  Komponenten sehen nie die API-Rohform.
- Fehler werfen (`throw new Error(...)`) statt still scheitern; die Seite/Action
  entscheidet über das Handling.
- Neue beehiiv-Endpunkte ergänzen? Nutze das Skill `/beehiiv-endpoint`.

## format.ts
Reine, seiteneffektfreie Helfer. Keine API-Calls hier.

```ts
formatDate(date: Date | null): string        // "28. Mai 2026", Intl de-DE
readingTimeMinutes(html: string): number     // Lesezeit aus dem Artikel-HTML
escapeXml(value: string): string             // für rss.xml.ts und sitemap.xml.ts
```

## site.ts
`OPERATOR` — Firma, Vertretungsberechtigter, Anschrift, Registergericht,
Handelsregisternummer, Kontakt-Mail, optional USt-IdNr. Eine Stelle zum
Pflegen statt zwei Seiten; `/impressum` und `/datenschutz` lesen daraus.
Betreiber ist eine UG, deshalb verlangt § 5 DDG die vollständigen Angaben
inklusive Rechtsformzusatz.
