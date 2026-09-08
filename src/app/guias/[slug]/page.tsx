import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllGuides, getGuide } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guía no encontrada" };
  return {
    title: guide.title,
    description: guide.description,
    keywords: [guide.keyword],
  };
}

export default async function GuiaDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <p className="text-sm text-slate-500">
          <Link href="/guias" className="hover:underline">
            Guías
          </Link>{" "}
          / {guide.fecha}
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{guide.title}</h1>
        <p className="text-lg text-slate-600">{guide.description}</p>
      </header>

      {guide.contenido.map((section) => (
        <section key={section.heading} className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">
            {section.heading}
          </h2>
          <p className="leading-relaxed text-slate-700 whitespace-pre-line">
            {section.body}
          </p>
        </section>
      ))}

      <p className="border-t border-slate-200 pt-6 text-sm text-slate-600">
        Siguiente paso: revisa el{" "}
        <Link href="/herramientas" className="text-blue-800 hover:underline">
          listado de herramientas
        </Link>{" "}
        o la comparación{" "}
        <Link
          href="/comparar/facturama-vs-alegra"
          className="text-blue-800 hover:underline"
        >
          Facturama vs Alegra
        </Link>
        .
      </p>
    </article>
  );
}
