import React from "react";
import BenefitCard from "./benefit-card";
import { benefitsSectionContent } from "@/utils/constants";
const BenefitsSection = () => {
  return (
    <section className="pb-[var(--sections-gap)]">
      <div className="border-t border-white/25 pt-10 md:pt-14">
        <span className="page-kicker text-[#000036]">How we work</span>
        <h2 className="section-heading mt-5 text-[#000036]">
          Our approach to success
        </h2>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {benefitsSectionContent.map((benefit, index) => (
          <div key={benefit.title} className="flex">
            <BenefitCard
              title={benefit.title}
              lottieJson={benefit.lottieJson}
              index={index + 1}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
