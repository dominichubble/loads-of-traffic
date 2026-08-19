import type { ReactNode } from "react";
import Footer from "@/components/footer";

const PagesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative z-0">
      {children}
      <Footer />
    </div>
  );
};

export default PagesLayout;
