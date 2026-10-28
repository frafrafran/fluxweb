import { Composition } from "remotion";
import { HacemosWebs, DURACION } from "./HacemosWebs";

export const Root = () => (
  <Composition
    id="HacemosWebs"
    component={HacemosWebs}
    durationInFrames={DURACION}
    fps={60}
    width={1080}
    height={1920}
  />
);
