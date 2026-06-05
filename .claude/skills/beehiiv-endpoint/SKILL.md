---
name: beehiiv-endpoint
description: Use when adding a new beehiiv REST API v2 call (e.g. fetching a subscription, segments, stats) to the Bits&Satoshis site. Keeps API access server-only, typed, mapped, and mock-friendly.
---

# Neuen beehiiv-Endpunkt anbinden (Bits&Satoshis)

Alle beehiiv-Aufrufe leben **ausschließlich** in `src/lib/beehiiv.ts` und laufen
serverseitig (SSR / Actions). Der API-Key darf nie in den Client gelangen.

## Checkliste

1. **In `src/lib/beehiiv.ts` ergänzen** — keine API-Calls in Komponenten/Seiten.
2. **Auth & Basis** wiederverwenden: `API_BASE`, `authHeaders()`,
   `PUBLICATION_ID`. Endpunkt-Doku via beehiiv MCP (`read_documentation`) prüfen.
3. **Roh-Typ** für die genutzten Felder definieren (Interface `Beehiiv…`),
   dann in eine **UI-normalisierte** Form mappen (eigener Typ oder bestehender
   wie `NewsletterPost`). Komponenten sehen nie die Rohform.
4. **Mock-Fallback**: bei `!isConfigured` sinnvolle Demo-Daten zurückgeben (bzw.
   Erfolg simulieren bei Mutationen), damit die Seite ohne Keys lauffähig bleibt.
5. **Fehler werfen** bei `!res.ok`:
   `throw new Error(\`beehiiv <fn> fehlgeschlagen: ${res.status}\`)`. 404 ggf.
   als `null` behandeln.
6. **Query-Params** über `URLSearchParams`. Für Expansions:
   `params.append("expand[]", "…")`.
7. **Verifizieren:** `pnpm build` grün. Mit gesetzten Env-Keys (`.env`) gegen die
   echte API testen; ohne Keys den Mock-Pfad prüfen.

## Muster
```ts
export async function getSubscription(id: string): Promise<Subscription | null> {
  if (!isConfigured) return mockSubscription;
  const res = await fetch(
    `${API_BASE}/publications/${PUBLICATION_ID}/subscriptions/${id}`,
    { headers: authHeaders() },
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`beehiiv getSubscription fehlgeschlagen: ${res.status}`);
  return mapSubscription((await res.json()).data);
}
```

## Referenz
- Client-Konventionen: `src/lib/CLAUDE.md`
- API-Doku: beehiiv MCP-Tools (`search_documentation`, `read_documentation`)
- Endpunkte heute: `getPosts`, `getPost`, `subscribe`
