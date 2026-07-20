import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { subscribe } from "../lib/beehiiv";

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
};
