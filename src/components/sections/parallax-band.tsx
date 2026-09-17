"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { FluxKnot } from "@/components/brand/flux-knot";
import { useContent } from "@/lib/i18n/client";

gsap.registerPlugin(ScrollTrigger);

/**
 * Banda de profundidad.
 * Cuatro capas que se mueven a distinta velocidad mientras se recorre la
 * sección, siguiendo la técnica de parallax por capas con GSAP ScrollTrigger.
 * En lugar de ilustraciones de stock, las capas son el propio símbolo de la
 * marca a distintas distancias: el flujo visto de cerca y de lejos.
 */
export function ParallaxBand() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { t } = useContent();

  useEffect(() => {
    if (reduce || !root.current) return;

    const context = gsap.context(() => {
      const layers = [
        { layer: "1", yPercent: 34 },
        { layer: "2", yPercent: 22 },
        { layer: "3", yPercent: 10 },
        { layer: "4", yPercent: -14 },
      ];

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });

      layers.forEach((item, index) => {
        timeline.to(
          `[data-parallax-layer="${item.layer}"]`,
          { yPercent: item.yPercent, ease: "none" },
          index === 0 ? undefined : "<",
        );
      });
    }, root);

    return () => context.revert();
  }, [reduce]);

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

      <FluxKnot
        data-parallax-layer="1"
        className="pointer-events-none absolute -left-[6%] top-[8%] w-[38vw] max-w-[420px] text-accent opacity-[0.09]"
      />
      <FluxKnot
        data-parallax-layer="2"
        className="pointer-events-none absolute -right-[4%] top-[24%] w-[30vw] max-w-[340px] text-accent opacity-[0.14]"
      />

      <div
        data-parallax-layer="3"
        className="relative z-10 mx-auto w-full max-w-[1560px] px-5 text-center sm:px-8 lg:px-12"
      >
        <h2 className="mx-auto max-w-[16ch] font-display text-display-lg font-medium text-ink">
          {t.parallax.title}
        </h2>
        <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
          {t.parallax.body}
        </p>
      </div>

      <FluxKnot
        data-parallax-layer="4"
        className="pointer-events-none absolute -bottom-[12%] left-[12%] w-[22vw] max-w-[260px] text-accent opacity-[0.2]"
      />
    </section>
  );
}
