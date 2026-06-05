/** Deutsches Langdatum, z.B. "28. Mai 2026". */
export function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
