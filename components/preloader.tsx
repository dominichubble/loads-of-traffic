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

function markSeen() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Ignore private-mode / blocked storage.
  }
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

    document.documentElement.classList.add("preloader-active");

    const fallback = window.setTimeout(() => {
      markSeen();
      document.documentElement.classList.remove("preloader-active");
      setIsDone(true);
    }, FALLBACK_TIMEOUT_MS);

    const progressObj = { value: 0 };
    const progressTween = gsap.to(progressObj, {
      value: 100,
      duration: ANIMATION_DURATION_MS / 1000,
      ease: "power1.inOut",
      onUpdate: () => setProgress(progressObj.value),
      onComplete: () => {
        const exitTween = gsap.to(containerRef.current, {
          yPercent: -100,
          duration: EXIT_DURATION_MS / 1000,
          ease: "power4.inOut",
          onComplete: () => {
            markSeen();
            document.documentElement.classList.remove("preloader-active");
            setIsDone(true);
          },
        });
        // Keep a handle for cleanup via killTweensOf(container).
        void exitTween;
      },
    });

    return () => {
      window.clearTimeout(fallback);
      progressTween.kill();
      gsap.killTweensOf(progressObj);
      if (containerRef.current) {
        gsap.killTweensOf(containerRef.current);
      }
      document.documentElement.classList.remove("preloader-active");
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      id="site-preloader"
      className="fixed inset-0 z-[3000] grid place-content-center bg-accent px-6 text-white"
      role="status"
      aria-label="Loading website"
      aria-busy="true"
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
