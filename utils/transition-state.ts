import { NAV_ITEMS } from "@/utils/constants";

type TransitionAxis = "x" | "y";

/** Solid navbar bar colour; null = transparent (home). */
export type NavBgTone = "primary" | "accent" | null;

type TransitionState = {
  isCoverActive: boolean;
  outgoingLayer: HTMLElement | null;
  /** 1 = forward (from-right); -1 = reverse (from-left). */
  direction: 1 | -1;
  axis: TransitionAxis;
  fromNavBg: NavBgTone;
  toNavBg: NavBgTone;
};

export const transitionState: TransitionState = {
  isCoverActive: false,
  outgoingLayer: null,
  direction: 1,
  axis: "x",
  fromNavBg: null,
  toNavBg: null,
};

export const PAGE_SHELL = "#main-content";
export const PAGES_HEADER_BG = "#pages-header-bg";
export const SLIDE_DURATION = 0.85;
export const OUTGOING_LAYER_ID = "page-transition-outgoing";
export const NAV_BG_STRIP_ATTR = "data-page-transition-nav-bg";

/** Page order for the site-wide stepped deck / Prev-Next arrows. */
export const PATH_ORDER = NAV_ITEMS.map((item) => item.link.split("#")[0]);

/**
 * When the Prev/Next arrows cross a page boundary, the incoming page's deck
 * reads this to decide which section to open on: "end" = last section
 * (arrived by pressing Prev), "start" = first (the default).
 */
export const deckEntryIntent: { value: "start" | "end" } = { value: "start" };

const NAV_BG_BY_PATH: Record<string, Exclude<NavBgTone, null>> = {
  "/services": "accent",
  "/about": "primary",
  "/contact": "primary",
};

export function normalizePath(path: string) {
  return path.split("#")[0] || "/";
}

/** Matches each page's main background; home stays transparent over the hero. */
export function navBgForPath(path: string): NavBgTone {
  return NAV_BG_BY_PATH[normalizePath(path)] ?? null;
}

export function resolveTransition(
  fromPath: string,
  toPath: string,
): { axis: TransitionAxis; direction: 1 | -1 } {
  const from = normalizePath(fromPath);
  const to = normalizePath(toPath);
  const fromIndex = PATH_ORDER.indexOf(from);
  const toIndex = PATH_ORDER.indexOf(to);

  return {
    axis: "x",
    direction: toIndex >= fromIndex ? 1 : -1,
  };
}
