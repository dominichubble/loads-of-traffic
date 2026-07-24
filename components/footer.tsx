"use client";

import { Linkedin } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import TransitionLink from "./transition-link";
import Link from "next/link";

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
    <footer className="footer sticky bottom-0 z-[-1] grid min-h-[30vh] w-full place-content-center gap-6 bg-white py-12 text-black">
      <div className="absolute -top-2 h-8 w-full bg-black blur-2xl"></div>
      <TransitionLink
        className="color-shift-hover color-shift-hover-accent font-outline-2 font-outline-accent text-center text-[clamp(2.5rem,10vw,4rem)] font-light uppercase tracking-wider"
        href={next.href}
        data-hover={next.label}
      >
        {next.label}
      </TransitionLink>
      <div className="flex items-center justify-center text-primary">
        <Link
          href="https://www.linkedin.com/company/loads-of-traffic/"
          aria-label="Loads of Traffic on LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
