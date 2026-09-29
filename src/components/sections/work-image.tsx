import Image from "next/image";

/**
 * Captura del proyecto dentro de su marco.
 * La captura se ve entera, sin recortes: es el trabajo que estamos mostrando.
 * Un solo gesto al pasar el cursor, un acercamiento corto. Sin inclinación ni
 * parallax: el texto de una interfaz se tiene que leer derecho.
 */
export function WorkImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-[var(--r-xl)] border border-line bg-paper shadow-[var(--shadow-soft)]">
        <Image
          src={src}
          alt={alt}
          width={2000}
          height={1250}
          sizes="(max-width: 1024px) 92vw, 780px"
          className="h-auto w-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}
