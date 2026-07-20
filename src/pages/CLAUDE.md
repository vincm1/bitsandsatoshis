# src/pages/

## Zweck
Datei-basiertes Routing. Jede `.astro`-Datei = eine URL. **Hybrid**
(`output: 'static'` + Vercel-Adapter): statisch ist der Default, Seiten mit
`export const prerender = false` rendern serverseitig zur Request-Zeit.

## Routen
```
index.astro            → /            SSR  Hero + Signup + letzte Ausgaben
archiv.astro           → /archiv      SSR  Alle Ausgaben
newsletter/[slug].astro→ /newsletter/:slug  SSR  Einzel-Ausgabe (eigener CLAUDE.md)
ueber.astro            → /ueber       SSR  (progressives SignupForm braucht Request-Zeit)
impressum.astro        → /impressum   statisch  DSGVO-Platzhalter
datenschutz.astro      → /datenschutz statisch  DSGVO-Platzhalter
api/subscribe.ts       → POST /api/subscribe  SSR-Endpoint → beehiiv (Signup)
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
