# Bits&Satoshis — Design System v4.0

> **Leitbild:** Druckwerk, das zufällig im Browser läuft.
> Retro-Editorial. Kein Hype. Kein SaaS-Template.

---

## Stil-Prinzip

Inspiriert von Arnold's Pump Club — das strukturelle Prinzip übernommen, die Lautstärke weggelassen. Bitcoin-Daten ersetzen die Persönlichkeit als visuelles Anker-Element. Jede Entscheidung kommt von einem einzigen Standpunkt: **Zeitungsdruck**.

---

## 01 Farben

### Palette

| Token | Hex | Name | Verwendung |
|---|---|---|---|
| `--c-paper` | `#F4EDE0` | Paper | **Einziger** Seitenhintergrund |
| `--c-orange` | `#E8832A` | Orange | CTAs · Akzente · Highlights |
| `--c-ink` | `#221A0F` | Warm Brown | Headlines · Sidebar · Ticker-BG |
| `--c-stone` | `#5C4F3A` | Stone | Fließtext · Body Copy |
| `--c-dust` | `#A89880` | Dust | Labels · Captions · Meta |
| `--c-rule` | `#C8BAA8` | Rule | Borders · Divider · Trennlinien |
| `--c-white` | `#FDFAF5` | White | Card-Hintergründe |

### Orange-Skala

| Stufe | Wert | Einsatz |
|---|---|---|
| Hintergrund | `rgba(232,131,42,0.10)` | Badge-BG |
| Border | `rgba(232,131,42,0.35)` | Badge-Rand |
| **Primary** | `#E8832A` | CTAs · Akzentlinien |
| Dark | `#B85A10` | Text auf Orange-BG |

### Regeln

- **Orange ist Signal, nie Fläche** — kein orangener Nav, kein orangener Section-BG
- **Paper ist der einzige Seitenhintergrund** — nie reines `#fff`
- **Stone für Fließtext** — nie reines Schwarz
- Orange erscheint maximal **3–4× pro Seite**: CTA, Headline-Akzent, Divider, Pullquote-Border
- Keine zwei verschiedenen Orangen mischen

---

## 02 Typografie

### Font-Duo

| Rolle | Font | Quelle | Gewichte | Aufgabe |
|---|---|---|---|---|
| **Display** | Chaney | Fontshare | 400 (regular) | H1 · H2 · Hero-Titel · UPPERCASE |
| **Text & UI** | Satoshi Variable | @fontsource | 300 · 400 · 500 · **700** | Body · Buttons · Labels · Nav · Pullquotes italic |

Chaney ist ausschließlich über Fontshare erhältlich (kein @fontsource). Satoshi Variable als npm-Paket via `@fontsource-variable/satoshi`. Kein dritter Serif nötig — Satoshi Italic übernimmt die Akzent-Rolle.

### Font-Loading

**In `Layout.astro` `<head>` (Fontshare CDN für Chaney):**
```html
<link rel="preconnect" href="https://api.fontshare.com" crossorigin />
<link href="https://api.fontshare.com/v2/css?f[]=chaney@400&display=swap" rel="stylesheet" />
```

**In `Layout.astro` Frontmatter (Satoshi selbst-gehostet):**
```ts
import "@fontsource-variable/satoshi";
// Gewicht-Utilities: 300/400/500/700 sind im Variable-Font abgedeckt
```

**pnpm install:**
```bash
pnpm add @fontsource-variable/satoshi
pnpm remove @fontsource/inter @fontsource/playfair-display @fontsource-variable/fraunces
```

### Typografie-Skala

| Rolle | Font | Größe | Besonderheit |
|---|---|---|---|
| Display H1 | Chaney 400 | `clamp(3.5rem, 9vw, 6rem)` | UPPERCASE · letter-spacing 0 |
| H2 Abschnitt | Chaney 400 | 24–32px | UPPERCASE |
| H3 Artikel | Satoshi 700 | 15–17px | Sentence case |
| Body | Satoshi 400 | 15px | line-height 1.75 · color: `--c-stone` |
| Pullquote | Satoshi 400 Italic | 18–20px | Orange 3px left-border |
| Eyebrow / Label | Satoshi 700 | 8–9px | UPPERCASE · letter-spacing 0.16em |

### Typografie-Regeln

