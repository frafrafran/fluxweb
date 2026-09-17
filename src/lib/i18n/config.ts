/**
 * Idiomas del sitio.
 * El español es el idioma base y vive en la raíz (`/`); el inglés cuelga de
 * `/en`. La reescritura de `/` a `/es` está en `next.config.ts`.
 */
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Etiqueta BCP 47 para `<html lang>` y Open Graph. */
export const htmlLang: Record<Locale, string> = { es: "es-AR", en: "en" };
export const ogLocale: Record<Locale, string> = { es: "es_AR", en: "en_US" };

/**
 * Convierte una ruta interna en la ruta pública del idioma.
 *   localePath("es", "/marca")      -> "/marca"
 *   localePath("en", "/marca")      -> "/en/marca"
 *   localePath("en", "/#servicios") -> "/en#servicios"
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/**
 * Quita el prefijo de idioma de una ruta: "/en/marca" -> "/marca".
 * También quita el del idioma base ("/es/marca" -> "/marca"), porque
 * `usePathname` devuelve la ruta interna reescrita, no la del navegador.
 */
export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`))
      return pathname.slice(locale.length + 1);
  }
  return pathname;
}

/**
 * Enlaces `hreflang` de una ruta interna, para los metadatos.
 * La canónica es siempre la versión en español, que es la de la raíz.
 */
export function languageAlternates(path: string) {
  return {
    canonical: localePath("es", path),
    languages: {
      "es-AR": localePath("es", path),
      en: localePath("en", path),
      "x-default": localePath("es", path),
    },
  };
}
