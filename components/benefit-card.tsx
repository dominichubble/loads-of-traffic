"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const BenefitCard = ({
  title,
  lottieJson,
  index,
}: {
  title: string;
  lottieJson: object;
  index: number;
}) => {
  const mediaRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlay(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPlay(entry.isIntersecting);
      },
      { rootMargin: "80px 0px" },
    );
    observer.observe(media);
    return () => observer.disconnect();
  }, []);

  return (
    <article className="group flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-b from-white to-white/95 p-4 text-primary shadow-[0_12px_36px_rgba(0,0,79,0.14)] transition-transform duration-200 hover:-translate-y-0.5 sm:gap-5 sm:p-5">
      <div
        ref={mediaRef}
        className="grid h-16 w-16 shrink-0 place-content-center sm:h-[4.5rem] sm:w-[4.5rem]"
        aria-hidden="true"
      >
        <Lottie
          loop
          animationData={lottieJson}
          play={play}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-primary/55 text-[0.7rem] font-bold uppercase tracking-[0.14em]">
            Step 0{index}
          </span>
          <span
            className="h-1.5 w-1.5 rounded-full bg-accent"
            aria-hidden="true"
          />
        </div>
        <h3 className="mt-1.5 text-lg font-semibold tracking-[-0.02em] sm:text-xl">
          {title}
        </h3>
      </div>
    </article>
  );
};

export default BenefitCard;
