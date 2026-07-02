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
    <article className="group relative h-[20rem] max-w-[25rem] overflow-hidden rounded-[1rem] border-[1px] border-white xl:h-[34rem]">
      <div className="grid h-full place-content-center">
        <h3
          className={cn(
            "relative z-10 text-[1.2rem] font-bold uppercase tracking-[5%] duration-500 group-hover:scale-90 group-hover:text-white xl:text-[2.5rem]",
            index === 0 && "group-hover:text-accent",
            index === 1 && "group-hover:text-primary",
          )}
        >
          {title}
        </h3>
        <div
          className={cn(
            "custom-cursor-hover absolute inset-0 grid scale-90 place-content-end rounded-[1rem] p-4 py-8 text-center leading-[150%] transition-all duration-500 hover:-translate-y-2 group-hover:bg-primary group-hover:text-white",
            index === 0 && "group-hover:bg-white group-hover:text-accent",
            index === 1 && "group-hover:bg-accent group-hover:text-primary",
            index === 2 && "group-hover:bg-yellow",
          )}
        >
          <p className="transition-opacity duration-500 group-hover:opacity-100">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default AboutFeature;
