import { cache } from "react";
import { lang } from "next/root-params";
import { defaultLocale, hasLocale, type Locale } from "./config";
import { composeContent } from "./content";

/**
 * Idioma de la petición actual, leído del segmento raíz `[lang]`.
 * Solo funciona en componentes de servidor; los de cliente usan `useContent`.
 * Si el segmento no es un idioma válido (la página 404 de una ruta rara), se
 * cae al español en lugar de romper.
 */
export const getLocale = cache(async (): Promise<Locale> => {
  const value = await lang();
  return value && hasLocale(value) ? value : defaultLocale;
});

/** Diccionario y datos compuestos para el idioma actual. */
export const getContent = cache(async () => composeContent(await getLocale()));
