import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import MobileHeader from "@/components/mobile-header";
import Preloader from "@/components/preloader";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "900"],
  variable: "--font-poppins",
});

const siteUrl = "https://www.loadsoftraffic.com";
const siteName = "Loads of Traffic";
const siteDescription =
  "Loads Of Traffic is a digital marketing agency focused on affiliate strategy, competitive intelligence, and growth for the e-gaming and consumer sectors.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [{ url: "/logo.png", width: 1841, height: 492, alt: siteName }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} ${poppins.variable} antialiased`}>
        {/* Runs before hydration so repeat visitors (or reduced-motion users)
            never see the preloader painted, even for a single frame. Mirrors
            the skip logic in components/preloader.tsx. */}
        <Script
          id="preloader-skip-flag"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var seen = window.localStorage.getItem("lot-preloader-seen") === "1";
                  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                  if (seen || reduced) {
                    document.documentElement.classList.add("preloader-skip");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-ZW1EPJXYSH"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZW1EPJXYSH');
            `,
          }}
        />

        <Preloader />
        <MobileHeader />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <div
          className="pointer-events-none fixed inset-0 z-[2000] hidden h-screen w-full grid-cols-[55%_1fr] sm:grid"
          aria-hidden="true"
        >
          <div className="transition-left origin-top scale-y-0 bg-red"></div>
          <div className="transition-right origin-bottom scale-y-0 bg-red"></div>
        </div>
      </body>
    </html>
  );
}
