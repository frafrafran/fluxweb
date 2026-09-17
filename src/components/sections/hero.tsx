import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MaskReveal, RiseIn } from "@/components/ui/reveal";
import { Magnetic } from "@/components/motion-primitives/magnetic";
import { HeroVisual } from "@/components/sections/hero-visual";
import {
  CtaGlow,
  HeroEyebrow,
  HeroSeal,
} from "@/components/sections/hero-accents";
import { getContent } from "@/lib/i18n/server";

export async function Hero() {
  const { t } = await getContent();

  return (
    <section className="relative overflow-hidden pb-28 pt-14 sm:pb-32 sm:pt-20 lg:min-h-[42rem] lg:pb-24 lg:pt-24">
      {/* Luz cálida de marca, sin gradientes decorativos sobre el contenido. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] -top-[30%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_65%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <HeroEyebrow />

            <h1 className="mt-6 font-display text-hero font-medium text-ink">
              <MaskReveal delay={0.05}>{t.hero.titleStart}</MaskReveal>
              <MaskReveal delay={0.16}>
                {t.hero.titleMid}{" "}
                <em className="italic-safe text-accent">{t.hero.titleEm}</em>.
              </MaskReveal>
            </h1>

            <RiseIn
              as="p"
              delay={0.34}
              className="mt-7 max-w-[46ch] text-lg leading-relaxed text-muted sm:text-xl"
            >
              {t.hero.subtitle}
            </RiseIn>

            <RiseIn delay={0.44}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Magnetic intensity={0.35} range={110} actionArea="self">
                  {/* El halo late detrás del botón, con los verdes de la marca
                      y sin interceptar el clic. */}
                  <div className="relative w-fit">
                    <CtaGlow />
                    <Button
                      href="#contacto"
                      size="lg"
                      className="relative"
                      icon={
                        <ArrowRight
                          size={18}
                          weight="bold"
                          aria-hidden="true"
                        />
                      }
                    >
                      {t.hero.cta}
                    </Button>
                  </div>
                </Magnetic>
                <Button href="#trabajos" variant="outline" size="lg">
                  {t.hero.secondary}
                </Button>
              </div>
            </RiseIn>

            <HeroSeal />
          </div>

          <RiseIn delay={0.24} className="lg:col-span-5 lg:-mr-6 xl:-mr-12">
            <HeroVisual />
          </RiseIn>
        </div>
      </Container>
    </section>
  );
}
