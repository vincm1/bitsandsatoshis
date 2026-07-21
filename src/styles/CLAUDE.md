# src/styles/

## Zweck
Globale Styles, Design-Tokens und das DaisyUI-Theme.
**Verbindliche Quelle für alle Gestaltungsregeln: `/DESIGN.md`.**

## global.css
Tailwind v4 wird **CSS-first** konfiguriert — es gibt **keine**
`tailwind.config.mjs`. Alles lebt hier:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";   /* prose für Newsletter-Inhalte */
@plugin "daisyui";

@plugin "daisyui/theme" { name: "bitsandsatoshis"; … }  /* Markenfarben */
@theme { --font-display / --font-sans / --font-mono }   /* → Astro-Font-Vars */
:root { --c-*, --f-*, --sp-*, --measure }
```

## Tokens

### Farben — fünf Tokens, wird nicht ergänzt
| Token | Wert | Rolle |
|---|---|---|
| `--c-paper` | `#F4EDE0` | Einziger Seitenhintergrund |
| `--c-ink` | `#221A0F` | **Fließtext** + Headlines + Input-Rahmen + Fokus-Ring |
| `--c-orange` | `#E8832A` | **Nur Button-Hintergrund**, max. 2× pro Seite |
| `--c-stone` | `#5C4F3A` | Meta, Datum, Eyebrow, Microcopy, Placeholder — **nie Fließtext** |
| `--c-dust` | `#A89880` | **Nur** Linien — nie Text, den jemand lesen soll |

`--c-rule` und `--c-white` sind veraltet und existieren nur noch für nicht
migrierte Komponenten.

> **Kontrast ist der Grund für diese Zuordnung.** Auf Paper gemessen:
> Ink 14,8:1 · Stone 6,9:1 · Orange 2,3:1 · Dust 2,4:1. Alles unter 4,5:1
> fällt bei WCAG AA für Text durch, alles unter 3:1 auch für Nicht-Text.
> Deshalb ist der Placeholder Stone und nicht Dust, und deshalb ist der
> Fokus-Ring Ink und nicht Orange.

### Schrift
| Token | Font | Rolle |
|---|---|---|
| `--f-display` | Archivo | H1–H3, Satzschreibung, nie unter 17px. Immer `font-weight: 900` + `font-variation-settings: 'wdth' 125` (H3: 110) |
| `--f-body` | Satoshi | Fließtext, Buttons — nur Gewicht 400 und 500 |
| `--f-mono` | IBM Plex Mono | Datum, Lesezeit, Label — **nie Prosa** |

Die Familien kommen aus der Astro-Fonts-API (`astro.config.mjs`), nicht aus
`@font-face`-Regeln in dieser Datei. Siehe `src/layouts/CLAUDE.md`.

### Abstände
`--sp-1..5` = **8 / 16 / 24 / 40 / 64**. Zwischenwerte sind keine Option.

### Satzbreite
`--measure` = 620px. Linksbündig, eine Spalte.
Ausnahme: Ausgabenseiten setzen auf 720px (§4).

## Utility-Klassen
`.measure` · `.rule` · `.h1` · `.h1-hero` · `.h2` · `.h3` · `.font-display` ·
`.accent` · `.meta` · `.eyebrow`

Größen (§3): `.h1-hero` 34–68px · `.h1` 30–44px · `.h2` 24–32px ·
`.h3` 17–19px · `.eyebrow` 12px Mono · `.meta` 11px Mono.

> `.h2` lag früher bei 22–24px. Zwischen Hero-H1 und Fließtext fehlte damit
> jede mittlere Stufe. Wer eine eigene Sektionsüberschrift baut, nutzt `.h2`
> und dupliziert die Größe **nicht** lokal — sonst bleibt sie beim nächsten
> Anheben zurück, wie es `BeforeSignup.astro` passiert ist.

## Regeln
- Farben **nie** hartkodiert in Komponenten — immer Tokens
  (`var(--c-ink)` oder DaisyUI `text-base-content`, `btn-primary`).
- Neue Design-Tokens als CSS-Variable ergänzen, nicht inline.
- `border-radius: 0` überall. Kein `box-shadow`.
- Kein `@media (prefers-color-scheme: dark)` — es gibt bewusst keinen Dark Mode.
- Kein `text-align: center`.
- Gliederung über Haarlinien (`.rule`) in Dust, nicht über Karten.
- Kein `text-transform: uppercase` auf Überschriften. Kein Versalsatz.

> **Kaskaden-Falle:** `:focus-visible` steht hier ungelayert. Ungelayerte
> Regeln schlagen alles aus `@layer utilities`, unabhängig von der Spezifität
> — Tailwind-Utilities kommen also nicht dagegen an. Wer einen Fokus-Stil pro
> Komponente braucht, nutzt scoped Styles einer SFC (ebenfalls ungelayert),
> siehe `SignupIsland.vue`.

**Verbindlich ist `/DESIGN.md`.** Diese Datei ist nur die Kurzreferenz.
