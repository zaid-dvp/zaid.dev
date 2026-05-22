import { motion } from "framer-motion";
import { premiumEase } from "@/lib/motion";

interface FreelanceStatusBadgeProps {
  animated?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function FreelanceStatusBadge({ 
  animated = true,
  size = "md",
  className = ""
}: FreelanceStatusBadgeProps) {
  const sizeClasses = {
    sm: "px-2.5 py-1.5 text-[10px] gap-1.5",
    md: "px-3 py-2 text-xs gap-2",
    lg: "px-4 py-2.5 text-sm gap-2.5"
  };

  const dotSize = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5"
  };

  const content = (
    <div className={`inline-flex items-center border border-white/20 bg-black/50 font-mono uppercase tracking-[0.12em] text-white/70 transition hover:border-white hover:text-white/90 ${sizeClasses[size]} ${className}`}>
      <motion.div
        className={`rounded-full bg-white/60 ${dotSize[size]}`}
        animate={animated ? { scale: [1, 1.2, 1] } : undefined}
        transition={animated ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : undefined}
      />
      <span>Available for freelance</span>
    </div>
  );

  return content;
}
