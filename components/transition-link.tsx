"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sleep } from "@/utils";
import gsap from "gsap";
import {
  ComponentPropsWithoutRef,
  MouseEvent,
  useCallback,
  useRef,
} from "react";

type TransitionLinkPropsType = {
  children?: React.ReactNode;
  href: string;
  className?: string;
} & ComponentPropsWithoutRef<typeof Link>;

const backgroundMap: { [key: string]: string } = {
  "/services": "#ED1464",
  "/services#services": "#ED1464",
  "/": "#00007A",
  "/contact": "#ED1464",
  "/about": "#00007A",
};

const TransitionLink = ({
  children,
  href,
  className,
  onClick,
  ...props
}: TransitionLinkPropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const isTransitioning = useRef(false);

  const handleTransition = useCallback(
    async (href: string) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;

      const panels = [".transition-right", ".transition-left"];
      gsap.set(panels, {
        background: backgroundMap[href] || "#ED1464",
      });

      await new Promise<void>((resolve) => {
        gsap.fromTo(
          panels,
          { opacity: 1, scaleY: 0 },
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.42,
            ease: "power3.inOut",
            onComplete: resolve,
          },
        );
      });

      router.push(href);
      await sleep(220);

      gsap.to(panels, {
        opacity: 0,
        scaleY: 0,
        duration: 0.36,
        ease: "power2.out",
        onComplete: () => {
          isTransitioning.current = false;
        },
      });
    },
    [router],
  );

  const handleLinkClick = async (event: MouseEvent<HTMLAnchorElement>) => {
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
    await handleTransition(href);
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
