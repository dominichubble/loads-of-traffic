import React, { InputHTMLAttributes } from "react";
import { cn } from "@/utils";

const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        "placeholder:text-primary/40 min-h-12 w-full bg-transparent px-0 py-3 text-base font-medium text-primary placeholder:font-normal",
        className,
      )}
      {...props}
    />
  );
};

export default Input;
