export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  paraQuien: string[];
  precios: {
    resumen: string;
    detalle?: string;
    aproximado: boolean;
  };
  checklistCfdi: string[];
  pros: string[];
  contras: string[];
  alternativas: string[];
  categorias: string[];
  sitioWeb: string;
  affiliateUrl?: string;
  featured?: boolean;
};

export type Comparison = {
  slug: string;
  title: string;
  description: string;
  tools: [string, string];
  criterios: { nombre: string; a: string; b: string }[];
  veredicto: string;
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  fecha: string;
  contenido: { heading: string; body: string }[];
};

export type Category = {
  slug: string;
  name: string;
  description: string;
};
