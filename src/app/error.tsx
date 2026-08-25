"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="grid min-h-[70dvh] place-items-center py-24">
      <Container size="narrow" className="text-center">
        <h1 className="font-display text-display-lg font-medium text-ink">
          Algo se rompió de nuestro lado.
        </h1>
        <p className="mx-auto mt-5 max-w-[46ch] text-lg leading-relaxed text-muted">
          Probá de nuevo. Si vuelve a pasar, escribinos a{" "}
          <a href={`mailto:${site.email}`} className="link-underline text-accent-text">
            {site.email}
          </a>{" "}
          y lo revisamos.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-9 inline-flex h-[3.25rem] items-center justify-center rounded-full bg-accent px-7 font-medium text-accent-ink transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:bg-accent-strong active:translate-y-px"
        >
          Reintentar
        </button>
      </Container>
    </section>
  );
}
