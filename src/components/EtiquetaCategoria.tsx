import Link from "next/link";
import { getCategoria } from "@/lib/content";

export function EtiquetaCategoria({ slug }: { slug: string }) {
  const categoria = getCategoria(slug);
  if (!categoria) return null;

  return (
    <Link
      href={`/categoria/${slug}`}
      className="text-[11px] font-semibold tracking-[0.14em] text-brand uppercase hover:underline"
    >
      {categoria.nombre}
    </Link>
  );
}
