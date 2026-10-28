import { Config } from "@remotion/cli/config";

// Cuadros en PNG: sin pérdida antes del encode final, que es donde se decide
// la calidad (CRF 14 en el script de render).
Config.setVideoImageFormat("png");
Config.setOverwriteOutput(true);
