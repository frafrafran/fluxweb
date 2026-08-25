import { Check } from "@phosphor-icons/react/dist/ssr";
import { BrandPattern } from "@/components/brand/brand-pattern";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/site";

const [sitios, tiendas, automatizacion, mantenimiento, marca] = services;

function Points({
  items,
  tone = "default",
}: {
  items: string[];
  tone?: "default" | "inverted";
}) {
  return (
    <ul className="mt-7 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[0.9375rem]">
          <Check
            size={15}
            weight="bold"
            aria-hidden="true"
            className={`mt-1 shrink-0 ${
              tone === "inverted" ? "text-accent-ink" : "text-accent"
            }`}
          />
          <span className={tone === "inverted" ? "text-accent-ink" : "text-muted"}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-24 pb-24 sm:pb-32 lg:pb-40">
      <Container size="wide">
        <Reveal className="max-w-[52ch]">
          <p className="text-eyebrow">Qué hacemos</p>
          <h2 className="mt-4 font-display text-display-lg font-medium text-ink">
            Todo lo que tu negocio necesita en pantalla.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12 lg:mt-16">
          {/* Servicio principal: trama de marca de fondo. */}
          <Reveal
            as="article"
            className="surface-panel relative isolate overflow-hidden p-8 md:col-span-7 md:row-span-2 lg:p-10"
          >
            <BrandPattern className="text-accent" size={176} opacity={0.055} />
            <div className="relative flex h-full flex-col">
              <h3 className="font-display text-3xl font-medium text-ink lg:text-4xl">
                {sitios.title}
              </h3>
              <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-muted">
                {sitios.body}
              </p>
              <Points items={[...sitios.points]} />
              <p className="mt-auto pt-10 text-sm text-muted">
                Cada proyecto se programa desde cero: sin constructores visuales,
                sin código heredado que nadie entiende.
              </p>
            </div>
          </Reveal>

          <Reveal
            as="article"
            delay={0.06}
            className="surface-panel p-8 md:col-span-5 lg:p-9"
          >
            <h3 className="font-display text-2xl font-medium text-ink lg:text-3xl">
              {tiendas.title}
            </h3>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">
              {tiendas.body}
            </p>
          </Reveal>

          {/* Bloque de color: da respiro y marca el acento en la grilla. */}
          <Reveal
            as="article"
            delay={0.12}
            className="rounded-[var(--r-panel)] bg-accent p-8 text-accent-ink md:col-span-5 lg:p-9"
          >
            <h3 className="font-display text-2xl font-medium lg:text-3xl">
              {automatizacion.title}
            </h3>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-accent-ink">
              {automatizacion.body}
            </p>
            <Points items={[...automatizacion.points]} tone="inverted" />
          </Reveal>

          <Reveal
            as="article"
            delay={0.06}
            className="surface-panel relative isolate overflow-hidden p-8 md:col-span-6 lg:p-9"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(var(--line-strong)_1px,transparent_1px)] [background-size:18px_18px]"
            />
            <div className="relative">
              <h3 className="font-display text-2xl font-medium text-ink lg:text-3xl">
                {mantenimiento.title}
              </h3>
              <p className="mt-4 max-w-[38ch] text-[1.0625rem] leading-relaxed text-muted">
                {mantenimiento.body}
              </p>
            </div>
          </Reveal>

          <Reveal
            as="article"
            delay={0.12}
            className="surface-panel relative isolate overflow-hidden p-8 md:col-span-6 lg:p-9"
          >
            <Logo
              variant="mark"
              decorative
              className="absolute -right-6 -top-6 h-40 w-auto text-accent opacity-[0.09]"
            />
            <div className="relative">
              <h3 className="font-display text-2xl font-medium text-ink lg:text-3xl">
                {marca.title}
              </h3>
              <p className="mt-4 max-w-[38ch] text-[1.0625rem] leading-relaxed text-muted">
                {marca.body}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
