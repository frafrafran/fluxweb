import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { ShowcaseHeading } from "@/components/sections/showcase-heading";
import { Reveal } from "@/components/ui/reveal";
import { ThreeDMarquee } from "@/components/ui/three-d-marquee";
import { workViews } from "@/lib/site";
import { getContent } from "@/lib/i18n/server";

/**
 * Banda de cierre del bloque de trabajos.
 * Es el único bloque de color plano de la página: mantiene el oliva profundo
 * en ambos temas, así que no invierte el modo, lo interrumpe a propósito.
 * El haz de luz superior está inspirado en el efecto "lamp" de Aceternity,
 * rehecho con la luz cálida de la marca en lugar del cian original.
 */
export async function Showcase() {
  const { t } = await getContent();

  return (
    <section
      data-reveal
      className="relative isolate flex min-h-[30rem] items-center overflow-hidden bg-[#23251a] py-24 text-[#f0e9d6] sm:min-h-[34rem] lg:min-h-[40rem] lg:py-28"
    >
      {/* Capturas reales de los proyectos, inclinadas en 3D. */}
      <div className="absolute inset-0 opacity-[0.7]">
        <ThreeDMarquee images={workViews} className="h-full" />
      </div>

      {/* Velo que devuelve legibilidad al centro. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_46%_52%_at_50%_52%,rgba(35,37,26,0.94)_45%,rgba(35,37,26,0.6)_72%,rgba(35,37,26,0.15)_100%)]"
      />
      {/* En pantallas chicas el texto ocupa casi todo el ancho: se refuerza el velo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#23251a]/45 sm:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(to_bottom,#23251a,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,#23251a,transparent)]"
      />

      <Beam />

      <Container size="wide" className="relative z-10 text-center">
        <Reveal>
          <ShowcaseHeading>{t.showcase.title}</ShowcaseHeading>
          <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-[#c3c4ac]">
            {t.showcase.body}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <a
            href="#contacto"
            className="group/btn inline-flex h-[3.25rem] items-center justify-center gap-2.5 rounded-full bg-[#f0e9d6] px-7 font-medium text-[#23251a] transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:bg-white active:translate-y-px active:scale-[0.985]"
          >
            {t.showcase.cta}
            <ArrowRight
              size={18}
              weight="bold"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

/** Haz de luz cálido que baja desde el borde superior de la banda. */
function Beam() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-72 overflow-hidden"
    >
      <div className="beam-line absolute left-1/2 top-0 h-px -translate-x-1/2 bg-[#b9bd7a]" />
      <div className="beam-core absolute left-1/2 top-0 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b9bd7a] opacity-40 blur-3xl" />
      <div className="beam-cone absolute left-1/2 top-0 h-64 -translate-x-1/2 bg-[conic-gradient(from_180deg_at_50%_0%,transparent_0deg,rgba(185,189,122,0.22)_25deg,transparent_60deg,transparent_300deg,rgba(185,189,122,0.22)_335deg,transparent_360deg)]" />
    </div>
  );
}
