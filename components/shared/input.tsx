import React, { InputHTMLAttributes } from "react";
import { cn } from "@/utils";

const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        "border-primary/20 bg-primary/[0.025] placeholder:text-primary/60 hover:border-primary/35 min-h-12 w-full rounded-xl border px-4 py-3 text-base font-medium text-primary transition-colors placeholder:font-normal focus:border-primary",
        className,
      )}
      {...props}
    />
  );
};

export default Input;
