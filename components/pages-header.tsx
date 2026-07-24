"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { NAV_ITEMS } from "@/utils/constants";
import Image from "next/image";
import TransitionLink from "./transition-link";
import { cn } from "@/utils";

const PagesHeader = () => {
  const pathname = usePathname();
  return (
    <header className="bg-primary fixed inset-x-0 top-0 z-[999] hidden h-[var(--pages-header-height)] border-b border-white/10 text-white shadow-[0_10px_35px_rgba(0,0,79,0.18)] backdrop-blur-xl md:block">
      <div className="content-container flex h-full items-center justify-between px-[var(--container-padding-x)]">
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
          <ul className="flex items-center gap-1 text-sm font-medium xl:text-base">
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
                        : "text-white/85 hover:bg-white/10 hover:text-white",
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
