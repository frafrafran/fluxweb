"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { TextEffect } from "@/components/motion-primitives/text-effect";

const CLASES = "mx-auto max-w-[16ch] font-display text-display-lg font-medium";

/**
 * Titular de la banda oscura.
 * Entra palabra por palabra, con un desenfoque corto que se despeja.
 *
 * TextEffect no dibuja nada hasta que se le da la orden, así que el titular
 * sale primero como un <h2> común: está en el HTML del servidor, lo encuentra
 * un buscador y lo lee un lector de pantalla aunque nadie llegue a scrollear.
 * El relevo ocurre con la banda todavía debajo del borde inferior —de ahí el
 * margen de 200 px—, para que el cambio no se vea como un parpadeo.
 */
export function ShowcaseHeading({ children }: { children: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const cerca = useInView(ref, { once: true, margin: "200px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref}>
      {cerca && !reduce ? (
        <TextEffect
          as="h2"
          per="word"
          preset="blur"
          speedReveal={1.5}
          className={CLASES}
        >
          {children}
        </TextEffect>
      ) : (
        <h2 className={CLASES}>{children}</h2>
      )}
    </div>
  );
}
