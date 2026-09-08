import type { Metadata } from "next";
import Link from "next/link";
import { getAllComparisons } from "@/lib/content";

export const metadata: Metadata = {
  title: "Comparar software CFDI",
  description:
    "Comparaciones lado a lado de herramientas de facturación electrónica CFDI en México.",
};

export default function CompararPage() {
  const items = getAllComparisons();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Comparar</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Tablas directas para decidir entre opciones populares. Precios
          aproximados; confirma en la web del proveedor.
        </p>
      </div>
      <ul className="space-y-3">
        {items.map((c) => (
          <li
            key={c.slug}
            className="rounded-lg border border-slate-200 bg-white p-5"
          >
            <Link
              href={`/comparar/${c.slug}`}
              className="text-lg font-semibold text-slate-900 hover:underline"
            >
              {c.title}
            </Link>
            <p className="mt-1 text-sm text-slate-600">{c.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
