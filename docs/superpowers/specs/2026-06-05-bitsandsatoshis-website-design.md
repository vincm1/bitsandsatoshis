# Bits&Satoshis — Website Design

**Datum:** 2026-06-05
**Status:** Freigegeben

## Ziel

Website für den Bitcoin-Newsletter "Bits&Satoshis". Positionierung:
> "Der ruhige Bitcoin-Newsletter für Menschen, die verstehen wollen — nicht spekulieren."

Sprache: **Deutsch** (einsprachig, erstmal).

## Tech Stack

- **Astro 6** (`output: 'server'`, Full SSR)
- **@astrojs/vercel** Adapter (Hosting: Vercel)
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **DaisyUI v5** als Component-Lib
- **@fontsource** für self-hosted Fonts (Inter, Playfair Display)
- **beehiiv REST API v2** (Newsletter-Archiv + Subscriber-Signup)

## Rendering-Strategie

Full SSR. beehiiv-Calls laufen serverseitig im Astro-Frontmatter → API-Key
bleibt geheim, kein separater API-/Functions-Layer nötig. Signup über eine
Astro **Action** (`subscribe`). Caching/Static-Optimierung optional später.

## Branding / Theme

| Token | Wert | DaisyUI-Rolle |
|---|---|---|
| Primär | `#F7931A` (Bitcoin Orange) | `primary` |
| Background | `#FAF7F2` (Cremeweiß) | `base-100` |
| Text | `#2D2D2D` (Dunkelgrau) | `base-content` |

- Headlines: **Inter** (sans, bold)
- Akzente: **Playfair Display Italic** (serif)
- Logo: Bits&Satoshis Bitcoin-Symbol — wird nachgereicht, bis dahin Text-Platzhalter.

Custom DaisyUI-Theme `bitsandsatoshis` in der globalen CSS.

## Seiten

| Route | Inhalt | Daten |
|---|---|---|
| `/` | Hero + Signup, Positionierung, letzte 3 Ausgaben | `getPosts({limit:3})` |
| `/archiv` | Alle Ausgaben als Karten-Grid | `getPosts()` |
| `/newsletter/[slug]` | Einzelne Ausgabe, voller Inhalt | `getPost(slug, expand=free_web_content)` |
| `/ueber` | Vorstellung Vincent + Mission | statisch |
| `/impressum` | Platzhalter (DSGVO) | statisch |
| `/datenschutz` | Platzhalter (DSGVO) | statisch |

## Komponenten

- `Layout.astro` — `<head>`, Fonts, globale CSS, Nav, Footer, slot
- `Nav.astro` — Logo-Platzhalter, Links (Start/Archiv/Über), Mobile-Burger
- `Footer.astro` — Mini-Signup, Impressum/Datenschutz-Links, Copyright
- `Hero.astro` — Headline + Playfair-Akzent + SignupForm
- `SignupForm.astro` — DaisyUI-Form, ruft `subscribe`-Action, Erfolg/Fehler-State
- `PostCard.astro` — Titel, Datum, Teaser, Thumbnail, Link

## beehiiv Client (`src/lib/beehiiv.ts`)

Liest `BEEHIIV_API_KEY` + `BEEHIIV_PUBLICATION_ID` aus env. Nur serverseitig.

- `getPosts(opts)` → `GET /v2/publications/{id}/posts` (status=confirmed, nach Datum)
- `getPost(slugOrId)` → einzelner Post mit `expand[]=free_web_content`
- `subscribe(email)` → `POST /v2/publications/{id}/subscriptions`
- `Authorization: Bearer`, TS-Typen, Fehlerbehandlung.

Bis env-Keys vorliegen: Mock-Daten, damit die Seite sofort lauffähig ist.

## Aufbaureihenfolge (Startliste)

1. Astro-Config: Vercel-Adapter + SSR + Tailwind-Vite-Plugin
2. Tailwind v4 + DaisyUI Setup mit Custom-Theme
3. Fonts (Inter + Playfair Display)
4. Layout + Nav + Footer
5. Homepage-Grundstruktur (Hero + Signup + Post-Grid mit Mock-Daten)

Danach: echter beehiiv-Client sobald env-Keys geliefert; Archiv- & Einzelseiten;
Über-, Impressum-, Datenschutz-Platzhalter.
