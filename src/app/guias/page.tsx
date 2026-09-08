import type { Metadata } from "next";
import Link from "next/link";
import { getAllGuides } from "@/lib/content";

export const metadata: Metadata = {
  title: "Guías de facturación CFDI",
  description:
    "Guías en español mexicano sobre software CFDI, precios y elección para freelancers y PyMEs.",
};

export default function GuiasPage() {
  const guides = getAllGuides();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Guías</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Artículos prácticos para decidir con criterio fiscal y de negocio,
          sin copy genérico.
        </p>
      </div>
      <ul className="space-y-4">
        {guides.map((g) => (
          <li
            key={g.slug}
            className="rounded-lg border border-slate-200 bg-white p-5"
          >
            <p className="text-xs text-slate-500">{g.fecha}</p>
            <Link
              href={`/guias/${g.slug}`}
              className="mt-1 block text-lg font-semibold text-slate-900 hover:underline"
            >
              {g.title}
            </Link>
            <p className="mt-1 text-sm text-slate-600">{g.description}</p>
            <p className="mt-2 text-xs text-slate-500">
              Keyword: {g.keyword}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
