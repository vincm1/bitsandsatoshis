---
name: neue-komponente
description: Use when creating a new reusable UI component for the Bits&Satoshis website. Enforces DaisyUI usage, brand tokens, German copy, and the quiet/calm design rules.
---

# Neue Komponente anlegen (Bits&Satoshis)

Erstelle eine wiederverwendbare Komponente in `src/components/<Name>.astro`
(PascalCase).

## Checkliste

1. **Props typisieren** mit einem `interface Props` im Frontmatter.
2. **DaisyUI nutzen** wo möglich: `btn btn-primary`, `card`, `input
   input-bordered`, `navbar`, `menu`, `dropdown`. Theme: `bitsandsatoshis`.
3. **Markenfarben nur als Tokens** — `bg-base-100`, `text-base-content`,
   `text-primary`. **Keine** hartkodierten Hex-Werte.
4. **Design-Regeln** (siehe `src/components/CLAUDE.md`):
   - Cremeweiß als Standard-BG, Orange nur für CTA/Highlight/Hover.
   - Viel Whitespace. Maximal ein subtiler `shadow-md` (beim Hover).
   - Kein Icon-Overload.
   - Serif-Kursiv-Akzente über `.accent` (sparsam).
5. **Texte deutsch**, ruhiger Ton.
6. **Responsive / mobile-first**: Basis-Styles fürs Handy, Aufwertung via
   `sm: md: lg:`.
7. **Datenform**: Wenn die Komponente einen Post zeigt, nimm `NewsletterPost`
   aus `src/lib/beehiiv.ts` als Prop — nie die beehiiv-Rohform.
8. **Serverlogik gehört nicht rein** — beehiiv/Daten in der Seite holen und als
   Props reingeben. Ausnahme: Form-Actions (`actions.*`) dürfen referenziert
   werden (wie in `SignupForm.astro`).
9. **Verifizieren:** `pnpm build` grün, Komponente in einer Seite einbinden und
   im Dev-Server ansehen.

## Referenz
- Komponenten-Konventionen & Specs: `src/components/CLAUDE.md`
- Vorbilder: `SignupForm.astro`, `PostCard.astro`, `Nav.astro`
