import { c as createComponent } from './astro-component_C1NZAk9n.mjs';
import { w as renderComponent, n as renderTemplate, m as maybeRenderHead } from './entrypoint_7hSRLVHs.mjs';
import { $ as $$Layout, a as $$SignupForm } from './Layout_CUcU_aqr.mjs';

const $$Ueber = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Über — Bits&Satoshis", "description": "Wer hinter Bits&Satoshis steckt und worum es geht." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto max-w-2xl px-4 py-16"> <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
Über <span class="accent text-primary">Bits&Satoshis</span> </h1> <div class="prose prose-neutral mt-8 max-w-none prose-headings:font-bold prose-a:text-primary"> <p class="lead text-lg">
Hallo, ich bin Vincent. Bits&Satoshis ist mein Versuch, Bitcoin so zu
        erklären, wie ich es mir selbst am Anfang gewünscht hätte: ruhig,
        ehrlich und ohne Kursgeschrei.
</p> <h2>Die Mission</h2> <p>
Die meisten Inhalte über Bitcoin drehen sich um Preise, Prognosen und
        Panik. Bits&Satoshis macht das Gegenteil. Hier geht es ums Verstehen:
        wie Bitcoin funktioniert, warum es so gebaut ist, wie es ist, und was
        das für dich bedeutet — ganz ohne Spekulation.
</p> <h2>Was dich erwartet</h2> <ul> <li>Einmal pro Woche eine klare, kompakte Ausgabe.</li> <li>Konzepte verständlich erklärt — vom Satoshi bis zur Selbstverwahrung.</li> <li>Kein Hype, keine Kaufempfehlungen, keine Angstmache.</li> </ul> <p>
Wenn das nach dir klingt: Trag dich unten ein und lies in Ruhe mit.
</p> </div> <div class="mt-12 max-w-md"> ${renderComponent($$result2, "SignupForm", $$SignupForm, {})} </div> </section> ` })}`;
}, "C:/Users/vince/dev/bitsandsatoshis/src/pages/ueber.astro", void 0);

const $$file = "C:/Users/vince/dev/bitsandsatoshis/src/pages/ueber.astro";
const $$url = "/ueber";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ueber,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
