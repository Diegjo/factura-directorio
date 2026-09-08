import Link from "next/link";
import { getAllCategorias } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function Header() {
  const categorias = getAllCategorias();

  return (
    <header className="border-b border-rule bg-paper">
      <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-3 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <Link href="/" className="group">
            <p className="font-display text-2xl leading-none font-bold tracking-tight text-ink sm:text-3xl">
              {siteConfig.name}
            </p>
            <p className="mt-1.5 text-[11px] tracking-[0.18em] text-ink-faint uppercase">
              Querétaro · El Bajío
            </p>
          </Link>
          <nav className="flex gap-4 text-sm font-medium text-ink-soft">
            <Link href="/" className="hover:text-brand">
              Hoy
            </Link>
            <Link href="/archivo" className="hover:text-brand">
              Archivo
            </Link>
          </nav>
        </div>
      </div>
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <nav className="flex flex-wrap gap-x-4 gap-y-1 border-t border-rule py-2 text-[11px] tracking-[0.14em] text-ink-soft uppercase">
          {categorias.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="hover:text-brand"
            >
              {c.nombre}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
