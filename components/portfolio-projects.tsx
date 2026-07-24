import React from "react";
import ProjectPortfolio from "./portfolio-project";

const PortfolioProjects = () => {
  return (
    <ul className="flex flex-col gap-4 sm:flex-row xl:gap-8">
      {[...new Array(3)].map((_, i) => (
        <li key={i} className="w-full">
          <ProjectPortfolio index={i + 1} />
        </li>
      ))}
    </ul>
  );
};

export default PortfolioProjects;
