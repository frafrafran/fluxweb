"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Container } from "@/components/ui/container";
import { SlidingNumber } from "@/components/motion-primitives/sliding-number";
import { Spotlight } from "@/components/motion-primitives/spotlight";
import { useContent } from "@/lib/i18n/client";
import type { ProcessStep } from "@/lib/i18n/content";

/**
 * Las etapas se apilan mientras se avanza: el movimiento cuenta que el
 * proyecto es una secuencia y que ninguna etapa reemplaza a la anterior.
 */
export function Process() {
  const { t, processSteps } = useContent();
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  /* Etapa en curso, derivada del mismo avance que mueve la barra. */
  const total = processSteps.length;
  const [current, setCurrent] = useState(1);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setCurrent(Math.min(total, Math.max(1, Math.floor(value * total) + 1)));
  });

  return (
    <section id="proceso" className="scroll-mt-24 py-24 sm:py-32 lg:py-40">
      <Container size="wide">
        <div className="max-w-[46ch]">
          <p className="text-eyebrow">{t.process.eyebrow}</p>
          <h2 className="mt-4 font-display text-display-lg font-medium text-ink">
            {t.process.title}
          </h2>
        </div>

        <div className="mt-14 flex gap-6 lg:mt-16 lg:gap-10">
          {/* Barra de avance y contador: juntos vuelven legible cuánto queda
              de la secuencia. El número lo anuncia una región viva para quien
              navega con lector de pantalla. */}
          <div className="hidden shrink-0 lg:block">
            <div className="sticky top-28 flex flex-col items-center gap-4">
              {/* SlidingNumber apila digitos en bloques, asi que el contenedor
                  no puede ser un <p>. */}
              <div
                aria-live="polite"
                aria-atomic="true"
                className="flex items-center gap-1 font-display text-sm text-muted"
              >
                <span className="sr-only">{t.process.stage} </span>
                <span aria-hidden="true" className="text-accent-text">
                  <SlidingNumber value={current} padStart />
                </span>
                <span className="sr-only">
                  {current} {t.process.of} {total}
                </span>
                <span aria-hidden="true">/</span>
                <span aria-hidden="true">0{total}</span>
              </div>
              <div
                aria-hidden="true"
                className="h-[52vh] w-px overflow-hidden bg-line"
              >
                <motion.div
                  style={{ scaleY: scrollYProgress }}
                  className="h-full w-full origin-top bg-accent"
                />
              </div>
            </div>
          </div>

          <div
            ref={container}
            className="min-w-0 flex-1 [--stack-top:5.5rem] lg:[--stack-top:7rem]"
          >
            {processSteps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                total={total}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StepCard({
  step,
  index,
  total,
  progress,
}: {
  step: ProcessStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const isLast = index === total - 1;

  const start = index / total;
  const end = (index + 1) / total;

  // Solo escala: bajar la opacidad volvería translúcida la tarjeta y dejaría
  // ver el texto de la anterior a través de ella.
  const scale = useTransform(progress, [start, end], [1, 0.94]);

  // Cada etapa se detiene un poco más abajo: queda visible el borde de la anterior.
  return (
    <div
      className="sticky"
      style={{ top: `calc(var(--stack-top) + ${index} * 0.85rem)` }}
    >
      <motion.article
        style={
          reduce || isLast
            ? undefined
            : { scale, transformOrigin: "center top" }
        }
        className="surface-panel grid min-h-[min(56vh,26rem)] content-center gap-6 p-8 shadow-[var(--shadow-soft)] sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-12"
      >
        {/* Luz corta que sigue al cursor: da relieve sin tapar el texto. */}
        {reduce ? null : (
          <Spotlight
            size={320}
            className="bg-[radial-gradient(circle_at_center,var(--accent-soft),transparent_70%)]"
          />
        )}

        <div className="lg:col-span-6">
          <h3 className="font-display text-display-md font-medium text-ink">
            {step.title}
          </h3>
          <p className="mt-4 max-w-[38ch] text-lg leading-relaxed text-muted">
            {step.body}
          </p>
        </div>

        <ul className="flex flex-col justify-center gap-3 lg:col-span-5 lg:col-start-8">
          {step.detail.map((item) => (
            <li
              key={item}
              className="flex items-baseline gap-3 text-[0.9375rem] text-ink-soft"
            >
              <span
                aria-hidden="true"
                className="h-px w-5 shrink-0 translate-y-[-0.25rem] bg-accent"
              />
              {item}
            </li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}
