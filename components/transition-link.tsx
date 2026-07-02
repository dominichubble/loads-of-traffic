"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sleep } from "@/utils";
import gsap from "gsap";
import { ComponentPropsWithoutRef, useCallback } from "react";

type TransitionLinkPropsType = {
  children?: React.ReactNode;
  href: string;
  className?: string;
} & ComponentPropsWithoutRef<typeof Link>;

const backgroundMap: { [key: string]: string } = {
  "/services": "#ED1464",
  "/": "#0007a0",
  "/contact": "#ED1464",
  "/about": "#0007a0",
};
const classMap: { [key: string]: string } = {
  "/services": "services",
  "/services#services": "services",
  "/": "home",
  "/contact": "contact",
  "/about": "about",
};

const TransitionLink = ({
  children,
  href,
  className,
  ...props
}: TransitionLinkPropsType) => {
  const router = useRouter();
  const handleTransition = useCallback(
    async (href: string) => {
      const transitionDuration = 1;
      const timeline = gsap.timeline({
        defaults: {
          ease: "power2.inOut",
          duration: transitionDuration,
        },
      });

      // Set background based on destination
      timeline.set([".transition-right", ".transition-left"], {
        background: backgroundMap[href] || "#ED1464",
      });

      // Transition in animation
      timeline.fromTo(
        [".transition-right", ".transition-left"],
        {
          opacity: 1,
          scaleY: 0,
        },
        {
          opacity: 1,
          scaleY: 1,
        },
      );

      // Wait for transition in
      await sleep(transitionDuration * 1000);

      // Navigate to new page
      router.push(href);

      // Wait for potential page load and then transition out
      await new Promise((resolve) => {
        const checkPageLoad = () => {
          // Check if the page content is loaded
          const mainContent = document.querySelector(`.${classMap[href]}`);

          if (mainContent) {
            resolve(true);
          } else {
            // If not loaded, check again after a short delay
            setTimeout(checkPageLoad, 100);
          }
        };
        checkPageLoad();
      });

      // Transition out animation
      timeline.fromTo(
        [".transition-right", ".transition-left"],
        {
          opacity: 1,
          scaleY: 1,
        },
        {
          opacity: 0,
          scaleY: 1,
        },
      );
    },
    [router],
  );

  const handleLinkClick = async function(
    e: React.MouseEvent<HTMLAnchorElement>,
  ) {
    e.preventDefault();
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
