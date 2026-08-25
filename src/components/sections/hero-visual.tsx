"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { projects } from "@/lib/site";

/**
 * Composición del hero: dos trabajos reales, no maquetas.
 * El parallax es leve y solo aporta profundidad entre las dos piezas.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const frontY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const backY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const [primary, secondary] = projects;

  return (
    <div ref={ref} className="relative">
      <motion.div
        style={reduce ? undefined : { y: backY }}
        className="relative ml-auto w-[86%] overflow-hidden rounded-[var(--r-xl)] border border-line bg-paper-raise shadow-[var(--shadow-deep)]"
      >
        <FrameBar url="mirande-aybar.vercel.app" />
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
        style={reduce ? undefined : { y: frontY }}
        className="absolute -bottom-10 left-0 w-[52%] overflow-hidden rounded-[var(--r-panel)] border border-line bg-paper-raise shadow-[var(--shadow-deep)] sm:-bottom-14"
      >
        <FrameBar url="becleanflux.vercel.app" compact />
        <Image
          src={secondary.image}
          alt={secondary.imageAlt}
          width={2000}
          height={1250}
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 32vw, 330px"
          className="h-auto w-full"
        />
      </motion.div>
    </div>
  );
}

function FrameBar({ url, compact = false }: { url: string; compact?: boolean }) {
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
