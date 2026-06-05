# src/actions/

## Zweck
Astro Actions — type-sichere serverseitige Handler für Formulare/Mutationen.
Ersetzen separate API-Endpunkte/Functions. Laufen serverseitig, API-Keys sicher.

## index.ts
Exportiert `server` mit allen Actions. Aktuell:

```ts
subscribe  // E-Mail-Anmeldung → ruft subscribe() aus src/lib/beehiiv.ts
```

### Muster
```ts
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  meineAction: defineAction({
    accept: "form",                 // für progressive HTML-Forms
    input: z.object({ /* Zod-Validierung */ }),
    handler: async (input) => { /* … */ return { ok: true }; },
  }),
};
```

### Aufruf aus einer Komponente
```astro
---
import { actions } from "astro:actions";
const result = Astro.getActionResult(actions.subscribe);
---
<form method="POST" action={actions.subscribe}> … </form>
```

## Regeln
- Eingaben **immer** mit Zod validieren (`input:`), Fehlermeldungen auf Deutsch.
- Fachlogik (beehiiv etc.) in `src/lib/` halten; die Action orchestriert nur.
- `accept: "form"` für progressive Enhancement (funktioniert ohne JS).
- Eingabefehler via `isInputError(result.error)` von Server-Fehlern trennen.
