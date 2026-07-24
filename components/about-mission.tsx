import React from "react";
import AboutSectionTitle from "./about-section-title";
import AboutSection from "./about-section";

const AboutMission = () => {
  return (
    <AboutSection>
      <div className="grid gap-8 rounded-[2rem] border border-white/15 bg-white/[0.06] p-7 shadow-[0_24px_70px_rgba(0,0,79,0.2)] backdrop-blur-sm sm:p-10 md:grid-cols-[0.7fr_1.3fr] md:gap-12 lg:p-14">
        <div>
          <span className="page-kicker text-white/60">Our purpose</span>
          <AboutSectionTitle className="mb-0 mt-5">Mission</AboutSectionTitle>
        </div>
        <div>
          <p className="body-copy text-white/80">
            Loads of Traffic excels at innovation, strategy, and results-driven
            digital marketing. Since 2010, we&apos;ve helped businesses thrive
            by providing advanced competitive intelligence and focused digital
            strategies.
          </p>
          <p className="body-copy mt-5 font-medium text-white">
            Our goal is simple: give clients the insight and direction they need
            to build sustainable growth and lead their markets.
          </p>
        </div>
      </div>
    </AboutSection>
  );
};

export default AboutMission;
