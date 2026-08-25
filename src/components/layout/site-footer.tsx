import Link from "next/link";
import { ArrowUp, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { navLinks, site, team } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper-sink">
      <Container size="wide" className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo variant="lockup" className="h-8 w-auto text-ink" decorative />
            <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-muted">
              {site.tagline}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-8 inline-block font-display text-2xl text-ink sm:text-3xl"
            >
              {site.email}
            </a>
          </div>

          <nav
            aria-label="Pie de página"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7"
          >
            <div>
              <h2 className="text-sm font-medium text-ink">Sitio</h2>
              <ul className="mt-5 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="link-underline text-[0.9375rem] text-muted transition-colors duration-300 hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  {/* Ancla nativa: el desplazamiento suave del navegador se
                      pierde si la navegación la maneja el enrutador. */}
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                  <a
                    href="/#contacto"
                    className="link-underline text-[0.9375rem] text-muted transition-colors duration-300 hover:text-ink"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-medium text-ink">Equipo</h2>
              <ul className="mt-5 space-y-3">
                {team.map((member) => (
                  <li key={member.handle}>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-[0.9375rem] text-muted transition-colors duration-300 hover:text-ink"
                    >
                      {member.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-sm font-medium text-ink">Marca</h2>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link
                    href="/marca"
                    className="link-underline text-[0.9375rem] text-muted transition-colors duration-300 hover:text-ink"
                  >
                    Identidad FluxWeb
                  </Link>
                </li>
                <li>
                  <a
                    href={site.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-2 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-ink"
                  >
                    <InstagramLogo size={16} aria-hidden="true" />
                    {site.instagram.handle}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {year} {site.legalName}
          </p>
          <a
            href="#contenido"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-ink"
          >
            Volver arriba
            <ArrowUp
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </Container>
    </footer>
  );
}
