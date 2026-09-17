import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Motion Primitives (MIT) se copia tal cual desde el upstream para poder
  // actualizarlo con la CLI. Se corrigieron los fallos reales -- tipos de
  // Motion 13, componentes creados en render, rutas de los hooks -- pero el
  // estilo del upstream (setState de montaje, `any`, `@ts-ignore` heredados de
  // react-aria) queda como aviso en vez de error para no reescribir codigo
  // ajeno en cada actualizacion. El resto del proyecto sigue en estricto.
  {
    files: ["src/components/motion-primitives/**"],
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
