"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NAV_ITEMS } from "@/utils/constants";
import TransitionLink from "./transition-link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils";

const MobileHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isNavOpen) return;

    const previousOverflow = document.body.style.overflow;
    const pageContent = document.getElementById("main-content");
    const wasPageContentInert = pageContent?.inert ?? false;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    if (pageContent) pageContent.inert = true;
    navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsNavOpen(false);
        menuButton?.focus();
        return;
      }

      if (event.key === "Tab") {
        const focusableElements = [
          menuButton,
          ...Array.from(
            navRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ??
              [],
          ),
        ].filter(
          (element): element is HTMLButtonElement | HTMLAnchorElement =>
            element !== null,
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements.at(-1);

        if (
          event.shiftKey &&
          document.activeElement === firstElement &&
          lastElement
        ) {
          event.preventDefault();
          lastElement.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === lastElement &&
          firstElement
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (pageContent) pageContent.inert = wasPageContentInert;
      window.removeEventListener("keydown", handleKeyDown);
      menuButton?.focus();
    };
  }, [isNavOpen]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[1000] px-4 pt-3 md:hidden"
      aria-label="Mobile site header"
    >
      <div className="bg-primary relative z-20 flex min-h-14 items-center justify-between rounded-full border border-white/15 px-4 shadow-[0_12px_40px_rgba(0,0,79,0.25)] backdrop-blur-xl">
        <TransitionLink
          href="/"
          className="relative flex min-h-11 min-w-11 items-center"
          aria-label="Loads of Traffic home"
        >
          <span className="relative block h-8 w-[4.75rem]">
            <Image
              src="/mobile-logo.png"
              alt=""
              fill
              sizes="76px"
              className="object-contain object-left"
              priority
            />
          </span>
        </TransitionLink>
        <button
          ref={menuButtonRef}
          type="button"
          className="grid min-h-11 min-w-11 place-content-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20"
          onClick={() => setIsNavOpen((current) => !current)}
          aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isNavOpen}
          aria-controls="mobile-navigation"
        >
          {isNavOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <button
        type="button"
        tabIndex={-1}
        disabled={!isNavOpen}
        aria-hidden={!isNavOpen}
        aria-label="Close navigation"
        onClick={() => setIsNavOpen(false)}
        className={cn(
          "bg-primary/55 fixed inset-0 z-0 backdrop-blur-sm transition-opacity duration-200",
          isNavOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />

      <nav
        id="mobile-navigation"
        ref={navRef}
        aria-label="Primary navigation"
        aria-hidden={!isNavOpen}
        className={cn(
          "absolute left-4 right-4 top-[5.25rem] z-10 overflow-hidden rounded-3xl border border-white/15 bg-primary p-3 text-white shadow-[0_24px_70px_rgba(0,0,79,0.35)] transition-all duration-200",
          isNavOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <ul className="flex flex-col">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.link;
            return (
              <li key={item.label}>
                <TransitionLink
                  href={item.link}
                  tabIndex={isNavOpen ? 0 : -1}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 items-center justify-between rounded-2xl px-5 text-lg font-medium transition-colors",
                    isActive
                      ? "bg-white text-primary"
                      : "text-white hover:bg-white/10",
                  )}
                >
                  <span>{item.label}</span>
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      isActive ? "bg-accent" : "bg-white/30",
                    )}
                    aria-hidden="true"
                  />
                </TransitionLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default MobileHeader;
