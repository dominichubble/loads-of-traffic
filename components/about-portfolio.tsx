import React from "react";
import AboutSectionTitle from "./about-section-title";
import PortfolioProjects from "./portfolio-projects";
import AboutSection from "./about-section";

const AboutPortfolio = () => {
  return (
    <AboutSection className="rounded-[2rem] border border-white/15 bg-accent py-8 shadow-[0_28px_80px_rgba(0,0,79,0.18)] sm:py-12">
      <span className="page-kicker text-[#000036]">Protected partnerships</span>
      <AboutSectionTitle className="mb-10 mt-5 text-white md:mb-14">
        Portfolio
      </AboutSectionTitle>
      <div className="space-y-10 xl:space-y-14">
        <PortfolioProjects />
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-[clamp(2rem,5.5vw,4.75rem)] font-bold uppercase leading-[1.02] tracking-[-0.05em] text-white">
            Results speak.{" "}
            <span className="font-outline-2 font-outline-white">
              Client names don&apos;t.
            </span>
          </h3>
          <p className="mx-auto mt-6 max-w-[56ch] text-sm font-medium leading-relaxed text-[#000036] md:text-lg">
            Our work is protected by robust NDAs, giving every client the
            confidence to share sensitive data and pursue ambitious ideas.
          </p>
        </div>
      </div>
    </AboutSection>
  );
};

export default AboutPortfolio;
