import Link from "next/link";
import { getCategoria } from "@/lib/content";

export function EtiquetaCategoria({ slug }: { slug: string }) {
  const categoria = getCategoria(slug);
  if (!categoria) return null;

  return (
    <Link
      href={`/categoria/${slug}`}
      className="inline-flex items-center rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-bold tracking-[0.12em] text-brand uppercase hover:bg-brand hover:text-paper"
    >
      {categoria.nombre}
    </Link>
  );
}
