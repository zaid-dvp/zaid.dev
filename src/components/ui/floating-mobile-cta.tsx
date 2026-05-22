import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { premiumEase, motionTimings } from "@/lib/motion";

interface FloatingMobileCTAProps {
  contactUrl?: string;
  showAfterScroll?: boolean;
}

export function FloatingMobileCTA({ 
  contactUrl = "#contact",
  showAfterScroll = true 
}: FloatingMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(!showAfterScroll);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!showAfterScroll) return;

    const handleScroll = () => {
      // Show after scrolling down a bit
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterScroll]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: motionTimings.text, ease: premiumEase }}
          className="fixed bottom-6 left-6 right-6 z-40 flex justify-center lg:hidden"
        >
          <motion.a
            href={contactUrl}
            className="group relative inline-flex items-center gap-2 border border-white/30 bg-black/80 px-5 py-3 font-mono text-sm uppercase tracking-[0.12em] text-white backdrop-blur-sm transition hover:border-white hover:bg-black"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle size={16} />
            <span className="font-semibold">Get Started</span>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : 0 }}
              transition={{ duration: 0.3, ease: premiumEase }}
              className="absolute inset-0 -z-10 border border-white/50 opacity-0 group-hover:opacity-100"
            />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
