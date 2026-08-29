import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact-form";
import { Linkedin, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Loads of Traffic to explore your market trends, competitor traffic sources, and how we can help your business grow.",
};

const ContactPage = () => {
  return (
    <main className="contact page-atmosphere bg-primary text-white">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_55%]">
        <section
          aria-label="Contact details"
          className="contact-copy page-inline-start flex min-w-0 flex-col gap-8 pr-[var(--container-padding-x)] pb-12 pt-[calc(var(--pages-header-height)+1.5rem)] lg:min-h-svh lg:justify-center lg:gap-10 lg:pb-12 lg:pr-10 lg:pt-[var(--pages-header-height)] xl:pr-14"
        >
          <h1 className="contact-desk-title min-w-0 max-w-[min(12ch,100%)] font-semibold leading-[1.05] tracking-[-0.045em] text-pretty">
            Tell us the challenge. We&apos;ll send a next step.
          </h1>

          <div className="flex max-w-[36ch] flex-col gap-5 text-sm">
            <div className="flex items-start gap-3">
              <Mail
                className="mt-0.5 h-4 w-4 shrink-0 text-yellow"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/75">
                  Email
                </p>
                <Link
                  className="mt-0.5 inline-block max-w-full break-words font-medium underline decoration-white/60 underline-offset-4 hover:decoration-white [overflow-wrap:anywhere]"
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
              <address className="min-w-0 not-italic">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/75">
                  Office
                </p>
                <p className="mt-0.5 leading-snug text-white/85">
                  Loads of Traffic Ltd
                  <br />
                  Winchester Court, Second Avenue
                  <br />
                  Onchan, IM3 4LT
                  <br />
                  Isle of Man
                </p>
              </address>
            </div>
            <Link
              href="https://www.linkedin.com/company/loads-of-traffic/"
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-2 font-medium text-white/90 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
              aria-label="Loads of Traffic on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4 text-yellow" aria-hidden="true" />
              LinkedIn
            </Link>
          </div>
        </section>

        <section className="min-w-0 bg-white text-primary lg:min-h-svh">
          <ContactForm />
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
