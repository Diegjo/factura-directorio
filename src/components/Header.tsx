import Link from "next/link";
import { getAllCategorias } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function Header() {
  const categorias = getAllCategorias();

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <div className="mx-auto w-full max-w-3xl px-4 pt-3.5 pb-2 sm:px-6 sm:pt-5 sm:pb-2.5">
        <div className="flex items-center justify-between gap-x-4">
          <Link href="/" className="min-w-0">
            <p className="font-display text-2xl leading-none font-bold tracking-tight text-ink sm:text-3xl">
              {siteConfig.name}
            </p>
            <p className="mt-1.5 text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
              Querétaro · El Bajío
            </p>
          </Link>
          <nav
            aria-label="Navegación principal"
            className="flex shrink-0 items-center gap-1 text-sm font-semibold"
          >
            <Link
              href="/"
              className="rounded-full px-3 py-1.5 text-ink-soft hover:bg-brand-soft hover:text-brand"
            >
              Hoy
            </Link>
            <Link
              href="/archivo"
              className="rounded-full px-3 py-1.5 text-ink-soft hover:bg-brand-soft hover:text-brand"
            >
              Archivo
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <nav
            aria-label="Secciones"
            className="barra-chips -mx-4 flex gap-2 overflow-x-auto px-4 py-1.5 sm:mx-0 sm:flex-wrap sm:px-0 sm:py-2"
          >
            {categorias.map((c) => (
              <Link
                key={c.slug}
                href={`/categoria/${c.slug}`}
                className="shrink-0 rounded-full border border-rule bg-paper px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-ink-soft uppercase hover:border-brand hover:bg-brand-soft hover:text-brand"
              >
                {c.nombre}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
