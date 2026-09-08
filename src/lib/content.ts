import { readFileSync, readdirSync } from "fs";
import path from "path";
import type { Tool, Comparison, Guide, Category } from "./types";

const contentRoot = path.join(process.cwd(), "content");

function readJsonDir<T>(dir: string): T[] {
  const full = path.join(contentRoot, dir);
  return readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .map((f) =>
      JSON.parse(readFileSync(path.join(full, f), "utf-8")) as T
    );
}

function readJsonFile<T>(dir: string, slug: string): T | null {
  try {
    const full = path.join(contentRoot, dir, `${slug}.json`);
    return JSON.parse(readFileSync(full, "utf-8")) as T;
  } catch {
    return null;
  }
}

export function getAllTools(): Tool[] {
  return readJsonDir<Tool>("herramientas").sort((a, b) =>
    a.name.localeCompare(b.name, "es-MX")
  );
}

export function getTool(slug: string): Tool | null {
  return readJsonFile<Tool>("herramientas", slug);
}

export function getFeaturedTools(): Tool[] {
  return getAllTools().filter((t) => t.featured);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return getAllTools().filter((t) => t.categorias.includes(categorySlug));
}

export function getAllComparisons(): Comparison[] {
  return readJsonDir<Comparison>("comparaciones");
}

export function getComparison(slug: string): Comparison | null {
  return readJsonFile<Comparison>("comparaciones", slug);
}

export function getAllGuides(): Guide[] {
  return readJsonDir<Guide>("guias").sort((a, b) =>
    b.fecha.localeCompare(a.fecha)
  );
}

export function getGuide(slug: string): Guide | null {
  return readJsonFile<Guide>("guias", slug);
}

export function getAllCategories(): Category[] {
  return readJsonDir<Category>("categorias");
}

export function getCategory(slug: string): Category | null {
  return readJsonFile<Category>("categorias", slug);
}

export function getRelatedTools(slugs: string[]): Tool[] {
  return slugs
    .map((s) => getTool(s))
    .filter((t): t is Tool => t !== null);
}
