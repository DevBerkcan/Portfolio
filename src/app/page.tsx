import Preloader from "@/components/layout/Preloader";
import Hero from "@/components/sections/Hero";
import StackTicker from "@/components/sections/StackTicker";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Ventures from "@/components/sections/Ventures";
import Journey from "@/components/sections/Journey";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <main id="main">
        <Hero />
        <StackTicker />
        <About />
        <Services />
        <Work />
        <Ventures />
        <Journey />
        <Contact />
      </main>
    </>
  );
}
