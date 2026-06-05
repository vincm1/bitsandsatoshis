# src/components/

## Zweck
Wiederverwendbare UI-Komponenten die auf mehreren Seiten genutzt werden.

## Bestehende Komponenten
```
Navbar.vue        ← Vue-Island: Logo links, Links mittig-links, Signup-CTA rechts;
                    schrumpft beim Scrollen zur schwebenden, runden Pille (client:load)
Footer.astro      ← Logo, Mini-Signup (#newsletter), Impressum/Datenschutz-Links, Copyright
Hero.astro        ← Homepage-Hero mit Headline + SignupForm
SignupForm.astro  ← E-Mail-Formular → Astro Action `subscribe`
SignupCta.astro   ← Wiederverwendbarer Signup-CTA-Block (Box + SignupForm), Props: title/text
PostCard.astro    ← Vorschau einer Newsletter-Ausgabe (Karte), Link auf /newsletter/[slug]
```

## Design-Regeln für alle Komponenten
- Cremeweiß (`base-100`) als Standard-Hintergrund, nie hartkodiertes Hex.
- Orange (`primary`) nur für: CTAs, Highlights, Hover-States, Akzente.
- Viel Whitespace — lieber zu viel als zu wenig.
- Keine Schatten-Orgie — maximal ein subtiler `shadow-md` beim Hover.
- Icons: nur wenn nötig, kein Icon-Overload.
- DaisyUI-Klassen bevorzugen (`btn btn-primary`, `card`, `input input-bordered`,
  `menu`, `navbar`, `dropdown`). Theme: `bitsandsatoshis`.
- Serif-Kursiv-Akzente über die `.accent`-Klasse (Playfair Display Italic).

## SignupForm.astro — so funktioniert es
- **Kein** client-side `fetch`. Stattdessen progressives Form-POST an die
  Astro Action `actions.subscribe` (`accept: 'form'`).
- Validierung serverseitig via Zod in `src/actions/index.ts`.
- Ergebnis kommt über `Astro.getActionResult(actions.subscribe)` zurück;
  die Komponente zeigt Erfolg / Eingabefehler / Server-Fehler an.
- Prop `compact` für die schmale Footer-Variante.
- Die eigentliche beehiiv-Anbindung steckt in `src/lib/beehiiv.ts` (`subscribe`).

## PostCard.astro — Props
```typescript
interface Props {
  post: NewsletterPost;   // aus src/lib/beehiiv.ts
}
```
- Cremefarbene Karte (`card`), subtiler Border, ganze Karte klickbar
  (`relative` + `after:absolute after:inset-0` am Titel-Link).
- Titel fett, Datum klein/grau (`formatDate` aus `src/lib/format.ts`).
- Hover: leichtes Anheben des Thumbnails + Schatten.

## Navbar.vue (Vue-Island)
- Die einzige Vue-Komponente bisher. Eingebunden in `Layout.astro` via
  `<Navbar client:load currentPath={Astro.url.pathname} />`. `client:load`,
  weil das Scroll-Verhalten Reaktivität braucht.
- Layout: **volle Breite, keine Border.** Logo links · Links **mittig**
  (absolut zentriert via `left-1/2 -translate-x-1/2`) · Signup-CTA rechts.
- **Scroll-Verhalten:** oben volle Breite, eckig, transparent; ab `scrollY > 24`
  rückt die Leiste seitlich ein (von `max-w-[1400px]` auf `max-w-5xl`, `mx-auto`)
  und wird zu einer zentrierten, **runden** Leiste mit `bg-base-100/80` +
  `backdrop-blur` + `shadow-lg` — **ohne Border**. Logo & Padding schrumpfen
  leicht. Der Seitenabstand entsteht aus Header-`px` + schmalerer `max-width`.
- Logo: nur `/logo.svg`, groß integriert (`h-16 sm:h-20` oben → `h-12 sm:h-14`
  beim Scrollen, dreht sich leicht bei Hover). Kein Text-Schriftzug daneben —
  das Emblem enthält den Namen; barrierefrei über `alt`.
- **Ästhetik:** editoriale Masthead. Nav-Links als Kapitälchen (`uppercase`,
  `tracking-[0.14em]`) mit animierter Orange-Unterstreichung (`after:scale-x`);
  Active-Link über die `currentPath`-Prop (kein Hydration-Flash, SSR-korrekt).
- **CTA:** „Kostenlos abonnieren" — orange Pille mit Pfeil-Icon (gleitet bei
  Hover), warmem Glow (`shadow-primary/30`, kein Hex) und sanftem Anheben.
- **Einblenden:** gestaffelte Lade-Animation (`nav-rise`/`nav-fade`, scoped
  Styles) mit `prefers-reduced-motion`-Fallback.
- Mobile: Burger (`lg:hidden`) öffnet ein Panel (Vue-`transition`); zentrierte
  Links erscheinen ab `lg`, damit sie auf `md` nicht mit Logo/CTA kollidieren.
- CTA-Ziel: `#newsletter` (Anker am Footer-Signup, existiert auf jeder Seite).
- Da die Navbar `fixed` ist, gibt `Layout.astro` dem `<main>` ein `pt-24 sm:pt-28`.
- Weitere Vue-Islands brauchen kein Setup mehr (`@astrojs/vue` ist konfiguriert).

## Logo
- Echtes Logo: `public/logo.svg` (URL-sichere Kopie von
  `Bits&Satoshis_logo_transparent.svg` — der `&` im Original ist in URLs fragil).
  Rundes Emblem in Bitcoin-Orange (`#f79130`), Schriftzug im Emblem integriert.
- In `Navbar.vue` als `<img src="/logo.svg">` neben dem Wort­marken-Text.
- `Footer.astro` nutzt noch den ₿-Kreis-Platzhalter — bei Bedarf dort ebenfalls
  auf `/logo.svg` umstellen.
