"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import useMeasure from "react-use-measure";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";
import { useContent } from "@/lib/i18n/client";
import type { Content } from "@/lib/i18n/content";

/**
 * Ancho mínimo que puede medir una pastilla, en píxeles.
 *
 * InfiniteSlider dibuja la lista dos veces y la desplaza exactamente el ancho
 * de una copia. Si esa copia es más angosta que la pantalla, al llegar al final
 * de la segunda queda un hueco: era lo que pasaba con media lista por hilera.
 * Con esta cota inferior se calcula cuántas veces repetir para que una copia
 * siempre sobre. Es deliberadamente baja: repetir de más no se nota, repetir de
 * menos deja el hueco.
 */
const ANCHO_MINIMO_PASTILLA = 130;

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
  const [banda, { width }] = useMeasure();

  /* Las dos hileras llevan la lista completa, arrancando por distinto lugar:
     así ninguna queda corta y no se leen como la misma cinta repetida. */
  const mitad = Math.ceil(stack.length / 2);
  const hileras = [stack, [...stack.slice(mitad), ...stack.slice(0, mitad)]];

  return (
    <section className="pb-16 pt-20 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
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

      {/* La hilera es más ancha que la pantalla a propósito: se recorta acá
          para que no empuje el ancho del documento. En el teléfono los bordes
          se funden con una máscara: el desenfoque apila dieciséis capas de
          backdrop-filter sobre algo que se mueve, y ahí cuesta batería. */}
      <div
        ref={banda}
        className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_2rem,#000_calc(100%-2rem),transparent)] sm:[mask-image:none] lg:mt-16"
      >
        <div className="flex flex-col gap-3">
          {hileras.map((hilera, index) => (
            <Hilera
              key={index}
              items={hilera}
              ancho={width}
              reverse={index === 1}
              quieta={!!reduce}
            />
          ))}
        </div>

        {/* Los bordes se difuminan en vez de cortarse. */}
        <ProgressiveBlur
          direction="left"
          blurIntensity={0.6}
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 sm:block"
        />
        <ProgressiveBlur
          direction="right"
          blurIntensity={0.6}
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-32 sm:block"
        />
      </div>
    </section>
  );
}

function Hilera({
  items,
  ancho,
  reverse,
  quieta,
}: {
  items: Content["stack"];
  ancho: number;
  reverse: boolean;
  quieta: boolean;
}) {
  const [vueltaRef, { width: medido }] = useMeasure();

  const pastillas = items.map((item) => (
    <span
      key={item.name}
      className="flex shrink-0 items-baseline gap-2.5 rounded-full border border-line bg-paper-raise px-5 py-3 sm:gap-3 sm:px-6 sm:py-3.5"
    >
      <span className="font-display text-base text-ink sm:text-lg">
        {item.name}
      </span>
      <span className="text-sm text-muted">{item.role}</span>
    </span>
  ));

  if (quieta) {
    return (
      <div className="flex flex-wrap gap-3 px-5 sm:px-8">{pastillas}</div>
    );
  }

  /* Antes de la primera medición se asume una pantalla ancha y una pastilla
     angosta: así la hilera nace completa en vez de aparecer corta. En cuanto
     hay medida real de una vuelta se usa esa, que da el número exacto. El
     ancho de la vuelta no depende del número de repeticiones, así que el
     cálculo se estabiliza en la primera pasada. */
  const disponible = ancho || 1600;
  const anchoVuelta = medido || items.length * ANCHO_MINIMO_PASTILLA;
  const repeticiones = Math.max(1, Math.ceil(disponible / anchoVuelta));

  return (
    <InfiniteSlider gap={12} speed={26} speedOnHover={7} reverse={reverse}>
      {Array.from({ length: repeticiones }, (_, vuelta) => (
        <div
          key={vuelta}
          ref={vuelta === 0 ? vueltaRef : undefined}
          className="flex shrink-0 gap-3"
        >
          {pastillas}
        </div>
      ))}
    </InfiniteSlider>
  );
}
