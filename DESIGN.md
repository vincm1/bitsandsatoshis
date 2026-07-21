# Bits&Satoshis — Design-, Copy- und SEO-Spezifikation

**Verbindliche Entscheidungsgrundlage für bitsandsatoshis.com.**

Wenn im Code etwas von dieser Datei abweicht, ist der Code falsch.
Wenn eine Frage hier nicht beantwortet ist, gilt die Regel aus Abschnitt 11.

---

## 1. Kontext und Ziel

**Produkt:** Bits&Satoshis, deutschsprachiger Bitcoin-Newsletter, eine Ausgabe
pro Woche, freitags.

**Autor:** Vincent Michler. Eine Person, kein Team. Auf der gesamten Seite gilt
die Ich-Form.

**Einziges Ziel der Website:** Besucher gibt seine E-Mail-Adresse ein.

Es gibt keine sekundären Ziele. Keine Verweildauer, keine Seitenaufrufe, keine
Social-Follows. Jede Designentscheidung wird daran gemessen, ob sie diese eine
Konversion wahrscheinlicher macht.

**Zielgruppe:** Deutschsprachige Erwachsene, 28 bis 45, die Bitcoin bereits
besitzen oder kurz davor stehen. Sie haben die Grundlagen und suchen
Einordnung, nicht Erklärung. Sie lesen lieber, als Videos zu schauen. Ihr
Interesse ist ökonomisch, nicht technisch.

**Nicht die Zielgruppe:** Trader, Altcoin-Interessierte, komplette Neulinge.

**Positionierung in einem Satz:** Blocktrainer erklärt, Bits&Satoshis bewertet.

**Langfristig:** Der thematische Schwerpunkt verschiebt sich über Jahre von
Bitcoin zu Geldsystem und Geldpolitik. Die Seite muss das aushalten, ohne
umgebaut zu werden. Deshalb heißt es überall „Bitcoin, Geld und Politik",
nicht nur „Bitcoin".

---

## 2. Design-Tokens

Diese Werte sind gesetzt und werden nicht ergänzt.

| Token | Hex | Verwendung |
|---|---|---|
| Paper | `#F4EDE0` | Seitenhintergrund, immer |
| Ink | `#221A0F` | Fließtext, Überschriften, Rahmen von Eingabefeldern, Fokus-Ring |
| Orange | `#E8832A` | Ausschließlich Button-Hintergrund |
| Stone | `#5C4F3A` | Sekundärtext, Metadaten, Bildunterschriften, Platzhaltertext |
| Dust | `#A89880` | Trennlinien |

Kontrast auf Paper, gemessen: Ink 14,8:1 · Stone 6,9:1 · Orange 2,3:1 ·
Dust 2,4:1. Die Zuordnung oben folgt daraus, nicht dem Geschmack.

### Tailwind-Konfiguration

Tailwind v4 wird **CSS-first** konfiguriert. Es gibt **keine**
`tailwind.config.mjs`. Alle Tokens leben in `src/styles/global.css`:

```css
@theme {
  --font-display: 'Cabinet Grotesk', sans-serif;
  --font-sans:    'Satoshi Variable', system-ui, sans-serif;
  --font-mono:    'IBM Plex Mono', monospace;
}

:root {
  --c-paper:  #F4EDE0;
  --c-ink:    #221A0F;
  --c-orange: #E8832A;
  --c-stone:  #5C4F3A;
  --c-dust:   #A89880;

  --sp-1: 8px;  --sp-2: 16px;  --sp-3: 24px;  --sp-4: 40px;  --sp-5: 64px;
  --measure: 620px;
}
```

`border-radius` wird global auf `0` gesetzt (DaisyUI: `--radius-selector`,
`--radius-field`, `--radius-box` alle `0rem`). Es gibt keine Ausnahme, auch
nicht für Buttons, Eingabefelder oder Bilder.

### Orange-Budget

**Maximal zwei orange UI-Elemente pro Seite.** Das sind die beiden
Anmelde-Buttons. Sonst nichts.

Kein oranger Link, kein oranger Unterstrich, kein oranges Icon, kein oranger
Hover-State auf Text, kein oranger Border-Akzent. Wenn Orange irgendwo außer
auf einem Button-Hintergrund auftaucht, ist es ein Fehler.

Auf Unterseiten mit nur einem Formular gilt entsprechend: ein oranges Element.

> **Dokumentierte Ausnahmen** (zählen nicht gegen das Budget):
>
> 1. ~~der Fokus-Ring~~ — **entfallen (Juli 2026).** Der Ring ist jetzt Ink.
>    Orange auf Paper sind 2,3:1 und verfehlen die 3:1, die WCAG 1.4.11 für
>    Nicht-Text-Kontraste verlangt; als Barrierefreiheits-Element war er damit
>    genau dort wirkungslos, wo er gebraucht wird. Ink liefert 14,8:1;
> 2. das Wort „Bitcoin" im Hero-H1 der Startseite — Markenzeichen-Akzent,
>    genau einmal, nie auf Unterseiten;
> 3. die Angebotskurve im Hero — Datengrafik nach §5, Orange ist dort
>    Datenfarbe, nicht UI-Farbe;
> 4. das Logo-Emblem in Header und Foto-Ring — Bestandteil der Assets.
>
> Alles darüber hinaus bleibt ein Fehler. Neue Ausnahmen werden hier
> eingetragen, nicht stillschweigend eingeführt.

