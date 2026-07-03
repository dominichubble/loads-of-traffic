"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { NAV_ITEMS } from "@/utils/constants";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { sleep } from "@/utils";

const MobileHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navBtnTimeline = useRef<gsap.core.Timeline | undefined>(undefined);
  const router = useRouter();

  const { contextSafe } = useGSAP(function() { }, { scope: headerRef });

  const handleNavToggle = contextSafe(function() {
    if (!isNavOpen) {
      navBtnTimeline.current = gsap
        .timeline({
          defaults: {
            duration: 0.4,
            ease: "power2.out",
          },
        })
        .to(".bar-1", {
          rotateZ: "45",
          top: "50%",
          y: "-50%",
        })
        .to(
          ".bar-2",
          {
            scaleX: "0",
          },
          "<",
        )
        .to(
          ".bar-3",
          {
            rotateZ: "-45",
            top: "50%",
          },
          "<",
        )
        .to(
          ".mobile-nav",
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
          },
          "<",
        )
        .to(
          ".mobile-nav a",
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
          },
          "<",
        );
    } else {
      if (!navBtnTimeline.current) return;
      navBtnTimeline.current.reverse();
    }

    setIsNavOpen((isNavOpen) => !isNavOpen);
  });

  const handleClick = async function(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    navBtnTimeline.current?.reverse();
    if (!e.target) return;
    const element = e.target as HTMLAnchorElement;
    await sleep(300);
    router.push(element.href);
  };

  return (
    <header
      className="fixed right-0 top-0 z-[9999] flex w-full items-center justify-between px-4 pt-8 md:hidden"
      ref={headerRef}
    >
      <Link href="/" className="relative z-50">
        <div className="relative h-8 w-16">
          <Image
            src="/mobile-logo.png"
            alt="loads of traffic logo"
            fill
            sizes="100%"
            className="h-auto w-full object-contain"
          ></Image>
        </div>
      </Link>
      <div className="relative z-0">
        <button
          className="nav-btn relative z-10 aspect-square h-10 rounded-full border-2 border-white text-white"
          onClick={handleNavToggle}
          aria-label={isNavOpen ? "Close Navigation" : "Open Navigation"}
        >
          <span className="bar-1 absolute bottom-6 left-1/2 h-[2px] w-[50%] -translate-x-1/2 translate-y-1/2 bg-current"></span>
          <span className="bar-2 absolute left-1/2 top-1/2 h-[2px] w-[50%] -translate-x-1/2 -translate-y-1/2 bg-current"></span>
          <span className="bar-3 absolute left-1/2 top-6 h-[2px] w-[50%] -translate-x-1/2 -translate-y-1/2 bg-current"></span>
        </button>
        <nav className="mobile-nav pointer-events-none fixed inset-0 grid translate-y-[-2%] place-content-center bg-primary opacity-0">
          <ul className="mobile-nav-list flex flex-col items-center gap-[0.6rem] text-[2rem]">
            {NAV_ITEMS.map((item) => (
              <li className="overflow-hidden" key={item.label}>
                <Link
                  className="inline-block translate-y-full opacity-0"
                  href={item.link}
                  onClick={handleClick}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MobileHeader;
