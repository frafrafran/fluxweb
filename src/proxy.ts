import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

/**
 * Enrutado por idioma.
 * Todas las páginas viven bajo `src/app/[lang]`, pero el español es el idioma
 * base y no lleva prefijo en la URL:
 *   /            -> /es            (reescritura interna, la URL no cambia)
 *   /marca       -> /es/marca
 *   /en, /en/... -> pasan tal cual
 *   /es, /es/... -> redirigen a la versión sin prefijo, para que cada página
 *                   tenga una sola URL.
 * Los archivos (con extensión), `_next` y `api` no pasan por acá: ver `matcher`.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const prefixed = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (prefixed === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (prefixed) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
