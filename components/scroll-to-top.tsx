"use client";
import { useLenis } from "@studio-freight/react-lenis";
import React, { ReactNode, useEffect } from "react";

const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const lenis = useLenis();
  useEffect(() => {
    if (window) {
      window.addEventListener("beforeunload", function() {
        lenis?.scrollTo(0, { immediate: true });
      });
    }
  }, [lenis]);
  return <>{children}</>;
};

export default ScrollToTop;
