import { c as createComponent } from './astro-component_C1NZAk9n.mjs';
import { m as maybeRenderHead, w as renderComponent, n as renderTemplate } from './entrypoint_7hSRLVHs.mjs';
import { a as $$SignupForm, $ as $$Layout } from './Layout_CUcU_aqr.mjs';
import { $ as $$PostCard } from './PostCard_B6ask2Lo.mjs';
import { $ as $$SignupCta } from './SignupCta_DELd5d95.mjs';
import { g as getPosts } from './beehiiv_D-zrTtIV.mjs';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative overflow-hidden">  <div class="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden="true"></div> <div class="mx-auto max-w-3xl px-4 py-20 text-center sm:py-28"> <p class="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
Bitcoin-Newsletter
</p> <h1 class="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
Der ruhige Bitcoin-Newsletter für Menschen,<br class="hidden sm:block"> <span class="accent text-primary">die verstehen wollen</span> — nicht
      spekulieren.
</h1> <p class="mx-auto mt-6 max-w-xl text-lg text-base-content/70">
Einmal pro Woche ein klarer Gedanke zu Bitcoin. Ohne Kursgeschrei, ohne
      Hype — nur das, was wirklich zählt.
</p> <div class="mx-auto mt-10 max-w-md"> ${renderComponent($$result, "SignupForm", $$SignupForm, {})} <p class="mt-3 text-xs text-base-content/50">
Kostenlos. Jederzeit kündbar. Kein Spam.
</p> </div> </div> </section>`;
}, "C:/Users/vince/dev/bitsandsatoshis/src/components/Hero.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getPosts({ limit: 3 });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${maybeRenderHead()}<section class="border-y border-base-300 bg-base-200"> <div class="mx-auto max-w-3xl px-4 py-16 text-center"> <h2 class="text-2xl font-bold sm:text-3xl">
Verstehen <span class="accent text-primary">statt</span> spekulieren
</h2> <p class="mx-auto mt-4 max-w-2xl text-base-content/70">
Bits&Satoshis nimmt sich Zeit. Statt täglicher Kurspanik bekommst du
        einmal pro Woche eine ruhige, gut recherchierte Einordnung — für alle,
        die Bitcoin wirklich begreifen wollen, vom Einsteiger bis zum
        Fortgeschrittenen.
</p> </div> </section> <section class="mx-auto max-w-5xl px-4 py-16"> <div class="mb-8 flex items-end justify-between"> <h2 class="text-2xl font-bold sm:text-3xl">Letzte Ausgaben</h2> <a href="/archiv" class="text-sm font-semibold text-primary hover:underline">
Alle ansehen →
</a> </div> ${posts.length > 0 ? renderTemplate`<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"> ${posts.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "post": post })}`)} </div>` : renderTemplate`<p class="text-base-content/60">
Noch keine Ausgaben veröffentlicht. Bald geht es los!
</p>`} </section> <section class="mx-auto max-w-3xl px-4 pb-16"> ${renderComponent($$result2, "SignupCta", $$SignupCta, {})} </section> ` })}`;
}, "C:/Users/vince/dev/bitsandsatoshis/src/pages/index.astro", void 0);

const $$file = "C:/Users/vince/dev/bitsandsatoshis/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
