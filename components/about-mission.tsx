import React from "react";
import AboutSectionTitle from "./about-section-title";
import AboutSection from "./about-section";

const AboutMission = () => {
  return (
    <AboutSection>
      <div className="grid gap-6 rounded-[2rem] border border-white/15 bg-white/[0.06] p-7 shadow-[0_24px_70px_rgba(0,0,79,0.2)] backdrop-blur-sm sm:p-10 md:grid-cols-2 md:gap-x-16 md:gap-y-8 lg:gap-x-24 lg:p-14">
        <div className="min-w-0">
          <span className="page-kicker text-white/60">Our purpose</span>
          <AboutSectionTitle className="mb-0 mt-5">Mission</AboutSectionTitle>
        </div>
        <div className="min-w-0 space-y-5">
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
    </AboutSection>
  );
};

export default AboutMission;
