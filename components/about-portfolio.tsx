"use client";

import React, { useRef } from "react";
import AboutSectionTitle from "./about-section-title";
import PortfolioProjects from "./portfolio-projects";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AboutSection from "./about-section";

gsap.registerPlugin(ScrollTrigger);

const AboutPortfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(function() {
    const docStyle = getComputedStyle(document.documentElement);

    const primaryColor = docStyle.getPropertyValue("--color-accent");
    gsap.to("main", {
      backgroundColor: primaryColor,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse",
      },
    });
  });
  return (
    <div ref={containerRef}>
      <AboutSection>
        <AboutSectionTitle className="text-white">Portfolio</AboutSectionTitle>
        <div className="space-y-[2rem] xl:space-y-[4rem]">
          <PortfolioProjects />
          <div className="space-y-[0.5rem] xl:space-y-[2rem]">
            <h3 className="text-center text-[2rem] font-bold uppercase text-white xl:text-[5.375rem]">
              Our Portfolio remains{" "}
              <span className="font-outline-2 font-outline-white">Empty</span>
            </h3>
            <p className="text-center text-[1rem] font-bold uppercase text-white xl:text-[2.375rem]">
              Ensure confidentiality with
              <span className="mx-2 inline-block rounded-[0.5rem] bg-accent p-1">
                {" "}
                nda-secured{" "}
              </span>
              discrete services
            </p>
          </div>
        </div>
      </AboutSection>
    </div>
  );
};

export default AboutPortfolio;
