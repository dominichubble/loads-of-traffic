"use client";
import React, { useRef } from "react";
import { cn } from "@/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

type TextGradientProps = {
  children: React.ReactNode;
  className?: string;
};

const TextGradient = ({ children, className }: TextGradientProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    function () {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const container = containerRef.current;
      if (!container) return;

      const text = new SplitType(container.querySelectorAll(".line"), {
        types: "words,chars",
        tagName: "span",
      });

      if (!text.chars?.length) {
        return () => text.revert();
      }

      gsap.fromTo(
        text.chars,
        {
          visibility: "visible",
          opacity: 0.2,
        },
        {
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
            once: true,
          },
          ease: "power3.out",
          stagger: 0.01,
          opacity: 1,
          duration: 0.3,
        },
      );

      return () => text.revert();
    },
    {
      scope: containerRef,
    },
  );
  return (
    <div
      ref={containerRef}
      style={{ fontKerning: "none" }}
      className={cn("text-gradient-container", className)}
    >
      {children}
    </div>
  );
};

export default TextGradient;
