"use client";

import { useReducedMotion } from "motion/react";
import { TextScramble } from "@/components/motion-primitives/text-scramble";
import { useContent } from "@/lib/i18n/client";

/**
 * El código de error se arma solo al entrar.
 * Es el único guiño de la página: el resto explica en texto plano qué pasó y
 * cómo salir. Si el sistema pide menos movimiento, aparece quieto.
 */
export function NotFoundCode() {
  const reduce = useReducedMotion();
  const { t } = useContent();

  if (reduce) return <p className="text-eyebrow">{t.notFound.code}</p>;

  return (
    <TextScramble as="p" className="text-eyebrow" duration={1.1} speed={0.035}>
      {t.notFound.code}
    </TextScramble>
  );
}
