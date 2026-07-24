"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HOME_SCROLLABLE_HEIGHT } from "@/utils/constants";

const HomeProgressBar = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  useGSAP(
    function () {
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: `+=${HOME_SCROLLABLE_HEIGHT}`,
          scrub: true,
        },
        ease: "none",
      });
    },
    {
      scope: progressBarRef,
    },
  );
  return (
    <div
      ref={progressBarRef}
      className="fixed left-0 top-0 z-[1100] h-1 w-full origin-left scale-x-0 bg-yellow"
      aria-hidden="true"
    />
  );
};

export default HomeProgressBar;
