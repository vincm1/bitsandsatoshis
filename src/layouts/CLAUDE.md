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

### Fonts (wichtig: self-hosted, kein Google-CDN)
Im Frontmatter von `Layout.astro` per `@fontsource` importiert:
```ts
import "@fontsource/inter/400.css";        // …500, 600, 700, 800
import "@fontsource/playfair-display/400-italic.css"; // …500, 600 italic
```
Die Font-Families sind als Tailwind-Tokens in `src/styles/global.css`
(`@theme { --font-sans / --font-serif }`) hinterlegt → Utilities `font-sans` /
`font-serif`. Playfair nur kursiv für Akzente (`.accent`).

### Meta-Tags die immer gesetzt sind
`charset`, `viewport`, `description`, `og:title`, `og:description`,
`og:type=website`, `twitter:card=summary_large_image`. `lang="de"`.
OG-Bild kann später ergänzt werden (`/og-default.jpg`).

## Regeln
- Genau **ein** Layout für alle Seiten — keine Layout-Duplikate anlegen,
  stattdessen Props erweitern.
- `<body>` ist Flex-Column (`min-h-screen`), damit der Footer unten klebt.
- Keine seiten-spezifische Logik ins Layout — die gehört in die jeweilige Seite.
