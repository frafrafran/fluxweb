"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Color, Fog, PerspectiveCamera, Scene, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import countries from "@/data/globe.json";

extend({ ThreeGlobe });

const RING_SPEED = 3;
const ASPECT = 1.2;
const CAMERA_Z = 300;

export type Arc = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

type WorldProps = { globeConfig: GlobeConfig; data: Arc[] };

function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<import("three").Group>(null);
  const [ready, setReady] = useState(false);

  const config = {
    pointSize: 1,
    atmosphereColor: "#f0e9d6",
    showAtmosphere: true,
    atmosphereAltitude: 0.12,
    polygonColor: "rgba(240,233,214,0.6)",
    globeColor: "#23251a",
    emissive: "#1b1c12",
    emissiveIntensity: 0.12,
    shininess: 0.85,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  useEffect(() => {
    if (globeRef.current || !groupRef.current) return;
    globeRef.current = new ThreeGlobe();
    groupRef.current.add(globeRef.current);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!globeRef.current || !ready) return;
    const material = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    material.color = new Color(config.globeColor);
    material.emissive = new Color(config.emissive);
    material.emissiveIntensity = config.emissiveIntensity;
    material.shininess = config.shininess;
  }, [
    ready,
    config.globeColor,
    config.emissive,
    config.emissiveIntensity,
    config.shininess,
  ]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !ready || !data) return;

    const points = data.flatMap((arc) => [
      {
        size: config.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      },
      {
        size: config.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      },
    ]);

    const unique = points.filter(
      (point, index, all) =>
        all.findIndex(
          (other) => other.lat === point.lat && other.lng === point.lng,
        ) === index,
    );

    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.72)
      .showAtmosphere(config.showAtmosphere)
      .atmosphereColor(config.atmosphereColor)
      .atmosphereAltitude(config.atmosphereAltitude)
      .hexPolygonColor(() => config.polygonColor);

    globe
      .arcsData(data)
      .arcStartLat((d: object) => (d as Arc).startLat)
      .arcStartLng((d: object) => (d as Arc).startLng)
      .arcEndLat((d: object) => (d as Arc).endLat)
      .arcEndLng((d: object) => (d as Arc).endLng)
      .arcColor((d: object) => (d as Arc).color)
      .arcAltitude((d: object) => (d as Arc).arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(config.arcLength)
      .arcDashInitialGap((d: object) => (d as Arc).order)
      .arcDashGap(15)
      .arcDashAnimateTime(() => config.arcTime);

    globe
      .pointsData(unique)
      .pointColor((d: object) => (d as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0)
      .pointRadius(2);

    globe
      .ringsData([])
      .ringColor(() => config.polygonColor)
      .ringMaxRadius(config.maxRings)
      .ringPropagationSpeed(RING_SPEED)
      .ringRepeatPeriod((config.arcTime * config.arcLength) / config.rings);
  }, [
    ready,
    data,
    config.pointSize,
    config.showAtmosphere,
    config.atmosphereColor,
    config.atmosphereAltitude,
    config.polygonColor,
    config.arcLength,
    config.arcTime,
    config.rings,
    config.maxRings,
  ]);

  /* Anillos que laten sobre los orígenes de cada arco. */
  useEffect(() => {
    if (!globeRef.current || !ready || !data) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;
      const picked = pickIndexes(data.length, Math.ceil(data.length / 2));
      globeRef.current.ringsData(
        data
          .filter((_, index) => picked.includes(index))
          .map((arc) => ({
            lat: arc.startLat,
            lng: arc.startLng,
            color: arc.color,
          })),
      );
    }, 2200);

    return () => clearInterval(interval);
  }, [ready, data]);

  return <group ref={groupRef} />;
}

function RendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.setSize(size.width, size.height);
    gl.setClearColor(0x000000, 0);
  }, [gl, size.width, size.height]);

  return null;
}

/**
 * Globo interactivo.
 * Adaptado del componente de Aceternity: misma técnica (three-globe sobre
 * react-three-fiber), pero con la paleta de FluxWeb, los polígonos de países
 * en dominio público de Natural Earth y sin rotación si el sistema pide
 * menos movimiento.
 */
export function World({ globeConfig, data }: WorldProps) {
  const scene = new Scene();
  scene.fog = new Fog(0x23251a, 400, 2000);

  return (
    <Canvas
      scene={scene}
      camera={new PerspectiveCamera(50, ASPECT, 180, 1800)}
      gl={{ antialias: true, alpha: true }}
    >
      <RendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={1.15} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe globeConfig={globeConfig} data={data} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={CAMERA_Z}
        maxDistance={CAMERA_Z}
        autoRotate={globeConfig.autoRotate ?? true}
        autoRotateSpeed={globeConfig.autoRotateSpeed ?? 0.5}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

/** Índices distintos al azar, para elegir qué anillos laten en cada ciclo. */
function pickIndexes(max: number, count: number) {
  const chosen: number[] = [];
  while (chosen.length < Math.min(count, max)) {
    const value = Math.floor(Math.random() * max);
    if (!chosen.includes(value)) chosen.push(value);
  }
  return chosen;
}
