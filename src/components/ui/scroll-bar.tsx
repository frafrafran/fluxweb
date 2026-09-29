"use client";

import { motion, useScroll } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ScrollProgress } from "@/components/motion-primitives/scroll-progress";

/**
 * Barra de avance del encabezado.
 *
 * ScrollProgress suaviza el valor con un resorte, y ese resorte deja una
 * animación corriendo todo el tiempo. Con «reducir movimiento» activado la
 * barra se ata directo al scroll: sigue diciendo cuánto queda de página, pero
 * sin nada que se mueva por su cuenta.
 */
export function ScrollBar({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (reduce) {
    return (
      <motion.div style={{ scaleX: scrollYProgress }} className={className} />
    );
  }

  return <ScrollProgress className={className} />;
}
