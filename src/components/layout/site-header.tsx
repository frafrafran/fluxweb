"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import {
  CaretDown,
  EnvelopeSimple,
  InstagramLogo,
  List,
  X,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ScrollBar } from "@/components/ui/scroll-bar";
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "@/components/motion-primitives/morphing-popover";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { useContent } from "@/lib/i18n/client";
import { localePath, stripLocale } from "@/lib/i18n/config";

export function SiteHeader() {
  const { t, locale, navLinks, projects, services, href } = useContent();
  const pathname = usePathname();
  /* Misma página en el otro idioma: "/marca" <-> "/en/marca". */
  const otherLocaleHref = localePath(
    locale === "es" ? "en" : "es",
    stripLocale(pathname ?? "/"),
  );
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  /* Estado del encabezado según el scroll, sin escuchar el evento del window. */
  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  /* Indicador de sección activa. */
  useEffect(() => {
    const ids = navLinks.map((link) => link.id);
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

  /* Escape cierra cualquier desplegable abierto. */
  useEffect(() => {
    if (!openMenu) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openMenu]);

  /* Menú móvil: bloqueo de scroll y salida con Escape. */
  useEffect(() => {
    if (!open) return;

    /* En <html> y no en <body>: es el overflow que mira Lenis para frenarse. */
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled || open
          ? "border-b border-line bg-[color-mix(in_srgb,var(--paper)_93%,transparent)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      {/* Cuánto queda de página, sin ocupar lugar ni pedir un elemento fijo aparte. */}
      <ScrollBar className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent" />

      <div className="mx-auto flex h-16 w-full max-w-[1560px] items-center gap-6 px-5 sm:px-8 lg:h-[4.5rem] lg:px-12">
        <a
          href={href("/")}
          className="shrink-0 text-ink transition-opacity duration-300 hover:opacity-70"
          aria-label={t.nav.home}
        >
          <Logo
            variant="lockup"
            className="h-6 w-auto sm:h-[1.75rem]"
            decorative
          />
        </a>

        <nav
          aria-label={t.nav.sections}
          className="ml-auto hidden items-center gap-1 lg:flex"
        >
          {navLinks.map((link) => {
            const id = link.id;
            const isActive = active === id;
            const tone = isActive ? "text-ink" : "text-muted hover:text-ink";
            const indicator = isActive ? (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            ) : null;

            // Servicios y Trabajos abren detalle: el resto son enlaces simples.
            if (id === "servicios" || id === "trabajos") {
              const abierto = openMenu === id;
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(id)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setOpenMenu(null);
                    }
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={abierto}
                    aria-controls={`menu-${id}`}
                    onClick={() => setOpenMenu(abierto ? null : id)}
                    className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors duration-300 ${tone}`}
                  >
                    {link.label}
                    <CaretDown
                      size={12}
                      weight="bold"
                      aria-hidden="true"
                      className={`transition-transform duration-300 ${
                        abierto ? "rotate-180" : ""
                      }`}
                    />
                    {indicator}
                  </button>

                  <AnimatePresence>
                    {abierto ? (
                      <motion.div
                        id={`menu-${id}`}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 ${
                          id === "trabajos" ? "w-[34rem]" : "w-[21rem]"
                        }`}
                      >
                        <div className="overflow-hidden rounded-[var(--r-panel)] border border-line bg-paper-raise p-2 shadow-[var(--shadow-soft)]">
                          {id === "servicios" ? (
                            <ul>
                              {services.map((service) => (
                                <li key={service.id}>
                                  <a
                                    href={href("/#servicio-" + service.id)}
                                    onClick={() => setOpenMenu(null)}
                                    className="block rounded-[var(--r-input)] px-4 py-3 transition-colors duration-200 hover:bg-accent-soft"
                                  >
                                    <span className="block text-[0.9375rem] text-ink">
                                      {service.title}
                                    </span>
                                    <span className="mt-0.5 block text-sm text-muted">
                                      {service.points[0]}
                                    </span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <ul className="grid grid-cols-2 gap-2">
                              {projects.map((project) => (
                                <li key={project.slug}>
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setOpenMenu(null)}
                                    className="block rounded-[var(--r-input)] p-2 transition-colors duration-200 hover:bg-accent-soft"
                                  >
                                    <Image
                                      src={project.image}
                                      alt=""
                                      width={2000}
                                      height={1250}
                                      sizes="240px"
                                      className="h-auto w-full rounded-md border border-line"
                                    />
                                    <span className="mt-3 block px-1 text-[0.9375rem] text-ink">
                                      {project.name}
                                    </span>
                                    <span className="mt-0.5 block px-1 pb-1 text-sm leading-relaxed text-muted">
                                      {project.sector}
                                    </span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors duration-300 ${tone}`}
              >
                {link.label}
                {indicator}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:gap-3">
          {/* Atajo de contacto: el disparador se transforma en la tarjeta. */}
          <MorphingPopover className="hidden lg:block">
            <MorphingPopoverTrigger
              aria-label={t.nav.contactShortcut}
              className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-accent hover:bg-accent-soft"
            >
              <EnvelopeSimple size={18} aria-hidden="true" />
            </MorphingPopoverTrigger>
            <MorphingPopoverContent className="w-[19rem] rounded-[var(--r-panel)] border border-line bg-paper-raise p-5 shadow-[var(--shadow-soft)]">
              <p className="text-sm text-muted">{t.nav.writeUs}</p>
              <a
                href={`mailto:${site.email}`}
                className="link-underline mt-2 block text-[0.9375rem] text-ink"
              >
                {site.email}
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-fit items-center gap-2 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-ink"
              >
                <InstagramLogo size={16} aria-hidden="true" />
                <span className="link-underline">{site.instagram.handle}</span>
              </a>
            </MorphingPopoverContent>
          </MorphingPopover>

          {/* Cambio de idioma: lleva a la misma página en el otro idioma. */}
          <Link
            href={otherLocaleHref}
            hrefLang={t.nav.switchLang}
            lang={t.nav.switchLang}
            aria-label={t.nav.switchLanguage}
            className="inline-flex h-10 items-center justify-center rounded-full border border-line px-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-accent hover:bg-accent-soft"
          >
            {t.nav.switchShort}
          </Link>

          <ThemeToggle label={t.nav.theme} />
          {/* El envoltorio decide la visibilidad: el botón ya trae su propio display. */}
          <div className="hidden sm:block">
            <Button href={href("/#contacto")} size="md">
              {t.nav.cta}
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
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
            /* Encima del contenido, no en el flujo: si empujara la página, al
               cerrarse después de tocar un enlace todo subía y el salto
               quedaba pasado de la sección. Si no entra en la pantalla,
               se desplaza por dentro. */
            data-lenis-prevent
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-y border-line bg-paper lg:hidden"
          >
            <nav aria-label={t.nav.menu} className="px-5 py-6 sm:px-8">
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
                href={href("/#contacto")}
                size="lg"
                className="mt-6 w-full"
                onClick={() => setOpen(false)}
              >
                {t.nav.cta}
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
