import { c as createComponent } from './astro-component_C1NZAk9n.mjs';
import { m as maybeRenderHead, w as renderComponent, n as renderTemplate } from './entrypoint_7hSRLVHs.mjs';
import { a as $$SignupForm } from './Layout_CUcU_aqr.mjs';

function formatDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

const $$SignupCta = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SignupCta;
  const {
    title = "Bitcoin verstehen — einmal pro Woche",
    text = "Trag dich ein und bekomme die nächste Ausgabe direkt in dein Postfach. Kostenlos, jederzeit kündbar, kein Spam."
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="rounded-box border border-base-300 bg-base-200 p-8 text-center sm:p-10"> <h2 class="text-2xl font-bold sm:text-3xl">${title}</h2> <p class="mx-auto mt-3 max-w-md text-base-content/70">${text}</p> <div class="mx-auto mt-6 max-w-md"> ${renderComponent($$result, "SignupForm", $$SignupForm, {})} </div> </div>`;
}, "C:/Users/vince/dev/bitsandsatoshis/src/components/SignupCta.astro", void 0);

export { $$SignupCta as $, formatDate as f };
