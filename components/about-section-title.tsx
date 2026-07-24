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
        "mb-[3rem] self-start text-[2rem] font-bold sm:text-[3rem] xl:mb-[5rem] xl:text-[4.375rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export default AboutSectionTitle;
