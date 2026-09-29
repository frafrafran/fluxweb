"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Container } from "@/components/ui/container";
import { WebGLBoundary } from "@/components/ui/webgl-boundary";
import { Reveal } from "@/components/ui/reveal";
import type { Arc, Marker, Rgb } from "@/components/ui/globe";
import { useContent } from "@/lib/i18n/client";

/* El globo pesa poco, pero crea un contexto WebGL: se carga cuando la sección
   se acerca a la pantalla, no antes. */
const World = dynamic(
  () => import("@/components/ui/globe").then((module) => module.World),
  { ssr: false },
);

type LatLng = [number, number];

const CORDOBA: LatLng = [-31.42, -64.18];
const BUENOS_AIRES: LatLng = [-34.6, -58.38];

/** Color de la marca en el formato de cobe: canales de 0 a 1. */
function rgb(hex: string): Rgb {
  const value = Number.parseInt(hex.slice(1), 16);
  return [(value >> 16) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

const CREAM = rgb("#f0e9d6");
const OLIVE = rgb("#b9bd7a");
const SAND = rgb("#d8d3ab");

const globeColors = {
  base: rgb("#5a5c44"),
  glow: rgb("#3a3c2a"),
  marker: OLIVE,
  arc: CREAM,
};

/**
 * Destinos reales y potenciales del estudio: el trabajo se entrega a
 * distancia, así que el origen siempre es Argentina.
 */
const arcs: Arc[] = [
  { from: CORDOBA, to: [-31.98, -64.55], color: OLIVE },
  { from: CORDOBA, to: BUENOS_AIRES, color: CREAM },
  { from: BUENOS_AIRES, to: [-33.45, -70.67], color: SAND },
  { from: CORDOBA, to: [-34.9, -56.16], color: OLIVE },
  { from: BUENOS_AIRES, to: [-23.55, -46.63], color: CREAM },
  { from: CORDOBA, to: [19.43, -99.13], color: SAND },
  { from: BUENOS_AIRES, to: [40.42, -3.7], color: OLIVE },
  { from: CORDOBA, to: [25.76, -80.19], color: CREAM },
  { from: BUENOS_AIRES, to: [51.51, -0.13], color: SAND },
  { from: CORDOBA, to: [41.39, 2.17], color: OLIVE },
  { from: BUENOS_AIRES, to: [4.71, -74.07], color: CREAM },
  { from: CORDOBA, to: [-12.05, -77.04], color: SAND },
];

/** Los dos orígenes más marcados que los destinos. */
const markers: Marker[] = [
  ...[CORDOBA, BUENOS_AIRES].map((location) => ({ location, size: 0.06 })),
  ...arcs
    .filter((arc) => arc.to !== BUENOS_AIRES)
    .map((arc) => ({ location: arc.to, size: 0.03 })),
];

export function Reach() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();
  const { t } = useContent();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[#1b1d13] py-24 text-[#f0e9d6] sm:py-28">
      <Container size="wide" className="relative z-10">
        <Reveal className="mx-auto max-w-[46ch] text-center">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[#a3a58c]">
            {t.reach.eyebrow}
          </p>
          <h2 className="mx-auto mt-4 max-w-[20ch] font-display text-display-lg font-medium">
            {t.reach.title}
          </h2>
          <p className="mx-auto mt-6 max-w-[48ch] text-lg leading-relaxed text-[#c3c4ac]">
            {t.reach.body}
          </p>
        </Reveal>
      </Container>

      <div
        ref={ref}
        className="relative mx-auto -mt-4 h-[22rem] w-full max-w-5xl sm:h-[26rem] lg:h-[34rem]"
      >
        {visible ? (
          <WebGLBoundary fallback={<StaticGlobe />}>
            {/* Con «reducir movimiento» el globo se dibuja quieto. */}
            <World
              arcs={arcs}
              markers={markers}
              longitude={-52}
              theta={-0.22}
              colors={globeColors}
              still={!!reduce}
            />
          </WebGLBoundary>
        ) : (
          /* Antes de acercarse a la pantalla, y sin JavaScript. */
          <StaticGlobe />
        )}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,#1b1d13,transparent)]"
      />
    </section>
  );
}

/** Alternativa sin WebGL: la misma masa visual, sin canvas. */
function StaticGlobe() {
  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f0e9d6]/15 bg-[radial-gradient(circle_at_35%_30%,rgba(185,189,122,0.28),transparent_65%)] sm:size-80"
    />
  );
}
