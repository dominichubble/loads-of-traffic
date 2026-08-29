"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import GoogleAnalytics from "./google-analytics";

const STORAGE_KEY = "lot-consent";
type Consent = "granted" | "denied";

/**
 * Cookie-consent gate. Google Analytics does not load until the visitor
 * explicitly accepts. The choice is stored in localStorage; clearing it
 * (or calling `window.lotResetConsent()`) brings the banner back.
 */
const CookieConsent = () => {
  // undefined = not yet read from storage; null = read, no choice made.
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* private mode / storage disabled — treat as undecided */
    }
    setConsent(stored === "granted" || stored === "denied" ? stored : null);

    (window as unknown as { lotResetConsent?: () => void }).lotResetConsent =
      () => {
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
        setConsent(null);
      };
  }, []);

  const choose = useCallback((value: Consent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    // Reload so the page starts from a clean state for the new choice:
    // next/script tags injected under a prior "Accept" are not removed on
    // unmount, so a plain state flip cannot reliably un-load analytics.
    window.location.reload();
  }, []);

  return (
    <>
      {consent === "granted" && <GoogleAnalytics />}

      {consent === null && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-3 z-[2000] mx-auto max-w-2xl rounded-2xl border border-black/10 bg-white p-4 text-primary shadow-[0_20px_60px_rgba(0,0,79,0.25)] sm:p-5"
        >
          <p className="text-sm leading-relaxed">
            We use analytics cookies to understand how the site is used. They
            load only if you accept. See our{" "}
            <Link
              href="/privacy"
              className="font-semibold underline underline-offset-4"
            >
              Privacy &amp; Cookie Policy
            </Link>
            .
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => choose("granted")}
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="inline-flex min-h-11 items-center rounded-full border border-primary/25 px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
