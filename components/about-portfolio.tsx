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
      <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-accent via-accent to-[var(--color-accent-deep)] p-7 shadow-[0_28px_80px_rgba(0,0,79,0.22)] sm:p-10 sm:py-12 lg:p-14">
        <div
          className="pointer-events-none absolute -right-52 -top-28 z-0 h-72 w-72 rounded-full border-[2.75rem] border-primary/25"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-48 -left-44 z-0 h-80 w-80 rounded-full border-[2.75rem] border-primary/20"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <span className="page-kicker text-white/65">Protected partnerships</span>
          <AboutSectionTitle className="mb-8 mt-5 text-white md:mb-10">
            Portfolio
          </AboutSectionTitle>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-14 xl:gap-20">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-primary p-7 text-white sm:p-9 lg:p-10">
              <div
                className="pointer-events-none absolute -right-24 -top-24 z-0 h-44 w-44 rounded-full border-[2rem] border-accent/40"
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col gap-8">
                <span className="grid h-16 w-16 place-content-center rounded-full border-2 border-white bg-accent text-white shadow-[0_8px_24px_rgba(0,0,79,0.35)]">
                  <LockKeyhole
                    className="h-7 w-7"
                    aria-hidden="true"
                    strokeWidth={2.25}
                  />
                </span>
                <div>
                  <p className="text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
                    Confidential by design
                  </p>
                  <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-white/70 md:text-base">
                    Every engagement is covered by robust NDAs, so clients can
                    share sensitive data and pursue ambitious ideas with
                    confidence.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/65">
                What we ship under NDA
              </p>
              <ul className="mt-6 divide-y divide-white/20 border-y border-white/20">
                {CONFIDENTIAL_CAPABILITIES.map((item) => (
                  <li
                    key={item.title}
                    className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <span className="text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
                      {item.title}
                    </span>
                    <span className="max-w-[32ch] text-sm leading-relaxed text-white/75 sm:text-right">
                      {item.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="mt-12 max-w-4xl text-[clamp(2rem,5.5vw,4.5rem)] font-bold uppercase leading-[1.02] tracking-[-0.05em] text-white md:mt-14">
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
