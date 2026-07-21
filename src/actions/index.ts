import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { subscribe, unsubscribe } from "../lib/beehiiv";

export const server = {
  subscribe: defineAction({
    accept: "form",
    input: z.object({
      email: z
        .string()
        .min(1, "Bitte gib deine E-Mail-Adresse ein.")
        .email("Bitte gib eine gültige E-Mail-Adresse ein."),
      // UTM-Herkunft aus der URL — hält die Akquise-Statistik in beehiiv intakt.
      utm_source: z.string().max(120).optional(),
      utm_medium: z.string().max(120).optional(),
      utm_campaign: z.string().max(120).optional(),
    }),
    handler: async ({ email, utm_source, utm_medium, utm_campaign }) => {
      try {
        return await subscribe(email, {
          source: utm_source,
          medium: utm_medium,
          campaign: utm_campaign,
        });
      } catch (err) {
        // Roh-API-Fehler bleiben im Server-Log; der Besucher bekommt
        // benannt, was passiert ist und was zu tun ist.
        console.error("subscribe fehlgeschlagen:", err);
        return {
          ok: false,
          message:
            "Die Anmeldung ist gerade nicht durchgegangen. Versuch es in ein paar Minuten noch einmal.",
        };
      }
    },
  }),

  unsubscribe: defineAction({
    accept: "form",
    input: z.object({
      email: z
        .string()
        .min(1, "Bitte gib deine E-Mail-Adresse ein.")
        .email("Bitte gib eine gültige E-Mail-Adresse ein."),
      // Honeypot: für Menschen unsichtbar — füllt ein Bot es, antworten wir
      // neutral wie bei einem Erfolg, ohne die beehiiv-API anzufassen.
      website: z.string().optional(),
    }),
    handler: async ({ email, website }) => {
      const neutral = {
        ok: true,
        message: "Falls diese Adresse eingetragen war, ist sie jetzt abgemeldet.",
      };
      if (website) return neutral;

      try {
        return await unsubscribe(email);
      } catch (err) {
        // Roh-API-Fehler bleiben im Server-Log; der Besucher bekommt
        // benannt, was passiert ist und was zu tun ist.
        console.error("unsubscribe fehlgeschlagen:", err);
        return {
          ok: false,
          message:
            "Die Abmeldung ist gerade nicht durchgegangen. Versuch es in ein paar Minuten noch einmal — oder nutz den Abmeldelink in einer Newsletter-Mail.",
        };
      }
    },
  }),
};
