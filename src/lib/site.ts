/**
 * Zentrale Betreiber-Daten — genutzt von Impressum und Datenschutzerklärung.
 * Eine Stelle zum Pflegen statt zwei Seiten.
 *
 * Betrieben wird der Newsletter unter dem Dach der UG (juristische Person)
 * — § 5 DDG verlangt dann Firma mit Rechtsformzusatz, Vertretungs-
 * berechtigten, ladungsfähige Anschrift und Handelsregister-Angaben.
 */
export const OPERATOR = {
  company: "PyMinds UG (haftungsbeschränkt)",
  representative: "Vincent Michler", // Geschäftsführer
  street: "Auerfeldstr. 2",
  city: "81541 München",
  country: "Deutschland",
  email: "vincent.michler94@gmail.com",
  registerCourt: "Amtsgericht München",
  registerNumber: "HRB 282022",
  /** Nur angeben, falls vorhanden — sonst leer lassen (Zeile wird ausgeblendet). */
  vatId: "",
} as const;
