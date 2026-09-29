import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { GalleryFigure } from "@/components/sections/gallery-figure";
import { GalleryParallax } from "@/components/sections/gallery-parallax";
import { GalleryReveal } from "@/components/sections/gallery-reveal";
import { getContent } from "@/lib/i18n/server";

/**
 * Galería con columna central fija.
 * En escritorio las columnas laterales acompañan el scroll y la del medio
 * queda quieta, así que el recorrido se siente sostenido por una pieza que no
 * se mueve. Cualquier captura se amplía al tocarla.
 *
 * Debajo de `lg` no hay alto para sostener la columna fija: las mismas
 * capturas van en dos columnas que se deslizan en sentidos opuestos.
 */
export async function Gallery() {
  const { t, galleryColumns } = await getContent();
  const [left, center, right] = galleryColumns;

  /* En el teléfono se reparten alternadas, para que cada columna mezcle
     proyectos y no quede una entera de un solo sitio. */
  const todas = [...left, ...center, ...right];
  const movil: [typeof todas, typeof todas] = [
    todas.filter((_, index) => index % 2 === 0),
    todas.filter((_, index) => index % 2 === 1),
  ];

  return (
    <section className="border-t border-line bg-paper py-24 sm:py-28 lg:py-32">
      <Container size="wide">
        <Reveal className="max-w-[44ch]">
          <p className="text-eyebrow">{t.gallery.eyebrow}</p>
          <h2 className="mt-4 font-display text-display-lg font-medium text-ink">
            {t.gallery.title}
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
            {t.gallery.body}
          </p>
        </Reveal>
      </Container>

      <div className="mt-6 px-3 lg:mt-16 lg:px-4">
        <GalleryParallax columns={movil} />

        <div className="hidden grid-cols-3 gap-3 lg:grid">
          <Column images={left} />

          {/* Columna fija: solo tiene sentido cuando hay alto para sostenerla. */}
          <div>
            <div className="sticky top-24 grid h-[calc(100dvh-8rem)] grid-rows-3 gap-3">
              {center.map((image) => (
                <GalleryFigure
                  key={image.src}
                  image={image}
                  fill
                  sizes="32vw"
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
          <GalleryFigure image={image} sizes="32vw" />
        </GalleryReveal>
      ))}
    </div>
  );
}
