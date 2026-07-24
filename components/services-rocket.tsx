"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import rocketJson from "../public/lottie/rocket.json";

gsap.registerPlugin(MotionPathPlugin);

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

type Point = { x: number; y: number };

function measureBounds(bounds: HTMLElement) {
  return {
    width: bounds.offsetWidth,
    height: Math.max(bounds.offsetHeight, window.innerHeight),
  };
}

function entryPoint(width: number): Point {
  const off = Math.max(200, width * 0.22);
  return {
    x: gsap.utils.random(width * 0.2, width * 0.8),
    y: -off,
  };
}

function exitPoint(width: number, height: number): Point {
  const off = Math.max(220, width * 0.24);
  const side = Math.random();

  if (side < 0.34) {
    return { x: -off, y: gsap.utils.random(height * 0.8, height + off * 0.2) };
  }
  if (side < 0.68) {
    return {
      x: width + off,
      y: gsap.utils.random(height * 0.8, height + off * 0.2),
    };
  }
  return {
    x: gsap.utils.random(width * 0.15, width * 0.85),
    y: height + off,
  };
}

/** One continuous cruise: top offscreen → wander → fully offscreen. */
function buildFlightPath(width: number, height: number): Point[] {
  const marginX = Math.max(40, width * 0.06);
  const marginY = Math.max(80, height * 0.04);
  const waypoints = 14;
  const path: Point[] = [entryPoint(width)];

  for (let i = 0; i < waypoints; i++) {
    const t = i / (waypoints - 1);
    // Gradually bias toward the lower page as the flight progresses.
    const lowerBias = gsap.utils.clamp(0, 1, (t - 0.2) / 0.55);
    const minY = gsap.utils.interpolate(marginY, height * 0.55, lowerBias);
    const maxY = gsap.utils.interpolate(height * 0.42, height - marginY, lowerBias);

    path.push({
      x: gsap.utils.random(marginX, width - marginX),
      y: gsap.utils.random(minY, maxY),
    });
  }

  path.push(exitPoint(width, height));
  return path;
}

const ServicesRocket = () => {
  const boundsRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const bounds = boundsRef.current;
      const el = rocketRef.current;
      if (!bounds || !el) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set(el, {
        xPercent: -50,
        yPercent: -50,
        left: 0,
        top: 0,
        force3D: true,
      });

      if (reducedMotion) {
        gsap.set(el, { autoAlpha: 0 });
        return;
      }

      const { width, height } = measureBounds(bounds);
      const path = buildFlightPath(width, height);
      const start = path[0];

      gsap.set(el, {
        x: start.x,
        y: start.y,
        autoAlpha: 0.45,
      });

      const tween = gsap.to(el, {
        duration: 36,
        ease: "none",
        motionPath: {
          path,
          curviness: 1.5,
          autoRotate: 90,
        },
        onComplete: () => {
          gsap.set(el, { autoAlpha: 0 });
        },
      });

      return () => {
        tween.kill();
      };
    },
    { scope: boundsRef },
  );

  return (
    <div
      ref={boundsRef}
      className="pointer-events-none !absolute inset-0 !z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={rocketRef}
        className="absolute aspect-[380/663] w-[min(6.5rem,22vw)] will-change-transform md:w-[min(8.5rem,12vw)]"
      >
        <Lottie
          loop
          play
          animationData={rocketJson}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default ServicesRocket;
