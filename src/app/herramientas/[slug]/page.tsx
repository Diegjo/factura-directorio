import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateCta } from "@/components/AffiliateCta";
import { Checklist } from "@/components/Checklist";
import { ProsCons } from "@/components/ProsCons";
import {
  getAllCategories,
  getAllTools,
  getRelatedTools,
  getTool,
} from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return { title: "Herramienta no encontrada" };
  return {
    title: `${tool.name}: facturación CFDI en México`,
    description: tool.tagline,
  };
}

export default async function HerramientaDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const categories = getAllCategories().filter((c) =>
    tool.categorias.includes(c.slug)
  );
  const alternatives = getRelatedTools(tool.alternativas);

  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm text-slate-500">
          <Link href="/herramientas" className="hover:underline">
            Herramientas
          </Link>{" "}
          / {tool.name}
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{tool.name}</h1>
        <p className="text-lg text-slate-600">{tool.tagline}</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="rounded-full border border-slate-300 bg-white px-3 py-0.5 text-xs text-slate-700 hover:bg-slate-50"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </header>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Descripción</h2>
        <p className="text-slate-700 leading-relaxed">{tool.description}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Para quién es</h2>
        <ul className="list-disc space-y-1 pl-5 text-slate-700">
          {tool.paraQuien.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Precios</h2>
        <p className="text-slate-700">
          {tool.precios.aproximado && (
            <span className="mr-1 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-900">
              aprox.
            </span>
          )}
          {tool.precios.resumen}
        </p>
        {tool.precios.detalle && (
          <p className="text-sm text-slate-600">{tool.precios.detalle}</p>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Checklist CFDI</h2>
        <Checklist items={tool.checklistCfdi} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Pros y contras</h2>
        <ProsCons pros={tool.pros} contras={tool.contras} />
      </section>

      {alternatives.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Alternativas</h2>
          <ul className="space-y-2">
            {alternatives.map((alt) => (
              <li key={alt.slug}>
                <Link
                  href={`/herramientas/${alt.slug}`}
                  className="text-blue-800 hover:underline"
                >
                  {alt.name}
                </Link>
                <span className="text-sm text-slate-600"> — {alt.tagline}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <AffiliateCta
        name={tool.name}
        sitioWeb={tool.sitioWeb}
        affiliateUrl={tool.affiliateUrl}
      />
    </article>
  );
}
