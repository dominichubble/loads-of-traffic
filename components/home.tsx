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
import { ArrowDown, ArrowRight } from "lucide-react";
import Header from "./header";
import HomeVideo from "./home-video";
import { cn } from "@/utils";
import EmblaCarousel from "./embla-carousel";
import TransitionLink from "./transition-link";

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

const createMobileTimeline = function({
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
        onStart: function() {
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
        onReverseComplete: function() {
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
        onUpdate: function() {
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
        onComplete: function() {
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

const createDesktopTimeline = function({
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
        onStart: function() {
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
        onReverseComplete: function() {
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
        onUpdate: function() {
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
        onComplete: function() {
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
  const updateActiveSection = function(newActiveSection: number) {
    setActiveSection(newActiveSection);
  };

  useEffect(() => {
    document.body.classList.add("no-scrollbar");
    if (document.readyState !== "loading") {
      document.querySelectorAll("video").forEach((video) => video.play());
    } else {
      document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll("video").forEach((video) => video.play());
      });
    }

    return function() {
      document.body.classList.remove("no-scrollbar");
    };
  }, []);

  useGSAP(
    function() {
      const scrollLength = 100;
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

  return (
    <section
      ref={containerRef}
      className="home inset-0 grid h-screen max-h-screen grid-cols-1 grid-rows-2 bg-primary md:grid-cols-[55%_1fr]"
    >
      <div className="scroll-reminder fixed bottom-8 right-8 z-[999999] grid aspect-square w-[5rem] animate-bounce place-content-center justify-items-center gap-y-0 rounded-full border-[1px] border-white/80 p-4 text-center text-[8px] font-bold text-white/80 sm:w-[6rem] sm:gap-y-2 sm:text-[10px] md:w-[7rem]">
        <ArrowDown className="w-4 sm:w-auto" />
        <span>
          Scroll
          <br />
          Down
        </span>
      </div>
      {/*Left*/}
      <div className="pointer-events-none relative h-screen">
        <div className="solid-mobile pointer-events-none absolute left-0 top-0 z-0 h-0 w-full bg-primary md:hidden"></div>
        <div className="image-mask-0 absolute left-1/2 top-[75vh] z-10 w-full -translate-x-1/2 -translate-y-1/2 scale-0 overflow-hidden md:top-1/2">
          <div className="relative mx-auto aspect-[0.64] w-[36%] scale-100 overflow-hidden rounded-[clamp(8px,1.5rem,24px)]">
            <Image
              className="h-full w-full object-cover"
              src="/in-between-2.svg"
              alt="Placeholder"
              fill
              sizes="100%"
            />
          </div>
        </div>
        <div className="image-mask-1 absolute left-1/2 top-[75vh] z-10 w-full -translate-x-1/2 -translate-y-1/2 scale-0 overflow-hidden md:top-1/2">
          <div className="relative mx-auto aspect-[0.64] w-[36%] scale-100 overflow-hidden rounded-[clamp(8px,1.5rem,24px)]">
            <Image
              className="h-full w-full object-cover"
              src="/in-between-1.svg"
              alt="Placeholder"
              fill
              sizes="100%"
            />
          </div>
        </div>{" "}
        <div className="image-mask-2 absolute left-1/2 top-[75vh] z-10 w-full -translate-x-1/2 -translate-y-1/2 scale-0 overflow-hidden md:top-1/2">
          <div className="relative mx-auto aspect-[0.64] w-[36%] scale-100 overflow-hidden rounded-[clamp(8px,1.5rem,24px)]">
            <Image
              className="h-full w-full object-cover"
              src="/in-between-3.svg"
              alt="Placeholder"
              fill
              sizes="100%"
            />
          </div>
        </div>
        <div className="image-mask-3 absolute left-1/2 top-[75vh] z-10 w-full -translate-x-1/2 -translate-y-1/2 scale-0 overflow-hidden md:top-1/2">
          <div className="relative mx-auto aspect-[0.64] w-[36%] scale-100 overflow-hidden rounded-[clamp(8px,1.5rem,24px)]">
            <Image
              className="h-full w-full object-cover"
              src="/in-between-0.svg"
              alt="Placeholder"
              fill
              sizes="100%"
            />
          </div>
        </div>
        <div className="first-video-mask-hidden absolute inset-0 z-[-10] block h-[50vh] overflow-hidden md:hidden md:h-auto md:scale-100">
          <HomeVideo videoSrc="/0" posterSrc="/lottie-thumbnail-1.png" />
        </div>
        <div className="first-video-mask absolute inset-0 h-[50vh] overflow-hidden md:h-auto md:scale-100">
          <HomeVideo videoSrc="/0" posterSrc="/lottie-thumbnail-1.png" />
        </div>
        <div className="second-video-mask absolute inset-0 h-0 overflow-hidden md:h-auto md:scale-0">
          <HomeVideo videoSrc="/1" posterSrc="/lottie-thumbnail-2.png" />
        </div>
        <div className="third-video-mask absolute inset-0 h-0 overflow-hidden md:h-auto md:scale-0">
          <HomeVideo videoSrc="/2" posterSrc="/lottie-thumbnail-3.png" />
        </div>
        <div className="fourth-video-mask absolute inset-0 overflow-hidden md:h-auto md:scale-0">
          <HomeVideo videoSrc="/3" posterSrc="/lottie-thumbnail-4.png" />
        </div>
      </div>
      {/*Right*/}
      <div className="relative">
        <div className="mt-[6vh] md:mt-[4.2rem]"></div>
        <div className="solid-accent pointer-events-none absolute inset-0 z-10 hidden h-screen scale-x-0 bg-accent md:block"></div>
        <div className="absolute left-1/2 z-50 flex w-[80%] -translate-x-1/2 flex-col items-start pl-8 sm:w-auto md:pl-0">
          <Header />
          {servicesSectionContent.map((section, i) => (
            <div key={section.title} className="relative h-full w-full">
              <div
                className={cn(
                  `relative service-right-${i} absolute z-[1] mt-[4.6rem] flex flex-col items-start gap-2 md:gap-4`,
                  i !== 0 && "z-0",
                )}
              >
                <div className="overflow-hidden">
                  <h2
                    className={cn(
                      `mb-0 text-[1.6rem] font-bold md:mb-[0.5rem] xl:mb-[1rem] xl:text-[2.5rem] service-title-${i} whitespace-nowrap`,
                      i !== 0 && "translate-y-full opacity-0",
                    )}
                  >
                    <span className="font-bold">
                      {section.title.split(" ")[0]}{" "}
                    </span>
                    <span className="font-light">
                      {section.title.split(" ")[1]}
                    </span>
                  </h2>
                </div>
                <div className="w-full overflow-hidden">
                  <div
                    className={cn(
                      `relative leading-[130%] service-description-${i} flex items-center gap-[6rem] text-[1rem] font-light xl:text-[1.6875rem]`,
                      i !== 0 && "translate-y-full opacity-0",
                    )}
                  >
                    {activeSection === i && (
                      <EmblaCarousel
                        options={{ loop: true }}
                        label={`${section.title} details`}
                        slides={section.description.map((line, i) => (
                          <p
                            key={line}
                            className={cn(
                              `service-description-line-${i} max-w-[85%]`,
                            )}
                          >
                            {line}
                          </p>
                        ))}
                      />
                    )}
                  </div>
                </div>
                <div className="relative">
                  <TransitionLink
                    href={section.readMoreLink}
                    className={cn(
                      `read-more-cta-${i} relative inline-block text-[1.6rem] text-black`,
                      i !== 0 &&
                      "-translate-y-full opacity-0 md:translate-y-full",
                    )}
                  >
                    <div className="flex items-center gap-2 text-accent md:items-end">
                      <span className="inline-block">Read more</span>
                      <ArrowRight className="h-auto w-6 animate-bounceX xl:w-8" />
                    </div>
                    <div className="hover-element hidden items-center gap-2 md:flex md:items-end">
                      <span className="inline-block whitespace-nowrap">
                        Read more
                      </span>
                      <ArrowRight className="h-auto w-6 animate-bounceX xl:w-8" />
                    </div>
                  </TransitionLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pin-element bg-red-900 fixed -top-full z-30 w-full scale-x-[500%]"></div>
    </section>
  );
};

export default Home;
