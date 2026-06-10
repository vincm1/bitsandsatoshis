<script setup lang="ts">
import { ref } from "vue";
import { actions, isInputError } from "astro:actions";

const email = ref("");
const loading = ref(false);
const toastShow = ref(false);
const toastType = ref<"success" | "error">("success");
const toastMessage = ref("");
let dismissTimer: ReturnType<typeof setTimeout> | null = null;

async function handleSubmit() {
  if (loading.value) return;
  loading.value = true;
  try {
    const { data, error } = await actions.subscribe({ email: email.value });
    if (error) {
      if (isInputError(error)) {
        showToast("error", error.fields.email?.[0] ?? "Ungültige E-Mail-Adresse.");
      } else {
        showToast("error", error.message ?? "Etwas ist schiefgelaufen.");
      }
    } else {
      email.value = "";
      showToast("success", data?.message ?? "Willkommen bei Bits&Satoshis!");
    }
  } catch {
    showToast("error", "Verbindungsfehler. Bitte erneut versuchen.");
  } finally {
    loading.value = false;
  }
}

function showToast(type: "success" | "error", message: string) {
  if (dismissTimer) clearTimeout(dismissTimer);
  toastType.value = type;
  toastMessage.value = message;
  toastShow.value = true;
  dismissTimer = setTimeout(() => {
    toastShow.value = false;
  }, 5000);
}
</script>

<template>
  <div class="signup-root">
    <form @submit.prevent="handleSubmit" class="signup-form" novalidate>
      <div class="input-row">
        <input
          v-model="email"
          type="email"
          placeholder="deine@email.de"
          autocomplete="email"
          required
          :disabled="loading"
          class="signup-input"
        />
        <button
          type="submit"
          :disabled="loading"
          class="signup-btn"
          aria-label="Newsletter abonnieren"
        >
          <span v-if="loading" class="spinner" aria-hidden="true" />
          <span v-else class="btn-label">Abonnieren&nbsp;→</span>
        </button>
      </div>
    </form>

    <Transition name="toast-pop">
      <div
        v-if="toastShow"
        class="toast"
        :class="toastType === 'success' ? 'toast--ok' : 'toast--err'"
        role="status"
        aria-live="polite"
      >
        <span class="toast-icon" aria-hidden="true">
          {{ toastType === "success" ? "✓" : "✕" }}
        </span>
        <span class="toast-text">{{ toastMessage }}</span>
        <button
          class="toast-close"
          aria-label="Schließen"
          @click="toastShow = false"
        >×</button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.signup-root {
  position: relative;
  width: 100%;
}

/* ── Form ────────────────────────────────────────── */
.signup-form {
  width: 100%;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 2px solid rgba(253, 250, 245, 0.3);
  padding-bottom: 0.625rem;
  transition: border-color 220ms ease;
}

.input-row:focus-within {
  border-color: rgba(253, 250, 245, 0.85);
}

.signup-input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  color: #fdfaf5;
  font-family: var(--f-body);
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.5;
}

.signup-input::placeholder {
  color: rgba(253, 250, 245, 0.4);
}

.signup-input:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.signup-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 6.5rem;
  height: 2rem;
  background: #221a0f;
  border: none;
  cursor: pointer;
  padding: 0 0.875rem;
  color: #fdfaf5;
  font-family: var(--f-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: opacity 160ms ease, transform 160ms ease;
}

.signup-btn:hover:not(:disabled) {
  opacity: 0.85;
  transform: translateX(2px);
}

.signup-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

/* ── Spinner ─────────────────────────────────────── */
.spinner {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 2px solid rgba(253, 250, 245, 0.25);
  border-top-color: #fdfaf5;
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ── Toast ───────────────────────────────────────── */
.toast {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  min-width: 18rem;
  max-width: 22rem;
  font-family: var(--f-body);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.45;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
}

.toast--ok {
  background: #14532d;
  color: #dcfce7;
}

.toast--err {
  background: #7f1d1d;
  color: #fee2e2;
}

.toast-icon {
  font-size: 0.875rem;
  font-weight: 700;
  flex-shrink: 0;
}

.toast-text {
  flex: 1;
}

.toast-close {
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  opacity: 0.6;
  font-size: 1rem;
  line-height: 1;
  padding: 0 0 0 0.25rem;
  transition: opacity 120ms;
}

.toast-close:hover {
  opacity: 1;
}

/* ── Toast transition ────────────────────────────── */
.toast-pop-enter-active {
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

.toast-pop-leave-active {
  transition: all 220ms cubic-bezier(0.4, 0, 1, 1);
}

.toast-pop-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.97);
}

.toast-pop-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
