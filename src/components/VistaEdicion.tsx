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
    <div className="space-y-12 sm:space-y-14">
      <header className="space-y-4">
        <p className="text-xs font-semibold tracking-[0.2em] text-ink-faint uppercase">
          {esHoy ? "Edición de hoy" : "Edición"} · {fechaLarga(edicion.fecha)}
        </p>
        <p className="medida-lectura font-display text-[1.375rem] leading-[1.5] text-ink sm:text-[1.625rem]">
          {edicion.intro}
        </p>
      </header>

      {headline && <HeadlineDelDia nota={headline} />}

      <MasNoticias notas={masNoticias} />

      {edicion.editorialNote && (
        <aside className="border-l-2 border-brand bg-paper-alt px-5 py-5 sm:px-6">
          <p className="text-[11px] font-bold tracking-[0.16em] text-brand uppercase">
            Nota del editor
          </p>
          <p className="medida-lectura mt-2.5 text-base leading-[1.65] text-ink-soft">
            {edicion.editorialNote}
          </p>
        </aside>
      )}
    </div>
  );
}
