import { HeadlineDelDia } from "@/components/HeadlineDelDia";
import { MasNoticias } from "@/components/MasNoticias";
import { getNotasDeEdicion } from "@/lib/content";
import { fechaLarga } from "@/lib/fecha";
import type { Edicion } from "@/lib/types";

type Props = {
  edicion: Edicion;
  /** La edición más reciente se presenta como la del día. */
  esHoy?: boolean;
};

export function VistaEdicion({ edicion, esHoy = false }: Props) {
  const [headline, ...masNoticias] = getNotasDeEdicion(edicion);

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
          {esHoy ? "Edición de hoy" : "Edición"} · {fechaLarga(edicion.fecha)}
        </p>
        <p className="font-display text-xl leading-relaxed text-ink sm:text-2xl">
          {edicion.intro}
        </p>
      </header>

      {headline && <HeadlineDelDia nota={headline} />}

      <MasNoticias notas={masNoticias} />

      {edicion.editorialNote && (
        <aside className="border-l-2 border-brand bg-paper-alt px-5 py-4">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Nota del editor
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {edicion.editorialNote}
          </p>
        </aside>
      )}
    </div>
  );
}
