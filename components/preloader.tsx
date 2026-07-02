"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Create an object to tween from 0 to 100.
    const progressObj = { value: 0 };

    gsap.to(progressObj, {
      value: 100,
      duration: 5, // Progress over 4 seconds.
      ease: "power1.inOut",
      onUpdate: () => {
        setProgress(progressObj.value);
      },
      onComplete: () => {
        // Animate the container out when complete.
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            y: "-100%",
            duration: 1.6,
            ease: "power4.inOut",
          });
        }
      },
    });
  }, []);

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
