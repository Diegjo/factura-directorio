export function ProsCons({
  pros,
  contras,
}: {
  pros: string[];
  contras: string[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <h3 className="font-semibold text-slate-900">Pros</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {pros.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-slate-900">Contras</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {contras.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
