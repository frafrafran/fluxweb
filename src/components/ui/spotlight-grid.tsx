"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Luz cálida que recorre una grilla siguiendo al cursor.
 * El patrón viene de las tarjetas con spotlight que popularizaron las
 * bibliotecas de componentes; la implementación es propia y adaptada a la
 * paleta: luz de papel en oliva, no un halo de neón.
 *
 * Un único listener escribe variables CSS y las medidas se cachean, así que
 * no hay renders de React ni lecturas de layout durante el movimiento.
 */
export function SpotlightGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-spotlight]"),
    );
    if (cards.length === 0) return;

    let rects = cards.map((card) => card.getBoundingClientRect());
    let frame = 0;
    let pointer = { x: 0, y: 0 };

    const measure = () => {
      rects = cards.map((card) => card.getBoundingClientRect());
    };

    const paint = () => {
      frame = 0;
      cards.forEach((card, index) => {
        const rect = rects[index];
        card.style.setProperty("--spot-x", `${pointer.x - rect.left}px`);
        card.style.setProperty("--spot-y", `${pointer.y - rect.top}px`);
      });
    };

    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onEnter = () => {
      measure();
      cards.forEach((card) => card.style.setProperty("--spot-opacity", "1"));
    };

    const onLeave = () => {
      cards.forEach((card) => card.style.setProperty("--spot-opacity", "0"));
    };

    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={ref} className={`spotlight-grid ${className}`}>
      {children}
    </div>
  );
}
