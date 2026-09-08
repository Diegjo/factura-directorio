import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EtiquetaCategoria } from "@/components/EtiquetaCategoria";
import { MarcaAproximado } from "@/components/MarcaAproximado";
import {
  getAllArticulos,
  getArticulo,
  getArticulosByCategoria,
  getCategoria,
} from "@/lib/content";
import { fechaLarga } from "@/lib/fecha";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticulos().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const articulo = getArticulo(slug);
  if (!articulo) return { title: "Artículo no encontrado" };

  return {
    title: articulo.title,
    description: articulo.summary,
    alternates: { canonical: `/articulo/${slug}` },
    openGraph: {
      title: articulo.title,
      description: articulo.summary,
      type: "article",
      publishedTime: articulo.fecha,
    },
  };
}

export default async function ArticuloPage({ params }: Props) {
  const { slug } = await params;
  const articulo = getArticulo(slug);
  if (!articulo) notFound();

  const categoria = getCategoria(articulo.category);
  const relacionados = getArticulosByCategoria(articulo.category)
    .filter((a) => a.slug !== articulo.slug)
    .slice(0, 3);

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <p className="text-sm text-ink-faint">
          <Link href="/" className="hover:text-brand">
            Inicio
          </Link>{" "}
          /{" "}
          <Link
            href={`/edicion/${articulo.fecha}`}
            className="hover:text-brand"
          >
            Edición del {articulo.fecha}
          </Link>
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <EtiquetaCategoria slug={articulo.category} />
          {articulo.aproximado && <MarcaAproximado />}
        </div>

        <h1 className="font-display text-3xl leading-[1.15] font-bold text-balance text-ink sm:text-4xl">
          {articulo.title}
        </h1>
        <p className="text-lg leading-relaxed text-ink-soft">{articulo.dek}</p>
        <p className="border-t border-rule pt-3 text-xs tracking-[0.12em] text-ink-faint uppercase">
          {fechaLarga(articulo.fecha)}
        </p>
      </header>

      {articulo.datos && articulo.datos.length > 0 && (
        <section className="border border-rule bg-paper-alt px-5 py-4">
          <h2 className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Datos clave
          </h2>
          <dl className="mt-3 divide-y divide-rule">
            {articulo.datos.map((dato) => (
              <div
                key={dato.etiqueta}
                className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <dt className="text-sm text-ink-soft sm:w-56 sm:shrink-0">
                  {dato.etiqueta}
                </dt>
                <dd className="min-w-0">
                  <span className="font-display font-bold text-ink">
                    {dato.valor}
                  </span>
                  {dato.nota && (
                    <span className="block text-xs text-ink-faint">
                      {dato.nota}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <div className="space-y-6">
        {articulo.cuerpo.map((bloque, i) => (
          <section key={bloque.heading ?? i} className="space-y-2">
            {bloque.heading && (
              <h2 className="font-display text-xl font-bold text-ink">
                {bloque.heading}
              </h2>
            )}
            <p className="text-[1.0625rem] leading-[1.75] text-ink">
              {bloque.body}
            </p>
          </section>
        ))}
      </div>

      {articulo.paraInversionistas &&
        articulo.paraInversionistas.length > 0 && (
          <section className="border-l-2 border-brand bg-paper-alt px-5 py-4">
            <h2 className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Para inversionistas
            </h2>
            <ul className="mt-3 space-y-2">
              {articulo.paraInversionistas.map((punto) => (
                <li
                  key={punto}
                  className="flex gap-2 text-sm leading-relaxed text-ink-soft"
                >
                  <span aria-hidden className="text-brand">
                    ·
                  </span>
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

      {articulo.fuentes && articulo.fuentes.length > 0 && (
        <section className="border-t border-rule pt-5">
          <h2 className="text-[11px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
            Fuentes
          </h2>
          <ul className="mt-3 space-y-1.5">
            {articulo.fuentes.map((fuente) => (
              <li key={fuente.url} className="text-sm">
                <a
                  href={fuente.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft underline decoration-dotted underline-offset-2 hover:text-brand"
                >
                  {fuente.medio} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {relacionados.length > 0 && categoria && (
        <section className="border-t border-rule pt-5">
          <h2 className="text-[11px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
            Más de {categoria.nombre}
          </h2>
          <ul className="mt-3 space-y-3">
            {relacionados.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articulo/${a.slug}`}
                  className="font-display font-bold text-ink hover:text-brand"
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
