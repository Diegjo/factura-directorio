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

      <ol className="mt-6 grid gap-5 sm:gap-6">
        {notas.map((nota, i) => {
          const href = getNotaHref(nota);
          return (
            <li key={nota.slug}>
              <article className="border-l-2 border-rule bg-paper-alt/50 py-4 pr-4 pl-5 transition-colors hover:border-brand hover:bg-paper-alt sm:pl-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span
                    aria-hidden
                    className="font-display text-sm font-bold text-ink-faint"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <EtiquetaCategoria slug={nota.category} />
                  {nota.aproximado && <MarcaAproximado />}
                </div>
                <h3 className="mt-2.5 font-display text-xl leading-snug font-bold text-ink sm:text-2xl">
                  <Link href={href} className="hover:text-brand">
                    {nota.title}
                  </Link>
                </h3>
                <p className="medida-lectura mt-2.5 leading-[1.65] text-ink-soft">
                  {nota.summary}
                </p>
                {nota.sourceUrl && (
                  <p className="mt-3">
                    <EnlaceFuente
                      url={nota.sourceUrl}
                      nombre={nota.sourceName}
                    />
                  </p>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
