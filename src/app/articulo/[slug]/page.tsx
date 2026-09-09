import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EtiquetaCategoria } from "@/components/EtiquetaCategoria";
import { ImagenNota } from "@/components/ImagenNota";
import { MarcaAproximado } from "@/components/MarcaAproximado";
import {
  getAllArticulos,
  getArticulo,
  getArticulosByCategoria,
  getCategoria,
} from "@/lib/content";
import { fechaCorta, fechaLarga } from "@/lib/fecha";

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
      images: articulo.image
        ? [
            {
              url: articulo.image.src,
              width: articulo.image.width,
              height: articulo.image.height,
              alt: articulo.image.alt,
            },
          ]
        : undefined,
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
            Edición del {fechaCorta(articulo.fecha)}
          </Link>
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-[11px] font-semibold tracking-[0.16em] text-ink-faint uppercase">
            {fechaLarga(articulo.fecha)}
          </span>
          <span aria-hidden className="text-ink-faint">
            ·
          </span>
          <EtiquetaCategoria slug={articulo.category} />
          {articulo.aproximado && <MarcaAproximado />}
        </div>

        <h1 className="font-display text-[2.125rem] leading-[1.1] font-bold tracking-[-0.015em] text-balance text-ink sm:text-[2.75rem]">
          {articulo.title}
        </h1>
        <p className="medida-lectura text-xl leading-[1.6] text-ink-soft sm:text-[1.375rem]">
          {articulo.dek}
        </p>
      </header>

      {articulo.image && <ImagenNota imagen={articulo.image} />}

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

      <div className="space-y-8">
        {articulo.cuerpo.map((bloque, i) => (
          <section key={bloque.heading ?? i} className="space-y-3">
            {bloque.heading && (
              <h2 className="font-display text-2xl leading-snug font-bold text-ink">
                {bloque.heading}
              </h2>
            )}
            <p className="medida-lectura leading-[1.7] text-ink">
              {bloque.body}
            </p>
          </section>
        ))}
      </div>

      {articulo.paraInversionistas &&
        articulo.paraInversionistas.length > 0 && (
          <section className="border-l-2 border-brand bg-paper-alt px-5 py-5 sm:px-6">
            <h2 className="text-[11px] font-bold tracking-[0.16em] text-brand uppercase">
              Para inversionistas
            </h2>
            <ul className="medida-lectura mt-3 space-y-2.5">
              {articulo.paraInversionistas.map((punto) => (
                <li
                  key={punto}
                  className="flex gap-2 text-base leading-[1.65] text-ink-soft"
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
