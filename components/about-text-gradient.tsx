"use client";
import React, { useRef } from "react";
import TextGradient from "./shared/text-gradient";

const AboutTextGradient = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef}>
      <TextGradient className="invisible text-center text-[2rem] font-bold uppercase leading-[150%] md:text-[4.6rem] 2xl:text-[7.125rem]">
        <div className="line flex items-center justify-center gap-2 whitespace-nowrap xl:gap-6">
          <p>Loads of traffic</p>
          <span>,</span>
        </div>
        <div className="line flex items-center justify-center gap-2 whitespace-nowrap xl:gap-6">
          <span>
            Boasts <span className="text-accent">80+ Years </span>
          </span>
        </div>
        <p className="line">of Expertise</p>
        <p className="line">In Innovative</p>
        <p className="line">Digital Marketing</p>
      </TextGradient>
    </div>
  );
};

export default AboutTextGradient;
