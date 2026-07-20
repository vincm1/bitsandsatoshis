# src/layouts/

## Zweck
Seiten-Layouts die den gemeinsamen Rahmen (Head, Nav, Footer, Meta-Tags,
Fonts, globale Styles) bereitstellen.

## Layout.astro — Haupt-Layout
Jede Seite rendert in `Layout.astro`. Es lädt die Fonts, die globale CSS,
setzt Meta-Tags und rahmt den `<slot />` mit `<Nav />` und `<Footer />`.

### Props
```typescript
interface Props {
  title?: string;        // <title> + og:title (Default: Marken-Titel)
  description?: string;  // Meta-Description + og:description (Default: Positionierung)
}
```

### Standard-Titel-Format
```
Seitenname — Bits&Satoshis
Beispiel: "Archiv — Bits&Satoshis"
Homepage: "Bits&Satoshis — Der ruhige Bitcoin-Newsletter"
```

### Fonts (kein Google-CDN)
**Chaney + Satoshi** — Fontshare-CDN im `<head>`. Chaney gibt es nur dort,
Satoshi läuft aus demselben Request mit.

**IBM Plex Mono** — self-hosted, im Frontmatter:
```ts
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
```

Die Font-Families sind als Tailwind-Tokens in `src/styles/global.css`
(`@theme { --font-display / --font-sans / --font-mono }`) hinterlegt →
Utilities `font-display` / `font-sans` / `font-mono`.

Rollen sind strikt getrennt (siehe `/DESIGN.md` §03): Chaney nur H1–H3 und
nie unter 17px, Mono nur für Meta und nie für Prosa.

### Meta-Tags die immer gesetzt sind
`charset`, `viewport`, `description`, `og:title`, `og:description`,
`og:type=website`, `twitter:card=summary_large_image`. `lang="de"`.
OG-Bild kann später ergänzt werden (`/og-default.jpg`).

## Regeln
- Genau **ein** Layout für alle Seiten — keine Layout-Duplikate anlegen,
  stattdessen Props erweitern.
- `<body>` ist Flex-Column (`min-h-screen`), damit der Footer unten klebt.
- Keine seiten-spezifische Logik ins Layout — die gehört in die jeweilige Seite.
