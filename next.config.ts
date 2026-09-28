import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/* En `next dev`, expone los bindings de Cloudflare (vars, assets) igual que
   en producción. No hace nada en el build. */
initOpenNextCloudflareForDev();

/** Cabeceras de seguridad aplicadas a todas las rutas. */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Solo se sirven imágenes propias: no hace falta habilitar dominios externos.
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    /* El paquete de iconos exporta miles de modulos desde su raiz. Los
       componentes de servidor ya importan de `dist/ssr`, pero los de cliente
       necesitan la raiz: con esto Next carga solo los iconos usados. */
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  /* El enrutado por idioma vive en `src/proxy.ts`. */
};

export default nextConfig;
