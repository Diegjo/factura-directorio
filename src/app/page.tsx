import Link from "next/link";
import { VistaEdicion } from "@/components/VistaEdicion";
import { getAllEdiciones } from "@/lib/content";
import { fechaCorta } from "@/lib/fecha";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const ediciones = getAllEdiciones();
  const [hoy, ...anteriores] = ediciones;

  if (!hoy) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-3xl font-bold">{siteConfig.name}</h1>
        <p className="text-ink-soft">
          Todavía no hay ediciones publicadas. Agrega un archivo en{" "}
          <code className="rounded bg-paper-alt px-1">
            content/ediciones/YYYY-MM-DD.json
          </code>{" "}
          para publicar la primera.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-14 sm:space-y-16">
      <VistaEdicion edicion={hoy} esHoy />

      {anteriores.length > 0 && (
        <section>
          <p className="filete-doble font-display text-xs font-bold tracking-[0.22em] uppercase">
            Ediciones anteriores
          </p>
          <ul className="mt-2 divide-y divide-rule">
            {anteriores.slice(0, 5).map((edicion) => (
              <li key={edicion.fecha} className="py-4">
                <Link
                  href={`/edicion/${edicion.fecha}`}
                  className="group flex flex-col gap-1 sm:flex-row sm:gap-4"
                >
                  <span className="shrink-0 text-xs font-semibold tracking-[0.12em] text-ink-faint uppercase sm:w-28 sm:pt-1">
                    {fechaCorta(edicion.fecha)}
                  </span>
                  <span className="font-medium text-ink group-hover:text-brand">
                    {edicion.headline.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5">
            <Link
              href="/archivo"
              className="text-base font-semibold text-brand hover:underline"
            >
              Ver todo el archivo →
            </Link>
          </p>
        </section>
      )}
    </div>
  );
}
