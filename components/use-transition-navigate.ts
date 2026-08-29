"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import {
  OUTGOING_LAYER_ID,
  PAGE_SHELL,
  navBgForPath,
  normalizePath,
  resolveTransition,
  transitionState,
} from "@/utils/transition-state";

/**
 * Freeze a visual copy of the current page in a viewport-sized layer so the
 * real #main-content can unmount/remount underneath while the slide runs.
 * Site chrome (PagesHeader) lives outside #main-content and stays put.
 */
function captureOutgoingLayer() {
  const main = document.querySelector(PAGE_SHELL) as HTMLElement | null;
  if (!main) return null;

  document.getElementById(OUTGOING_LAYER_ID)?.remove();

  const scrollY = window.scrollY;
  const layer = document.createElement("div");
  layer.id = OUTGOING_LAYER_ID;
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText = [
    "position:fixed",
    "inset:0",
    `width:${window.innerWidth}px`,
    `height:${window.innerHeight}px`,
    "z-index:1600",
    "overflow:hidden",
    "pointer-events:none",
  ].join(";");

  const clone = main.cloneNode(true) as HTMLElement;
  clone.removeAttribute("id");
  clone.removeAttribute("tabindex");
  clone.style.marginTop = `-${scrollY}px`;
  clone.querySelectorAll("video").forEach((video) => {
    video.pause();
    video.removeAttribute("autoplay");
  });

  layer.appendChild(clone);
  document.body.appendChild(layer);
  return layer;
}

/**
 * Runs the same slide-out/slide-in page transition that <TransitionLink> uses,
 * but callable imperatively (e.g. from the Prev/Next deck arrows crossing a
 * page boundary). Falls back to a plain router push when motion is reduced,
 * on narrow screens, or when the layer capture fails.
 */
export function useTransitionNavigate() {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (destination: string) => {
      const destinationPath = normalizePath(destination);
      if (destinationPath === normalizePath(pathname)) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (
        prefersReducedMotion ||
        window.innerWidth < 640 ||
        transitionState.isCoverActive
      ) {
        router.push(destination);
        return;
      }

      transitionState.isCoverActive = true;
      const { axis, direction } = resolveTransition(pathname, destination);
      transitionState.axis = axis;
      transitionState.direction = direction;
      transitionState.fromNavBg = navBgForPath(pathname);
      transitionState.toNavBg = navBgForPath(destination);

      document.documentElement.classList.add("page-transitioning");

      const outgoing = captureOutgoingLayer();
      if (!outgoing) {
        transitionState.isCoverActive = false;
        document.documentElement.classList.remove("page-transitioning");
        router.push(destination);
        return;
      }

      transitionState.outgoingLayer = outgoing;
      gsap.set(PAGE_SHELL, { autoAlpha: 0 });
      window.scrollTo(0, 0);
      router.push(destination);
    },
    [pathname, router],
  );
}
