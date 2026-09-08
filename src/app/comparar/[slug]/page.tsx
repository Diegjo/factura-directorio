import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllComparisons,
  getComparison,
  getTool,
} from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllComparisons().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cmp = getComparison(slug);
  if (!cmp) return { title: "Comparación no encontrada" };
  return {
    title: cmp.title,
    description: cmp.description,
  };
}

export default async function CompararDetailPage({ params }: Props) {
  const { slug } = await params;
  const cmp = getComparison(slug);
  if (!cmp) notFound();

  const toolA = getTool(cmp.tools[0]);
  const toolB = getTool(cmp.tools[1]);
  if (!toolA || !toolB) notFound();

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm text-slate-500">
          <Link href="/comparar" className="hover:underline">
            Comparar
          </Link>{" "}
          / {toolA.name} vs {toolB.name}
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{cmp.title}</h1>
        <p className="text-slate-600">{cmp.description}</p>
      </header>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-800">Criterio</th>
              <th className="px-4 py-3 font-semibold text-slate-800">
                <Link
                  href={`/herramientas/${toolA.slug}`}
                  className="hover:underline"
                >
                  {toolA.name}
                </Link>
              </th>
              <th className="px-4 py-3 font-semibold text-slate-800">
                <Link
                  href={`/herramientas/${toolB.slug}`}
                  className="hover:underline"
                >
                  {toolB.name}
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {cmp.criterios.map((row) => (
              <tr key={row.nombre} className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-800">
                  {row.nombre}
                </td>
                <td className="px-4 py-3 text-slate-700">{row.a}</td>
                <td className="px-4 py-3 text-slate-700">{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Veredicto</h2>
        <p className="leading-relaxed text-slate-700">{cmp.veredicto}</p>
      </section>

      <p className="text-sm text-slate-600">
        Fichas:{" "}
        <Link
          href={`/herramientas/${toolA.slug}`}
          className="text-blue-800 hover:underline"
        >
          {toolA.name}
        </Link>{" "}
        ·{" "}
        <Link
          href={`/herramientas/${toolB.slug}`}
          className="text-blue-800 hover:underline"
        >
          {toolB.name}
        </Link>
      </p>
    </article>
  );
}
