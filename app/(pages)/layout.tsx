import type { ReactNode } from "react";

const PagesLayout = ({ children }: { children: ReactNode }) => {
  // The footer is the last step of each inner page's <StepDeck> (passed as its
  // `footer` prop), not a sibling here — a deck page never scrolls its body.
  return <div className="relative z-0">{children}</div>;
};

export default PagesLayout;
