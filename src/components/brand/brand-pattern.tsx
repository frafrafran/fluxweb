/**
 * Trama de marca: el nudo del logotipo repetido como textura.
 * Se pinta con `currentColor` mediante máscara, así se adapta al tema sin
 * cargar una imagen distinta para claro y oscuro.
 */
export function BrandPattern({
  className = "",
  size = 132,
  opacity = 0.07,
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        backgroundColor: "currentColor",
        WebkitMaskImage: "url(/brand/mark-mask.png)",
        maskImage: "url(/brand/mark-mask.png)",
        WebkitMaskSize: `${size}px`,
        maskSize: `${size}px`,
        WebkitMaskRepeat: "repeat",
        maskRepeat: "repeat",
      }}
    />
  );
}
