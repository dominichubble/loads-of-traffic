"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCustomCursorContext } from "@/contexts/custom-cursor-context";
import { cn } from "@/utils";

const CURSOR_SIZE = 20;

const CustomCursor = () => {
  const customCursorRef = useRef<HTMLDivElement>(null);
  const { isVisible } = useCustomCursorContext();
  useGSAP(
    function() {
      const xTo = gsap.quickTo(customCursorRef.current, "x", {
        duration: 0.4,
        ease: "power3",
      });
      const yTo = gsap.quickTo(customCursorRef.current, "y", {
        duration: 0.4,
        ease: "power3",
      });

      window.addEventListener("mousemove", function(e) {
        xTo(e.clientX - CURSOR_SIZE);
        yTo(e.clientY - CURSOR_SIZE);

        const element = e.target as HTMLElement;
        if (element.classList.contains("custom-cursor-hover")) {
          gsap.to(customCursorRef.current, {
            scale: 2,
            ease: "power4.out",
          });
        } else {
          gsap.to(customCursorRef.current, {
            scale: 1,
            ease: "power4.out",
          });
        }
      });
    },
    {
      scope: customCursorRef,
    },
  );

  return (
    <div
      ref={customCursorRef}
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[99999] hidden aspect-square w-10 rounded-full border-[1px] border-white sm:block",
        !isVisible && "!hidden",
      )}
    />
  );
};

export default CustomCursor;
