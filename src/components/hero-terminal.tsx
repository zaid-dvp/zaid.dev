import { motion } from "framer-motion";
import { motionTimings, premiumEase } from "@/lib/motion";

const services = [
  "landing_pages",
  "business_websites",
  "student_project_ui",
  "redesigns",
];

const diagnostics = [
  ["UI_BUILD", "w-[72%]"],
  ["RESPONSIVE", "w-[88%]"],
  ["DEPLOY_READY", "w-[78%]"],
];

function DiagnosticRow({ label, width }: { label: string; width: string }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-white/55">
      <span>{label}</span>
      <div className="h-2 border border-white/14 bg-white/[0.035]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.35, delay: 0.72, ease: premiumEase }}
          className={`${width} h-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.18)]`}
        />
      </div>
    </div>
  );
}

export function HeroTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 64, rotate: 0.8, filter: "blur(8px)" }}
      animate={{ opacity: 1, x: 0, rotate: 0, filter: "blur(0px)" }}
      transition={{ duration: motionTimings.card, delay: 0.32, ease: premiumEase }}
      className="relative hidden w-full overflow-hidden border border-white/16 bg-black/78 shadow-[0_0_54px_rgba(255,255,255,0.09)] backdrop-blur lg:block"
    >
      <div className="absolute inset-x-8 top-0 h-px bg-white shadow-[0_0_28px_rgba(255,255,255,0.95)]" />
      <div className="flex items-center justify-between border-b border-white/12 px-4 py-3 font-mono text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border border-white/35" />
          <span className="h-2.5 w-2.5 rounded-full border border-white/25" />
          <span className="h-2.5 w-2.5 rounded-full border border-white/20" />
        </div>
        <span>ZAID_INTERFACE</span>
      </div>
      <div className="p-6">
        <div className="grid gap-2 border-b border-white/12 pb-5 font-mono text-sm uppercase tracking-[0.16em] text-white/60">
          <p><span className="text-white/30">STATUS:</span> <span className="text-white">AVAILABLE</span></p>
          <p><span className="text-white/30">MODE:</span> FREELANCE</p>
          <p><span className="text-white/30">STACK:</span> REACT / TS / TAILWIND</p>
          <p><span className="text-white/30">NODE:</span> PAK_REMOTE</p>
        </div>

        <div className="mt-6 grid gap-4">
          {diagnostics.map(([label, width]) => (
            <DiagnosticRow key={label} label={label} width={width} />
          ))}
        </div>

        <div className="mt-7 border border-white/12 p-4">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-white/35">SERVICES:</p>
          <div className="grid gap-2 font-mono text-sm text-white/65">
            {services.map((service, index) => (
              <motion.p
                key={service}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: motionTimings.text, delay: 0.92 + index * motionTimings.staggerTight, ease: premiumEase }}
              >
                &gt; {service}
              </motion.p>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {[42, 64, 88, 51, 77, 69].map((value, index) => (
            <div key={`${value}-${index}`} className="h-16 border border-white/10 bg-white/[0.025] p-2">
              <div className="h-full border-l border-white/20" style={{ width: `${value}%` }} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
