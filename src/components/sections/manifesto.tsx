import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function Manifesto() {
  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <Container size="wide">
        <div className="grid gap-y-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-10">
            <h2 className="font-display text-display-lg font-medium text-ink">
              Casi nadie te escribe en el primer intento. Compara, duda y se va
              con el que parece más serio.
            </h2>
          </Reveal>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:gap-12">
            <Reveal delay={0.08}>
              <p className="text-lg leading-relaxed text-muted">
                Un sitio lento, prestado de una plantilla o difícil de leer en el
                celular no cuenta lo que hacés bien. La decisión se toma en
                treinta segundos y casi siempre sin preguntarte nada.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-lg leading-relaxed text-muted">
                Del otro lado pasa algo parecido: responder lo mismo diez veces,
                copiar datos a una planilla, armar cada presupuesto a mano. Son
                las horas que te faltan para vender.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
