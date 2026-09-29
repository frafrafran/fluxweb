"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { TextLoop } from "@/components/motion-primitives/text-loop";
import { GlowEffect } from "@/components/motion-primitives/glow-effect";
import { useContent } from "@/lib/i18n/client";

/**
 * Antetítulo de la portada.
 * Enumera lo que hacemos en el mismo renglón, una cosa por vez. Es un rótulo:
 * lo que dice está desarrollado abajo, en Servicios, así que si no corre el
 * JavaScript no se pierde información.
 */
export function HeroEyebrow() {
  const reduce = useReducedMotion();
  const { t } = useContent();
  const items = t.hero.rotating;

  return (
    /* TextLoop necesita un contenedor de bloque para medir, y un <div> dentro
       de un <p> es HTML invalido: el rotulo va en un <div>. */
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-eyebrow">
      <span>{t.hero.eyebrow}</span>
      <span aria-hidden="true" className="text-accent">
        ·
      </span>
      {reduce ? (
        <span className="text-accent-text">{items[0]}</span>
      ) : (
        <TextLoop
          interval={2.6}
          className="text-accent-text"
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </TextLoop>
      )}
    </div>
  );
}

/**
 * Halo del botón principal.
 * Late despacio con los verdes de la marca. Se apaga si el sistema pide menos
 * movimiento y también cuando la portada sale de pantalla: una animación
 * infinita que nadie ve solo gasta batería.
 */
export function CtaGlow() {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { margin: "120px" });
  const reduce = useReducedMotion();

  return (
    <span ref={ref} aria-hidden="true">
      {reduce || !visible ? null : (
        <GlowEffect
          mode="breathe"
          blur="soft"
          scale={0.94}
          duration={7}
          colors={["#67683d", "#8b8c52", "#4e4f2d", "#b9bd7a"]}
          className="rounded-full opacity-40"
        />
      )}
    </span>
  );
}
