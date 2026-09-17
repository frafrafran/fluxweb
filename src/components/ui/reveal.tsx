import type { CSSProperties, ReactNode } from "react";

/** Atributos data-* que el componente deja pasar tal cual (por ejemplo
 *  data-spotlight, que marca las tarjetas iluminadas por el cursor). */
type DataAttributes = {
  [key: `data-${string}`]: string | number | boolean | undefined;
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Retardo en segundos para escalonar elementos hermanos. */
  delay?: number;
  /** Desplazamiento vertical inicial en píxeles. */
  distance?: number;
  as?: "div" | "li" | "article" | "section" | "ul";
  /** Ancla de la sección, por ejemplo para enlazar desde la navegación. */
  id?: string;
} & DataAttributes;

/**
 * Aparición al entrar en pantalla, resuelta en CSS.
 * Sin JavaScript el contenido se ve igual: el estado oculto solo se aplica
 * cuando el script del documento marca <html class="js">.
 * El observador global vive en <RevealObserver />.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  distance = 22,
  as: Tag = "div",
  id,
  ...rest
}: RevealProps) {
  const style = {
    "--reveal-delay": `${delay}s`,
    "--reveal-distance": `${distance}px`,
  } as CSSProperties;

  return (
    <Tag
      id={id}
      className={`reveal ${className}`}
      data-reveal
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Entrada de la primera pantalla: sube a su lugar sin fundido.
 * Evitar la opacidad mantiene el LCP en el primer pintado.
 */
export function RiseIn({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p";
}) {
  return (
    <Tag
      className={`rise ${className}`}
      style={{ "--rise-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * Revelado por máscara para titulares: la línea sube desde detrás de un borde.
 * Se dispara al cargar, no necesita observador.
 */
export function MaskReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="mask-line">
      <span
        className={className}
        style={{ "--mask-delay": `${delay}s` } as CSSProperties}
      >
        {children}
      </span>
    </span>
  );
}
