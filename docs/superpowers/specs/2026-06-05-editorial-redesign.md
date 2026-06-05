# Bits&Satoshis — Editorial Redesign

**Datum:** 2026-06-05
**Status:** Richtung freigegeben (Redaktionell, hell/creme)

## Richtung
Publikations-/Magazin-Ästhetik statt SaaS. Ruhig, warm, typografie-geführt —
löst die Positionierung „verstehen statt spekulieren" visuell ein. Bewusst
*keine* SaaS-Tropes (Feature-Grids, Gradients, Pricing-Tiers). Conversion-
Disziplin (klarer Signup, dezenter Social Proof) bleibt, redaktionell verpackt.

## Typografie
- **Display:** Fraunces Variable (`@fontsource-variable/fraunces`) — große
  Headlines, kursiv für Akzentworte. Token `--font-display`.
- **Body/UI:** Inter (bestehend).
- **Playfair entfällt** — `.accent` wird auf Fraunces-Kursiv umgestellt.
- Eyebrows/Labels: Inter, `uppercase`, weit getrackt (Kapitälchen-Look).

## Farben (unverändert, editorial eingesetzt)
- `base-100` #FAF7F2 Creme · `base-content` #2D2D2D · `primary` #F7931A.
- Neu als Motiv: **feine Orange-Linie** ganz oben, **Haarlinien** (`base-content/12`)
  als Trenner, **Nº-Nummerierung** der Ausgaben.

## Komponenten
- **Navbar (masthead):** Orange-Hairline oben, Logo links, Kapitälchen-Links,
  CTA rechts, Hairline unten. Beim Scrollen nur dezenter Creme-Hintergrund +
  Schatten — **kein floating Pill mehr** (zu „appig" für editorial).
- **Hero:** großes Fraunces-Headline mit kursivem Orange-Akzent, Eyebrow,
  Inline-Signup (Unterstrich-Feld + „Abonnieren →"), Social Proof.
- **IssueRow (neu):** editoriale Listenzeile — `Nº 014` · Serif-Titel ·
  Datum/Teaser · Pfeil, getrennt durch Haarlinien. Ersetzt `PostCard` auf
  Homepage & Archiv (Karten → Liste).
- **SignupForm:** zusätzliche Variante `inline` (Unterstrich-Stil).
- **SignupCta:** redaktionelles Band mit Rule + Eyebrow.
- **Footer:** Haarlinien, Kapitälchen, ruhig.

## Seiten
- `/` Hero + Positionierung + „Letzte Ausgaben" (IssueRow) + Signup-CTA.
- `/archiv` vollständige Ausgabenliste (IssueRow), evtl. nach Jahr gruppiert.
- `/newsletter/[slug]` Artikelkopf mit `Nº`, Fraunces-Titel, Rules; Inhalt als
  `prose`; Signup-CTA.
- `/ueber` redaktioneller Essay-Stil. `/impressum` `/datenschutz` erben Stil.

## Datenmodell
Unverändert — `NewsletterPost` aus `src/lib/beehiiv.ts`. `Nº` aus laufender
Nummer (Position/Index) oder später einem beehiiv-Feld; vorerst aus Reihenfolge.

## Umsetzungsreihenfolge
1. Tokens & Fonts (global.css, Layout) — Fraunces rein, Playfair raus, `.accent`.
2. Navbar → Masthead.
3. Hero + Homepage (inkl. IssueRow + Inline-Signup).
4. Archiv, Einzel-Ausgabe, Über.
5. Demo-Seiten (`/demo/*`) entfernen.

## Offen
- Font final: **Fraunces** (Default) vs. Playfair.
- `Nº`-Quelle langfristig (beehiiv-Feld vs. Reihenfolge).
