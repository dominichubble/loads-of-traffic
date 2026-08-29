import React from "react";
import AboutSectionTitle from "./about-section-title";
import AboutSection from "./about-section";
import { LockKeyhole } from "lucide-react";

const CONFIDENTIAL_CAPABILITIES = [
  {
    title: "Affiliate strategy",
    detail: "Programme design, partner growth, and revenue partnerships.",
  },
  {
    title: "Competitive intelligence",
    detail: "Market mapping, traffic sources, and opportunity analysis.",
  },
  {
    title: "Growth execution",
    detail: "Campaigns, optimisation, and measurable performance lifts.",
  },
] as const;

const AboutPortfolio = () => {
  return (
    <AboutSection>
      <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-accent via-accent to-[var(--color-accent-deep)] p-6 shadow-[0_28px_80px_rgba(0,0,79,0.22)] sm:p-9 lg:p-10">
        <div
          className="pointer-events-none absolute -right-52 -top-28 z-0 h-72 w-72 rounded-full border-[2.75rem] border-primary/25"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-48 -left-44 z-0 h-80 w-80 rounded-full border-[2.75rem] border-primary/20"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <span className="page-kicker text-white/80">Protected partnerships</span>
          <AboutSectionTitle className="mb-5 mt-4 text-white md:mb-6">
            Portfolio
          </AboutSectionTitle>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-10">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-primary p-6 text-white sm:p-7 lg:p-8">
              <div
                className="pointer-events-none absolute -right-24 -top-24 z-0 h-44 w-44 rounded-full border-[2rem] border-accent/40"
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col gap-6">
                <span className="grid h-16 w-16 place-content-center rounded-full border-2 border-white bg-accent text-white shadow-[0_8px_24px_rgba(0,0,79,0.35)]">
                  <LockKeyhole
                    className="h-7 w-7"
                    aria-hidden="true"
                    strokeWidth={2.25}
                  />
                </span>
                <div>
                  <p className="text-xl font-semibold leading-tight tracking-[-0.03em] sm:text-2xl">
                    Confidential by design
                  </p>
                  <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-white">
                    Every engagement is covered by robust NDAs, so clients can
                    share sensitive data and pursue ambitious ideas with
                    confidence.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
                What we ship under NDA
              </p>
              <ul className="mt-4 divide-y divide-white/20 border-y border-white/20">
                {CONFIDENTIAL_CAPABILITIES.map((item) => (
                  <li
                    key={item.title}
                    className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <span className="text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
                      {item.title}
                    </span>
                    <span className="max-w-[32ch] text-sm leading-relaxed text-white sm:text-right">
                      {item.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="mt-8 pb-1 text-[clamp(1.5rem,1rem+2.2vw,2.75rem)] font-bold uppercase leading-[1.1] tracking-[-0.05em] text-balance break-words text-white md:mt-10">
            Results speak.{" "}
            <span className="font-outline-2 font-outline-white">
              Client names don&apos;t.
            </span>
          </h3>
        </div>
      </div>
    </AboutSection>
  );
};

export default AboutPortfolio;
