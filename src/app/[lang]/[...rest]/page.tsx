import { notFound } from "next/navigation";

/**
 * Cualquier ruta desconocida dentro de un idioma cae acá y dispara el 404 del
 * idioma (`[lang]/not-found.tsx`). Sin esta captura, Next mostraría su página
 * genérica en inglés, fuera del layout del sitio.
 */
export default function CatchAll() {
  notFound();
}
