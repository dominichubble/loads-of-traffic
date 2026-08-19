import React, { TextareaHTMLAttributes } from "react";
import { cn } from "@/utils";

const Textarea = ({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={cn(
        "placeholder:text-primary/40 w-full text-base font-medium leading-relaxed text-primary placeholder:font-normal",
        className,
      )}
      {...props}
    />
  );
};

export default Textarea;
