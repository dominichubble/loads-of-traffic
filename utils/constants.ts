import { AboutFeatureType, servicesSectionContentType } from "@/types";
import lottieJsonExpansion from "../public/lottie/opportunities.json";
import lottieJsonScale from "../public/lottie/scale.json";
import lottieJsonStructuring from "../public/lottie/optimisation.json";
import lottieJsonRepositioning from "../public/lottie/execution.json";

export const servicesSectionContent: servicesSectionContentType[] = [
  {
    title: "Market Analysis",
    kicker: "The scan",
    ctaLabel: "Request a scan",
    readMoreLink: "/services#1",
    titleStyle: "solid",
    bullets: "dot",
    cta: "white",
    description: [
      "Uncover insights with in-depth competitor research.",
      "Decode industry trends to sharpen your strategy.",
      "Empower decisions with actionable market intelligence.",
    ],
  },
  {
    title: "Data Driven",
    kicker: "The numbers",
    ctaLabel: "See the numbers",
    readMoreLink: "/services#3",
    titleStyle: "outline",
    bullets: "rule",
    cta: "white",
    description: [
      "Harness analytics to fuel smarter decisions.",
      "Optimise campaigns with precise performance data.",
      "Stay ahead with metrics that truly matter.",
    ],
  },
  {
    title: "Affiliate Marketing",
    kicker: "The method",
    ctaLabel: "See the method",
    readMoreLink: "/services#4",
    titleStyle: "solid",
    bullets: "index",
    cta: "yellow",
    description: [
      "Build strategic partnerships that drive revenue.",
      "Manage and grow affiliate programs seamlessly.",
      "Maximise ROI with targeted affiliate campaigns.",
    ],
  },
  {
    title: "Business Growth",
    kicker: "The next market",
    ctaLabel: "Plan the next market",
    readMoreLink: "/services#2",
    titleStyle: "solid",
    bullets: "dot",
    cta: "navy",
    description: [
      "Unlock new markets and untapped opportunities.",
      "Elevate your brand with tailored strategies.",
      "Achieve sustainable growth and long-term success.",
    ],
  },
];

export const servicesAccordionsContent = [
  {
    title: "Competitor Intelligence",
    lede: "See how rivals win traffic — and where they are exposed.",
    description: `Stay ahead with deep insights into competitor strategies, strengths, and weaknesses. Our tailored analysis equips you to make informed decisions, seize opportunities, and dominate your market with confidence.`,
  },
  {
    title: "Market Penetration Services",
    lede: "Enter a new market, or deepen the one you already have.",
    description: `Break into new markets or strengthen your presence with expert guidance. We analyse trends, assess competition, and create targeted strategies to help you navigate challenges and unlock untapped growth potential.`,
  },
  {
    title: "Consultancy Services",
    lede: "A marketing plan built around your KPIs, not a generic playbook.",
    description: `Achieve your business goals with tailored marketing plans crafted around your KPIs. Our strategies focus on sustainable growth, building genuine audience connections, and fostering long-term brand loyalty in competitive landscapes.`,
  },
  {
    title: "Digital Marketing Agency Services",
    lede: "Affiliate, display, SEO, PPC — campaigns measured on ROI.",
    description: `Maximise results with expert affiliate and display management, SEO, PPC, and more. Our tailored campaigns drive quality traffic, boost engagement, and deliver measurable ROI to elevate your digital presence.`,
  },
];

export const benefitsSectionContent = [
  {
    title: "Opportunities",
    lottieJson: lottieJsonExpansion,
  },
  {
    title: "Execution",
    lottieJson: lottieJsonRepositioning,
  },
  {
    title: "Optimisation",
    lottieJson: lottieJsonStructuring,
  },
  {
    title: "Scale",
    lottieJson: lottieJsonScale,
  },
];

export const AboutFeaturesItems: AboutFeatureType[] = [
  {
    title: "Confidentiality",
    description:
      "We prioritise your privacy and ensure your sensitive information is always protected",
  },

  {
    title: "Creativity",
    description:
      "Our innovative approach transforms ideas into captivating designs that stand out",
  },

  {
    title: "Commitment",
    description:
      "We deliver on time, every time, with unwavering dedication to excellence",
  },
];

export const NAV_ITEMS = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About Us",
    link: "/about",
  },
  {
    label: "Services",
    link: "/services",
  },
  {
    label: "Contact",
    link: "/contact",
  },
];
