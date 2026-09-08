import Link from "next/link";
import { EnlaceFuente } from "@/components/EnlaceFuente";
import { EtiquetaCategoria } from "@/components/EtiquetaCategoria";
import { ImagenNota } from "@/components/ImagenNota";
import { MarcaAproximado } from "@/components/MarcaAproximado";
import { getNotaHref } from "@/lib/content";
import { fechaCorta } from "@/lib/fecha";
import type { NotaIndexada } from "@/lib/types";

export function HeadlineDelDia({ nota }: { nota: NotaIndexada }) {
  const href = getNotaHref(nota);

  return (
    <section>
      <p className="filete-doble font-display text-xs font-bold tracking-[0.22em] uppercase">
        Headline del día
      </p>

      <article className="pt-6">
        {nota.image && (
          <Link href={href} className="mb-5 block">
            <ImagenNota imagen={nota.image} variante="grande" />
          </Link>
        )}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-[11px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
            {fechaCorta(nota.fecha)}
          </span>
          <span aria-hidden className="text-ink-faint">
            ·
          </span>
          <EtiquetaCategoria slug={nota.category} />
          {nota.aproximado && <MarcaAproximado />}
        </div>

        <h2 className="mt-4 font-display text-[2.125rem] leading-[1.1] font-bold tracking-[-0.015em] text-balance text-ink sm:text-[2.75rem]">
          <Link href={href} className="hover:text-brand">
            {nota.title}
          </Link>
        </h2>

        <p className="medida-lectura mt-5 text-xl leading-[1.6] text-ink-soft sm:text-[1.375rem]">
          {nota.summary}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href={href}
            className="text-base font-semibold text-brand hover:underline"
          >
            {nota.tieneArticulo ? "Leer la nota completa" : "Ver en la edición"}{" "}
            →
          </Link>
          {nota.sourceUrl && (
            <EnlaceFuente url={nota.sourceUrl} nombre={nota.sourceName} />
          )}
        </div>
      </article>
    </section>
  );
}
