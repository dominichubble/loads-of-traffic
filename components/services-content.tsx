"use client";
// Custom Cursor and hover animations
import BenefitsSection from "@/components/benefits-section";
import ServiceAccordion from "@/components/service-accordion";
import React from "react";
import { servicesAccordionsContent } from "@/utils/constants";
import lottieJson from "../public/lottie/rocket.json";
import { useClient } from "@/hooks/use-client";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const ServicesContent = () => {
  const isClient = useClient();
  return (
    <main className="services bg-red px-6 pb-[--pages-header-height] pt-[calc(var(--pages-header-height)+3rem)] sm:px-[var(--container-padding-x)] xl:pb-[6rem] xl:pt-[calc(var(--pages-header-height)+var(--container-padding-y))]">
      <section className="services-section relative z-0">
        <div className="flex flex-col-reverse gap-[3rem] xl:gap-[6rem]">
          <div className="flex items-center justify-between">
            <div className="hidden md:block">
              {isClient && (
                <Lottie
                  loop
                  animationData={lottieJson}
                  play
                  style={{
                    width: "50vh",
                    height: "50vh",
                    minWidth: "400px",
                    minHeight: "400px",
                  }}
                />
              )}
            </div>
            <div className="md:max-w-[40%]">
              <h2 className="text-[1.6rem] font-bold md:mb-[1rem] xl:text-[2.4rem]">
                Propel your business to new heights with groundbreaking
                insights, expert strategies, and high-level execution.
              </h2>
            </div>
          </div>
        </div>
        <div id="services" className="py-[var(--pages-header-height)]">
          <div>
            <h1 className="flex items-center gap-4 self-start text-[2rem] font-bold md:text-[2.8rem] xl:text-[3rem]">
              <span className="mt-[0.2rem] inline-block h-[1rem] w-[1rem] rounded-full bg-white xl:h-[1.2rem] xl:w-[1.2rem]"></span>
              Services
            </h1>
            <div className="mt-12 flex flex-col gap-2 md:gap-4">
              {servicesAccordionsContent.map((accordion, i) => (
                <div key={accordion.title} id={`${i + 1}`}>
                  <ServiceAccordion
                    key={accordion.title}
                    title={accordion.title}
                    index={i + 1}
                    description={accordion.description}
                    maxAccordions={servicesAccordionsContent.length}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <BenefitsSection />
      </section>
    </main>
  );
};

export default ServicesContent;
