# Bits&Satoshis

Website des deutschsprachigen Bitcoin-Newsletters **Bits&Satoshis**
— [bitsandsatoshis.com](https://bitsandsatoshis.com)

> Der ruhige Bitcoin-Newsletter für Menschen, die verstehen wollen,
> nicht spekulieren.

## Stack

Astro 7 (`output: 'static'` + Vercel-Adapter, also Hybrid) · Tailwind CSS v4 +
DaisyUI v5 · Vue 3 Islands · beehiiv REST API v2 · gehostet auf Vercel.

## Loslegen

```bash
pnpm install
cp .env.example .env    # Keys eintragen, siehe unten
pnpm dev                # http://localhost:4321
```

Ohne Keys läuft die Seite trotzdem: `src/lib/beehiiv.ts` liefert dann
Mock-Ausgaben und der Signup simuliert Erfolg.

```bash
BEEHIIV_API_KEY=           # beehiiv → Settings → API
BEEHIIV_PUBLICATION_ID=
```

## Befehle

| Befehl | Wirkung |
|---|---|
| `pnpm dev` | Dev-Server auf Port 4321 |
| `pnpm build` | Produktions-Build |
| `pnpm preview` | Build lokal ansehen |
| `git push` | Vercel deployt automatisch |

Unter Windows rendert `pnpm build` alle Seiten, bricht danach aber im
Vercel-Adapter mit `EPERM: symlink` ab — Symlinks brauchen dort Developer Mode
oder Admin-Rechte. Auf Vercels Buildern tritt das nicht auf.

## Dokumentation

| Datei | Inhalt |
|---|---|
| [`CLAUDE.md`](./CLAUDE.md) | Tech Stack, Struktur, Routen, Regeln |
| [`DESIGN.md`](./DESIGN.md) | Verbindliche Design-, Copy- und SEO-Spezifikation |
| [`PRODUCT.md`](./PRODUCT.md) | Marke, Zielgruppe, Design-Prinzipien |

Dazu je eine `CLAUDE.md` in den Unterverzeichnissen von `src/`.

**Weicht der Code von `DESIGN.md` ab, ist der Code falsch.**
