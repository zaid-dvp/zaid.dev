import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { motionTimings, premiumEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

type KineticLabelProps = {
  label: string;
  className?: string;
};

export function KineticLabel({ label, className }: KineticLabelProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: motionTimings.text, ease: premiumEase }}
      className={cn("font-mono text-[11px] uppercase tracking-[0.2em] text-white/45 sm:text-xs sm:tracking-[0.28em]", className)}
    >
      <TextScramble text={label} />
    </motion.p>
  );
}
