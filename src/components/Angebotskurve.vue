<script setup lang="ts">
/**
 * Bitcoins Angebotskurve, interaktiv — selbst gebaute Datengrafik (§5).
 *
 * Der Nutzer zieht einen Zeitregler von 2009 bis 2140. Die Kurve teilt sich
 * dabei in zwei Teile: was bis dahin existiert (Orange, kräftig) und was danach
 * noch entsteht (Dust, blass). Der Anteil rechts wird schnell so dünn, dass
 * die Knappheit ohne einen einzigen Werbesatz sichtbar ist.
 *
 * Zum Orange: §2 reserviert es eigentlich für die beiden Signup-Buttons. Hier
 * trägt es die einzige Aussage der Grafik — die existierende Menge — und ist
 * bewusst gesetzt, nicht dekorativ.
 *
 * Die Kurve selbst ist nicht verschiebbar — der Emissionsplan steht im
 * Protokoll fest. Verschiebbar ist nur der Zeitpunkt, von dem aus man ihn
 * betrachtet.
 *
 * Bedienbar per Maus, Touch (Pointer Events) und Tastatur (role="slider",
 * Pfeiltasten, Bild auf/ab, Pos1/Ende).
 *
 * Beim Mount läuft der Regler einmal von 2009 bis zum heutigen Jahr. Das ist
 * keine Deko-Animation im Sinne von §10 (kein Fade-In, kein Parallax), sondern
 * die Bedienungsanleitung: die Grafik führt vor, was der Nutzer mit ihr machen
 * kann. Deshalb ersetzt sie den früheren Erklärtext unter der Grafik.
 */
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const props = withDefaults(
  defineProps<{
    /** Schmale Fassung für die Hero-Spalte. */
    kompakt?: boolean;
    /**
     * Startjahr, serverseitig gesetzt. Würde die Komponente `new Date()` selbst
     * aufrufen, lieferten SSR und Client verschiedene Werte und Vue meldete
     * einen Hydration-Mismatch.
     */
    startJahr?: number;
  }>(),
  { kompakt: false, startJahr: 2026 },
);

// ── Modell ────────────────────────────────────────────────────────────────
// Alle 210.000 Blöcke (rund vier Jahre) halbiert sich die Belohnung. Nach k
// Halvings existieren 21 Mio. × (1 − 0.5^k); innerhalb einer Epoche wächst die
// Menge linear.
const CAP = 21_000_000;
const START = 2009;
const ENDE = 2140;
const EPOCHE_JAHRE = 4;

function menge(jahr: number): number {
  if (jahr <= START) return 0;
  if (jahr >= ENDE) return CAP;
  const k = Math.floor((jahr - START) / EPOCHE_JAHRE);
  const basis = CAP * (1 - Math.pow(0.5, k));
  const zuwachs = CAP * Math.pow(0.5, k + 1);
  const anteil = (jahr - (START + k * EPOCHE_JAHRE)) / EPOCHE_JAHRE;
  return Math.min(CAP, basis + zuwachs * anteil);
}

// ── Koordinatensystem ─────────────────────────────────────────────────────
const B = props.kompakt ? 320 : 620;
const H = props.kompakt ? 210 : 200;
const PAD_UNTEN = props.kompakt ? 26 : 28;
const PAD_OBEN = props.kompakt ? 22 : 16;
const SCHRIFT = props.kompakt ? 9 : 11;

const x = (jahr: number) => ((jahr - START) / (ENDE - START)) * B;
const y = (m: number) => PAD_OBEN + (1 - m / CAP) * (H - PAD_OBEN - PAD_UNTEN);

/**
 * Griff-Radius. Das ₿ ist für r = 7 gezeichnet und wird mitskaliert, statt die
 * Pfadwerte neu zu rechnen.
 *
 * `RAND` erweitert die Zeichenfläche links und rechts über die Datenachse
 * hinaus: bei 2009 sitzt der Griff auf x = 0, bei 2140 auf x = B. Ohne diesen
 * Rand schnitte der viewBox ihn an beiden Enden zur Hälfte ab — bei r = 4 fiel
 * das kaum auf, bei r = 9 sehr wohl.
 */
const GRIFF_R = 9;
const GRIFF_R_ZIEHT = 10;
const SYMBOL_SKALA = GRIFF_R / 7;
const RAND = GRIFF_R_ZIEHT + 2;

