import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";
import { Process } from "@/components/sections/process";
import { Automation } from "@/components/sections/automation";
import { Team } from "@/components/sections/team";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Services />
      <Work />
      <Process />
      <Automation />
      <Team />
      <Faq />
      <Contact />
    </>
  );
}
