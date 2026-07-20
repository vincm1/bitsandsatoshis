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

  // beehiiv-Altlasten: die bisherige beehiiv-Website nutzt /p/<slug>. Die
  // 301er reichen die Google-Signale der bereits indexierten URLs an die
  // neuen /newsletter/-URLs weiter — wichtig für den DNS-Umzug.
  redirects: {
    '/p/[slug]': { status: 301, destination: '/newsletter/[slug]' },
  },

  // Hybrid: `output: 'hybrid'` wurde in Astro 5 entfernt — seitdem ist
  // 'static' + Adapter das Hybrid-Modell. Statisch ist der Default,
  // Seiten/Endpoints mit `export const prerender = false` laufen serverseitig
  // (index, archiv, newsletter/[slug], /api/subscribe, /_actions).
  output: 'static',
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
