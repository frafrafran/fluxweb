"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Contenedor con lámpara cenital.
 * Adaptado del efecto "lamp" de Aceternity: misma construcción de conos
 * cónicos enfrentados, pero con la luz cálida de FluxWeb sobre oliva noche
 * en lugar del cian sobre slate, y sin ocupar la pantalla entera.
 */

const BG = "#1b1d13";
const LIGHT = "#b9bd7a";

export function LampContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  /* La luz se abre con scaleX, no con width: no mueve el layout (sin saltos
     de CLS) y, sin JavaScript, la hoja <noscript> resetea transform y la
     lámpara aparece completa en vez de quedar abierta a medias.
     whileInView se mantiene siempre: «reducir movimiento» se conoce después
     de hidratar, cuando el estado inicial ya está montado. Con duración 0
     salta directo al final. */
  const grow = (origin: string) => ({
    initial: reduce ? false : { opacity: 0.5, scaleX: 0.5 },
    whileInView: { opacity: 1, scaleX: 1 },
    viewport: { once: true, amount: 0.3 },
    style: { transformOrigin: origin },
    transition: reduce
      ? { duration: 0 }
      : { delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <div
      className={`relative isolate z-0 flex min-h-[30rem] w-full flex-col items-center justify-center overflow-hidden bg-[#1b1d13] text-[#f0e9d6] sm:min-h-[34rem] ${className}`}
    >
      <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
        <motion.div
          {...grow("right center")}
          style={{
            transformOrigin: "right center",
            backgroundImage: `conic-gradient(var(--conic-position), ${LIGHT}, transparent, transparent)`,
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible opacity-40 [--conic-position:from_70deg_at_center_top]"
        >
          <div
            className="absolute bottom-0 left-0 z-20 h-40 w-full"
            style={{
              backgroundColor: BG,
              maskImage: "linear-gradient(to top, white, transparent)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 z-20 h-full w-40"
            style={{
              backgroundColor: BG,
              maskImage: "linear-gradient(to right, white, transparent)",
            }}
          />
        </motion.div>

        <motion.div
          {...grow("left center")}
          style={{
            transformOrigin: "left center",
            backgroundImage: `conic-gradient(var(--conic-position), transparent, transparent, ${LIGHT})`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] opacity-40 [--conic-position:from_290deg_at_center_top]"
        >
          <div
            className="absolute bottom-0 right-0 z-20 h-full w-40"
            style={{
              backgroundColor: BG,
              maskImage: "linear-gradient(to left, white, transparent)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 z-20 h-40 w-full"
            style={{
              backgroundColor: BG,
              maskImage: "linear-gradient(to top, white, transparent)",
            }}
          />
        </motion.div>

        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#1b1d13] blur-2xl" />
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-[#b9bd7a] opacity-25 blur-3xl" />

        <motion.div
          {...grow("center")}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-24 rounded-full bg-[#b9bd7a] opacity-30 blur-2xl"
        />
        <motion.div
          {...grow("center")}
          className="absolute inset-auto z-50 h-px w-[30rem] -translate-y-28 bg-[#b9bd7a]"
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#1b1d13]" />
      </div>

      {/* El texto va debajo del haz, no dentro: sobre la zona más clara de la
          luz la crema bajaba a 1,7:1 de contraste. */}
      <div className="relative z-50 flex -translate-y-32 flex-col items-center px-5 text-center sm:-translate-y-36">
        {children}
      </div>
    </div>
  );
}
