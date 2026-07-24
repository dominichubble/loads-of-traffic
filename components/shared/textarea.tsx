import React, { TextareaHTMLAttributes } from "react";
import { cn } from "@/utils";

const Textarea = ({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={cn(
        "border-primary/20 bg-primary/[0.025] placeholder:text-primary/60 hover:border-primary/35 w-full resize-y rounded-xl border px-4 py-3 text-base font-medium leading-relaxed text-primary transition-colors placeholder:font-normal focus:border-primary",
        className,
      )}
      {...props}
    />
  );
};

export default Textarea;