/** Stützpunkte an den Halvings, plus ein exakter Punkt bei `bis`. */
function punkte(von: number, bis: number) {
  const liste: Array<[number, number]> = [[von, menge(von)]];
  for (let j = START; j <= ENDE; j += EPOCHE_JAHRE) {
    if (j > von && j < bis) liste.push([j, menge(j)]);
  }
  liste.push([bis, menge(bis)]);
  return liste;
}

const pfad = (von: number, bis: number) =>
  punkte(von, bis)
    .map(([j, m], i) => `${i === 0 ? "M" : "L"} ${x(j).toFixed(1)} ${y(m).toFixed(1)}`)
    .join(" ");

// ── Zustand ───────────────────────────────────────────────────────────────
const jahr = ref(Math.min(ENDE, Math.max(START, props.startJahr)));
const zieht = ref(false);
const svgEl = ref<SVGSVGElement>();

/** Wurde die Grafik schon einmal bedient? Steuert den „ziehen"-Hinweis. */
const beruehrt = ref(false);

/**
 * Kam der Fokus per Maus? Chrome setzt `:focus-visible` auch beim Klick, sobald
 * ein Element `tabindex` und eine Widget-Rolle trägt — der orange Ring aus
 * global.css legte sich dann beim Ziehen um die ganze Grafik. Für die Tastatur
 * muss er bleiben (§12), fuer die Maus nicht.
 */
const perMaus = ref(false);

const mengeJetzt = computed(() => menge(jahr.value));

const pfadGemined = computed(() => pfad(START, jahr.value));
const pfadKommend = computed(() => pfad(jahr.value, ENDE));
const flaeche = computed(
  () => `${pfadGemined.value} L ${x(jahr.value).toFixed(1)} ${y(0).toFixed(1)} L 0 ${y(0).toFixed(1)} Z`,
);

const zahl = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });
const prozent = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });

/**
 * Abschneiden statt runden — und zwar überall dieselbe Zahl.
 *
 * Gerundet zeigte die Grafik ab etwa 2074 „21.000.000 BTC · 100 %", weil
 * 99,9987 auf 100 aufrundet. Damit behauptete ausgerechnet die Grafik über die
 * Knappheit, Bitcoin sei ein halbes Jahrhundert zu früh fertig. Der Rest ist
 * winzig, aber er ist nicht null — und genau das ist die Aussage.
 */
const mengeAnzeige = computed(() => Math.floor(mengeJetzt.value));
const restAnzeige = computed(() => CAP - mengeAnzeige.value);
const vollstaendig = computed(() => restAnzeige.value <= 0);
const anteilAnzeige = computed(() => Math.floor((mengeAnzeige.value / CAP) * 1000) / 10);

const vorlesetext = computed(
  () =>
    `Jahr ${jahr.value}: ${zahl.format(mengeAnzeige.value)} Bitcoin, ` +
    `${prozent.format(anteilAnzeige.value)} Prozent der Obergrenze. ` +
    (vollstaendig.value
      ? "Die Obergrenze ist erreicht, es entsteht kein Bitcoin mehr."
      : `Es fehlen noch ${zahl.format(restAnzeige.value)} Bitcoin bis ${ENDE}.`),
);

// ── Tooltip ───────────────────────────────────────────────────────────────
// Ersetzt sowohl die feste Ablesezeile über der Grafik als auch den Erklärtext
// darunter: der Wert steht dort, wo der Nutzer ohnehin hinsieht — am Griff.
// Keine Karte (§4): Papier-Fläche, Haarlinie, 0px Radius, kein Schatten.
const TT_PAD_X = 8;
const TT_PAD_Y = 6;
const TT_ZEILE = SCHRIFT + 5;
// IBM Plex Mono läuft auf 0.6em; dazu die 0.04em Laufweite aus `beschriftung`.
const TT_ZEICHEN = 0.64;

const tooltipZeilen = computed(() => {
  const zeilen = [
    { text: String(jahr.value), groesse: SCHRIFT + 2, farbe: "var(--c-ink)" },
    {
      text: `${zahl.format(mengeAnzeige.value)} BTC · ${prozent.format(anteilAnzeige.value)} %`,
      groesse: SCHRIFT,
      farbe: "var(--c-stone)",
    },
    // Die eigentliche Aussage: die Kurve liegt optisch längst auf der
    // Obergrenze, der Rest läuft aber noch bis 2140. Ohne diese Zeile ist der
    // Unterschied zwischen 2074 und 2140 in der Grafik nicht zu sehen.
    {
      text: vollstaendig.value
        ? `${ENDE} · Obergrenze erreicht`
        : `noch ${zahl.format(restAnzeige.value)} bis ${ENDE}`,
      groesse: SCHRIFT,
      farbe: "var(--c-stone)",
    },
  ];
  // Der Hinweis steht nur, bis er befolgt wurde — danach wäre er Möblierung.
  if (!beruehrt.value) {
    zeilen.push({ text: "↔ ziehen", groesse: SCHRIFT, farbe: "var(--c-dust)" });
  }
  return zeilen;
});

