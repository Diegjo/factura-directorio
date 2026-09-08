import { existsSync, readFileSync, readdirSync } from "fs";
import path from "path";
import type {
  Articulo,
  Categoria,
  Edicion,
  Nota,
  NotaIndexada,
} from "./types";

const contentRoot = path.join(process.cwd(), "content");

function readJsonDir<T>(dir: string): T[] {
  const full = path.join(contentRoot, dir);
  if (!existsSync(full)) return [];
  return readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(path.join(full, f), "utf-8")) as T);
}

function readJsonFile<T>(dir: string, name: string): T | null {
  try {
    const full = path.join(contentRoot, dir, `${name}.json`);
    return JSON.parse(readFileSync(full, "utf-8")) as T;
  } catch {
    return null;
  }
}

export function getAllEdiciones(): Edicion[] {
  return readJsonDir<Edicion>("ediciones").sort((a, b) =>
    b.fecha.localeCompare(a.fecha)
  );
}

export function getEdicion(fecha: string): Edicion | null {
  return readJsonFile<Edicion>("ediciones", fecha);
}

/** Edición más reciente por fecha: es la que se publica en la home. */
export function getEdicionDeHoy(): Edicion | null {
  return getAllEdiciones()[0] ?? null;
}

/**
 * Ediciones vecinas para navegar el archivo.
 * `anterior` es más vieja, `siguiente` es más nueva.
 */
export function getEdicionesVecinas(fecha: string): {
  anterior: Edicion | null;
  siguiente: Edicion | null;
} {
  const ediciones = getAllEdiciones();
  const i = ediciones.findIndex((e) => e.fecha === fecha);
  if (i === -1) return { anterior: null, siguiente: null };
  return {
    anterior: ediciones[i + 1] ?? null,
    siguiente: ediciones[i - 1] ?? null,
  };
}

export function getAllArticulos(): Articulo[] {
  return readJsonDir<Articulo>("articulos").sort((a, b) =>
    b.fecha.localeCompare(a.fecha)
  );
}

export function getArticulo(slug: string): Articulo | null {
  return readJsonFile<Articulo>("articulos", slug);
}

export function getArticulosByCategoria(categoria: string): Articulo[] {
  return getAllArticulos().filter((a) => a.category === categoria);
}

export function getAllCategorias(): Categoria[] {
  return readJsonDir<Categoria>("categorias").sort(
    (a, b) => a.orden - b.orden || a.nombre.localeCompare(b.nombre, "es-MX")
  );
}

export function getCategoria(slug: string): Categoria | null {
  return readJsonFile<Categoria>("categorias", slug);
}

/**
 * Todas las notas de todas las ediciones, ordenadas de la más reciente a la más
 * vieja. El headline de cada edición va primero dentro de su fecha.
 */
export function getAllNotas(): NotaIndexada[] {
  const slugsConArticulo = new Set(getAllArticulos().map((a) => a.slug));
  const indexar = (nota: Nota, fecha: string, esHeadline: boolean) => ({
    ...nota,
    fecha,
    esHeadline,
    tieneArticulo: slugsConArticulo.has(nota.slug),
  });

  return getAllEdiciones().flatMap((edicion) => [
    indexar(edicion.headline, edicion.fecha, true),
    ...edicion.masNoticias.map((n) => indexar(n, edicion.fecha, false)),
  ]);
}

export function getNotasByCategoria(categoria: string): NotaIndexada[] {
  return getAllNotas().filter((n) => n.category === categoria);
}

/** Notas de una edición ya indexadas: `[headline, ...masNoticias]`. */
export function getNotasDeEdicion(edicion: Edicion): NotaIndexada[] {
  return getAllNotas().filter((n) => n.fecha === edicion.fecha);
}

/** Ruta de lectura de una nota: el artículo si existe, si no la edición del día. */
export function getNotaHref(nota: NotaIndexada): string {
  return nota.tieneArticulo
    ? `/articulo/${nota.slug}`
    : `/edicion/${nota.fecha}`;
}
