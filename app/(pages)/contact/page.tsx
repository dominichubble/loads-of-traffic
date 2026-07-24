import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact-form";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Loads of Traffic to explore your market trends, competitor traffic sources, and how we can help your business grow.",
};

const ContactPage = () => {
  return (
    <main className="contact min-h-screen bg-accent px-5 pb-[var(--container-padding-y)] pt-[calc(var(--pages-header-height)+var(--container-padding-y))] text-white sm:px-[var(--container-padding-x)]">
      <div className="content-container">
        <section className="contact-section">
          <div className="grid gap-8 border-b border-white/25 pb-10 md:grid-cols-[0.7fr_1.3fr] md:items-end md:gap-12 md:pb-14">
            <div>
              <span className="page-kicker text-[#000036]">Get in touch</span>
              <h1 className="display-heading mt-6 text-white">Contact</h1>
            </div>
            <div className="md:pb-2">
              <h2 className="max-w-[30ch] text-xl font-medium leading-snug text-white md:text-2xl xl:text-3xl">
                Ready to understand your market, your competitors, and your next
                growth opportunity?
              </h2>
              <p className="mt-5 max-w-[58ch] text-sm font-medium leading-relaxed text-[#000036] md:text-base">
                Share a little about your business and what you want to achieve.
                We&apos;ll respond with a clear next step.
              </p>
            </div>
          </div>

          <div className="mt-10 grid items-start gap-8 lg:mt-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <aside className="overflow-hidden rounded-[2rem] border border-white/15 bg-primary p-7 shadow-[0_24px_70px_rgba(83,0,32,0.2)] sm:p-9">
              <span className="page-kicker text-white/60">What to include</span>
              <h2 className="mt-6 text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-3xl">
                Let&apos;s explore how we can help your business grow.
              </h2>
              <ul className="mt-7 space-y-4 text-sm leading-relaxed text-white/75 md:text-base">
                <li className="flex gap-3">
                  <span className="font-bold text-accent">01</span>
                  <span>Which services or challenges can we help with?</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent">02</span>
                  <span>What level of support are you looking for?</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent">03</span>
                  <span>What would a successful next step look like?</span>
                </li>
              </ul>

              <div className="mt-9 space-y-5 border-t border-white/15 pt-7 text-sm">
                <div className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
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
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/50">
                      Office
                    </p>
                    <address className="mt-1 max-w-[34ch] not-italic text-white/80">
                      Loads of Traffic Ltd, Floor 2, Hillary House, Prospect
                      Hill, Douglas, IM1 1EQ
                    </address>
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
