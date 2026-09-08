import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/ToolCard";
import {
  getAllCategories,
  getCategory,
  getToolsByCategory,
} from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return { title: "Categoría no encontrada" };
  return {
    title: `Software CFDI para ${cat.name}`,
    description: cat.description,
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const tools = getToolsByCategory(slug);
  const other = getAllCategories().filter((c) => c.slug !== slug);

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm text-slate-500">
          <Link href="/" className="hover:underline">
            Inicio
          </Link>{" "}
          / Categoría
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{cat.name}</h1>
        <p className="max-w-2xl text-slate-600">{cat.description}</p>
      </header>

      {tools.length === 0 ? (
        <p className="text-slate-600">
          Aún no hay herramientas en esta categoría.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          Otras categorías
        </h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {other.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/categoria/${c.slug}`}
                className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
