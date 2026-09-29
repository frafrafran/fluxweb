"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Cursor } from "@/components/motion-primitives/cursor";

/**
 * Rótulo que sigue al cursor dentro de la tarjeta de un proyecto.
 * Tiene que ser hijo directo del enlace: el componente se engancha a su
 * elemento padre para saber cuándo entra y sale el puntero.
 *
 * En pantallas táctiles nunca aparece —no hay puntero que seguir— y el enlace
 * sigue diciendo «Ver sitio» en texto, así que no es la única señal.
 */
export function WorkCursor({ label }: { label: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <Cursor
      attachToParent
      springConfig={{ bounce: 0.001 }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.24 }}
      variants={{
        initial: { scale: 0.4, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.4, opacity: 0 },
      }}
    >
      <span className="ml-4 mt-4 hidden select-none rounded-full bg-accent px-4 py-2 text-sm text-accent-ink shadow-[var(--shadow-sm)] [@media(pointer:fine)]:block">
        {label}
      </span>
    </Cursor>
  );
}
