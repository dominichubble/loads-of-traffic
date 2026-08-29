"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { useDeck } from "./deck-context";
import { deckEntryIntent } from "@/utils/transition-state";

const STEP_DURATION = 0.9;

export type DeckSection = { id?: string; node: ReactNode };

type StepDeckProps = {
  ariaLabel?: string;
  sections: DeckSection[];
  className?: string;
};

/**
 * Full-viewport stepped sections that advance one at a time on wheel / Arrow /
 * PageUp-Down, matching the homepage hero. A section taller than the viewport
 * scrolls internally (wrap the overflowing content in `.step-scroll`); the deck
 * only steps on once that inner scroll bottoms out. At the first/last section
 * the shared Prev/Next arrows carry on to the adjacent page.
 *
 * Under `prefers-reduced-motion` the sections render as a normal scrolling
 * column and the arrows do plain page-to-page navigation.
 */
const StepDeck = ({ ariaLabel, sections, className }: StepDeckProps) => {
  const count = sections.length;
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tweenRef = useRef<gsap.core.Timeline | null>(null);
  const animatingRef = useRef(false);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  const { registerDeck, reportBoundary, goPrev, goNext } = useDeck();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Open on the first section, or the last one when the visitor arrived by
  // pressing Prev from the following page.
  useEffect(() => {
    const start = deckEntryIntent.value === "end" ? count - 1 : 0;
    deckEntryIntent.value = "start";
    activeRef.current = start;
    setActive(start);
    if (reduced) return;
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        autoAlpha: i === start ? 1 : 0,
        yPercent: 0,
        zIndex: i === start ? 2 : 0,
      });
    });
  }, [count, reduced]);

  const stepTo = useCallback(
    (dir: 1 | -1): boolean => {
      if (reduced) return false;
      if (animatingRef.current) return true;
      const from = activeRef.current;
      const to = from + dir;
      if (to < 0 || to >= count) return false;
      const fromEl = sectionRefs.current[from];
      const toEl = sectionRefs.current[to];
      if (!fromEl || !toEl) return false;

      animatingRef.current = true;
      tweenRef.current?.kill();
      const tl = gsap.timeline({
        defaults: { duration: STEP_DURATION, ease: "power2.inOut" },
        onComplete: () => {
          activeRef.current = to;
          setActive(to);
          animatingRef.current = false;
        },
      });
      tweenRef.current = tl;
      gsap.set(toEl, { autoAlpha: 1, zIndex: 2, yPercent: dir * 100 });
      gsap.set(fromEl, { zIndex: 1 });
      tl.to(fromEl, { yPercent: -dir * 100, autoAlpha: 0 }, 0);
      tl.to(toEl, { yPercent: 0 }, 0);
      tl.set(fromEl, { zIndex: 0 });
      return true;
    },
    [count, reduced],
  );

  useEffect(() => {
    registerDeck({ step: stepTo });
    return () => registerDeck(null);
  }, [registerDeck, stepTo]);

  useEffect(() => {
    reportBoundary({ atStart: active === 0, atEnd: active === count - 1 });
  }, [active, count, reportBoundary]);

  useEffect(() => {
    if (reduced) return;
    let accum = 0;
    let idle = 0;
    const THRESHOLD = 48;

    const nestedScrollHoldsInput = (
      target: EventTarget | null,
      goingUp: boolean,
    ) => {
      const node = target instanceof Element ? target : null;
      const scroller = node?.closest(".step-scroll");
      if (!(scroller instanceof HTMLElement)) return false;
      if (scroller.scrollHeight <= scroller.clientHeight + 1) return false;
      const atTop = scroller.scrollTop <= 0;
      const atBottom =
        scroller.scrollTop + scroller.clientHeight >=
        scroller.scrollHeight - 1;
      return goingUp ? !atTop : !atBottom;
    };

    const drive = (dir: 1 | -1) => {
      if (stepTo(dir)) return;
      if (dir > 0) goNext();
      else goPrev();
    };

    const onWheel = (e: WheelEvent) => {
      if (nestedScrollHoldsInput(e.target, e.deltaY < 0)) return;
      e.preventDefault();
      if (animatingRef.current) {
        accum = 0;
        return;
      }
      window.clearTimeout(idle);
      idle = window.setTimeout(() => (accum = 0), 180);
      accum += e.deltaY;
      if (Math.abs(accum) < THRESHOLD) return;
      const dir: 1 | -1 = accum > 0 ? 1 : -1;
      accum = 0;
      drive(dir);
    };

    const FWD = new Set(["ArrowDown", "PageDown"]);
    const BACK = new Set(["ArrowUp", "PageUp"]);
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      if (!FWD.has(e.key) && !BACK.has(e.key)) return;
      const t = e.target as HTMLElement | null;
      if (
        t?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(t?.tagName ?? "")
      ) {
        return;
      }
      if (nestedScrollHoldsInput(e.target, BACK.has(e.key))) return;
      e.preventDefault();
      drive(FWD.has(e.key) ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(idle);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [reduced, stepTo, goPrev, goNext]);

  useEffect(() => {
    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  if (reduced) {
    return (
      <div className={className} aria-label={ariaLabel} role="region">
        {sections.map((s, i) => (
          <section key={s.id ?? i} id={s.id} className="min-h-[100svh]">
            {s.node}
          </section>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`relative h-[100svh] overflow-hidden ${className ?? ""}`}
      aria-label={ariaLabel}
      role="region"
    >
      <div className="grid h-full">
        {sections.map((s, i) => (
          <div
            key={s.id ?? i}
            id={s.id}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            className="step-scroll [grid-area:1/1] h-full overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ zIndex: i === 0 ? 2 : 0 }}
            aria-hidden={active !== i}
            inert={active !== i ? true : undefined}
          >
            {s.node}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepDeck;
