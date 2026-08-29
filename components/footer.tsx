"use client";

import { Linkedin } from "lucide-react";
import React from "react";
import TransitionLink from "./transition-link";
import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS } from "@/utils/constants";

const Footer = () => {
  return (
    <footer className="footer relative w-full bg-primary text-white">
      <div className="content-container border-t border-white/10 page-gutters py-12 md:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
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
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/80">
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
              <li>
                <TransitionLink
                  href="/privacy"
                  className="transition-colors hover:text-white"
                >
                  Privacy
                </TransitionLink>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    (
                      window as unknown as { lotResetConsent?: () => void }
                    ).lotResetConsent?.()
                  }
                  className="transition-colors hover:text-white"
                >
                  Cookie settings
                </button>
              </li>
            </ul>
          </nav>

          <div className="flex items-center justify-between gap-6 lg:justify-end">
            <p className="text-xs text-white/75">
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
