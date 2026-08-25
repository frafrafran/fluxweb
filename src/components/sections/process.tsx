"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Container } from "@/components/ui/container";
import { processSteps, type ProcessStep } from "@/lib/site";

/**
 * Las etapas se apilan mientras se avanza: el movimiento cuenta que el
 * proyecto es una secuencia y que ninguna etapa reemplaza a la anterior.
 */
export function Process() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="proceso" className="scroll-mt-24 py-24 sm:py-32 lg:py-40">
      <Container size="wide">
        <div className="max-w-[46ch]">
          <p className="text-eyebrow">Cómo trabajamos</p>
          <h2 className="mt-4 font-display text-display-lg font-medium text-ink">
            Cuatro etapas, sin sorpresas en el medio.
          </h2>
        </div>

        <div
          ref={container}
          className="mt-14 [--stack-top:5.5rem] lg:mt-16 lg:[--stack-top:7rem]"
        >
          {processSteps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              total={processSteps.length}
              progress={scrollYProgress}
            />
          ))}
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

  const scale = useTransform(progress, [start, end], [1, 0.93]);
  const opacity = useTransform(progress, [start, end], [1, 0.45]);

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
            : { scale, opacity, transformOrigin: "center top" }
        }
        className="surface-panel grid min-h-[min(56vh,26rem)] content-center gap-6 p-8 shadow-[var(--shadow-soft)] sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-12"
      >
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
