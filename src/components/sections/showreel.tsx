"use client";

import { ScrollExpandMedia } from "@/components/ui/scroll-expansion-hero";
import { useContent } from "@/lib/i18n/client";
import { showreel } from "@/lib/site";

/**
 * Showreel del estudio, justo después de la portada.
 * Treinta segundos de trabajo real que crecen a medida que se baja: el
 * recorrido pasa del titular al video sin cortar.
 */
export function Showreel() {
  const { t } = useContent();

  return (
    <ScrollExpandMedia
      mediaSrc={showreel.src}
      posterSrc={showreel.poster}
      eyebrow={t.showreel.eyebrow}
      titleStart={t.showreel.titleStart}
      titleEnd={t.showreel.titleEnd}
      scrollHint={t.showreel.hint}
      mediaLabel={t.showreel.videoLabel}
      playLabel={t.showreel.play}
      pauseLabel={t.showreel.pause}
    />
  );
}
