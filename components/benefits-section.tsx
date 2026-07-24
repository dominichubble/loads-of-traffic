import React from "react";
import BenefitCard from "./benefit-card";
import { benefitsSectionContent } from "@/utils/constants";

const BenefitsSection = () => {
  return (
    <section className="pb-[var(--sections-gap)]">
      <div className="page-split border-t border-white/20 pt-10 md:pt-14">
        <div className="min-w-0">
          <span className="page-kicker text-white/65">How we work</span>
          <h2 className="section-heading mt-5 max-w-none text-white">
            A clear path
          </h2>
        </div>
        <p className="body-copy max-w-none text-white md:pt-1">
          A clear path from first conversation to measurable growth — so every
          engagement stays focused, accountable, and built around outcomes.
        </p>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:mt-10 xl:grid-cols-4 xl:gap-4">
        {benefitsSectionContent.map((benefit, index) => (
          <BenefitCard
            key={benefit.title}
            title={benefit.title}
            lottieJson={benefit.lottieJson}
            index={index + 1}
          />
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
