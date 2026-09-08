import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VistaEdicion } from "@/components/VistaEdicion";
import {
  getAllEdiciones,
  getEdicion,
  getEdicionesVecinas,
} from "@/lib/content";
import { fechaCorta, fechaLarga } from "@/lib/fecha";

type Props = { params: Promise<{ fecha: string }> };

export function generateStaticParams() {
  return getAllEdiciones().map((e) => ({ fecha: e.fecha }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { fecha } = await params;
  const edicion = getEdicion(fecha);
  if (!edicion) return { title: "Edición no encontrada" };

  return {
    title: `Edición del ${fechaLarga(fecha).toLowerCase()}`,
    description: edicion.headline.summary,
    alternates: { canonical: `/edicion/${fecha}` },
  };
}

export default async function EdicionPage({ params }: Props) {
  const { fecha } = await params;
  const edicion = getEdicion(fecha);
  if (!edicion) notFound();

  const esLaMasReciente = getAllEdiciones()[0]?.fecha === fecha;
  const { anterior, siguiente } = getEdicionesVecinas(fecha);

  return (
    <div className="space-y-10">
      <p className="text-sm text-ink-faint">
        <Link href="/" className="hover:text-brand">
          Inicio
        </Link>{" "}
        /{" "}
        <Link href="/archivo" className="hover:text-brand">
          Archivo
        </Link>
      </p>

      <VistaEdicion edicion={edicion} esHoy={esLaMasReciente} />

      <nav className="flex flex-col gap-4 border-t border-rule pt-6 text-sm sm:flex-row sm:justify-between">
        {anterior ? (
          <Link
            href={`/edicion/${anterior.fecha}`}
            className="group max-w-sm text-ink-soft hover:text-brand"
          >
            <span className="block text-[11px] tracking-[0.14em] text-ink-faint uppercase">
              ← Edición anterior · {fechaCorta(anterior.fecha)}
            </span>
            <span className="mt-1 block font-medium">
              {anterior.headline.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {siguiente && (
          <Link
            href={`/edicion/${siguiente.fecha}`}
            className="group max-w-sm text-ink-soft sm:text-right hover:text-brand"
          >
            <span className="block text-[11px] tracking-[0.14em] text-ink-faint uppercase">
              Edición siguiente · {fechaCorta(siguiente.fecha)} →
            </span>
            <span className="mt-1 block font-medium">
              {siguiente.headline.title}
            </span>
          </Link>
        )}
      </nav>
    </div>
  );
}