const ttBreite = computed(
  () =>
    Math.max(...tooltipZeilen.value.map((z) => z.text.length * TT_ZEICHEN * z.groesse)) +
    TT_PAD_X * 2,
);
const ttHoehe = computed(() => tooltipZeilen.value.length * TT_ZEILE + TT_PAD_Y * 2);

/**
 * Der Tooltip weicht dorthin aus, wo die Kurve nicht ist. Weil sie monoton
 * steigt, ist das immer die Fläche rechts unter dem Griff — zentriert über dem
 * Punkt läge er sonst genau auf dem steilen Anstieg. Erst wenn dort kein Platz
 * mehr ist (Griff am rechten Rand bzw. am Boden), klappt er auf die andere
 * Seite.
 */
/** Luft um den Griff — er misst als Bitcoin-Marke GRIFF_R, nicht mehr 4. */
const TT_ABSTAND = GRIFF_R_ZIEHT + 5;

const ttRechts = computed(() => x(jahr.value) + TT_ABSTAND + ttBreite.value <= B - 1);
const ttX = computed(() =>
  ttRechts.value
    ? x(jahr.value) + TT_ABSTAND
    : Math.max(1, x(jahr.value) - TT_ABSTAND - ttBreite.value),
);

const ttUnten = computed(
  () => y(mengeJetzt.value) + TT_ABSTAND + ttHoehe.value <= y(0),
);
const ttY = computed(() =>
  ttUnten.value
    ? y(mengeJetzt.value) + TT_ABSTAND
    : Math.max(1, y(mengeJetzt.value) - TT_ABSTAND - ttHoehe.value),
);

const ttBasis = (i: number) => ttY.value + TT_PAD_Y + (i + 1) * TT_ZEILE - 3;

// ── Intro ─────────────────────────────────────────────────────────────────
let rafId = 0;

function stoppeIntro() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
}

onMounted(() => {
  const ziel = jahr.value;
  // §12: ohne Bewegung steht sofort das Endbild — der Inhalt bleibt derselbe.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (ziel <= START) return;

  jahr.value = START;
  const DAUER = 1600;
  let t0 = 0;
  const schritt = (t: number) => {
    if (!t0) t0 = t;
    const p = Math.min(1, (t - t0) / DAUER);
    // easeOutCubic: schneller Aufschlag, langes Auslaufen — die Kurve bremst
    // dort ab, wo auch die Emission abbremst.
    jahr.value = Math.round(START + (ziel - START) * (1 - Math.pow(1 - p, 3)));
    rafId = p < 1 ? requestAnimationFrame(schritt) : 0;
  };
  rafId = requestAnimationFrame(schritt);
});

onBeforeUnmount(stoppeIntro);

// ── Eingabe ───────────────────────────────────────────────────────────────
function jahrAusX(clientX: number) {
  const box = svgEl.value!.getBoundingClientRect();
  // Die Elementbreite umfasst den Rand auf beiden Seiten, die Datenachse nur
  // die B Einheiten dazwischen. Erst in viewBox-Koordinaten umrechnen, dann
  // ins Jahr — sonst liefe der Griff dem Zeiger um `RAND` hinterher.
  const inViewBox = -RAND + ((clientX - box.left) / box.width) * (B + 2 * RAND);
  const roh = START + (inViewBox / B) * (ENDE - START);
  return Math.round(Math.min(ENDE, Math.max(START, roh)));
}

function onPointerDown(e: PointerEvent) {
  // Wer selbst greift, braucht die Vorführung nicht mehr.
  stoppeIntro();
  beruehrt.value = true;
  // pointerdown läuft vor focus — der Ring erscheint also gar nicht erst.
  perMaus.value = true;
  zieht.value = true;
  // Erst der Wert, dann das Capture: setPointerCapture wirft, wenn die
  // pointerId nicht zu einem aktiven Zeiger gehoert. Stuende es davor, wuerde
  // eine solche Exception die gesamte Geste verschlucken.
  jahr.value = jahrAusX(e.clientX);
  try {
    (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId);
  } catch {
    // Ohne Capture funktioniert das Ziehen weiter, es endet nur, sobald der
    // Zeiger die Grafik verlaesst.
  }
}

