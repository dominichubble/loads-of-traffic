import { cn } from "@/utils";

type PageIntroProps = {
  kicker: string;
  title: string;
  headline: string;
  description: string;
  className?: string;
};

const PageIntro = ({
  kicker,
  title,
  headline,
  description,
  className,
}: PageIntroProps) => {
  return (
    <header
      className={cn(
        "grid gap-6 border-b border-white/15 pb-10 md:grid-cols-2 md:items-start md:gap-x-16 md:gap-y-8 md:pb-12 lg:gap-x-24",
        className,
      )}
    >
      <div className="min-w-0">
        <span className="page-kicker text-white/65">{kicker}</span>
        <h1 className="display-heading mt-5 max-w-none text-white">{title}</h1>
      </div>
      <div className="min-w-0 space-y-5">
        <h2 className="text-xl font-medium leading-snug text-balance text-white/90 md:text-2xl xl:text-[1.85rem] xl:leading-snug">
          {headline}
        </h2>
        <p className="max-w-[62ch] text-sm leading-relaxed text-white/75 md:text-base md:leading-relaxed lg:text-lg">
          {description}
        </p>
      </div>
    </header>
  );
};

export default PageIntro;
