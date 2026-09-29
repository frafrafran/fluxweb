"use client";

import { useSyncExternalStore } from "react";

const CONSULTA = "(prefers-reduced-motion: reduce)";

function suscribir(avisar: () => void) {
  const media = window.matchMedia(CONSULTA);
  media.addEventListener("change", avisar);
  return () => media.removeEventListener("change", avisar);
}

/**
 * «Reducir movimiento» sin romper la hidratación.
 *
 * El useReducedMotion de Motion lee la preferencia ya en el primer render del
 * cliente. Si está activada, ese render no coincide con el HTML del servidor
 * y React descarta la página entera para volver a dibujarla (error #418).
 * Acá el servidor y la hidratación usan `false`, y el valor real entra en el
 * render siguiente. Mientras tanto, y sin JavaScript, el CSS de globals.css
 * y el MotionConfig del layout ya frenan el movimiento.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    suscribir,
    () => window.matchMedia(CONSULTA).matches,
    () => false,
  );
}
