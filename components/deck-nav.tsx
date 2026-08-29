"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useDeck } from "./deck-context";

/**
 * Persistent Prev / Next arrows, fixed bottom-right on every page. They step
 * the current page's <StepDeck> (or the homepage hero) one section at a time,
 * then carry on to the adjacent page at the deck's first / last section.
 */
const DeckNav = () => {
  const { goPrev, goNext, atSequenceStart, atSequenceEnd } = useDeck();

  const base =
    "inline-flex h-14 w-14 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(0,0,79,0.35)] transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40 md:h-[var(--home-control-h,3.25rem)] md:w-auto md:gap-2.5 md:px-[var(--home-control-px,1.4rem)] md:text-[length:var(--home-control-font,0.8rem)]";

  return (
    <div className="page-fixed-end fixed bottom-5 z-[900] flex items-center gap-3 md:bottom-8">
      <button
        type="button"
        onClick={goPrev}
        disabled={atSequenceStart}
        aria-label="Previous section"
        className={`${base} bg-white text-primary`}
      >
        <ArrowUp className="h-6 w-6 md:h-5 md:w-5" aria-hidden="true" />
        <span className="hidden font-semibold uppercase tracking-[0.1em] md:inline">
          Previous
        </span>
      </button>
      <button
        type="button"
        onClick={goNext}
        disabled={atSequenceEnd}
        aria-label="Next section"
        className={`${base} bg-accent text-white`}
      >
        <span className="hidden font-semibold uppercase tracking-[0.1em] md:inline">
          Next
        </span>
        <ArrowDown className="h-6 w-6 md:h-5 md:w-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default DeckNav;
