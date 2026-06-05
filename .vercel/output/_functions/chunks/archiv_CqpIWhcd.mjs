import { c as createComponent } from './astro-component_C1NZAk9n.mjs';
import { w as renderComponent, n as renderTemplate, m as maybeRenderHead } from './entrypoint_7hSRLVHs.mjs';
import { $ as $$Layout } from './Layout_CUcU_aqr.mjs';
import { $ as $$PostCard } from './PostCard_B6ask2Lo.mjs';
import { $ as $$SignupCta } from './SignupCta_DELd5d95.mjs';
import { g as getPosts } from './beehiiv_D-zrTtIV.mjs';

const $$Archiv = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getPosts({ limit: 100 });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Archiv — Bits&Satoshis", "description": "Alle Ausgaben des Bits&Satoshis Bitcoin-Newsletters." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto max-w-5xl px-4 py-16"> <header class="mb-10 max-w-2xl"> <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
Newsletter-<span class="accent text-primary">Archiv</span> </h1> <p class="mt-3 text-base-content/70">
Alle bisherigen Ausgaben — in Ruhe nachlesen, wann immer du möchtest.
</p> </header> ${posts.length > 0 ? renderTemplate`<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"> ${posts.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "post": post })}`)} </div>` : renderTemplate`<p class="text-base-content/60">
Noch keine Ausgaben veröffentlicht.
</p>`}  <div class="mt-16"> ${renderComponent($$result2, "SignupCta", $$SignupCta, { "title": "Keine Ausgabe verpassen", "text": "Neue Ausgaben landen direkt in deinem Postfach — einmal pro Woche, in Ruhe zu lesen." })} </div> </section> ` })}`;
}, "C:/Users/vince/dev/bitsandsatoshis/src/pages/archiv.astro", void 0);

const $$file = "C:/Users/vince/dev/bitsandsatoshis/src/pages/archiv.astro";
const $$url = "/archiv";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Archiv,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
