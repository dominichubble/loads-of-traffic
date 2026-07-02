"use client";
import React, { useRef } from "react";
import { cn } from "@/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/all";
import SplitType from "split-type";

gsap.registerPlugin(ScrollToPlugin);

type TextGradientProps = {
  children: React.ReactNode;
  className?: string;
};

const TextGradient = ({ children, className }: TextGradientProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    function() {
      const text = new SplitType(".line", {
        types: "chars",
        tagName: "span",
      });

      gsap.fromTo(
        text.chars,
        {
          visibility: "visible",
          opacity: 0.2,
        },
        {
          scrollTrigger: {
            trigger: text.chars && text.chars[0],
            start: "top 40%",
            toggleActions: "play none none reverse",
          },
          ease: "power3.out",
          stagger: 0.01,
          opacity: 1,
          duration: 0.3,
        },
      );
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
