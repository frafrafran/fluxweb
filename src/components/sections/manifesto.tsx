import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";
import { getContent } from "@/lib/i18n/server";

export async function Manifesto() {
  const { t } = await getContent();

  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <Container size="wide">
        <div className="grid gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-10">
            <ScrollRevealText
              as="h2"
              className="font-display text-display-lg font-medium text-ink"
              text={t.manifesto.headline}
            />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:gap-12">
            <Reveal delay={0.08}>
              <p className="text-lg leading-relaxed text-muted">
                {t.manifesto.p1}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-lg leading-relaxed text-muted">
                {t.manifesto.p2}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
