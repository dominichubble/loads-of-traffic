import React from "react";
import ProjectPortfolio from "./portfolio-project";

const PortfolioProjects = () => {
  return (
    <ul className="flex flex-col gap-[1rem] sm:flex-row xl:gap-[2rem]">
      {[...new Array(3)].map((_, i) => (
        <li key={i} className="w-full">
          <ProjectPortfolio />
        </li>
      ))}
    </ul>
  );
};

export default PortfolioProjects;
