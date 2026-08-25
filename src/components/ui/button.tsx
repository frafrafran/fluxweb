import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "quiet";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "hover:-translate-y-px active:translate-y-px active:scale-[0.985] " +
  "disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  // Oliva de marca con texto crema: 4.7:1, cumple AA.
  primary:
    "bg-accent text-accent-ink shadow-[var(--shadow-sm)] hover:bg-accent-strong hover:shadow-[var(--shadow-md)]",
  outline:
    "border border-line-strong text-ink hover:border-accent hover:bg-accent-soft",
  quiet: "text-ink hover:bg-accent-soft",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  /** Icono final: se desplaza levemente en hover para dar sensación física. */
  icon?: ReactNode;
};

type ButtonAsButton = SharedProps &
  Omit<ComponentProps<"button">, "children" | "className"> & { href?: never };

type ButtonAsLink = SharedProps &
  Omit<ComponentProps<"a">, "children" | "className" | "href"> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    children,
    className = "",
    icon,
    ...rest
  } = props;

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <span className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1">
          {icon}
        </span>
      ) : null}
    </>
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as ComponentProps<"a"> & {
      href: string;
    };
    const isExternal = /^https?:|^mailto:/.test(href);

    return (
      <a
        href={href}
        className={classes}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentProps<"button">)}>
      {content}
    </button>
  );
}
