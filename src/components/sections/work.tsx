import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { WorkImage } from "@/components/sections/work-image";
import { WorkCursor } from "@/components/sections/work-cursor";
import { getContent } from "@/lib/i18n/server";
import { fill } from "@/lib/i18n/content";

export async function Work() {
  const { t, projects } = await getContent();

  return (
    <section
      id="trabajos"
      className="scroll-mt-24 border-t border-line bg-paper-sink py-24 sm:py-32 lg:py-40"
    >
      <Container size="wide">
        <Reveal className="max-w-[46ch]">
          <h2 className="font-display text-display-lg font-medium text-ink">
            {t.work.title}
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
                  aria-label={fill(t.work.openAria, { name: project.name })}
                >
                  <WorkCursor
                    label={fill(t.work.open, { name: project.name })}
                  />

                  <WorkImage
                    src={project.image}
                    alt={project.imageAlt}
                    className={`lg:col-span-8 ${
                      flipped ? "lg:order-2 lg:col-start-5" : ""
                    }`}
                  />

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
                        <li
                          key={item}
                          className="text-[0.9375rem] text-ink-soft"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-7 flex items-center gap-2 font-medium text-accent-text">
                      <span className="link-underline">{t.work.seeSite}</span>
                      <ArrowUpRight
                        size={17}
                        weight="bold"
                        aria-hidden="true"
                        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </p>
                    <p className="mt-3 text-sm text-muted">
                      {project.year} · {project.statusLabel}
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
