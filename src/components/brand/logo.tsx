import type { CSSProperties } from "react";

/**
 * Logotipo FluxWeb.
 * El trazo se pinta con `currentColor` a través de una máscara alfa, así el
 * mismo archivo funciona sobre crema y sobre oliva oscuro sin duplicar assets.
 * Los PNG a color viven en /public/brand para descarga y uso fuera de la web.
 */

type LogoProps = {
  variant?: "lockup" | "mark";
  className?: string;
  /** Cuando el logotipo acompaña a un texto que ya nombra la marca. */
  decorative?: boolean;
};

const assets = {
  lockup: { src: "/brand/lockup-mask.png", ratio: "829 / 202" },
  mark: { src: "/brand/mark-mask.png", ratio: "853 / 736" },
} as const;

export function Logo({
  variant = "lockup",
  className = "",
  decorative = false,
}: LogoProps) {
  const { src, ratio } = assets[variant];

  const style: CSSProperties = {
    aspectRatio: ratio,
    backgroundColor: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };

  return (
    <span
      className={`block ${className}`}
      style={style}
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": "FluxWeb" })}
    />
  );
}
