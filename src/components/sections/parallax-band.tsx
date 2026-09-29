"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { FluxKnot } from "@/components/brand/flux-knot";
import { useContent } from "@/lib/i18n/client";

/**
 * Banda de profundidad.
 * Tres nudos que se mueven a distinta velocidad mientras se recorre la
 * sección: el propio símbolo de la marca a distintas distancias, el flujo
 * visto de cerca y de lejos. El texto no se mueve.
 *
 * Antes era GSAP con ScrollTrigger (unos 46 KB comprimidos solo para esto);
 * ahora lo resuelve Motion, que la página ya carga. Con «reducir movimiento»
 * las capas quedan quietas.
 */
export function ParallaxBand() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { t } = useContent();

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start end", "end start"],
  });
  const lejos = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const medio = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const cerca = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);

  return (
    <section
      ref={root}
      aria-label={t.parallax.aria}
      className="relative isolate flex min-h-[34rem] items-center overflow-hidden bg-paper-sink py-24 sm:min-h-[40rem]"
    >
      {/* Trama de fondo, la capa más lejana. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_55%,transparent_100%)]"
      />

      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: lejos }}
        className="pointer-events-none absolute -left-[6%] top-[8%] w-[38vw] max-w-[420px]"
      >
        <FluxKnot className="w-full text-accent opacity-[0.09]" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: medio }}
        className="pointer-events-none absolute -right-[4%] top-[24%] w-[30vw] max-w-[340px]"
      >
        <FluxKnot className="w-full text-accent opacity-[0.14]" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-5 text-center sm:px-8 lg:px-12">
        <h2 className="mx-auto max-w-[16ch] font-display text-display-lg font-medium text-ink">
          {t.parallax.title}
        </h2>
        <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
          {t.parallax.body}
        </p>
      </div>

      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: cerca }}
        className="pointer-events-none absolute -bottom-[12%] left-[12%] w-[22vw] max-w-[260px]"
      >
        <FluxKnot className="w-full text-accent opacity-[0.2]" />
      </motion.div>
    </section>
  );
}
