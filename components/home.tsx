"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { servicesSectionContent } from "@/utils/constants";
import { ArrowDown, ArrowRight, ArrowUp, Pause, Play } from "lucide-react";
import HomeVideo from "./home-video";
import HomeProgressBar from "./home-progress-bar";
import TransitionLink from "./transition-link";
import HomeStatic from "./home-static";

const HERO_SLIDE_COUNT = servicesSectionContent.length;
const HERO_SLIDE_DURATION = 1.35;

const VIDEO_SOURCES = [
  { src: "/0", poster: "/lottie-thumbnail-1.png" },
  { src: "/1", poster: "/lottie-thumbnail-2.png" },
  { src: "/2", poster: "/lottie-thumbnail-3.png" },
  { src: "/3", poster: "/lottie-thumbnail-4.png" },
] as const;

// Alternating text-panel backgrounds (blue / pink).
const PANEL_BACKGROUNDS = ["#00007A", "#ED1464", "#00007A", "#ED1464"] as const;

const Home = () => {
  const containerRef = useRef<HTMLElement>(null);
  const videoPanelRef = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const transitionTweenRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimatingRef = useRef(false);
  const activeSectionRef = useRef(0);

  const [activeSection, setActiveSection] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMotionPaused, setIsMotionPaused] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const updateMotionPreference = () => {
      setPrefersReducedMotion(motionPreference.matches);
      if (motionPreference.matches) setIsMotionPaused(true);
    };

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);
    return () =>
      motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  // Initial stacking: slide 0 visible, others parked off-panel / faded out.
  useEffect(() => {
    if (prefersReducedMotion) return;

    videoRefs.current.forEach((el, index) => {
      if (!el) return;
      gsap.set(el, {
        yPercent: 0,
        autoAlpha: index === 0 ? 1 : 0,
        zIndex: index === 0 ? 2 : 0,
      });
    });

    panelRefs.current.forEach((el, index) => {
      if (!el) return;
      gsap.set(el, {
        yPercent: 0,
        autoAlpha: index === 0 ? 1 : 0,
        zIndex: index === 0 ? 2 : 0,
      });
    });

    textRefs.current.forEach((el, index) => {
      if (!el) return;
      gsap.set(el, {
        autoAlpha: index === 0 ? 1 : 0,
        zIndex: index === 0 ? 2 : 0,
      });
    });

    if (progressBarRef.current) {
      gsap.set(progressBarRef.current, { scaleY: 0 });
    }

    if (textPanelRef.current) {
      textPanelRef.current.style.setProperty(
        "--hero-nav-ink",
        PANEL_BACKGROUNDS[0],
      );
    }
  }, [prefersReducedMotion]);

  const stepToSlide = useCallback((direction: 1 | -1) => {
    if (isAnimatingRef.current) return;

    const from = activeSectionRef.current;
    const to =
      direction > 0
        ? (from + 1) % HERO_SLIDE_COUNT
        : (from - 1 + HERO_SLIDE_COUNT) % HERO_SLIDE_COUNT;

    const fromVideo = videoRefs.current[from];
    const toVideo = videoRefs.current[to];
    const fromPanel = panelRefs.current[from];
    const toPanel = panelRefs.current[to];
    const fromText = textRefs.current[from];
    const toText = textRefs.current[to];
    if (
      !fromVideo ||
      !toVideo ||
      !fromPanel ||
      !toPanel ||
      !fromText ||
      !toText
    ) {
      return;
    }

    isAnimatingRef.current = true;
    transitionTweenRef.current?.kill();

    // Video and colour panels roll as a conveyor (opposite directions).
    // Copy stays put and crossfades.
    const progress = HERO_SLIDE_COUNT <= 1 ? 0 : to / (HERO_SLIDE_COUNT - 1);

    const colorFrom = PANEL_BACKGROUNDS[from];
    const colorTo = PANEL_BACKGROUNDS[to];

    const syncNavInkToWipe = () => {
      const panel = textPanelRef.current;
      const label = document.getElementById("hero-nav-home-label");
      if (!panel || !label) return;

      const panelRect = panel.getBoundingClientRect();
      const labelRect = label.getBoundingClientRect();
      const labelY = labelRect.top + labelRect.height / 2 - panelRect.top;
      const yPercent = Number(gsap.getProperty(toPanel, "yPercent"));

      // Incoming panel edge that sweeps across the Home label.
      let coveredByIncoming = false;
      if (direction > 0) {
        // Panel enters from above; its bottom edge moves top → bottom.
        const wipeY = (1 + yPercent / 100) * panelRect.height;
        coveredByIncoming = wipeY >= labelY;
      } else {
        // Panel enters from below; its top edge moves bottom → top.
        const wipeY = (yPercent / 100) * panelRect.height;
        coveredByIncoming = labelY >= wipeY;
      }

      panel.style.setProperty(
        "--hero-nav-ink",
        coveredByIncoming ? colorTo : colorFrom,
      );
    };

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: HERO_SLIDE_DURATION },
      onUpdate: syncNavInkToWipe,
      onComplete: () => {
        textPanelRef.current?.style.setProperty("--hero-nav-ink", colorTo);
        activeSectionRef.current = to;
        setActiveSection(to);
        isAnimatingRef.current = false;
      },
      onInterrupt: () => {
        isAnimatingRef.current = false;
      },
    });

    transitionTweenRef.current = tl;
    textPanelRef.current?.style.setProperty("--hero-nav-ink", colorFrom);

    if (progressBarRef.current) {
      tl.to(progressBarRef.current, { scaleY: progress }, 0);
    }

    // Text fade: out quickly, in slightly delayed so it lands on the new colour.
    tl.to(fromText, { autoAlpha: 0, duration: HERO_SLIDE_DURATION * 0.35 }, 0);
    tl.set(toText, { zIndex: 2 }, 0);
    tl.set(fromText, { zIndex: 0 }, 0);
    tl.fromTo(
      toText,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: HERO_SLIDE_DURATION * 0.45 },
      HERO_SLIDE_DURATION * 0.4,
    );

    if (direction > 0) {
      // Video rolls up; colour panel rolls down.
      tl.set(toVideo, { yPercent: 100, autoAlpha: 1, zIndex: 1 }, 0);
      tl.set(fromVideo, { zIndex: 2 }, 0);
      tl.set(toPanel, { yPercent: -100, autoAlpha: 1, zIndex: 1 }, 0);
      tl.set(fromPanel, { zIndex: 2 }, 0);

      tl.to(fromVideo, { yPercent: -100 }, 0);
      tl.to(toVideo, { yPercent: 0 }, 0);
      tl.to(fromPanel, { yPercent: 100 }, 0);
      tl.to(toPanel, { yPercent: 0 }, 0);

      tl.set(fromVideo, { autoAlpha: 0, yPercent: 0, zIndex: 0 });
      tl.set(toVideo, { zIndex: 2 });
      tl.set(fromPanel, { autoAlpha: 0, yPercent: 0, zIndex: 0 });
      tl.set(toPanel, { zIndex: 2 });
    } else {
      // Video rolls down; colour panel rolls up.
      tl.set(toVideo, { yPercent: -100, autoAlpha: 1, zIndex: 1 }, 0);
      tl.set(fromVideo, { zIndex: 2 }, 0);
      tl.set(toPanel, { yPercent: 100, autoAlpha: 1, zIndex: 1 }, 0);
      tl.set(fromPanel, { zIndex: 2 }, 0);

      tl.to(fromVideo, { yPercent: 100 }, 0);
      tl.to(toVideo, { yPercent: 0 }, 0);
      tl.to(fromPanel, { yPercent: -100 }, 0);
      tl.to(toPanel, { yPercent: 0 }, 0);

      tl.set(fromVideo, { autoAlpha: 0, yPercent: 0, zIndex: 0 });
      tl.set(toVideo, { zIndex: 2 });
      tl.set(fromPanel, { autoAlpha: 0, yPercent: 0, zIndex: 0 });
      tl.set(toPanel, { zIndex: 2 });
    }
  }, []);

  useEffect(() => {
    return () => {
      transitionTweenRef.current?.kill();
    };
  }, []);

  // Discrete wheel / trackpad steps — same conveyor as Previous / Next.
  useEffect(() => {
    if (prefersReducedMotion) return;

    let accumulated = 0;
    let idleResetTimer = 0;
    const THRESHOLD = 48;

    const onWheel = (event: WheelEvent) => {
      const eventTarget = event.target;
      const fromEl =
        eventTarget instanceof Element
          ? eventTarget
          : eventTarget instanceof Node
            ? eventTarget.parentElement
            : null;
      const scroller = fromEl?.closest(".home-copy-scroll");

      if (scroller instanceof HTMLElement) {
        const canScroll = scroller.scrollHeight > scroller.clientHeight + 1;
        if (canScroll) {
          const atTop = scroller.scrollTop <= 0;
          const atBottom =
            scroller.scrollTop + scroller.clientHeight >=
            scroller.scrollHeight - 1;
          const scrollingUp = event.deltaY < 0;
          if ((scrollingUp && !atTop) || (!scrollingUp && !atBottom)) {
            return;
          }
        }
      }

      event.preventDefault();
      if (isAnimatingRef.current) {
        accumulated = 0;
        return;
      }

      window.clearTimeout(idleResetTimer);
      idleResetTimer = window.setTimeout(() => {
        accumulated = 0;
      }, 180);

      accumulated += event.deltaY;
      if (Math.abs(accumulated) < THRESHOLD) return;

      const direction: 1 | -1 = accumulated > 0 ? 1 : -1;
      accumulated = 0;
      stepToSlide(direction);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.clearTimeout(idleResetTimer);
      window.removeEventListener("wheel", onWheel);
    };
  }, [prefersReducedMotion, stepToSlide]);

  if (prefersReducedMotion) {
    return <HomeStatic />;
  }

  return (
    <section
      ref={containerRef}
      className="home relative h-[100svh] max-h-[100svh] overflow-hidden bg-primary md:grid md:grid-cols-[1fr_55%] md:grid-rows-1"
      aria-label="Our services"
    >
      <HomeProgressBar ref={progressBarRef} />
      <h1 className="sr-only">
        Loads of Traffic digital marketing and growth services
      </h1>

      <div className="fixed bottom-5 right-5 z-[900] flex items-center gap-3 md:bottom-8 md:right-8">
        <button
          type="button"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_30px_rgba(0,0,79,0.45)] ring-2 ring-white/90 transition-transform hover:-translate-y-0.5 md:h-[var(--home-control-h)] md:min-h-[var(--home-control-h)] md:w-auto md:min-w-[var(--home-control-h)] md:gap-2 md:px-[var(--home-control-px)] md:text-[length:var(--home-control-font)]"
          onClick={() => setIsMotionPaused((current) => !current)}
          aria-label={
            isMotionPaused
              ? "Play background videos"
              : "Pause background videos"
          }
          aria-pressed={isMotionPaused}
        >
          {isMotionPaused ? (
            <Play
              className="h-5 w-5 md:h-[var(--home-control-icon)] md:w-[var(--home-control-icon)]"
              aria-hidden="true"
            />
          ) : (
            <Pause
              className="h-5 w-5 md:h-[var(--home-control-icon)] md:w-[var(--home-control-icon)]"
              aria-hidden="true"
            />
          )}
          <span className="hidden font-semibold uppercase tracking-[0.1em] lg:inline">
            {isMotionPaused ? "Play video" : "Pause video"}
          </span>
        </button>
        <button
          type="button"
          onClick={() => stepToSlide(-1)}
          aria-label="Previous expertise"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-[0_10px_30px_rgba(0,0,79,0.35)] transition-transform hover:-translate-y-0.5 md:h-[var(--home-control-h)] md:min-h-[var(--home-control-h)] md:w-auto md:gap-2.5 md:px-[var(--home-control-px)] md:text-[length:var(--home-control-font)]"
        >
          <ArrowUp
            className="h-6 w-6 md:h-[var(--home-control-icon)] md:w-[var(--home-control-icon)]"
            aria-hidden="true"
          />
          <span className="hidden font-semibold uppercase tracking-[0.1em] md:inline">
            Previous
          </span>
        </button>
        <button
          type="button"
          onClick={() => stepToSlide(1)}
          aria-label="Next expertise"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_10px_30px_rgba(237,20,100,0.45)] transition-transform hover:-translate-y-0.5 md:h-[var(--home-control-h)] md:min-h-[var(--home-control-h)] md:w-auto md:gap-2.5 md:px-[var(--home-control-px)] md:text-[length:var(--home-control-font)]"
        >
          <span className="hidden font-semibold uppercase tracking-[0.1em] md:inline">
            Next
          </span>
          <ArrowDown
            className="h-6 w-6 md:h-[var(--home-control-icon)] md:w-[var(--home-control-icon)]"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Copy — transparent overlay on mobile, solid left column on desktop */}
      <div
        ref={textPanelRef}
        className="absolute inset-0 z-20 flex min-h-0 flex-col overflow-hidden md:relative md:inset-auto md:z-auto md:h-[100svh] md:min-h-[100svh] md:border-r"
        style={
          {
            "--hero-nav-ink": PANEL_BACKGROUNDS[0],
          } as React.CSSProperties
        }
      >
        {PANEL_BACKGROUNDS.map((color, i) => (
          <div
            key={`panel-${color}-${i}`}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className="absolute inset-0 hidden will-change-transform md:block"
            style={{
              zIndex: i === 0 ? 2 : 0,
              backgroundColor: color,
            }}
            aria-hidden="true"
          />
        ))}

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/80 md:hidden"
          aria-hidden="true"
        />

        <div className="home-copy-frame page-inline-start pointer-events-none relative z-40 flex h-full min-h-0 flex-col pr-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[var(--mobile-header-offset,calc(var(--pages-header-height)+0.85rem))] md:pr-[clamp(1.5rem,3.5vw,3.25rem)] md:pb-5 md:pt-[calc(var(--pages-header-height)+1.25rem)]">
          <div className="relative mx-auto min-h-0 w-full min-w-0 max-w-[min(52rem,100%)] flex-1">
            {servicesSectionContent.map((section, i) => {
              const isPink = i % 2 === 1;
              return (
                <article
                  key={section.title}
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                  className="home-copy-slide pointer-events-auto absolute inset-0 z-[1] flex min-h-0 min-w-0 flex-col"
                  style={{ zIndex: i === 0 ? 2 : 0 }}
                  aria-hidden={activeSection !== i}
                >
                  {/* mt-auto / my-auto pin or center when there is room;
                      the scroller is the parent so zoomed-in copy is not clipped. */}
                  <div className="home-copy-scroll flex min-h-0 min-w-0 flex-1 flex-col justify-[safe_end] overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] md:justify-[safe_center] [&::-webkit-scrollbar]:hidden">
                    <div className="w-full min-w-0 shrink-0">
                      <div className="w-full min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <span className="page-kicker text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.75)] md:[text-shadow:none]">
                            Our expertise
                          </span>
                          <span className="shrink-0 text-[length:var(--home-copy-size)] font-semibold tabular-nums text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.75)] md:[text-shadow:none]">
                            0{i + 1} / 04
                          </span>
                        </div>
                        <h2
                          className="mt-[var(--home-stack-gap)] max-w-[14ch] break-words font-semibold leading-[1.08] tracking-[-0.03em] text-balance text-white [text-shadow:0_3px_28px_rgba(0,0,0,0.85)] md:max-w-none md:tracking-[-0.02em] md:[text-shadow:none]"
                          style={{ fontSize: "var(--home-title-size)" }}
                        >
                          {section.title}
                        </h2>
                      </div>

                      <ul
                        className="home-bullet-list mt-[var(--home-stack-gap)] flex w-full min-w-0 flex-col leading-relaxed text-white"
                        style={{
                          fontSize: "var(--home-copy-size)",
                          gap: "var(--home-stack-gap)",
                        }}
                      >
                        {section.description.map((line) => (
                          <li key={line} className="flex min-w-0 gap-3.5">
                            <span
                              className="mt-[0.7em] h-2 w-2 shrink-0 rounded-full bg-white"
                              aria-hidden="true"
                            />
                            <span className="min-w-0 break-words font-medium [text-shadow:0_2px_18px_rgba(0,0,0,0.85)] md:font-normal md:[text-shadow:none]">
                              {line}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div
                        className="flex shrink-0 items-center gap-3 pt-[var(--home-stack-gap)] md:pt-[calc(var(--home-stack-gap)*1.6)]"
                        style={{
                          paddingBottom: "var(--home-bottom-clearance)",
                        }}
                      >
                        <TransitionLink
                          href={section.readMoreLink}
                          tabIndex={activeSection === i ? 0 : -1}
                          className={`group inline-flex items-center rounded-full bg-white font-semibold shadow-lg ${isPink ? "text-accent" : "text-primary"}`}
                          style={{
                            minHeight: "var(--home-cta-height)",
                            paddingInline: "var(--home-cta-pad-x)",
                            fontSize: "var(--home-cta-font)",
                          }}
                        >
                          <span className="inline-flex items-center gap-2.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 md:gap-3">
                            <span>Explore service</span>
                            <ArrowRight
                              className="h-[1em] w-[1em]"
                              aria-hidden="true"
                            />
                          </span>
                        </TransitionLink>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video — full-bleed on mobile, right column on desktop */}
      <div
        ref={videoPanelRef}
        className="absolute inset-0 min-h-0 md:relative md:h-[100svh]"
      >
        {VIDEO_SOURCES.map((video, index) => (
          <div
            key={video.src}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
            style={{ zIndex: index === 0 ? 2 : 0 }}
          >
            <HomeVideo
              videoSrc={video.src}
              posterSrc={video.poster}
              isPaused={isMotionPaused}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
