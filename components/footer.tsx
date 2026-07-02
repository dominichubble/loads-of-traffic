"use client";

import { Linkedin } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import TransitionLink from "./transition-link";
import Link from "next/link";

let nextPathname = "";
const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/services") {
    nextPathname = "/contact";
  } else if (pathname === "/contact") {
    nextPathname = "/about";
  } else if (pathname === "/about") {
    nextPathname = "/home";
  }

  return (
    <footer className="footer sticky bottom-0 z-[-1] grid h-[30vh] w-full place-content-center bg-white text-black md:pt-12">
      <div className="absolute -top-2 h-8 w-full bg-black blur-2xl"></div>
      <TransitionLink
        className="color-shift-hover color-shift-hover-accent font-outline-2 font-outline-accent text-[4rem] font-light uppercase tracking-wider"
        href={nextPathname === "/home" ? "/" : nextPathname}
        data-hover={nextPathname.replace("/", "")}
      >
        {nextPathname.replace("/", "")}
      </TransitionLink>
      <div className="absolute bottom-0 left-1/2 mb-8 flex -translate-x-1/2 items-center gap-4 text-primary">
        <Link
          href="https://www.linkedin.com/company/loads-of-traffic/"
          aria-label="Linkedin link"
          target="_blank"
        >
          <Linkedin />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
