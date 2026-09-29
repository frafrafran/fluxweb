"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import {
  GalleryFigure,
  type GalleryImage,
} from "@/components/sections/gallery-figure";

/**
 * Galería en pantallas chicas: dos columnas que se deslizan en sentidos
 * opuestos mientras se recorre la sección. Es el mismo gesto que en
 * escritorio (columnas que acompañan el scroll), resuelto para un ancho
 * donde la columna fija no cabe. Solo mueve transform, así que no toca el
 * layout. Con «reducir movimiento» quedan quietas.
 */
export function GalleryParallax({
  columns,
}: {
  columns: [GalleryImage[], GalleryImage[]];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const sube = useTransform(scrollYProgress, [0, 1], [72, -72]);
  const baja = useTransform(scrollYProgress, [0, 1], [-72, 72]);

  return (
    // El relleno vertical deja lugar al recorrido: en los extremos ninguna
    // captura queda cortada por el recorte del contenedor.
    <div
      ref={ref}
      className="grid grid-cols-2 gap-3 overflow-hidden py-20 lg:hidden"
    >
      {columns.map((imagenes, indice) => (
        <motion.div
          key={indice}
          style={reduce ? undefined : { y: indice === 0 ? sube : baja }}
          className={`grid content-start gap-3 ${indice === 1 ? "pt-12" : ""}`}
        >
          {imagenes.map((image) => (
            <GalleryFigure key={image.src} image={image} sizes="48vw" />
          ))}
        </motion.div>
      ))}
    </div>
  );
}
