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
    <main className="contact page-shell min-h-screen bg-accent text-white">
      <div className="content-container page-gutters">
        <section className="contact-section">
          <PageIntro
            kicker="Get in touch"
            title="Contact"
            headline="Ready to understand your market, your competitors, and your next growth opportunity?"
            description="Share a little about your business and what you want to achieve. We'll respond with a clear next step."
          />

          <div className="mt-10 grid items-start gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24">
            <aside className="overflow-hidden rounded-[2rem] border border-white/15 bg-primary p-7 shadow-[0_24px_70px_rgba(83,0,32,0.2)] sm:p-10 lg:p-14">
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
