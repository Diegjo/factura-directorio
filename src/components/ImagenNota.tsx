import Image from "next/image";
import type { Imagen } from "@/lib/types";

/**
 * `grande` abre la edición, `media` abre un artículo y `thumb` acompaña a las
 * notas cortas. El ancho de la columna de lectura es 768 px.
 */
type Variante = "grande" | "media" | "thumb";

const variantes: Record<Variante, { sizes: string; priority: boolean }> = {
  grande: { sizes: "(min-width: 640px) 704px, 100vw", priority: true },
  media: { sizes: "(min-width: 640px) 704px, 100vw", priority: true },
  thumb: { sizes: "(min-width: 640px) 176px, 100vw", priority: false },
};

type Props = {
  imagen: Imagen;
  variante?: Variante;
  /** Los `thumb` acreditan en el bloque "Créditos de imagen" de la edición. */
  mostrarCredito?: boolean;
};

export function ImagenNota({
  imagen,
  variante = "media",
  mostrarCredito = variante !== "thumb",
}: Props) {
  const { sizes, priority } = variantes[variante];

  return (
    <figure>
      <Image
        src={imagen.src}
        alt={imagen.alt}
        width={imagen.width}
        height={imagen.height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full border border-rule bg-paper-alt object-cover"
      />
      {mostrarCredito && imagen.credit && (
        <figcaption className="mt-2 text-[11px] leading-snug text-ink-faint">
          Foto:{" "}
          {imagen.creditUrl ? (
            <a
              href={imagen.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted underline-offset-2 hover:text-brand"
            >
              {imagen.credit}
            </a>
          ) : (
            imagen.credit
          )}
        </figcaption>
      )}
    </figure>
  );
}
