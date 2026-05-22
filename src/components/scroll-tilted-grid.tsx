import { motion } from "framer-motion";
import { GlowingCard } from "@/components/glowing-card";
import { motionTimings, premiumEase } from "@/lib/motion";

const panels = [
  ["landing.page", "hero", "cta", "responsive"],
  ["business.site", "services", "contact", "deploy"],
  ["fyp.frontend", "dashboard", "auth", "demo"],
  ["redesign.ui", "layout", "mobile", "polish"],
];

export function ScrollTiltedGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {panels.map((panel, index) => (
        <motion.div
          key={panel[0]}
          initial={{ opacity: 0, y: 42, rotate: index % 2 ? 0.7 : -0.7, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ delay: index * motionTimings.stagger, duration: motionTimings.card, ease: premiumEase }}
        >
          <GlowingCard className="p-4">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-xs text-neutral-500">{panel[0]}</span>
              <span className="h-2 w-2 bg-white/70" />
            </div>
            <div className="space-y-2">
              {panel.slice(1).map((line, lineIndex) => (
                <div key={line} className="flex items-center gap-3 font-mono text-xs text-neutral-400">
                  <span className="text-neutral-700">0{lineIndex + 1}</span>
                  <span className="h-px flex-1 bg-white/12" />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </GlowingCard>
        </motion.div>
      ))}
    </div>
  );
}
