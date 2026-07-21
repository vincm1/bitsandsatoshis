/** Escaped die fünf XML-Sonderzeichen — für Sitemap- und RSS-Ausgabe. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Lesezeit in Minuten aus HTML-Inhalt — 200 Wörter/Minute, mindestens 1. */
export function readingTimeMinutes(html: string): number {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Deutsches Langdatum, z.B. "28. Mai 2026". */
export function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
