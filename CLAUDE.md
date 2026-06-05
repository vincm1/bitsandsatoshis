# Bits&Satoshis — Website Projekt

## Was ist das?
Die offizielle Website für den deutschsprachigen Bitcoin-Newsletter **Bits&Satoshis** (bitsandsatoshis.com).

## Positionierung (immer im Kopf behalten)
> "Der ruhige Bitcoin-Newsletter für Menschen, die verstehen wollen — nicht spekulieren."

- **Bitcoin-Only** — kein Krypto-Allgemein, kein Trading, keine Altcoins
- **Ton:** ruhig, klar, meinungsstark — nie hyped, nie panisch
- **Zielgruppe:** 30–50 Jahre, DACH, interessierte Einsteiger
- **Ziel der Website:** Newsletter-Signups generieren + in Bitcoin AI Lernapp konvertieren

## Tech Stack
- **Framework:** Astro 6 (`output: 'server'`, Full SSR)
- **Hosting:** Vercel (Adapter `@astrojs/vercel`)
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`) + DaisyUI v5
- **Interaktivität:** Vue 3 Islands (`@astrojs/vue`) für client-seitige Komponenten (z.B. `Navbar.vue`)
- **Fonts:** `@fontsource` (self-hosted Inter + Playfair Display) — kein Google-CDN
- **Newsletter:** beehiiv REST API v2
- **Server-Logik:** Astro Actions (`src/actions/`) statt separater Functions
- **Sprache:** TypeScript, UI komplett auf Deutsch

> **Hinweis:** Eine frühere Version dieser Datei nannte Netlify + Netlify
> Functions + Astro 5 hybrid. Das ist überholt — verbindlich ist Vercel +
> Astro 6 + Full SSR. beehiiv-Calls laufen serverseitig (SSR-Frontmatter /
> Actions), der API-Key bleibt dadurch automatisch geheim.

## Branding
```
Orange (Primär):   #F7931A   ← Bitcoin Orange, für CTAs und Highlights
Cremeweiß (BG):    #FAF7F2   ← Hintergrund, warm nicht steril
Dunkelgrau (Text): #2D2D2D
Hellgrau:          #E8E4DF
```
**Schriften:** Inter (Bold für Headlines), Playfair Display Italic (Akzente).
Akzent-Helper: CSS-Klasse `.accent` (Playfair, kursiv). DaisyUI-Theme heißt
`bitsandsatoshis` (definiert in `src/styles/global.css`).

## Projektstruktur
```
/
├── CLAUDE.md                        ← du bist hier
├── src/
│   ├── components/                  ← Wiederverwendbare UI-Komponenten
│   │   └── CLAUDE.md
│   ├── layouts/                     ← Seiten-Layouts
│   │   └── CLAUDE.md
│   ├── pages/                       ← Routen (Dateiname = URL), SSR
│   │   ├── CLAUDE.md
│   │   └── newsletter/[slug].astro  ← Einzel-Ausgabe
│   │       └── CLAUDE.md
│   ├── lib/                         ← beehiiv-Client, Helfer (nur serverseitig)
│   │   └── CLAUDE.md
│   ├── actions/                     ← Astro Actions (Signup etc.)
│   │   └── CLAUDE.md
│   └── styles/
│       ├── CLAUDE.md
│       └── global.css               ← Tailwind, DaisyUI-Theme, Fonts-Tokens
├── .claude/skills/                  ← Projekt-Workflows (neue-seite, …)
├── docs/superpowers/specs/          ← Design-Specs
├── .env                             ← NIEMALS committen
├── .env.example                     ← committen
└── astro.config.mjs                 ← Vercel-Adapter + Tailwind-Vite-Plugin
```
> Tailwind v4 braucht **keine** `tailwind.config.mjs` — Theme & Tokens leben in
> `src/styles/global.css` (`@theme`, `@plugin "daisyui/theme"`).

## Routen
| Route | Inhalt |
|---|---|
| `/` | Hero + Signup, Positionierung, letzte 3 Ausgaben |
| `/archiv` | Alle Ausgaben (Karten-Grid) |
| `/newsletter/[slug]` | Einzelne Ausgabe, voller Inhalt |
| `/ueber` | Vorstellung Vincent + Mission |
| `/impressum`, `/datenschutz` | DSGVO-Platzhalter |

## Environment Variables
```bash
BEEHIIV_API_KEY=           # beehiiv API Key (Settings → API)
BEEHIIV_PUBLICATION_ID=    # beehiiv Publication ID
```
Fehlen die Keys, liefert `src/lib/beehiiv.ts` Mock-Daten und der Signup läuft im
Demo-Modus — die Seite ist also auch ohne Konfiguration lauffähig.

## Wichtige Regeln
1. **API-Keys niemals im Client.** beehiiv nur aus SSR-Frontmatter oder Actions
   aufrufen — beides läuft serverseitig. `import.meta.env.BEEHIIV_*` (ohne
   `PUBLIC_`-Präfix) ist nie im Browser sichtbar.
2. Kein direkter beehiiv-Fetch aus Client-Skripten. Immer über `src/lib/beehiiv.ts`.
3. Alle Texte auf Deutsch.
4. Kein Kurs-Ticker, keine Preis-Charts — das ist kein Trading-Portal.
5. Jede Seite endet mit einem Newsletter-Signup-CTA (`<SignupForm />`).
6. Branding-Tokens nutzen (DaisyUI `primary`/`base-*`), keine hartkodierten Hex-Werte in Komponenten.

## Befehle
```bash
pnpm dev       # lokaler Dev-Server
pnpm build     # Produktions-Build (verifiziert Typen & Config)
pnpm preview   # Build lokal ansehen
git push       # Vercel deployt automatisch
```
