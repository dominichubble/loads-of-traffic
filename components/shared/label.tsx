import React, { LabelHTMLAttributes } from "react";

const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label className="sr-only" {...props}>
      {props.children}
    </label>
  );
};

export default Label;
