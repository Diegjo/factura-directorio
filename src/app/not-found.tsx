import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
        Error 404
      </p>
      <h1 className="font-display text-3xl font-bold text-ink">
        Esta página no existe
      </h1>
      <p className="text-ink-soft">
        Quizá la edición que buscas todavía no se publica o la nota cambió de
        dirección.
      </p>
      <div className="flex flex-wrap gap-4 pt-2 text-sm font-semibold text-brand">
        <Link href="/" className="hover:underline">
          Ir a la edición de hoy →
        </Link>
        <Link href="/archivo" className="hover:underline">
          Ver el archivo →
        </Link>
      </div>
    </div>
  );
}
