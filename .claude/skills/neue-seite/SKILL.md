---
name: neue-seite
description: Use when adding a new page/route to the Bits&Satoshis website. Ensures Astro SSR conventions, German copy, Layout usage, and a closing newsletter signup CTA.
---

# Neue Seite anlegen (Bits&Satoshis)

Lege eine neue Route unter `src/pages/` an. Datei-basiertes Routing:
Dateiname = URL (`src/pages/foo.astro` → `/foo`).

## Checkliste

1. **Datei erstellen** in `src/pages/<name>.astro` (oder Unterordner für
   Verschachtelung). Kebab-case, deutsch (`/ueber`, nicht `/about`).
2. **In Layout rendern** mit sinnvollem `title` + `description`:
   ```astro
   ---
   import Layout from "../layouts/Layout.astro";
   ---
   <Layout title="Seitenname — Bits&Satoshis" description="…">
   ```
3. **Daten serverseitig** holen, falls nötig — nur über `src/lib/beehiiv.ts`,
   nie direkt fetchen, nie im Client. Beispiel: `const posts = await getPosts();`
4. **Inhalt** in deutschem, ruhigem Ton (siehe root `CLAUDE.md` Positionierung).
   Markenfarben über DaisyUI-Tokens (`text-primary`, `bg-base-100`), keine Hex.
   Serif-Akzente über `.accent`.
5. **Signup-CTA am Ende** — jede inhaltliche Seite schließt mit der
   wiederverwendbaren `<SignupCta />`-Komponente (optional `title`/`text`).
   Nicht den CTA-Block duplizieren.
6. **Dynamische Route?** Bei `[slug].astro`: 404 sauber behandeln —
   `return new Response(null, { status: 404 });`.
7. **Navigation** prüfen: soll die Seite in `Nav.astro` / `Footer.astro`
   verlinkt werden?
8. **Verifizieren:** `pnpm build` muss grün sein; Route lokal im Dev-Server
   aufrufen und Status 200 bestätigen.

## Referenz
- Konventionen: `src/pages/CLAUDE.md`
- Layout-Props: `src/layouts/CLAUDE.md`
