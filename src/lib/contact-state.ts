/**
 * Estado del formulario de contacto.
 * Vive fuera del archivo "use server": esos módulos solo pueden exportar
 * funciones asíncronas, nunca objetos ni constantes.
 */
export type ContactField = "nombre" | "email" | "mensaje" | "tipo";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactState = { status: "idle" };
