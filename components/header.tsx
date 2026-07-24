import React from "react";
import { NAV_ITEMS } from "@/utils/constants";
import Image from "next/image";
import TransitionLink from "./transition-link";
import { cn } from "@/utils";

const Header = () => {
  return (
    <header className="relative z-[100] hidden w-full flex-col items-start gap-5 md:flex">
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
      <nav aria-label="Primary navigation">
        <ul className="flex items-center gap-1 whitespace-nowrap text-sm font-medium xl:text-base">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <TransitionLink
                href={item.link}
                aria-current={item.link === "/" ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-10 items-center rounded-full px-3 transition-colors xl:px-4",
                  item.link === "/"
                    ? "bg-white text-primary"
                    : "text-white/80 hover:bg-white/10 hover:text-white",
                )}
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

export default Header;
