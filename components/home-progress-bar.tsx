"use client";

import React, { forwardRef } from "react";

const HomeProgressBar = forwardRef<HTMLDivElement>(
  function HomeProgressBar(_props, ref) {
    return (
      <div
        ref={ref}
        className="fixed left-0 top-0 z-[1100] h-full w-1 origin-top scale-y-0 bg-yellow"
        aria-hidden="true"
      />
    );
  },
);

export default HomeProgressBar;
