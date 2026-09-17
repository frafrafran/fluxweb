"use client";

import { useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";
import { useContent } from "@/lib/i18n/client";
import type { Content } from "@/lib/i18n/content";

/**
 * Con qué está hecho.
 * Dos hileras que corren en sentidos opuestos y se desdibujan contra los
 * bordes, así el bloque no termina en un corte seco. Al pasar el cursor bajan
 * la velocidad para poder leerlas.
 *
 * Con «reducir movimiento» activado las hileras quedan quietas y se leen como
 * dos listas comunes, sin perder ningún nombre.
 */
export function Stack() {
  const reduce = useReducedMotion();
  const { t, stack } = useContent();
  const half = Math.ceil(stack.length / 2);
  const rows = [stack.slice(0, half), stack.slice(half)];

  return (
    <section className="border-t border-line py-24 sm:py-28 lg:py-32">
      <Container size="wide">
        <Reveal className="max-w-[48ch]">
          <p className="text-eyebrow">{t.stack.eyebrow}</p>
          <h2 className="mt-4 font-display text-display-lg font-medium text-ink">
            {t.stack.title}
          </h2>
          <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-muted">
            {t.stack.body}
          </p>
        </Reveal>
      </Container>

      {/* La hilera es mas ancha que la pantalla a proposito: se recorta aca
          para que no empuje el ancho del documento. */}
      <div className="relative mt-14 overflow-hidden lg:mt-16">
        <div className="flex flex-col gap-3">
          {rows.map((row, index) => (
            <Row
              key={index}
              items={row}
              reverse={index === 1}
              still={!!reduce}
            />
          ))}
        </div>

        {/* Los bordes se difuminan en vez de cortarse. */}
        <ProgressiveBlur
          direction="left"
          blurIntensity={0.6}
          className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32"
        />
        <ProgressiveBlur
          direction="right"
          blurIntensity={0.6}
          className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32"
        />
      </div>
    </section>
  );
}

function Row({
  items,
  reverse,
  still,
}: {
  items: Content["stack"];
  reverse: boolean;
  still: boolean;
}) {
  const chips = items.map((item) => (
    <span
      key={item.name}
      className="flex shrink-0 items-baseline gap-3 rounded-full border border-line bg-paper-raise px-6 py-3.5"
    >
      <span className="font-display text-lg text-ink">{item.name}</span>
      <span className="text-sm text-muted">{item.role}</span>
    </span>
  ));

  if (still) {
    return <div className="flex flex-wrap gap-3 px-5 sm:px-8">{chips}</div>;
  }

  return (
    <InfiniteSlider gap={12} speed={26} speedOnHover={7} reverse={reverse}>
      {chips}
    </InfiniteSlider>
  );
}
