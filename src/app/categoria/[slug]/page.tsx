import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnlaceFuente } from "@/components/EnlaceFuente";
import { MarcaAproximado } from "@/components/MarcaAproximado";
import {
  getAllCategorias,
  getCategoria,
  getNotaHref,
  getNotasByCategoria,
} from "@/lib/content";
import { fechaCorta } from "@/lib/fecha";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllCategorias().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoria = getCategoria(slug);
  if (!categoria) return { title: "Categoría no encontrada" };

  return {
    title: `${categoria.nombre} en Querétaro y El Bajío`,
    description: categoria.descripcion,
    alternates: { canonical: `/categoria/${slug}` },
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params;
  const categoria = getCategoria(slug);
  if (!categoria) notFound();

  const notas = getNotasByCategoria(slug);
  const otras = getAllCategorias().filter((c) => c.slug !== slug);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm text-ink-faint">
          <Link href="/" className="hover:text-brand">
            Inicio
          </Link>{" "}
          / Categoría
        </p>
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          {categoria.nombre}
        </h1>
        <p className="max-w-2xl leading-relaxed text-ink-soft">
          {categoria.descripcion}
        </p>
      </header>

      {notas.length === 0 ? (
        <p className="text-ink-soft">
          Todavía no hay notas publicadas en esta categoría.
        </p>
      ) : (
        <ul className="divide-y divide-rule border-t border-rule">
          {notas.map((nota) => (
            <li key={`${nota.fecha}-${nota.slug}`} className="py-6">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/edicion/${nota.fecha}`}
                  className="text-[11px] tracking-[0.14em] text-ink-faint uppercase hover:text-brand"
                >
                  {fechaCorta(nota.fecha)}
                </Link>
                {nota.esHeadline && (
                  <span className="text-[10px] font-semibold tracking-[0.1em] text-ink-faint uppercase">
                    Headline del día
                  </span>
                )}
                {nota.aproximado && <MarcaAproximado />}
              </div>
              <h2 className="mt-2 font-display text-xl leading-snug font-bold text-ink">
                <Link href={getNotaHref(nota)} className="hover:text-brand">
                  {nota.title}
                </Link>
              </h2>
              <p className="mt-2 leading-relaxed text-ink-soft">
                {nota.summary}
              </p>
              {nota.sourceUrl && (
                <p className="mt-2">
                  <EnlaceFuente url={nota.sourceUrl} nombre={nota.sourceName} />
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      <section className="border-t border-rule pt-5">
        <h2 className="text-[11px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
          Otras secciones
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {otras.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/categoria/${c.slug}`}
                className="inline-block border border-rule bg-paper px-3 py-1 text-sm text-ink-soft hover:border-brand hover:text-brand"
              >
                {c.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
