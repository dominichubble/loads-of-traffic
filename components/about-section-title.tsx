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
        "section-heading mb-10 self-start text-white md:mb-14",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export default AboutSectionTitle;
