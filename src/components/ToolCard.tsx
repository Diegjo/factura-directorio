import Link from "next/link";
import type { Tool } from "@/lib/types";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className="flex flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        <Link href={`/herramientas/${tool.slug}`} className="hover:underline">
          {tool.name}
        </Link>
      </h2>
      <p className="mt-1 text-sm text-slate-600">{tool.tagline}</p>
      <p className="mt-3 line-clamp-3 flex-1 text-sm text-slate-700">
        {tool.description}
      </p>
      <p className="mt-3 text-xs text-slate-500">
        Precios: {tool.precios.aproximado ? "aprox. — " : ""}
        {tool.precios.resumen}
      </p>
      <Link
        href={`/herramientas/${tool.slug}`}
        className="mt-4 text-sm font-medium text-blue-800 hover:underline"
      >
        Ver ficha →
      </Link>
    </article>
  );
}
