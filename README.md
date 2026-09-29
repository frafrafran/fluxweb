# FluxWeb

Sitio de **Flux Webpages**: estudio de diseño y desarrollo web para emprendimientos.
Presenta el trabajo del equipo y recibe consultas de nuevos proyectos.

## Stack

| Pieza | Elección |
| --- | --- |
| Framework | Next.js 16 (App Router, React Server Components) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 con tokens propios en `src/app/globals.css` |
| Movimiento | CSS para las apariciones, `motion` en las islas (también el parallax por capas), `lenis` para el scroll |
| Componentes animados | [Motion Primitives](https://motion-primitives.com) (MIT), copiados al repo en `src/components/motion-primitives/` |
| Globo | [`cobe`](https://github.com/shuding/cobe) (MIT, ~13 KB, sin dependencias), solo en la sección de alcance |
| Iconos | `@phosphor-icons/react` (import desde `dist/ssr` en los componentes de servidor) |
| Tipografía | Playfair Display, Geist y Geist Mono vía `next/font` |

No hay dependencias de UI por fuera de esa lista.

Hay dos formas de trabajar con código ajeno en este repo, y la diferencia es la
licencia:

- **Cuando la licencia lo permite, se copia.** Motion Primitives es MIT, así que
  sus componentes viven en `src/components/motion-primitives/` tal como los
  entrega la CLI, y se pueden volver a bajar o actualizar desde el upstream.
- **Cuando no lo permite, se reescribe.** Aceternity UI es propietaria y de
  pago: de ahí solo se estudió la técnica y el código es propio.

| Fuente consultada | Licencia | Qué se tomó |
| --- | --- | --- |
| Lenis | MIT | la librería, instalada tal cual |
| Motion Primitives | MIT | 33 componentes copiados al repo (ver más abajo) |
| Magic UI | MIT | la idea del texto que se enciende palabra por palabra |
| React Bits | MIT + Commons Clause | referencia de interacciones |
| Aceternity UI | propietaria, de pago | patrones reimplementados: foco que sigue al cursor, marquee 3D, lámpara cenital y menú desplegable |

## Motion Primitives

Los componentes están en `src/components/motion-primitives/`, bajados con la
CLI oficial:

```bash
npx motion-primitives@latest add <componente>
```

Requisitos de la guía de instalación, todos ya cumplidos: Tailwind CSS, el
paquete `motion`, y `cn()` en `src/lib/utils.ts`. `components.json` en la raíz
existe para que la CLI sepa dónde escribir.

> La guía enlaza la instalación de Tailwind con Vite. Este proyecto es Next.js,
> así que Tailwind v4 entra por `@tailwindcss/postcss` y `@import "tailwindcss"`
> en `globals.css`. El complemento `@tailwindcss/vite` no corresponde acá.

### Qué se cambió del código original

Se copió tal cual y después se corrigió lo que hacía falta. Cada cambio está
comentado en el archivo donde vive:

| Cambio | Motivo |
| --- | --- |
| Tipos de `motion.create()` y de las etiquetas dinámicas | El upstream apunta a Motion 11/12 y a los tipos viejos de React. Acá corre Motion 13 y React 19: `JSX.IntrinsicElements` ya no es global y las transiciones exigen literales, no `string`. El alias está en `dynamic-tag.ts`. |
| `motion.create()` sacado del render | En `text-shimmer`, `text-shimmer-wave`, `text-scramble` y `morphing-popover` se llamaba durante el render: devolvía un componente nuevo en cada pasada y le reiniciaba el estado. Ahora va memorizado. |
| Íconos de Lucide reemplazados por Phosphor | El proyecto ya trae Phosphor. Eran tres íconos: no justificaban una dependencia más. |
| Rótulos en español | El upstream rotula «Open dialog», «Close dialog», «Next slide». El sitio está en español. |
| `id` de los diálogos | `MorphingDialogContent` apuntaba con `aria-labelledby` a un `id` que ningún componente escribía: el diálogo se abría sin nombre accesible. |
| Colores de marca | Las escalas `zinc` y el velo blanco/negro fijos pasaron a los tokens del proyecto. |
| Flechas del carrusel | El upstream las saca fuera del carrusel (`left: -12.5%`, ancho `125%`). En una pantalla de 390 px eso empujaba el ancho del documento nueve píxeles. |

Las reglas de ESLint que quedan en aviso para esa carpeta (`any` y `@ts-ignore`
heredados de react-aria, `setState` de montaje) están declaradas en
`eslint.config.mjs`. El resto del proyecto sigue en estricto.

### Dónde se usa cada uno

| Componente | Dónde |
| --- | --- |
| ScrollProgress | barra de avance del encabezado, en todas las páginas |
| Scroll Expansion Hero (21st.dev) | showreel que crece al bajar, después de la portada. Reescrito: el original captura la rueda y el táctil de toda la ventana y fuerza el scroll a cero hasta terminar; acá la expansión sale del scroll real, convive con Lenis y funciona con teclado. Vive en `src/components/ui/scroll-expansion-hero.tsx` |
| MorphingPopover | atajo de contacto del encabezado |
| TextEffect | titular de la banda oscura |
| InfiniteSlider | banda «Con qué lo construimos»; se detiene fuera de pantalla (prop `paused`) |
| SlidingNumber | contador de las etapas del proceso (quieto con «reducir movimiento») |
| TransitionPanel + TextMorph | panel de casos de automatización |
| AnimatedBackground | pastilla del selector de casos y filas del equipo |
| MorphingDialog | ampliar cualquier captura de la galería |
| BorderTrail + TextShimmer | formulario de contacto mientras se envía |
| TextScramble | código de error de la página 404 |
| InView | entrada escalonada de las capturas de la galería |

Quedaron sin usar: `accordion`, `disclosure`, `dialog`, `image-comparison`,
`animated-group`, `animated-number`, `text-roll`, `text-shimmer-wave` y los
que salieron en la auditoría contra sitios de agencias: `spinning-text` (el
sello de la portada), `magnetic`, `glow-effect`, `text-loop`, `dock`, `tilt`,
`cursor`, `spotlight` y `progressive-blur`. El movimiento lo pone el trabajo,
no la interfaz. Además `magnetic`, `dock` y `sliding-number` usan `useSpring`,
que no respeta el `reducedMotion` de `MotionConfig`: seguían moviéndose con
«reducir movimiento». Siguen en la carpeta y no pesan en el bundle, porque
nada los importa. Cuatro se descartaron por motivos concretos:

- **`accordion` y `disclosure`** habrían reemplazado el `<details>` nativo de
  las preguntas frecuentes, que ya es accesible por teclado y funciona sin
  JavaScript. Cambiarlo era perder algo a cambio de nada.
- **`image-comparison`** necesita un antes y un después que no existe, y
  fabricarlo sería inventar un trabajo que no hicimos.
- **`animated-number`** cuenta hasta una cifra. No hay ninguna métrica real que
  mostrar: poner una inventada sería peor que no tener el efecto.

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
  proxy.ts              enrutado por idioma: / es español, /en es inglés
  app/
    [lang]/
      layout.tsx        metadatos por idioma, fuentes, tema y datos estructurados
      page.tsx          orden de las secciones de la portada
      marca/            identidad de marca y descargas
      not-found.tsx     404 en el idioma de la ruta
      [...rest]/        captura cualquier ruta desconocida y dispara ese 404
    globals.css         tokens de color, tipografía, radios y movimiento
    icon.png            favicon (símbolo sobre oliva)
    opengraph-image.png tarjeta para redes
    sitemap.ts          una entrada por página e idioma
  components/
    brand/              logotipo y trama de marca
    layout/             encabezado y pie
    motion-primitives/  componentes de terceros (MIT), ver abajo
    sections/           una sección de la portada por archivo
    ui/                 botón, contenedor, apariciones, cambio de tema
  lib/
    site.ts             datos que no cambian con el idioma: enlaces, imágenes, equipo
    i18n/
      es.ts             todo el texto del sitio en español
      en.ts             todo el texto del sitio en inglés
      content.ts        une datos y texto en las formas que usan los componentes
      server.ts         `getContent()` para componentes de servidor
      client.tsx        `useContent()` para componentes de cliente
    utils.ts            `cn()`, el ayudante que piden los componentes de terceros
    actions/contact.ts  Server Action del formulario
public/
  video/                showreel comprimido (2,6 MB) y su póster
```

Para cambiar textos, servicios, proyectos, equipo o preguntas frecuentes:
`src/lib/i18n/es.ts` y `src/lib/i18n/en.ts`. Para enlaces, capturas o
integrantes: `src/lib/site.ts`. Los componentes no tienen contenido escrito
adentro.

## Idiomas

El sitio está en español y en inglés.

| URL | Idioma |
| --- | --- |
| `/`, `/marca` | español (base, sin prefijo) |
| `/en`, `/en/marca` | inglés |
| `/es`, `/es/marca` | redirigen a la versión sin prefijo |

Cómo funciona:

- Todas las páginas viven bajo `src/app/[lang]`. `src/proxy.ts` reescribe `/`
  a `/es` sin cambiar la URL y deja pasar `/en`. Los archivos, `_next` y `api`
  no pasan por el proxy.
- Los componentes de servidor piden el idioma con `getContent()`, que lo lee
  del segmento `[lang]` mediante `next/root-params`: no hay que pasarlo por
  props. Los de cliente usan `useContent()`, que lo toma de un contexto.
- `en.ts` está tipado con las claves de `es.ts`: si falta una traducción, el
  build no pasa.
- El formulario manda el idioma en un campo oculto, porque una Server Action
  no puede leer la ruta. La respuesta vuelve en ese idioma.
- Cada página declara `hreflang` para las dos versiones, `<html lang>` cambia,
  y el sitemap lista las cuatro URL con sus alternativas.
- El botón «EN / ES» del encabezado lleva a la misma página en el otro idioma.

Para agregar un idioma: sumarlo a `locales` en `src/lib/i18n/config.ts`,
crear su diccionario y registrarlo en `dictionaries` dentro de `content.ts`.

## Decisiones que conviene conocer

- **El contenido no depende de JavaScript.** Las animaciones de entrada se
  activan solo cuando el script marca `<html class="js">`. Si el JS falla o
  tarda, la página se lee completa igual.
- **Los componentes de terceros no rompen esa promesa.** Motion escribe el
  estado inicial de sus animaciones como estilo en línea (`opacity: 0`). Sin
  JavaScript ese estado se congela y el bloque no aparece nunca. Por eso el
  `layout` incluye una hoja dentro de `<noscript>` que neutraliza los estilos
  en línea de opacidad, transformación y desenfoque. Solo pisa estilos en
  línea: las opacidades decorativas, que vienen de clases de Tailwind, quedan
  intactas.
- **Un solo acento.** El oliva `#67683D` viene del logotipo y es el único color
  de marca en toda la página. El modo oscuro usa `#B9BD7A` para sostener el
  contraste.
- **Movimiento con motivo.** Cada animación explica algo: jerarquía en el
  titular, secuencia en el proceso, respuesta en los botones. Todo se apaga con
  `prefers-reduced-motion`.
- **Imágenes reales.** Las capturas de los proyectos son de los sitios
  publicados, servidas en WebP a través de `next/image`, y se muestran enteras:
  ningún efecto recorta el trabajo que estamos mostrando.
- **Logotipo vectorial.** `mark.svg` y `lockup.svg` se trazaron desde el
  original. Pesan 2 y 4.7 KB, se pintan con `currentColor` y el símbolo del
  hero se dibuja a sí mismo al cargar.
- **Scroll suavizado con Lenis**, apagado por completo si el sistema pide menos
  movimiento. Va con `autoToggle`: se frena cuando `<html>` pasa a
  `overflow: hidden`, así que la galería ampliada y el menú bloquean el scroll
  desde `<html>` y no desde `<body>` (Lenis no mira el de `<body>`). Las
  transiciones entre rutas usan `ViewTransition` de React.
- **GSAP salió del sitio**: el parallax por capas lo hace Motion, que la página
  ya carga (unos 46 KB comprimidos menos de JS inicial). Sigue en la lista de
  Stack porque se usa en BeClean.
- **El globo usa cobe**, no three.js: pasó de 622 KB comprimidos a unos 5 KB.
  Igual se carga recién cuando la sección se acerca a la pantalla, porque crea
  un contexto WebGL, y solo dibuja mientras está visible. Con «reducir
  movimiento» se dibuja quieto. Si el navegador no puede crear el contexto
  WebGL, `WebGLBoundary` muestra la alternativa estática. En pantallas táctiles
  va a 1,5× de densidad, con la mitad de puntos, sin antialias, a 30 cuadros
  por segundo y quieto mientras se desplaza la página: antes trababa el scroll.
- **«Reducir movimiento» se lee con `src/lib/use-reduced-motion.ts`**, no con
  el hook de Motion: el de Motion lee la preferencia en el primer render del
  cliente y rompe la hidratación (error #418) cuando está activada.
- **Las capturas de la banda 3D y de la galería** salen de los sitios
  publicados y de la identidad de FluxWeb, sin fotos de stock. Para sumar un
  proyecto: capturas en `public/work/vistas` (banda 3D, 520×325) y
  `public/work/galeria` (1440×900), entradas en `workViews` y `galleryKeys`
  dentro de `src/lib/site.ts`, y el texto alternativo en los dos diccionarios.
- **La galería en el teléfono** usa dos columnas que se deslizan en sentidos
  opuestos con el scroll (`gallery-parallax.tsx`); en escritorio sigue la
  columna central fija.

## Nota sobre OneDrive

El proyecto vive dentro de una carpeta sincronizada. Si `next build` falla con
`EPERM ... unlink .next/...`, es OneDrive tomando archivos mientras compila.
Se resuelve con `rm -rf .next` antes de compilar, o excluyendo `.next` de la
sincronización.

## Reemplazar más adelante

- Fotos del equipo: guardarlas en `public/team/` recortadas 1:1 y cambiar el
  monograma en `src/components/sections/team.tsx` (hay un TODO en el archivo).
- Dominio propio: actualizar `NEXT_PUBLIC_SITE_URL` y el remitente de Resend.
- Nuevos proyectos: agregar la captura en `public/work/` y una entrada en
  `projects` dentro de `src/lib/site.ts`.

## Despliegue en Cloudflare

El sitio corre en Cloudflare Workers con el adaptador oficial
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare):
<https://fluxweb.franciscoaybar2110.workers.dev>

| Archivo | Para qué |
| --- | --- |
| `wrangler.jsonc` | nombre del Worker, bindings (assets, imágenes) y flags de compatibilidad |
| `open-next.config.ts` | caché incremental sobre assets estáticos: todo el sitio es SSG, no hace falta R2 ni KV |
| `public/_headers` | caché de un año para `/_next/static` |
| `src/proxy.ts` | corre en el Worker igual que en local |

Comandos:

```bash
npm run preview   # build + vista previa local en el runtime de Workers (workerd)
npm run deploy    # build + publicación a Cloudflare
```

### Publicación automática desde Git

Con el repositorio conectado, **cada push a `main` publica solo** y cada rama
tiene su URL de vista previa. Se conecta una vez desde el panel:

1. Cloudflare → *Workers & Pages* → **fluxweb** → *Settings* → *Build* →
   *Connect to Git* y elegir `frafrafran/fluxweb`.
2. Build command: `npx opennextjs-cloudflare build`
   Deploy command: `npx opennextjs-cloudflare deploy`
   Non-production branch deploy command: `npx opennextjs-cloudflare upload`
3. Variables de build (opcionales): `NEXT_PUBLIC_SITE_URL` cuando haya dominio
   propio. Secretos de ejecución (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`) en
   *Settings* → *Variables and Secrets*, o con `npx wrangler secret put`.

### Notas

- `NEXT_PUBLIC_SITE_URL` se lee en el build y queda escrita en el HTML
  (canónica, Open Graph, sitemap). Cambiarla implica volver a publicar.
- Las páginas pregeneradas se sirven por la caché incremental. `preview` y
  `deploy` la llenan solos (`populateCache`); si se corre `wrangler dev` a
  mano hay que llenarla antes con `npx opennextjs-cloudflare populateCache local`.
- El adaptador pide Next 16.3.3 o superior (excluye 16.3.0–16.3.2).
