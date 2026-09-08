export type Categoria = {
  slug: string;
  nombre: string;
  descripcion: string;
  /** Controla el orden en la navegación y en los listados. Menor = primero. */
  orden: number;
};

export type Fuente = {
  medio: string;
  url: string;
};

/** Nota corta tal como aparece en una edición diaria. */
export type Nota = {
  title: string;
  /** Slug del artículo en `content/articulos`. Si no existe el archivo, la nota se lee en la edición. */
  slug: string;
  summary: string;
  category: string;
  sourceUrl?: string;
  sourceName?: string;
  /** Marca cifras estimadas, listados o proyecciones sin confirmar. */
  aproximado?: boolean;
};

export type Edicion = {
  /** YYYY-MM-DD. Debe coincidir con el nombre del archivo. */
  fecha: string;
  /** Frase corta que abre la edición del día. */
  intro: string;
  headline: Nota;
  masNoticias: Nota[];
  editorialNote?: string;
};

export type DatoClave = {
  etiqueta: string;
  valor: string;
  nota?: string;
};

export type Articulo = {
  slug: string;
  title: string;
  /** Bajada editorial: una o dos frases debajo del título. */
  dek: string;
  summary: string;
  category: string;
  fecha: string;
  aproximado?: boolean;
  datos?: DatoClave[];
  cuerpo: { heading?: string; body: string }[];
  /** Lectura para inversionistas: qué implica la nota. */
  paraInversionistas?: string[];
  fuentes?: Fuente[];
};

/** Nota aplanada desde las ediciones, con la fecha en la que se publicó. */
export type NotaIndexada = Nota & {
  fecha: string;
  esHeadline: boolean;
  tieneArticulo: boolean;
};

/**
 * Entrada de un listado de categoría. Unifica las notas que salieron en una
 * edición con los artículos de fondo que no pertenecen a ninguna.
 */
export type EntradaCategoria = {
  slug: string;
  title: string;
  summary: string;
  fecha: string;
  href: string;
  esHeadline: boolean;
  aproximado?: boolean;
  sourceUrl?: string;
  sourceName?: string;
  /** Presente solo cuando la entrada salió de una edición. */
  edicionHref?: string;
};
