import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { BrandPattern } from "@/components/brand/brand-pattern";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Identidad de marca",
  description:
    "Sistema visual de FluxWeb: símbolo, logotipo, paleta, tipografía y tono de voz, con los archivos listos para descargar.",
  alternates: { canonical: "/marca" },
};

const palette = [
  {
    name: "Oliva FluxWeb",
    hex: "#67683D",
    use: "Acento único: botones, enlaces y bloques de color.",
    swatch: "#67683D",
    ink: "#F7F2E2",
  },
  {
    name: "Crema",
    hex: "#F0E9D6",
    use: "Fondo principal del modo claro. Es el papel de la marca.",
    swatch: "#F0E9D6",
    ink: "#1B1C12",
  },
  {
    name: "Crema profunda",
    hex: "#E5DCC4",
    use: "Superficies que separan una sección de la siguiente.",
    swatch: "#E5DCC4",
    ink: "#1B1C12",
  },
  {
    name: "Tinta",
    hex: "#1B1C12",
    use: "Texto principal sobre crema.",
    swatch: "#1B1C12",
    ink: "#F0E9D6",
  },
  {
    name: "Oliva noche",
    hex: "#14150E",
    use: "Fondo del modo oscuro.",
    swatch: "#14150E",
    ink: "#F0E9D6",
  },
  {
    name: "Oliva claro",
    hex: "#B9BD7A",
    use: "El acento en modo oscuro, para sostener el contraste.",
    swatch: "#B9BD7A",
    ink: "#14150E",
  },
];

const misuses = [
  "Estirar o comprimir el símbolo: siempre escala proporcional.",
  "Rotarlo o inclinarlo. El nudo se lee en una sola posición.",
  "Aplicar sombras, brillos o degradados sobre el trazo.",
  "Colocarlo sobre fotos con poco contraste sin una capa que lo separe.",
  "Cambiar el color por fuera de la paleta: oliva, crema o tinta.",
];

const voice = [
  {
    title: "Directo",
    body: "Frases cortas, sin vueltas. Si algo se puede decir en cinco palabras, se dice en cinco.",
  },
  {
    title: "Concreto",
    body: "Hablamos de lo que hacemos y de lo que cuesta. Nada de promesas que no podamos sostener.",
  },
  {
    title: "Cercano",
    body: "Tuteo argentino, como en una charla de trabajo. Ni solemnes ni forzadamente graciosos.",
  },
  {
    title: "Sin jerga",
    body: "Si una palabra técnica no aporta, se reemplaza. El cliente no tiene por qué saber qué es un framework.",
  },
];

const downloads = [
  { href: "/brand/lockup-olive.png", label: "Logotipo, versión oliva" },
  { href: "/brand/lockup-cream.png", label: "Logotipo, versión crema" },
  { href: "/brand/mark-olive.png", label: "Símbolo, versión oliva" },
  { href: "/brand/mark-cream.png", label: "Símbolo, versión crema" },
];

