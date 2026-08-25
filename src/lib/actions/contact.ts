"use server";

import { headers } from "next/headers";
import type { ContactState } from "@/lib/contact-state";
import { projectTypes, site } from "@/lib/site";

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
  // Campo trampa: los formularios automáticos lo completan, las personas no.
  if (clean(formData.get("empresa"), 80) !== "") {
    return { status: "success", message: "Gracias, recibimos tu mensaje." };
  }

  const nombre = clean(formData.get("nombre"), 80);
  const email = clean(formData.get("email"), 120);
  const tipo = clean(formData.get("tipo"), 60);
  const mensaje = clean(formData.get("mensaje"), 2000);

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (nombre.length < 2) fieldErrors.nombre = "Contanos cómo te llamás.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Revisá el correo, no parece válido.";
  if (!(projectTypes as readonly string[]).includes(tipo))
    fieldErrors.tipo = "Elegí una opción de la lista.";
  if (mensaje.length < 10)
    fieldErrors.mensaje = "Escribí al menos una línea sobre tu proyecto.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Faltan algunos datos para poder responderte.",
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
      message: `Recibimos varios mensajes desde este dispositivo. Escribinos a ${site.email}.`,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL ?? "FluxWeb <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn(
      "[contacto] Falta RESEND_API_KEY: el mensaje no se envió por correo.",
    );
    return {
      status: "error",
      message: `El formulario todavía no está conectado. Escribinos a ${site.email} y te respondemos hoy.`,
    };
  }

  // Texto plano: no se interpola contenido de la persona dentro de HTML.
  const body = [
    `Nombre: ${nombre}`,
    `Correo: ${email}`,
    `Tipo de proyecto: ${tipo}`,
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
        subject: `Consulta web · ${tipo} · ${nombre}`,
        text: body,
      }),
    });

    if (!response.ok) {
      console.error("[contacto] Resend respondió", response.status);
      return {
        status: "error",
        message: `No pudimos enviar el mensaje. Probá de nuevo o escribinos a ${site.email}.`,
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
    message: "Listo. Te respondemos dentro de las próximas 24 horas hábiles.",
  };
}
