/**
 * Datos del sitio que no cambian con el idioma: nombres propios, enlaces,
 * imágenes, usuarios y colores. Todo el texto que se lee en pantalla vive en
 * `src/lib/i18n/es.ts` y `src/lib/i18n/en.ts`; `src/lib/i18n/content.ts` une
 * las dos cosas en las formas que consumen los componentes.
 */

export const site = {
  name: "FluxWeb",
  legalName: "Flux Webpages",
  email: "fluxwebpages@gmail.com",
  instagram: {
    handle: "@fluxwebpages",
    url: "https://www.instagram.com/fluxwebpages/",
  },
  repo: "https://github.com/frafrafran/fluxweb",
  /**
   * URL pública. Se lee en el build (queda escrita en el HTML: canónica, Open
   * Graph, sitemap), así que con un dominio propio hay que definir
   * NEXT_PUBLIC_SITE_URL en las variables de build de Cloudflare y volver a
   * publicar.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://fluxweb.franciscoaybar2110.workers.dev",
} as const;

/** Secciones de la portada con ancla. El rótulo sale del diccionario. */
export const navLinks = [
  { id: "servicios", href: "/#servicios" },
  { id: "trabajos", href: "/#trabajos" },
  { id: "proceso", href: "/#proceso" },
  { id: "equipo", href: "/#equipo" },
] as const;

export type NavId = (typeof navLinks)[number]["id"];

export const serviceIds = [
  "sitios",
  "tiendas",
  "automatizacion",
  "mantenimiento",
  "marca",
] as const;
export type ServiceId = (typeof serviceIds)[number];

export type ProjectData = {
  slug: "mirande-aybar" | "beclean";
  name: string;
  year: string;
  url: string;
  /** Dominio que se muestra en la barra del marco del hero. */
  host: string;
  image: string;
  /** Preview: desplegado y navegable, todavía sin dominio propio. */
  status: "preview" | "live";
};

export const projectsData: ProjectData[] = [
  {
    slug: "mirande-aybar",
    name: "Mirande Aybar",
    year: "2026",
    url: "https://mirandeaybar.franciscoaybar2110.workers.dev/",
    host: "mirandeaybar.franciscoaybar2110.workers.dev",
    image: "/work/mirande-aybar.webp",
    status: "preview",
  },
  {
    slug: "beclean",
    name: "BeClean",
    year: "2026",
    url: "https://becleanflux.vercel.app/",
    host: "becleanflux.vercel.app",
    image: "/work/beclean-flux.webp",
    status: "preview",
  },
];

/** Showreel de la portada: el video comprimido y su póster. */
export const showreel = {
  src: "/video/showreel.mp4",
  poster: "/video/showreel-poster.webp",
} as const;

/**
 * Vistas reales de los proyectos publicados, usadas en la banda 3D.
 * Se capturaron de los sitios en línea; para sumar un proyecto nuevo,
 * agregar sus capturas en /public/work/vistas y listarlas acá.
 */
export const workViews: string[] = [
  "/work/vistas/mirande-portada.webp",
  "/work/vistas/beclean-datos.webp",
  "/work/vistas/mirande-editorial.webp",
  "/work/vistas/beclean-laboratorio.webp",
  "/work/vistas/beclean-portada.webp",
  "/work/vistas/mirande-catalogo.webp",
  "/work/vistas/beclean-ecuacion.webp",
  "/work/vistas/mirande-sierras.webp",
  "/work/vistas/mirande-listado.webp",
  "/work/vistas/beclean-comparativa.webp",
  "/work/vistas/beclean-industria.webp",
  "/work/vistas/beclean-dosis.webp",
  // La secuencia se repite desplazada para que las cuatro columnas
  // tengan altura suficiente sin repetir imágenes vecinas.
  "/work/vistas/beclean-comparativa.webp",
  "/work/vistas/mirande-catalogo.webp",
  "/work/vistas/beclean-portada.webp",
  "/work/vistas/mirande-editorial.webp",
  "/work/vistas/beclean-dosis.webp",
  "/work/vistas/mirande-portada.webp",
  "/work/vistas/beclean-laboratorio.webp",
  "/work/vistas/mirande-listado.webp",
  "/work/vistas/beclean-envase.webp",
  "/work/vistas/mirande-valle.webp",
];

/**
 * Galería, en columnas con la del medio fija.
 *
 * Todo es trabajo propio: capturas de los sitios publicados de los clientes y
 * de la identidad de FluxWeb, guardadas en `public/work/galeria` a 1440×900.
 * Así la pared mantiene la paleta del estudio en lugar de mezclar fotos de
 * stock.
 *
 * La clave de cada imagen es el nombre del archivo y busca su descripción en el
 * diccionario, así el texto alternativo también cambia de idioma.
 */
export const galleryKeys = [
  ["flux-portada", "beclean-pasos", "mirande-cita", "flux-simbolo"],
  ["flux-identidad", "beclean-portada", "mirande-sierras"],
  ["flux-servicios", "mirande-propiedades", "flux-paleta", "flux-banda"],
] as const;

export type GalleryKey = (typeof galleryKeys)[number][number];

/** Con qué está construido el trabajo. El rol de cada una está traducido. */
export const stackNames = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Motion",
  "GSAP",
  "Three.js",
  "Vercel",
  "Resend",
  "Figma",
] as const;
export type StackName = (typeof stackNames)[number];

export const processIds = [
  "entender",
  "disenar",
  "construir",
  "sostener",
] as const;
export type ProcessId = (typeof processIds)[number];

export const automationIds = [
  "consultas",
  "presupuestos",
  "turnos",
  "reportes",
] as const;
export type AutomationId = (typeof automationIds)[number];

export type TeamData = {
  key: "franciscoaybarr" | "joacopugaa" | "joacocastellanoo";
  name: string;
  initials: string;
  instagram: string;
  handle: string;
};

export const teamData: TeamData[] = [
  {
    key: "franciscoaybarr",
    name: "Francisco Aybar",
    initials: "FA",
    instagram: "https://www.instagram.com/franciscoaybarr/",
    handle: "@franciscoaybarr",
  },
  {
    key: "joacopugaa",
    name: "Joaquín Puga",
    initials: "JP",
    instagram: "https://www.instagram.com/joacopugaa/",
    handle: "@joacopugaa",
  },
  {
    key: "joacocastellanoo",
    name: "Joaquín Castellano",
    initials: "JC",
    instagram: "https://www.instagram.com/joacocastellanoo/",
    handle: "@joacocastellanoo",
  },
];

/** Paleta de la página de marca. Nombre y uso están traducidos. */
export const brandPalette = [
  { key: "olive", hex: "#67683D", swatch: "#67683D", ink: "#F7F2E2" },
  { key: "cream", hex: "#F0E9D6", swatch: "#F0E9D6", ink: "#1B1C12" },
  { key: "creamDeep", hex: "#E5DCC4", swatch: "#E5DCC4", ink: "#1B1C12" },
  { key: "ink", hex: "#1B1C12", swatch: "#1B1C12", ink: "#F0E9D6" },
  { key: "night", hex: "#14150E", swatch: "#14150E", ink: "#F0E9D6" },
  { key: "oliveLight", hex: "#B9BD7A", swatch: "#B9BD7A", ink: "#14150E" },
] as const;

export const brandDownloads = [
  { file: "lockup.svg", format: "SVG" },
  { file: "mark.svg", format: "SVG" },
  { file: "lockup-olive.png", format: "PNG" },
  { file: "lockup-cream.png", format: "PNG" },
  { file: "mark-olive.png", format: "PNG" },
  { file: "mark-cream.png", format: "PNG" },
] as const;