export default function MarcaPage() {
  return (
    <>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pt-24">
        <Container size="wide">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-ink"
          >
            <ArrowLeft
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Volver al inicio
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <h1 className="font-display text-display-lg font-medium text-ink">
                La identidad de FluxWeb.
              </h1>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
                Un símbolo, dos colores y dos familias tipográficas. Este es el
                sistema con el que firmamos todo lo que hacemos, y el mismo que
                construimos para las marcas que confían en nosotros.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="relative isolate grid aspect-[4/3] place-items-center overflow-hidden rounded-[var(--r-xl)] bg-accent p-10">
                <BrandPattern
                  className="text-accent-ink"
                  size={120}
                  opacity={0.08}
                />
                <Logo
                  variant="mark"
                  className="relative h-32 w-auto text-accent-ink sm:h-40"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <h2 className="font-display text-display-md font-medium text-ink">
                El símbolo
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                Dos lazos que se cruzan y no terminan nunca. Es un flujo: la
                gente que llega, el pedido que entra, la tarea que se resuelve
                sola y vuelve a empezar. Se dibuja con un trazo de grosor
                constante, sin puntas ni sombras.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">
                Alrededor del logotipo dejamos siempre un aire equivalente a la
                altura de la letra F. Nunca se usa por debajo de 24 píxeles de
                alto en pantalla.
              </p>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              <Reveal className="surface-panel grid place-items-center p-10">
                <Logo variant="lockup" className="h-8 w-auto text-ink" />
              </Reveal>
              <Reveal
                delay={0.06}
                className="grid place-items-center rounded-[var(--r-panel)] bg-ink p-10"
              >
                <Logo variant="lockup" className="h-8 w-auto text-paper" />
              </Reveal>
              <Reveal
                delay={0.12}
                className="surface-panel grid place-items-center p-10"
              >
                <Logo variant="mark" className="h-16 w-auto text-accent" />
              </Reveal>
              <Reveal
                delay={0.18}
                className="grid place-items-center rounded-[var(--r-panel)] bg-accent p-10"
              >
                <Logo variant="mark" className="h-16 w-auto text-accent-ink" />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-sink py-20 sm:py-24">
        <Container size="wide">
          <Reveal>
            <h2 className="font-display text-display-md font-medium text-ink">
              Color
            </h2>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {palette.map((color, index) => (
              <Reveal
                as="li"
                key={color.hex}
                delay={index * 0.04}
                className="overflow-hidden rounded-[var(--r-panel)] border border-line"
              >
                <div
                  className="flex h-28 items-end p-4"
                  style={{ backgroundColor: color.swatch, color: color.ink }}
                >
                  <span className="font-mono text-xs">{color.hex}</span>
                </div>
                <div className="bg-paper-raise p-5">
                  <h3 className="text-[0.9375rem] font-medium text-ink">
                    {color.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {color.use}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[62ch] text-sm leading-relaxed text-muted">
              El oliva y la crema son los únicos colores de marca. Todo lo demás
              son neutros derivados de esos dos. Cada combinación de texto y
              fondo del sitio cumple el contraste mínimo AA de las pautas WCAG.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-4">
              <h2 className="font-display text-display-md font-medium text-ink">
                Tipografía
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                El logotipo es una serif de alto contraste, así que los títulos
                la acompañan. El texto corriente usa una grotesca neutra para
                que la lectura sea cómoda en pantallas chicas.
              </p>
            </Reveal>

            <div className="lg:col-span-8">
              <Reveal className="border-t border-line pt-7">
                <p className="text-sm text-muted">
                  Playfair Display · títulos
                </p>
                <p className="mt-4 font-display text-5xl font-medium text-ink sm:text-6xl">
                  Aa Bb Cc 0123
                </p>
              </Reveal>

              <Reveal delay={0.06} className="mt-10 border-t border-line pt-7">
                <p className="text-sm text-muted">Geist · texto e interfaz</p>
                <p className="mt-4 text-4xl text-ink sm:text-5xl">Aa Bb Cc 0123</p>
              </Reveal>

              <Reveal delay={0.12} className="mt-10 border-t border-line pt-7">
                <p className="text-sm text-muted">Geist Mono · etiquetas</p>
                <p className="mt-4 font-mono text-3xl uppercase tracking-[0.12em] text-ink sm:text-4xl">
                  Aa Bb 0123
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-sink py-20 sm:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
            <div>
              <Reveal>
                <h2 className="font-display text-display-md font-medium text-ink">
                  Tono de voz
                </h2>
              </Reveal>
              <dl className="mt-8">
                {voice.map((item, index) => (
                  <Reveal key={item.title} delay={index * 0.05}>
                    <div className="border-t border-line py-5">
                      <dt className="text-[0.9375rem] font-medium text-ink">
                        {item.title}
                      </dt>
                      <dd className="mt-1.5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
                        {item.body}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>

            <div>
              <Reveal>
                <h2 className="font-display text-display-md font-medium text-ink">
                  Qué no hacer
                </h2>
              </Reveal>
              <ul className="mt-8">
                {misuses.map((item, index) => (
                  <Reveal as="li" key={item} delay={index * 0.05}>
                    <span className="block border-t border-line py-5 text-[0.9375rem] leading-relaxed text-muted">
                      {item}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-24">
        <Container size="wide">
          <Reveal>
            <h2 className="font-display text-display-md font-medium text-ink">
              Archivos
            </h2>
            <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted">
              PNG con fondo transparente, listos para redes, documentos y
              presentaciones. Si necesitás el vector para imprenta, escribinos a{" "}
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-accent-text"
              >
                {site.email}
              </a>
              .
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {downloads.map((file, index) => (
              <Reveal as="li" key={file.href} delay={index * 0.04}>
                <a
                  href={file.href}
                  download
                  className="group flex items-center justify-between gap-4 rounded-[var(--r-panel)] border border-line bg-paper-raise px-6 py-5 text-[0.9375rem] text-ink transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:border-accent hover:bg-accent-soft"
                >
                  {file.label}
                  <DownloadSimple
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-accent transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </a>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
