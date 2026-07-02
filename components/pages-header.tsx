"use client";
import { usePathname } from "next/navigation";

import React, { useRef } from "react";
import { NAV_ITEMS } from "@/utils/constants";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import TransitionLink from "./transition-link";

gsap.registerPlugin(ScrollTrigger);

const PagesHeader = () => {
  const pathname = usePathname();
const isAboutPage = pathname === "/about";

  const headerRef = useRef<HTMLElement>(null);
  useGSAP(
    function() {
      ScrollTrigger.addEventListener("scrollStart", function() {
        gsap.set(headerRef.current, {
          backdropFilter: "blur(100px)",
        });
      });
    },
    {
      scope: headerRef,
    },
  );
  return (
    <header
      ref={headerRef}
      className="fixed top-0 z-[999] hidden h-[var(--pages-header-height)] w-full items-center justify-between px-[var(--container-padding-x)] md:flex"
    >
      <TransitionLink href="/">
        <div className="relative h-16 w-[16rem]">
          <Image
            src="/logo.png"
            alt="loads of traffic logo"
            fill
            sizes="100%"
            className="h-auto w-full object-contain"
          ></Image>
        </div>
      </TransitionLink>
      <nav>
        <ul className="flex items-center gap-[2.4rem] whitespace-nowrap font-sans text-[1rem] font-light xl:text-[1.6rem]">
          {NAV_ITEMS.map((item) => (
            <li className="" key={item.label}>
              <TransitionLink
                href={item.link}
                className={`custom-cursor-hover color-shift-hover transition-colors duration-300 ${
                  isAboutPage ? "color-shift-hover-accent" : "hover:text-[#00007A]"
                }`}
                data-hover={item.label}
              >
                {item.label}
              </TransitionLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default PagesHeader;
