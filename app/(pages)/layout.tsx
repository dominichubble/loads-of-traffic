import type { ReactNode } from "react";

const PagesLayout = ({ children }: { children: ReactNode }) => {
  return <div className="relative z-0">{children}</div>;
};

export default PagesLayout;
