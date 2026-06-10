# src/lib/

## Zweck
Server-seitige Logik & Helfer. Läuft nur im SSR / in Actions, **nie im Client**.

## Dateien
```
beehiiv.ts   ← beehiiv REST API v2 Client (Posts + Subscribe)
format.ts    ← Formatierung (deutsches Datum)
```

## beehiiv.ts
Einziger Ort, an dem mit der beehiiv-API gesprochen wird.

- Liest `import.meta.env.BEEHIIV_API_KEY` + `BEEHIIV_PUBLICATION_ID`.
  Ohne `PUBLIC_`-Präfix → niemals im Browser-Bundle.
- `isConfigured`: true wenn beide Keys gesetzt sind.
- **Mock-Fallback:** ohne Keys liefern `getPosts`/`getPost` Demo-Ausgaben und
  `subscribe` simuliert Erfolg. So bleibt die Seite ohne Config lauffähig.

### Öffentliche Funktionen
```ts
getPosts(opts?: { limit?: number }): Promise<NewsletterPost[]>   // neueste zuerst
getPost(slugOrId: string): Promise<NewsletterPost | null>        // inkl. contentHtml
subscribe(email: string): Promise<{ ok: boolean; message: string }>
```

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
Reine, seiteneffektfreie Formatierungshelfer (z.B. `formatDate` → "28. Mai 2026"
via `Intl.DateTimeFormat('de-DE')`). Keine API-Calls hier.
