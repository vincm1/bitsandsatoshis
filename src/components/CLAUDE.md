# src/components/

## Zweck
Wiederverwendbare UI-Komponenten. **Verbindlich für jede Gestaltungsfrage ist
`/DESIGN.md`** — diese Datei beschreibt nur, was existiert und wie es
zusammenhängt.

## Aktive Komponenten
```
Navbar.vue        ← Header (§6.1): Wortmarke links, ein Textlink „Abonnieren"
                    rechts, Haarlinie darunter. Keine Navigation, kein Orange.
                    SFC ohne client-Direktive: lädt kein Vue in den Browser.
                    Link-Ziel ist /#anmelden (absolut!), siehe unten.
Hero.astro        ← Hero (§6.2): Eyebrow, H1, Byline, Subline, SignupIsland,
                    rechts ab lg die Angebotskurve. Wertet ?anmeldung=ok|fehler
                    aus dem No-JS-Rückläufer aus.
SignupIsland.vue  ← Das Signup-Formular. Vue-Island (client:idle): Submit als
                    fetch an POST /api/subscribe, ohne Reload. Ohne JS greift
                    der native Form-POST an denselben Endpoint.
                    Props: utm / formId / initialError.
SignupSuccess.vue ← Erfolgs-Block nach dem Signup: Statuszeile, Headline,
                    dann drei nummerierte Schritte als Ledger (Mail öffnen,
                    Link klicken, Spam/Werbung prüfen). Eine Datei für zwei
                    Wege — das Island rendert sie hydriert (mit „Nicht deine
                    Adresse?"), Hero.astro im No-JS-Rückläufer als SFC ohne
                    client-Direktive. Props: body / email / showReset.
SignupCta.astro   ← Zweiter CTA (§6.6): H2, optionale Format-Zeile, dieselbe
                    SignupIsland mit eigener formId. Setzt den Anker
                    id="newsletter". Props: title/text/format/anchorId/formId.
IssueList.astro   ← Ausgabenliste für Startseite (§6.3) und Archiv (§7).
                    Überschrift als H2 in .h2, darunter die Haarlinie als
                    Ressortkopf. Bringt bewusst keinen Container mit.
IssueRow.astro    ← Ein Listeneintrag: Datum + Lesezeit (Mono, Stone), Titel
                    (H3, Ink, unterstrichen), Untertitel (Satoshi, Stone).
AuthorCard.astro  ← Autoren-Sektion (§6.4): rundes Portrait links, Text rechts.
                    Prop showLink={false} auf /ueber (kein Selbst-Link).
PullQuote.astro   ← Stimmprobe (§6.4a): echtes Zitat aus einer Ausgabe, von
                    zwei Haarlinien gerahmt, Quelle verlinkt.
ReaderValue.astro ← Leser-Nutzen als Zeitungs-Ledger (Form wie §6.5). Copy
                    kommt als Prop `items` von der Seite: Startseite kurz
                    (nach den Ausgaben), /ueber lang. `accent` färbt die H2
                    orange und ist auf beiden Seiten gesetzt: bewusste
                    Abweichung von §2/§12. Kein Container.
BeforeSignup.astro← „Bevor du dich einträgst" (§6.5): sechs Frage-Antwort-Paare
                    als Zeitungs-Ledger, direkt vor dem zweiten CTA.
Footer.astro      ← Footer (§6.7): Navigation, Rechtliches, Disclaimer.
                    Bewusst ohne Formular (drittes oranges Element).
Angebotskurve.vue ← Die einzige Grafik der Marke (§5). Interaktiver Zeitregler
                    2009–2140, selbst gebaut, ohne Bibliothek.
                    client:visible. role="slider", volle Tastaturbedienung.
```

## Gelöschter Code
`SignupForm.astro`, `FooterSignup.vue`, `PostCard.astro` und `Faq.astro` sind
im Juli 2026 entfernt worden: nirgends mehr eingebunden und im Widerspruch zur
Spec (Karten, `rounded-full`, Toast ohne `prefers-reduced-motion`). Die aktiven
Entsprechungen sind `SignupIsland.vue`, `IssueRow.astro` und
`BeforeSignup.astro`. Wer sie sucht, findet sie in der Git-History.

## Design-Regeln für alle Komponenten
Kurzfassung von `/DESIGN.md` §2–§5. Im Zweifel dort nachsehen.

- **Farben nur über Tokens**, nie hartkodiert: `var(--c-ink)`, `text-ink`,
  `bg-paper`. Fünf Tokens, sie werden nicht ergänzt.
- **Orange ausschließlich als Button-Hintergrund**, maximal zwei pro Seite.
  Kein oranger Link, kein oranger Hover, kein oranger Rahmen. Ausnahmen sind
  in §2 einzeln dokumentiert.
- **Fließtext ist Ink, nie Stone.** Stone ist Metadaten. Dust ist nur Linie.
- **Keine Karten.** Gliederung über Haarlinien (`.rule`) in Dust.
- **Radius 0, keine Schatten, keine Bilder** (drei dokumentierte Ausnahmen in §5).
- **Abstände nur 8/16/24/40/64** (`--sp-1` bis `--sp-5`).
- **Eine Link-Affordanz überall:** Unterstrich in Dust,
  `text-underline-offset: 3px`, Hover macht den Unterstrich Ink.
- **Kein Em-Dash in der Copy.** Punkt oder Komma.
- **Keine Scroll-Animationen, keine Fade-Ins** (§10). Wo Bewegung nötig ist,
  gehört `prefers-reduced-motion` dazu.

## Anker und Signup-Wege
Es gibt **zwei** Formular-Anker, und sie existieren nicht überall:

| Anker | Wo | Gesetzt von |
|---|---|---|
| `#anmelden` | nur `/` | `SignupIsland` im Hero (Default-`formId`) |
| `#newsletter` | überall mit `<SignupCta />` | `SignupCta` (Default-`anchorId`) |

Der Header-Link zeigt deshalb auf **`/#anmelden`** und nicht auf `#anmelden`:
Als reines Fragment war er auf Archiv, Ausgaben, `/ueber`, allen Wissensseiten
und `/abmelden` wirkungslos — also genau dort, wo Besucher aus der Suche
einsteigen. Wer einen neuen CTA einbaut, vergibt eine **eigene `formId`**,
sonst entstehen doppelte Element-IDs auf einer Seite.

Der Signup läuft immer über `SignupIsland.vue` → `POST /api/subscribe` →
`subscribe()` in `src/lib/beehiiv.ts`. Die Action `actions.subscribe` existiert
noch, wird aber nur von totem Code aufgerufen.

## Logo
`public/logo-wordmark.svg` — volle Bild-Wortmarke (B-Icon + „Bits&Satoshis."),
transparent und eng zugeschnitten (viewBox-Ratio ~6:1) aus
`public/logo_hell_svg.svg` abgeleitet: Paper-Hintergrundfläche entfernt, viewBox
auf den Inhalt getrimmt. Wird in `Navbar.vue` (Höhe 32px) und `Footer.astro`
(Höhe 24px) als `<img>` mit `alt="Bits&Satoshis"` gerendert. Bewusste Abweichung
von DESIGN.md §6.1, das die Wortmarke als Display-*Text* vorsieht — der
`alt`-Text hält A11y/SEO. Das orange Icon zählt laut §2 nicht gegen das
Orange-Budget.

`public/logo.svg` (rundes B-Emblem) ist dadurch **unreferenziert**, bleibt aber
im Repo liegen. Quelldateien `logo_hell_svg.svg` / `Logo hell.png` ebenso.

## Neue Komponente?
Nutze das Skill `/neue-komponente`.
