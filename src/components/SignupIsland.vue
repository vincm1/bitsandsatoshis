<script setup lang="ts">
/**
 * Signup als Vue-Island — Sektion 6.2/6.6 der Spec (DESIGN.md).
 *
 * Submit läuft client-seitig als fetch an POST /api/subscribe
 * (src/pages/api/subscribe.ts); der Endpoint ruft serverseitig die beehiiv
 * Subscriptions-API auf. Ohne JS greift der native Form-POST an denselben
 * Endpoint, der dann per 303 zurück zur Startseite leitet
 * (?anmeldung=ok|fehler, ausgewertet in Hero.astro).
 *
 * Ein Feld, ein oranges Element (Button-BG), border-radius 0, Fokus-Ring Ink.
 */
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    /** UTM-Parameter aus der URL — halten die Akquise-Statistik intakt. */
    utm?: Record<string, string>;
    /** Eindeutig pro Vorkommen, z.B. "anmelden" (Hero) / "anmelden-2" (2. CTA). */
    formId?: string;
    /** Fehlermeldung aus dem No-JS-Fallback (?anmeldung=fehler). */
    initialError?: string;
  }>(),
  { utm: () => ({}), formId: "anmelden", initialError: "" },
);

const sending = ref(false);
const done = ref(false);
const message = ref(props.initialError);
// Die abgeschickte Adresse überlebt den Wechsel in den Erfolgs-Block: sie wird
// dort angezeigt, damit ein Tippfehler auffällt, solange er noch korrigierbar
// ist. Ohne diesen Weg endet „vincnet@…" als stille Karteileiche in beehiiv.
const submittedEmail = ref("");

/** Zurück zum Formular, wenn die bestätigte Adresse nicht stimmt. */
function reset() {
  done.value = false;
  message.value = "";
  submittedEmail.value = "";
}

// Erfolgs-Block trägt „Fast fertig." als Headline — doppelt es die
// Server-Meldung, wird der Prefix aus dem Fließtext entfernt.
const successBody = computed(() =>
  message.value.replace(/^Fast fertig\.\s*/, ""),
);

async function onSubmit(event: Event) {
  if (sending.value) return;
  sending.value = true;
  message.value = "";

  const form = event.target as HTMLFormElement;
  const payload = new FormData(form);
  submittedEmail.value = String(payload.get("email") ?? "");
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: payload,
    });
    const data = (await res.json()) as { ok: boolean; message: string };
    done.value = data.ok;
    message.value = data.message;
  } catch {
    message.value =
      "Die Anmeldung ist gerade nicht durchgegangen. Prüf deine Verbindung und versuch es noch einmal.";
  } finally {
    sending.value = false;
  }
}
</script>

