import type { Metadata } from "next";
import Footer from "@/components/footer";
import ServicesContent from "@/components/services-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore the affiliate strategy, competitive intelligence, and growth services Loads of Traffic offers to propel your business forward.",
};

const ServicesPage = () => {
  return (
    <>
      <ServicesContent />
      <Footer />
    </>
  );
};

export default ServicesPage;
