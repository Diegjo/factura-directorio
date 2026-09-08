import Link from "next/link";
import { CategoryChips } from "@/components/CategoryChips";
import { ToolCard } from "@/components/ToolCard";
import {
  getAllCategories,
  getAllGuides,
  getAllTools,
  getFeaturedTools,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const categories = getAllCategories();
  const featured = getFeaturedTools();
  const tools = featured.length > 0 ? featured : getAllTools().slice(0, 6);
  const guides = getAllGuides();

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Directorio de software CFDI para México
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          {siteConfig.description} Compara opciones, lee fichas claras y elige
          sin humo de marketing.
        </p>
        <CategoryChips categories={categories} />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Herramientas destacadas
          </h2>
          <Link
            href="/herramientas"
            className="text-sm text-blue-800 hover:underline"
          >
            Ver todas
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-900">Guías</h2>
          <Link href="/guias" className="text-sm text-blue-800 hover:underline">
            Ver todas
          </Link>
        </div>
        <ul className="space-y-3">
          {guides.map((g) => (
            <li key={g.slug} className="rounded-lg border border-slate-200 bg-white p-4">
              <Link
                href={`/guias/${g.slug}`}
                className="font-medium text-slate-900 hover:underline"
              >
                {g.title}
              </Link>
              <p className="mt-1 text-sm text-slate-600">{g.description}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          También puedes{" "}
          <Link href="/comparar" className="text-blue-800 hover:underline">
            comparar herramientas
          </Link>{" "}
          lado a lado.
        </p>
      </section>
    </div>
  );
}
