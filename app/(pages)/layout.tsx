"use client";

import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import React from "react";

const PagesLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();
  const hideFooter = pathname === "/contact";

  return (
    <div className="relative z-0">
      {children}
      {!hideFooter ? <Footer /> : null}
    </div>
  );
};

export default PagesLayout;
