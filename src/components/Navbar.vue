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
  scrolled.value = window.scrollY > 16;
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
    <!-- Editoriale Orange-Linie -->
    <div class="h-[3px] w-full bg-primary"></div>

    <div
      class="transition-all duration-300 ease-out"
      :class="
        scrolled
          ? 'border-b border-base-content/10 bg-base-100/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      "
    >
      <nav
        class="mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 ease-out"
        :class="scrolled ? 'py-2.5' : 'py-4'"
      >
        <!-- Logo links (nur SVG) -->
        <a href="/" class="nav-rise group flex shrink-0 items-center">
          <img
            src="/logo.svg"
            alt="Bits&Satoshis – Der Bitcoin Newsletter"
            class="w-auto transition-all duration-300 ease-out group-hover:rotate-[8deg]"
            :class="scrolled ? 'h-11 sm:h-12' : 'h-14 sm:h-16'"
          />
        </a>

        <!-- Rechte Gruppe: Kapitälchen-Nav + CTA -->
        <div class="nav-rise flex items-center gap-8" style="animation-delay: 120ms">
          <ul class="hidden items-center gap-8 lg:flex">
            <li v-for="link in links" :key="link.href">
              <a
                :href="link.href"
                class="relative py-1 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-center after:bg-primary after:transition-transform after:duration-300 after:ease-out"
                :class="
                  isActive(link.href)
                    ? 'text-base-content after:scale-x-100'
                    : 'text-base-content/45 after:scale-x-0 hover:text-base-content hover:after:scale-x-100'
                "
                :aria-current="isActive(link.href) ? 'page' : undefined"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>

          <a
            href="#newsletter"
            class="group inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-primary-content shadow-lg shadow-primary/25 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
          >
            Abonnieren
            <svg
              class="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <!-- Mobile-Burger -->
          <button
            type="button"
            class="btn btn-ghost btn-square btn-sm rounded-full lg:hidden"
            :aria-expanded="open"
            aria-label="Menü öffnen"
            @click="open = !open"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </nav>

      <!-- Mobile-Panel -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="-translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-2 opacity-0"
      >
        <ul
          v-if="open"
          class="mx-6 mb-3 flex flex-col gap-1 border-t border-base-content/10 pt-3 lg:hidden"
        >
          <li v-for="link in links" :key="link.href">
            <a
              :href="link.href"
              class="block py-2 text-sm font-semibold uppercase tracking-[0.14em] transition-colors"
              :class="isActive(link.href) ? 'text-primary' : 'text-base-content/60 hover:text-base-content'"
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
@keyframes nav-rise {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.nav-rise {
  animation: nav-rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@media (prefers-reduced-motion: reduce) {
  .nav-rise {
    animation: none;
  }
}
</style>
