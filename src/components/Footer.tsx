import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-slate-600">
        <p className="font-medium text-slate-800">{siteConfig.name}</p>
        <p className="mt-2 max-w-2xl">
          Directorio independiente de software CFDI y herramientas contables
          para México. No somos el SAT ni un despacho contable. Los precios son
          aproximados; confirma siempre en el sitio del proveedor. Enlaces con{" "}
          <code className="rounded bg-slate-200 px-1">rel=&quot;sponsored&quot;</code>{" "}
          pueden ser afiliados (placeholders).
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link href="/herramientas" className="hover:underline">
            Herramientas
          </Link>
          <Link href="/comparar" className="hover:underline">
            Comparar
          </Link>
          <Link href="/guias" className="hover:underline">
            Guías
          </Link>
        </div>
        <p className="mt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} {siteConfig.name}. Contenido en español
          (México).
        </p>
      </div>
    </footer>
  );
}
