import Image from "next/image";
import Link from "next/link";
import type { Imagen } from "@/lib/types";

/**
 * `grande` abre la edición, `media` abre un artículo y `thumb` acompaña a las
 * notas cortas. El ancho de la columna de lectura es 768 px.
 */
type Variante = "grande" | "media" | "thumb";

const marco = "w-full border border-rule bg-paper-alt";

const variantes: Record<
  Variante,
  { sizes: string; priority: boolean; className: string }
> = {
  grande: {
    sizes: "(min-width: 640px) 704px, 100vw",
    priority: true,
    className: `${marco} h-auto`,
  },
  media: {
    sizes: "(min-width: 640px) 704px, 100vw",
    priority: true,
    className: `${marco} h-auto`,
  },
  // Recorta a 3:2 para que las tres miniaturas midan lo mismo aunque el
  // archivo venga con otra proporción.
  thumb: {
    sizes: "(min-width: 640px) 176px, 100vw",
    priority: false,
    className: `${marco} aspect-3/2 object-cover`,
  },
};

type Props = {
  imagen: Imagen;
  variante?: Variante;
  /** Ruta de lectura de la nota. Enlaza la foto, nunca el pie. */
  href?: string;
  /** Los `thumb` acreditan en el bloque "Créditos de imagen" de la edición. */
  mostrarCredito?: boolean;
};

export function ImagenNota({
  imagen,
  variante = "media",
  href,
  mostrarCredito = variante !== "thumb",
}: Props) {
  const { sizes, priority, className } = variantes[variante];

  const foto = (
    <Image
      src={imagen.src}
      alt={imagen.alt}
      width={imagen.width}
      height={imagen.height}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );

  return (
    <figure>
      {/* El pie lleva su propia liga al crédito: no puede quedar dentro de la
          liga de la nota. */}
      {href ? (
        <Link href={href} className="block">
          {foto}
        </Link>
      ) : (
        foto
      )}
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
