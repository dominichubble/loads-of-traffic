import React from "react";
import AboutSectionTitle from "./about-section-title";
import AboutSection from "./about-section";
import { AboutFeaturesItems } from "@/utils/constants";
import AboutFeature from "./about-feature";

const AboutFeatures = () => {
  return (
    <AboutSection className="bg-primary py-[var(--sections-gap)] text-white">
      <span className="page-kicker text-white/60">Why Loads of Traffic</span>
      <AboutSectionTitle className="mt-5">What sets us apart</AboutSectionTitle>
      <ul className="grid gap-4 sm:grid-cols-3 xl:gap-6">
        {AboutFeaturesItems.map((feature, index) => (
          <li key={feature.title} className="flex">
            <AboutFeature feature={{ ...feature, index }} />
          </li>
        ))}
      </ul>
    </AboutSection>
  );
};

export default AboutFeatures;
