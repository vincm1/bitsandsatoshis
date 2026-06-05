# src/pages/

## Zweck
Datei-basiertes Routing. Jede `.astro`-Datei = eine URL. Alles läuft **SSR**
(`output: 'server'`), Daten werden im Frontmatter serverseitig geholt.

## Routen
```
index.astro            → /            Hero + Signup + letzte 3 Ausgaben
archiv.astro           → /archiv      Alle Ausgaben (Karten-Grid)
newsletter/[slug].astro→ /newsletter/:slug   Einzel-Ausgabe (eigener CLAUDE.md)
ueber.astro            → /ueber       Über Vincent + Mission
impressum.astro        → /impressum   DSGVO-Platzhalter
datenschutz.astro      → /datenschutz DSGVO-Platzhalter
```

## Muster für jede Seite
```astro
---
import Layout from "../layouts/Layout.astro";
import { getPosts } from "../lib/beehiiv";   // Daten serverseitig
const posts = await getPosts({ limit: 3 });  // beehiiv nur hier, nie im Client
---
<Layout title="… — Bits&Satoshis" description="…">
  <!-- Inhalt -->
  <!-- Seite endet mit <SignupForm /> CTA -->
</Layout>
```

## Regeln
1. Immer in `Layout.astro` rendern, mit sinnvollem `title` + `description`.
2. beehiiv-Daten **nur** über `src/lib/beehiiv.ts` holen (nie direkt fetchen).
3. Jede inhaltliche Seite endet mit einem Signup-CTA (`<SignupForm />` oder ein
   eingebetteter CTA-Block wie auf der Einzel-Ausgabe).
4. Texte deutsch, Ton ruhig/klar (siehe root-CLAUDE.md Positionierung).
5. 404 für nicht gefundene dynamische Inhalte:
   `return new Response(null, { status: 404 });`
6. Neue Seite anlegen? Nutze das Skill `/neue-seite`.
