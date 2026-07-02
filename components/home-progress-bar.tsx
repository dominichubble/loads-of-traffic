"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HOME_SCROLLABLE_HEIGHT } from "@/utils/constants";

const HomeProgressBar = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  useGSAP(
    function() {
      gsap.to(progressBarRef.current, {
        scaleY: 1,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: `end+=${(HOME_SCROLLABLE_HEIGHT * 100) / 25}`,
          scrub: 1,
        },
        ease: "none",
        repeat: 100,
      });
    },
    {
      scope: progressBarRef,
    },
  );
  return (
    <div
      ref={progressBarRef}
      className="fixed left-0 top-0 z-[999] h-screen w-1 origin-top scale-y-0 bg-white"
    ></div>
  );
};

export default HomeProgressBar;
