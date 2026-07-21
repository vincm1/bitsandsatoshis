// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import vercel from '@astrojs/vercel';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Kanonische Domain — Basis für Canonical-Links, Sitemap, RSS und
  // absolute og:*-URLs (Astro.site).
  site: 'https://bitsandsatoshis.com',

  // beehiiv-Altlasten: 301er reichen die Google-Signale der bereits
  // indexierten beehiiv-URLs an die neuen Pfade weiter — wichtig für den
  // DNS-Umzug. Quellen: site:bitsandsatoshis.com (Stand Juli 2026) plus die
  // Standard-Pfade, die jede beehiiv-Site bedient.
  redirects: {
    // Ausgaben: beehiiv nutzt /p/<slug>, wir /newsletter/<slug>.
    '/p/[slug]': { status: 301, destination: '/newsletter/[slug]' },
    // beehiiv-Archiv → eigenes Archiv. (Tag-Seiten /t/<tag> leitet die
    // Catch-all-Route src/pages/t/[...tag].astro um — Config-Redirects
    // können dynamische Parameter nicht verwerfen.)
    '/archive': { status: 301, destination: '/archiv' },
    // Indexierte beehiiv-Tag-Seite ("Newsletters Knowledge") → Archiv.
    '/newsletters-knowledge': { status: 301, destination: '/archiv' },
    // beehiiv-Signup- und Upgrade-Seiten → Startseite mit Formular-Anker.
    '/subscribe': { status: 301, destination: '/#newsletter' },
    '/upgrade': { status: 301, destination: '/#newsletter' },
    // Alte Wissensquellen-Seite (Bücher/Podcasts) — hat (noch) kein
    // Gegenstück; bis eine Wissensseite existiert auf die Startseite.
    '/bitcoin-resources': { status: 301, destination: '/' },
  },

  // Hybrid: `output: 'hybrid'` wurde in Astro 5 entfernt — seitdem ist
  // 'static' + Adapter das Hybrid-Modell. Statisch ist der Default,
  // Seiten/Endpoints mit `export const prerender = false` laufen serverseitig
  // (index, archiv, newsletter/[slug], /api/subscribe, /_actions).
  output: 'static',
  // Web Analytics läuft über die <Analytics />-Komponente im Layout
  // (@vercel/analytics) — hier bewusst KEIN webAnalytics: { enabled: true },
  // sonst würde doppelt getrackt.
  adapter: vercel(),
  integrations: [vue()],

  // Schriften — Astro lädt sie zur Build-Zeit herunter und liefert sie von der
  // eigenen Domain aus. Dadurch stellt kein Besucher-Browser eine Anfrage an
  // Fontshare oder Google; DESIGN.md §3 (DSGVO, keine Drittanbieter-Requests)
  // ist damit erfüllt.
  //
  // Die cssVariable-Namen sind bewusst NICHT --font-display/--font-sans/
  // --font-mono: die gehören Tailwind (@theme in global.css) und würden
  // kollidieren. global.css mappt die Tailwind- und die --f-*-Tokens auf diese
  // drei hier.
  //
  // Chaney ist raus: Atipo-Desktop-Lizenz, existiert nicht als Webfont. Der
  // frühere Fontshare-Request lieferte dafür stillschweigend nichts, die
  // Überschriften liefen auf sans-serif.
  fonts: [
    {
      provider: fontProviders.fontshare(),
      name: 'Cabinet Grotesk',
      cssVariable: '--font-brand-display',
      weights: [700, 800],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.fontshare(),
      name: 'Satoshi',
      cssVariable: '--font-brand-body',
      // Nur 400 und 500 — §3 erlaubt keine weiteren Gewichte im Fließtext.
      weights: [400, 500],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-brand-mono',
      weights: [400, 500],
      fallbacks: ['monospace'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
