"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navLinks } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  /* Estado del encabezado según el scroll, sin escuchar el evento del window. */
  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  /* Indicador de sección activa. */
  useEffect(() => {
    const ids = navLinks.map((link) => link.href.split("#")[1]);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Menú móvil: bloqueo de scroll y salida con Escape. */
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled || open
          ? "border-b border-line bg-[color-mix(in_srgb,var(--paper)_82%,transparent)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1560px] items-center gap-6 px-5 sm:px-8 lg:h-[4.5rem] lg:px-12">
        <a
          href="#contenido"
          className="shrink-0 text-ink transition-opacity duration-300 hover:opacity-70"
          aria-label="FluxWeb, ir al inicio"
        >
          <Logo variant="lockup" className="h-6 w-auto sm:h-[1.75rem]" decorative />
        </a>

        <nav
          aria-label="Secciones del sitio"
          className="ml-auto hidden items-center gap-1 lg:flex"
        >
          {navLinks.map((link) => {
            const id = link.href.split("#")[1];
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors duration-300 ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:gap-3">
          <ThemeToggle />
          {/* El envoltorio decide la visibilidad: el botón ya trae su propio display. */}
          <div className="hidden sm:block">
            <Button href="/#contacto" size="md">
              Empezar mi proyecto
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-accent hover:bg-accent-soft lg:hidden"
          >
            {open ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <List size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-movil"
            key="menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-paper lg:hidden"
          >
            <nav aria-label="Menú" className="px-5 py-6 sm:px-8">
              <ul className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.05 + index * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-line last:border-b-0"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 font-display text-2xl text-ink"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <Button
                href="/#contacto"
                size="lg"
                className="mt-6 w-full"
                onClick={() => setOpen(false)}
              >
                Empezar mi proyecto
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
