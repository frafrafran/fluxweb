import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { site } from "@/lib/site";

const afterSteps = [
  "Leemos tu mensaje y respondemos con preguntas concretas.",
  "Charlamos media hora por videollamada o por donde te quede cómodo.",
  "Te pasamos un presupuesto cerrado, con etapas y fechas.",
];

export function Contact() {
  return (
    <section
      id="contacto"
      className="scroll-mt-24 border-t border-line bg-paper-sink py-24 sm:py-32 lg:py-40"
    >
      <Container size="wide">
        <Reveal className="max-w-[34rem]">
          <p className="text-eyebrow">Empecemos</p>
          <h2 className="mt-4 font-display text-display-lg font-medium text-ink">
            Contanos qué querés construir.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <a
              href={`mailto:${site.email}`}
              className="link-underline inline-block font-display text-2xl text-ink sm:text-3xl"
            >
              {site.email}
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-fit items-center gap-2 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-ink"
            >
              <InstagramLogo size={17} aria-hidden="true" />
              <span className="link-underline">{site.instagram.handle}</span>
            </a>

            <ol className="mt-12 space-y-px">
              {afterSteps.map((step) => (
                <li
                  key={step}
                  className="border-t border-line py-5 text-[0.9375rem] leading-relaxed text-ink-soft last:border-b"
                >
                  {step}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
