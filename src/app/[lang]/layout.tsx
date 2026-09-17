import { ViewTransition } from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { site } from "@/lib/site";
import {
  htmlLang,
  languageAlternates,
  localePath,
  locales,
  ogLocale,
  type Locale,
} from "@/lib/i18n/config";
import { dictionaries } from "@/lib/i18n/content";
import { getContent, getLocale } from "@/lib/i18n/server";
import { LocaleProvider } from "@/lib/i18n/client";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* El serif del logotipo FluxWeb se continúa en los títulos. */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

/* Solo existen estos dos idiomas: cualquier otro segmento es un 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = dictionaries[locale];

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t.meta.title,
      template: `%s · ${site.name}`,
    },
    description: t.meta.description,
    applicationName: site.name,
    keywords: t.meta.keywords,
    authors: [{ name: site.legalName, url: site.instagram.url }],
    creator: site.legalName,
    alternates: languageAlternates("/"),
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url: localePath(locale, "/"),
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0e9d6" },
    { media: "(prefers-color-scheme: dark)", color: "#14150e" },
  ],
};

/**
 * Red de seguridad para quien navega sin JavaScript.
 *
 * Motion escribe el estado inicial de sus animaciones como estilo en línea
 * (`opacity: 0`, `transform`, `filter`). Si el script no corre, ese estado se
 * queda congelado y el bloque nunca aparece. Esta hoja solo se aplica dentro de
 * <noscript> y solo pisa estilos en línea, así que las opacidades decorativas
 * que vienen de clases de Tailwind quedan intactas.
 */
const noScriptCss =
  '[data-motion-safe] [style*="opacity"]{opacity:1!important}' +
  '[data-motion-safe] [style*="transform"]{transform:none!important}' +
  '[data-motion-safe] [style*="filter"]{filter:none!important}';

/* Marca que hay JavaScript y aplica el tema guardado antes del primer pintado:
   evita el parpadeo de tema y que el contenido animado nazca invisible. */
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("fluxweb-theme");if(t==="dark"||t==="light"){d.setAttribute("data-theme",t)}}catch(e){}})();`;

function jsonLd(locale: Locale) {
  const t = dictionaries[locale];
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.legalName,
    alternateName: site.name,
    description: t.meta.description,
    email: site.email,
    url: site.url,
    image: `${site.url}/opengraph-image.png`,
    areaServed: "AR",
    sameAs: [site.instagram.url],
    serviceType: t.meta.serviceTypes,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { locale, t } = await getContent();

  return (
    <html
      lang={htmlLang[locale]}
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: noScriptCss }} />
        </noscript>
      </head>
      <body
        data-motion-safe=""
        className="flex min-h-full flex-col bg-paper text-ink"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale)) }}
        />
        <LocaleProvider locale={locale}>
          <a
            href="#contenido"
            className="sr-only rounded-full focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-accent-ink"
          >
            {t.nav.skip}
          </a>
          <SiteHeader />
          {/* Transición entre rutas: la portada y la página de marca se
              encadenan en vez de cortar en seco. */}
          <ViewTransition>
            <main id="contenido" className="flex-1">
              {children}
            </main>
          </ViewTransition>
          <SiteFooter />
          <div className="grain" aria-hidden="true" />
          <RevealObserver />
          <SmoothScroll />
        </LocaleProvider>
      </body>
    </html>
  );
}
