import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "@/libs/lenis";
import ScrollToTop from "@/components/scroll-to-top";
import CustomCursor from "@/components/custom-cursor";
import CustomCursorContextProvider from "@/contexts/custom-cursor-context";
import MobileHeader from "@/components/mobile-header";
import Preloader from "@/components/preloader";
import Script from "next/script"; //

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Loads of Traffic",
  description: "Loads Of Traffic is a digital marketing agency focused on affiliate strategy, competitive intelligence, and growth for the e-gaming and consumer sectors.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
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

        <ReactLenis root>
          <Preloader />
          <CustomCursorContextProvider>
            <CustomCursor />
            <ScrollToTop>
              <MobileHeader />
              {children}
            </ScrollToTop>
            <div className="pointer-events-none fixed inset-0 z-[9999] h-screen w-full grid-cols-[55%_1fr] sm:grid">
              <div className="transition-left origin-top scale-y-0 bg-red"></div>
              <div className="transition-right origin-bottom scale-y-0 bg-red"></div>
            </div>
          </CustomCursorContextProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
