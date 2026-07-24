import React from "react";
import BenefitCard from "./benefit-card";
import { benefitsSectionContent } from "@/utils/constants";
const BenefitsSection = () => {
  return (
    <section className="mt-16">
      <h2 className="self-start text-[2rem] font-bold md:self-end md:text-[2.8rem] xl:text-[2.8rem]">
        Our Approach to Success
      </h2>
      <div className="mt-12 grid items-center gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {benefitsSectionContent.map((benefit) => (
          <div key={benefit.title} className="flex items-center justify-center">
            <BenefitCard
              title={benefit.title}
              lottieJson={benefit.lottieJson}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
