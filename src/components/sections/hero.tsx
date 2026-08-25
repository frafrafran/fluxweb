import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MaskReveal, RiseIn } from "@/components/ui/reveal";
import { HeroVisual } from "@/components/sections/hero-visual";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-28 pt-14 sm:pb-32 sm:pt-20 lg:min-h-[44rem] lg:pb-28 lg:pt-24">
      {/* Luz cálida de marca, sin gradientes decorativos sobre el contenido. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] -top-[30%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_65%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 className="font-display text-hero font-medium text-ink">
              <MaskReveal delay={0.05}>La web que tu</MaskReveal>
              <MaskReveal delay={0.16}>
                emprendimiento{" "}
                <em className="italic-safe text-accent">merece</em>.
              </MaskReveal>
            </h1>

            <RiseIn
              as="p"
              delay={0.34}
              className="mt-7 max-w-[46ch] text-lg leading-relaxed text-muted sm:text-xl"
            >
              Sitios a medida, tiendas y automatizaciones para negocios que ya no
              entran en una plantilla.
            </RiseIn>

            <RiseIn delay={0.44}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button
                  href="#contacto"
                  size="lg"
                  icon={<ArrowRight size={18} weight="bold" aria-hidden="true" />}
                >
                  Empezar mi proyecto
                </Button>
                <Button href="#trabajos" variant="outline" size="lg">
                  Ver trabajos
                </Button>
              </div>
            </RiseIn>
          </div>

          <RiseIn delay={0.24} className="lg:col-span-5 lg:-mr-6 xl:-mr-12">
            <HeroVisual />
          </RiseIn>
        </div>
      </Container>
    </section>
  );
}
