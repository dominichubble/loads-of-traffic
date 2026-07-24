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
    <main className="services min-h-screen bg-red px-5 pb-[var(--container-padding-y)] pt-[calc(var(--pages-header-height)+2rem)] text-white sm:px-[var(--container-padding-x)] md:pt-[calc(var(--pages-header-height)+var(--container-padding-y))]">
      <div className="services-section content-container relative z-0">
        <section className="grid overflow-hidden rounded-[2rem] border border-white/15 bg-primary shadow-[0_28px_80px_rgba(83,0,32,0.24)] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <span className="page-kicker text-white/65">What we do</span>
            <h1 className="display-heading mt-6 text-white">Services</h1>
            <h2 className="mt-7 max-w-[28ch] text-xl font-medium leading-snug text-white/90 md:text-2xl">
              Propel your business with sharper insights, expert strategy, and
              high-level execution.
            </h2>
            <p className="mt-5 max-w-[58ch] text-sm leading-relaxed text-white md:text-base">
              We turn competitive intelligence into practical decisions that
              strengthen your position and create sustainable growth.
            </p>
          </div>

          <div
            className="relative hidden min-h-[28rem] place-content-center overflow-hidden border-l border-white/10 bg-white/[0.06] p-10 md:grid"
            aria-hidden="true"
          >
            <div className="bg-accent/40 absolute inset-16 rounded-full blur-3xl" />
            <div className="relative">
              {isClient && (
                <Lottie
                  loop
                  animationData={lottieJson}
                  play
                  style={{
                    width: "min(19rem, 26vw)",
                    height: "min(19rem, 26vw)",
                  }}
                />
              )}
            </div>
          </div>
        </section>

        <section id="services" className="py-[var(--sections-gap)]">
          <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:gap-12">
            <div>
              <span className="page-kicker text-white/65">Capabilities</span>
              <h2 className="section-heading mt-5 text-white">
                Built around your next move
              </h2>
            </div>
            <p className="body-copy text-white md:pt-8">
              Choose focused support for a specific challenge or combine our
              capabilities into a complete growth programme. Each engagement is
              shaped around your goals, market, and success measures.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 md:mt-14">
            {servicesAccordionsContent.map((accordion, i) => (
              <div key={accordion.title} id={`${i + 1}`}>
                <ServiceAccordion
                  title={accordion.title}
                  index={i + 1}
                  description={accordion.description}
                  maxAccordions={servicesAccordionsContent.length}
                />
              </div>
            ))}
          </div>
        </section>

        <BenefitsSection />
      </div>
    </main>
  );
};

export default ServicesContent;
