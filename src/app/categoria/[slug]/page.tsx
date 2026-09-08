import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnlaceFuente } from "@/components/EnlaceFuente";
import { MarcaAproximado } from "@/components/MarcaAproximado";
import {
  getAllCategorias,
  getCategoria,
  getEntradasByCategoria,
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

  const entradas = getEntradasByCategoria(slug);
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
        <h1 className="font-display text-[2.125rem] leading-[1.15] font-bold tracking-[-0.015em] text-ink sm:text-[2.5rem]">
          {categoria.nombre}
        </h1>
        <p className="medida-lectura text-lg leading-[1.65] text-ink-soft sm:text-xl">
          {categoria.descripcion}
        </p>
      </header>

      {entradas.length === 0 ? (
        <p className="text-ink-soft">
          Todavía no hay notas publicadas en esta categoría.
        </p>
      ) : (
        <ul className="divide-y divide-rule border-t border-rule">
          {entradas.map((entrada) => (
            <li key={`${entrada.fecha}-${entrada.slug}`} className="py-6">
              <div className="flex flex-wrap items-center gap-3">
                {entrada.edicionHref ? (
                  <Link
                    href={entrada.edicionHref}
                    className="text-[11px] tracking-[0.14em] text-ink-faint uppercase hover:text-brand"
                  >
                    {fechaCorta(entrada.fecha)}
                  </Link>
                ) : (
                  <span className="text-[11px] tracking-[0.14em] text-ink-faint uppercase">
                    {fechaCorta(entrada.fecha)}
                  </span>
                )}
                {entrada.esHeadline && (
                  <span className="text-[10px] font-bold tracking-[0.1em] text-ink-faint uppercase">
                    Headline del día
                  </span>
                )}
                {entrada.aproximado && <MarcaAproximado />}
              </div>
              <h2 className="mt-2.5 font-display text-xl leading-snug font-bold text-ink sm:text-2xl">
                <Link href={entrada.href} className="hover:text-brand">
                  {entrada.title}
                </Link>
              </h2>
              <p className="medida-lectura mt-2.5 leading-[1.65] text-ink-soft">
                {entrada.summary}
              </p>
              {entrada.sourceUrl && (
                <p className="mt-2">
                  <EnlaceFuente
                    url={entrada.sourceUrl}
                    nombre={entrada.sourceName}
                  />
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      <section className="border-t border-rule pt-5">
        <h2 className="text-[11px] font-bold tracking-[0.16em] text-ink-faint uppercase">
          Otras secciones
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {otras.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/categoria/${c.slug}`}
                className="inline-block rounded-full border border-rule bg-paper px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-ink-soft uppercase hover:border-brand hover:bg-brand-soft hover:text-brand"
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
