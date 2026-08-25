# FluxWeb

Sitio de **Flux Webpages**: estudio de diseño y desarrollo web para emprendimientos.
Presenta el trabajo del equipo y recibe consultas de nuevos proyectos.

## Stack

| Pieza | Elección |
| --- | --- |
| Framework | Next.js 16 (App Router, React Server Components) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 con tokens propios en `src/app/globals.css` |
| Movimiento | CSS para las apariciones, `motion` solo en las islas que lo necesitan |
| Iconos | `@phosphor-icons/react` (import desde `dist/ssr`) |
| Tipografía | Playfair Display, Geist y Geist Mono vía `next/font` |

No hay dependencias de UI ni de animación por fuera de esa lista.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local
npm run dev
```

El sitio queda en <http://localhost:3000>.

Comandos:

```bash
npm run dev     # desarrollo
npm run build   # build de producción
npm run start   # servir el build
npm run lint    # eslint
```

## Variables de entorno

| Variable | Para qué sirve |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Dominio público. Alimenta metadatos, Open Graph y `sitemap.xml`. |
| `RESEND_API_KEY` | Clave de [Resend](https://resend.com) para enviar el formulario de contacto. Vive solo en el servidor. |
| `CONTACT_FROM_EMAIL` | Remitente verificado en Resend. |

Sin `RESEND_API_KEY` el formulario no falla en silencio: le avisa a la persona
que escriba directamente a `fluxwebpages@gmail.com`.

## Mapa del proyecto

```
src/
  app/
    layout.tsx          metadatos, fuentes, tema y datos estructurados
    page.tsx            orden de las secciones de la portada
    marca/              identidad de marca y descargas
    globals.css         tokens de color, tipografía, radios y movimiento
    icon.png            favicon (símbolo sobre oliva)
    opengraph-image.png tarjeta para redes
  components/
    brand/              logotipo y trama de marca
    layout/             encabezado y pie
    sections/           una sección de la portada por archivo
    ui/                 botón, contenedor, apariciones, cambio de tema
  lib/
    site.ts             todo el contenido editable del sitio
    actions/contact.ts  Server Action del formulario
```

Para cambiar textos, servicios, proyectos, equipo o preguntas frecuentes:
`src/lib/site.ts`. Los componentes no tienen contenido escrito adentro.

## Decisiones que conviene conocer

- **El contenido no depende de JavaScript.** Las animaciones de entrada se
  activan solo cuando el script marca `<html class="js">`. Si el JS falla o
  tarda, la página se lee completa igual.
- **Un solo acento.** El oliva `#67683D` viene del logotipo y es el único color
  de marca en toda la página. El modo oscuro usa `#B9BD7A` para sostener el
  contraste.
- **Movimiento con motivo.** Cada animación explica algo: jerarquía en el
  titular, secuencia en el proceso, respuesta en los botones. Todo se apaga con
  `prefers-reduced-motion`.
- **Imágenes reales.** Las capturas de los proyectos son de los sitios
  publicados, servidas en WebP a través de `next/image`.

## Reemplazar más adelante

- Fotos del equipo: guardarlas en `public/team/` recortadas 1:1 y cambiar el
  monograma en `src/components/sections/team.tsx` (hay un TODO en el archivo).
- Dominio propio: actualizar `NEXT_PUBLIC_SITE_URL` y el remitente de Resend.
- Nuevos proyectos: agregar la captura en `public/work/` y una entrada en
  `projects` dentro de `src/lib/site.ts`.

## Despliegue

Pensado para Vercel. Importar el repositorio, cargar las variables de entorno y
publicar. `npm run build` genera todas las rutas estáticas salvo la Server
Action del formulario.
