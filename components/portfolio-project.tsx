"use client";

import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ProjectPortfolio = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    function() {
      gsap.set(".box", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 50%",
        },
        opacity: 0,
        stagger: {
          each: 0.05,
          from: "random",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <article
      ref={containerRef}
      className="relative h-[16rem] overflow-hidden rounded-[1rem] bg-accent shadow-lg xl:h-[27.8125rem]"
    >
      <div className="absolute inset-0 z-50 grid grid-cols-6">
        {[...new Array(30)].map((_, i) => (
          <div key={i} className="box h-[6.25rem] w-full bg-primary"></div>
        ))}
      </div>
      <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[14px]"></div>
      <div className="relative h-full w-full">
        <Image
          src="/project-placeholder.jpg"
          fill
          sizes="90vw"
          alt="Under NDA Project"
        />
      </div>
    </article>
  );
};

export default ProjectPortfolio;
