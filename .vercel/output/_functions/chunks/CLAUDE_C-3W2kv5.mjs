import { c as createComponent } from './astro-component_C1NZAk9n.mjs';
import { m as maybeRenderHead, u as unescapeHTML, n as renderTemplate } from './entrypoint_7hSRLVHs.mjs';

const html = () => "<h1 id=\"srcpagesnewsletter\">src/pages/newsletter/</h1>\n<h2 id=\"zweck\">Zweck</h2>\n<p>Einzelne Newsletter-Ausgabe unter eigener URL: <code>/newsletter/[slug]</code>.</p>\n<h2 id=\"slugastro\">[slug].astro</h2>\n<ul>\n<li>Liest <code>Astro.params.slug</code> und holt die Ausgabe via <code>getPost(slug)</code>\n(<code>src/lib/beehiiv.ts</code>), inkl. vollem Web-Inhalt (<code>expand[]=free_web_content</code>).</li>\n<li>Kein Treffer → <code>return new Response(null, { status: 404 })</code>.</li>\n<li>Rendert:\n<ul>\n<li>Datum (<code>formatDate</code>) + Titel + Untertitel</li>\n<li>Voller Inhalt via <code>set:html={post.contentHtml}</code> in einem\n<code>prose prose-neutral</code>-Container (Tailwind Typography).</li>\n<li>Fallback-Block mit Link zu beehiiv, falls <code>contentHtml</code> fehlt.</li>\n<li>Signup-CTA am Ende.</li>\n</ul>\n</li>\n</ul>\n<h2 id=\"sicherheit--inhalt\">Sicherheit / Inhalt</h2>\n<ul>\n<li><code>set:html</code> rendert HTML von beehiiv. Die Quelle ist vertrauenswürdig (eigene\nPublikation), daher ok. Keine Nutzereingaben hier einsetzen.</li>\n<li><code>prose</code>-Styling: Links in <code>primary</code>, Headings fett. Bei Bedarf\n<code>prose-*</code>-Modifier ergänzen, nicht globale Styles überschreiben.</li>\n</ul>\n<h2 id=\"slug-vs-id\">Slug vs. ID</h2>\n<p>beehiiv adressiert Posts per <code>post_…</code>-ID. <code>getPost</code> akzeptiert beides: bei einem\nSlug ermittelt es die ID über die Postliste. URLs nutzen den menschenlesbaren\n<code>slug</code> aus dem Post.</p>";

				const frontmatter = {};
				const file = "C:/Users/vince/dev/bitsandsatoshis/src/pages/newsletter/CLAUDE.md";
				const url = "/newsletter/CLAUDE";
				function rawContent() {
					return "# src/pages/newsletter/\n\n## Zweck\nEinzelne Newsletter-Ausgabe unter eigener URL: `/newsletter/[slug]`.\n\n## [slug].astro\n- Liest `Astro.params.slug` und holt die Ausgabe via `getPost(slug)`\n  (`src/lib/beehiiv.ts`), inkl. vollem Web-Inhalt (`expand[]=free_web_content`).\n- Kein Treffer → `return new Response(null, { status: 404 })`.\n- Rendert:\n  - Datum (`formatDate`) + Titel + Untertitel\n  - Voller Inhalt via `set:html={post.contentHtml}` in einem\n    `prose prose-neutral`-Container (Tailwind Typography).\n  - Fallback-Block mit Link zu beehiiv, falls `contentHtml` fehlt.\n  - Signup-CTA am Ende.\n\n## Sicherheit / Inhalt\n- `set:html` rendert HTML von beehiiv. Die Quelle ist vertrauenswürdig (eigene\n  Publikation), daher ok. Keine Nutzereingaben hier einsetzen.\n- `prose`-Styling: Links in `primary`, Headings fett. Bei Bedarf\n  `prose-*`-Modifier ergänzen, nicht globale Styles überschreiben.\n\n## Slug vs. ID\nbeehiiv adressiert Posts per `post_…`-ID. `getPost` akzeptiert beides: bei einem\nSlug ermittelt es die ID über die Postliste. URLs nutzen den menschenlesbaren\n`slug` aus dem Post.\n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [{"depth":1,"slug":"srcpagesnewsletter","text":"src/pages/newsletter/"},{"depth":2,"slug":"zweck","text":"Zweck"},{"depth":2,"slug":"slugastro","text":"[slug].astro"},{"depth":2,"slug":"sicherheit--inhalt","text":"Sicherheit / Inhalt"},{"depth":2,"slug":"slug-vs-id","text":"Slug vs. ID"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`<meta charset="utf-8">${maybeRenderHead()}${unescapeHTML(html())}`;
				});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
