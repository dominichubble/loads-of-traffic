import React from "react";
import { ArrowUpRight, MessageCircleMore } from "lucide-react";
import TransitionLink from "./transition-link";

const AboutContact = () => {
  return (
    <section className="about-contact content-container page-gutters">
      <div className="grid overflow-hidden rounded-[2rem] border border-white/50 bg-white text-primary shadow-[0_28px_80px_rgba(0,0,79,0.22)] md:grid-cols-1 lg:grid-cols-[1fr_55%]">
        <div className="p-7 sm:p-10 lg:p-14">
          <span className="page-kicker text-accent">Start a conversation</span>
          <h2 className="section-heading mt-6">Bring us your next challenge</h2>
          <p className="body-copy text-primary/70 mt-6">
            Tell us about the challenges you&apos;re facing and the goals you
            want to achieve. We&apos;ll show you how focused strategy and
            data-driven insight can turn them into meaningful results.
          </p>
          <TransitionLink
            href="/contact"
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </TransitionLink>
        </div>

        <div className="relative grid min-h-[18rem] place-content-center overflow-hidden bg-primary p-8 text-white">
          <div
            className="border-accent/70 absolute -right-20 -top-20 h-56 w-56 rounded-full border-[3rem]"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-28 -left-28 h-64 w-64 rounded-full border-[3rem] border-white/[0.05]"
            aria-hidden="true"
          />
          <div className="relative z-10 grid h-32 w-32 place-content-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
            <MessageCircleMore className="h-12 w-12" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContact;
