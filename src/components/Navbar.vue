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
      class="mx-auto flex max-w-[1080px] items-center justify-between px-5 py-1 sm:px-8"
    >
      <!-- Wortmarke 20px: §6.1 nennt 15px, §3 verbietet die Display-Schrift
           aber unter 17px. 20px löst den Widerspruch und trägt das Emblem.

           gap-0 mit negativem Margin: das Emblem ist ein Kreis in einer
           quadratischen Box, dadurch trägt es an den Seiten schon Weißraum mit
           sich. Der optische Abstand ist größer als der gesetzte — das leere
           Quadrat wird also weggezogen. Das ist Kerning einer Wort-Bild-Marke,
           nicht Layout — deshalb hier bewusst neben dem 8/16/24/40/64-Raster
           aus §4. -->
      <a href="/" class="flex items-center">
        <img
          src="/logo.svg"
          alt=""
          aria-hidden="true"
          class="-ml-1.5 h-10 w-10 shrink-0"
        />
        <span class="font-display text-[20px] leading-none text-ink">
          Bits&amp;Satoshis
        </span>
      </a>

      <!-- .eyebrow ist exakt Mono / 12px / letter-spacing 0.04em / Stone. -->
      <a href="#anmelden" class="eyebrow abo-link">Abonnieren</a>
    </div>
  </header>
</template>

<style scoped>
/**
 * Einheitliche Link-Affordanz der Seite: Unterstrich in Dust, Hover Ink.
 * Kein Orange (§2: "kein oranger Hover-State auf Text"), keine Animation.
 */
.abo-link {
  display: inline-block;
  text-decoration: underline;
  text-decoration-color: var(--c-dust);
  text-underline-offset: 3px;
}

.abo-link:hover {
  text-decoration-color: var(--c-ink);
}
</style>
