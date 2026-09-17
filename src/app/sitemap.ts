import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { localePath, locales } from "@/lib/i18n/config";

const pages = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/marca", changeFrequency: "yearly", priority: 0.5 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  /* Una entrada por página e idioma, cada una con sus alternativas. */
  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${site.url}${localePath(locale, page.path)}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: locale === "es" ? page.priority : page.priority * 0.8,
      alternates: {
        languages: {
          "es-AR": `${site.url}${localePath("es", page.path)}`,
          en: `${site.url}${localePath("en", page.path)}`,
        },
      },
    })),
  );
}
