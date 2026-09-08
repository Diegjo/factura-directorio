import type { Metadata } from "next";
import { ToolCard } from "@/components/ToolCard";
import { getAllTools } from "@/lib/content";

export const metadata: Metadata = {
  title: "Herramientas de facturación CFDI",
  description:
    "Listado de software de facturación electrónica CFDI y herramientas contables para freelancers y PyMEs en México.",
};

export default function HerramientasPage() {
  const tools = getAllTools();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Herramientas</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Fichas claras de software CFDI: para quién es, precios aproximados,
          checklist y pros/contras. Sin lorem ipsum.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
