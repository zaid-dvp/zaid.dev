import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { motionTimings, premiumEase } from "@/lib/motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GlowingCard } from "@/components/glowing-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextScramble } from "@/components/ui/text-scramble";

export type ProjectQueueItem = {
  name: string;
  title: string;
  type: string;
  flag: string;
};

function Wireframe() {
  return (
    <div className="mt-6 border border-white/12 p-3">
      <div className="mb-3 flex gap-2">
        <span className="h-2 w-2 rounded-full bg-white/70" />
        <span className="h-2 w-2 rounded-full bg-white/30" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
      </div>
      <div className="grid gap-2">
        <div className="h-10 border border-white/12 bg-white/[0.04]" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-16 border border-white/12 bg-white/[0.03]" />
          <div className="h-16 border border-white/12 bg-white/[0.03]" />
          <div className="h-16 border border-white/12 bg-white/[0.03]" />
        </div>
        <div className="h-3 w-3/4 bg-white/20" />
        <div className="h-3 w-1/2 bg-white/10" />
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  active = false,
}: {
  project: ProjectQueueItem;
  active?: boolean;
}) {
  const typeValue = project.type
    .replace("Small ", "")
    .replace("Product / Service ", "")
    .replace("Student / Startup Project ", "");

  return (
    <GlowingCard
      className={`h-full min-h-[29rem] p-5 transition-opacity duration-300 ${
        active ? "border-white/45 opacity-100" : "opacity-75"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="border border-white/14 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-300">
          Building Soon
        </span>
        <span className="font-mono text-xs text-neutral-600">queue.item</span>
      </div>

      <Wireframe />

      <div className="mt-7">
        <h3 className="font-display text-3xl font-bold uppercase tracking-[-0.04em] text-white">{project.title}</h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500">
          {project.type}
        </p>
      </div>

      <pre className="mt-6 max-w-full overflow-hidden whitespace-pre-wrap break-words border-t border-white/12 pt-5 font-mono text-[13px] leading-7 text-neutral-400">
{`export const ${project.name} = {
  type: "${typeValue}",
  status: "Coming Soon",
  ${project.flag}: true
}`}
      </pre>
    </GlowingCard>
  );
}

export function ProjectShowcaseSlider({ projects }: { projects: ProjectQueueItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? projects.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === projects.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <p className="font-mono text-sm text-neutral-500">&gt; queue.render(upcoming_work)</p>
          <p className="font-body mt-4 max-w-xl text-sm leading-7 text-white/60">
            No fake case studies. These cards are an intentional build queue for
            upcoming website samples and client-ready demos.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <MagneticButton
              type="button"
              onClick={goToPrevious}
              aria-label="Show previous project card"
              className="h-12 w-12 px-0"
            >
              <ArrowLeft size={17} />
            </MagneticButton>
            <MagneticButton
              type="button"
              onClick={goToNext}
              aria-label="Show next project card"
              className="h-12 w-12 px-0"
            >
              <ArrowRight size={17} />
            </MagneticButton>
            <MagneticButton href="#contact" className="bg-white text-black hover:bg-black hover:text-white">
              <TextScramble text="START PROJECT" />
              <ArrowRight size={16} />
            </MagneticButton>
          </div>

          <div className="mt-8 flex gap-2" aria-label="Project slide progress">
            {projects.map((project, index) => (
              <button
                key={project.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${project.title}`}
                className={`h-1.5 flex-1 border border-white/12 transition-colors ${
                  index === activeIndex ? "bg-white" : "bg-white/10 hover:bg-white/35"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative min-h-[31rem] overflow-hidden border border-white/10 bg-white/[0.015] p-3 sm:p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.name}
              initial={{ opacity: 0, x: 64, scale: 0.98, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -42, scale: 0.99, filter: "blur(4px)" }}
              transition={{ duration: motionTimings.text, ease: premiumEase }}
              className="h-full"
            >
              <ProjectCard project={activeProject} active />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, index) => (
          <button
            key={project.name}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`border px-4 py-3 text-left transition ${
              index === activeIndex
                ? "border-white bg-white text-black"
                : "border-white/14 bg-black text-neutral-400 hover:border-white/45 hover:text-white"
            }`}
          >
            <span className="block font-mono text-[11px] uppercase tracking-[0.18em]">
              0{index + 1} / Building Soon
            </span>
            <span className="font-display mt-2 block text-sm font-bold uppercase tracking-[-0.02em]">{project.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
