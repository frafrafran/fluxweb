import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/lib/site";

export function Work() {
  return (
    <section
      id="trabajos"
      className="scroll-mt-24 border-t border-line bg-paper-sink py-24 sm:py-32 lg:py-40"
    >
      <Container size="wide">
        <Reveal className="max-w-[46ch]">
          <h2 className="font-display text-display-lg font-medium text-ink">
            Lo último que construimos.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-24 lg:mt-20 lg:space-y-32">
          {projects.map((project, index) => {
            const flipped = index % 2 === 1;

            return (
              <Reveal as="article" key={project.slug} distance={30}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
                  aria-label={`Ver el sitio de ${project.name} en una pestaña nueva`}
                >
                  <div
                    className={`overflow-hidden rounded-[var(--r-xl)] border border-line bg-paper shadow-[var(--shadow-soft)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-deep)] lg:col-span-8 ${
                      flipped ? "lg:order-2 lg:col-start-5" : ""
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      width={2000}
                      height={1250}
                      sizes="(max-width: 1024px) 92vw, 780px"
                      className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                    />
                  </div>

                  <div
                    className={`lg:col-span-4 ${flipped ? "lg:order-1 lg:row-start-1" : ""}`}
                  >
                    <p className="text-sm text-muted">{project.sector}</p>
                    <h3 className="mt-3 font-display text-display-md font-medium text-ink">
                      {project.name}
                    </h3>
                    <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">
                      {project.summary}
                    </p>

                    <ul className="mt-7 space-y-2 border-t border-line pt-6">
                      {project.contributions.map((item) => (
                        <li key={item} className="text-[0.9375rem] text-ink-soft">
                          {item}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-7 flex items-center gap-2 font-medium text-accent-text">
                      <span className="link-underline">Ver sitio</span>
                      <ArrowUpRight
                        size={17}
                        weight="bold"
                        aria-hidden="true"
                        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </p>
                    <p className="mt-3 text-sm text-muted">
                      {project.year} · {project.status}
                    </p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
