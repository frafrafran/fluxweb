"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from "@/components/motion-primitives/carousel";
import type { GalleryImage } from "@/components/sections/gallery-figure";
import { useContent } from "@/lib/i18n/client";

/**
 * Carrusel de la galería para pantallas chicas.
 * En escritorio estas capturas viven en la columna fija del medio; abajo de
 * `lg` esa columna no cabe y antes quedaban ocultas. Acá se arrastran con el
 * dedo, con flechas y puntos para quien navega con teclado.
 */
export function GalleryCarousel({ images }: { images: GalleryImage[] }) {
  const { t } = useContent();

  return (
    <div className="relative px-6 pb-8 lg:hidden">
      <Carousel>
        {/* Espacio abajo para los puntos, que se apoyan fuera de la imagen. */}
        <CarouselContent className="-ml-3">
          {images.map((image) => (
            <CarouselItem key={image.src} className="basis-full pl-3">
              <figure className="overflow-hidden rounded-[var(--r-panel)] border border-line">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={520}
                  height={325}
                  sizes="88vw"
                  className="h-auto w-full object-cover"
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* El upstream saca las flechas fuera del carrusel (left -12.5%,
            ancho 125%). En una pantalla de 390 px eso empujaba el ancho del
            documento nueve pixeles: aca van por dentro. */}
        <CarouselNavigation
          alwaysShow
          labels={{ previous: t.gallery.prev, next: t.gallery.next }}
          className="left-0 w-full px-1"
          classNameButton="border border-line bg-paper-raise text-ink"
        />
        <CarouselIndicator className="-bottom-7" label={t.gallery.goTo} />
      </Carousel>
    </div>
  );
}
