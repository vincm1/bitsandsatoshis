# src/styles/

## Zweck
Globale Styles, Design-Tokens und das DaisyUI-Theme.
**Verbindliche Quelle für alle Gestaltungsregeln: `/DESIGN.md` (v5.0).**

## global.css
Tailwind v4 wird **CSS-first** konfiguriert — es gibt **keine**
`tailwind.config.mjs`. Alles lebt hier:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";   /* prose für Newsletter-Inhalte */
@plugin "daisyui";

@plugin "daisyui/theme" { name: "bitsandsatoshis"; … }  /* Markenfarben */
@theme { --font-display: Chaney; --font-sans: Satoshi; --font-mono: IBM Plex Mono; }
:root { --c-*, --f-*, --sp-*, --measure }
```

## Tokens

### Farben — fünf Tokens, wird nicht ergänzt
| Token | Wert | Rolle |
|---|---|---|
| `--c-paper` | `#F4EDE0` | Einziger Seitenhintergrund |
| `--c-ink` | `#221A0F` | **Fließtext** + Headlines + Input-Rahmen |
| `--c-orange` | `#E8832A` | **Nur Button-Hintergrund**, max. 2× pro Seite |
| `--c-stone` | `#5C4F3A` | Meta, Datum, Eyebrow, Microcopy — **nie Fließtext** |
| `--c-dust` | `#A89880` | **Nur** Linien und Placeholder — nie lesbarer Text |

`--c-rule` und `--c-white` sind veraltet und existieren nur noch für nicht
migrierte Komponenten.

### Schrift
| Token | Font | Rolle |
|---|---|---|
| `--f-display` | Chaney | H1–H3, Satzschreibung, nie unter 17px |
| `--f-body` | Satoshi | Fließtext, Buttons — nur Gewicht 400 und 500 |
| `--f-mono` | IBM Plex Mono | Datum, Lesezeit, Label — **nie Prosa** |

### Abstände
`--sp-1..5` = **8 / 16 / 24 / 40 / 64**. Zwischenwerte sind keine Option.

### Satzbreite
`--measure` = 620px. Linksbündig, eine Spalte.

## Utility-Klassen
`.measure` · `.rule` · `.h1` · `.h2` · `.h3` · `.font-display` · `.accent` ·
`.meta` · `.eyebrow`

## Regeln
- Farben **nie** hartkodiert in Komponenten — immer Tokens
  (`var(--c-ink)` oder DaisyUI `text-base-content`, `btn-primary`).
- Neue Design-Tokens als CSS-Variable ergänzen, nicht inline.
- `border-radius: 0` überall. Kein `box-shadow`.
- Kein `@media (prefers-color-scheme: dark)` — es gibt bewusst keinen Dark Mode.
- Kein `text-align: center`.
- Gliederung über Haarlinien (`.rule`) in Dust, nicht über Karten.
- Kein `text-transform: uppercase` auf Überschriften. Kein Versalsatz.

**Verbindlich ist `/DESIGN.md`.** Diese Datei ist nur die Kurzreferenz.
