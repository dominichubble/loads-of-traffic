"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import {
  HOME_SCROLLABLE_HEIGHT,
  servicesSectionContent,
} from "@/utils/constants";
import { ArrowDown, ArrowRight, Pause, Play } from "lucide-react";
import Header from "./header";
import HomeVideo from "./home-video";
import { cn } from "@/utils";
import TransitionLink from "./transition-link";
import HomeStatic from "./home-static";

gsap.registerPlugin(ScrollTrigger);

function checkDirection({
  oldTimeline,
  lastTime,
  forward,
}: {
  oldTimeline: gsap.core.Timeline;
  lastTime: number;
  forward: boolean;
}): { lastTime: number; forward: boolean } {
  const newTime = oldTimeline.time();

  if (
    (forward && newTime < lastTime && lastTime !== 1.2) ||
    (!forward && newTime > lastTime)
  ) {
    forward = !forward;
  }
  return { lastTime: newTime, forward };
}

const createMobileTimeline = function ({
  secondVideoClass,
  timelineIndex,
  previousTimelineIndex,
  videoZIndex,
  setActiveSection,
}: {
  secondVideoClass: string;
  timelineIndex: number;
  previousTimelineIndex: number;
  videoZIndex: number;
  setActiveSection: (_: number) => void;
}) {
  const mobileTimeline = gsap.timeline({
    defaults: {
      ease: "power1.out",
    },
  });

  let lastTime = 0;
  let forward = true;

  mobileTimeline
    .fromTo(
      ".solid-mobile",
      {
        height: "0",
        zIndex: videoZIndex,
      },
      {
        height: "50vh",
        onStart: function () {
          gsap.to(
            [
              `.service-title-${previousTimelineIndex}`,
              `.service-description-${previousTimelineIndex}`,
              `.read-more-cta-${previousTimelineIndex}`,
            ],
            {
              y: "100%",
              opacity: "0",
              duration: 0.6,
              ease: "power.out",
            },
          );
        },
        onReverseComplete: function () {
          setActiveSection(previousTimelineIndex);
          gsap.to(
            [
              `.service-title-${previousTimelineIndex}`,
              `.service-description-${previousTimelineIndex}`,
              `.read-more-cta-${previousTimelineIndex}`,
            ],
            {
              y: "0%",
              opacity: "1",
              duration: 0.6,
              ease: "power.out",
            },
          );
        },
      },
    )
    .fromTo(
      ".image-mask-0",
      {
        scale: 0,
      },
      {
        scale: 1,
      },
      "<",
    )
    .fromTo(
      `.${secondVideoClass}`,
      {
        transformOrigin: "top",
        height: 0,
        zIndex: videoZIndex,
      },
      {
        height: "50vh",
      },
    )
    // .fromTo(
    //   ".solid-mobile",
    //   {
    //     height: "50vh",
    //     transformOrigin: "top",
    //   },
    //   {
    //     height: "0",
    //   },
    //   "<",
    // )
    .fromTo(
      ".image-mask-0",
      {
        scale: 1,
      },
      {
        scale: 0,
        onUpdate: function () {
          const direction = checkDirection({
            oldTimeline: mobileTimeline,
            forward,
            lastTime,
          });

          if (!direction.forward) {
            gsap.to(
              [
                `.service-title-${timelineIndex}`,
                `.service-description-${timelineIndex}`,
                `.read-more-cta-${timelineIndex}`,
              ],
              {
                y: "100%",
                opacity: "0",
                duration: 0.6,
                ease: "power.out",
              },
            );
          }

          forward = direction.forward;
          lastTime = direction.lastTime;
        },
        onComplete: function () {
          setActiveSection((videoZIndex + 1) % 4);
          gsap.to(
            [
              `.service-title-${timelineIndex}`,
              `.service-description-${timelineIndex}`,
              `.read-more-cta-${timelineIndex}`,
            ],
            {
              y: "0",
              opacity: "1",
              duration: 0.6,
              ease: "power.out",
            },
          );
        },
      },
      "<",
    )
    .fromTo(
      ".pin-element",
      {
        scaleX: "500%",
      },
      {
        scaleX: "0%",
        duration: 0.2,
      },
    );

  return mobileTimeline;
};

