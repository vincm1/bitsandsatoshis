# src/styles/

## Zweck
Globale Styles, Design-Tokens und das DaisyUI-Theme.

## global.css
Tailwind v4 wird **CSS-first** konfiguriert — es gibt **keine**
`tailwind.config.mjs`. Alles lebt hier:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";   /* prose für Newsletter-Inhalte */
@plugin "daisyui";

@plugin "daisyui/theme" { name: "bitsandsatoshis"; … }  /* Markenfarben */
@theme { --font-sans: Inter…; --font-serif: Playfair Display…; }

.accent { font-family: var(--font-serif); font-style: italic; }
```

## Theme-Tokens (Markenfarben → DaisyUI)
| Token | Wert | Rolle |
|---|---|---|
| `--color-base-100` | `#FAF7F2` | Hintergrund (Cremeweiß) |
| `--color-base-content` | `#2D2D2D` | Text (Dunkelgrau) |
| `--color-primary` | `#F7931A` | Bitcoin Orange (CTAs/Akzente) |

## Regeln
- Farben **nie** hartkodiert in Komponenten — immer Tokens nutzen
  (`bg-base-100`, `text-primary`, `btn-primary`, …).
- Neue Design-Tokens als CSS-Variable im Theme/`@theme` ergänzen, nicht inline.
- `.accent` für die Serif-Kursiv-Akzente (Playfair). Sparsam einsetzen.
- Font-Gewichte, die genutzt werden, müssen in `Layout.astro` via `@fontsource`
  importiert sein.
