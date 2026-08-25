import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { team } from "@/lib/site";

/*
 * TODO (cliente): si quieren retratos reales, guardar cada foto en
 * /public/team/<nombre>.webp recortada 1:1 a 800x800 y reemplazar el
 * monograma por <Image ... className="size-full object-cover" />.
 */

export function Team() {
  return (
    <section id="equipo" className="scroll-mt-24 py-24 sm:py-32 lg:py-40">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-display-lg font-medium text-ink">
              Tres personas, no una agencia anónima.
            </h2>
            <p className="mt-5 max-w-[34ch] text-lg leading-relaxed text-muted">
              Vas a hablar siempre con quien hace el trabajo. Sin intermediarios
              ni tickets que nadie contesta.
            </p>
          </Reveal>

          <ul className="lg:col-span-7">
            {team.map((member, index) => (
              <Reveal as="li" key={member.handle} delay={index * 0.06}>
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 border-t border-line py-7 transition-colors duration-300 hover:bg-accent-soft sm:gap-7"
                  aria-label={`${member.name}, ${member.role}. Instagram ${member.handle}`}
                >
                  <span
                    aria-hidden="true"
                    className="grid size-14 shrink-0 place-items-center rounded-full bg-accent font-display text-lg text-accent-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 sm:size-16 sm:text-xl"
                  >
                    {member.initials}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-2xl font-medium text-ink sm:text-3xl">
                      {member.name}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] text-accent-text">
                      {member.role}
                    </span>
                    <span className="mt-2 block max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted">
                      {member.focus}
                    </span>
                  </span>

                  <span className="hidden shrink-0 items-center gap-2 text-sm text-muted transition-colors duration-300 group-hover:text-ink sm:flex">
                    {member.handle}
                    <ArrowUpRight
                      size={16}
                      weight="bold"
                      aria-hidden="true"
                      className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
