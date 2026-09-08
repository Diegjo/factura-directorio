import Link from "next/link";
import { getAllCategorias } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const categorias = getAllCategorias();

  return (
    <footer className="mt-auto border-t border-rule bg-paper-alt">
      <div className="mx-auto max-w-3xl px-4 py-10 text-sm text-ink-soft sm:px-6">
        <p className="font-display text-lg font-bold text-ink">
          {siteConfig.name}
        </p>
        <p className="mt-2 max-w-xl">{siteConfig.tagline}</p>

        <nav className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/" className="hover:text-brand">
            Edición de hoy
          </Link>
          <Link href="/archivo" className="hover:text-brand">
            Archivo
          </Link>
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

        <p className="mt-8 max-w-xl text-xs text-ink-faint">
          Publicación editorial independiente. No somos asesores de inversión ni
          intermediarios inmobiliarios. Las cifras marcadas como aproximadas
          provienen de precios de lista, índices de portales o proyecciones
          públicas: verifícalas con la fuente original, con un avalúo y con la
          autoridad municipal antes de tomar una decisión.
        </p>
        <p className="mt-4 text-xs text-ink-faint">
          © {new Date().getFullYear()} {siteConfig.name}. Contenido en español
          (México).
        </p>
      </div>
    </footer>
  );
}