> **Konsequenz für den Header:** Der „Abonnieren"-Link im Header ist ein
> Textlink in Stone-Mono, kein Button. Sonst wäre er ein drittes oranges
> Element.

### Farbverwendung, konkret

- **Fließtext ist immer Ink, nie Stone.** Stone bei 15px über mehrere Absätze
  ermüdet und liegt beim Kontrast grenzwertig.
- **Stone ist für Metadaten:** Datum, Lesezeit, Eyebrow-Labels, Microcopy
  unter dem Button, Untertitel in Ausgabenlisten.
- **Dust ist ausschließlich Linie.** Nie Text, den jemand lesen soll — auch
  kein Placeholder. Dust auf Paper sind 2,4:1; im Signup-Feld war der
  Placeholder der einzige sichtbare Hinweis, weil das `<label>` `sr-only`
  ist. Placeholder sind deshalb Stone (6,9:1), siehe §6.2.
- **Textlinks haben genau eine Affordanz:** Unterstrich in Dust
  (`text-underline-offset: 3px`), beim Hover wird der Unterstrich Ink.
  Gilt überall — Header, Footer, Listen-Titel, Fließtext-Links. Keine
  animierten Linien, keine Farbwechsel des Textes selbst.
- **Kein Dark Mode.** Paper ist die Identität. Ein dunkler Modus verdoppelt
  den Aufwand und macht die Seite optisch zu einer weiteren Krypto-Seite.
  Keine `@media (prefers-color-scheme: dark)`-Blöcke, kein Theme-Toggle.

---

## 3. Typografie

### Rollen

| Rolle | Schrift | Größe | Zeilenhöhe | Einsatz |
|---|---|---|---|---|
| H1 (Startseite) | Display | clamp 34–68px | 1.08 | Display-Größe im Hero, siehe Anmerkung |
| H1 (Unterseiten) | Display | 38–44px (mobil 30–34px) | 1.12 | Genau einmal pro Seite |
| H2 | Display | 24–32px | 1.2 | Sektionsüberschriften, siehe Anmerkung |
| H3 | Display | 17–19px | 1.3 | Ausgabentitel in Listen |
| Fließtext | Satoshi Variable | 15–16px | 1.65 | Alles, was ein Satz ist |
| Pullquote | Satoshi Variable 500 | 22–28px | 1.4 | Stimmprobe (§6.4a), nur dort |
| Meta | IBM Plex Mono | 11–12px | 1.4 | Datum, Label, Lesezeit, Microcopy |

