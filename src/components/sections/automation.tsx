"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { automationCases } from "@/lib/site";

/**
 * Selector de casos reales de automatización.
 * Patrón de pestañas accesible: flechas, Inicio y Fin mueven el foco.
 */
export function Automation() {
  const [activeId, setActiveId] = useState(automationCases[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const reduce = useReducedMotion();

  const activeIndex = automationCases.findIndex((item) => item.id === activeId);
  const active = automationCases[activeIndex];

  function focusTab(index: number) {
    const next =
      automationCases[(index + automationCases.length) % automationCases.length];
    setActiveId(next.id);
    tabRefs.current[next.id]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        focusTab(activeIndex + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        focusTab(activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(automationCases.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <section className="border-y border-line bg-paper-sink py-24 sm:py-32 lg:py-40">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-display-lg font-medium text-ink">
              ¿Qué te está comiendo el día?
            </h2>
            <p className="mt-5 max-w-[38ch] text-lg leading-relaxed text-muted">
              Elegí lo que más te suene. Del otro lado está la automatización que
              armaríamos para tu negocio.
            </p>

            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Tareas para automatizar"
              onKeyDown={onKeyDown}
              className="mt-9 flex flex-col gap-2"
            >
              {automationCases.map((item) => {
                const selected = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      tabRefs.current[item.id] = node;
                    }}
                    role="tab"
                    id={`tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${item.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(item.id)}
                    className={`rounded-full px-5 py-3.5 text-left text-[0.9375rem] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      selected
                        ? "bg-accent text-accent-ink shadow-[var(--shadow-sm)]"
                        : "border border-line text-ink-soft hover:-translate-y-px hover:border-accent hover:bg-accent-soft"
                    }`}
                  >
                    {item.pain}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div
              role="tabpanel"
              id={`panel-${active.id}`}
              aria-labelledby={`tab-${active.id}`}
              tabIndex={0}
              className="surface-panel h-full p-8 sm:p-10 lg:p-12"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="font-display text-display-md font-medium text-ink">
                    {active.title}
                  </h3>

                  <ol className="mt-9 grid gap-6 sm:grid-cols-3 sm:gap-5">
                    {active.flow.map((step, index) => (
                      <li
                        key={step}
                        className="border-l border-line pl-4 sm:border-l-0 sm:border-t sm:pl-0 sm:pt-4"
                      >
                        <span className="text-sm text-accent-text">
                          {["Entra", "Sucede", "Sale"][index]}
                        </span>
                        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>

                  <p className="mt-10 max-w-[44ch] text-lg leading-relaxed text-muted">
                    {active.result}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 border-t border-line pt-8">
                <Button
                  href="#contacto"
                  variant="outline"
                  icon={<ArrowRight size={17} weight="bold" aria-hidden="true" />}
                >
                  Empezar mi proyecto
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
