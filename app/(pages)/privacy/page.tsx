import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy",
  description:
    "How Loads of Traffic collects, uses, and protects personal data, and how we use cookies.",
};

const UPDATED = "August 2026";

const PrivacyPage = () => {
  return (
    <main className="privacy page-shell page-gutters bg-primary text-white">
      <div className="content-container content-cap">
        <p className="page-kicker text-white">Legal</p>
        <h1 className="section-heading mt-4">Privacy &amp; Cookie Policy</h1>
        <p className="mt-3 text-sm text-white/80">Last updated: {UPDATED}</p>

        <div className="mt-10 max-w-[68ch] space-y-8 text-white/90 [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.85em] [&_h2]:mb-3 [&_h2]:text-[1.4rem] [&_h2]:font-semibold [&_h2]:tracking-[-0.01em] [&_h2]:text-white [&_p]:leading-relaxed [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          <p className="rounded-xl border border-yellow/40 bg-yellow/10 p-4 text-sm">
            <strong>Placeholder.</strong> This page is a working draft and must
            be reviewed and completed by a qualified adviser before launch. The
            sections below outline what the final policy should cover.
          </p>

          <section>
            <h2>Who we are</h2>
            <p>
              Loads of Traffic Ltd, Winchester Court, Second Avenue, Onchan,
              IM3 4LT, Isle of Man. For any privacy question, contact{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:enquiries@loadsoftraffic.com"
              >
                enquiries@loadsoftraffic.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2>What we collect</h2>
            <ul>
              <li>
                <strong>Contact form:</strong> the name, work email, company,
                role, and message you submit. Used only to respond to your
                enquiry. Delivered to us by email via Resend.
              </li>
              <li>
                <strong>Analytics (with consent):</strong> if you accept
                analytics cookies, Google Analytics records anonymised usage
                data such as pages viewed, approximate location, device, and
                referrer. No analytics cookies are set unless you accept.
              </li>
              <li>
                <strong>Server logs:</strong> our host (Vercel) processes
                standard request logs, including IP address, for security and
                reliability.
              </li>
            </ul>
          </section>

          <section>
            <h2>Lawful basis</h2>
            <p>
              Contact enquiries: our legitimate interest in responding to you.
              Analytics: your consent, which you can withdraw at any time.
            </p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>
              We set no non-essential cookies until you choose “Accept” on the
              cookie banner. Accepting loads Google Analytics, which sets its
              own cookies (for example <code>_ga</code>) to distinguish
              visitors. Choosing “Decline” stores only a small preference so we
              do not ask again. To change your choice later, clear this site’s
              data or run <code>lotResetConsent()</code> in your browser
              console to bring the banner back.
            </p>
          </section>

          <section>
            <h2>Sharing</h2>
            <p>
              We do not sell personal data. We share it only with the
              processors that run this site: Resend (enquiry delivery), Google
              (analytics, if consented), and Vercel (hosting).
            </p>
          </section>

          <section>
            <h2>Retention</h2>
            <p>
              Enquiry emails are kept for as long as needed to deal with your
              request and our records, then deleted. Analytics data follows
              Google’s retention settings.
            </p>
          </section>

          <section>
            <h2>Your rights</h2>
            <p>
              Subject to Isle of Man and UK data protection law, you can ask
              for a copy of your data, correction, deletion, or restriction,
              and you can object to processing based on legitimate interest.
              Contact us using the address above.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPage;
