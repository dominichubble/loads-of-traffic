import BenefitsSection from "@/components/benefits-section";
import Footer from "@/components/footer";
import StepDeck from "@/components/step-deck";
import TransitionLink from "@/components/transition-link";
import { cn } from "@/utils";
import { servicesAccordionsContent } from "@/utils/constants";
import { ArrowUpRight } from "lucide-react";

const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof servicesAccordionsContent)[number];
  index: number;
}) => {
  const navy = index % 2 === 0;
  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[1.75rem] border p-7 sm:p-10 lg:p-14",
        navy
          ? "border-white/15 bg-gradient-to-br from-primary via-primary to-[var(--color-primary-deep)] text-white shadow-[0_28px_80px_rgba(0,0,79,0.35)]"
          : "border-white/50 bg-white text-primary shadow-[0_28px_80px_rgba(0,0,79,0.2)]",
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute -right-2 -top-6 select-none text-[clamp(7rem,16vw,12rem)] font-bold leading-none tracking-[-0.07em]",
          navy
            ? "text-white/10"
            : "font-outline-2 font-outline-primary opacity-20",
        )}
        aria-hidden="true"
      >
        0{index + 1}
      </span>

      <p
        className={cn(
          "relative text-xs font-bold uppercase tabular-nums tracking-[0.18em]",
          navy ? "text-yellow" : "text-accent-deep",
        )}
      >
        Service 0{index + 1} / 04
      </p>
      <h2 className="relative mt-4 max-w-[16ch] text-[clamp(1.75rem,1.1rem+2.6vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
        {service.title}
      </h2>
      <p
        className={cn(
          "relative mt-3 text-base font-medium",
          navy ? "text-white/85" : "text-primary",
        )}
      >
        {service.lede}
      </p>
      <p
        className={cn(
          "relative mt-5 max-w-[52ch] text-sm leading-relaxed md:text-base",
          navy ? "text-white/80" : "text-primary/75",
        )}
      >
        {service.description}
      </p>
      <TransitionLink
        href="/contact"
        className={cn(
          "relative mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5",
          navy ? "bg-white text-primary" : "bg-primary text-white",
        )}
      >
        Discuss this service
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </TransitionLink>
    </article>
  );
};

const ServicesContent = () => {
  return (
    <main className="services page-atmosphere bg-red text-white">
      <StepDeck
        ariaLabel="Loads of Traffic services"
        footer={<Footer />}
        sections={[
          {
            id: "services-intro",
            node: (
              <div className="deck-section">
                <div className="content-container content-cap page-gutters w-full">
                  <span className="page-kicker text-white">Capabilities</span>
                  <h1 className="display-heading mt-5 text-white">
                    Four ways we grow your traffic
                  </h1>
                  <p className="body-copy mt-6 text-white">
                    Affiliate strategy, competitive intelligence, and growth —
                    delivered as focused engagements, each measured on outcomes.
                    Use the arrows to move through them.
                  </p>
                </div>
              </div>
            ),
          },
          ...servicesAccordionsContent.map((service, i) => ({
            id: service.slug,
            node: (
              <div className="deck-section">
                <div className="content-container content-cap page-gutters w-full">
                  <ServiceCard service={service} index={i} />
                </div>
              </div>
            ),
          })),
          {
            id: "services-path",
            node: (
              <div className="deck-section">
                <BenefitsSection />
              </div>
            ),
          },
        ]}
      />
    </main>
  );
};

export default ServicesContent;