function onPointerMove(e: PointerEvent) {
  if (!zieht.value) return;
  jahr.value = jahrAusX(e.clientX);
}

function onPointerUp(e: PointerEvent) {
  zieht.value = false;
  try {
    (e.currentTarget as SVGSVGElement).releasePointerCapture(e.pointerId);
  } catch {
    // Capture kam nie zustande — nichts freizugeben.
  }
}

function onKeydown(e: KeyboardEvent) {
  const schritte: Record<string, number> = {
    ArrowLeft: -1,
    ArrowRight: 1,
    ArrowDown: -1,
    ArrowUp: 1,
    PageDown: -10,
    PageUp: 10,
  };
  if (e.key === "Home") {
    jahr.value = START;
  } else if (e.key === "End") {
    jahr.value = ENDE;
  } else if (e.key in schritte) {
    jahr.value = Math.min(ENDE, Math.max(START, jahr.value + schritte[e.key]));
  } else {
    return;
  }
  stoppeIntro();
  beruehrt.value = true;
  // Ab der ersten Pfeiltaste wird wieder per Tastatur bedient — Ring zurück.
  perMaus.value = false;
  e.preventDefault();
}

const beschriftung = `font-family: var(--f-mono); font-size: ${SCHRIFT}px; letter-spacing: 0.04em`;
const jahreszahlen = props.kompakt ? [START, ENDE] : [START, 2040, 2080, 2120, ENDE];
</script>

<template>
  <figure :class="kompakt ? 'w-full' : 'max-w-[620px]'">
    <svg
      ref="svgEl"
      :viewBox="`${-RAND} 0 ${B + 2 * RAND} ${H}`"
      class="kurve w-full touch-none select-none"
      :class="[zieht ? 'cursor-grabbing' : 'cursor-grab', { 'per-maus': perMaus }]"
      role="slider"
      tabindex="0"
      :aria-valuemin="START"
      :aria-valuemax="ENDE"
      :aria-valuenow="jahr"
      :aria-valuetext="vorlesetext"
      aria-label="Zeitregler: Bitcoins Angebotskurve von 2009 bis 2140"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @keydown="onKeydown"
      @blur="perMaus = false"
    >
      <defs>
        <!-- Orange deckt stärker als Ink; 0.10 statt 0.13, damit die Fläche
             unter der Kurve eine Andeutung bleibt und keine Farbfläche wird. -->
        <linearGradient id="kurve-verlauf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--c-orange)" stop-opacity="0.1" />
          <stop offset="100%" stop-color="var(--c-orange)" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Obergrenze: die Linie, die die Kurve nie erreicht.
           Beide Hilfslinien laufen über den ganzen Rahmen statt nur über die
           Datenachse — sonst blieben links und rechts sichtbare Stummel. -->
      <line
        :x1="-RAND"
        :y1="y(CAP)"
        :x2="B + RAND"
        :y2="y(CAP)"
        stroke="var(--c-dust)"
        stroke-width="1"
        stroke-dasharray="3 3"
      />

      <line
        :x1="-RAND"
        :y1="y(0)"
        :x2="B + RAND"
        :y2="y(0)"
        stroke="var(--c-dust)"
        stroke-width="1"
      />

      <path :d="flaeche" fill="url(#kurve-verlauf)" />

      <!-- Was noch entsteht: blass. Zuerst gezeichnet, damit der kräftige
           Teil darüber liegt. -->
      <path
        :d="pfadKommend"
        fill="none"
        stroke="var(--c-dust)"
        stroke-width="2"
        stroke-linejoin="round"
      />

      <!-- Was bereits existiert -->
      <path
        :d="pfadGemined"
        fill="none"
        stroke="var(--c-orange)"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
      />

      <!-- Regler -->
      <line
        :x1="x(jahr)"
        :y1="y(mengeJetzt)"
        :x2="x(jahr)"
        :y2="y(0)"
        stroke="var(--c-dust)"
        stroke-width="1"
      />
      <!-- Griff als Bitcoin-Marke: oranger Kreis, helles ₿.
           Der Glyph ist als Pfad gezeichnet und nicht gesetzt — U+20BF fehlt in
           vielen Schnitten, und ein Tofu-Rechteck mitten auf der Kurve wäre
           schlimmer als kein Symbol. Der Paper-Ring trennt ihn von der Linie,
           die inzwischen dieselbe Farbe hat. -->
      <g :transform="`translate(${x(jahr).toFixed(1)} ${y(mengeJetzt).toFixed(1)})`">
        <circle
          :r="zieht ? GRIFF_R_ZIEHT : GRIFF_R"
          fill="var(--c-orange)"
          stroke="var(--c-paper)"
          stroke-width="1.5"
          class="griff"
        />
        <!-- Optisch zentriert, nicht auf x=0 gesetzt: der untere Bauch ragt
             weiter nach rechts als der Stamm nach links. Die Kontur läuft mit
             halber Strichstärke von -2.1 bis 2.1 und von -4.75 bis 4.75, sitzt
             also mittig im Bezugskreis r = 7.

             Skaliert statt neu gerechnet, damit die Proportionen an einer
             Stelle hängen (GRIFF_R). Die Strichstärke wächst mit. -->
        <path
          :transform="`scale(${SYMBOL_SKALA})`"
          d="M -1.65 -3 V 3
             M -1.65 -3 H -0.15 A 1.5 1.5 0 0 1 -0.15 0 H -1.65
             M -1.65 0 H 0.15 A 1.5 1.5 0 0 1 0.15 3 H -1.65
             M -1.2 -4.3 V -3 M 0.1 -4.3 V -3
             M -1.2 3 V 4.3 M 0.1 3 V 4.3"
          fill="none"
          stroke="var(--c-paper)"
          stroke-width="0.9"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>

      <text
        :x="B"
        :y="y(CAP) - 6"
        fill="var(--c-stone)"
        text-anchor="end"
        :style="beschriftung"
      >
        {{ kompakt ? "21 Mio. Obergrenze" : "21 Mio. Mehr wird es nie geben." }}
      </text>

      <text
        v-for="j in jahreszahlen"
        :key="j"
        :x="x(j)"
        :y="H - 8"
        fill="var(--c-stone)"
        :text-anchor="j === START ? 'start' : j === ENDE ? 'end' : 'middle'"
        :style="beschriftung"
      >
        {{ j }}
      </text>

      <!-- Tooltip zuletzt, damit er über Kurve und Regler liegt. Er ist der
           einzige Ableseort und ersetzt die frühere figcaption; deshalb steht
           er dauerhaft und nicht erst bei Hover — auf Touch gibt es keinen. -->
      <g class="tooltip" aria-hidden="true">
        <rect
          :x="ttX"
          :y="ttY"
          :width="ttBreite"
          :height="ttHoehe"
          fill="var(--c-paper)"
          stroke="var(--c-rule)"
          stroke-width="1"
        />
        <text
          v-for="(z, i) in tooltipZeilen"
          :key="z.text"
          :x="ttX + TT_PAD_X"
          :y="ttBasis(i)"
          :fill="z.farbe"
          :style="`font-family: var(--f-mono); font-size: ${z.groesse}px; letter-spacing: 0.04em`"
        >
          {{ z.text }}
        </text>
      </g>
    </svg>
  </figure>
