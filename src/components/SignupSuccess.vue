<script setup lang="ts">
/**
 * Erfolgs-Block nach dem Signup — ersetzt das Formular an Ort und Stelle.
 *
 * Eine SFC statt zweier Kopien: den Block gibt es im hydrierten Island
 * (SignupIsland.vue) und im No-JS-Rückläufer (Hero.astro, ?anmeldung=ok).
 * Beide Wege sollen identisch aussehen; als dupliziertes Markup sind sie
 * vorher auseinandergelaufen. Hero.astro rendert diese Datei ohne
 * client-Direktive, lädt also kein Vue in den Browser (Muster wie Navbar.vue).
 *
 * Form: Statuszeile, Display-Headline, danach ein nummerierter Ledger mit den
 * drei Schritten, die jetzt noch fehlen. Die Bestätigungsmail ist der
 * eigentliche Engpass des Funnels — deshalb steht der Spam-Hinweis als
 * gleichwertiger Schritt im Ledger und nicht mehr als 11px-Fußnote.
 *
 * Spec: Ink-Rahmen statt Farbfläche (§4/§5), kein Orange, Radius 0,
 * Abstände nur aus --sp-*, Satzschreibung statt Versalsatz (§3).
 */
withDefaults(
  defineProps<{
    /** Server-Meldung ohne den Prefix „Fast fertig." */
    body: string;
    /** Die abgeschickte Adresse. Leer im No-JS-Weg, dort kennt sie die Seite nicht. */
    email?: string;
    /** Nur im hydrierten Island: Rückweg zum Formular bei Tippfehler. */
    showReset?: boolean;
  }>(),
  { email: "", showReset: false },
);

defineEmits<{ reset: [] }>();
</script>

<template>
  <div class="signup-success" role="status">
    <!-- Statusleiste: die einzige Ink-Fläche der Seite. Sie macht aus dem
         Block ein Gerät mit Zustand statt eines weiteren Textkastens. -->
    <p class="signup-success__bar">
      <span class="signup-success__marker" aria-hidden="true"></span>
      <span>Bestätigung ausstehend</span>
      <span class="signup-success__count">01 / 02</span>
    </p>

    <div class="signup-success__body-area">
      <p class="signup-success__title">Fast fertig.</p>
      <p class="signup-success__lead">{{ body }}</p>

      <ol class="signup-success__steps">
        <li class="signup-success__step">
          <span class="signup-success__index" aria-hidden="true">01</span>
          <span class="signup-success__text">
            <template v-if="email">
              Die Mail liegt in
              <span class="signup-success__mail">{{ email }}</span
              >.
              <button
                v-if="showReset"
                type="button"
                class="signup-success__link"
                @click="$emit('reset')"
              >
                Nicht deine Adresse?
              </button>
            </template>
            <template v-else>
              Die Mail ist raus. Bis sie ankommt, kann eine Minute vergehen.
            </template>
          </span>
        </li>

        <li class="signup-success__step">
          <span class="signup-success__index" aria-hidden="true">02</span>
          <span class="signup-success__text">
            Klick auf den Bestätigungslink. Erst damit bist du eingetragen,
            vorher liegt nichts bei mir.
          </span>
        </li>

        <li class="signup-success__step signup-success__step--note">
          <span class="signup-success__index" aria-hidden="true">!</span>
          <span class="signup-success__text">
            Nichts da? Dann steckt die Mail im <strong>Spam</strong> oder unter
            <strong>Werbung</strong>. Zieh sie ins Hauptpostfach, dann kommt
            auch die Freitagsausgabe an.
          </span>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.signup-success {
  margin-top: var(--sp-3);
  border: 1px solid var(--c-ink);
}

/*
 * Statusleiste — die eine bewusste Farbfläche in einem Layout, das sonst mit
 * Haarlinien auskommt (§4). Grund: der Erfolgs-Block ist kein Absatz, sondern
 * eine Zustandsanzeige. Als reiner Rahmen mit Text war er von einem beliebigen
 * Textkasten nicht zu unterscheiden. Die Fläche ist Ink, nicht Orange — das
 * Budget aus §2 bleibt damit unangetastet.
 */
.signup-success__bar {
  display: flex;
  align-items: center;
  gap: var(--sp-1);
  background: var(--c-ink);
  padding: 10px var(--sp-2);
  font-family: var(--f-mono);
  font-size: 0.6875rem; /* 11px */
  letter-spacing: 0.04em;
  line-height: 1.4;
  color: var(--c-paper);
}

