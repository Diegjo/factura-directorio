import Link from "next/link";
import { EnlaceFuente } from "@/components/EnlaceFuente";
import { EtiquetaCategoria } from "@/components/EtiquetaCategoria";
import { MarcaAproximado } from "@/components/MarcaAproximado";
import { getNotaHref } from "@/lib/content";
import type { NotaIndexada } from "@/lib/types";

export function HeadlineDelDia({ nota }: { nota: NotaIndexada }) {
  const href = getNotaHref(nota);

  return (
    <section>
      <p className="filete-doble font-display text-xs font-bold tracking-[0.22em] uppercase">
        Headline del día
      </p>

      <article className="pt-5">
        <div className="flex flex-wrap items-center gap-3">
          <EtiquetaCategoria slug={nota.category} />
          {nota.aproximado && <MarcaAproximado />}
        </div>

        <h2 className="mt-2 font-display text-3xl leading-[1.15] font-bold text-balance text-ink sm:text-4xl">
          <Link href={href} className="hover:text-brand">
            {nota.title}
          </Link>
        </h2>

        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          {nota.summary}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href={href}
            className="text-sm font-semibold text-brand hover:underline"
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