<template>
  <!-- Erfolg ersetzt das Formular: Ink-Rahmen statt Farbfläche (§4/§5),
       Display-Headline macht den Zustand unübersehbar. -->
  <div v-if="done" class="mt-6 border border-ink p-6" role="status">
    <p class="font-display text-[17px] uppercase leading-none text-ink">
      Fast fertig.
    </p>
    <p class="mt-3 text-[16px] leading-[1.65] text-ink">{{ successBody }}</p>
    <p v-if="submittedEmail" class="mt-3 text-[16px] leading-[1.65] text-ink">
      Wir haben geschrieben an
      <span class="font-medium">{{ submittedEmail }}</span>.
      <button type="button" class="reset-link" @click="reset">
        Nicht deine Adresse?
      </button>
    </p>
    <p class="meta mt-3">
      Keine Mail? Schau im Spam-Ordner nach und zieh sie ins Hauptpostfach.
    </p>
  </div>

  <form
    v-else
    :id="formId"
    method="POST"
    action="/api/subscribe"
    class="mt-6"
    @submit.prevent="onSubmit"
  >
    <div class="flex flex-col sm:flex-row">
      <label :for="`${formId}-email`" class="sr-only">E-Mail-Adresse</label>
      <input
        :id="`${formId}-email`"
        type="email"
        name="email"
        required
        placeholder="deine@email.de"
        autocomplete="email"
        class="signup-input w-full rounded-none border border-ink bg-paper px-4 py-3 text-[16px] text-ink placeholder:text-stone"
      />
      <input
        v-for="(value, key) in utm"
        :key="key"
        type="hidden"
        :name="key"
        :value="value"
      />
      <button
        type="submit"
        :disabled="sending"
        :aria-busy="sending"
        class="shrink-0 cursor-pointer rounded-none bg-orange px-8 py-3 text-[16px] font-medium text-ink hover:opacity-[0.88] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-default disabled:opacity-[0.88]"
      >
        {{ sending ? "Wird gesendet" : "Freitags lesen" }}
      </button>
    </div>

    <!-- Ink-Rahmen wie beim Erfolgs-Block: ohne ihn war die Fehlermeldung
         optisch identisch mit Fließtext und trug ihre Bedeutung allein in
         role="alert" — also nur für Screenreader. -->
    <p
      v-if="message"
      class="mt-4 border border-ink p-4 text-[16px] leading-[1.65] text-ink"
      role="alert"
    >
      {{ message }}
    </p>

    <p class="meta mt-2">
      Kostenlos · eine Mail pro Woche · Abmelden mit einem Klick
    </p>
    <!-- Zweckbindung am Entscheidungspunkt, nicht erst im Footer. Die
         Zielgruppe (§1: DACH, misstrauisch) gibt hier personenbezogene Daten
         heraus; wer nicht sagt, was damit passiert, verliert genau die
         Besucher, die am gründlichsten lesen. -->
    <p class="meta mt-2">
      Ich nutze deine Adresse nur für den Newsletter.
      <a href="/datenschutz" class="privacy-link">Datenschutz</a>
    </p>
  </form>
</template>

<style scoped>
/**
 * Fokus im Eingabefeld: der Rahmen selbst wird orange, statt einen zweiten
 * Ring davorzusetzen.
 *
 * Warum hier und nicht als Tailwind-Utility: global.css setzt
 * `:focus-visible { outline: 2px solid orange; outline-offset: 2px }`
 * ungelayert. Ungelayerte Regeln schlagen alles aus `@layer utilities`,
 * unabhängig von der Spezifität — die Utilities kämen also nie an. Scoped
 * Styles einer SFC sind ebenfalls ungelayert und gewinnen über die
 * Spezifität.
 *
 * outline-offset 0 statt 2px entfernt die Lücke, die wie ein doppelter
 * Rahmen aussah. Zusammen mit dem Rahmen ergibt das eine durchgehende
 * 2px-Kante — kräftig genug als Fokus-Indikator (§12) und ohne
 * Layout-Shift, weil die border-width unverändert bei 1px bleibt.
 *
 * Ink statt Orange: Orange auf Paper sind 2,3:1 und damit unter den 3:1,
 * die WCAG 1.4.11 für Nicht-Text-Kontraste verlangt. Der Ring war auf
 * hellen Screens kaum zu sehen. Ink liefert 14,8:1.
 */
.signup-input:focus-visible {
  outline: 1px solid var(--c-ink);
  outline-offset: 0;
  border-color: var(--c-ink);
}

/**
 * Rückweg aus dem Erfolgs-Block. Ein <button> und kein <a>, weil nichts
 * navigiert wird; die Affordanz ist trotzdem die der übrigen Textlinks
 * (Dust-Unterstrich, Hover Ink), damit die Seite nur eine Link-Sprache hat.
 */
.reset-link {
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

.reset-link:hover {
  text-decoration-color: var(--c-ink);
}

/** Dieselbe Affordanz wie jeder Textlink der Seite (§2). */
.privacy-link {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: var(--c-dust);
  text-underline-offset: 3px;
}

.privacy-link:hover {
  text-decoration-color: var(--c-ink);
}
</style>
