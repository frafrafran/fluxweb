"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { TransitionPanel } from "@/components/motion-primitives/transition-panel";
import { TextMorph } from "@/components/motion-primitives/text-morph";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { useContent } from "@/lib/i18n/client";
import type { AutomationId } from "@/lib/site";

/**
 * Selector de casos reales de automatización.
 * Patrón de pestañas accesible: flechas, Inicio y Fin mueven el foco.
 */
export function Automation() {
  const { t, automationCases } = useContent();
  const [activeId, setActiveId] = useState<AutomationId>(automationCases[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const reduce = useReducedMotion();

  const activeIndex = automationCases.findIndex((item) => item.id === activeId);
  const active = automationCases[activeIndex];

  function focusTab(index: number) {
    const next =
      automationCases[
        (index + automationCases.length) % automationCases.length
      ];
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
              {t.automation.title}
            </h2>
            <p className="mt-5 max-w-[38ch] text-lg leading-relaxed text-muted">
              Elegí lo que más te suene. Del otro lado está la automatización
              que armaríamos para tu negocio.
            </p>

            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label={t.automation.tablist}
              onKeyDown={onKeyDown}
              className="mt-9 flex flex-col gap-2"
            >
              {/* La pastilla elegida se desplaza de una tarea a la otra en
                  lugar de encenderse y apagarse. */}
              <AnimatedBackground
                defaultValue={activeId}
                onValueChange={(id) => id && setActiveId(id as AutomationId)}
                className="rounded-full border border-accent bg-accent-soft"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {automationCases.map((item) => {
                  const selected = item.id === activeId;
                  return (
                    <button
                      key={item.id}
                      data-id={item.id}
                      ref={(node) => {
                        tabRefs.current[item.id] = node;
                      }}
                      type="button"
                      role="tab"
                      id={`tab-${item.id}`}
                      aria-selected={selected}
                      aria-controls={`panel-${item.id}`}
                      tabIndex={selected ? 0 : -1}
                      /* La pastilla viaja de una tarea a la otra, asi que el
                         texto no puede cambiar de color con ella: durante el
                         recorrido quedaria crema sobre crema. El rotulo se
                         mantiene oscuro y la pastilla es un realce suave. */
                      className={`w-full rounded-full border px-5 py-3.5 text-left text-[0.9375rem] transition-colors duration-300 ${
                        selected
                          ? "border-transparent font-medium text-ink"
                          : "border-line text-ink-soft hover:border-accent hover:bg-accent-soft"
                      }`}
                    >
                      {item.pain}
                    </button>
                  );
                })}
              </AnimatedBackground>
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
              {/* El titulo se transforma letra por letra de un caso al otro:
                  se ve que es el mismo objeto cambiando y no un bloque nuevo.
                  El resto del contenido entra y sale como una hoja. */}
              <TextMorph
                as="h3"
                className="font-display text-display-md font-medium text-ink"
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 260, damping: 20, mass: 0.3 }
                }
              >
                {active.title}
              </TextMorph>

              <TransitionPanel
                activeIndex={activeIndex}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                variants={{
                  enter: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
                  center: { opacity: 1, y: 0 },
                  exit: reduce ? { opacity: 0 } : { opacity: 0, y: -10 },
                }}
              >
                {automationCases.map((item) => (
                  <div key={item.id}>
                    <ol className="mt-9 grid gap-6 sm:grid-cols-3 sm:gap-5">
                      {item.flow.map((step, index) => (
                        <li
                          key={step}
                          className="border-l border-line pl-4 sm:border-l-0 sm:border-t sm:pl-0 sm:pt-4"
                        >
                          <span className="text-sm text-accent-text">
                            {t.automation.labels[index]}
                          </span>
                          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                            {step}
                          </p>
                        </li>
                      ))}
                    </ol>

                    <p className="mt-10 max-w-[44ch] text-lg leading-relaxed text-muted">
                      {item.result}
                    </p>
                  </div>
                ))}
              </TransitionPanel>

              <div className="mt-10 border-t border-line pt-8">
                <Button
                  href="#contacto"
                  variant="outline"
                  icon={
                    <ArrowRight size={17} weight="bold" aria-hidden="true" />
                  }
                >
                  {t.automation.cta}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
