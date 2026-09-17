import { Hero } from "@/components/sections/hero";
import { Showreel } from "@/components/sections/showreel";
import { Manifesto } from "@/components/sections/manifesto";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";
import { Showcase } from "@/components/sections/showcase";
import { Stack } from "@/components/sections/stack";
import { Process } from "@/components/sections/process";
import { ParallaxBand } from "@/components/sections/parallax-band";
import { Automation } from "@/components/sections/automation";
import { Reach } from "@/components/sections/reach";
import { Gallery } from "@/components/sections/gallery";
import { Team } from "@/components/sections/team";
import { PromiseBand } from "@/components/sections/promise-band";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Showreel />
      <Manifesto />
      <Services />
      <Work />
      <Showcase />
      <Stack />
      <Process />
      <ParallaxBand />
      <Automation />
      <Reach />
      <Gallery />
      <Team />
      <PromiseBand />
      <Faq />
      <Contact />
    </>
  );
}
