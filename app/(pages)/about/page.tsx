import type { Metadata } from "next";
import AboutContact from "@/components/about-contact";
import AboutFeatures from "@/components/about-features";
import AboutMarquee from "@/components/about-marquee";
import AboutMission from "@/components/about-mission";
import AboutPortfolio from "@/components/about-portfolio";
import AboutSection from "@/components/about-section";
import TextGradient from "@/components/shared/text-gradient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Loads of Traffic is a high-tech scale-up business based in the Isle of Man, focused on affiliate strategy, competitive intelligence, and growth.",
};

const AboutPage = () => {
  return (
    <main className="about overflow-hidden bg-primary pt-[calc(var(--pages-header-height)+var(--container-padding-y))] text-white">
      <div className="space-y-[var(--sections-gap)]">
        <AboutSection>
          <div className="grid gap-8 border-b border-white/15 pb-12 md:grid-cols-[0.7fr_1.3fr] md:items-end md:gap-12 md:pb-16">
            <div>
              <span className="page-kicker text-white/65">Who we are</span>
              <h1 className="display-heading mt-6 text-white">About us</h1>
            </div>
            <div className="md:pb-2">
              <h2 className="max-w-[30ch] text-xl font-medium leading-snug text-white/90 md:text-2xl xl:text-3xl">
                A high-tech scale-up helping ambitious businesses understand
                their markets and grow with confidence.
              </h2>
              <p className="mt-5 max-w-[58ch] text-sm leading-relaxed text-white/65 md:text-base">
                Based in the Isle of Man and working across competitive global
                sectors since 2010.
              </p>
            </div>
          </div>
          <TextGradient className="mt-[var(--sections-gap)] text-center text-[clamp(2rem,7vw,6.5rem)] font-bold uppercase leading-[1.02] tracking-[-0.055em]">
            <div className="line flex items-center justify-center gap-2 whitespace-nowrap xl:gap-5">
              <p>Loads of Traffic</p>
            </div>
            <div className="line mt-2 flex items-center justify-center gap-2 whitespace-nowrap xl:gap-5">
              <span>
                brings <span className="text-accent">80+ years</span>
              </span>
            </div>
            <p className="line mt-2">of combined expertise</p>
            <p className="line mt-2 text-white/75">to digital growth</p>
          </TextGradient>
        </AboutSection>
        <AboutMission />
        <div>
          <div className="mb-4 md:mb-12">
            <AboutPortfolio />
          </div>
          <AboutMarquee />
          <AboutFeatures />
        </div>
        <div className="bg-accent py-[var(--sections-gap)]">
          <AboutContact />
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
