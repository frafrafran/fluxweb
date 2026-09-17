"use client";

import type { ReactNode } from "react";
import { InView } from "@/components/motion-primitives/in-view";

/**
 * Entrada escalonada de las capturas de la galería.
 * A diferencia de otros efectos de texto, `InView` deja siempre el elemento en
 * el HTML y solo cambia sus variantes, así que la captura existe aunque el
 * JavaScript no corra: la hoja de <noscript> del layout se encarga del resto.
 */
export function GalleryReveal({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  return (
    <InView
      once
      viewOptions={{ once: true, margin: "-8%" }}
      variants={{
        hidden: { opacity: 0, y: 26 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </InView>
  );
}
