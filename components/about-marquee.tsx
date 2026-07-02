"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { horizontalLoop } from "@/utils";

const AboutMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    function() {
      const items = gsap.utils.toArray<HTMLDivElement>(".marquee-item");
      horizontalLoop(items, {
        repeat: -1,
      });
    },
    {
      scope: containerRef,
    },
  );
  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center gap-[1rem] overflow-hidden py-4 xl:py-8"
    >
      {[...new Array(10)].map((_, i) => (
        <div
          key={i}
          className="marquee-item flex items-center gap-[1rem] whitespace-nowrap"
        >
          <div className="aspect-square w-6 rounded-full bg-white opacity-50"></div>
          <p className="font-outline-2 font-outline-white text-[2rem] font-bold uppercase xl:text-[4rem]">
            Loads of traffic
          </p>
        </div>
      ))}
    </div>
  );
};

export default AboutMarquee;
