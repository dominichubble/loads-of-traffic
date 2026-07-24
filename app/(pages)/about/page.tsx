import type { Metadata } from "next";
import AboutContact from "@/components/about-contact";
import AboutFeatures from "@/components/about-features";
import AboutMarquee from "@/components/about-marquee";
import AboutMission from "@/components/about-mission";
import AboutPortfolio from "@/components/about-portfolio";
import AboutSection from "@/components/about-section";
import PageIntro from "@/components/page-intro";
import TextGradient from "@/components/shared/text-gradient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Loads of Traffic is a high-tech scale-up business based in the Isle of Man, focused on affiliate strategy, competitive intelligence, and growth.",
};

const AboutPage = () => {
  return (
    <main className="about page-shell overflow-hidden bg-primary text-white">
      <div className="space-y-[var(--sections-gap)]">
        <AboutSection>
          <PageIntro
            kicker="Who we are"
            title="About us"
            headline="A high-tech scale-up helping ambitious businesses understand their markets and grow with confidence."
            description="Based in the Isle of Man and working across competitive global sectors since 2010."
          />
          <TextGradient className="mt-[var(--sections-gap)] text-center text-[clamp(1.75rem,5.5vw,4.5rem)] font-bold uppercase leading-[1.15] tracking-[-0.02em]">
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
        <div className="bg-accent pb-[var(--sections-gap)] pt-10 md:pt-14">
          <AboutContact />
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
