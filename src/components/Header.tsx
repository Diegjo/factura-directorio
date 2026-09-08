import Link from "next/link";
import { siteConfig } from "@/lib/site";

const nav = [
  { href: "/herramientas", label: "Herramientas" },
  { href: "/comparar", label: "Comparar" },
  { href: "/guias", label: "Guías" },
];

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          {siteConfig.name}
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm text-slate-700">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-slate-900 hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
