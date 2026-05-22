import { ElementRef, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ScrollGhostTextProps = {
  text: string;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
};

export function ScrollGhostText({ text, className, direction = "up" }: ScrollGhostTextProps) {
  const ref = useRef<ElementRef<"div">>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const axis = direction === "left" || direction === "right" ? "xPercent" : "yPercent";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const distance = direction === "down" || direction === "right" ? 9 : -9;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { [axis]: -distance * 0.45 },
        {
          [axis]: distance,
          ease: "none",
          scrollTrigger: {
            trigger: element.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        },
      );
    }, element);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute select-none font-display text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-transparent opacity-[0.14] [-webkit-text-stroke:1px_rgba(255,255,255,0.42)]",
        className,
      )}
    >
      {text}
    </div>
  );
}
