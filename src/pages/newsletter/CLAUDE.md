# src/pages/newsletter/

## Zweck
Einzelne Newsletter-Ausgabe unter eigener URL: `/newsletter/[slug]`.

## [slug].astro
- Liest `Astro.params.slug` und holt die Ausgabe via `getPost(slug)`
  (`src/lib/beehiiv.ts`), inkl. vollem Web-Inhalt (`expand[]=free_web_content`).
- Kein Treffer → `return new Response(null, { status: 404 })`.
- Rendert:
  - Datum (`formatDate`) + Titel + Untertitel
  - Voller Inhalt via `set:html={post.contentHtml}` in einem
    `prose prose-neutral`-Container (Tailwind Typography).
  - Fallback-Block mit Link zu beehiiv, falls `contentHtml` fehlt.
  - Signup-CTA am Ende.

## Sicherheit / Inhalt
- `set:html` rendert HTML von beehiiv. Die Quelle ist vertrauenswürdig (eigene
  Publikation), daher ok. Keine Nutzereingaben hier einsetzen.
- `prose`-Styling: Links in `primary`, Headings fett. Bei Bedarf
  `prose-*`-Modifier ergänzen, nicht globale Styles überschreiben.

## Slug vs. ID
beehiiv adressiert Posts per `post_…`-ID. `getPost` akzeptiert beides: bei einem
Slug ermittelt es die ID über die Postliste. URLs nutzen den menschenlesbaren
`slug` aus dem Post.
