"use client";

import Image from "next/image";
import { X } from "@phosphor-icons/react";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@/components/motion-primitives/morphing-dialog";
import { useContent } from "@/lib/i18n/client";

export type GalleryImage = { src: string; alt: string };

/**
 * Captura de la galería que se abre a pantalla completa.
 * El recuadro chico se transforma en el grande: es la misma pieza creciendo,
 * así que no se pierde de vista cuál se tocó. El botón trae la descripción de
 * la captura, de modo que el destino se entiende sin verla.
 *
 * Se sigue usando next/image en los dos estados para conservar el formato
 * responsivo y la carga diferida.
 */
export function GalleryFigure({
  image,
  sizes,
  fill = false,
}: {
  image: GalleryImage;
  sizes: string;
  fill?: boolean;
}) {
  const { t } = useContent();

  return (
    <MorphingDialog
      transition={{ type: "spring", stiffness: 240, damping: 26, mass: 0.6 }}
    >
      <MorphingDialogTrigger
        label={`${t.gallery.expand}: ${image.alt}`}
        className={`group block w-full overflow-hidden rounded-[var(--r-panel)] border border-line ${
          fill ? "h-full" : ""
        }`}
      >
        {fill ? (
          <span className="relative block h-full w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              className="object-cover"
            />
          </span>
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            width={520}
            height={325}
            sizes={sizes}
            className="h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        )}
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent className="relative w-[92vw] max-w-[68rem] overflow-hidden rounded-[var(--r-xl)] border border-line bg-paper-raise">
          <Image
            src={image.src}
            alt={image.alt}
            width={1600}
            height={1000}
            sizes="92vw"
            className="h-auto w-full"
          />
          {/* Es el nombre accesible del dialogo: aria-labelledby del contenido
              apunta a este bloque. */}
          <MorphingDialogTitle className="px-6 py-5 text-[0.9375rem] leading-relaxed text-muted">
            {image.alt}
          </MorphingDialogTitle>
        </MorphingDialogContent>

        <MorphingDialogClose
          label={t.gallery.close}
          className="fixed right-6 top-6 grid size-11 place-items-center rounded-full border border-line bg-paper-raise text-ink"
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { delay: 0.2 } },
            exit: { opacity: 0 },
          }}
        >
          <X size={18} weight="bold" aria-hidden="true" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
