import BenefitsSection from "@/components/benefits-section";
import TransitionLink from "@/components/transition-link";
import { cn } from "@/utils";
import { servicesAccordionsContent } from "@/utils/constants";
import { ArrowUpRight } from "lucide-react";

const ServicesContent = () => {
  return (
    <main className="services page-shell page-atmosphere relative min-h-screen bg-red text-white">
      <div className="services-section content-container content-cap page-gutters relative">
        <h1 className="page-kicker text-white">Capabilities</h1>

        <section
          id="services"
          className="mt-8 grid gap-4 md:mt-10 lg:grid-cols-2 lg:gap-5"
        >
          {servicesAccordionsContent.map((service, i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            const navy = (row + col) % 2 === 0;

            return (
              <article
                key={service.title}
                id={service.slug}
                className={cn(
                  "relative flex min-h-[20rem] flex-col overflow-hidden rounded-[1.5rem] border p-5 pb-6 sm:min-h-[22rem] sm:p-7 lg:p-8",
                  navy
                    ? "border-white/15 bg-gradient-to-br from-primary via-primary to-[var(--color-primary-deep)] text-white shadow-[0_28px_80px_rgba(0,0,79,0.35)]"
                    : "border-white/50 bg-white text-primary shadow-[0_28px_80px_rgba(0,0,79,0.2)]",
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none absolute -right-1 -top-4 select-none text-[clamp(6rem,14vw,9rem)] font-bold leading-none tracking-[-0.07em]",
                    navy
                      ? "text-white/10"
                      : "font-outline-2 font-outline-primary opacity-25",
                  )}
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>

                <p
                  className={cn(
                    "relative text-xs font-bold tabular-nums tracking-[0.16em]",
                    navy ? "text-yellow" : "text-accent-deep",
                  )}
                >
                  0{i + 1}
                </p>
                <h2 className="relative mt-4 max-w-[14ch] text-[clamp(1.55rem,2.6vw,2.25rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
                  {service.title}
                </h2>
                <p
                  className={cn(
                    "relative mt-4 max-w-[42ch] flex-1 text-sm leading-relaxed md:text-[0.95rem]",
                    navy ? "text-white/80" : "text-primary/75",
                  )}
                >
                  {service.description}
                </p>
                <TransitionLink
                  href="/contact"
                  className={cn(
                    "relative mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5",
                    navy ? "bg-white text-primary" : "bg-primary text-white",
                  )}
                >
                  Discuss this service
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </TransitionLink>
              </article>
            );
          })}
        </section>

        <BenefitsSection />
      </div>
    </main>
  );
};

export default ServicesContent;
