import React from "react";
import AboutSectionTitle from "./about-section-title";
import AboutSection from "./about-section";

const AboutMission = () => {
  return (
    <AboutSection className="space-y-[1rem]">
      <AboutSectionTitle className="mb-[1rem] xl:mb-[2rem]">
        Mission
      </AboutSectionTitle>
      <p className="text-[1.2rem] md:text-[1.4rem] 2xl:text-[1.6rem]">
        Loads Of Traffic excels at innovation, strategy, and results-driven
        digital marketing. Since 2010, we&apos;ve helped businesses thrive in
        their industries by providing advanced competitive intelligence and
        digital strategies. Our goal is simple: empower clients with
        cutting-edge competitive intelligence and digital marketing strategies
        that foster sustainable growth and market leadership.
      </p>
    </AboutSection>
  );
};

export default AboutMission;
