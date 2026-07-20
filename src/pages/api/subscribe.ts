/**
 * POST /api/subscribe — Signup-Endpoint (Blog-Muster: APIRoute + prerender=false).
 *
 * Nimmt FormData entgegen (fetch aus SignupIsland.vue ebenso wie den
 * No-JS-Form-POST), validiert die E-Mail und ruft serverseitig die beehiiv
 * Subscriptions-API über src/lib/beehiiv.ts auf. Der API-Key bleibt im Server.
 *
 * Antwort: JSON { ok, message } für fetch-Clients; Browser ohne JS
 * (Accept: text/html) bekommen einen 303-Redirect zurück zur Startseite.
 */
import type { APIRoute } from "astro";
import { subscribe } from "../../lib/beehiiv";

export const prerender = false;

// Gleiche Strenge wie zuvor die Zod-Validierung: verlangt eine TLD.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export const POST: APIRoute = async ({ request, redirect }) => {
  let email = "";
  const utm: Record<string, string> = {};

  try {
    const form = await request.formData();
    email = String(form.get("email") ?? "").trim();
    for (const key of UTM_KEYS) {
      const value = form.get(key);
      if (typeof value === "string" && value) utm[key] = value.slice(0, 120);
    }
  } catch {
    // Unlesbarer Body → wie eine fehlende E-Mail behandeln.
  }

  const wantsHtml = request.headers.get("accept")?.includes("text/html");
  const respond = (ok: boolean, message: string, status: number) =>
    wantsHtml
      ? redirect(`/?anmeldung=${ok ? "ok" : "fehler"}`, 303)
      : new Response(JSON.stringify({ ok, message }), {
          status,
          headers: { "Content-Type": "application/json" },
        });

  if (!email) {
    return respond(false, "Bitte gib deine E-Mail-Adresse ein.", 400);
  }
  if (!EMAIL_RE.test(email)) {
    return respond(false, "Bitte gib eine gültige E-Mail-Adresse ein.", 400);
  }

  try {
    const result = await subscribe(email, {
      source: utm.utm_source,
      medium: utm.utm_medium,
      campaign: utm.utm_campaign,
    });
    return respond(result.ok, result.message, 200);
  } catch (err) {
    // Roh-API-Fehler bleiben im Server-Log; der Besucher bekommt benannt,
    // was passiert ist und was zu tun ist.
    console.error("subscribe fehlgeschlagen:", err);
    return respond(
      false,
      "Die Anmeldung ist gerade nicht durchgegangen. Versuch es in ein paar Minuten noch einmal.",
      502,
    );
  }
};
