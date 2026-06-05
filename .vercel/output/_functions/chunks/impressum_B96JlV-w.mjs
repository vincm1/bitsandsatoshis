import { c as createComponent } from './astro-component_C1NZAk9n.mjs';
import { w as renderComponent, n as renderTemplate, m as maybeRenderHead } from './entrypoint_7hSRLVHs.mjs';
import { $ as $$Layout } from './Layout_CUcU_aqr.mjs';

const $$Impressum = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Impressum — Bits&Satoshis", "description": "Impressum von Bits&Satoshis." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto max-w-2xl px-4 py-16"> <h1 class="text-3xl font-extrabold tracking-tight">Impressum</h1> <div class="prose prose-neutral mt-8 max-w-none"> <p class="rounded-box border border-warning/40 bg-warning/10 p-4 text-sm not-prose">
⚠️ Platzhalter — bitte vor dem Livegang mit den echten Angaben
        ausfüllen (§ 5 DDG / § 18 MStV).
</p> <h2>Angaben gemäß § 5 DDG</h2> <p>
Vincent [Nachname]<br>
[Straße & Hausnummer]<br>
[PLZ Ort]<br>
Deutschland
</p> <h2>Kontakt</h2> <p>
E-Mail: [deine@email.de]
</p> <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2> <p>
Vincent [Nachname]<br>
[Anschrift wie oben]
</p> </div> </section> ` })}`;
}, "C:/Users/vince/dev/bitsandsatoshis/src/pages/impressum.astro", void 0);

const $$file = "C:/Users/vince/dev/bitsandsatoshis/src/pages/impressum.astro";
const $$url = "/impressum";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Impressum,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
