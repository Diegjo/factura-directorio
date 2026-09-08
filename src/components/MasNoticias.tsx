import Link from "next/link";
import { EnlaceFuente } from "@/components/EnlaceFuente";
import { EtiquetaCategoria } from "@/components/EtiquetaCategoria";
import { MarcaAproximado } from "@/components/MarcaAproximado";
import { getNotaHref } from "@/lib/content";
import type { NotaIndexada } from "@/lib/types";

export function MasNoticias({ notas }: { notas: NotaIndexada[] }) {
  if (notas.length === 0) return null;

  return (
    <section>
      <p className="filete-doble font-display text-xs font-bold tracking-[0.22em] uppercase">
        {notas.length} noticias más
      </p>

      <ol className="divide-y divide-rule">
        {notas.map((nota, i) => {
          const href = getNotaHref(nota);
          return (
            <li key={nota.slug} className="flex gap-4 py-6 sm:gap-6">
              <span
                aria-hidden
                className="font-display text-2xl leading-none font-bold text-rule"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <EtiquetaCategoria slug={nota.category} />
                  {nota.aproximado && <MarcaAproximado />}
                </div>
                <h3 className="mt-1.5 font-display text-xl leading-snug font-bold text-ink">
                  <Link href={href} className="hover:text-brand">
                    {nota.title}
                  </Link>
                </h3>
                <p className="mt-2 leading-relaxed text-ink-soft">
                  {nota.summary}
                </p>
                {nota.sourceUrl && (
                  <p className="mt-2">
                    <EnlaceFuente
                      url={nota.sourceUrl}
                      nombre={nota.sourceName}
                    />
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
