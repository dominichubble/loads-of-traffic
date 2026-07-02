import React from "react";
import BenefitCard from "./benefit-card";
import { benefitsSectionContent } from "@/utils/constants";
const BenefitsSection = () => {
  return (
    <section className="mt-16">
      <h2 className="flex items-center gap-4 self-start text-[2rem] font-bold md:self-end md:text-[2.8rem] xl:text-[2.8rem]">
        <span className="mt-[0.2rem] inline-block h-[1rem] w-[1rem] rounded-full bg-white xl:h-[1.2rem] xl:w-[1.2rem]"></span>
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
