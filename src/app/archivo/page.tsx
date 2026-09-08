import type { Metadata } from "next";
import Link from "next/link";
import { EtiquetaCategoria } from "@/components/EtiquetaCategoria";
import { getAllEdiciones } from "@/lib/content";
import { fechaLarga } from "@/lib/fecha";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Archivo de ediciones",
  description: `Todas las ediciones diarias de ${siteConfig.name}: bienes raíces en Querétaro y El Bajío, día por día.`,
  alternates: { canonical: "/archivo" },
};

export default function ArchivoPage() {
  const ediciones = getAllEdiciones();

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm text-ink-faint">
          <Link href="/" className="hover:text-brand">
            Inicio
          </Link>{" "}
          / Archivo
        </p>
        <h1 className="font-display text-[2.125rem] leading-[1.15] font-bold tracking-[-0.015em] text-ink sm:text-[2.5rem]">
          Archivo de ediciones
        </h1>
        <p className="medida-lectura text-ink-soft">
          {ediciones.length}{" "}
          {ediciones.length === 1 ? "edición publicada" : "ediciones publicadas"}
          . Cada edición es un headline y tres notas del día.
        </p>
      </header>

      <ul className="divide-y divide-rule border-t border-rule">
        {ediciones.map((edicion) => (
          <li key={edicion.fecha} className="py-6">
            <p className="text-[11px] font-bold tracking-[0.16em] text-ink-faint uppercase">
              {fechaLarga(edicion.fecha)}
            </p>
            <h2 className="mt-2.5 font-display text-xl leading-snug font-bold text-ink sm:text-2xl">
              <Link
                href={`/edicion/${edicion.fecha}`}
                className="hover:text-brand"
              >
                {edicion.headline.title}
              </Link>
            </h2>
            <p className="medida-lectura mt-2.5 leading-[1.65] text-ink-soft">
              {edicion.headline.summary}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              {Array.from(
                new Set(
                  [edicion.headline, ...edicion.masNoticias].map(
                    (nota) => nota.category
                  )
                )
              ).map((slug) => (
                <EtiquetaCategoria key={slug} slug={slug} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
