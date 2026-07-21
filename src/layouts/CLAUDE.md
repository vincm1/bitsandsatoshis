# src/layouts/

## Zweck
Seiten-Layouts die den gemeinsamen Rahmen (Head, Nav, Footer, Meta-Tags,
Fonts, globale Styles) bereitstellen.

## Layout.astro — Haupt-Layout
Jede Seite rendert in `Layout.astro`. Es lädt die Fonts, die globale CSS,
setzt Meta-Tags und rahmt den `<slot />` mit `<Navbar />` und `<Footer />`.
Dazu `<Analytics />` (`@vercel/analytics`) für cookielose Reichweitenmessung,
die im Prod-Build von der eigenen Domain lädt (`/_vercel/insights`).

`<Navbar />` steht **ohne client-Direktive** im Markup — es geht also kein Vue
an den Browser. Der Header ist außerdem nicht `fixed`, sondern im Fluss; den
Abstand darunter setzt der Hero selbst. Wer hier etwas ändert, braucht kein
`scroll-mt` an Ankerzielen.

### Props
```typescript
interface Props {
  title?: string;        // <title> + og:title (Default: Marken-Titel)
  description?: string;  // Meta-Description + og:description (Default: Positionierung)
  ogImage?: string;      // og:image-Pfad/URL (Default: /og-default.jpg)
  article?: {            // nur Ausgabenseiten: og:type=article +
    publishedTime: Date | null;  // article:published_time/author
  };
}
```

Das Layout emittiert außerdem ein `WebSite`-JSON-LD auf jeder Seite;
`/newsletter/[slug]` ergänzt ein `Article`-, `/ueber` ein
`ProfilePage`-Schema in der jeweiligen Seite.

### Standard-Titel-Format
```
Seitenname — Bits&Satoshis
Beispiel: "Archiv — Bits&Satoshis"
Homepage: "Bits&Satoshis — Der ruhige Bitcoin-Newsletter"
```

### Fonts (keine Drittanbieter-Requests)
Alle drei Schriften laufen über die **Astro-Fonts-API**, konfiguriert unter
`fonts:` in `astro.config.mjs`. Astro lädt sie zur Build-Zeit herunter und
liefert sie mit Hash-Namen von der eigenen Domain aus. Im Browser entsteht
kein Request an Fontshare, Google oder ein anderes CDN — live nachgemessen.

Eingebunden werden sie im `<head>` über die `<Font />`-Komponente:
```astro
import { Font } from "astro:assets";
<Font cssVariable="--font-brand-display" preload />
<Font cssVariable="--font-brand-body" preload />
<Font cssVariable="--font-brand-mono" />
```

| Rolle | Familie | Schnitte | Provider | cssVariable |
|---|---|---|---|---|
| Display | Archivo | variabel 700–900 | Google | `--font-brand-display` |
| Fließtext | Satoshi | 400, 500 | Fontshare | `--font-brand-body` |
| Meta | IBM Plex Mono | 400, 500 | Google | `--font-brand-mono` |

Archivo wird immer mit `font-weight: 900` **und**
`font-variation-settings: 'wdth' 125` gesetzt (siehe `.font-display`, `.h1`,
`.h2` in `global.css`; `.h3` nutzt 110). Ohne die Breitenachse ist es eine
andere Schrift, gestalterisch gesehen.

Die `cssVariable`-Namen sind bewusst **nicht** `--font-display`/`--font-sans`/
`--font-mono`: die gehören Tailwind (`@theme` in `global.css`) und würden
kollidieren. `global.css` mappt die Tailwind- und die `--f-*`-Tokens auf diese
drei.

> `@fontsource/ibm-plex-mono` steht noch in der `package.json`, wird aber
> nirgends mehr importiert. Kann raus.

Rollen sind strikt getrennt (siehe `/DESIGN.md` §3): Display nur H1–H3 und nie
unter 17px, Mono nur für Meta und nie für Prosa.

### Meta-Tags die immer gesetzt sind
`charset`, `viewport`, `description`, Canonical-Link, RSS-`alternate`-Link,
`og:site_name/title/description/type/url/image/locale`,
`twitter:card=summary_large_image` + `twitter:title/description/image`.
`lang="de"`. Absolute URLs basieren auf `site` in `astro.config.mjs`.
Default-OG-Bild: `/og-default.jpg` (1200×630); Ausgabenseiten übergeben das
beehiiv-Thumbnail via `ogImage`-Prop.

## Regeln
- Genau **ein** Layout für alle Seiten — keine Layout-Duplikate anlegen,
  stattdessen Props erweitern.
- `<body>` ist Flex-Column (`min-h-screen`), damit der Footer unten klebt.
- Keine seiten-spezifische Logik ins Layout — die gehört in die jeweilige Seite.
