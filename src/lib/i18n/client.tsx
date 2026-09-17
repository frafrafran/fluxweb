"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "./config";
import { composeContent, type Content } from "./content";

const LocaleContext = createContext<Locale>("es");

/**
 * Pone el idioma a disposición de los componentes de cliente.
 * Solo viaja el código del idioma; el diccionario se arma en el cliente con
 * `composeContent`, que ya está en el bundle porque lo usan los formularios.
 */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useContent(): Content {
  const locale = useLocale();
  return useMemo(() => composeContent(locale), [locale]);
}
