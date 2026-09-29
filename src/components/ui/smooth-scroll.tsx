"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll suavizado (Lenis, MIT).
 * Da continuidad al recorrido y hace que las secciones fijas se sientan
 * conducidas en vez de saltar. Se apaga por completo si el sistema pide
 * menos movimiento, y el scroll nativo sigue funcionando sin JavaScript.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) return;

    const lenis = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      // Los enlaces internos los resuelve Lenis, descontando el encabezado fijo.
      anchors: { offset: -96 },
      autoRaf: true,
      // Se frena mientras <html> tiene overflow:hidden. Sin esto la rueda
      // seguía moviendo la página detrás de la galería ampliada y del menú.
      autoToggle: true,
    });

    // Si la persona cambia la preferencia con la página abierta, se desactiva.
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) lenis.destroy();
    };
    query.addEventListener("change", onChange);

    return () => {
      query.removeEventListener("change", onChange);
      lenis.destroy();
    };
  }, []);

  return null;
}
