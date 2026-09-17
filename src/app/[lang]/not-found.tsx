import Link from "next/link";
import { Container } from "@/components/ui/container";
import { NotFoundCode } from "@/components/sections/not-found-code";
import { getContent } from "@/lib/i18n/server";

export default async function NotFound() {
  const { t, href } = await getContent();

  return (
    <section className="grid min-h-[70dvh] place-items-center py-24">
      <Container size="narrow" className="text-center">
        <NotFoundCode />
        <h1 className="mt-5 font-display text-display-lg font-medium text-ink">
          {t.notFound.title}
        </h1>
        <p className="mx-auto mt-5 max-w-[46ch] text-lg leading-relaxed text-muted">
          {t.notFound.body}
        </p>
        <Link
          href={href("/")}
          className="mt-9 inline-flex h-[3.25rem] items-center justify-center rounded-full bg-accent px-7 font-medium text-accent-ink transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:bg-accent-strong active:translate-y-px"
        >
          {t.notFound.back}
        </Link>
      </Container>
    </section>
  );
}
