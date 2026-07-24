"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ComponentPropsWithoutRef, MouseEvent, useCallback } from "react";
import {
  OUTGOING_LAYER_ID,
  PAGE_SHELL,
  navBgForPath,
  resolveTransition,
  transitionState,
} from "@/utils/transition-state";

type TransitionLinkPropsType = {
  children?: React.ReactNode;
  href: string;
  className?: string;
} & ComponentPropsWithoutRef<typeof Link>;

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
  const distanceY = window.innerHeight;
  const distanceX = window.innerWidth;
  const layer = document.createElement("div");
  layer.id = OUTGOING_LAYER_ID;
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText = [
    "position:fixed",
    "inset:0",
    `width:${distanceX}px`,
    `height:${distanceY}px`,
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

const TransitionLink = ({
  children,
  href,
  className,
  onClick,
  ...props
}: TransitionLinkPropsType) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleTransition = useCallback(
    (destination: string) => {
      if (transitionState.isCoverActive) return;
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

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank" ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return;
    }

    const destinationPath = href.split("#")[0] || pathname;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      prefersReducedMotion ||
      window.innerWidth < 640 ||
      destinationPath === pathname
    ) {
      return;
    }

    event.preventDefault();
    handleTransition(href);
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleLinkClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default TransitionLink;
