"use server";

import { headers } from "next/headers";
import type { ContactState } from "@/lib/contact-state";
import { site } from "@/lib/site";
import { defaultLocale, hasLocale } from "@/lib/i18n/config";
import { dictionaries, fill } from "@/lib/i18n/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/**
 * Límite por IP en memoria del proceso. Es una primera barrera contra envíos
 * repetidos; la protección real ante abuso vive en la plataforma.
 */
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const attempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT.max;
}

function clean(value: FormDataEntryValue | null, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  /* El idioma viene en un campo oculto: las Server Actions no pueden leer el
     segmento de la ruta. Si falta o no es válido, se responde en español. */
  const langValue = clean(formData.get("lang"), 5);
  const locale = hasLocale(langValue) ? langValue : defaultLocale;
  const t = dictionaries[locale].contact.action;
  const projectTypes = dictionaries[locale].contact.form.types;
  const withEmail = (template: string) => fill(template, { email: site.email });

  // Campo trampa: los formularios automáticos lo completan, las personas no.
  if (clean(formData.get("empresa"), 80) !== "") {
    return { status: "success", message: t.honeypot };
  }

  const nombre = clean(formData.get("nombre"), 80);
  const email = clean(formData.get("email"), 120);
  const tipo = clean(formData.get("tipo"), 60);
  const mensaje = clean(formData.get("mensaje"), 2000);

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (nombre.length < 2) fieldErrors.nombre = t.nameError;
  if (!EMAIL_RE.test(email)) fieldErrors.email = t.emailError;
  if (!projectTypes.includes(tipo)) fieldErrors.tipo = t.typeError;
  if (mensaje.length < 10) fieldErrors.mensaje = t.messageError;

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: t.missing,
      fieldErrors,
    };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "desconocida";

  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: withEmail(t.rateLimited),
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "FluxWeb <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn(
      "[contacto] Falta RESEND_API_KEY: el mensaje no se envió por correo.",
    );
    return {
      status: "error",
      message: withEmail(t.notConnected),
    };
  }

  // Texto plano: no se interpola contenido de la persona dentro de HTML.
  const body = [
    `${t.mailName}: ${nombre}`,
    `${t.mailEmail}: ${email}`,
    `${t.mailType}: ${tipo}`,
    "",
    mensaje,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [site.email],
        reply_to: email,
        subject: `${t.subject} · ${tipo} · ${nombre}`,
        text: body,
      }),
    });

    if (!response.ok) {
      console.error("[contacto] Resend respondió", response.status);
      return {
        status: "error",
        message: withEmail(t.sendFailed),
      };
    }
  } catch (error) {
    console.error("[contacto] Error de red", error);
    return {
      status: "error",
      message: `No pudimos enviar el mensaje. Probá de nuevo o escribinos a ${site.email}.`,
    };
  }

  return {
    status: "success",
    message: t.success,
  };
}
