# Bits&Satoshis — Website Projekt

## Was ist das?
Die offizielle Website für den deutschsprachigen Bitcoin-Newsletter **Bits&Satoshis** (bitsandsatoshis.com).

## Positionierung (immer im Kopf behalten)
> "Der ruhige Bitcoin-Newsletter für Menschen, die verstehen wollen, nicht spekulieren."

- **Bitcoin-Only** — kein Krypto-Allgemein, kein Trading, keine Altcoins
- **Ton:** ruhig, klar, meinungsstark. Nie hyped, nie panisch
- **Zielgruppe:** 28–45, DACH, besitzt Bitcoin schon oder steht kurz davor. Sucht Einordnung, nicht Erklärung
- **Positionierung in einem Satz:** Blocktrainer erklärt, Bits&Satoshis bewertet
- **Einziges Ziel der Website:** Besucher gibt seine E-Mail-Adresse ein

> **Verbindlich für Gestaltung, Copy und SEO ist `/DESIGN.md`.**
> Weicht der Code davon ab, ist der Code falsch. `/PRODUCT.md` hält Marke,
> Zielgruppe und Design-Prinzipien fest.

## Tech Stack
- **Framework:** Astro 7 — `output: 'static'` + Adapter. Das ist seit Astro 5 das Hybrid-Modell (`output: 'hybrid'` existiert nicht mehr): statisch ist der Default, Seiten mit `export const prerender = false` rendern serverseitig
- **Hosting:** Vercel (Adapter `@astrojs/vercel`), Deploy automatisch bei `git push`
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`) + DaisyUI v5. **Keine** `tailwind.config.mjs` — CSS-first in `src/styles/global.css`
- **Interaktivität:** Vue 3 Islands (`@astrojs/vue`) — genau zwei: `SignupIsland.vue` (`client:idle`) und `Angebotskurve.vue` (`client:visible`). `Navbar.vue` ist eine SFC **ohne** client-Direktive und lädt kein Vue in den Browser
- **Fonts:** Astro-Fonts-API (`fonts:` in `astro.config.mjs`). Astro lädt sie zur Build-Zeit herunter und liefert sie von der eigenen Domain aus — kein Request an Fontshare, Google oder ein CDN
- **Newsletter:** beehiiv REST API v2
- **Server-Logik:** SSR-Frontmatter, `src/pages/api/subscribe.ts` und Astro Actions (`src/actions/`)
- **Analytics:** `@vercel/analytics` als `<Analytics />` im Layout
- **Sprache:** TypeScript. UI, Copy und Kommentare auf Deutsch, Code-Bezeichner auf Englisch

## Branding
> **Verbindlich ist `/DESIGN.md`.** Hier nur die Kurzfassung.

```
Paper (BG):     #F4EDE0   ← einziger Seitenhintergrund
Ink (Text):     #221A0F   ← Fließtext UND Headlines
Orange:         #E8832A   ← ausschließlich Button-Hintergrund, max. 2 pro Seite
Stone (Meta):   #5C4F3A   ← Datum, Labels, Placeholder
Dust (Linien):  #A89880   ← Haarlinien statt Karten. Nie lesbarer Text
```

**Schriften:** Cabinet Grotesk (H1–H3, Satzschreibung, nie unter 17px),
Satoshi (Fließtext, nur 400 und 500), IBM Plex Mono (Datum, Lesezeit, Label,
nie Prosa).

> Die Display-Schrift war ursprünglich Chaney. Die gibt es lizenzrechtlich
> nicht als Webfont; Cabinet Grotesk ist der Ersatz, wurde aber nie als
> Markenentscheidung getroffen. Offener Punkt, siehe `DESIGN.md` §3/§13.

**Kernregeln:** linksbündig, eine Spalte, 620px Satzbreite · Haarlinien statt
Karten · Abstände nur 8/16/24/40/64 · 0px Radius · keine Schatten · keine
Bilder · kein Dark Mode · kein Em-Dash in der Copy. DaisyUI-Theme heißt
`bitsandsatoshis` (in `src/styles/global.css`).

## Projektstruktur
```
/
├── CLAUDE.md                        ← du bist hier (AGENTS.md verweist hierher)
├── DESIGN.md                        ← verbindliche Design-, Copy- und SEO-Spec
├── PRODUCT.md                       ← Marke, Zielgruppe, Design-Prinzipien
├── src/
│   ├── components/                  ← Wiederverwendbare UI-Komponenten
│   │   └── CLAUDE.md
│   ├── layouts/                     ← Layout.astro (das einzige Layout)
│   │   └── CLAUDE.md
│   ├── CLAUDE.md                    ← Doku für pages/ (dort würde .md als Route gebaut!)
│   ├── pages/                       ← Routen (Dateiname = URL)
│   ├── content/wissen/              ← Markdown-Quellen der Wissensseiten
│   ├── lib/                         ← beehiiv-Client, Formatierung, Betreiberdaten
│   │   └── CLAUDE.md
│   ├── actions/                     ← Astro Actions (unsubscribe)
│   │   └── CLAUDE.md
│   └── styles/
│       ├── CLAUDE.md
│       └── global.css               ← Tailwind, DaisyUI-Theme, Tokens, Utilities
├── .claude/skills/                  ← Projekt-Workflows (neue-seite, …)
├── .env                             ← NIEMALS committen
└── astro.config.mjs                 ← Adapter, Fonts, Redirects, site
```

## Routen
| Route | Rendering | Inhalt |
|---|---|---|
| `/` | SSR | Hero + Signup, letzte 3 Ausgaben, Autor, Pullquote, Q&A, 2. CTA |
| `/archiv` | SSR | Alle Ausgaben als Liste |
| `/newsletter/[slug]` | SSR | Einzelne Ausgabe, voller Inhalt |
| `/ueber` | SSR | Vorstellung Vincent + Arbeitsweise |
| `/[wissen]` | statisch | 5 Wissensseiten aus `src/content/wissen/*.md` |
| `/t/[...tag]` | SSR | beehiiv-Altlast, leitet auf `/archiv` |
| `/abmelden` | SSR | Abmeldung über Action `unsubscribe` |
| `/willkommen` | statisch | Ziel der Opt-in-Mail, `noindex` |
| `/impressum`, `/datenschutz` | statisch | Betreiberdaten aus `src/lib/site.ts` |
| `/404` | statisch | Greift auch bei SSR-404s |
| `/api/subscribe` | SSR-Endpoint | POST, nimmt den Signup entgegen |
| `/rss.xml`, `/sitemap.xml` | SSR | Aus beehiiv-Daten erzeugt |

## Environment Variables
```bash
BEEHIIV_API_KEY=           # beehiiv API Key (Settings → API)
BEEHIIV_PUBLICATION_ID=    # beehiiv Publication ID
```
Fehlen die Keys, liefert `src/lib/beehiiv.ts` Mock-Daten und der Signup läuft im
Demo-Modus — die Seite ist also auch ohne Konfiguration lauffähig.

## Wichtige Regeln
1. **API-Keys niemals im Client.** beehiiv nur aus SSR-Frontmatter, Actions oder
   `/api/subscribe` aufrufen — alles serverseitig. `import.meta.env.BEEHIIV_*`
   (ohne `PUBLIC_`-Präfix) ist nie im Browser sichtbar.
2. Kein direkter beehiiv-Fetch aus Client-Skripten. Immer über `src/lib/beehiiv.ts`.
3. Alle Texte auf Deutsch, Code-Bezeichner auf Englisch.
4. Kein Kurs-Ticker, keine Preis-Charts. Die Angebotskurve im Hero ist die
   einzige Grafik der Marke und als Datengrafik dokumentiert (`DESIGN.md` §5).
5. Jede inhaltliche Seite endet mit einem Signup-CTA (`<SignupCta />`).
6. Branding-Tokens nutzen (`var(--c-ink)`, DaisyUI `primary`/`base-*`), keine
   hartkodierten Hex-Werte in Komponenten.

## Befehle
```bash
pnpm dev       # lokaler Dev-Server
pnpm build     # Produktions-Build (verifiziert Typen & Config)
pnpm preview   # Build lokal ansehen
git push       # Vercel deployt automatisch
```

> **Windows-Hinweis:** `pnpm build` rendert alle Seiten korrekt, bricht am Ende
> aber im Vercel-Adapter mit `EPERM: symlink` ab. Symlinks brauchen unter
> Windows Developer Mode oder Admin-Rechte. Auf Vercels Linux-Buildern tritt
> das nicht auf. Zum lokalen Verifizieren reicht `pnpm dev`.