- **Chaney UPPERCASE** für alle H1 und H2 — nie in Kleinschrift
- **Satoshi Sentence case** für H3, Body, Buttons — nie UPPERCASE
- **Satoshi Italic** für Pullquotes und redaktionelle Akzente — nie für strukturelles UI
- **Eyebrows in 8–9px**, nicht in 12px — klein und präzise, nicht dekorativ
- Chaney füllt den Container von Natur aus breit — kein `letter-spacing` nötig

---

## 03 Abstände

### Spacing Scale — 4px Basis

| Token | Wert | Verwendung |
|---|---|---|
| `--sp-1` | 4px | Icon-Gap, Dot-Abstände |
| `--sp-2` | 8px | Badge-Padding |
| `--sp-3` | 12px | Card-interner Gap |
| `--sp-4` | 16px | Card-Padding Standard |
| `--sp-6` | 24px | Sektion-Padding, Nav |
| `--sp-10` | 40px | Hero-Padding |
| `--sp-16` | 64px | Sektion-Abstand groß |
| `--sp-24` | 96px | Page-Top-Padding |

### Border Radius

| Wert | Token | Verwendung |
|---|---|---|
| **0px** | Standard | Buttons · Cards · Inputs — alles |
| 2px | minimal | Tags · Code-Labels |
| 9999px | pill | Badges · Status-Pills |
| 50% | circle | Stamps |

> Zeitungsdruck hat keine weichen Ecken. **0px ist der Standard.** 4px+ lässt alles nach SaaS aussehen.

---

## 04 CSS Tokens

```css
/* Bits&Satoshis — Design Tokens v3.0 */

:root {

  /* ── Farben ─────────────────────────────── */
  --c-paper:   #F4EDE0;   /* Seitenhintergrund */
  --c-orange:  #E8832A;   /* Akzent · CTA */
  --c-ink:     #221A0F;   /* Headlines · Sidebar */
  --c-stone:   #5C4F3A;   /* Fließtext */
  --c-dust:    #A89880;   /* Labels · Meta */
  --c-rule:    #C8BAA8;   /* Borders · Divider */
  --c-white:   #FDFAF5;   /* Card-BG */

  /* ── Fonts ──────────────────────────────── */
  --f-display: 'Chaney', sans-serif;
  --f-body:    'Satoshi Variable', 'Satoshi', sans-serif;

  /* ── Spacing ────────────────────────────── */
  --sp-1:  4px;   --sp-2:  8px;   --sp-3:  12px;
  --sp-4:  16px;  --sp-6:  24px;  --sp-10: 40px;
  --sp-16: 64px;  --sp-24: 96px;

  /* ── Borders ────────────────────────────── */
  --bd:        1px solid #C8BAA8;
  --bd-strong: 2px solid #221A0F;
  --bd-orange: 2px solid #E8832A;
}

/* ── Base ────────────────────────────────── */
body {
  font-family: var(--f-body);
  background: var(--c-paper);
  color: var(--c-ink);
  font-size: 15px;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
```

---

## 05 Buttons

### Varianten

| Variante | BG | Text | Border | Einsatz |
|---|---|---|---|---|
| **Primary** | `--c-orange` | `#fff` | — | Hauptaktion — 1× pro Viewport |
| Secondary | transparent | `--c-ink` | 1.5px `--c-ink` | Zweite Aktion |
| Ghost | transparent | `--c-orange` | 1.5px `--c-orange` | Tertiäre Aktion |

### Größen

| Name | Padding | Font-Size |
|---|---|---|
| Small | `6px 14px` | 11px |
| Default | `10px 22px` | 13px |
| Large | `13px 30px` | 15px · letter-spacing 0.04em |

```css
.btn {
  font-family: var(--f-body);
  font-weight: 600;
  border-radius: 0;           /* immer 0 */
  cursor: pointer;
  border: none;
  outline: none;
  letter-spacing: 0.02em;
  transition: opacity .12s, transform .08s;
}

.btn-primary   { background: var(--c-orange); color: #fff; }
.btn-secondary { background: transparent; color: var(--c-ink);    border: 1.5px solid var(--c-ink); }
.btn-ghost     { background: transparent; color: var(--c-orange); border: 1.5px solid var(--c-orange); }

.btn:active { transform: scale(0.98); }
.btn-primary:hover { opacity: 0.88; }
```

