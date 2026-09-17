import type { ComponentType } from "react";

/**
 * Tipo para los componentes de Motion creados a partir de una etiqueta que se
 * elige en tiempo de ejecución (`as="section"`, `as="ul"`, …).
 *
 * Motion 13 tipa `motion.create()` y el proxy `motion[tag]` con props genéricas,
 * así que un tag dinámico pierde `className`, `ref` y `children`. Este alias
 * los devuelve sin tener que castear en cada punto de uso.
 */
export type DynamicMotionTag = ComponentType<Record<string, unknown>>;
