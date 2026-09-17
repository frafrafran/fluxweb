"use client";

import {
  EnvelopeSimple,
  GithubLogo,
  InstagramLogo,
} from "@phosphor-icons/react";
import {
  Dock,
  DockIcon,
  DockItem,
  DockLabel,
} from "@/components/motion-primitives/dock";
import { site } from "@/lib/site";
import { useContent } from "@/lib/i18n/client";

/**
 * Accesos directos del pie.
 * Los mismos destinos ya están listados arriba en texto: esto es un atajo, no
 * la única puerta. Cada pieza crece al acercarse el cursor y muestra su
 * nombre, así el ícono nunca queda solo.
 *
 * Se oculta en pantallas chicas: sin cursor no hay nada que magnificar y las
 * listas de texto del pie cumplen la misma función.
 */
export function FooterDock() {
  const { t, team } = useContent();
  const links = [
    {
      title: site.instagram.handle,
      href: site.instagram.url,
      icon: <InstagramLogo size={20} aria-hidden="true" />,
    },
    ...team.map((member) => ({
      title: `${member.name} · ${member.handle}`,
      href: member.instagram,
      icon: (
        <span aria-hidden="true" className="font-display text-sm">
          {member.initials}
        </span>
      ),
    })),
    {
      title: site.email,
      href: `mailto:${site.email}`,
      icon: <EnvelopeSimple size={20} aria-hidden="true" />,
    },
    {
      title: t.footer.code,
      href: site.repo,
      icon: <GithubLogo size={20} aria-hidden="true" />,
    },
  ];

  return (
    <div className="hidden justify-center pt-14 sm:flex">
      <Dock
        label={t.footer.dock}
        panelHeight={56}
        magnification={72}
        distance={130}
        className="items-end rounded-full border border-line bg-paper-raise px-3 pb-2"
      >
        {links.map((link) => (
          <DockItem
            key={link.href}
            className="aspect-square rounded-full border border-line bg-paper text-ink"
          >
            <DockLabel className="rounded-full border border-line bg-paper-raise px-3 py-1 text-xs text-ink">
              {link.title}
            </DockLabel>
            <DockIcon>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={link.title}
                className="grid size-full place-items-center rounded-full"
              >
                {link.icon}
              </a>
            </DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}
