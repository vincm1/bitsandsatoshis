<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

const props = defineProps<{ currentPath?: string }>();

const links = [
  { href: "/", label: "Start" },
  { href: "/archiv", label: "Archiv" },
  { href: "/ueber", label: "Über" },
];

const scrolled = ref(false);
const open = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 80;
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
onUnmounted(() => window.removeEventListener("scroll", onScroll));

const path = computed(() => props.currentPath ?? "/");
function isActive(href: string) {
  return href === "/" ? path.value === "/" : path.value.startsWith(href);
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50">

    <!-- Announcement bar: grid-trick height collapse — kein height/padding animieren -->
    <div class="bar-wrapper" :class="{ 'bar-collapsed': scrolled }">
      <div class="bar-inner">
        <a
          href="#newsletter"
          class="announcement-bar flex w-full items-center justify-center gap-3 bg-primary px-4 py-2.5"
          aria-label="Jetzt abonnieren"
        >
          <span class="announcement-dot" aria-hidden="true"></span>
          <span class="announcement-text">
            Bitcoin verstehen, nicht spekulieren — einmal pro Woche, kostenlos.
            <span class="announcement-cta">Jetzt abonnieren&nbsp;→</span>
          </span>
          <span class="announcement-dot" aria-hidden="true"></span>
        </a>
      </div>
    </div>

    <!-- Nav-Wrapper: morpht beim Scrollen zur floating Pill -->
    <!-- border immer present (transparent → sichtbar), damit keine Farb-Flash -->
    <div
      class="nav-pill border border-transparent"
      :data-scrolled="scrolled || undefined"
      :class="
        scrolled
          ? 'mx-4 mt-2 rounded-full border-[rgba(200,186,168,0.35)] bg-[rgba(244,237,224,0.52)] [backdrop-filter:blur(28px)_saturate(180%)] sm:mx-auto sm:max-w-2xl'
          : 'bg-base-100'
      "
    >
      <nav
        class="mx-auto flex items-center justify-between"
        :class="scrolled ? 'max-w-2xl px-5 py-2' : 'max-w-6xl px-6 py-3.5'"
      >
        <!-- Logo -->
        <a href="/" class="nav-rise group flex shrink-0 items-center">
          <img
            src="/logo.svg"
            alt="Bits&Satoshis — Der Bitcoin Newsletter"
            class="logo-img w-auto"
            :class="scrolled ? 'h-9 sm:h-10' : 'h-12 sm:h-14'"
          />
        </a>

        <!-- Rechts: Links + CTA -->
        <div class="nav-rise flex items-center gap-6" style="animation-delay: 120ms">
          <ul class="hidden items-center gap-6 lg:flex">
            <li v-for="link in links" :key="link.href">
              <a
                :href="link.href"
                class="nav-link relative py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[1.5px] after:origin-center after:bg-primary"
                :class="
                  isActive(link.href)
                    ? 'text-base-content after:scale-x-100'
                    : 'text-base-content/40 after:scale-x-0 hover:text-base-content hover:after:scale-x-100'
                "
                :aria-current="isActive(link.href) ? 'page' : undefined"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>

          <!-- CTA -->
          <a
            href="#newsletter"
            class="cta-btn inline-flex items-center gap-1.5 bg-primary px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-white rounded-full"
          >
            Abonnieren
            <svg
              class="cta-arrow h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <!-- Mobile Burger -->
          <button
            type="button"
            class="burger-btn inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-base-content/8 lg:hidden"
            :aria-expanded="open"
            aria-label="Menü öffnen"
            @click="open = !open"
          >
            <svg class="h-5 w-5 text-base-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </nav>

      <!-- Mobile Panel -->
      <transition name="mobile-panel">
        <ul
          v-if="open"
          class="flex flex-col gap-1 border-t border-base-content/10 px-6 pb-4 pt-3 lg:hidden"
        >
          <li
            v-for="(link, i) in links"
            :key="link.href"
            class="mobile-link-item"
            :style="`animation-delay: ${i * 45}ms`"
          >
            <a
              :href="link.href"
              class="block py-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] transition-colors"
              :class="isActive(link.href) ? 'text-primary' : 'text-base-content/50 hover:text-base-content'"
              @click="open = false"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </transition>
    </div>
  </header>
</template>

<style scoped>
/* ── Page entrance ─────────────────────────────────────────────────────── */
@keyframes nav-rise {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.nav-rise {
  animation: nav-rise 0.55s cubic-bezier(0.23, 1, 0.32, 1) both;
}

/* ── Announcement bar: grid-trick height collapse ──────────────────────── */
/* grid-template-rows transition = smooth height collapse, GPU-friendly     */
/* Avoids animating height/padding which trigger layout recalc              */
.bar-wrapper {
  display: grid;
  grid-template-rows: 1fr;
  opacity: 1;
  pointer-events: auto;
  transition:
    grid-template-rows 260ms cubic-bezier(0.23, 1, 0.32, 1),
    opacity            200ms cubic-bezier(0.23, 1, 0.32, 1);
}
.bar-collapsed {
  grid-template-rows: 0fr;
  opacity: 0;
  pointer-events: none;
}
.bar-inner {
  overflow: hidden;
}

.announcement-bar {
  transition: opacity 150ms cubic-bezier(0.23, 1, 0.32, 1);
}
.announcement-bar:hover { opacity: 0.93; }

.announcement-text {
  font-family: var(--f-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #fff;
  white-space: nowrap;
}
.announcement-cta {
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-color: rgba(255,255,255,0.5);
  margin-left: 0.35em;
}
.announcement-dot {
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255,255,255,0.55);
  flex-shrink: 0;
}

/* ── Nav pill: explizite Properties, kein transition-all ───────────────── */
/* border-style: solid ist fix — kein none→solid Sprung                     */
/* Kurve (0.16, 1, 0.3, 1): Apple-iOS-Spring-ähnlich, sanfter als (0.23,1) */
.nav-pill {
  border-style: solid;
  transition:
    margin           380ms cubic-bezier(0.4, 0, 0.2, 1),
    max-width        380ms cubic-bezier(0.4, 0, 0.2, 1),
    border-radius    380ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 380ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow       380ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color     380ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Glas-Shadow-Stack: Drop-Shadow + innere Highlight-Linie (Glas-Kante) */
.nav-pill[data-scrolled] {
  box-shadow:
    0 1px 1px  rgba(34,26,15,0.03),
    0 4px 16px rgba(34,26,15,0.06),
    0 12px 40px rgba(34,26,15,0.08),
    inset 0 1px 0 rgba(255,255,255,0.65);
}

/* Fallback wenn backdrop-filter nicht unterstützt wird */
@supports not (backdrop-filter: blur(1px)) {
  .nav-pill[data-scrolled] {
    background-color: rgba(244,237,224,0.96);
  }
}

/* ── Logo: nur transform, keine transition-all ─────────────────────────── */
.logo-img {
  transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
}
.group:hover .logo-img {
  transform: rotate(8deg);
}

/* ── Nav links ─────────────────────────────────────────────────────────── */
.nav-link {
  transition: color 160ms cubic-bezier(0.23, 1, 0.32, 1);
}
.nav-link::after {
  transition: transform 240ms cubic-bezier(0.23, 1, 0.32, 1);
}

/* ── CTA button: active scale = physisches Feedback ───────────────────── */
.cta-btn {
  transition:
    opacity   150ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
}
.cta-btn:hover  { opacity: 0.9; }
.cta-btn:active { transform: scale(0.97); }

.cta-arrow {
  transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
}
.cta-btn:hover .cta-arrow {
  transform: translateX(2px);
}

/* ── Burger button ─────────────────────────────────────────────────────── */
.burger-btn {
  transition:
    background-color 150ms cubic-bezier(0.23, 1, 0.32, 1),
    transform        130ms cubic-bezier(0.23, 1, 0.32, 1);
}
.burger-btn:active { transform: scale(0.9); }

/* ── Mobile panel: asymmetrisch — Enter langsamer als Exit ────────────── */
.mobile-panel-enter-active {
  transition:
    opacity   200ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
}
.mobile-panel-leave-active {
  transition:
    opacity   140ms cubic-bezier(0.77, 0, 0.175, 1),
    transform 140ms cubic-bezier(0.77, 0, 0.175, 1);
}
.mobile-panel-enter-from,
.mobile-panel-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
.mobile-panel-enter-to,
.mobile-panel-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* ── Mobile links: staggered entrance ─────────────────────────────────── */
@keyframes link-in {
  from { opacity: 0; transform: translateY(5px); }
  to   { opacity: 1; transform: translateY(0); }
}
.mobile-link-item {
  animation: link-in 220ms cubic-bezier(0.23, 1, 0.32, 1) both;
}

/* ── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .announcement-text {
    font-size: 10px;
    white-space: normal;
    text-align: center;
    line-height: 1.4;
  }
  .announcement-dot { display: none; }
}

/* ── Reduced motion ────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .nav-rise,
  .mobile-link-item { animation: none; }

  .bar-wrapper,
  .nav-pill,
  .logo-img,
  .nav-link,
  .cta-btn,
  .burger-btn {
    transition: opacity 100ms ease;
  }
  .mobile-panel-enter-active,
  .mobile-panel-leave-active {
    transition: opacity 100ms ease;
  }
  .mobile-panel-enter-from,
  .mobile-panel-leave-to {
    transform: none;
  }
}
</style>
