import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact-form";
import PageIntro from "@/components/page-intro";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Loads of Traffic to explore your market trends, competitor traffic sources, and how we can help your business grow.",
};

const ContactPage = () => {
  return (
    <main className="contact page-shell page-atmosphere min-h-screen bg-accent text-white">
      <div className="content-container page-gutters">
        <section className="contact-section">
          <PageIntro
            index="03"
            kicker="Get in touch"
            title="Contact"
            headline="Ready to understand your market, your competitors, and your next growth opportunity?"
            description="Share a little about your business and what you want to achieve. We'll respond with a clear next step."
          />

          <div className="page-split page-rise page-rise-delay-2 mt-10 lg:mt-14 lg:[align-items:stretch]">
            <aside className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-primary via-primary to-[var(--color-primary-deep)] p-7 shadow-[0_28px_80px_rgba(0,0,79,0.35)] sm:p-10 lg:p-14">
              <div
                className="pointer-events-none absolute -right-28 -top-28 h-56 w-56 rounded-full border-[2.5rem] border-accent/30"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 -left-28 h-64 w-64 rounded-full border-[2.5rem] border-white/[0.05]"
                aria-hidden="true"
              />

              <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                <span className="page-kicker text-white/60">What to include</span>
                <h2 className="mt-6 text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-3xl">
                  Let&apos;s explore how we can help your business grow.
                </h2>
                <ul className="mt-8 space-y-5 text-sm leading-relaxed text-white/80 md:text-base">
                  <li className="flex gap-4">
                    <span className="font-bold tabular-nums text-yellow">01</span>
                    <span>Which services or challenges can we help with?</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-bold tabular-nums text-yellow">02</span>
                    <span>What level of support are you looking for?</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-bold tabular-nums text-yellow">03</span>
                    <span>What would a successful next step look like?</span>
                  </li>
                </ul>

                <div className="mt-10 space-y-5 border-t border-white/15 pt-8 text-sm lg:mt-auto lg:pt-10">
                  <div className="flex items-start gap-3">
                    <Mail
                      className="mt-0.5 h-5 w-5 shrink-0 text-yellow"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/50">
                        Email
                      </p>
                      <Link
                        className="mt-1 inline-block font-medium underline decoration-white/30 underline-offset-4 hover:decoration-white"
                        href="mailto:enquiries@loadsoftraffic.com"
                      >
                        enquiries@loadsoftraffic.com
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 h-5 w-5 shrink-0 text-yellow"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/50">
                        Office
                      </p>
                      <address className="mt-1 max-w-[34ch] not-italic text-white/80">
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
