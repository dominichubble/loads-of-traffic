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
        "overflow-hidden rounded-[1.25rem] border transition-[background-color,border-color,color,box-shadow,transform] duration-500 ease-in-out",
        isExpanded
          ? "border-white bg-white text-primary shadow-[0_28px_70px_rgba(0,0,79,0.28)]"
          : "border-white/80 bg-white text-primary shadow-[0_18px_50px_rgba(0,0,79,0.22)] hover:-translate-y-0.5 hover:border-white hover:shadow-[0_24px_60px_rgba(0,0,79,0.28)]",
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
          <span className="text-xs font-bold tabular-nums tracking-[0.14em] text-accent">
            0{index}
          </span>
          <span className="flex-1 text-lg font-semibold leading-tight tracking-[-0.02em] text-primary md:text-2xl">
            {title}
          </span>
          <span
            className={cn(
              "grid h-11 w-11 shrink-0 place-content-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 ease-in-out",
              isExpanded
                ? "rotate-45 border-primary bg-primary text-white"
                : "border-primary/20 bg-primary/5 text-primary",
            )}
            aria-hidden="true"
          >
            <Plus className="h-5 w-5" />
          </span>
        </button>
      </h3>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-in-out",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            inert={!isExpanded}
            className={cn(
              "border-primary/10 border-t px-5 pb-7 pt-6 transition-opacity duration-500 ease-in-out md:px-8 md:pb-8",
              isExpanded ? "opacity-100 delay-150" : "opacity-0",
            )}
          >
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
      </div>
    </article>
  );
};

export default ServiceAccordion;
