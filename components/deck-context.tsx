"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  PATH_ORDER,
  deckEntryIntent,
  normalizePath,
} from "@/utils/transition-state";
import { useTransitionNavigate } from "./use-transition-navigate";

/** Imperative handle a page's stepped deck exposes to the shared arrows. */
export type DeckApi = {
  /** Step one section. Returns true if handled, false if already at that end. */
  step: (direction: 1 | -1) => boolean;
};

type DeckContextValue = {
  registerDeck: (api: DeckApi | null) => void;
  reportBoundary: (state: { atStart: boolean; atEnd: boolean }) => void;
  goPrev: () => void;
  goNext: () => void;
  atSequenceStart: boolean;
  atSequenceEnd: boolean;
};

const DeckContext = createContext<DeckContextValue | null>(null);

export const DeckProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const navigate = useTransitionNavigate();
  const deckRef = useRef<DeckApi | null>(null);
  const [boundary, setBoundary] = useState({ atStart: true, atEnd: false });

  const registerDeck = useCallback((api: DeckApi | null) => {
    deckRef.current = api;
    if (!api) setBoundary({ atStart: true, atEnd: false });
  }, []);

  const reportBoundary = useCallback(
    (state: { atStart: boolean; atEnd: boolean }) => setBoundary(state),
    [],
  );

  const pageIndex = PATH_ORDER.indexOf(normalizePath(pathname));

  const goNext = useCallback(() => {
    if (deckRef.current?.step(1)) return;
    const next = PATH_ORDER[pageIndex + 1];
    if (!next) return;
    deckEntryIntent.value = "start";
    navigate(next);
  }, [navigate, pageIndex]);

  const goPrev = useCallback(() => {
    if (deckRef.current?.step(-1)) return;
    const prev = PATH_ORDER[pageIndex - 1];
    if (!prev) return;
    deckEntryIntent.value = "end";
    navigate(prev);
  }, [navigate, pageIndex]);

  const value = useMemo<DeckContextValue>(
    () => ({
      registerDeck,
      reportBoundary,
      goPrev,
      goNext,
      atSequenceStart: boundary.atStart && pageIndex <= 0,
      atSequenceEnd: boundary.atEnd && pageIndex === PATH_ORDER.length - 1,
    }),
    [registerDeck, reportBoundary, goPrev, goNext, boundary, pageIndex],
  );

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
};

export const useDeck = () => {
  const ctx = useContext(DeckContext);
  if (!ctx) throw new Error("useDeck must be used within <DeckProvider>");
  return ctx;
};
