"use client";

import Script from "next/script";

const GA_ID = "G-ZW1EPJXYSH";

/**
 * Google Analytics loader. Rendered only after the visitor has granted
 * consent (see components/cookie-consent.tsx), so no analytics cookies are
 * set on first paint.
 */
const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
