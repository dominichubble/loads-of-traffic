import React from "react";
import { NAV_ITEMS } from "@/utils/constants";
import Image from "next/image";
import TransitionLink from "./transition-link";

const Header = () => {
  return (
    <header className="relative top-0 z-[99999999] hidden flex-col items-center gap-[2.4rem] md:inline-flex">
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
            <li key={item.label}>
              <TransitionLink
                href={item.link}
                className="custom-cursor-hover color-shift-hover color-shift-hover-accent"
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

export default Header;
