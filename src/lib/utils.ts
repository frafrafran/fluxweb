import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Une clases de Tailwind resolviendo conflictos: la última gana.
 * Es el helper que piden los componentes de Motion Primitives y evita el
 * problema que ya nos mordió antes, cuando una clase de una variante perdía
 * contra la clase base del componente.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
