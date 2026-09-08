import type { MetadataRoute } from "next";
import {
  getAllCategories,
  getAllComparisons,
  getAllGuides,
  getAllTools,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = ["", "/herramientas", "/comparar", "/guias"].map(
    (path) => ({
      url: `${base}${path || "/"}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const tools = getAllTools().map((t) => ({
    url: `${base}/herramientas/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const comparisons = getAllComparisons().map((c) => ({
    url: `${base}/comparar/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const guides = getAllGuides().map((g) => ({
    url: `${base}/guias/${g.slug}`,
    lastModified: new Date(g.fecha),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categories = getAllCategories().map((c) => ({
    url: `${base}/categoria/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...tools, ...comparisons, ...guides, ...categories];
}
