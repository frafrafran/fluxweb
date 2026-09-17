"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { WebGLBoundary } from "@/components/ui/webgl-boundary";
import { Reveal } from "@/components/ui/reveal";
import type { Arc } from "@/components/ui/globe";
import { useContent } from "@/lib/i18n/client";

/* three.js pesa: solo se descarga cuando la sección entra en pantalla. */
const World = dynamic(
  () => import("@/components/ui/globe").then((module) => module.World),
  { ssr: false },
);

const CORDOBA = { lat: -31.42, lng: -64.18 };
const BUENOS_AIRES = { lat: -34.6, lng: -58.38 };

const CREAM = "#f0e9d6";
const OLIVE = "#b9bd7a";
const SAND = "#d8d3ab";

/**
 * Destinos reales y potenciales del estudio: el trabajo se entrega a
 * distancia, así que el origen siempre es Argentina.
 */
const arcs: Arc[] = [
  {
    order: 1,
    startLat: CORDOBA.lat,
    startLng: CORDOBA.lng,
    endLat: -31.98,
    endLng: -64.55,
    arcAlt: 0.05,
    color: OLIVE,
  },
  {
    order: 1,
    startLat: CORDOBA.lat,
    startLng: CORDOBA.lng,
    endLat: BUENOS_AIRES.lat,
    endLng: BUENOS_AIRES.lng,
    arcAlt: 0.08,
    color: CREAM,
  },
  {
    order: 2,
    startLat: BUENOS_AIRES.lat,
    startLng: BUENOS_AIRES.lng,
    endLat: -33.45,
    endLng: -70.67,
    arcAlt: 0.12,
    color: SAND,
  },
  {
    order: 2,
    startLat: CORDOBA.lat,
    startLng: CORDOBA.lng,
    endLat: -34.9,
    endLng: -56.16,
    arcAlt: 0.1,
    color: OLIVE,
  },
  {
    order: 3,
    startLat: BUENOS_AIRES.lat,
    startLng: BUENOS_AIRES.lng,
    endLat: -23.55,
    endLng: -46.63,
    arcAlt: 0.18,
    color: CREAM,
  },
  {
    order: 3,
    startLat: CORDOBA.lat,
    startLng: CORDOBA.lng,
    endLat: 19.43,
    endLng: -99.13,
    arcAlt: 0.4,
    color: SAND,
  },
  {
    order: 4,
    startLat: BUENOS_AIRES.lat,
    startLng: BUENOS_AIRES.lng,
    endLat: 40.42,
    endLng: -3.7,
    arcAlt: 0.5,
    color: OLIVE,
  },
  {
    order: 4,
    startLat: CORDOBA.lat,
    startLng: CORDOBA.lng,
    endLat: 25.76,
    endLng: -80.19,
    arcAlt: 0.45,
    color: CREAM,
  },
  {
    order: 5,
    startLat: BUENOS_AIRES.lat,
    startLng: BUENOS_AIRES.lng,
    endLat: 51.51,
    endLng: -0.13,
    arcAlt: 0.55,
    color: SAND,
  },
  {
    order: 5,
    startLat: CORDOBA.lat,
    startLng: CORDOBA.lng,
    endLat: 41.39,
    endLng: 2.17,
    arcAlt: 0.52,
    color: OLIVE,
  },
  {
    order: 6,
    startLat: BUENOS_AIRES.lat,
    startLng: BUENOS_AIRES.lng,
    endLat: 4.71,
    endLng: -74.07,
    arcAlt: 0.3,
    color: CREAM,
  },
  {
    order: 6,
    startLat: CORDOBA.lat,
    startLng: CORDOBA.lng,
    endLat: -12.05,
    endLng: -77.04,
    arcAlt: 0.25,
    color: SAND,
  },
];

const globeConfig = {
  pointSize: 3,
  globeColor: "#2b2d1f",
  showAtmosphere: true,
  atmosphereColor: "#f0e9d6",
  atmosphereAltitude: 0.12,
  emissive: "#1b1c12",
  emissiveIntensity: 0.22,
  shininess: 0.85,
  polygonColor: "rgba(240,233,214,0.8)",
  ambientLight: "#b9bd7a",
  directionalLeftLight: "#f0e9d6",
  directionalTopLight: "#f0e9d6",
  pointLight: "#f0e9d6",
  arcTime: 1800,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.45,
};

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
        {visible && !reduce ? (
          <WebGLBoundary fallback={<StaticGlobe />}>
            <World globeConfig={globeConfig} data={arcs} />
          </WebGLBoundary>
        ) : (
          /* Sin movimiento o antes de entrar en pantalla: no se descarga three.js. */
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
