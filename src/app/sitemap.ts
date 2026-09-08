import type { MetadataRoute } from "next";
import {
  getAllArticulos,
  getAllCategorias,
  getAllEdiciones,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const ediciones = getAllEdiciones();
  const ultimaEdicion = ediciones[0]?.fecha;

  const estaticas = [
    {
      url: `${base}/`,
      lastModified: ultimaEdicion ? new Date(ultimaEdicion) : new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${base}/archivo`,
      lastModified: ultimaEdicion ? new Date(ultimaEdicion) : new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  return [
    ...estaticas,
    ...ediciones.map((e) => ({
      url: `${base}/edicion/${e.fecha}`,
      lastModified: new Date(e.fecha),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...getAllArticulos().map((a) => ({
      url: `${base}/articulo/${a.slug}`,
      lastModified: new Date(a.fecha),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getAllCategorias().map((c) => ({
      url: `${base}/categoria/${c.slug}`,
      lastModified: ultimaEdicion ? new Date(ultimaEdicion) : new Date(),
      changeFrequency: "daily" as const,
      priority: 0.6,
    })),
  ];
}
