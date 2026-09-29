import { ArrowRight, ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MaskReveal, RiseIn } from "@/components/ui/reveal";
import { getContent } from "@/lib/i18n/server";

/**
 * Portada: una sola cosa por vez. El titular ocupa todo el ancho, como en los
 * estudios que se usaron de referencia (Pentagram, Locomotive, Huge), y el
 * trabajo aparece justo abajo, en el Showreel y en Trabajos.
 *
 * Es entera de servidor: el movimiento lo pone el titular al entrar, no la
 * interfaz. Sin botones magnéticos ni halos en bucle, que además seguían
 * moviéndose con «reducir movimiento».
 */
export async function Hero() {
  const { t } = await getContent();

  return (
    <section className="relative overflow-hidden pb-20 pt-14 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
      {/* Luz cálida de marca, sin gradientes decorativos sobre el contenido. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] -top-[30%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_65%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        <p className="text-eyebrow">{t.hero.eyebrow}</p>

        <h1 className="mt-6 font-display text-hero font-medium text-ink lg:mt-8">
          <MaskReveal delay={0.05}>{t.hero.titleStart}</MaskReveal>
          <MaskReveal delay={0.14}>
            {t.hero.titleMid}{" "}
            <em className="italic-safe text-accent">{t.hero.titleEm}</em>.
          </MaskReveal>
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <RiseIn
            as="p"
            delay={0.3}
            className="max-w-[46ch] text-lg leading-relaxed text-muted sm:text-xl lg:col-span-6"
          >
            {t.hero.subtitle}
          </RiseIn>

          <RiseIn delay={0.4} className="lg:col-span-6 lg:justify-self-end">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
              <Button
                href="#contacto"
                size="lg"
                icon={<ArrowRight size={18} weight="bold" aria-hidden="true" />}
              >
                {t.hero.cta}
              </Button>
              {/* Atajo a la prueba: enlace de texto, no un segundo botón que
                  compita con el principal. */}
              <a
                href="#trabajos"
                className="link-underline inline-flex items-center gap-2 py-2 font-medium text-ink"
              >
                {t.hero.secondary}
                <ArrowDown size={16} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </RiseIn>
        </div>
      </Container>
    </section>
  );
}
