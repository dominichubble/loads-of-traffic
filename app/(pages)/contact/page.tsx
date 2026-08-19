import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact-form";
import PageIntro from "@/components/page-intro";
import { Linkedin, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Loads of Traffic to explore your market trends, competitor traffic sources, and how we can help your business grow.",
};

const ContactPage = () => {
  return (
    <main className="contact page-atmosphere bg-accent text-white">
      <div className="content-container page-gutters pb-10 pt-[calc(var(--pages-header-height)+0.85rem)] md:pb-14 md:pt-[calc(var(--pages-header-height)+1rem)]">
        <section className="contact-section flex flex-col">
          <PageIntro
            index="03"
            kicker="Get in touch"
            title="Contact"
            headline="Ready to understand your market, your competitors, and your next growth opportunity?"
            description="Share a little about your business and what you want to achieve. We'll respond with a clear next step."
            className="contact-intro"
          />

          <div className="page-split page-rise page-rise-delay-2 mt-8 md:mt-10">
            <aside className="relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/15 bg-gradient-to-br from-primary via-primary to-[var(--color-primary-deep)] p-5 pb-8 shadow-[0_28px_80px_rgba(0,0,79,0.35)] sm:p-6 sm:pb-10 lg:p-8">
              <div
                className="pointer-events-none absolute -right-40 -top-40 z-0 h-64 w-64 rounded-full border-[2.5rem] border-accent/30"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-44 -left-40 z-0 h-72 w-72 rounded-full border-[2.5rem] border-accent/20"
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col">
                <span className="page-kicker text-white/60">What to include</span>
                <h2 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.03em] md:mt-4 md:text-2xl">
                  Let&apos;s explore how we can help your business grow.
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm leading-snug text-white md:mt-5 md:space-y-3">
                  <li className="flex gap-3">
                    <span className="font-bold tabular-nums text-yellow">01</span>
                    <span>Which services or challenges can we help with?</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold tabular-nums text-yellow">02</span>
                    <span>What level of support are you looking for?</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold tabular-nums text-yellow">03</span>
                    <span>What would a successful next step look like?</span>
                  </li>
                </ul>

                <div className="mt-5 space-y-3 border-t border-white/15 pt-4 text-sm md:mt-8">
                  <div className="flex items-start gap-3">
                    <Mail
                      className="mt-0.5 h-4 w-4 shrink-0 text-yellow"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/50">
                        Email
                      </p>
                      <Link
                        className="mt-0.5 inline-block text-sm font-medium underline decoration-white/30 underline-offset-4 hover:decoration-white"
                        href="mailto:enquiries@loadsoftraffic.com"
                      >
                        enquiries@loadsoftraffic.com
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-yellow"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/50">
                        Office
                      </p>
                      <address className="mt-0.5 max-w-[34ch] text-sm not-italic leading-snug text-white">
                        Loads of Traffic Ltd
                        <br />
                        Winchester Court, Second Avenue
                        <br />
                        Onchan, IM3 4LT
                        <br />
                        Isle of Man
                      </address>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <Link
                      href="https://www.linkedin.com/company/loads-of-traffic/"
                      className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-2 text-sm font-medium text-white/90 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
                      aria-label="Loads of Traffic on LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4 text-yellow" aria-hidden="true" />
                      LinkedIn
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            <ContactForm />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
