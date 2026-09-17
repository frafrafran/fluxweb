"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * Grilla de capturas inclinada en 3D.
 * La técnica viene del marquee 3D que popularizó Aceternity; esta versión es
 * propia y cambia lo que importaba:
 *  · muestra trabajos reales de FluxWeb, no imágenes de demostración
 *  · las líneas de la grilla usan los tokens de la marca, no grises fijos
 *  · las columnas se detienen cuando la sección sale de pantalla
 *  · sin movimiento si el sistema lo pide
 */
export function ThreeDMarquee({
  images,
  className = "",
}: {
  images: string[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.1 });

  const perColumn = Math.ceil(images.length / 4);
  const columns = Array.from({ length: 4 }, (_, index) =>
    images.slice(index * perColumn, index * perColumn + perColumn),
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`block h-full overflow-hidden ${className}`}
    >
      <div className="flex size-full items-center justify-center">
        <div className="relative size-[1720px] shrink-0 scale-[0.34] sm:scale-[0.5] lg:scale-[0.62]">
          {/* El grid rotado se centra sobre la banda: apoyado en la esquina
              superior izquierda, como en el original, solo cubriría un lado. */}
          <div
            style={{
              transform: "translate(-50%, -50%) rotateX(55deg) rotateZ(-45deg)",
            }}
            className="absolute left-1/2 top-1/2 grid size-full grid-cols-4 gap-8 [transform-style:preserve-3d]"
          >
            {columns.map((column, columnIndex) => (
              <motion.div
                key={columnIndex}
                animate={
                  reduce || !inView
                    ? { y: 0 }
                    : { y: columnIndex % 2 === 0 ? 110 : -110 }
                }
                transition={{
                  duration: columnIndex % 2 === 0 ? 14 : 19,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="flex flex-col items-start gap-8"
              >
                <GridLine orientation="vertical" className="-left-4" />
                {column.map((src, imageIndex) => (
                  <div className="relative" key={src + imageIndex}>
                    <GridLine orientation="horizontal" className="-top-4" />
                    <Image
                      src={src}
                      alt=""
                      width={520}
                      height={325}
                      sizes="400px"
                      className="aspect-[8/5] rounded-lg object-cover ring-1 ring-[color:var(--line-strong)]"
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Línea punteada que separa la grilla, desvanecida en los extremos. */
function GridLine({
  orientation,
  className = "",
}: {
  orientation: "horizontal" | "vertical";
  className?: string;
}) {
  const horizontal = orientation === "horizontal";

  return (
    <div
      className={`pointer-events-none absolute z-30 ${className} ${
        horizontal
          ? "left-[-100px] h-px w-[calc(100%+200px)] bg-[linear-gradient(to_right,var(--line-strong),var(--line-strong)_50%,transparent_0,transparent)] [background-size:5px_1px]"
          : "top-[-40px] h-[calc(100%+80px)] w-px bg-[linear-gradient(to_bottom,var(--line-strong),var(--line-strong)_50%,transparent_0,transparent)] [background-size:1px_5px]"
      }`}
      style={{
        maskImage: horizontal
          ? "linear-gradient(to right, transparent, black 12%, black 88%, transparent)"
          : "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
      }}
    />
  );
}
