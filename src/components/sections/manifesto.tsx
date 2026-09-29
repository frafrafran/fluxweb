import { Container } from "@/components/ui/container";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";
import { getContent } from "@/lib/i18n/server";

/**
 * Una pantalla, una idea: el titular solo. Lo que antes lo seguía repetía
 * las pestañas de Automatización y le restaba peso a la frase.
 */
export async function Manifesto() {
  const { t } = await getContent();

  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <Container size="wide">
        <div className="lg:w-10/12">
          <ScrollRevealText
            as="h2"
            className="font-display text-display-lg font-medium text-ink"
            text={t.manifesto.headline}
          />
        </div>
      </Container>
    </section>
  );
}
