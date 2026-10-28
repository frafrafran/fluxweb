/**
 * Identidad de FluxWeb para video. Los valores salen de src/app/globals.css
 * del sitio (modo claro): oliva y crema son los únicos colores de marca.
 */
import { loadFont as loadGeist } from "@remotion/google-fonts/Geist";
import { loadFont as loadGeistMono } from "@remotion/google-fonts/GeistMono";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";

export const color = {
  paper: "#f0e9d6",
  paperRaise: "#f7f2e4",
  paperSink: "#e5dcc4",
  ink: "#1b1c12",
  inkSoft: "#3a3c2b",
  muted: "#5c5e43",
  olive: "#67683d",
  oliveStrong: "#4e4f2d",
  oliveLight: "#b9bd7a",
  night: "#14150e",
} as const;

const geist = loadGeist("normal", { weights: ["300", "400", "500"], subsets: ["latin"] });
const mono = loadGeistMono("normal", { weights: ["400", "500"], subsets: ["latin"] });
const playfair = loadPlayfair("normal", { weights: ["500", "600"], subsets: ["latin"] });
loadPlayfair("italic", { weights: ["500", "600"], subsets: ["latin"] });

export const font = {
  sans: geist.fontFamily,
  mono: mono.fontFamily,
  serif: playfair.fontFamily,
} as const;