const createDesktopTimeline = function ({
  firstVideoClass,
  secondVideoClass,
  previousTimelineIndex,
  timelineIndex,
  videoZIndex,
  setActiveSection,
}: {
  firstVideoClass: string;
  secondVideoClass: string;
  previousTimelineIndex: number;
  timelineIndex: number;
  videoZIndex: number;
  setActiveSection: (_: number) => void;
}) {
  const desktopTimeline = gsap.timeline({
    defaults: {
      ease: "power1.in",
    },
  });
  let lastTime = 0;
  let forward = true;
  let solidAccentBackground;

  if (
    firstVideoClass === "first-video-mask" ||
    firstVideoClass === "third-video-mask"
  ) {
    solidAccentBackground =
      "radial-gradient(circle at center,#ED1464 0%, #730237 110%)";
  } else if (
    firstVideoClass === "fourth-video-mask" ||
    firstVideoClass === "second-video-mask"
  ) {
    solidAccentBackground =
      "radial-gradient(circle at center, #FFFFFF 0%, #BCBEC0 110%)";
  }

  desktopTimeline
    .set(".solid-accent", {
      background: solidAccentBackground,
    })
    .set(`.${firstVideoClass}`, {
      zIndex: videoZIndex - 1,
    })
    .set(`.image-mask-${previousTimelineIndex % 2}`, {
      zIndex: videoZIndex,
    })
    .set(`.${secondVideoClass}`, {
      zIndex: videoZIndex + 1,
    })
    .set(`.service-right-${timelineIndex}`, {
      zIndex: videoZIndex,
    })
    .fromTo(
      `.${firstVideoClass}`,
      {
        scale: 1,
        borderRadius: 0,
      },
      {
        scale: 0,
        borderRadius: "4rem",
      },
    )
    .fromTo(
      `.${firstVideoClass} div`,
      {
        scale: 1,
      },
      {
        scale: 3,
        onStart: function () {
          gsap.to(
            [
              `.service-title-${previousTimelineIndex}`,
              `.service-description-${previousTimelineIndex}`,
              `.read-more-cta-${previousTimelineIndex}`,
            ],
            {
              y: "100%",
              opacity: "0",
              duration: 0.6,
              ease: "power1.out",
            },
          );
        },
        onReverseComplete: function () {
          setActiveSection(previousTimelineIndex);
          gsap.to(
            [
              `.service-title-${previousTimelineIndex}`,
              `.service-description-${previousTimelineIndex}`,
              `.read-more-cta-${previousTimelineIndex}`,
            ],
            {
              y: "0%",
              opacity: "1",
              duration: 0.6,
              ease: "power1.out",
            },
          );
        },
      },
      "<",
    )
    .fromTo(
      `.image-mask-${previousTimelineIndex}`,
      {
        scale: 0,
      },
      {
        scale: 1,
      },
      "<",
    )
    .fromTo(
      ".solid-accent",
      {
        scaleY: 1,
        scaleX: 0,
      },
      {
        scaleX: 1,
        scaleY: 1,
      },
      "<",
    )

    .fromTo(
      `.image-mask-${previousTimelineIndex}`,
      {
        scale: 1,
      },
      {
        scale: 0,
        duration: 0.1,
      },
    )
    .fromTo(
      ".solid-accent",
      {
        scaleY: 1,
        scaleX: 1,
      },
      {
        scaleY: 0,
        scaleX: 1,
        ease: "power1.out",
      },
      "<",
    )
    .fromTo(
      `.${secondVideoClass}`,
      {
        scale: 0,
        borderRadius: "4rem",
      },
      {
        scale: 1,
        borderRadius: "0rem",
        ease: "power1.out",
      },
      "<",
    )

    .fromTo(
      `.${secondVideoClass} div`,
      {
        scale: 3,
      },
      {
        scale: 1,
        ease: "power1.out",
        onUpdate: function () {
          const direction = checkDirection({
            oldTimeline: desktopTimeline,
            lastTime,
            forward,
          });
          if (!direction.forward) {
            gsap.to(
              [
                `.service-title-${timelineIndex}`,
                `.service-description-${timelineIndex}`,
                `.read-more-cta-${timelineIndex}`,
              ],
              {
                y: "100%",
                opacity: "0",
                duration: 0.6,
                ease: "power.out",
              },
            );
          }

          lastTime = direction.lastTime;
          forward = direction.forward;
        },
        onComplete: function () {
          if (videoZIndex === 0) {
            gsap.set(".service-right-1", {
              zIndex: 1,
            });
          }
          setActiveSection((videoZIndex + 1) % 4);
          gsap.to(
            [
              `.service-title-${timelineIndex}`,
              `.service-description-${timelineIndex}`,
              `.read-more-cta-${timelineIndex}`,
            ],
            {
              y: "0",
              opacity: "1",
              duration: 0.6,
              ease: "power.out",
            },
          );
        },
      },
      "<",
    )
    .fromTo(
      ".pin-element",
      {
        scaleX: "500%",
      },
      {
        scaleX: "0%",
        duration: 0.2,
      },
    );

  return desktopTimeline;
};
const createServiceTimeline = ({
  firstVideoClass,
  secondVideoClass,
  timelineIndex,
  previousTimelineIndex,
  videoZIndex,
  setActiveSection,
}: {
  firstVideoClass: string;
  secondVideoClass: string;
  timelineIndex: number;
  previousTimelineIndex: number;
  videoZIndex: number;
  setActiveSection: (_: number) => void;
}) => {
  let desktopTimeline = gsap.timeline();
  let isDesktop = false;
  const mm = gsap.matchMedia();

  mm.add("(min-width: 640px)", () => {
    isDesktop = true;
    desktopTimeline = createDesktopTimeline({
      firstVideoClass,
      secondVideoClass,
      timelineIndex,
      previousTimelineIndex,
      videoZIndex,
      setActiveSection,
    });
  });

  if (isDesktop) {
    return desktopTimeline;
  }

  const mobileTimeline = createMobileTimeline({
    secondVideoClass,
    timelineIndex,
    previousTimelineIndex,
    videoZIndex,
    setActiveSection,
  });

  return mobileTimeline;
};

