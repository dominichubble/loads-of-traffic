import type { Metadata } from "next";
import AboutContact from "@/components/about-contact";
import AboutFeatures from "@/components/about-features";
import AboutMission from "@/components/about-mission";
import AboutPortfolio from "@/components/about-portfolio";
import StepDeck from "@/components/step-deck";
import TextGradient from "@/components/shared/text-gradient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Loads of Traffic is a high-tech scale-up business based in the Isle of Man, focused on affiliate strategy, competitive intelligence, and growth.",
};

const AboutPage = () => {
  return (
    <main className="about page-atmosphere bg-primary text-white">
      <StepDeck
        ariaLabel="About Loads of Traffic"
        sections={[
          {
            id: "about-intro",
            node: (
              <div className="deck-section">
                <div className="content-container content-cap page-gutters w-full">
                  <TextGradient
                    as="h1"
                    label="Loads of Traffic brings 80+ years of combined expertise to digital growth"
                    className="text-center text-[clamp(1.85rem,5.8vw,5.5rem)] font-bold uppercase leading-[1.12] tracking-[-0.03em]"
                  >
                    <span className="line block text-balance">
                      Loads of Traffic
                    </span>
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
                </div>
              </div>
            ),
          },
          {
            id: "about-mission",
            node: (
              <div className="deck-section">
                <AboutMission />
              </div>
            ),
          },
          {
            id: "about-portfolio",
            node: (
              <div className="deck-section">
                <AboutPortfolio />
              </div>
            ),
          },
          {
            id: "about-features",
            node: (
              <div className="deck-section">
                <AboutFeatures />
              </div>
            ),
          },
          {
            id: "about-contact",
            node: (
              <div className="deck-section bg-accent">
                <AboutContact />
              </div>
            ),
          },
        ]}
      />
    </main>
  );
};

export default AboutPage;
