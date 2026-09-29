"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Con «reducir movimiento» activado, Motion salta desplazamientos y escalas
 * y deja solo los fundidos. Es la red de seguridad para lo que empieza a
 * animar antes de que useReducedMotion tenga el valor real: la hidratación
 * siempre arranca como si la preferencia estuviera apagada.
 */
export function MotionPreferences({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
