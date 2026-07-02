"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useMouse } from "@uidotdev/usehooks";
import { useCustomCursorContext } from "@/contexts/custom-cursor-context";
import { cn } from "@/utils";
import TransitionLink from "./transition-link";

const AboutContact = () => {
  const [followCursor, setFollowCursor] = useState(false);
  const [mouse, articleRef] = useMouse<HTMLElement>();
  const customCursorContext = useCustomCursorContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const mouseState = useRef({
    x: 0,
    y: 0,
  });
  const ballQuickToX = useRef<gsap.QuickToFunc>();
  const ballQuickToY = useRef<gsap.QuickToFunc>();

  useEffect(() => {
    ballQuickToX.current = gsap.quickTo(`.about-contact .ball`, "x", {
      duration: 0.2,
      ease: "power1",
    });

    ballQuickToY.current = gsap.quickTo(`.about-contact .ball`, "y", {
      duration: 0.2,
      ease: "power1.out",
    });
  }, []);

  useEffect(() => {
    const btnRadius = document
      .querySelector(`.about-contact .cta`)
      ?.getBoundingClientRect().height;
    if (!btnRadius) return;

    if (followCursor) {
      gsap
        .timeline()
        .to(`.about-contact .cta`, {
          left: mouse.elementX - btnRadius / 2,
          top: mouse.elementY - btnRadius / 2,
          transform: "translate(0,0)",
          pointerEvents: "none",
          opacity: 0,
        })
        .to(
          `.about-contact .ball`,
          {
            width: "10rem",
            height: "10rem",
          },
          "<",
        )
        .to(
          `.about-contact .ball-cta`,
          {
            opacity: 1,
          },
          "<",
        );
    } else {
      gsap
        .timeline()
        .to(`.about-contact .cta`, {
          right: "8rem",
          left: "auto",
          top: "50%",
          transform: "translate(0,-50%)",
          opacity: 1,
          pointerEvents: "auto",
        })
        .to(
          `.about-contact .ball`,
          {
            width: "16rem",
            height: "16rem",
          },
          "<",
        )
        .to(
          `.about-contact .ball-cta`,
          {
            opacity: 0,
          },
          "<",
        );
    }
  }, [followCursor, mouse.elementX, mouse.elementY]);

  const { contextSafe } = useGSAP(function() { });

  const handleMouseMove = contextSafe(function() {
    const ballRadius = document
      .querySelector(`.about-contact .ball`)
      ?.getBoundingClientRect().height;

    if (!ballRadius || !ballQuickToY.current || !ballQuickToX.current) return;

    const deltaX = mouse.elementX - mouseState.current.x;
    const deltaY = mouse.elementY - mouseState.current.y;
    mouseState.current = {
      x: mouse.elementX,
      y: mouse.elementY,
    };

    const rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    let strength;
    strength = 1 - Math.min(speed / 100, 1);
    if (strength > 1) {
      strength = 1;
    }
    if (strength < 0.3) {
      strength = 0.3;
    }

    gsap.to(`.about-contact .ball-bg`, {
      rotate: rotation,
      duration: 0,
      ease: "none",
      onUpdate: function() {
        gsap.to(`.about-contact .ball-bg`, {
          scaleY: strength,
          duration: 0.3,
          ease: "expo.out",
        });
      },
    });

    ballQuickToX.current(mouse.elementX - ballRadius / 2);
    ballQuickToY.current(mouse.elementY - ballRadius / 2);

    if (followCursor) {
      const btnRadius = document
        .querySelector(`.about-contact .cta`)
        ?.getBoundingClientRect().height;
      if (!btnRadius) return;
      gsap.timeline().to(`.about-contact .cta`, {
        left: mouse.elementX - btnRadius / 2,
        top: mouse.elementY - btnRadius / 2,
      });
    }
  });

  const handleMouseEnter = contextSafe(function() {
    gsap.to(`.about-contact .ball`, {
      scale: 1,
    });
    customCursorContext.setIsVisible(false);
  });

  const handleMouseLeave = contextSafe(function() {
    customCursorContext.setIsVisible(true);
    gsap.to(`.about-contact .ball`, {
      scale: 0,
    });
    setFollowCursor(false);
  });

  const handleCtaAreaEnter = contextSafe(function() {
    setFollowCursor(true);
  });
  const handleCtaAreaLeave = contextSafe(function() {
    setFollowCursor(false);
  });

  return (
    <div className="grid place-content-center px-6">
      <article
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          `about-contact relative flex max-w-[1440px] cursor-none flex-col overflow-hidden rounded-[2rem] border-t-2 border-t-white bg-white py-4 pb-8 text-black sm:mx-14 2xl:max-w-none`,
        )}
        ref={articleRef}
      >
        <div className="ball pointer-events-none absolute z-50 hidden aspect-square h-[16rem] scale-0 rounded-full xl:block">
          <div className="ball-bg h-full rounded-full bg-primary"></div>
          <TransitionLink
            href="/contact"
            className="ball-cta absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0"
          >
            Let&apos;s Talk
          </TransitionLink>
        </div>
        <div className="accordion-head-dummy absolute z-[100] text-white md:block md:mix-blend-exclusion">
          <div
            className="accordion-title-wrapper flex w-[90%] items-center justify-between p-[1.4rem] px-[30px] md:p-8 md:px-[200px]"
            ref={headerRef}
          >
            <h3 className="flex items-center gap-8 whitespace-nowrap text-[1.2rem] font-bold text-[rgb(0,0,114)] md:text-[2rem] xl:text-[3rem] xl:leading-[85%]">
              <span>Contact Us</span>
            </h3>
          </div>
          <p className="accordion-description flex items-start px-[30px] pb-8 text-[1rem] font-light text-[rgb(0,0,114)] md:max-w-[70%] md:pl-[200px] md:text-[1.6rem]">
            Tell us about the challenges you&apos;re facing and the goals you
            want to achieve. Our expert strategies and data-driven insights are
            designed to tackle complex problems, uncover opportunities, and
            drive meaningful results. Together, we&apos;ll turn your vision into
            a thriving success story
          </p>
        </div>
        <div className="accordion-head z-[60] md:mix-blend-difference">
          <div
            className="accordion-title-wrapper flex w-[90%] items-center justify-between p-[1.4rem] px-[30px] md:p-8 md:px-[200px]"
            ref={headerRef}
          >
            <h3 className="flex items-center gap-8 whitespace-nowrap text-[1.2rem] font-bold text-[rgb(240,240,240)] md:text-[2rem] xl:text-[3rem] xl:leading-[85%]">
              <span>Contact Us</span>
            </h3>
          </div>
          <p className="accordion-description flex items-start px-[30px] pb-8 text-[1rem] font-light text-[rgb(240,240,240)] md:max-w-[70%] md:pl-[200px] md:text-[1.6rem]">
            Tell us about the challenges you&apos;re facing and the goals you
            want to achieve. Our expert strategies and data-driven insights are
            designed to tackle complex problems, uncover opportunities, and
            drive meaningful results. Together, we&apos;ll turn your vision into 
            a thriving success story
          </p>
        </div>
        {
          <>
            <TransitionLink
              href="/contact"
              className="cta-area absolute right-0 top-1/2 z-[999] hidden h-1/2 w-[25rem] -translate-y-1/2 cursor-pointer md:block"
              onMouseEnter={handleCtaAreaEnter}
              onMouseLeave={handleCtaAreaLeave}
            ></TransitionLink>
            <button className="cta absolute right-[8rem] top-1/2 hidden aspect-square h-[10rem] -translate-y-1/2 rounded-full bg-gray-100 text-[#00007A] md:block">
              Let&apos;s Talk
              <span className="absolute bottom-6 left-1/2 aspect-square h-2 -translate-x-1/2 rounded-full bg-red"></span>
            </button>
          </>
        }
        <div className="grid aspect-square h-[8rem] place-content-center self-center rounded-full bg-primary text-white md:hidden">
          <TransitionLink href="/contact">Let&apos;s Talk</TransitionLink>
        </div>
      </article>
    </div>
  );
};

export default AboutContact;
