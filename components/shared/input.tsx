import React, { InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="w-full rounded-full border-2 border-primary px-8 py-4 text-sm font-bold uppercase text-black text-primary placeholder:text-primary md:text-base"
      {...props}
      placeholder={`${props.placeholder}${props.required ? "*" : ""}`}
    />
  );
};

export default Input;
