export type HomeSlideBullet = "dot" | "index" | "rule";
export type HomeSlideTitle = "solid" | "outline";
export type HomeSlideCta = "white" | "yellow" | "navy";

export type servicesSectionContentType = {
  title: string;
  kicker: string;
  ctaLabel: string;
  description: string[];
  readMoreLink: string;
  titleStyle: HomeSlideTitle;
  bullets: HomeSlideBullet;
  cta: HomeSlideCta;
};

export type AboutFeatureType = {
  title: string;
  description: string;
};
