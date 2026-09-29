"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { LampContainer } from "@/components/ui/lamp";
import { useContent } from "@/lib/i18n/client";

/**
 * Banda con lámpara: el compromiso del estudio antes de las preguntas
 * frecuentes. La luz cenital pone el foco en una sola frase, que es
 * justamente lo que hace falta acá.
 */
export function PromiseBand() {
  const reduce = useReducedMotion();
  const { t } = useContent();

  return (
    <section aria-label={t.promise.aria}>
      <LampContainer>
        {/* Con «reducir movimiento» la transición dura 0: la preferencia se
            conoce después de hidratar, cuando el estado inicial ya se montó. */}
        <motion.h2
          initial={reduce ? false : { opacity: 0.5, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={
            reduce
              ? { duration: 0 }
              : { delay: 0.25, duration: 0.8, ease: "easeInOut" }
          }
          className="max-w-[18ch] font-display text-display-xl font-medium text-[#f0e9d6]"
        >
          {t.promise.title}
        </motion.h2>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={
            reduce
              ? { duration: 0 }
              : { delay: 0.45, duration: 0.7, ease: "easeInOut" }
          }
          className="mt-6 max-w-[52ch] text-lg leading-relaxed text-[#c3c4ac]"
        >
          {t.promise.body}
        </motion.p>
      </LampContainer>
    </section>
  );
}
