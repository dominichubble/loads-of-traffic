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
    <main className="about bg-primary pt-[calc(var(--pages-header-height)+var(--container-padding-y))] text-white">
      <div className="space-y-[var(--sections-gap)]">
        <AboutSection>
          <div className="m:gap-0 flex flex-col items-start justify-between gap-[3rem] xl:gap-[6rem]">
            <div className="mx-auto md:max-w-[50%]">
              <h2 className="text-center text-[1.6rem] font-bold md:mb-[1rem] xl:text-[2.4rem]">
                Loads of Traffic is a high-tech scale-up business based in the
                Isle of Man
              </h2>
            </div>
            <h1 className="flex items-center gap-4 self-start text-[2rem] font-bold md:text-[3rem] xl:text-[4rem]">
              <span className="inline-block h-[0.8rem] w-[0.8rem] rounded-full bg-white xl:h-[1.2rem] xl:w-[1.2rem]"></span>
              About
            </h1>
          </div>
          <TextGradient className="invisible text-center text-[2rem] font-bold uppercase leading-[150%] md:text-[4.6rem] 2xl:text-[7.125rem]">
            <div className="line flex items-center justify-center gap-2 whitespace-nowrap xl:gap-6">
              <p>Loads of traffic</p>
              <span>,</span>
            </div>
            <div className="line flex items-center justify-center gap-2 whitespace-nowrap xl:gap-6">
              <span>
                Boasts <span className="text-accent">80+ Years </span>
              </span>
            </div>
            <p className="line">of Expertise</p>
            <p className="line">In Innovative</p>
            <p className="line">Digital Marketing</p>
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
        <div className="bg-accent py-24 md:py-48">
          <AboutContact />
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
