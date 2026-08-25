import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RevealObserver } from "@/components/ui/reveal-observer";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Webs a medida para emprendimientos`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "diseño web",
    "desarrollo web",
    "páginas web para emprendimientos",
    "automatización de procesos",
    "tienda online",
    "Argentina",
  ],
  authors: [{ name: site.legalName, url: site.instagram.url }],
  creator: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · Webs a medida para emprendimientos`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Webs a medida para emprendimientos`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0e9d6" },
    { media: "(prefers-color-scheme: dark)", color: "#14150e" },
  ],
};

/* Marca que hay JavaScript y aplica el tema guardado antes del primer pintado:
   evita el parpadeo de tema y que el contenido animado nazca invisible. */
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("fluxweb-theme");if(t==="dark"||t==="light"){d.setAttribute("data-theme",t)}}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  alternateName: site.name,
  description: site.description,
  email: site.email,
  url: site.url,
  image: `${site.url}/opengraph-image.png`,
  areaServed: "AR",
  sameAs: [site.instagram.url],
  serviceType: [
    "Diseño web",
    "Desarrollo web",
    "Tiendas online",
    "Automatización de procesos",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#contenido"
          className="sr-only rounded-full focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-accent-ink"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <div className="grain" aria-hidden="true" />
        <RevealObserver />
      </body>
    </html>
  );
}
