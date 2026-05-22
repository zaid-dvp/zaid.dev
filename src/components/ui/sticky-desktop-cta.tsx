import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { MagneticButton } from "./magnetic-button";
import { TextScramble } from "./text-scramble";
import { premiumEase, motionTimings } from "@/lib/motion";

interface StickyDesktopCTAProps {
  triggerElementId?: string;
}

export function StickyDesktopCTA({ triggerElementId = "home" }: StickyDesktopCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerElement = document.getElementById(triggerElementId);
      if (!triggerElement) return;

      const rect = triggerElement.getBoundingClientRect();
      // Show when hero section is no longer visible (scrolled past it)
      setIsVisible(rect.bottom < 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [triggerElementId]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: motionTimings.text, ease: premiumEase }}
          className="fixed bottom-8 right-8 z-40 hidden lg:block"
        >
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                AVAILABLE FOR PROJECTS
              </span>
              <div className="h-px w-16 bg-gradient-to-r from-white/0 via-white/60 to-white" />
            </div>
            <MagneticButton 
              href="#contact" 
              className="bg-white text-black hover:bg-black hover:text-white hover:border-white"
            >
              <TextScramble text="START PROJECT" />
              <Send size={16} />
            </MagneticButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
