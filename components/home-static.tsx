import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { servicesSectionContent } from "@/utils/constants";
import type { HomeSlideCta } from "@/types";
import TransitionLink from "./transition-link";
import { cn } from "@/utils";

const servicePosters = [
  "/lottie-thumbnail-1.png",
  "/lottie-thumbnail-2.png",
  "/lottie-thumbnail-3.png",
  "/lottie-thumbnail-4.png",
];

const slideCtaClass = (cta: HomeSlideCta, isPink: boolean) => {
  if (cta === "yellow") return "bg-yellow text-primary";
  if (cta === "navy") return "bg-primary text-white";
  return isPink ? "bg-white text-accent" : "bg-white text-primary";
};

const HomeStatic = () => {
  return (
    <section
      className="min-h-screen overflow-hidden bg-primary text-white"
      aria-label="Our services"
    >
      <div className="content-container page-gutters page-shell">
        <div className="page-split mt-8 border-b border-white/15 pb-10 md:mt-16 md:pb-12">
          <div>
            <span className="page-kicker text-white/65">Our expertise</span>
            <h1 className="display-heading mt-6 text-white">What we do</h1>
          </div>
          <p className="body-copy text-white md:pb-2">
            Explore the same strategy, intelligence, and growth capabilities in
            a calm, motion-free format.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:mt-14">
          {servicesSectionContent.map((service, index) => {
            const isPink = index % 2 === 1;
            return (
              <article
                key={service.title}
                className="grid overflow-hidden rounded-[var(--radius-card)] border border-white/15 bg-white/[0.06] shadow-[0_24px_70px_rgba(0,0,79,0.2)] md:grid-cols-[0.85fr_1.15fr]"
              >
                <div className="relative min-h-64 overflow-hidden bg-white/5 md:min-h-[24rem]">
                  <Image
                    src={servicePosters[index]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <div className="flex items-center justify-between border-b border-white/15 pb-4">
                    <span className="page-kicker text-white/65">
                      {service.kicker}
                    </span>
                    <span className="text-xs font-semibold tabular-nums text-white/65">
                      0{index + 1} / 04
                    </span>
                  </div>

                  <h2
                    className={cn(
                      "mt-6 text-[clamp(1.8rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em]",
                      service.titleStyle === "outline" && "home-title-outline",
                    )}
                  >
                    {service.title}
                  </h2>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-white md:text-base">
                    {service.description.map((line, lineIndex) => (
                      <li key={line} className="flex gap-3">
                        {service.bullets === "index" ? (
                          <span
                            className="w-7 shrink-0 text-xs font-bold tabular-nums tracking-[0.12em] text-yellow"
                            aria-hidden="true"
                          >
                            0{lineIndex + 1}
                          </span>
                        ) : service.bullets === "rule" ? (
                          <span
                            className="mt-[0.7em] h-[2px] w-4 shrink-0 bg-yellow"
                            aria-hidden="true"
                          />
                        ) : (
                          <span
                            className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                        )}
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <TransitionLink
                    href={service.readMoreLink}
                    className={cn(
                      "mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-lg",
                      slideCtaClass(service.cta, isPink),
                    )}
                  >
                    {service.ctaLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </TransitionLink>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeStatic;
