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
| Ink | `#221A0F` | Fließtext, Überschriften, Rahmen von Eingabefeldern |
| Orange | `#E8832A` | Ausschließlich Button-Hintergrund |
| Stone | `#5C4F3A` | Sekundärtext, Metadaten, Bildunterschriften |
| Dust | `#A89880` | Trennlinien, Platzhaltertext in Eingabefeldern |

### Tailwind-Konfiguration

Tailwind v4 wird **CSS-first** konfiguriert. Es gibt **keine**
`tailwind.config.mjs`. Alle Tokens leben in `src/styles/global.css`:

```css
@theme {
  --font-display: 'Chaney', sans-serif;
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
> 1. der Fokus-Ring (`:focus-visible`) — Barrierefreiheit, nicht Gestaltung;
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
- **Dust ist ausschließlich Linie und Placeholder.** Nie Text, den jemand
  lesen soll.
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
| H1 | Chaney | 38–44px (mobil 30–34px) | 1.12 | Genau einmal pro Seite |
| H2 | Chaney | 22–24px | 1.25 | Sektionsüberschriften |
| H3 | Chaney | 17–19px | 1.3 | Ausgabentitel in Listen |
| Fließtext | Satoshi Variable | 15–16px | 1.65 | Alles, was ein Satz ist |
| Meta | IBM Plex Mono | 11–12px | 1.4 | Datum, Label, Lesezeit, Microcopy |

### Regeln

- **Chaney nie unter 17px.** Display-Schriften brechen bei kleinen Graden weg.
- **Chaney nie für Fließtext.** Maximal eine Zeile am Stück.
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

Chaney, Satoshi Variable und IBM Plex Mono werden **lokal als woff2 in
`/public/fonts/`** gehostet, nicht über einen externen Dienst. Gründe:
Ladezeit, keine Drittanbieter-Requests, DSGVO.

```css
@font-face {
  font-family: 'Satoshi Variable';
  src: url('/fonts/Satoshi-Variable.woff2') format('woff2-variations');
  font-weight: 300 900;
  font-display: swap;
}
```

Alle drei Schriften mit `<link rel="preload">` im `<head>`.

> **Offener Punkt:** Aktuell laufen Chaney und Satoshi über die
> Fontshare-CDN, IBM Plex Mono self-hosted über `@fontsource`. Das
> widerspricht dieser Regel. Die woff2-Dateien müssen von Fontshare
> heruntergeladen und nach `/public/fonts/` gelegt werden, danach fällt der
> externe Request weg. Siehe Abschnitt 13.

---

## 4. Layout

- **Eine Spalte. Linksbündig. Nicht zentriert.** Zentrierte Hero-Blöcke sind
  das visuelle Signal für Marketingseite, linksbündiger Satz das Signal für
  Text, der gelesen werden will.
- **Satzbreite maximal 620px.** Auch auf großen Bildschirmen. Längere Zeilen
  werden nicht gelesen.
- **Seitenrand:** 32px Desktop, 20px Mobil.
- **Kein Grid mit Karten.** Trennung durch Haarlinien in Dust, 1px. Bei 0px
  Radius sehen Karten wie Boxen aus und Boxen sehen wie ein Dashboard aus.
  Linien sehen wie eine Zeitungsseite aus.

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

Sieben Sektionen in dieser Reihenfolge. Nicht mehr.

### 6.1 Header

Logo-Wortmarke links (Chaney, 15px, Ink). Rechts ein einziges Element:
„Abonnieren" (Mono, 12px, Stone), Ankerlink auf das Hero-Formular.

**Keine Navigation.** Wer schon Leser ist, kommt über die E-Mail, nicht über
die Seite.

Darunter Haarlinie in Dust.

### 6.2 Hero

Eyebrow (Mono, 12px, Stone):

```
Bitcoin, Geld und Politik · jeden Freitag
```

H1 (Chaney, Umbruch gesetzt, „Bitcoin" in Orange als dokumentierte
Markenzeichen-Ausnahme, siehe §2):

```
Bitcoin besitzen ist einfach.
Verstehen nicht.
```

Subline (Satoshi, 15px, Ink, max 480px):

```
Ein Thema pro Woche, zu Ende gedacht. Ich sage dir, was ich davon
halte, und wo ich mir nicht sicher bin.
```

Rechts neben dem Textblock (ab `lg`, darunter gestapelt nach dem Formular):
die interaktive Angebotskurve (`Angebotskurve.vue`) — die einzige Grafik der
Marke, Datengrafik nach §5.

Formular: ein Feld, Placeholder `deine@email.de`, Rahmen 1px Ink. Button
direkt anschließend ohne Lücke, Hintergrund Orange, **Text Weiß**, Gewicht 500.

> Text Weiß ist eine bewusste Entscheidung gegen die frühere Ink-Vorgabe
> (Kontrast auf Orange: Weiß 2,7:1, Ink 6,3:1 — WCAG AA verlangt 4,5:1).
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
Eine Mail pro Woche · 4 Minuten · Abmelden mit einem Klick
```

**Keine Abonnentenzahl.** Nirgends auf der Seite. Die Abwesenheit einer Zahl
fällt niemandem auf, eine falsche Zahl kostet alles.

