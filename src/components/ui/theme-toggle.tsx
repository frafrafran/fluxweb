"use client";

import { MoonStars, Sun } from "@phosphor-icons/react/dist/ssr";

const STORAGE_KEY = "fluxweb-theme";

/**
 * Cambio de tema sin estado en React: el ícono correcto lo decide el CSS
 * a partir del tema vigente, así no hay diferencias entre servidor y cliente.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const attr = root.getAttribute("data-theme");
    const current =
      attr === "dark" || attr === "light"
        ? attr
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* navegación privada: el tema dura lo que la sesión */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Cambiar entre tema claro y oscuro"
      className={`inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-accent hover:bg-accent-soft ${className}`}
    >
      <Sun size={18} aria-hidden="true" className="hidden dark:block" />
      <MoonStars size={18} aria-hidden="true" className="block dark:hidden" />
    </button>
  );
}
