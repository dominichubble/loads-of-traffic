import React, { LabelHTMLAttributes } from "react";
import { cn } from "@/utils";

const Label = ({
  className,
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      className={cn("text-sm font-semibold text-primary", className)}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
