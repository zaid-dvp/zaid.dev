import { ReactNode } from "react";
import { motion } from "framer-motion";
import { motionTimings, premiumEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SplitTextRevealProps = {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  by?: "words" | "lines";
  className?: string;
  children?: never;
};

const MotionTag = {
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
  span: motion.span,
};

export function SplitTextReveal({ text, as = "h2", by = "words", className }: SplitTextRevealProps) {
  const Tag = MotionTag[as];
  const parts = by === "lines" ? text.split("\n") : text.split(" ");

  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: motionTimings.staggerTight } } }}
      className={className}
    >
      {parts.map((part, index) => (
        <span key={`${part}-${index}`} className={cn("inline-block overflow-hidden pb-[0.12em] align-bottom", by === "lines" && "block")}>
          <motion.span
            variants={{
              hidden: { y: "108%", opacity: 0, rotateX: 8, filter: "blur(4px)" },
              show: { y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)", transition: { duration: motionTimings.textSlow, ease: premiumEase } },
            }}
            className="inline-block will-change-transform"
          >
            {part}
            {by === "words" && index < parts.length - 1 ? "\u00a0" : null}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

type TextMaskRevealProps = {
  children: ReactNode;
  className?: string;
};

export function TextMaskReveal({ children, className }: TextMaskRevealProps) {
  return (
    <motion.span
      initial={{ clipPath: "inset(0 100% 0 0)", y: 18 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: motionTimings.text, ease: premiumEase }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
}
