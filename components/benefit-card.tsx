import dynamic from "next/dynamic";
import React from "react";
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const BenefitCard = ({
  title,
  lottieJson,
  index,
}: {
  title: string;
  lottieJson: object;
  index: number;
}) => {
  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-white/40 bg-white p-5 text-primary shadow-[0_18px_50px_rgba(83,0,32,0.12)] transition-transform duration-200 hover:-translate-y-1 sm:p-6">
      <div className="flex items-center justify-between">
        <span className="text-primary/55 text-xs font-bold uppercase tracking-[0.14em]">
          Step 0{index}
        </span>
        <span
          className="h-2.5 w-2.5 rounded-full bg-accent"
          aria-hidden="true"
        />
      </div>
      <div className="grid flex-1 place-content-center" aria-hidden="true">
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{
            width: "min(14rem, 70vw)",
          }}
        />
      </div>
      <h3 className="border-primary/10 border-t pt-4 text-xl font-semibold tracking-[-0.02em]">
        {title}
      </h3>
    </article>
  );
};

export default BenefitCard;
