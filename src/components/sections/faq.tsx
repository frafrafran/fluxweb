import { Plus } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { faqs } from "@/lib/site";

/**
 * Acordeón nativo: <details> funciona sin JavaScript, es accesible por
 * teclado y el navegador ya resuelve el estado abierto/cerrado.
 */
export function Faq() {
  return (
    <section className="border-t border-line py-24 sm:py-32 lg:py-40">
      <Container size="narrow">
        <Reveal>
          <h2 className="font-display text-display-lg font-medium text-ink">
            Preguntas que siempre nos hacen.
          </h2>
        </Reveal>

        <div className="mt-12 lg:mt-14">
          {faqs.map((faq, index) => (
            <Reveal key={faq.q} delay={index * 0.04}>
              <details className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-medium text-ink transition-colors duration-300 hover:text-accent [&::-webkit-details-marker]:hidden">
                  <span className="max-w-[46ch]">{faq.q}</span>
                  <Plus
                    size={20}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-accent transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45"
                  />
                </summary>
                <div className="faq-body pb-7 pr-10">
                  <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted">
                    {faq.a}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
