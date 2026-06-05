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
    }),
    handler: async ({ email }) => {
      return await subscribe(email);
    },
  }),
};
