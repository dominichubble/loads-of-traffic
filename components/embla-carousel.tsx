import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "./embla-autoplay";
import { NextButton, usePrevNextButtons } from "./embla-carousel-arrow-buttons";

type PropType = {
  slides: React.ReactNode[]; // Change from number[] to React.ReactNode[]
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 5000, stopOnInteraction: false }),
  ]);

  const { nextBtnDisabled, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const { onAutoplayButtonClick } = useAutoplay(emblaApi);

  return (
    <div className="embla flex items-start pr-4">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slideContent, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__content">{slideContent}</div>{" "}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__buttons absolute right-[-2rem] top-1/2 -translate-y-1/2">
        <NextButton
          onClick={() => onAutoplayButtonClick(onNextButtonClick)}
          disabled={nextBtnDisabled}
        />
      </div>
    </div>
  );
};

export default EmblaCarousel;