const Home = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMotionPaused, setIsMotionPaused] = useState(false);
  const updateActiveSection = function (newActiveSection: number) {
    setActiveSection(newActiveSection);
  };

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

  useGSAP(
    function () {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const scrollLength = 3;
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top+=1 top",
          end: `+=${HOME_SCROLLABLE_HEIGHT}`,
          pin: true,
          scrub: true,
        },
      });

      const masks = [
        ["first-video-mask", "second-video-mask"],
        ["second-video-mask", "third-video-mask"],
        ["third-video-mask", "fourth-video-mask"],
        ["fourth-video-mask", "first-video-mask"],
      ];

      let previousTimelineIndex = 0;
      for (let i = 0; i < scrollLength; i++) {
        const [mask1, mask2] = masks[i % 4];
        masterTimeline.add(
          createServiceTimeline({
            firstVideoClass: mask1,
            secondVideoClass: mask2,
            timelineIndex: (i + 1) % 4,
            previousTimelineIndex,
            videoZIndex: i,
            setActiveSection: updateActiveSection,
          }),
        );
        previousTimelineIndex = (i + 1) % 4;
      }
    },
    { scope: containerRef },
  );

  if (prefersReducedMotion) {
    return <HomeStatic />;
  }

  return (
    <section
      ref={containerRef}
      className="home inset-0 grid h-[100svh] max-h-[100svh] grid-cols-1 grid-rows-2 overflow-hidden bg-primary md:grid-cols-[55%_1fr] md:grid-rows-1"
      aria-label="Our services"
    >
      <h1 className="sr-only">
        Loads of Traffic digital marketing and growth services
      </h1>
      <div className="fixed bottom-5 right-5 z-[900] flex items-center gap-2 md:bottom-8 md:right-8">
        <button
          type="button"
          className="bg-primary/80 inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-white/20 px-3 text-white shadow-lg backdrop-blur-xl transition-colors hover:bg-primary"
          onClick={() => setIsMotionPaused((current) => !current)}
          aria-label={
            isMotionPaused
              ? "Play background videos"
              : "Pause background videos"
          }
          aria-pressed={isMotionPaused}
        >
          {isMotionPaused ? (
            <Play className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Pause className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="hidden text-xs font-semibold uppercase tracking-[0.12em] lg:inline">
            {isMotionPaused ? "Play video" : "Pause video"}
          </span>
        </button>
        <div className="scroll-reminder bg-primary/80 flex min-h-11 items-center gap-3 rounded-full border border-white/20 px-4 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur-xl">
          <span>Scroll to explore</span>
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
      {/*Left*/}
      <div className="pointer-events-none relative h-[50svh] overflow-hidden md:h-[100svh]">
        <div className="solid-mobile pointer-events-none absolute left-0 top-0 z-0 h-0 w-full bg-primary md:hidden"></div>
        <div className="image-mask-0 absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 scale-0 overflow-hidden">
          <div className="relative mx-auto aspect-[0.64] w-[36%] scale-100 overflow-hidden rounded-[clamp(8px,1.5rem,24px)]">
            <Image
              className="h-full w-full object-cover"
              src="/in-between-2.svg"
              alt=""
              fill
              sizes="(min-width: 768px) 20vw, 36vw"
            />
          </div>
        </div>
        <div className="image-mask-1 absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 scale-0 overflow-hidden">
          <div className="relative mx-auto aspect-[0.64] w-[36%] scale-100 overflow-hidden rounded-[clamp(8px,1.5rem,24px)]">
            <Image
              className="h-full w-full object-cover"
              src="/in-between-1.svg"
              alt=""
              fill
              sizes="(min-width: 768px) 20vw, 36vw"
            />
          </div>
        </div>
        <div className="image-mask-2 absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 scale-0 overflow-hidden">
          <div className="relative mx-auto aspect-[0.64] w-[36%] scale-100 overflow-hidden rounded-[clamp(8px,1.5rem,24px)]">
            <Image
              className="h-full w-full object-cover"
              src="/in-between-3.svg"
              alt=""
              fill
              sizes="(min-width: 768px) 20vw, 36vw"
            />
          </div>
        </div>
        <div className="image-mask-3 absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 scale-0 overflow-hidden">
          <div className="relative mx-auto aspect-[0.64] w-[36%] scale-100 overflow-hidden rounded-[clamp(8px,1.5rem,24px)]">
            <Image
              className="h-full w-full object-cover"
              src="/in-between-0.svg"
              alt=""
              fill
              sizes="(min-width: 768px) 20vw, 36vw"
            />
          </div>
        </div>
        <div className="first-video-mask-hidden absolute inset-0 z-[-10] block h-[50vh] overflow-hidden md:hidden md:h-auto md:scale-100">
          <HomeVideo
            videoSrc="/0"
            posterSrc="/lottie-thumbnail-1.png"
            isPaused={isMotionPaused}
          />
        </div>
        <div className="first-video-mask absolute inset-0 h-[50vh] overflow-hidden md:h-auto md:scale-100">
          <HomeVideo
            videoSrc="/0"
            posterSrc="/lottie-thumbnail-1.png"
            isPaused={isMotionPaused}
          />
        </div>
        <div className="second-video-mask absolute inset-0 h-0 overflow-hidden md:h-auto md:scale-0">
          <HomeVideo
            videoSrc="/1"
            posterSrc="/lottie-thumbnail-2.png"
            isPaused={isMotionPaused}
          />
        </div>
        <div className="third-video-mask absolute inset-0 h-0 overflow-hidden md:h-auto md:scale-0">
          <HomeVideo
            videoSrc="/2"
            posterSrc="/lottie-thumbnail-3.png"
            isPaused={isMotionPaused}
          />
        </div>
        <div className="fourth-video-mask absolute inset-0 overflow-hidden md:h-auto md:scale-0">
          <HomeVideo
            videoSrc="/3"
            posterSrc="/lottie-thumbnail-4.png"
            isPaused={isMotionPaused}
          />
        </div>
      </div>
      {/*Right*/}
      <div className="relative min-h-[50svh] border-t border-white/10 bg-primary md:min-h-[100svh] md:border-l md:border-t-0">
        <div className="solid-accent pointer-events-none absolute inset-0 z-10 hidden h-screen scale-x-0 bg-accent md:block"></div>
        <div className="absolute inset-x-5 top-6 z-50 flex flex-col items-start md:left-1/2 md:right-auto md:top-[clamp(2rem,6vh,4rem)] md:w-[80%] md:-translate-x-1/2">
          <Header />
          <div className="relative mt-1 min-h-[18rem] w-full md:mt-12 xl:min-h-[22rem]">
            {servicesSectionContent.map((section, i) => (
              <article
                key={section.title}
                className={cn(
                  `service-right-${i} absolute inset-0 z-[1] flex flex-col items-start`,
                  i !== 0 && "z-0",
                )}
                aria-hidden={activeSection !== i}
              >
                <div
                  className={cn(
                    `service-title-${i} w-full`,
                    i !== 0 && "translate-y-full opacity-0",
                  )}
                >
                  <div className="flex items-center justify-between border-b border-white/20 pb-3">
                    <span className="page-kicker text-white/70">
                      Our expertise
                    </span>
                    <span className="text-xs font-semibold tabular-nums text-white/60">
                      0{i + 1} / 04
                    </span>
                  </div>
                  <div className="mt-5 overflow-hidden">
                    <h2 className="text-[clamp(1.65rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                      {section.title}
                    </h2>
                  </div>
                </div>
                <div className="mt-4 w-full overflow-hidden">
                  <ul
                    className={cn(
                      `service-description-${i} space-y-2 text-sm leading-relaxed text-white xl:text-base`,
                      i !== 0 && "translate-y-full opacity-0",
                    )}
                  >
                    {section.description.map((line) => (
                      <li key={line} className="flex max-w-[34rem] gap-3">
                        <span
                          className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative mt-5">
                  <TransitionLink
                    href={section.readMoreLink}
                    tabIndex={activeSection === i ? 0 : -1}
                    className={cn(
                      `read-more-cta-${i} inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-primary shadow-lg transition-transform hover:-translate-y-0.5`,
                      i !== 0 &&
                        "-translate-y-full opacity-0 md:translate-y-full",
                    )}
                  >
                    <span>Explore service</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </TransitionLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="pin-element fixed -top-full z-30 w-full scale-x-[500%] bg-accent"></div>
    </section>
  );
};

export default Home;
