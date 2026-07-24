"use client";

import { ArrowUpRight, Linkedin } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import TransitionLink from "./transition-link";
import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS } from "@/utils/constants";

// Which page the big footer link points to next, keyed by current path.
// Computed per-render (was previously module-level mutable state, which went
// stale and rendered a blank link on unmapped routes).
const NEXT_PAGE: Record<string, { href: string; label: string }> = {
  "/": { href: "/services", label: "Services" },
  "/services": { href: "/contact", label: "Contact" },
  "/contact": { href: "/about", label: "About" },
  "/about": { href: "/", label: "Home" },
};

const Footer = () => {
  const pathname = usePathname();
  const next = NEXT_PAGE[pathname] ?? NEXT_PAGE["/"];

  return (
    <footer className="footer relative w-full border-t border-white/10 bg-primary text-white">
      <div className="content-container px-5 py-12 sm:px-[var(--container-padding-x)] md:py-16">
        <div className="grid gap-8 pb-12 md:grid-cols-[0.6fr_1.4fr] md:items-end md:pb-16">
          <div>
            <span className="page-kicker text-white/55">
              Continue exploring
            </span>
            <p className="mt-5 max-w-[28ch] text-sm leading-relaxed text-white/65">
              Discover the next part of Loads of Traffic.
            </p>
          </div>
          <TransitionLink
            className="group flex items-end justify-between gap-5 border-b border-white/25 pb-5 transition-colors hover:border-accent"
            href={next.href}
          >
            <span className="text-[clamp(2.5rem,8vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
              {next.label}
            </span>
            <span className="mb-1 grid h-12 w-12 shrink-0 place-content-center rounded-full bg-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:h-16 md:w-16">
              <ArrowUpRight
                className="h-5 w-5 md:h-7 md:w-7"
                aria-hidden="true"
              />
            </span>
          </TransitionLink>
        </div>

        <div className="flex flex-col gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <TransitionLink
            href="/"
            className="relative block h-12 w-[11rem]"
            aria-label="Loads of Traffic home"
          >
            <Image
              src="/logo.png"
              alt=""
              fill
              sizes="176px"
              className="object-contain object-left"
            />
          </TransitionLink>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <TransitionLink
                    href={item.link}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-between gap-6 lg:justify-end">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} Loads of Traffic
            </p>
            <Link
              href="https://www.linkedin.com/company/loads-of-traffic/"
              className="grid h-11 w-11 place-content-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
              aria-label="Loads of Traffic on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
