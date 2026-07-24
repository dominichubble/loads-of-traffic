import Footer from "@/components/footer";
import React from "react";

const PagesLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative z-0">
      {children}
      <Footer />
    </div>
  );
};

export default PagesLayout;
