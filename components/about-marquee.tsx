const MARQUEE_ITEMS = Array.from({ length: 6 }, (_, i) => i);

const AboutMarquee = () => {
  return (
    <div className="overflow-hidden py-4 xl:py-8" aria-hidden="true">
      <div className="about-marquee-track gap-4">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-4 pr-4">
            {MARQUEE_ITEMS.map((i) => (
              <div
                key={`${copy}-${i}`}
                className="flex items-center gap-4 whitespace-nowrap"
              >
                <div className="aspect-square w-6 rounded-full bg-white opacity-50" />
                <p className="font-outline-2 font-outline-white text-[2rem] font-bold uppercase xl:text-[4rem]">
                  Loads of traffic
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutMarquee;
