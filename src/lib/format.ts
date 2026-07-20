/** Escaped die fünf XML-Sonderzeichen — für Sitemap- und RSS-Ausgabe. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
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
