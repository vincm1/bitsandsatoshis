import { c as createComponent } from './astro-component_C1NZAk9n.mjs';
import { w as renderComponent, n as renderTemplate, m as maybeRenderHead, k as addAttribute, u as unescapeHTML } from './entrypoint_7hSRLVHs.mjs';
import { $ as $$Layout } from './Layout_CUcU_aqr.mjs';
import { f as formatDate, $ as $$SignupCta } from './SignupCta_DELd5d95.mjs';
import { a as getPost } from './beehiiv_D-zrTtIV.mjs';

const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const post = slug ? await getPost(slug) : null;
  if (!post) {
    return new Response(null, { status: 404, statusText: "Not Found" });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${post.title} — Bits&Satoshis`, "description": post.teaser || post.subtitle }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="mx-auto max-w-2xl px-4 py-16"> <a href="/archiv" class="mb-8 inline-block text-sm font-semibold text-primary hover:underline">
← Zurück zum Archiv
</a> <header class="mb-10"> ${post.publishedAt && renderTemplate`<time${addAttribute(post.publishedAt.toISOString(), "datetime")} class="text-sm font-medium uppercase tracking-wide text-base-content/50"> ${formatDate(post.publishedAt)} </time>`} <h1 class="mt-2 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl"> ${post.title} </h1> ${post.subtitle && renderTemplate`<p class="mt-3 text-lg text-base-content/70">${post.subtitle}</p>`} </header> ${post.contentHtml ? renderTemplate`<div class="prose prose-neutral max-w-none prose-a:text-primary prose-headings:font-bold">${unescapeHTML(post.contentHtml)}</div>` : renderTemplate`<div class="rounded-box border border-base-300 bg-base-200 p-6"> <p class="text-base-content/70">
Der vollständige Inhalt dieser Ausgabe ist hier noch nicht
            verfügbar.
</p> ${post.webUrl && post.webUrl !== "#" && renderTemplate`<a${addAttribute(post.webUrl, "href")} class="btn btn-primary mt-4" target="_blank" rel="noopener">
Auf beehiiv lesen →
</a>`} </div>`} <div class="mt-16"> ${renderComponent($$result2, "SignupCta", $$SignupCta, { "title": "Noch nicht abonniert?", "text": "Erhalte die nächste Ausgabe direkt in dein Postfach — einmal pro Woche, ruhig und klar." })} </div> </article> ` })}`;
}, "C:/Users/vince/dev/bitsandsatoshis/src/pages/newsletter/[slug].astro", void 0);

const $$file = "C:/Users/vince/dev/bitsandsatoshis/src/pages/newsletter/[slug].astro";
const $$url = "/newsletter/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