---

## 06 Badges

| Variante | BG | Text | Border | Radius | Einsatz |
|---|---|---|---|---|---|
| Orange | `rgba(232,131,42,0.1)` | `#9A5010` | `rgba(232,131,42,0.35)` | pill | Primäre Kategorie |
| Ink | `--c-ink` | `--c-paper` | — | 0 | Neuigkeiten · Ausgabe |
| Subtle | `rgba(168,152,128,0.12)` | `--c-stone` | `--c-rule` | 0 | Sekundäre Info |

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.badge-orange {
  background: rgba(232,131,42,0.1);
  color: #9A5010;
  border: 1px solid rgba(232,131,42,0.35);
  padding: 3px 9px;
  border-radius: 9999px;
}

.badge-ink {
  background: var(--c-ink);
  color: var(--c-paper);
  padding: 3px 9px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 9px;
}

.badge-subtle {
  background: rgba(168,152,128,0.12);
  color: var(--c-stone);
  border: 1px solid var(--c-rule);
  padding: 3px 9px;
}
```

---

## 07 Formulare

```css
.input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid var(--c-rule);
  background: var(--c-white);
  font-family: var(--f-body);
  font-size: 14px;
  color: var(--c-ink);
  border-radius: 0;
  outline: none;
  transition: border-color .12s;
}

.input::placeholder { color: var(--c-dust); }
.input:focus        { border-color: var(--c-orange); }
```

**Input-Group (Anmeldeformular):**

```html
<div style="display:flex;">
  <input class="input" type="email" placeholder="deine@email.de"
         style="border-right:none;" />
  <button class="btn btn-primary">Abonnieren</button>
</div>
<p style="font-size:11px; color:var(--c-dust); margin-top:6px;">
  Unabhängig · Werbefrei · Jederzeit abbestellbar
</p>
```

---

## 08 Cards

### Standard Card

```html
<div style="height:2px; background:var(--c-orange);"></div><!-- Akzent-Bar -->
<div class="card">
  <div class="card-label">Ausgabe #47</div>
  <div class="card-title">Titel des Artikels</div>
  <div class="card-body">Kurze Beschreibung...</div>
  <div class="card-foot">
    <span class="card-meta">5 Min. · Jun 2025</span>
    <span class="card-link">Lesen →</span>
  </div>
</div>
```

```css
.card {
  background: var(--c-white);
  border: 1px solid var(--c-rule);
  border-radius: 0;
  padding: 1.25rem;
}
.card-label  { font-size: 8px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-orange); }
.card-title  { font-size: 14px; font-weight: 600; color: var(--c-ink); letter-spacing: -0.01em; line-height: 1.3; }
.card-body   { font-size: 12px; color: var(--c-stone); line-height: 1.7; }
.card-link   { font-size: 11px; font-weight: 600; color: var(--c-orange); }
```

### Clipping Card (Zeitungsschnitt)

Schwarze 2px-Border. Orangener Stempel oben links. Im Hero leicht rotiert (`transform: rotate(-1.5deg)`).

```css
.card-clip {
  border: 2px solid var(--c-ink);
  background: var(--c-white);
  padding: 1rem 1.25rem;
  border-radius: 0;
  position: relative;
}

.card-clip-stamp {
  position: absolute;
  top: -9px; left: 10px;
  background: var(--c-orange);
  color: #fff;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 2px 8px;
}
```

### Dark Card (Kurs & Daten)

```css
.card-dark {
  background: var(--c-ink);
  border-radius: 0;
  padding: 1.25rem;
}
/* Label: --c-orange · Title: --c-paper · Body: --c-dust */
```

---

## 09 Divider

| Typ | CSS | Einsatz |
|---|---|---|
| Orange Akzentlinie | `height:2px; background:var(--c-orange); width:44px;` | Sektions-Opener unter Headlines |
| Standard | `border-top:1px solid var(--c-rule);` | Abschnitts-Trenner |
| Stark | `border-top:2px solid var(--c-ink); opacity:0.2;` | Haupt-Trennlinie |

---

## 10 Pullquote

```css
.pullquote {
  border-left: 3px solid var(--c-orange);
  padding: 0.25rem 0 0.25rem 1.25rem;
}

