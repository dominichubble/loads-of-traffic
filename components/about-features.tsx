import React from "react";
import AboutSectionTitle from "./about-section-title";
import AboutSection from "./about-section";
import { AboutFeaturesItems } from "@/utils/constants";
import AboutFeature from "./about-feature";

const AboutFeatures = () => {
  return (
    <AboutSection className="bg-primary py-[5rem] text-white">
      <AboutSectionTitle>What sets us apart</AboutSectionTitle>
      <ul className="flex flex-col items-center justify-center gap-[1rem] sm:flex-row xl:gap-[2rem]">
        {AboutFeaturesItems.map((feature, index) => (
          <li key={feature.title} className="w-full max-w-[25rem]">
            <AboutFeature feature={{ ...feature, index }} />
          </li>
        ))}
      </ul>
    </AboutSection>
  );
};

export default AboutFeatures;
