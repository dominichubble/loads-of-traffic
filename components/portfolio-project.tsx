import React from "react";
import { LockKeyhole } from "lucide-react";

const ProjectPortfolio = ({ index }: { index: number }) => {
  return (
    <article className="group relative flex h-[18rem] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/15 bg-primary p-6 text-white shadow-lg transition-transform duration-200 hover:-translate-y-1 xl:h-[24rem] xl:p-8">
      <div
        className="border-accent/60 absolute -right-16 -top-16 h-48 w-48 rounded-full border-[2.5rem] transition-transform duration-500 group-hover:scale-110"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full border-[3rem] border-white/10"
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
          Engagement 0{index}
        </span>
        <span className="grid h-11 w-11 place-content-center rounded-full border border-white/15 bg-white/10">
          <LockKeyhole className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <div className="relative">
        <p className="text-2xl font-semibold leading-tight tracking-[-0.03em] xl:text-3xl">
          Confidential client work
        </p>
        <p className="mt-3 text-sm text-white/65">
          Strategy, intelligence, and execution protected by NDA.
        </p>
      </div>
    </article>
  );
};

export default ProjectPortfolio;
