"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { NAV_ITEMS } from "@/utils/constants";
import Image from "next/image";
import TransitionLink from "./transition-link";
import { cn } from "@/utils";
import { navBgForPath } from "@/utils/transition-state";

const PagesHeader = () => {
  const pathname = usePathname();
  const navBg = navBgForPath(pathname);

  return (
    <header className="fixed inset-x-0 top-0 z-[1800] hidden h-[var(--pages-header-height)] bg-transparent text-white md:block">
      {/* Background slides with page transitions; logo/nav stay fixed above. */}
      <div
        id="pages-header-bg"
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          navBg === "accent" &&
            "border-b border-white/10 bg-accent shadow-[0_10px_35px_rgba(83,0,32,0.22)] backdrop-blur-xl",
          navBg === "primary" &&
            "border-b border-white/10 bg-primary shadow-[0_10px_35px_rgba(0,0,79,0.18)] backdrop-blur-xl",
          !navBg && "border-b border-transparent bg-transparent",
        )}
      />
      <div className="relative grid h-full w-full grid-cols-[1fr_55%]">
        <div className="flex items-center pl-[var(--container-padding-x)]">
          <TransitionLink
            href="/"
            className="flex min-h-11 items-center"
            aria-label="Loads of Traffic home"
          >
            <span className="relative block h-12 w-[12rem] xl:w-[14rem]">
              <Image
                src="/logo.png"
                alt=""
                fill
                sizes="(min-width: 1280px) 224px, 192px"
                className="object-contain object-left"
                priority
              />
            </span>
          </TransitionLink>
        </div>
        <nav
          aria-label="Primary navigation"
          className="flex h-full items-center px-[var(--container-padding-x)]"
        >
          <ul className="flex w-full items-center justify-center gap-1 text-sm font-medium xl:gap-2 xl:text-base">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.link;
              return (
                <li key={item.label}>
                  <TransitionLink
                    href={item.link}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-full px-4 transition-colors xl:px-5",
                      isActive
                        ? "bg-white text-primary"
                        : "text-white hover:bg-white/10",
                    )}
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default PagesHeader;
