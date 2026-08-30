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
    <main className="contact page-atmosphere contact-shell bg-primary text-white">
      <h1 className="sr-only">Contact</h1>
      <div className="flex h-full min-h-0 flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_55%]">
        <section className="contact-copy no-scrollbar page-inline-start flex min-h-[8rem] max-h-[30vh] min-w-0 shrink flex-col gap-[var(--contact-copy-gap)] overflow-y-auto overscroll-contain pr-[var(--container-padding-x)] lg:max-h-none lg:[justify-content:safe_center] lg:pr-10 xl:pr-14">
          <p className="contact-desk-title min-w-0 max-w-[min(12ch,100%)] font-semibold leading-[1.05] tracking-[-0.045em] text-pretty">
            Tell us the challenge. We&apos;ll send a next step.
          </p>

          <div className="flex max-w-[36ch] flex-col gap-[var(--contact-row-gap)] text-sm">
            <div className="flex items-start gap-3">
              <Mail
                className="mt-0.5 h-4 w-4 shrink-0 text-yellow"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/45">
                  Email
                </p>
                <Link
                  className="mt-0.5 inline-block max-w-full break-words font-medium underline decoration-white/30 underline-offset-4 hover:decoration-white [overflow-wrap:anywhere]"
                  href="mailto:enquiries@loadsoftraffic.com"
                >
                  enquiries@loadsoftraffic.com
                </Link>
              </div>
            </div>
            <div className="contact-address-row flex items-start gap-3">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-yellow"
                aria-hidden="true"
              />
              <address className="min-w-0 not-italic">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/45">
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

        <section className="min-h-[14rem] min-w-0 flex-1 bg-white text-primary">
          <ContactForm />
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
