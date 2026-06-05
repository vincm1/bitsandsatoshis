import { c as createComponent } from './astro-component_C1NZAk9n.mjs';
import { m as maybeRenderHead, u as unescapeHTML, n as renderTemplate } from './entrypoint_7hSRLVHs.mjs';

const html = () => "<h1 id=\"srcpages\">src/pages/</h1>\n<h2 id=\"zweck\">Zweck</h2>\n<p>Datei-basiertes Routing. Jede <code>.astro</code>-Datei = eine URL. Alles läuft <strong>SSR</strong>\n(<code>output: 'server'</code>), Daten werden im Frontmatter serverseitig geholt.</p>\n<h2 id=\"routen\">Routen</h2>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"plaintext\"><code><span class=\"line\"><span>index.astro            → /            Hero + Signup + letzte 3 Ausgaben</span></span>\n<span class=\"line\"><span>archiv.astro           → /archiv      Alle Ausgaben (Karten-Grid)</span></span>\n<span class=\"line\"><span>newsletter/[slug].astro→ /newsletter/:slug   Einzel-Ausgabe (eigener CLAUDE.md)</span></span>\n<span class=\"line\"><span>ueber.astro            → /ueber       Über Vincent + Mission</span></span>\n<span class=\"line\"><span>impressum.astro        → /impressum   DSGVO-Platzhalter</span></span>\n<span class=\"line\"><span>datenschutz.astro      → /datenschutz DSGVO-Platzhalter</span></span></code></pre>\n<h2 id=\"muster-für-jede-seite\">Muster für jede Seite</h2>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"astro\"><code><span class=\"line\"><span style=\"color:#6A737D\">---</span></span>\n<span class=\"line\"><span style=\"color:#F97583\">import</span><span style=\"color:#E1E4E8\"> Layout </span><span style=\"color:#F97583\">from</span><span style=\"color:#9ECBFF\"> \"../layouts/Layout.astro\"</span><span style=\"color:#E1E4E8\">;</span></span>\n<span class=\"line\"><span style=\"color:#F97583\">import</span><span style=\"color:#E1E4E8\"> { getPosts } </span><span style=\"color:#F97583\">from</span><span style=\"color:#9ECBFF\"> \"../lib/beehiiv\"</span><span style=\"color:#E1E4E8\">;   </span><span style=\"color:#6A737D\">// Daten serverseitig</span></span>\n<span class=\"line\"><span style=\"color:#F97583\">const</span><span style=\"color:#79B8FF\"> posts</span><span style=\"color:#F97583\"> =</span><span style=\"color:#F97583\"> await</span><span style=\"color:#B392F0\"> getPosts</span><span style=\"color:#E1E4E8\">({ limit: </span><span style=\"color:#79B8FF\">3</span><span style=\"color:#E1E4E8\"> });  </span><span style=\"color:#6A737D\">// beehiiv nur hier, nie im Client</span></span>\n<span class=\"line\"><span style=\"color:#6A737D\">---</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">&#x3C;</span><span style=\"color:#79B8FF\">Layout</span><span style=\"color:#B392F0\"> title</span><span style=\"color:#E1E4E8\">=</span><span style=\"color:#9ECBFF\">\"… — Bits&#x26;Satoshis\"</span><span style=\"color:#B392F0\"> description</span><span style=\"color:#E1E4E8\">=</span><span style=\"color:#9ECBFF\">\"…\"</span><span style=\"color:#E1E4E8\">></span></span>\n<span class=\"line\"><span style=\"color:#6A737D\">  &#x3C;!-- Inhalt --></span></span>\n<span class=\"line\"><span style=\"color:#6A737D\">  &#x3C;!-- Seite endet mit &#x3C;SignupForm /> CTA --></span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">&#x3C;/</span><span style=\"color:#79B8FF\">Layout</span><span style=\"color:#E1E4E8\">></span></span></code></pre>\n<h2 id=\"regeln\">Regeln</h2>\n<ol>\n<li>Immer in <code>Layout.astro</code> rendern, mit sinnvollem <code>title</code> + <code>description</code>.</li>\n<li>beehiiv-Daten <strong>nur</strong> über <code>src/lib/beehiiv.ts</code> holen (nie direkt fetchen).</li>\n<li>Jede inhaltliche Seite endet mit einem Signup-CTA (<code>&#x3C;SignupForm /></code> oder ein\neingebetteter CTA-Block wie auf der Einzel-Ausgabe).</li>\n<li>Texte deutsch, Ton ruhig/klar (siehe root-CLAUDE.md Positionierung).</li>\n<li>404 für nicht gefundene dynamische Inhalte:\n<code>return new Response(null, { status: 404 });</code></li>\n<li>Neue Seite anlegen? Nutze das Skill <code>/neue-seite</code>.</li>\n</ol>";

				const frontmatter = {};
				const file = "C:/Users/vince/dev/bitsandsatoshis/src/pages/CLAUDE.md";
				const url = "/CLAUDE";
				function rawContent() {
					return "# src/pages/\n\n## Zweck\nDatei-basiertes Routing. Jede `.astro`-Datei = eine URL. Alles läuft **SSR**\n(`output: 'server'`), Daten werden im Frontmatter serverseitig geholt.\n\n## Routen\n```\nindex.astro            → /            Hero + Signup + letzte 3 Ausgaben\narchiv.astro           → /archiv      Alle Ausgaben (Karten-Grid)\nnewsletter/[slug].astro→ /newsletter/:slug   Einzel-Ausgabe (eigener CLAUDE.md)\nueber.astro            → /ueber       Über Vincent + Mission\nimpressum.astro        → /impressum   DSGVO-Platzhalter\ndatenschutz.astro      → /datenschutz DSGVO-Platzhalter\n```\n\n## Muster für jede Seite\n```astro\n---\nimport Layout from \"../layouts/Layout.astro\";\nimport { getPosts } from \"../lib/beehiiv\";   // Daten serverseitig\nconst posts = await getPosts({ limit: 3 });  // beehiiv nur hier, nie im Client\n---\n<Layout title=\"… — Bits&Satoshis\" description=\"…\">\n  <!-- Inhalt -->\n  <!-- Seite endet mit <SignupForm /> CTA -->\n</Layout>\n```\n\n## Regeln\n1. Immer in `Layout.astro` rendern, mit sinnvollem `title` + `description`.\n2. beehiiv-Daten **nur** über `src/lib/beehiiv.ts` holen (nie direkt fetchen).\n3. Jede inhaltliche Seite endet mit einem Signup-CTA (`<SignupForm />` oder ein\n   eingebetteter CTA-Block wie auf der Einzel-Ausgabe).\n4. Texte deutsch, Ton ruhig/klar (siehe root-CLAUDE.md Positionierung).\n5. 404 für nicht gefundene dynamische Inhalte:\n   `return new Response(null, { status: 404 });`\n6. Neue Seite anlegen? Nutze das Skill `/neue-seite`.\n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [{"depth":1,"slug":"srcpages","text":"src/pages/"},{"depth":2,"slug":"zweck","text":"Zweck"},{"depth":2,"slug":"routen","text":"Routen"},{"depth":2,"slug":"muster-für-jede-seite","text":"Muster für jede Seite"},{"depth":2,"slug":"regeln","text":"Regeln"}];
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
