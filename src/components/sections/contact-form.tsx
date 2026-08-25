"use client";

import { useActionState, useId } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle, Warning } from "@phosphor-icons/react/dist/ssr";
import { submitContact } from "@/lib/actions/contact";
import { initialContactState } from "@/lib/contact-state";
import { projectTypes, site } from "@/lib/site";

const fieldBase =
  "w-full rounded-[var(--r-input)] border bg-paper px-4 py-3 text-[0.9375rem] text-ink " +
  "placeholder:text-muted/80 transition-colors duration-300 " +
  "focus:border-accent focus:outline-none focus-visible:outline-none";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialContactState,
  );
  const reduce = useReducedMotion();
  const id = useId();

  const errors = state.fieldErrors ?? {};

  const field = (name: keyof typeof errors) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
    className: `${fieldBase} ${errors[name] ? "border-danger" : "border-line-strong"}`,
  });

  if (state.status === "success") {
    return (
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="surface-panel flex h-full flex-col justify-center p-8 sm:p-10"
        role="status"
      >
        <CheckCircle
          size={34}
          weight="light"
          aria-hidden="true"
          className="text-accent"
        />
        <h3 className="mt-5 font-display text-display-md font-medium text-ink">
          Mensaje enviado.
        </h3>
        <p className="mt-3 max-w-[40ch] text-[1.0625rem] leading-relaxed text-muted">
          {state.message}
        </p>
        <a
          href={`mailto:${site.email}`}
          className="link-underline mt-8 self-start text-[0.9375rem] text-accent-text"
        >
          {site.email}
        </a>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="surface-panel p-6 sm:p-8 lg:p-10" noValidate>
      <AnimatePresence>
        {state.status === "error" && state.message ? (
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="alert"
            className="mb-6 flex items-start gap-2.5 rounded-[var(--r-input)] border border-danger bg-danger-soft px-4 py-3 text-[0.9375rem] text-ink"
          >
            <Warning
              size={18}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-danger"
            />
            {state.message}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${id}-nombre`}
            className="mb-2 block text-sm font-medium text-ink"
          >
            Nombre
          </label>
          <input
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            required
            {...field("nombre")}
          />
          {errors.nombre ? (
            <FieldError id={`${id}-nombre-error`}>{errors.nombre}</FieldError>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${id}-email`}
            className="mb-2 block text-sm font-medium text-ink"
          >
            Correo
          </label>
          <input
            type="email"
            autoComplete="email"
            placeholder="nombre@correo.com"
            required
            {...field("email")}
          />
          {errors.email ? (
            <FieldError id={`${id}-email-error`}>{errors.email}</FieldError>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor={`${id}-tipo`}
          className="mb-2 block text-sm font-medium text-ink"
        >
          Qué necesitás
        </label>
        <select defaultValue={projectTypes[0]} required {...field("tipo")}>
          {projectTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.tipo ? (
          <FieldError id={`${id}-tipo-error`}>{errors.tipo}</FieldError>
        ) : null}
      </div>

      <div className="mt-5">
        <label
          htmlFor={`${id}-mensaje`}
          className="mb-2 block text-sm font-medium text-ink"
        >
          Tu proyecto
        </label>
        <textarea
          rows={5}
          placeholder="Qué vendés, a quién y qué te gustaría lograr con el sitio."
          required
          {...field("mensaje")}
        />
        <p className="mt-2 text-sm text-muted">
          Con dos o tres líneas alcanza para la primera respuesta.
        </p>
        {errors.mensaje ? (
          <FieldError id={`${id}-mensaje-error`}>{errors.mensaje}</FieldError>
        ) : null}
      </div>

      {/* Campo trampa para envíos automáticos: invisible y fuera del recorrido de foco. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-empresa`}>No completar</label>
        <input id={`${id}-empresa`} name="empresa" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="group/btn mt-8 inline-flex h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-full bg-accent px-7 font-medium text-accent-ink shadow-[var(--shadow-sm)] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:bg-accent-strong hover:shadow-[var(--shadow-md)] active:translate-y-px active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {isPending ? "Enviando" : "Enviar consulta"}
        {isPending ? (
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-accent-ink/30 border-t-accent-ink"
          />
        ) : (
          <ArrowRight
            size={18}
            weight="bold"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        )}
      </button>

      <p className="mt-5 text-sm text-muted">
        Usamos tus datos solo para responderte esta consulta.
      </p>
    </form>
  );
}

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="mt-2 text-sm text-danger">
      {children}
    </p>
  );
}
