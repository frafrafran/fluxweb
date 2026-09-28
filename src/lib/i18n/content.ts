import { es, type Dictionary } from "./es";
import { en } from "./en";
import { localePath, type Locale } from "./config";
import {
  automationIds,
  brandDownloads,
  brandPalette,
  galleryKeys,
  navLinks,
  processIds,
  projectsData,
  serviceIds,
  stackNames,
  teamData,
} from "@/lib/site";

export const dictionaries: Record<Locale, Dictionary> = { es, en };

/** Rellena marcadores del tipo `{name}` en una cadena del diccionario. */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

/**
 * Une los datos fijos de `site.ts` con el texto del diccionario y devuelve
 * las formas que consumen los componentes. Es una función pura: la usan tanto
 * el servidor (`getContent`) como el cliente (`useContent`).
 */
export function composeContent(locale: Locale) {
  const t = dictionaries[locale];

  return {
    locale,
    t,
    href: (path: string) => localePath(locale, path),

    navLinks: navLinks.map((link) => ({
      ...link,
      href: localePath(locale, link.href),
      label: t.nav.links[link.id],
    })),

    services: serviceIds.map((id) => ({ id, ...t.services.items[id] })),

    projects: projectsData.map((project) => ({
      ...project,
      ...t.work.projects[project.slug],
      statusLabel: t.work.status[project.status],
    })),

    stack: stackNames.map((name) => ({ name, role: t.stack.roles[name] })),

    processSteps: processIds.map((id) => ({ id, ...t.process.steps[id] })),

    automationCases: automationIds.map((id) => ({
      id,
      ...t.automation.cases[id],
    })),

    galleryColumns: galleryKeys.map((column) =>
      column.map((key) => ({
        key,
        src: `/work/referencias/${key}.webp`,
        alt: t.gallery.alts[key],
      })),
    ),

    team: teamData.map((member) => ({
      ...member,
      ...t.team.members[member.key],
    })),

    faqs: t.faq.items,
    projectTypes: t.contact.form.types,

    brandPalette: brandPalette.map((color) => ({
      ...color,
      ...t.brand.palette[color.key],
    })),
    brandDownloads: brandDownloads.map((item) => ({
      ...item,
      href: `/brand/${item.file}`,
      label: t.brand.downloads[item.file],
    })),
  };
}

export type Content = ReturnType<typeof composeContent>;
export type Project = Content["projects"][number];
export type Service = Content["services"][number];
export type ProcessStep = Content["processSteps"][number];
export type AutomationCase = Content["automationCases"][number];
export type TeamMember = Content["team"][number];
