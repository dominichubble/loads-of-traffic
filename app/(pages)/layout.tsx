import Footer from "@/components/footer";
import PagesHeader from "@/components/pages-header";
import React from "react";

const PagesLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative z-0">
      <PagesHeader />
      {children}
      <Footer />
    </div>
  );
};

export default PagesLayout;
