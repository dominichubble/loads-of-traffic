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
    <article className="group flex w-full flex-col gap-10 overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/[0.06] p-6 transition-transform duration-200 hover:-translate-y-1 hover:bg-white/[0.09] lg:gap-14 lg:p-8">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">
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
      <div>
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
