import { c as createComponent } from './astro-component_C1NZAk9n.mjs';
import { m as maybeRenderHead, k as addAttribute, n as renderTemplate } from './entrypoint_7hSRLVHs.mjs';
import { f as formatDate } from './SignupCta_DELd5d95.mjs';

const $$PostCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PostCard;
  const { post } = Astro2.props;
  const href = `/newsletter/${post.slug}`;
  return renderTemplate`${maybeRenderHead()}<article class="group card relative border border-base-300 bg-base-100 transition-shadow hover:shadow-md"> ${post.thumbnailUrl && renderTemplate`<figure class="aspect-[16/9] overflow-hidden"> <img${addAttribute(post.thumbnailUrl, "src")}${addAttribute(post.title, "alt")} loading="lazy" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"> </figure>`} <div class="card-body gap-2"> ${post.publishedAt && renderTemplate`<time${addAttribute(post.publishedAt.toISOString(), "datetime")} class="text-xs font-medium uppercase tracking-wide text-base-content/50"> ${formatDate(post.publishedAt)} </time>`} <h3 class="text-lg font-bold leading-snug"> <a${addAttribute(href, "href")} class="after:absolute after:inset-0"> ${post.title} </a> </h3> ${post.teaser && renderTemplate`<p class="line-clamp-3 text-sm text-base-content/70">${post.teaser}</p>`} <span class="mt-1 text-sm font-semibold text-primary">Weiterlesen →</span> </div> </article>`;
}, "C:/Users/vince/dev/bitsandsatoshis/src/components/PostCard.astro", void 0);

export { $$PostCard as $ };
