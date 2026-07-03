// change color change duration to make it faster as our eyes are much more sensitive to color change
"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Minus, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useMouse } from "@uidotdev/usehooks";
import { useCustomCursorContext } from "@/contexts/custom-cursor-context";
import { cn } from "@/utils";
import TransitionLink from "./transition-link";

const ServiceAccordion = ({
  index,
  title,
  description,
  maxAccordions,
}: {
  index: number;
  title: string;
  description: string;
  maxAccordions: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [followCursor, setFollowCursor] = useState(false);
  const [mouse, articleRef] = useMouse<HTMLElement>();
  const customCursorContext = useCustomCursorContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionFullHeight = useRef(0);
  const mouseState = useRef({
    x: 0,
    y: 0,
  });
  const ballQuickToX = useRef<gsap.QuickToFunc | undefined>(undefined);
  const ballQuickToY = useRef<gsap.QuickToFunc | undefined>(undefined);

  useEffect(() => {
    ballQuickToX.current = gsap.quickTo(
      `.service-accordion-${index} .ball`,
      "x",
      {
        duration: 0.2,
        ease: "power1",
      },
    );

    ballQuickToY.current = gsap.quickTo(
      `.service-accordion-${index} .ball`,
      "y",
      {
        duration: 0.2,
        ease: "power1.out",
      },
    );
  }, [index]);

  useEffect(() => {
    const btnRadius = document
      .querySelector(`.service-accordion-${index} .cta`)
      ?.getBoundingClientRect().height;
    if (!btnRadius) return;

    if (followCursor) {
      gsap
        .timeline()
        .to(`.service-accordion-${index} .cta`, {
          left: mouse.elementX - btnRadius / 2,
          top: mouse.elementY - btnRadius / 2,
          transform: "translate(0,0)",
          pointerEvents: "none",
          opacity: 0,
        })
        .to(
          `.service-accordion-${index} .ball`,
          {
            width: "10rem",
            height: "10rem",
          },
          "<",
        )
        .to(
          `.service-accordion-${index} .ball-cta`,
          {
            opacity: 1,
          },
          "<",
        );
    } else {
      gsap
        .timeline()
        .to(`.service-accordion-${index} .cta`, {
          right: "8rem",
          left: "auto",
          top: "50%",
          transform: "translate(0,-50%)",
          opacity: 1,
          pointerEvents: "auto",
        })
        .to(
          `.service-accordion-${index} .ball`,
          {
            width: "16rem",
            height: "16rem",
          },
          "<",
        )
        .to(
          `.service-accordion-${index} .ball-cta`,
          {
            opacity: 0,
          },
          "<",
        );
    }
  }, [followCursor, index, mouse.elementX, mouse.elementY]);

  const { contextSafe } = useGSAP(function() {
    if (!articleRef.current) return;

    accordionFullHeight.current = articleRef.current?.offsetHeight;
    gsap.set(articleRef.current, {
      height: headerRef.current?.offsetHeight,
    });
  });

  const handleAccordionToggle = contextSafe(function() {
    const ease = "power3.out";
    const currentAccordion = `.service-accordion-${index}`;
    const nextAccordion = `.service-accordion-${index + 1}`;

    const animateCollapse = () => {
      gsap.to(`${currentAccordion} .ball`, { scale: 0 });

      gsap.to(`${currentAccordion} .accordion-toggle-btn`, {
        background: "white",
        border: "1px solid transparent",
        ease,
      });

      gsap.to(articleRef.current, {
        height: headerRef.current?.offsetHeight,
        background: "transparent",
        color: "white",
        borderRadius: "0px",
        ease,
        duration: 0.8,
      });

      gsap.set(`${currentAccordion} .accordion-head`, {
        mixBlendMode: "normal",
      });
      gsap.set(`${currentAccordion} .accordion-head-dummy`, {
        mixBlendMode: "normal",
      });

      gsap.to(`${currentAccordion} .accordion-description`, {
        opacity: 0,
        y: "10%",
        duration: 0.8,
        ease,
      });
      customCursorContext.setIsVisible(true);

      if (index + 1 <= maxAccordions) {
        gsap.to(nextAccordion, {
          borderTop: "2px solid white",
        });
      }
    };

    const animateExpand = () => {
      const ballElement = document.querySelector(`${currentAccordion} .ball`);
      const ballRadius = ballElement?.clientHeight;

      if (ballRadius === undefined) return;

      gsap.set(`${currentAccordion} .ball`, {
        x: mouse.elementX - ballRadius / 2,
        y: mouse.elementY - ballRadius / 2,
      });

      if (!window.location.hash) {
        gsap.to(`${currentAccordion} .ball`, { scale: 1 });
      }

      gsap.set(`${currentAccordion} .accordion-toggle-btn`, {
        background: "transparent",
        border: "1px solid black",
      });

// Box Responsiveness
gsap.to(articleRef.current, {
  height: "auto", // Let GSAP calculate the height dynamically
  overflow: "hidden", // Ensures content isn't clipped
  background: "white",
  color: "black",
  borderRadius: "0.8rem",
  ease,
  duration: 0.4,
});



      gsap.matchMedia().add("(min-width: 768px)", function() {
        gsap.set(`${currentAccordion} .accordion-head`, {
          mixBlendMode: "difference",
        });
        gsap.set(`${currentAccordion} .accordion-head-dummy`, {
          mixBlendMode: "exclusion",
        });
      });

      gsap.to(`${currentAccordion} .accordion-description`, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease,
      });

      customCursorContext.setIsVisible(false);

      if (index + 1 <= maxAccordions) {
        gsap.to(nextAccordion, { border: "none" });
      }
    };

    if (isExpanded) {
      animateCollapse();
      setIsExpanded(false);
    } else {
      animateExpand();
      setIsExpanded(true);
    }
  });

  useEffect(
    function() {
      if (
        window.location.hash &&
        +window.location.hash.replace("#", "") === index - 1
      )
        handleAccordionToggle();
    },
    [index],
  );

  const handleMouseMove = contextSafe(function() {
    if (!isExpanded) return;
    const ballRadius = document
      .querySelector(`.service-accordion-${index} .ball`)
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

    gsap.to(`.service-accordion-${index} .ball-bg`, {
      rotate: rotation,
      duration: 0,
      ease: "none",
      onUpdate: function() {
        gsap.to(`.service-accordion-${index} .ball-bg`, {
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
        .querySelector(`.service-accordion-${index} .cta`)
        ?.getBoundingClientRect().height;
      if (!btnRadius) return;
      gsap.timeline().to(`.service-accordion-${index} .cta`, {
        left: mouse.elementX - btnRadius / 2,
        top: mouse.elementY - btnRadius / 2,
      });
    }
  });

  const handleMouseEnter = contextSafe(function() {
    if (!isExpanded) return;
    gsap.to(`.service-accordion-${index} .ball`, {
      scale: 1,
    });
    customCursorContext.setIsVisible(false);
  });

  const handleMouseLeave = contextSafe(function() {
    if (!isExpanded) return;
    customCursorContext.setIsVisible(true);
    gsap.to(`.service-accordion-${index} .ball`, {
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
    <article
    onMouseEnter={handleMouseEnter}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
    className={cn(
      `relative flex flex-col overflow-hidden border-t-2 border-t-white service-accordion-${index} pb-8 md:pb-0`,
      isExpanded && "cursor-none",
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
  
    <button
      className="accordion-toggle-btn l:top-8 absolute left-[0.8rem] top-[2.8rem] z-[999] -translate-y-1/2 rounded-full border-[1px] border-transparent bg-white px-2 py-2 text-black text-primary sm:top-[2.5rem] md:top-[1.55rem] md:-translate-y-0 md:px-8 md:py-1"
      onClick={handleAccordionToggle}
      aria-label={isExpanded ? "Collapse" : "Expand"}
    >
      {isExpanded ? <Minus /> : <Plus />}
    </button>
  
    <div className="accordion-head-dummy absolute z-[100] hidden text-white md:block">
      <div
        className="accordion-title-wrapper flex w-[90%] items-center justify-between p-8 px-[70px] md:px-[200px]"
        ref={headerRef}
      >
        <h3
          className={cn(
            "flex items-center gap-8 min-w-0 shrink",
            "text-[1.2rem] md:text-[2rem]", // Keep original size for 768px+
            "max-md:text-[clamp(1rem, 5vw, 1.5rem)]", // Shrink text only below 768px
            !isExpanded && "!text-white",
            isExpanded && "!text-primary md:!text-[rgb(0,0,114)]",
          )}
        >
          <span>{title}</span>
        </h3>
      </div>
      <p className="accordion-description flex max-w-[90%] items-start pb-8 pl-[70px] text-[1rem] font-light text-primary md:max-w-[70%] md:pl-[200px] md:text-[1.6rem] md:text-[rgb(0,0,114)] max-md:text-[clamp(0.9rem, 4.5vw, 1.4rem)]">
        {description}
      </p>
    </div>
  
    <div className="accordion-head z-[60]">
      <div
        className="accordion-title-wrapper flex w-[90%] items-center justify-between p-[1.4rem] px-[70px] md:p-8 md:px-[200px]"
        ref={headerRef}
      >
        <h3
          className={cn(
            "flex items-center gap-8 min-w-0 shrink",
            "text-[1.2rem] md:text-[2rem]", // Keep original size for 768px+
            "max-md:text-[clamp(1rem, 5vw, 1.5rem)]", // Shrink text only below 768px
            !isExpanded && "!text-white",
            isExpanded && "!text-primary md:!text-[rgb(240,240,240)]",
          )}
        >
          <span>{title}</span>
        </h3>
      </div>
      <p className="accordion-description flex max-w-[90%] items-start pb-8 pl-[70px] text-[1rem] font-light text-primary md:max-w-[70%] md:pl-[200px] md:text-[1.6rem] md:text-[rgb(240,240,240)] max-md:text-[clamp(0.9rem, 4.5vw, 1.4rem)]">
        {description}
      </p>
    </div>
  
    {isExpanded && (
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
    )}
  
    <div className="grid aspect-square h-[8rem] place-content-center self-center rounded-full bg-primary text-white md:hidden">
      <TransitionLink href="/contact">Let&apos;s Talk</TransitionLink>
    </div>
  </article>
  
  );
};

export default ServiceAccordion;
