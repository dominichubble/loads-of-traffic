import dynamic from "next/dynamic";
import React from "react";
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const BenefitCard = ({
  title,
  lottieJson,
}: {
  title: string;
  lottieJson: object;
}) => {
  return (
    <article className="h-full w-full max-w-[600px] rounded-[0.8rem] border-[1px] border-white bg-white p-4 text-primary">
      <div className="grid place-content-center">
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{
            width: "18rem",
          }}
        />
      </div>
      <h3 className="text-center text-[1.4rem]">{title}</h3>
    </article>
  );
};

export default BenefitCard;
