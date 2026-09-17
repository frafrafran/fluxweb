"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

/** Opacidad de la palabra que todavía no se leyó. 0.55 sobre el papel de la
 *  marca da 3.5:1, así que el texto apagado sigue siendo legible si alguien
 *  se detiene a mitad de la sección. */
const DIM = 0.55;

/**
 * Texto que se enciende palabra por palabra a medida que se lee.
 * El patrón lo popularizó Magic UI (MIT); esta implementación es propia,
 * con un piso de opacidad accesible en lugar de arrancar en cero.
 *
 * Se usa una sola vez en el sitio: en el bloque donde el ritmo de lectura
 * es el mensaje, la duda del cliente que compara y se va.
 */
export function ScrollRevealText({
  text,
  className = "",
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "h2";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = text.split(" ");

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLParagraphElement>}
      className={className}
    >
      {words.map((word, index) => (
        <Word
          key={`${word}-${index}`}
          progress={scrollYProgress}
          range={[index / words.length, (index + 1.6) / words.length]}
        >
          {word}
        </Word>
      ))}
    </Tag>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [DIM, 1]);

  return (
    <span className="inline-block">
      {/* La palabra apagada queda en el flujo del texto: no se mueve nada al encenderse. */}
      <motion.span style={{ opacity }} className="inline-block">
        {children}
      </motion.span>
      <span className="inline-block">&nbsp;</span>
    </span>
  );
}