</template>

<style scoped>
/* Der globale :focus-visible-Ring in global.css ist ungelayert und schlaegt
   Tailwind-Utilities. Hier ist er genau richtig: §2 nimmt den Fokus-Ring
   ausdruecklich vom Orange-Budget aus. Nur der Abstand stoert an einer
   randlosen Grafik. */
.kurve:focus-visible {
  outline-offset: 2px;
}

/* Nach einem Klick bleibt der Fokus fachlich bestehen (Pfeiltasten wirken
   sofort weiter), der Ring aber verschwindet — er ist eine Tastatur-Anzeige,
   und wer gerade selbst gezogen hat, weiß, wo er ist. `@blur` setzt das Flag
   zurück, ein späterer Tab-Fokus bekommt den Ring also wieder.

   Beide Zustände, nicht nur `:focus-visible`: ob ein Klick auf ein SVG mit
   `tabindex` und Widget-Rolle als "visible" gilt, entscheiden die Browser
   unterschiedlich. Fiel es auf `:focus` zurück, zeichnete der Browser seinen
   eigenen dunklen Ring — der globale orange aus global.css war es dann gar
   nicht. */
.kurve.per-maus:focus,
.kurve.per-maus:focus-visible {
  outline: none;
}

.griff {
  transition: r 120ms cubic-bezier(0.23, 1, 0.32, 1);
}

/* Der Tooltip liegt über der Kurve und darf die Geste nicht abfangen —
   sonst wechselt unter ihm der Cursor und `setPointerCapture` bekommt ein
   anderes Ziel als das SVG. */
.tooltip {
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .griff {
    transition: none;
  }
}
</style>
