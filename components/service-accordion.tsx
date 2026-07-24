"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/utils";
import TransitionLink from "./transition-link";

type ServiceAccordionProps = {
  index: number;
  title: string;
  description: string;
  maxAccordions: number;
};

const ServiceAccordion = ({
  index,
  title,
  description,
}: ServiceAccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelId = `service-${index}-panel`;
  const triggerId = `service-${index}-trigger`;

  useEffect(() => {
    if (window.location.hash === `#${index}`) {
      setIsExpanded(true);
    }
  }, [index]);

  return (
    <article
      className={cn(
        "overflow-hidden rounded-[1.25rem] border transition-colors duration-200",
        isExpanded
          ? "border-white bg-white text-primary shadow-[0_20px_55px_rgba(82,0,31,0.18)]"
          : "border-primary bg-primary text-white shadow-[0_16px_45px_rgba(82,0,31,0.14)] hover:bg-[var(--color-primary-deep)]",
      )}
    >
      <h3>
        <button
          id={triggerId}
          type="button"
          className="flex min-h-[5.5rem] w-full items-center gap-4 px-5 py-5 text-left md:gap-6 md:px-8"
          onClick={() => setIsExpanded((current) => !current)}
          aria-expanded={isExpanded}
          aria-controls={panelId}
        >
          <span
            className={cn(
              "text-xs font-bold tabular-nums tracking-[0.14em]",
              isExpanded ? "text-accent" : "text-white/65",
            )}
          >
            0{index}
          </span>
          <span className="flex-1 text-lg font-semibold leading-tight tracking-[-0.02em] md:text-2xl">
            {title}
          </span>
          <span
            className={cn(
              "grid h-11 w-11 shrink-0 place-content-center rounded-full border transition-transform duration-200",
              isExpanded
                ? "border-primary/20 rotate-45 bg-primary text-white"
                : "border-white/30 bg-white/10",
            )}
            aria-hidden="true"
          >
            <Plus className="h-5 w-5" />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isExpanded}
      >
        <div className="border-primary/10 border-t px-5 pb-7 pt-6 md:px-8 md:pb-8">
          <p className="body-copy text-primary/80">{description}</p>
          <TransitionLink
            href="/contact"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Discuss this service
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </TransitionLink>
        </div>
      </div>
    </article>
  );
};

export default ServiceAccordion;
