import { motion, useReducedMotion } from "framer-motion";
import { motionTimings, premiumEase } from "@/lib/motion";

const asciiRows = [
  "0101  /build/ui  :: zaid.dev  :: responsive_interface",
  "<main> landing_pages business_websites project_ui redesigns </main>",
  "STACK::REACT/TS/TAILWIND  STATUS::AVAILABLE  MODE::FREELANCE",
  "▓░▓░  wireframe.render()  grid.align()  deploy.ready()",
];

const hudLabels = [
  ["SYSTEM.ACTIVE", "top-[18%] left-[7%]"],
  ["BUILD.MODE: CLIENT_READY", "top-[28%] right-[8%]"],
  ["STACK: REACT / TS / TAILWIND", "bottom-[26%] left-[10%]"],
  ["STATUS: AVAILABLE", "bottom-[18%] right-[12%]"],
  ["VERSION: 1.0.0", "top-[48%] right-[22%]"],
];

export function HeroAsciiBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
      <div className="ascii-grid absolute inset-0 opacity-55" />
      <div className="scanlines absolute inset-0 opacity-35" />
      <div className="noise-overlay absolute inset-0 opacity-70" />
      <div className="dither-pattern absolute right-0 top-0 h-72 w-72 opacity-[0.035] blur-[0.2px]" />
      <div className="dither-pattern absolute bottom-0 left-0 h-80 w-80 opacity-[0.025] blur-[0.2px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 0.08, y: 0 }}
        transition={{ duration: motionTimings.section, delay: 0.35, ease: premiumEase }}
        className="font-display absolute left-1/2 top-[18%] hidden -translate-x-1/2 select-none whitespace-nowrap text-[11vw] font-black uppercase leading-none tracking-[-0.08em] text-white lg:block"
      >
        ZAID.DEV
      </motion.div>

      <motion.div
        animate={reducedMotion ? { x: "0%" } : { x: ["0%", "-8%"] }}
        transition={{ duration: 72, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
        className="absolute left-0 top-[36%] hidden w-[140%] rotate-[-3deg] space-y-5 font-mono text-xs uppercase tracking-[0.28em] text-white/12 md:block"
      >
        {asciiRows.map((row) => (
          <p key={row}>{row} ---- {row}</p>
        ))}
      </motion.div>

      <motion.div
        animate={reducedMotion ? { y: "0%" } : { y: ["-12%", "110%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-transparent via-white/[0.04] to-transparent opacity-35"
      />

      <div className="absolute inset-x-8 top-24 hidden h-px bg-gradient-to-r from-transparent via-white/25 to-transparent sm:block" />
      <div className="absolute inset-y-28 left-8 hidden w-px bg-gradient-to-b from-transparent via-white/18 to-transparent sm:block" />
      <div className="absolute inset-y-28 right-8 hidden w-px bg-gradient-to-b from-transparent via-white/18 to-transparent sm:block" />

      {hudLabels.map(([label, position], index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.72 + index * motionTimings.stagger, duration: motionTimings.text, ease: premiumEase }}
          className={`absolute hidden border border-white/12 bg-black/45 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35 backdrop-blur-sm lg:block ${position}`}
        >
          {label}
        </motion.div>
      ))}

      <div className="corner-frame left-4 top-24 border-l border-t sm:left-8" />
      <div className="corner-frame right-4 top-24 border-r border-t sm:right-8" />
      <div className="corner-frame bottom-20 left-4 border-b border-l sm:left-8" />
      <div className="corner-frame bottom-20 right-4 border-b border-r sm:right-8" />
    </div>
  );
}
