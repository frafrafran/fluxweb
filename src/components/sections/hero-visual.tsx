"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useContent } from "@/lib/i18n/client";

/**
 * Composición del hero: dos trabajos reales, no maquetas.
 * Tres capas de movimiento, cada una con su motivo:
 *  · parallax de scroll, que separa las dos piezas en profundidad
 *  · inclinación según el puntero, que las vuelve objetos y no imágenes
 *  · escala al salir, que entrega el protagonismo a la sección siguiente
 * Todo se resuelve con valores de movimiento, sin renders de React.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { projects } = useContent();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const frontY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const backY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = { stiffness: 140, damping: 20, mass: 0.6 };
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [6, -6]),
    spring,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-8, 8]),
    spring,
  );

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const [primary, secondary] = projects;

  return (
    <div
      ref={ref}
      onPointerMove={reduce ? undefined : onPointerMove}
      onPointerLeave={reduce ? undefined : resetPointer}
      className="relative [perspective:1400px]"
    >
      <motion.div
        style={reduce ? undefined : { rotateX, rotateY }}
        className="relative [transform-style:preserve-3d]"
      >
        <motion.div
          style={reduce ? undefined : { y: backY, translateZ: 0 }}
          className="relative ml-auto w-[86%] overflow-hidden rounded-[var(--r-xl)] border border-line bg-paper-raise shadow-[var(--shadow-deep)]"
        >
          <FrameBar url={primary.host} />
          <Image
            src={primary.image}
            alt={primary.imageAlt}
            width={2000}
            height={1250}
            priority
            sizes="(max-width: 640px) 86vw, (max-width: 1024px) 60vw, 620px"
            className="h-auto w-full"
          />
        </motion.div>

        <motion.div
          style={reduce ? undefined : { y: frontY, translateZ: 60 }}
          className="absolute -bottom-10 left-0 w-[52%] overflow-hidden rounded-[var(--r-panel)] border border-line bg-paper-raise shadow-[var(--shadow-deep)] sm:-bottom-14"
        >
          <FrameBar url={secondary.host} compact />
          <Image
            src={secondary.image}
            alt={secondary.imageAlt}
            width={2000}
            height={1250}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 32vw, 330px"
            className="h-auto w-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function FrameBar({
  url,
  compact = false,
}: {
  url: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center border-b border-line bg-paper-raise ${
        compact ? "h-7 px-3" : "h-9 px-4"
      }`}
    >
      <span
        className={`truncate font-mono text-muted ${
          compact ? "text-[0.5625rem]" : "text-[0.6875rem]"
        }`}
      >
        {url}
      </span>
    </div>
  );
}