.pullquote-text {
  font-family: var(--f-body);
  font-style: italic;
  font-size: 19px;
  color: var(--c-ink);
  line-height: 1.5;
}

.pullquote-source {
  font-family: var(--f-body);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--c-dust);
  margin-top: 6px;
}
```

---

## 11 Stamps

Kreisförmige Retro-Elemente. **Im echten Einsatz immer rotiert** (`transform: rotate(±8–12deg)`).

```css
.stamp {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2.5px solid var(--c-orange);
  border-radius: 50%;
  width: 72px;
  height: 72px;
  text-align: center;
}

.stamp-num {
  font-family: var(--f-display);
  font-weight: 400;
  font-size: 22px;
  color: var(--c-ink);
  line-height: 1;
}
```

**Beispiele:** `seit 2009` · `#47 Jun 2025` · `21 Mio. Limit`

---

## 12 Ticker

Immer auf `--c-ink`-Hintergrund. Über dem Nav. Monospace-Orange für Werte.

```css
.ticker {
  background: var(--c-ink);
  padding: 6px 1.25rem;
  display: flex;
  gap: 1.25rem;
  align-items: center;
}

.ticker-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(244,237,224,0.3);
}

.ticker-val {
  font-size: 11px;
  font-weight: 700;
  color: var(--c-orange);
  font-family: 'Courier New', monospace;
}
```

**Inhalt:** BTC-Kurs · Ausgabennummer · Leseranzahl · Thema der Woche

---

## 13 Navigation

**Aufbau von oben nach unten:**

1. **Ticker** — `--c-ink`-BG, Daten in Orange-Monospace
2. **Nav** — `--c-paper`-BG, starker `2px --c-ink` Top-Border, Logo links, Links mitte, CTA rechts

```css
.nav {
  background: var(--c-paper);
  border-top: 2px solid var(--c-ink);
  border-bottom: 1px solid var(--c-rule);
  padding: 0 1.5rem;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

**Regeln:**
- Nav-Hintergrund: immer `--c-paper`, nie Orange
- Orange nur für CTA-Button und aktive Link-Unterstreichung — nie Nav-BG
- Kein Hamburger-Menü auf Desktop
- Aktueller Stand: Logo ist `/logo.svg` (SVG-Emblem, kein Text-Schriftzug im Nav)

---

## 14 Redaktioneller Stil

### 5 Kern-Prinzipien

**01 — Paper ist die Bühne, Orange ist das Spotlight**
Orange erscheint maximal 3–4× pro Seite. Nie als Fläche. Immer als Signal.

**02 — Typografie ist die Grafik**
Chaney in 50–96px übernimmt die Rolle der visuellen Hauptfigur. Die Font-Wahl ist die Persönlichkeit — kein dekoratives Beiwerk nötig.

**03 — Bitcoin-Daten als Collage-Elemente**
Kurs-Charts als Zeitungsausschnitte (2px Ink-Border, leicht rotiert). Preiszahlen auf Dark-Cards. Stamps mit Bitcoin-Jahreszahlen. Das Thema selbst wird zur Illustration.

**04 — Asymmetrie — kontrolliert**
Clipping-Cards `rotate(-1.5deg)`. Stamps `rotate(10deg)`. Nie mehr als 2–3 Elemente rotieren. Sonst chaotisch statt editorial.

**05 — 0px Radius überall**
Zeitungsdruck hat keine weichen Ecken. 4px+ lässt alles nach SaaS aussehen.

**Foto-Prinzip (wenn ein Foto eingebaut wird):**
Schwarz-weiß, freigestellt (kein rechteckiger Rahmen), leicht rotiert, auf Paper. Kein Hintergrund, keine weichen Schatten — wie aus einer Zeitung ausgeschnitten.

### Pump Club — Was wir übernehmen, was nicht

**Übernehmen:**
- Warmer Papierhintergrund als einzige Seitenbasis
- Ein einziger Akzent-Farb-Einsatz
- **Chaney** als ultra-breite Display-Type — keine Angst vor 70–96px
- **Satoshi Variable** als cleanem Body-Sans
- B&W Cut-Out-Fotos mit farbiger Rahmen-Bordüre
- Zeitungsschnitt-Ästhetik: Clippings, Stempel, Rotationen
- Schwarze harte Borders statt Schatten
- Asymmetrische Komposition links/rechts im Hero
- Daten-Ticker am oberen Rand
- 0px Radius

**Nicht übernehmen:**
- Kein Vollfarb-Orange als Section-Hintergrund
- Keine Comic-Blitze oder dekorativen Grafiken
- Kein Personenkult
- Kein Uppercase-Schreien im Fließtext
- Keine Collage-Fotos von Motorsport-Utensilien o.ä.
- Kein aggressiver Energie-Ton — ruhige Autorität

### Redaktionelle Stimme — Ton

**Do:**
> „Strategy hat verkauft. Die meisten Schlagzeilen erklären das falsch."

Direkte These. Klare Meinung. Keine Hedges.

**Don't:**
> „In der heutigen Ausgabe schauen wir uns gemeinsam an, was das vielleicht bedeuten könnte..."

Zu weich. Keine Haltung. Wirkt wie jeder andere Newsletter.

---

## 15 Do / Don't

### Do ✓

- Paper `#F4EDE0` als einzige Seiten-Hintergrundfarbe
- Orange maximal 3–4× pro Seite — nie als Fläche
- **Chaney** für alle H1 und H2 in UPPERCASE
- **Satoshi Variable** für Body, Buttons, Labels, Nav
- Satoshi Italic für Pullquotes und redaktionelle Akzente
- 0px Radius auf Buttons, Cards, Inputs — alles
- Ticker (Ink-BG) über dem Nav (Paper-BG)
- Clippings und Stamps für Retro-Editorial-Energie
- Focus-Ring immer Orange — kein Browser-Default-Blau
- Borders für Tiefe — kein `box-shadow` auf Karten

