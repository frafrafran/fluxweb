import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="grid min-h-[70dvh] place-items-center py-24">
      <Container size="narrow" className="text-center">
        <p className="text-eyebrow">Error 404</p>
        <h1 className="mt-5 font-display text-display-lg font-medium text-ink">
          Esta página no existe.
        </h1>
        <p className="mx-auto mt-5 max-w-[46ch] text-lg leading-relaxed text-muted">
          Puede que el enlace haya cambiado o que la dirección tenga un error.
          Desde el inicio llegás a todo.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex h-[3.25rem] items-center justify-center rounded-full bg-accent px-7 font-medium text-accent-ink transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:bg-accent-strong active:translate-y-px"
        >
          Volver al inicio
        </Link>
      </Container>
    </section>
  );
}
