import { cn } from "@/utils";

type PageIntroProps = {
  kicker: string;
  title: string;
  headline: string;
  description: string;
  /** Large decorative index, e.g. "01" */
  index?: string;
  className?: string;
};

const PageIntro = ({
  kicker,
  title,
  headline,
  description,
  index,
  className,
}: PageIntroProps) => {
  return (
    <header className={cn("relative", className)}>
      {index ? (
        <span
          className="pointer-events-none absolute -right-2 -top-6 select-none text-[clamp(6rem,18vw,12rem)] font-bold leading-none tracking-[-0.06em] text-white/[0.07] md:-top-10 md:right-0"
          aria-hidden="true"
        >
          {index}
        </span>
      ) : null}

      <div className="page-split relative">
        <div className="page-rise min-w-0">
          <span className="page-kicker text-white/65">{kicker}</span>
          <h1 className="display-heading mt-5 max-w-none text-white">{title}</h1>
        </div>
        <div className="page-rise page-rise-delay-1 min-w-0 space-y-5 md:pt-1">
          <h2 className="text-xl font-medium leading-snug text-balance text-white md:text-2xl xl:text-[1.85rem] xl:leading-snug">
            {headline}
          </h2>
          <p className="max-w-[62ch] text-sm leading-relaxed text-white md:text-base md:leading-relaxed lg:text-lg">
            {description}
          </p>
        </div>
      </div>

      <hr className="page-intro-rule page-rise page-rise-delay-2 mt-10 md:mt-12" />
    </header>
  );
};

export default PageIntro;
