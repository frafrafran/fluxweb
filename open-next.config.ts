import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Las páginas pregeneradas (`/es`, `/en`, `/es/marca`, `/en/marca`) se sirven
 * a través de la caché incremental. Como todo el sitio es SSG y no hay ISR ni
 * `use cache`, alcanza con la caché de assets estáticos: solo lectura, sin
 * bucket de R2 ni KV que administrar. Si algún día se suma contenido que se
 * regenere solo, acá se cambia por `r2IncrementalCache`.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