### 6.3 Die letzten drei Ausgaben

Eyebrow (Mono, 12px, Stone): `Die letzten drei Ausgaben`

Drei Einträge untereinander, getrennt durch Haarlinien in Dust. Kein Grid,
keine Karten.

Pro Eintrag:

- Datum (Mono, 11px, Stone)
- Titel (Chaney, 17px, Ink), verlinkt auf `/p/slug`
- Untertitel (Satoshi, 14px, Stone)

Wird aus der beehiiv-API gezogen, nicht hartkodiert.

Diese Sektion **ersetzt Testimonials**. Sie ist überprüfbarer Beweis statt
Behauptung: der Besucher kann klicken und selbst urteilen.

### 6.4 Autor

Portrait links (kreisförmig ist hier erlaubt, weil es kein UI-Element ist),
Text rechts. Auf Mobil untereinander.

```
Ich bin Vincent. Ich habe angefangen zu schreiben, weil ich Bitcoin verstehen
wollte und fast alles auf Deutsch entweder Verkauf oder Video war. Jetzt
schreibe ich, was ich damals lesen wollen hätte.
```

Drei Sätze. Kein Lebenslauf, keine Qualifikationsbehauptung.

### 6.5 Was das hier nicht ist

Eyebrow (Mono): `Was das hier nicht ist`

```
Keine Kursprognosen. Keine Altcoins. Keine Trading-Signale.
Kein Sponsoring. Keine tägliche Mail.
```

Diese Sektion ist die **Churn-Bremse**. Sie hält die falschen Abonnenten ab.
Ein Abonnent, der nicht kommt, kostet nichts. Einer, der kommt und wieder
geht, kostet Zustellbarkeit.

### 6.6 Zweiter CTA

Überschrift (Chaney, 22px):

```
Nächste Ausgabe: Freitag.
```

Darunter identisches Formular, identisches Button-Label, identische Microcopy.
Kein neuer Verkaufstext.

### 6.7 Footer

Archiv · Über mich · Impressum · Datenschutz · Kontakt. Social-Links optional,
klein, Stone.

Disclaimer (keine Anlageberatung) in Mono, 11px.

---

## 7. Weitere Seiten

### `/p/[slug]` — Ausgaben

**Verifiziert:** Die Live-Seite nutzt `/p/`, zum Beispiel
`/p/gold-vs-bitcoin-2026`, `/p/deutschland-will-geduld-besteuern`. Diese Slugs
sind indexiert und in versendeten E-Mails verlinkt und müssen **exakt erhalten
bleiben**.

Aufbau: Datum (Mono), Titel (Chaney), Untertitel, Fließtext, danach das
Formular, danach drei Links auf verwandte Ausgaben.

Der Prose-Content aus der API kommt mit beehiiv-eigenem Markup und muss
normalisiert werden. **Das ist der aufwendigste Teil des Projekts, nicht die
Startseite.** Dafür einen eigenen `.prose`-Style schreiben, der die Tokens aus
Abschnitt 2 und 3 anwendet.

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

- [ ] `@astrojs/sitemap` eingebunden, Sitemap in der Search Console eingereicht
- [ ] RSS-Feed selbst gebaut (`/rss.xml`), beehiiv liefert ihn nicht mehr
- [ ] JSON-LD `Article` auf jeder Ausgabe, `Person` auf `/ueber-mich`
- [ ] `og:image` pro Ausgabe aus den Canva-Bannern
- [ ] Canonical-Tags auf allen Seiten
- [ ] `robots.txt`
- [ ] Search Console überhaupt eingerichtet
- [ ] Alle bestehenden `/p/`-URLs verifiziert erreichbar

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

**Fehlerfall:** benennen, was passiert ist, und was zu tun ist. Kein
„Fehler:"-Präfix, keine Entschuldigung, keine Rohfehler aus der API.

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
auf Em-Dashes.

### Struktur

| Punkt | Ist | Soll |
|---|---|---|
| Ausgaben-Route | `/newsletter/[slug]` | `/p/[slug]` (verifiziert live) |
| Über-Seite | `/ueber` | `/ueber-mich` |
| Wissensseiten | fehlen komplett | 5 Seiten in `src/content/` |
| RSS, Sitemap, JSON-LD, robots.txt | fehlen | Abschnitt 8 |

### Komponenten

| Datei | Verstoß |
|---|---|
| `components/PostCard.astro` | Karten-Darstellung; ungenutzt, streichen oder auf Listeneintrag umbauen |
| `pages/newsletter/[slug].astro` | Route; Prose-Styles gegen §2/§3 prüfen |
| `pages/impressum.astro`, `datenschutz.astro` | Platzhalter mit Tailwind-Prose statt Tokens; Datenschutz-Text enthält „wir" |

### Schriften

Chaney und Satoshi laufen über die Fontshare-CDN statt lokal aus
`/public/fonts/`. Widerspricht Abschnitt 3 (DSGVO, Drittanbieter-Requests).

---

*Bits&Satoshis · Design-, Copy- und SEO-Spezifikation · 2026*
