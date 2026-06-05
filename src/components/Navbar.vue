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
  scrolled.value = window.scrollY > 24;
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
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out"
    :class="scrolled ? 'px-3 pt-3 sm:px-4 sm:pt-4' : 'px-0 pt-0'"
  >
    <nav
      class="relative mx-auto flex w-full items-center justify-between transition-all duration-300 ease-out"
      :class="
        scrolled
          ? 'max-w-5xl rounded-full bg-base-100/75 px-4 py-2.5 shadow-xl shadow-base-content/[0.06] backdrop-blur-xl sm:px-6'
          : 'max-w-[1400px] rounded-none bg-transparent px-4 py-4 sm:px-8'
      "
    >
      <!-- Logo links -->
      <a
        href="/"
        class="nav-rise group flex shrink-0 items-center gap-3"
        aria-label="Bits&Satoshis – Der Bitcoin Newsletter"
      >
        <img
          src="/logo.svg"
          alt="Bits&Satoshis"
          class="w-auto transition-all duration-300 ease-out group-hover:rotate-[8deg]"
          :class="scrolled ? 'h-11' : 'h-14'"
        />
        <span class="flex flex-col leading-none">
          <span
            class="font-extrabold tracking-tight transition-all duration-300"
            :class="scrolled ? 'text-lg' : 'text-xl sm:text-2xl'"
          >
            Bits<span class="text-primary">&amp;</span>Satoshis
          </span>
          <span
            class="accent text-base-content/55 transition-all duration-300"
            :class="scrolled ? 'mt-0.5 text-[0.7rem] tracking-wide' : 'mt-1 text-sm tracking-wide'"
          >
            Der Bitcoin Newsletter
          </span>
        </span>
      </a>

      <!-- Links mittig (absolut zentriert) -->
      <ul
        class="nav-fade absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex"
        style="animation-delay: 120ms"
      >
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="relative py-1 text-[0.8rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-center after:bg-primary after:transition-transform after:duration-300 after:ease-out"
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

      <!-- Signup-CTA rechts -->
      <div
        class="nav-rise flex shrink-0 items-center gap-2"
        style="animation-delay: 220ms"
      >
        <a
          href="#newsletter"
          class="group inline-flex items-center gap-1.5 rounded-full bg-primary font-semibold text-primary-content shadow-lg shadow-primary/30 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 active:translate-y-0"
          :class="scrolled ? 'px-4 py-2 text-sm' : 'px-5 py-2.5 text-sm md:text-[0.95rem]'"
        >
          Abonnieren
          <svg
            class="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 12h14M13 6l6 6-6 6"
            />
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              v-if="!open"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
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
        class="mx-3 mb-2 flex flex-col gap-1 rounded-2xl bg-base-100/95 p-2 shadow-xl ring-1 ring-base-200 backdrop-blur-xl lg:hidden"
      >
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="block rounded-xl px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] transition-colors"
            :class="
              isActive(link.href)
                ? 'bg-primary/10 text-primary'
                : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
            "
            @click="open = false"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </transition>
  </header>
</template>

<style scoped>
@keyframes nav-rise {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes nav-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.nav-rise {
  animation: nav-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.nav-fade {
  animation: nav-fade 0.7s ease-out both;
}
@media (prefers-reduced-motion: reduce) {
  .nav-rise,
  .nav-fade {
    animation: none;
  }
}
</style>
