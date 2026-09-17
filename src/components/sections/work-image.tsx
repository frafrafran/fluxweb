"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Tilt } from "@/components/motion-primitives/tilt";

/**
 * Captura del proyecto dentro de su marco.
 * La captura se ve entera, sin recortes: es el trabajo que estamos mostrando.
 * La profundidad viene de tres capas que no se pisan: el marco sube y baja con
 * el scroll, se inclina hacia donde está el cursor y la imagen se acerca un
 * poco. Con «reducir movimiento» activado queda quieta y plana.
 */
export function WorkImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [22, -22]);

  const frame = (
    <div className="overflow-hidden rounded-[var(--r-xl)] border border-line bg-paper shadow-[var(--shadow-soft)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-deep)]">
      <Image
        src={src}
        alt={alt}
        width={2000}
        height={1250}
        sizes="(max-width: 1024px) 92vw, 780px"
        className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
      />
    </div>
  );

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { y }}
      className={className}
    >
      {reduce ? (
        frame
      ) : (
        <Tilt rotationFactor={4.5} isRevese className="rounded-[var(--r-xl)]">
          {frame}
        </Tilt>
      )}
    </motion.div>
  );
}
