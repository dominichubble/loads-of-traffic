import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "./embla-autoplay";
import {
  NextButton,
  usePrevNextButtons,
} from "./embla-carousel-arrow-buttons";

type PropType = {
  slides: React.ReactNode[]; // Change from number[] to React.ReactNode[]
  options?: EmblaOptionsType;
  label?: string;
};

const EmblaCarousel: React.FC<PropType> = ({
  slides,
  options,
  label = "Carousel",
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      playOnInit: !prefersReducedMotion,
      delay: 5000,
      stopOnInteraction: false,
    }),
  ]);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  const {
    nextBtnDisabled,
    onNextButtonClick,
    onPrevButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { onAutoplayButtonClick } = useAutoplay(emblaApi);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      onAutoplayButtonClick(onNextButtonClick);
    } else if (event.key === "ArrowLeft") {
      onAutoplayButtonClick(onPrevButtonClick);
    }
  };

  return (
    <div className="embla flex items-start pr-4">
      <div
        className="embla__viewport"
        ref={emblaRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
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
          aria-label="Next slide"
        />
      </div>
    </div>
  );
};

export default EmblaCarousel;
