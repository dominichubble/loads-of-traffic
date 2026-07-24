import React from "react";
import AboutSectionTitle from "./about-section-title";
import PortfolioProjects from "./portfolio-projects";
import AboutSection from "./about-section";

const AboutPortfolio = () => {
  return (
    <AboutSection>
      <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-accent via-accent to-[var(--color-accent-deep)] p-7 shadow-[0_28px_80px_rgba(0,0,79,0.22)] sm:p-10 sm:py-12 lg:p-14">
        <div
          className="pointer-events-none absolute -right-36 top-0 h-64 w-64 rounded-full border-[2.75rem] border-white/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-32 h-72 w-72 rounded-full border-[2.75rem] border-primary/15"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <span className="page-kicker text-white/65">Protected partnerships</span>
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
              <p className="mx-auto mt-6 max-w-[56ch] text-sm font-medium leading-relaxed text-white/90 md:text-lg">
                Our work is protected by robust NDAs, giving every client the
                confidence to share sensitive data and pursue ambitious ideas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AboutSection>
  );
};

export default AboutPortfolio;
