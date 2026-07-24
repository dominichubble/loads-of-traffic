import React from "react";
import { LockKeyhole } from "lucide-react";

const ProjectPortfolio = ({ index }: { index: number }) => {
  return (
    <article className="group relative flex h-[18rem] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/15 bg-primary p-6 text-white shadow-lg transition-transform duration-200 hover:-translate-y-1 xl:h-[24rem] xl:p-8">
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full border-[2.5rem] border-accent/60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-24 h-56 w-56 rounded-full border-[3rem] border-white/[0.05]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
          Engagement 0{index}
        </span>
        <span className="grid h-12 w-12 shrink-0 place-content-center rounded-full border-2 border-white bg-accent text-white shadow-[0_8px_24px_rgba(0,0,79,0.35)] sm:h-14 sm:w-14">
          <LockKeyhole
            className="h-6 w-6 sm:h-7 sm:w-7"
            aria-hidden="true"
            strokeWidth={2.25}
          />
        </span>
      </div>

      <div className="relative z-10">
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
