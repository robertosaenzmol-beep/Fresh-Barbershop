// Cuenta compartida de la barbería (créala en Firebase → Authentication).
// Debe coincidir con el email en firestore.rules.
export const STAFF_EMAIL = 'barberia@freshbarbershop.es';
export const QR_TTL_MIN = 15;
export const madridDay = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date());
