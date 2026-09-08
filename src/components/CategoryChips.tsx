import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryChips({ categories }: { categories: Category[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/categoria/${cat.slug}`}
          className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700 hover:border-slate-400 hover:bg-white"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
