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
import { ref } from "vue";

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

async function onSubmit(event: Event) {
  if (sending.value) return;
  sending.value = true;
  message.value = "";

  const form = event.target as HTMLFormElement;
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
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
  <p v-if="done" class="mt-6 text-[15px] leading-[1.65] text-ink" role="status">
    {{ message }}
  </p>

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
        class="signup-input w-full rounded-none border border-ink bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-dust"
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
        class="shrink-0 cursor-pointer rounded-none bg-orange px-8 py-3 text-[15px] font-medium text-white hover:opacity-[0.88] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-default disabled:opacity-[0.88]"
      >
        Freitags lesen
      </button>
    </div>

    <p v-if="message" class="mt-2 text-[15px] leading-[1.65] text-ink" role="alert">
      {{ message }}
    </p>

    <p class="meta mt-2">
      Kostenlos · eine Mail pro Woche · Abmelden mit einem Klick
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
 * Rahmen aussah. Zusammen mit dem orangen Rahmen ergibt das eine
 * durchgehende 2px-Kante — kräftig genug als Fokus-Indikator (§12) und
 * ohne Layout-Shift, weil die border-width unverändert bei 1px bleibt.
 *
 * Orange ist hier erlaubt: §2 nimmt den Fokus-Ring ausdrücklich vom
 * Orange-Budget aus, weil er Barrierefreiheit ist und nicht Gestaltung.
 */
.signup-input:focus-visible {
  outline: 1px solid var(--c-orange);
  outline-offset: 0;
  border-color: var(--c-orange);
}
</style>
