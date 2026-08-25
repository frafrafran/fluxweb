import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** `wide` respira más en monitores grandes sin romper la medida de lectura. */
  size?: "default" | "wide" | "narrow";
};

const sizes = {
  narrow: "max-w-[880px]",
  default: "max-w-[1280px]",
  wide: "max-w-[1560px]",
} as const;

export function Container({
  as: Tag = "div",
  children,
  className = "",
  size = "default",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full ${sizes[size]} px-5 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </Tag>
  );
}
