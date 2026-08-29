import type { Metadata } from "next";
import AboutContact from "@/components/about-contact";
import AboutFeatures from "@/components/about-features";
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
    <main className="about page-shell page-shell-flush page-atmosphere bg-primary text-white">
      <div className="space-y-[var(--sections-gap)]">
        <AboutSection className="flex min-h-[75svh] flex-col justify-center">
          <TextGradient
            as="h1"
            label="Loads of Traffic brings 80+ years of combined expertise to digital growth"
            className="text-center text-[clamp(1.85rem,5.8vw,5.5rem)] font-bold uppercase leading-[1.12] tracking-[-0.03em]"
          >
            <span className="line block text-balance">Loads of Traffic</span>
            <span className="line mt-2 block text-balance">
              brings <span className="text-accent">80+ years</span>
            </span>
            <span className="line mt-2 block text-balance">
              of combined expertise
            </span>
            <span className="line mt-2 block text-balance text-white">
              to digital growth
            </span>
          </TextGradient>
          <p className="mt-10 text-center text-xs font-bold uppercase tracking-[0.18em] text-white/75 md:text-sm">
            Isle of Man · since 2010
          </p>
        </AboutSection>
        <AboutMission />
        <div>
          <div className="mb-4 md:mb-12">
            <AboutPortfolio />
          </div>
          <AboutFeatures />
        </div>
      </div>

      <div className="relative mt-[var(--sections-gap)] overflow-hidden bg-accent pb-[var(--sections-gap)] pt-10 md:pt-14">
        <div
          className="pointer-events-none absolute -left-52 -top-28 z-0 h-80 w-80 rounded-full border-[2.75rem] border-primary/25"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-52 -right-40 z-0 h-96 w-96 rounded-full border-[2.75rem] border-primary/20"
          aria-hidden="true"
        />
        <div className="relative z-10">
          <AboutContact />
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
