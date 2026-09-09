import type { Imagen } from "@/lib/types";

/**
 * Acredita las fotos que se publican sin pie visible, como las miniaturas de
 * las notas cortas. Agrupa por crédito para no repetir al mismo autor.
 */
export function CreditosImagen({ imagenes }: { imagenes: Imagen[] }) {
  const creditos = new Map<string, string | undefined>();
  for (const imagen of imagenes) {
    if (imagen.credit && !creditos.has(imagen.credit)) {
      creditos.set(imagen.credit, imagen.creditUrl);
    }
  }

  if (creditos.size === 0) return null;

  return (
    <section className="border-t border-rule pt-4">
      <h2 className="text-[11px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
        Créditos de imagen
      </h2>
      <ul className="mt-2 space-y-1">
        {[...creditos].map(([credit, creditUrl]) => (
          <li key={credit} className="text-xs leading-snug text-ink-faint">
            {creditUrl ? (
              <a
                href={creditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-2 hover:text-brand"
              >
                {credit}
              </a>
            ) : (
              credit
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
