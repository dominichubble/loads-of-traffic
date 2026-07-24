"use client";
import BenefitsSection from "@/components/benefits-section";
import ServiceAccordion from "@/components/service-accordion";
import PageIntro from "@/components/page-intro";
import React from "react";
import { servicesAccordionsContent } from "@/utils/constants";

const ServicesContent = () => {
  return (
    <main className="services page-shell min-h-screen bg-red text-white">
      <div className="services-section content-container page-gutters relative z-0">
        <PageIntro
          kicker="What we do"
          title="Services"
          headline="Propel your business with sharper insights, expert strategy, and high-level execution."
          description="We turn competitive intelligence into practical decisions that strengthen your position and create sustainable growth."
        />

        <section id="services" className="py-[var(--sections-gap)]">
          <div className="grid gap-6 md:grid-cols-2 md:gap-x-16 md:gap-y-8 lg:gap-x-24">
            <div className="min-w-0">
              <span className="page-kicker text-white/65">Capabilities</span>
              <h2 className="section-heading mt-5 max-w-none text-white">
                Built around your next move
              </h2>
            </div>
            <p className="body-copy max-w-none text-white md:pt-1">
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
