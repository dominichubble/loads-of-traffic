import { cn } from "@/utils";
import React from "react";

type AboutSectionProps = {
  children: React.ReactNode;
  className?: string;
};

const AboutSection = ({ children, className }: AboutSectionProps) => {
  return (
    <section className={cn("content-container page-gutters", className)}>
      {children}
    </section>
  );
};

export default AboutSection;
