"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const STORAGE_KEY = "lot-preloader-seen";
const ANIMATION_DURATION_MS = 1900;
const EXIT_DURATION_MS = 600;
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
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Deliberately a single effect: checking shouldSkipAnimation() here and
    // starting the GSAP animation only in the "don't skip" branch (rather
    // than splitting this across two effects keyed off `isDone`) avoids a
    // stale-closure race where the second effect would still read the
    // pre-update `isDone` value and kick off the animation for a split
    // second before the skip's setIsDone(true) takes effect.
    if (shouldSkipAnimation()) {
      setIsDone(true);
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, "1");

    const fallback = window.setTimeout(
      () => setIsDone(true),
      FALLBACK_TIMEOUT_MS,
    );
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
  }, []);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      id="site-preloader"
      className="fixed inset-0 z-[3000] grid place-content-center bg-accent px-6 text-white"
      role="status"
      aria-label="Loading website"
    >
      <div className="flex w-[min(24rem,80vw)] flex-col items-center gap-8">
        <div className="relative h-16 w-full">
          <Image
            src="/logo.png"
            alt="Loads of Traffic"
            fill
            sizes="384px"
            className="object-contain"
            priority
          />
        </div>
        <div
          className="h-1 w-full overflow-hidden rounded-full bg-white/25"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <div
            className="h-full origin-left rounded-full bg-white"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
