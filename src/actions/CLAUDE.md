# src/actions/

## Zweck
Astro Actions — type-sichere serverseitige Handler für Formulare/Mutationen.
Ersetzen separate API-Endpunkte/Functions. Laufen serverseitig, API-Keys sicher.

## index.ts
Exportiert `server` mit allen Actions. Aktuell:

```ts
unsubscribe  // Abmeldung → unsubscribe() aus src/lib/beehiiv.ts. Genutzt von /abmelden
subscribe    // Anmeldung → subscribe() aus src/lib/beehiiv.ts. Siehe Hinweis
```

> **Der Live-Signup läuft nicht über `subscribe`.** Das Formular auf der Seite
> ist `SignupIsland.vue` und schickt seinen POST an `/api/subscribe`
> (`src/pages/api/subscribe.ts`); ohne JS greift der native Form-POST an
> denselben Endpoint. Die Action `subscribe` wird nur noch von totem Code
> aufgerufen (`SignupForm.astro`, `FooterSignup.vue`) und kann mit diesem
> zusammen entfallen. `unsubscribe` ist dagegen aktiv im Einsatz.

`unsubscribe` trägt ein **Honeypot-Feld** (`website`): für Menschen unsichtbar,
und wenn ein Bot es füllt, antwortet die Action neutral, ohne die beehiiv-API
anzufassen. Die Erfolgsmeldung ist bewusst unspezifisch („Falls diese Adresse
eingetragen war …") und verrät damit nicht, ob eine Adresse existiert.

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
