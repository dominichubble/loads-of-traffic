"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const STORAGE_KEY = "lot-preloader-seen";
const ANIMATION_DURATION_MS = 5000;
const EXIT_DURATION_MS = 1600;
// Hard safety net: if the GSAP tween is ever interrupted and its onComplete
// never fires, this forces the full-viewport overlay to unmount anyway
// instead of permanently blocking every click on the page.
const FALLBACK_TIMEOUT_MS = ANIMATION_DURATION_MS + EXIT_DURATION_MS + 1000;

function shouldSkipAnimation() {
  if (typeof window === "undefined") return true;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const alreadySeen = window.localStorage.getItem(STORAGE_KEY) === "1";
  return prefersReducedMotion || alreadySeen;
}

const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(true);

  useEffect(() => {
    setIsDone(shouldSkipAnimation());
    window.localStorage.setItem(STORAGE_KEY, "1");
  }, []);

  useEffect(() => {
    if (isDone) return;

    const fallback = window.setTimeout(() => setIsDone(true), FALLBACK_TIMEOUT_MS);
    const progressObj = { value: 0 };

    gsap.to(progressObj, {
      value: 100,
      duration: ANIMATION_DURATION_MS / 1000,
      ease: "power1.inOut",
      onUpdate: () => setProgress(progressObj.value),
      onComplete: () => {
        gsap.to(containerRef.current, {
          y: "-100%",
          duration: EXIT_DURATION_MS / 1000,
          ease: "power4.inOut",
          onComplete: () => setIsDone(true),
        });
      },
    });

    return () => window.clearTimeout(fallback);
  }, [isDone]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] grid place-content-center bg-accent"
    >
      <p className="text-[2.4rem] font-light">{Math.round(progress)}%</p>
    </div>
  );
};

export default Preloader;
