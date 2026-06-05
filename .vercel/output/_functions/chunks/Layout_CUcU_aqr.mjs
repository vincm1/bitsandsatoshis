import { c as createComponent } from './astro-component_C1NZAk9n.mjs';
import { x as isInputError, m as maybeRenderHead, k as addAttribute, n as renderTemplate, w as renderComponent, y as renderHead, z as renderSlot } from './entrypoint_7hSRLVHs.mjs';
import { useSSRContext, defineComponent, ref, onMounted, onUnmounted, computed, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { a as actions } from './server_CIy0_6uW.mjs';

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  props: {
    currentPath: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const links = [
      { href: "/", label: "Start" },
      { href: "/archiv", label: "Archiv" },
      { href: "/ueber", label: "Über" }
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
    function isActive(href) {
      return href === "/" ? path.value === "/" : path.value.startsWith(href);
    }
    const __returned__ = { props, links, scrolled, open, onScroll, path, isActive };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["fixed inset-x-0 top-0 z-50 flex justify-center px-3 transition-all duration-300 ease-out", $setup.scrolled ? "pt-3 sm:pt-4" : "pt-0"]
  }, _attrs))}><nav class="${ssrRenderClass([
    $setup.scrolled ? "max-w-3xl rounded-full border border-base-300 bg-base-100/80 px-3 py-2 shadow-lg shadow-base-content/5 backdrop-blur-md" : "max-w-5xl rounded-none border-b border-base-300 bg-base-100/95 px-2 py-4 backdrop-blur-sm",
    "flex w-full items-center gap-3 transition-all duration-300 ease-out"
  ])}"><a href="/" class="${ssrRenderClass([$setup.scrolled ? "text-lg" : "text-xl", "flex shrink-0 items-center gap-2 font-extrabold tracking-tight transition-all duration-300"])}"><span class="${ssrRenderClass([$setup.scrolled ? "h-7 w-7 text-sm" : "h-8 w-8 text-base", "flex items-center justify-center rounded-full bg-primary font-extrabold text-primary-content transition-all duration-300"])}" aria-hidden="true">₿</span><span>Bits<span class="text-primary">&amp;</span>Satoshis</span></a><ul class="hidden flex-1 items-center gap-1 sm:flex"><!--[-->`);
  ssrRenderList($setup.links, (link) => {
    _push(`<li><a${ssrRenderAttr("href", link.href)} class="${ssrRenderClass([$setup.isActive(link.href) ? "text-primary" : "text-base-content/80", "rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-base-200"])}"${ssrRenderAttr("aria-current", $setup.isActive(link.href) ? "page" : void 0)}>${ssrInterpolate(link.label)}</a></li>`);
  });
  _push(`<!--]--></ul><a href="#newsletter" class="${ssrRenderClass([$setup.scrolled ? "btn-sm" : "btn-sm md:btn-md", "btn btn-primary hidden rounded-full sm:inline-flex"])}"> Abonnieren </a><a href="#newsletter" class="btn btn-primary btn-sm ml-auto rounded-full sm:hidden"> Abonnieren </a><button type="button" class="btn btn-ghost btn-square btn-sm sm:hidden"${ssrRenderAttr("aria-expanded", $setup.open)} aria-label="Menü öffnen"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">`);
  if (!$setup.open) {
    _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`);
  } else {
    _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`);
  }
  _push(`</svg></button></nav>`);
  if ($setup.open) {
    _push(`<ul class="absolute left-3 right-3 top-full mt-2 flex flex-col gap-1 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg sm:hidden"><!--[-->`);
    ssrRenderList($setup.links, (link) => {
      _push(`<li><a${ssrRenderAttr("href", link.href)} class="${ssrRenderClass([$setup.isActive(link.href) ? "text-primary" : "text-base-content/80", "block rounded-lg px-3 py-2 font-medium transition-colors hover:bg-base-200"])}">${ssrInterpolate(link.label)}</a></li>`);
    });
    _push(`<!--]--></ul>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Navbar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

const $$SignupForm = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SignupForm;
  const { compact = false } = Astro2.props;
  const result = Astro2.getActionResult(actions.subscribe);
  const inputError = result?.error && isInputError(result.error) ? result.error.fields.email?.[0] : void 0;
  const failed = result?.error && !inputError;
  const success = result && !result.error;
  return renderTemplate`${maybeRenderHead()}<form method="POST"${addAttribute(actions.subscribe, "action")}${addAttribute([
    "w-full",
    compact ? "flex gap-2" : "flex flex-col gap-3 sm:flex-row"
  ], "class:list")}> <div class="flex-1"> <label class="sr-only"${addAttribute(compact ? "email-footer" : "email-hero", "for")}>
E-Mail-Adresse
</label> <input${addAttribute(compact ? "email-footer" : "email-hero", "id")} name="email" type="email" required autocomplete="email" placeholder="deine@email.de" class="input input-bordered w-full bg-base-100"> </div> <button type="submit" class="btn btn-primary whitespace-nowrap">
Abonnieren
</button> </form> ${success && renderTemplate`<p class="mt-2 text-sm font-medium text-success">${result.data.message}</p>`} ${inputError && renderTemplate`<p class="mt-2 text-sm font-medium text-error">${inputError}</p>`} ${failed && renderTemplate`<p class="mt-2 text-sm font-medium text-error">
Da ist etwas schiefgelaufen. Bitte versuche es später erneut.
</p>`}`;
}, "C:/Users/vince/dev/bitsandsatoshis/src/components/SignupForm.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="mt-24 border-t border-base-300 bg-base-200"> <div class="mx-auto max-w-5xl px-4 py-12"> <div class="grid gap-10 md:grid-cols-2"> <div> <div class="flex items-center gap-2 text-lg font-extrabold tracking-tight"> <span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-primary-content" aria-hidden="true">₿</span> <span>Bits<span class="text-primary">&</span>Satoshis</span> </div> <p class="mt-3 max-w-sm text-sm text-base-content/70">
Der ruhige Bitcoin-Newsletter für Menschen,
<span class="accent">die verstehen wollen</span> — nicht spekulieren.
</p> </div> <div id="newsletter" class="scroll-mt-28"> <p class="mb-2 text-sm font-semibold">Newsletter abonnieren</p> ${renderComponent($$result, "SignupForm", $$SignupForm, { "compact": true })} </div> </div> <div class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-base-300 pt-6 text-sm text-base-content/60 sm:flex-row"> <p>© ${year} Bits&Satoshis</p> <nav class="flex gap-4"> <a href="/impressum" class="hover:text-primary">Impressum</a> <a href="/datenschutz" class="hover:text-primary">Datenschutz</a> </nav> </div> </div> </footer>`;
}, "C:/Users/vince/dev/bitsandsatoshis/src/components/Footer.astro", void 0);

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Bits&Satoshis — Der ruhige Bitcoin-Newsletter",
    description = "Der ruhige Bitcoin-Newsletter für Menschen, die verstehen wollen — nicht spekulieren."
  } = Astro2.props;
  return renderTemplate`<html lang="de"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image">${renderHead()}</head> <body class="flex min-h-screen flex-col bg-base-100 text-base-content antialiased"> ${renderComponent($$result, "Navbar", Navbar, { "client:load": true, "currentPath": Astro2.url.pathname, "client:component-hydration": "load", "client:component-path": "C:/Users/vince/dev/bitsandsatoshis/src/components/Navbar.vue", "client:component-export": "default" })} <main class="flex-1 pt-20 sm:pt-24"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "C:/Users/vince/dev/bitsandsatoshis/src/layouts/Layout.astro", void 0);

export { $$Layout as $, $$SignupForm as a };
