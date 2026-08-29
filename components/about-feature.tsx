import { cn } from "@/utils";
import React from "react";

type AboutFeatureProps = {
  feature: {
    title: string;
    description: string;
    index: number;
  };
};

const AboutFeature = ({
  feature: { title, description, index },
}: AboutFeatureProps) => {
  return (
    <article className="group relative flex w-full flex-col gap-6 overflow-hidden rounded-[1.5rem] border border-white/15 bg-gradient-to-b from-white/[0.1] to-white/[0.03] p-6 transition-transform duration-200 hover:-translate-y-1 hover:border-white/25 sm:gap-10 lg:gap-12 lg:p-8">
      <div
        className="pointer-events-none absolute -right-24 -top-24 z-0 h-40 w-40 rounded-full border-[1.75rem] border-accent/20 transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      />
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">
          0{index + 1}
        </span>
        <span
          className={cn(
            "h-3 w-3 rounded-full",
            index === 0 && "bg-accent",
            index === 1 && "bg-white",
            index === 2 && "bg-yellow",
          )}
          aria-hidden="true"
        />
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl font-semibold tracking-[-0.03em] lg:text-3xl">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-white lg:text-base">
          {description}
        </p>
      </div>
    </article>
  );
};

export default AboutFeature;
