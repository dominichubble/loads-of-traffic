"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  NAV_BG_STRIP_ATTR,
  NavBgTone,
  OUTGOING_LAYER_ID,
  PAGE_SHELL,
  PAGES_HEADER_BG,
  SLIDE_DURATION,
  transitionState,
} from "@/utils/transition-state";

function cleanupOutgoing() {
  transitionState.outgoingLayer?.remove();
  transitionState.outgoingLayer = null;
  document.getElementById(OUTGOING_LAYER_ID)?.remove();
}

function cleanupNavBgStrips() {
  document
    .querySelectorAll(`[${NAV_BG_STRIP_ATTR}]`)
    .forEach((el) => el.remove());
}

const NAV_BG_STYLES: Record<
  Exclude<NavBgTone, null>,
  { background: string; shadow: string }
> = {
  primary: {
    background: "var(--color-primary)",
    shadow: "0 10px 35px rgba(0,0,79,0.18)",
  },
  accent: {
    background: "var(--color-accent)",
    shadow: "0 10px 35px rgba(83,0,32,0.22)",
  },
};

/** Solid bar that rides along with a sliding page layer under the fixed nav. */
function attachNavBgStrip(
  parent: HTMLElement,
  tone: Exclude<NavBgTone, null>,
) {
  const { background, shadow } = NAV_BG_STYLES[tone];
  const strip = document.createElement("div");
  strip.setAttribute(NAV_BG_STRIP_ATTR, "true");
  strip.setAttribute("aria-hidden", "true");
  strip.style.cssText = [
    "position:absolute",
    "top:0",
    "left:0",
    "right:0",
    "height:var(--pages-header-height)",
    `background:${background}`,
    "border-bottom:1px solid rgba(255,255,255,0.1)",
    `box-shadow:${shadow}`,
    "pointer-events:none",
    "z-index:20",
  ].join(";");
  parent.appendChild(strip);
  return strip;
}

function setLiveNavBgVisible(visible: boolean) {
  const bg = document.querySelector(PAGES_HEADER_BG) as HTMLElement | null;
  if (!bg) return;
  bg.style.opacity = visible ? "" : "0";
}

function unlockPage() {
  const shell = document.querySelector(PAGE_SHELL);

  transitionState.isCoverActive = false;
  transitionState.direction = 1;
  transitionState.axis = "x";
  transitionState.fromNavBg = null;
  transitionState.toNavBg = null;
  document.documentElement.classList.remove("page-transitioning");
  cleanupOutgoing();
  cleanupNavBgStrips();
  setLiveNavBgVisible(true);

  if (shell) {
    gsap.set(shell, {
      clearProps:
        "position,top,left,right,width,height,minHeight,overflow,zIndex,transform,x,y,yPercent,opacity,visibility",
    });
  }

  window.scrollTo(0, 0);
}

const PageTransitionOverlay = () => {
  const pathname = usePathname();
  const isFirstRenderRef = useRef(true);

  useLayoutEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    if (!transitionState.isCoverActive) return;

    const shell = document.querySelector(PAGE_SHELL) as HTMLElement | null;
    const outgoing =
      transitionState.outgoingLayer ??
      document.getElementById(OUTGOING_LAYER_ID);

    if (!shell || !outgoing) {
      unlockPage();
      return;
    }

    const axis = transitionState.axis;
    const direction = transitionState.direction;
    const distance =
      axis === "x" ? window.innerWidth : window.innerHeight;
    const { fromNavBg, toNavBg } = transitionState;

    // Hide the fixed live bar so sliding strips can take over under the logo.
    if (fromNavBg || toNavBg) {
      setLiveNavBgVisible(false);
    }

    gsap.killTweensOf([shell, outgoing]);

    gsap.set(shell, {
      autoAlpha: 1,
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      overflow: "hidden",
      zIndex: 1500,
      x: axis === "x" ? direction * distance : 0,
      y: axis === "y" ? direction * distance : 0,
      force3D: true,
    });
    gsap.set(outgoing, {
      width: window.innerWidth,
      height: window.innerHeight,
      x: 0,
      y: 0,
      force3D: true,
    });

    if (fromNavBg) {
      attachNavBgStrip(outgoing, fromNavBg);
    }
    if (toNavBg) {
      attachNavBgStrip(shell, toNavBg);
    }

    const tl = gsap.timeline({
      defaults: {
        duration: SLIDE_DURATION,
        ease: "power2.inOut",
        force3D: true,
      },
      onComplete: unlockPage,
    });

    if (axis === "x") {
      tl.to(outgoing, { x: -direction * distance }, 0);
      tl.to(shell, { x: 0 }, 0);
    } else {
      tl.to(outgoing, { y: -direction * distance }, 0);
      tl.to(shell, { y: 0 }, 0);
    }

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return null;
};

export default PageTransitionOverlay;