### Don't ✗

- Kein Orange als Sektion- oder Nav-Hintergrund
- Kein reines `#fff` als Seitenhintergrund — `--c-paper` verwenden
- Keine weichen Ecken (4px+) auf Buttons oder Cards
- Satoshi nicht in UPPERCASE für Fließtext oder Buttons
- Keine zwei verschiedenen Orangen mischen
- Nie mehr als einen Primary-Button pro Viewport
- Kein Uppercase für Text unter 20px außer Eyebrows (8–9px)
- Keine Comic-Blitze oder dekorativen Zier-Elemente
- Kein `box-shadow` auf Karten — nur Borders

---

## Astro-Integration

### Font-Setup in `Layout.astro`

**Frontmatter:**
```ts
import "@fontsource-variable/satoshi";   // selbst-gehostet via @fontsource
// import "@fontsource/inter/400.css";   // entfernen
// import "@fontsource-variable/fraunces"; // entfernen
```

**`<head>` (Fontshare CDN für Chaney):**
```html
<link rel="preconnect" href="https://api.fontshare.com" crossorigin />
<link href="https://api.fontshare.com/v2/css?f[]=chaney@400&display=swap" rel="stylesheet" />
```

**pnpm:**
```bash
pnpm add @fontsource-variable/satoshi
pnpm remove @fontsource/inter @fontsource/playfair-display @fontsource-variable/fraunces
```

### `src/styles/global.css` — Tokens

```css
@theme {
  --font-display: 'Chaney', sans-serif;
  --font-sans:    'Satoshi Variable', 'Satoshi', sans-serif;
}

:root {
  --c-paper:   #F4EDE0;
  --c-orange:  #E8832A;
  --c-ink:     #221A0F;
  --c-stone:   #5C4F3A;
  --c-dust:    #A89880;
  --c-rule:    #C8BAA8;
  --c-white:   #FDFAF5;

  --f-display: 'Chaney', sans-serif;
  --f-body:    'Satoshi Variable', 'Satoshi', sans-serif;

  --bd:        1px solid #C8BAA8;
  --bd-strong: 2px solid #221A0F;
  --bd-orange: 2px solid #E8832A;
}

body {
  font-family: var(--f-body);
  background: var(--c-paper);
  color: var(--c-ink);
  font-size: 15px;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
```

> **Hinweis:** DaisyUI-Theme-Tokens (`--color-base-100`, `--color-primary` etc.) in `global.css` separat pflegen und auf die `--c-*`-Werte abstimmen. Die `--c-*`-Tokens sind die kanonische Quelle; DaisyUI-Tokens sind Proxies davon.

---

*Bits&Satoshis Design System · v4.0 · Retro-Editorial · 2026*
