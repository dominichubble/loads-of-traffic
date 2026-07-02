import { cn } from "@/utils";
import React from "react";

type AboutSectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

const AboutSectionTitle = ({ children, className }: AboutSectionTitleProps) => {
  return (
    <h2
      className={cn(
        "mb-[3rem] flex items-center gap-4 self-start text-[2rem] font-bold sm:text-[3rem] xl:mb-[5rem] xl:text-[4.375rem]",
        className,
      )}
    >
      <span className="inline-block h-[0.8rem] w-[0.8rem] rounded-full bg-white xl:h-[1.2rem] xl:w-[1.2rem]"></span>
      {children}
    </h2>
  );
};

export default AboutSectionTitle;