> **Welche Display-Schrift?** In Produktion läuft **Cabinet Grotesk 700**
> (`astro.config.mjs`). Chaney, das diese Datei früher überall nannte, ist
> lizenzrechtlich nicht als Webfont verfügbar (Atipo-Desktop-Lizenz) und
> wurde ersetzt, ohne dass die Ersatzwahl je als Markenentscheidung getroffen
> wurde. Damit steht die Referenz aus PRODUCT.md („ultra-bold Chaney display
> type") ohne Träger da. **Offene Entscheidung**, siehe §13.

> **Anmerkung zur Startseiten-H1** (Juli 2026): Die Markenreferenz in
> PRODUCT.md (ultra-bold Display auf Paper) verlangt mehr typografische
> Conviction, als die 44px-Deckelung hergab — „Calm is not timid". Die
> Hero-H1 läuft deshalb auf `clamp(34px, 6vw, 68px)` (`.h1-hero` in
> `global.css`). Das clamp-Minimum 34px hält die §12-Regel ein: Formular
> über der Falte bei 375px. Unterseiten bleiben bewusst bei 38–44px.

> **Anmerkung zur H2** (Juli 2026): vorher 22–24px. Zwischen der Hero-H1
> (68px) und dem Fließtext (15px) lag damit keine mittlere Stufe — die Seite
> fiel nach dem Hero typografisch in sich zusammen und landete genau in der
> Anti-Referenz aus PRODUCT.md („warm-restrained, forgettably competent").
> 24–32px füllt die Lücke. Ruhe entsteht laut PRODUCT.md aus Abstand und
> Tempo, nicht aus kleiner Schrift.

### Regeln

- **Display nie unter 17px.** Display-Schriften brechen bei kleinen Graden weg.
- **Display nie für Fließtext.** Maximal eine Zeile am Stück. Deshalb ist die
  Pullquote (§6.4a) Satoshi 500 und nicht Display: ein mehrzeiliges Zitat ist
  keine Überschrift.
- **Mono nie für Prosa.** Nur Daten und Etiketten. Mono für einen ganzen Absatz
  lässt die Seite technisch statt editorial wirken. Das ist der wichtigste
  einzelne Hebel, damit die Seite nach Publikation und nicht nach Krypto-Tool
  aussieht.
- **Nur zwei Gewichte in Satoshi:** 400 für Text, 500 für Button-Labels und
  Hervorhebungen. Kein 600, kein 700.
- **Satzbau in Überschriften:** normale Groß- und Kleinschreibung. Kein
  Versalsatz, kein Title Case.
- **Kein Gedankenstrich (Em-Dash) in der gesamten Copy.** Punkt oder Komma.
- **Mono-Labels** bekommen `letter-spacing: 0.04em`.

### Schrift-Einbindung

Alle Schriften werden **von der eigenen Domain** ausgeliefert, nicht über
einen externen Dienst. Gründe: Ladezeit, keine Drittanbieter-Requests, DSGVO.

```css
@font-face {
  font-family: 'Satoshi Variable';
  src: url('/fonts/Satoshi-Variable.woff2') format('woff2-variations');
  font-weight: 300 900;
  font-display: swap;
}
```

Alle drei Schriften mit `<link rel="preload">` im `<head>`.

> **Erledigt (Juli 2026).** Hier stand ein offener Punkt, dass Schriften über
> die Fontshare-CDN liefen. Das ist überholt: Die Fonts laufen über die
> Astro-Fonts-API (`fonts:` in `astro.config.mjs`), die sie zur Build-Zeit
> herunterlädt und mit Hash-Namen von der eigenen Domain ausliefert. Live
> gemessen: kein Request an Fontshare, Google oder ein anderes CDN.

---

## 4. Layout

- **Eine Spalte. Linksbündig. Nicht zentriert.** Zentrierte Hero-Blöcke sind
  das visuelle Signal für Marketingseite, linksbündiger Satz das Signal für
  Text, der gelesen werden will.
- **Satzbreite maximal 620px.** Auch auf großen Bildschirmen. Längere Zeilen
  werden nicht gelesen.
  > **Dokumentierte Ausnahme:** Ausgabenseiten (`/newsletter/[slug]`) setzen
  > auf 720px. Die Ausgaben sind lange Lesetexte, die 620px wirkten dort
  > abgeschnitten. 720px bleibt bei 16px Fließtext unter der Grenze von
  > ~75 Zeichen pro Zeile. Alle anderen Seiten bleiben bei 620px.
- **Seitenrand:** 32px Desktop, 20px Mobil.
- **Kein Grid mit Karten.** Trennung durch Haarlinien in Dust, 1px. Bei 0px
  Radius sehen Karten wie Boxen aus und Boxen sehen wie ein Dashboard aus.
  Linien sehen wie eine Zeitungsseite aus.
- **Ressortgrenzen-Muster (festgehalten Juli 2026):** Jede Sektion nach dem
  Hero beginnt mit einer Haarlinie über den vollen Container, dann 24px bis
  zum Sektionskopf (Eyebrow oder H2), und endet mit 64px. Zwei Ausnahmen:
  die Ausgabenliste führt ihre Linie als Zeitungs-Ressortkopf unter dem
  Eyebrow, die Pullquote (§6.4a) rahmt sich selbst mit Linien oben und
  unten und bekommt keine zusätzliche Sektionslinie.

### Abstandsraster

Nur diese Werte: **8 / 16 / 24 / 40 / 64.**

Bei einem so reduzierten Design trägt Weißraum die gesamte Gestaltung, weil
sonst nichts da ist. Ein inkonsistentes Raster ist der Unterschied zwischen
„gesetzt" und „selbst zusammengeschoben".

| Wert | Einsatz |
|---|---|
| 8 | innerhalb einer Textgruppe (Datum zu Titel) |
| 16 | zwischen zusammengehörigen Elementen |
| 24 | zwischen Textblöcken |
| 40 | innerhalb einer Sektion |
| 64 | zwischen Sektionen |

### Mobil

Single-Column ist bereits responsiv. Die einzige echte Anforderung: **Das
Anmeldeformular muss bei 375px Breite ohne Scrollen sichtbar sein.** Das
begrenzt H1 auf maximal zwei Zeilen und die Subline auf maximal drei. Alles,
was zusätzlich in den Hero soll, konkurriert mit dieser Regel und verliert.

Auf Mobil steht der Button unter dem Eingabefeld, nicht daneben.

---

## 5. Bildregeln

**Keine Bilder.** Kein Unsplash, kein Stockfoto, keine Illustration, keine
Icons, keine dekorativen Grafiken.

Genau drei Ausnahmen:

1. Ein echtes Foto von Vincent im Autoren-Block
2. Die Canva-Banner als `og:image` pro Ausgabe (nicht auf der Seite selbst)
3. Selbst gebaute Datengrafiken in Ausgaben, wenn sie einen Sachverhalt zeigen

Eine Seite ohne Bilder wirkt in dieser Kategorie souverän, nicht arm.
Stockfotografie ist der schnellste Weg, generisch auszusehen.

---

## 6. Startseite

Acht Sektionen in dieser Reihenfolge. Nicht mehr.

### 6.1 Header

Logo-Wortmarke links (Display, 15px, Ink). Rechts ein einziges Element:
„Abonnieren" (Mono, 12px, Stone), Ankerlink auf das Hero-Formular.

**Keine Navigation.** Wer schon Leser ist, kommt über die E-Mail, nicht über
die Seite.

Darunter Haarlinie in Dust.

### 6.2 Hero

Eyebrow (Mono, 12px, Stone):

```
Bitcoin, Geld und Politik · jeden Freitag
```

H1 (Display, Umbruch gesetzt, „Bitcoin" in Orange als dokumentierte
Markenzeichen-Ausnahme, siehe §2):

```
Bitcoin besitzen ist einfach.
Verstehen nicht.
```

Byline (Mono, 12px, Stone), direkt unter der H1 — macht das „Ich" der
Subline zum benannten Absender, bevor der Autor-Block (§6.4) vertieft:

```
Von Vincent Michler
```

Subline (Satoshi, 15px, Ink, max 480px). Sie trägt die Value Proposition:
Zielgruppe (hat sich mit Bitcoin beschäftigt, will jetzt in die Tiefe),
Ergebnis („was es bedeutet") und Differenzierung („mit klarer Meinung"),
nicht den Prozess:

```
Du weißt, was Bitcoin ist. Jetzt willst du wissen, was es bedeutet.
Jeden Freitag ein Thema, zu Ende gedacht, mit klarer Meinung.
```

Rechts neben dem Textblock (ab `lg`, darunter gestapelt nach dem Formular):
die interaktive Angebotskurve (`Angebotskurve.vue`) — die einzige Grafik der
Marke, Datengrafik nach §5.

Formular: ein Feld, Placeholder `deine@email.de` in **Stone**, Rahmen 1px Ink.
Feldschrift 16px. Button direkt anschließend ohne Lücke, Hintergrund Orange,
**Text Ink**, Gewicht 500.

> **Korrektur (Juli 2026).** Hier stand zwischenzeitlich „Text Weiß" mit der
> Begründung, das sei eine bewusste Entscheidung — angeführt mit genau den
> Zahlen, die dagegen sprechen: Weiß auf Orange 2,7:1, Ink 6,3:1, WCAG AA
> verlangt 4,5:1. Die Spec war damit an einen Fehler im Code angepasst worden,
> statt umgekehrt. Verbindlich ist Ink.
>
> Aus demselben Grund ist der Placeholder Stone (6,9:1) und nicht Dust
> (2,4:1). Dust bleibt Linienfarbe; als Placeholder war es der einzige
> sichtbare Feldhinweis, weil das `<label>` `sr-only` ist.
>
> 16px statt 15px: iOS Safari zoomt beim Fokus in jedes Feld unter 16px
> hinein und reißt damit ausgerechnet am Konversionspunkt das Layout auf.
>
> Wer das ändert, ändert es hier und in `SignupIsland.vue` zugleich.

Button-Label:

```
Freitags lesen
```

Nicht „Jetzt kostenlos abonnieren". Das beschreibt eine Transaktion.
„Freitags lesen" beschreibt ein Ergebnis und konvertiert besser, weil es keine
Verpflichtung suggeriert.

Microcopy (Mono, 11px, Stone):

```
Kostenlos · eine Mail pro Woche · Abmelden mit einem Klick
```

> **Anmerkung (Juli 2026):** „Kostenlos" ersetzt „4 Minuten" — Risikoabbau
> gehört an den Entscheidungspunkt. Die Lesezeit steht jetzt im
> Format-Vertrag am zweiten CTA (§6.6), keine Dopplung.

**Keine Abonnentenzahl.** Nirgends auf der Seite. Die Abwesenheit einer Zahl
fällt niemandem auf, eine falsche Zahl kostet alles.

### 6.3 Die letzten drei Ausgaben

Überschrift als **H2** (Display, 24–32px, Ink): `Die letzten drei Ausgaben`,
darunter die Haarlinie als Ressortkopf (§4).

> **Korrektur (Juli 2026):** Hier stand „Eyebrow (Mono, 12px, Stone)". Als
> 12px-Label war die Sektionsüberschrift kleiner und leiser als die
> 19px-Ausgabentitel, die sie überschreibt — Sehende bekamen damit eine
> andere Gliederung als Screenreader-Nutzer, für die das Element seit jeher
> ein `<h2>` war. Sektionsköpfe sehen jetzt überall gleich aus.

Drei Einträge untereinander, getrennt durch Haarlinien in Dust. Kein Grid,
keine Karten.

Pro Eintrag:

- Datum + Lesezeit (Mono, 11px, Stone), z.B. `17. Juli 2026 · 4 Min.` —
  die Lesezeit kommt aus dem RSS-Inhalt (`getPosts({ withContent: true })`,
  nur Startseite; das Archiv bleibt ohne, dort entfällt die Angabe)
- Titel (Display, 17px, Ink), verlinkt auf `/p/slug`
- Untertitel (Satoshi, 14px, Stone)

Wird aus der beehiiv-API gezogen, nicht hartkodiert.

Diese Sektion **ersetzt Testimonials**. Sie ist überprüfbarer Beweis statt
Behauptung: der Besucher kann klicken und selbst urteilen.

**Sektionsfuß (ergänzt Juli 2026):**

1. Themenzeile (Mono-Meta, 16px unter der Liste): `Bisher: Geldpolitik ·
   Steuern · ETFs · …` — nur echte Themenfelder aus veröffentlichten
   Ausgaben, gepflegt als Konstante in `index.astro`. Beantwortet die stille
   Frage, ob dem Newsletter der Stoff ausgeht.
2. Navigationsgruppe (24px darunter): kuratierter Einstiegslink „Neu hier?
   Lies zuerst …" (Prosa, Link mit Dust-Unterstrich) und mit 8px Abstand der
   Link „Alle Ausgaben". Der Einstiegslink zeigt auf eine redaktionell
   gewählte, repräsentative Ausgabe (`FEATURED_ISSUE` in `index.astro`) und
   wird getauscht wie das Zitat in §6.4a.

### 6.4 Autor

Portrait links (kreisförmig ist hier erlaubt, weil es kein UI-Element ist),
Text rechts. Auf Mobil untereinander.

```
Ich bin Vincent. Ich habe angefangen zu schreiben, weil ich Bitcoin verstehen
wollte und fast alles auf Deutsch entweder Verkauf oder Video war. Jetzt
schreibe ich, was ich damals lesen wollen hätte.
```

Drei Sätze. Kein Lebenslauf, keine Qualifikationsbehauptung.

### 6.4a Stimmprobe

Ein kuratiertes, wörtliches Zitat aus einer veröffentlichten Ausgabe
(`PullQuote.astro`), gerahmt von zwei Haarlinien in Dust — dieselbe
Pullquote-Form wie auf den Ausgabenseiten (§7). Darunter die Quellzeile in
Mono mit Link auf die Ausgabe (Dust-Unterstrich, Hover Ink).

Zweck: überprüfbare Stimme statt Behauptung, wie die Ausgabenliste. Der
Besucher liest einen echten Satz und kann zur Quelle klicken. Genau ein
Zitat, hartkodiert und redaktionell gewählt; es wird getauscht, wenn eine
Ausgabe einen besseren Satz liefert. Kein Karussell, kein Zufall.

Aktuelles Zitat (aus „Gold vs. Bitcoin", `/p/gold-vs-bitcoin-2026`):

```
Bitcoin wirkt von außen chaotisch. Das Chaos arbeitet mehrheitlich in die
richtige Richtung.
```

### 6.5 Bevor du dich einträgst

Sechs Frage-Antwort-Paare (`BeforeSignup.astro`), Überschrift „Bevor du dich
einträgst" (Display, H2). Ersetzt die frühere Liste „Was das hier nicht ist"
(Juli 2026): dieselbe Funktion, aber als Stimme statt als Aufzählung.

**Form: Zeitungs-Ledger.** Ab `sm` steht die Frage links in einer festen
schmalen Spalte (Display, 17px, Ink), die Antwort rechts (Satoshi, 15px, Ink).
Haarlinien in Dust trennen die Paare und laufen über beide Spalten. Unter
`sm` gestapelt. Gesamtbreite innerhalb der 620px-Satzbreite (§4). Keine
Karten, keine Icons, kein Accordion: alle Antworten stehen offen da.

Copy (verbindlich; kein „wir", kein Em-Dash, Ich-Form):

```
Soll ich jetzt kaufen?            Weiß ich nicht. Niemand weiß es. Wer es
                                  dir verkauft, verkauft dir etwas.
Wo steht der Kurs Ende des        Weiß ich nicht. Steht hier auch nie.
Jahres?
Welcher Coin ist der nächste      Keiner. Hier gibt es nur Bitcoin.
Bitcoin?
Verdienst du daran, wenn ich      Wenn ich an einer Empfehlung verdiene,
kaufe?                            steht es dabei. Versteckt läuft hier
                                  nichts.
Wie oft schreibst du?             Freitags. Eine Mail, vier Minuten.
                                  Mehr nicht.
Ist es zu spät?                   Falsche Frage. Genau darüber schreibe ich.
```

Diese Sektion ist die **Churn-Bremse**. Sie hält die falschen Abonnenten ab.
Ein Abonnent, der nicht kommt, kostet nichts. Einer, der kommt und wieder
geht, kostet Zustellbarkeit. Das Frequenz-Paar („Wie oft schreibst du?")
übernimmt die frühere Zeile „Keine tägliche Mail".

### 6.6 Zweiter CTA

Überschrift (Display, H2):

```
Nächste Ausgabe: Freitag.
```

Darunter identisches Formular, identisches Button-Label, identische Microcopy.
Kein neuer Verkaufstext.

**Format-Vertrag (ergänzt Juli 2026):** Zwischen Überschrift und Formular
eine Mono-Meta-Zeile, die das Versprechen scanbar macht:

```
Ein Thema · 4 Minuten · keine Kursprognosen · kostenlos
```

Das ist kein Verkaufstext, sondern die Vertragsbedingungen in Kurzform —
dieselbe Funktion wie die Microcopy, eine Ebene konkreter.

### 6.7 Footer

Archiv · Über mich · Impressum · Datenschutz · Kontakt. Social-Links optional,
klein, Stone.

Darunter (ergänzt Juli 2026) eine zweite Zeile mit Eyebrow „Wissen" und den
fünf Wissensseiten (§7) — der Footer ist ihr einziger fester Link-Ort, damit
die Startseite auf ihr eines Ziel fokussiert bleibt.

Disclaimer (keine Anlageberatung) in Mono, 11px.

---

## 7. Weitere Seiten

### `/p/[slug]` — Ausgaben

**Verifiziert:** Die Live-Seite nutzt `/p/`, zum Beispiel
`/p/gold-vs-bitcoin-2026`, `/p/deutschland-will-geduld-besteuern`. Diese Slugs
sind indexiert und in versendeten E-Mails verlinkt und müssen **exakt erhalten
bleiben**.

Aufbau: Back-Link „← Alle Ausgaben" (Mono), Datum + Lesezeit (Mono), Titel
(Display), Untertitel, Haarlinie, Fließtext, danach das Formular, danach drei
Links auf verwandte Ausgaben („Weiterlesen", `IssueRow`-Liste). Lesebreite
720px (dokumentierte Ausnahme, §4).

Der Prose-Content aus der API kommt mit beehiiv-eigenem Markup und wird
zweistufig normalisiert (**umgesetzt Juli 2026**):

1. **Pipeline** (`src/lib/beehiiv.ts`): strippt Scripts/Styles, alle
   `style`/`class`-Attribute, leere Elemente sowie das führende
   E-Mail-Banner-Bild (der Titel steht auf der Website schon im Seitenkopf).
2. **`.article-prose`-Styles** (`[slug].astro`) wenden die Tokens aus §2/§3
   auf das rohe Markup an:
   - Fließtext Ink 16px, `b`/`strong` in Gewicht 500
   - Links mit Dust-Unterstrich, Fußnoten-Verweise (`a > sup`) als Mono-Ziffer
   - Blockquote als Pullquote mit Haarlinien oben/unten, kein Farbstreifen
   - Bilder mit 1px-Dust-Haarlinie und 8px-Passepartout, beehiiv-Captions
     (`img + div`) als Mono-Meta
   - Datentabellen (`table:has(th)`) mit Dust-Haarlinien; Layout-Tabellen
     ohne `th` (Autoren-Signatur) randlos und kompakt
   - `<sub>`-Disclaimer und Fußnoten-Definitionen als Kleingedrucktes
     (12px, Stone)

### Wissensseiten

Bestehende URLs 1:1 übernehmen:

```
/was-ist-bitcoin
/bitcoin-vs-gold
/bitcoin-mythen
/bitcoin-kaufen
/bitcoin-verwahren
```

Als Markdown-Dateien in `src/content/`. Rolle: **Eingänge, keine Durchgänge.**
Ein Besucher soll dort konvertieren, nicht zur Startseite weiterklicken.

Pro Seite: mindestens 1.500 Wörter, ein klarer Standpunkt statt neutraler
Erklärung, das Formular nach dem ersten Drittel und am Ende, drei interne
Links auf passende Ausgaben.

Die internen Links von Wissensseiten auf Ausgaben sind wichtig. Sie geben den
Ausgaben Autorität und halten Leser im System.

### `/archiv`

Alle Ausgaben, chronologisch, gleiche Listendarstellung wie Sektion 6.3. Kein
Filter, keine Suche, keine Tags. Am Ende das Formular.

### `/ueber-mich`

Längere Fassung des Autoren-Absatzes. Warum es den Newsletter gibt, was er
nicht ist, wie man Vincent erreicht. Erste Person. Formular am Ende.

---

## 8. SEO

### Grundannahme

Die Seite hatte in zwölf Monaten zwei organische Google-Besucher. SEO ist hier
kein Optimierungs-, sondern ein Aufbauprojekt und der langsamste verfügbare
Hebel. **Einmal richtig aufsetzen, dann laufen lassen. Nicht zum Projekt
machen.**

### Welche Suchanfragen

**Nicht anvisieren:** „was ist bitcoin", „bitcoin kaufen", „bitcoin kurs".
Dominiert von Blocktrainer, Coinbase, BISON, jeder Börse mit Budget. Und wer
„bitcoin kurs" sucht, will keinen Newsletter über Geldpolitik.

**Anvisieren:** Anfragen, bei denen jemand bereits verstehen will und keine
gute deutschsprachige Antwort findet.

```
bitcoin steuer haltefrist 2026
stock to flow modell kritik
ist bitcoin volatiler als gold
warum kein altcoin statt bitcoin
bitcoin gegen inflation sinnvoll
```

Wenig Volumen, kaum Wettbewerb, und der Suchende ist bereits in der
Zielgruppe. Fünfzig solcher Besucher im Monat mit 20 Prozent Konversion sind
mehr wert als fünftausend auf „bitcoin kurs" mit null.

### Titel und Slug trennen

Der E-Mail-Betreff und der Suchbegriff sind zwei verschiedene Dinge. Astro
erlaubt die Trennung, beehiiv nicht.

| Feld | Beispiel |
|---|---|
| H1 auf der Seite | Deutschland will Geduld besteuern |
| Slug | `/p/bitcoin-haltefrist-steuer-2026` |
| `<title>` | Bitcoin-Haltefrist und die geplante Steuer 2026 |
| Meta-Description | Der Untertitel der Ausgabe |

**Achtung:** Für bereits veröffentlichte Ausgaben bleibt der bestehende Slug.
Die Trennung gilt ab jetzt für neue.

### Technische Checkliste

- [x] Sitemap selbst gebaut (`/sitemap.xml`, `src/pages/sitemap.xml.ts`)
- [x] RSS-Feed selbst gebaut (`/rss.xml`), beehiiv liefert ihn nicht mehr
- [x] JSON-LD: `Article` auf jeder Ausgabe, `WebSite` global,
      `ProfilePage` auf `/ueber`
- [x] `og:image` pro Ausgabe (beehiiv-Thumbnail, dort landen die Canva-Banner)
- [x] Canonical-Tags auf allen Seiten
- [x] `robots.txt` (verweist auf die Sitemap)
- [ ] Search Console eingerichtet, Sitemap dort eingereicht
- [ ] Alle bestehenden `/p/`-URLs verifiziert erreichbar (Route aktuell
      `/newsletter/`, siehe §13)

---

## 9. Technik

**Stack:** Astro 6 + Tailwind v4 (CSS-first) + DaisyUI v5. beehiiv bleibt für
Abonnentenverwaltung, Versand, Automations und Statistik. Astro übernimmt nur
den Website-Layer.

> **Hosting ist noch nicht entschieden** und deshalb hier bewusst
> nicht spezifiziert. Aktuell läuft das Repo mit `@astrojs/vercel` und
> `output: 'server'`. Alle Regeln unten gelten plattformunabhängig.

### Anmeldeformular

Das Formular (Vue-Island `SignupIsland.vue`) postet per fetch an den
API-Endpoint **`POST /api/subscribe`** (`src/pages/api/subscribe.ts`,
`prerender = false`). Der Endpoint ruft **serverseitig** die beehiiv
Subscriptions-API über `src/lib/beehiiv.ts` auf. Ohne JS greift der native
Form-POST an denselben Endpoint (303 zurück mit `?anmeldung=ok|fehler`).
Der API-Key liegt in Umgebungsvariablen und taucht **nie im Client-Bundle**
auf. `BEEHIIV_*` ohne `PUBLIC_`-Präfix ist nie im Browser sichtbar.
Footer- und CTA-Formulare laufen noch über die Astro Action `subscribe`
(gleicher beehiiv-Client dahinter).

**UTM-Parameter aus der URL mitgeben.** Sonst bricht die Akquise-Statistik in
beehiiv ab, und genau die ist die Datengrundlage für alle Kanalentscheidungen.

**Erfolgsfall:** kein Redirect auf eine Danke-Seite, sondern Inline-Bestätigung
an Ort und Stelle:

```
Fast fertig. Bestätige die Anmeldung in der Mail, die gerade rausgegangen ist.
```

Die Bestätigung **zeigt die eingetragene Adresse** und bietet darunter einen
Rückweg („Nicht deine Adresse?", setzt das Formular zurück). Grund: Bei
Double-Opt-in ist der Tippfehler der größte stille Verlustkanal. Wer
`vincnet@…` einträgt, wartet auf eine Mail, die nie kommt; in beehiiv sieht
das aus wie eine Anmeldung. Ohne Rückweg war die einzige Korrekturmöglichkeit
ein Reload, und der wurde nirgends angeboten.

**Fehlerfall:** benennen, was passiert ist, und was zu tun ist. Kein
„Fehler:"-Präfix, keine Entschuldigung, keine Rohfehler aus der API. Die
Meldung steht in einem Ink-Rahmen wie die Bestätigung — als reiner Fließtext
war sie optisch nicht von Prosa zu unterscheiden und trug ihre Bedeutung
allein in `role="alert"`, also nur für Screenreader.

### Rendering

Hybrid: `astro.config.mjs` steht auf `output: 'static'` + Adapter — das ist
seit Astro 5 das Hybrid-Modell (`output: 'hybrid'` existiert nicht mehr).
Statisch: `/impressum`, `/datenschutz`. SSR (`prerender = false`): `/`,
`/archiv`, `/newsletter/[slug]`, `/ueber`, `/api/subscribe` — damit erscheinen
neue beehiiv-Ausgaben ohne Redeploy. Ausgaben und Archiv sollten mit
Cache-Headern oder ISR ausgeliefert werden, damit nicht jeder Aufruf die
beehiiv-API trifft.

### Domains

`bitsandsatoshis.com` ist kanonisch. `bitsandsatoshis.de` per **301** darauf
weiterleiten.

**Kein Spiegeln.** Beide Domains mit identischem Inhalt erreichbar wäre
Duplicate Content.

### Migrationsreihenfolge

Der Wechsel ist nicht schrittweise möglich, die Domain zeigt entweder auf
beehiiv oder auf die neue Seite. Vor dem DNS-Umzug:

1. Vollständige Seite auf einer Preview-URL gebaut, inklusive Archiv
2. Anmeldung mit echter Adresse getestet, Ankunft in beehiiv und korrektes
   Quellen-Tag geprüft
3. Redirect-Liste gegen die alte beehiiv-Sitemap abgeglichen, jede bestehende
   URL hat eine Route oder einen 301
4. Erst dann DNS umlegen
5. `.de`-Weiterleitung einrichten
6. Sitemap in der Search Console neu einreichen

**Schritt 2 ist der, an dem es üblicherweise klemmt.** Testen, bevor die Domain
umgezogen ist.

### Was beehiiv nicht mehr liefert

RSS-Feed, Sitemap, Impressum, Datenschutz, Cookie-Banner. Alles selbst
nachbauen. **Der RSS-Feed wird am häufigsten vergessen.**

---

## 10. Verbotsliste

Nicht bauen, auch wenn es naheliegt:

- Popup oder Exit-Intent-Overlay
- Zweites Formularfeld (Vorname wird nach der Anmeldung erhoben, nicht davor)
- Abonnentenzahlen, Leserzahlen, „über X Menschen lesen"
- Testimonials, solange keine echten aus der Beta-Kohorte vorliegen
- Stockfotos, Icons, dekorative Illustrationen
- Dark Mode
- Karten mit Rahmen und Schatten
- Mega-Navigation im Header
- Scroll-Animationen, Fade-Ins, Parallax
- CMS-Anbindung
- Cookie-Banner, solange keine Tracking-Cookies gesetzt werden
- Vimi oder ein zweites Produkt auf der Startseite. Der Weg dahin läuft über
  die Willkommensmail, nicht über die Landingpage.
- Das Satoshi-Zitat
- Das Wort „wir" in jeglicher Form

---

## 11. Entscheidungsregel

Für alles, was hier nicht geregelt ist:

> **Wenn du dich fragst, ob etwas rein soll: es soll nicht.**

Die Gefahr bei dieser Seite ist nicht, dass sie zu schlicht wird. Sie ist, dass
sie beim Bauen gefüllt wird. Ein Icon hier, ein Akzent dort, noch eine
Sektion. Jede Ergänzung schwächt das Einzige, was die Seite leisten muss.

---

## 12. Definition of Done

- [ ] Formular über der Falte bei 375px Breite, ohne Scrollen
- [ ] Genau zwei orange Elemente auf der Startseite
- [ ] Keine Zahl über Abonnenten irgendwo im Markup
- [ ] Kein „wir" im gesamten Text
- [ ] Alle bestehenden `/p/`-Slugs erreichbar
- [ ] Anmeldung getestet, Eintrag kommt in beehiiv an, Quelle korrekt getaggt
- [ ] Lighthouse Performance und Accessibility über 95
- [ ] Sichtbarer Fokus-Ring auf allen interaktiven Elementen
- [ ] `prefers-reduced-motion` respektiert (falls überhaupt Motion vorhanden
      ist, siehe Abschnitt 10)
- [ ] RSS-Feed validiert

---

## 13. Abstand zwischen Spec und Code

Aktualisiert Juli 2026. Erledigt und aus der Liste raus: Hero, AuthorCard,
Archiv, Über-Seite, Navbar, Footer, Testimonials (gestrichen), Faq (auf der
Startseite durch die Sektion „Bevor du dich einträgst" ersetzt), Copy-Prüfung
auf Em-Dashes, RSS/Sitemap/JSON-LD/robots.txt (§8), Ausgabenseite
(Prose-Normalisierung, Lesezeit, „Weiterlesen"-Block — §7).

### Struktur

| Punkt | Ist | Soll |
|---|---|---|
| Ausgaben-Route | `/newsletter/[slug]` | `/p/[slug]` (verifiziert live) |
| Über-Seite | `/ueber` | `/ueber-mich` |

Wissensseiten: umgesetzt Juli 2026 — 5 Markdown-Dateien in
`src/content/wissen/`, gerendert über `src/pages/[wissen].astro` (statisch),
verlinkt im Footer, in der Sitemap eingetragen.

### Komponenten

Vier Dateien sind nirgends mehr eingebunden und widersprechen der Spec. Sie
verwirren jeden, der sie als Vorbild liest, und gehören gelöscht:

| Datei | Verstoß |
|---|---|
| `components/PostCard.astro` | Karten-Darstellung (§4). Aktive Form ist `IssueRow.astro` |
| `components/SignupForm.astro` | `rounded-full` + `btn btn-primary` gegen die 0px-Regel (§2). Aktiver Weg ist `SignupIsland.vue` → `/api/subscribe` |
| `components/FooterSignup.vue` | Toast, `animation: spin`, kein `prefers-reduced-motion` (§10) |
| `components/Faq.astro` | ersetzt durch `BeforeSignup.astro` |

Mit `SignupForm.astro` und `FooterSignup.vue` entfällt auch die letzte Nutzung
der Action `actions.subscribe`; `actions.unsubscribe` bleibt aktiv (`/abmelden`).

Impressum und Datenschutz sind inzwischen bereinigt (echte Betreiber-Daten,
kein „wir", Token-basierte Styles) und stehen nicht mehr auf der Liste.

### Schriften

**Der Fontshare-Punkt ist erledigt.** Die Schriften laufen über die
Astro-Fonts-API, die sie zur Build-Zeit herunterlädt und von der eigenen
Domain ausliefert. Live gemessen: kein Request an Fontshare oder Google.

**Offen bleibt die Markenentscheidung.** Chaney existiert lizenzrechtlich nicht
als Webfont; in Produktion läuft Cabinet Grotesk 700. Diese Wahl war ein
Ersatz aus der Not, keine Entscheidung: Die Font-Auswahl für die wichtigste
Schrift der Marke ist nie geführt worden, und die Referenz aus PRODUCT.md
(„ultra-bold Chaney display type filling the viewport", Arnold's Pump Club)
steht damit ohne Träger da. Nebenbefund: Gewicht 800 wird geladen und nirgends
benutzt.

### Sonstiges

| Punkt | Ist | Soll |
|---|---|---|
| Footer-Disclaimer | zwei Zeilen 11px Mono | §3 nennt Mono-Prosa den wichtigsten Hebel gegen den Krypto-Tool-Look, §6.7 verordnet sie trotzdem. Widerspruch auflösen |
| Rasterausreißer | `py-3` (12px) an Input und Button | auf 16px oder in §4 als Ausnahme dokumentieren |
| Mobile Hero-H1 | drei Zeilen bei 375px | §4 erlaubt zwei |
| `@fontsource/ibm-plex-mono` | in `package.json` | wird nicht mehr importiert, kann raus |

---

*Bits&Satoshis · Design-, Copy- und SEO-Spezifikation · 2026*
