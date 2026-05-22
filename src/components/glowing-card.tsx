import { ReactNode } from "react";
import { motion } from "framer-motion";
import { motionTimings, premiumEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

type GlowingCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlowingCard({ children, className }: GlowingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3, rotateX: 0.6, rotateY: -0.6 }}
      transition={{ duration: motionTimings.hover, ease: premiumEase }}
      className={cn(
        "group relative overflow-hidden border border-white/14 bg-black/72 backdrop-blur transition-colors duration-300 ease-out hover:border-white/40 hover:shadow-[0_18px_54px_rgba(0,0,0,0.42)]",
        className,
      )}
    >
      <span className="absolute right-0 top-0 h-px w-16 origin-right scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100" />
      <span className="absolute right-0 top-0 h-16 w-px origin-top scale-y-0 bg-white transition-transform duration-500 group-hover:scale-y-100" />
      {children}
    </motion.div>
  );
}
