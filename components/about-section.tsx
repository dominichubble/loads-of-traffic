import { cn } from "@/utils";
import React from "react";

type AboutSectionProps = {
  children: React.ReactNode;
  className?: string;
};

const AboutSection = ({ children, className }: AboutSectionProps) => {
  return (
    <section
      className={cn("px-6 sm:px-[var(--container-padding-x)]", className)}
    >
      {children}
    </section>
  );
};

export default AboutSection;
