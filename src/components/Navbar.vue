<!--
  Header — Sektion 6.1 der Spec (DESIGN.md).

  Wortmarke links, ein einziger Textlink rechts, darunter eine Haarlinie in
  Dust. Keine Navigation (§6.1: "Wer schon Leser ist, kommt über die E-Mail,
  nicht über die Seite"), kein Orange (§2: der Header-Link wäre sonst ein
  drittes oranges Element), kein Radius, kein Schatten.

  Bewusst ohne <script>: §10 verbietet Scroll-Animationen und Fade-Ins, damit
  entfällt das Morphen zur Pille und die Einblendung. Ohne Nav-Links gibt es
  auch nichts mehr aufzuklappen. Die Komponente ist reines Markup und wird in
  Layout.astro ohne client-Direktive gerendert, lädt also kein Vue in den
  Browser.
-->
<template>
  <header class="border-b border-dust">
    <!-- Derselbe Container wie der Hero: 1080px, 20px mobil / 32px Desktop.
         Dadurch sitzen Emblem und H1 auf exakt derselben linken Kante. -->
    <div
      class="mx-auto flex max-w-[1080px] items-center justify-between px-5 py-2 sm:px-8"
    >
      <!-- Bewusste Abweichung von §6.1 (dort: Wortmarke als Display-Text): die
           Marke ist hier die gelieferte Bild-Wortmarke (Icon + „Bits&Satoshis.").
           Das alt trägt den Markennamen, damit A11y und SEO erhalten bleiben.
           Höhe 32px, Breite automatisch aus dem Seitenverhältnis (~6:1). -->
      <a href="/" class="flex items-center" aria-label="Bits&amp;Satoshis, zur Startseite">
        <img
          src="/logo-wordmark.svg"
          alt="Bits&amp;Satoshis"
          width="570"
          height="95"
          class="h-8 w-auto shrink-0"
        />
      </a>

      <!-- .eyebrow ist exakt Mono / 12px / letter-spacing 0.04em / Stone.

           Ziel absolut, nicht als reines Fragment: `#anmelden` gehört dem
           Hero und existiert damit ausschließlich auf der Startseite. Als
           `#anmelden` war der Link auf Archiv, Ausgaben, /ueber, allen
           Wissensseiten und /abmelden wirkungslos — also genau dort, wo
           Besucher aus der Suche einsteigen (§7: „Eingänge, keine
           Durchgänge"). `/#anmelden` trifft auf jeder Seite das Hero-
           Formular und bleibt auf der Startseite ein Sprung ohne Reload. -->
      <a href="/#anmelden" class="eyebrow abo-link">Abonnieren</a>
    </div>
  </header>
</template>

<style scoped>
/**
 * Header-Link „Abonnieren": Ruhezustand Stone-Text mit Dust-Unterstrich nur
 * unter dem Wortanfang („Abon"). Beim Hover wächst der Unterstrich weich auf
 * die volle Wortbreite und Text wie Linie färben sich in Bitcoin-Orange.
 *
 * Bewusste Abweichung von §2 (oranger Hover-State auf Text) und §10 (keine
 * Animation): auf ausdrücklichen Wunsch. Der Unterstrich ist ein ::after —
 * so lassen sich Breite und Farbe sauber animieren (Gradient-Farben nicht).
 */
.abo-link {
  position: relative;
  display: inline-block;
  text-decoration: none;
  padding-bottom: 3px;
  transition: color 0.45s ease;
}

.abo-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1px;
  width: 45%;
  background-color: var(--c-dust);
  transition:
    width 0.55s cubic-bezier(0.22, 0.61, 0.36, 1),
    background-color 0.45s ease;
}

.abo-link:hover {
  color: var(--c-orange);
}

.abo-link:hover::after {
  width: 100%;
  background-color: var(--c-orange);
}

/* §10: Wo Bewegung ist, gehört prefers-reduced-motion dazu — dann springt
   der Zustand ohne Übergang. */
@media (prefers-reduced-motion: reduce) {
  .abo-link,
  .abo-link::after {
    transition: none;
  }
}
</style>
