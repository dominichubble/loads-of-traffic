import React, { TextareaHTMLAttributes } from "react";

const Textarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className="w-full rounded-2xl border-2 border-primary px-8 py-4 text-sm font-bold uppercase text-primary placeholder:text-primary md:text-base"
      {...props}
      placeholder={`${props.placeholder}${props.required ? "*" : ""}`}
    />
  );
};

export default Textarea;
