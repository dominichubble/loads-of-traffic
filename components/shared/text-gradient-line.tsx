"use client";
import React, { useRef } from "react";
import { cn } from "@/utils";
import gsap from "gsap";
import ScrollTrigger from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type TextGradientLineProps = {
  children: React.ReactNode;
  className?: string;
  text: string;
  initialOpacity?: number;
};

const TextGradientLine = ({
  children,
  className,
  text,
  initialOpacity = 20,
}: TextGradientLineProps) => {
  const lineRef = useRef<HTMLParagraphElement>(null);
  useGSAP(
    function() {
      gsap.to(".char", {
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 50%",
          end: "top 20%",
          scrub: 1,
        },
        stagger: 0.1,
        opacity: 1,
      });
    },
    { scope: lineRef },
  );

  return (
    <p ref={lineRef} className={cn("line", className)}>
      {typeof children === "string"}
      {text.split("").map((char, i) => (
        <span key={i} className={cn("char", `opacity-${initialOpacity}`)}>
          {char}
        </span>
      ))}
    </p>
  );
};

export default TextGradientLine;
