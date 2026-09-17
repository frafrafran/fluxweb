import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { GalleryFigure } from "@/components/sections/gallery-figure";
import { GalleryCarousel } from "@/components/sections/gallery-carousel";
import { GalleryReveal } from "@/components/sections/gallery-reveal";
import { getContent } from "@/lib/i18n/server";

/**
 * Galería con columna central fija.
 * Las columnas laterales acompañan el scroll y la del medio queda quieta, así
 * que el recorrido se siente sostenido por una pieza que no se mueve. Cualquier
 * captura se amplía al tocarla.
 *
 * Debajo de `lg` no hay alto para sostener la columna fija, así que esas
 * capturas pasan a un carrusel que se arrastra con el dedo: antes simplemente
 * no se veían.
 */
export async function Gallery() {
  const { t, galleryColumns } = await getContent();
  const [left, center, right] = galleryColumns;

  return (
    <section className="border-t border-line bg-paper py-24 sm:py-28 lg:py-32">
      <Container size="wide">
        <Reveal className="max-w-[44ch]">
          <h2 className="font-display text-display-lg font-medium text-ink">
            {t.gallery.title}
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
            {t.gallery.body}
          </p>
        </Reveal>
      </Container>

      <div className="mt-14 px-2 lg:mt-16 lg:px-4">
        <GalleryCarousel images={center} />

        <div className="mt-3 grid grid-cols-2 gap-3 lg:mt-0 lg:grid-cols-3">
          <Column images={left} />

          {/* Columna fija: solo tiene sentido cuando hay alto para sostenerla. */}
          <div className="hidden lg:block">
            <div className="sticky top-24 grid h-[calc(100dvh-8rem)] grid-rows-3 gap-3">
              {center.map((image) => (
                <GalleryFigure
                  key={image.src}
                  image={image}
                  fill
                  sizes="(max-width: 1024px) 50vw, 32vw"
                />
              ))}
            </div>
          </div>

          <Column images={right} />
        </div>
      </div>
    </section>
  );
}

function Column({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="grid content-start gap-3">
      {images.map((image, index) => (
        <GalleryReveal key={image.src} index={index}>
          <GalleryFigure image={image} sizes="(max-width: 1024px) 50vw, 32vw" />
        </GalleryReveal>
      ))}
    </div>
  );
}
