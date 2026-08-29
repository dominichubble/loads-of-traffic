import React from "react";
import AboutSectionTitle from "./about-section-title";
import AboutSection from "./about-section";

const AboutMission = () => {
  return (
    <AboutSection>
      <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/[0.1] via-white/[0.05] to-transparent p-7 shadow-[0_24px_70px_rgba(0,0,79,0.2)] sm:p-10 lg:p-14">
        <div
          className="pointer-events-none absolute -right-48 -top-44 z-0 h-80 w-80 rounded-full border-[2.75rem] border-accent/25"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-52 -left-48 z-0 h-96 w-96 rounded-full border-[2.75rem] border-accent/15"
          aria-hidden="true"
        />

        <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:items-stretch lg:gap-0">
          <div className="flex min-w-0 flex-col justify-between gap-3 lg:border-r lg:border-accent/50 lg:pr-10">
            <div>
              <span className="page-kicker text-white/80">Our purpose</span>
              <AboutSectionTitle className="mb-0 mt-4 md:mb-0">
                Mission
              </AboutSectionTitle>
            </div>
            <div>
              <p className="max-w-[20ch] text-sm font-medium uppercase tracking-[0.14em] text-white/75">
                Serving since
              </p>
              <p className="mt-1 text-[clamp(3.5rem,8vw,6rem)] font-bold leading-none tracking-[-0.05em] text-accent">
                2010
              </p>
            </div>
          </div>

          <div className="min-w-0 space-y-5 lg:pl-10">
            <p className="body-copy max-w-none text-white">
              Loads of Traffic excels at innovation, strategy, and results-driven
              digital marketing. Since 2010, we&apos;ve helped businesses thrive
              by providing advanced competitive intelligence and focused digital
              strategies.
            </p>
            <p className="body-copy max-w-none font-medium text-white">
              Our goal is simple: give clients the insight and direction they need
              to build sustainable growth and lead their markets.
            </p>
          </div>
        </div>
      </div>
    </AboutSection>
  );
};

export default AboutMission;