/* Zählwerk rechts: zwei Schritte, einer davon erledigt. Mono-Ziffern, weil
   die Marke Zahlen in Mono setzt (§3) — dieselbe Sprache wie die Angebotskurve. */
.signup-success__count {
  margin-left: auto;
  color: var(--c-dust);
}

/*
 * Quadrat, nicht Punkt: Radius 0 gilt auch bei 7px (§4). Orange ist hier
 * zulässig — es sitzt auf Ink, nicht auf Paper, trägt keinen Text und ist im
 * Erfolgszustand das einzige orange Element im Sichtfeld (der Button, der
 * sonst das Budget belegt, ist ja gerade verschwunden).
 */
.signup-success__marker {
  width: 7px;
  height: 7px;
  flex: none;
  background: var(--c-orange);
  animation: signup-success-pulse 2.4s ease-in-out infinite;
}

/* „Ausstehend" ist ein laufender Zustand, keine Verzierung — deshalb die
   einzige Bewegung im Block. §10 zielt auf Scroll-Animationen und Fade-Ins
   beim Aufbau der Seite; hier zeigt die Bewegung Information. */
@keyframes signup-success-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@media (prefers-reduced-motion: reduce) {
  .signup-success__marker {
    animation: none;
  }
}

.signup-success__body-area {
  padding: var(--sp-3) var(--sp-2);
}

/* Display, Satzschreibung. Vorher stand hier `uppercase` — Versalsatz auf
   Display-Schrift ist in §3 ausgeschlossen. */
.signup-success__title {
  font-family: var(--f-display);
  font-weight: 900;
  font-variation-settings: "wdth" 125;
  font-size: 1.5rem; /* 24px */
  line-height: 1.15;
  color: var(--c-ink);
}

.signup-success__lead {
  margin-top: var(--sp-1);
  font-size: 16px;
  line-height: 1.65;
  color: var(--c-ink);
}

.signup-success__steps {
  margin: var(--sp-3) 0 0;
  padding: 0;
  list-style: none;
}

/* Ledger: Nummer links in fester Spalte, Text rechts. Haarlinie in Dust
   trennt die Schritte — Karten sind ausgeschlossen (§4). */
.signup-success__step {
  display: grid;
  grid-template-columns: 32px 1fr;
  column-gap: var(--sp-2);
  align-items: baseline;
  padding: var(--sp-2) 0;
  border-top: 1px solid var(--c-dust);
}

/*
 * Die Ziffern tragen das Raster, statt es zu kommentieren: 20px Mono in Dust.
 * Bei 11px waren sie Fußnote und der Block zerfiel in drei gleich aussehende
 * Absätze. Dust ist hier zulässig, weil die Ziffer reine Struktur ist — die
 * Anleitung steht vollständig im Ink-Text daneben und bleibt ohne sie lesbar
 * (deshalb auch aria-hidden).
 */
.signup-success__index {
  font-family: var(--f-mono);
  font-size: 1.25rem; /* 20px */
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
  color: var(--c-dust);
}

/* Der Spam-Hinweis ist kein Schritt, sondern ein Einwand. Das Ausrufezeichen
   in Stone statt Dust hebt ihn aus der Nummerierung heraus, ohne eine zweite
   Auszeichnungsfarbe einzuführen. */
.signup-success__step--note .signup-success__index {
  color: var(--c-stone);
}

.signup-success__step--note strong {
  font-weight: 500;
}

/* Fließtext ist Ink, nie Stone (§2) — die Schritte sind die Anleitung,
   kein Kleingedrucktes. */
.signup-success__text {
  font-size: 15px;
  line-height: 1.65;
  color: var(--c-ink);
}

/* Die Adresse als Daten, nicht als Prosa: Mono macht einen Tippfehler
   sichtbar, solange er noch korrigierbar ist. */
.signup-success__mail {
  font-family: var(--f-mono);
  font-size: 0.875em;
  letter-spacing: 0.01em;
  word-break: break-all;
}

/* Ein <button> und kein <a>, weil nichts navigiert wird; die Affordanz ist
   trotzdem die der übrigen Textlinks, damit die Seite eine Link-Sprache hat. */
.signup-success__link {
  font: inherit;
  color: inherit;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: var(--c-dust);
  text-underline-offset: 3px;
}

.signup-success__link:hover {
  text-decoration-color: var(--c-ink);
}
</style>
