const FORMATO_LARGO = new Intl.DateTimeFormat("es-MX", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  // Las fechas son YYYY-MM-DD (medianoche UTC); sin esto se corren un día.
  timeZone: "UTC",
});

const FORMATO_CORTO = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/** "2026-09-08" → "Martes, 8 de septiembre de 2026" */
export function fechaLarga(fecha: string): string {
  return capitalizar(FORMATO_LARGO.format(new Date(`${fecha}T00:00:00Z`)));
}

/** "2026-09-08" → "8 sept 2026" */
export function fechaCorta(fecha: string): string {
  return FORMATO_CORTO.format(new Date(`${fecha}T00:00:00Z`)).replace(".", "");
}

export function esFechaValida(fecha: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(fecha);
}
