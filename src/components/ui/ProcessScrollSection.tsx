import { ElementRef, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProcessBackground } from "@/components/backgrounds/ProcessBackground";
import { KineticLabel } from "@/components/typography/KineticLabel";
import { SplitTextReveal } from "@/components/typography/SplitTextReveal";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ProcessStep = {
  step: string;
  body: string;
};

export function ProcessScrollSection({ steps }: { steps: ProcessStep[] }) {
  const sectionRef = useRef<ElementRef<"section">>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Desktop GSAP ScrollTrigger
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)": () => {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: `+=${steps.length * 55}%`,
            pin: ".process-pin",
            scrub: true,
            onUpdate: (self) => setActive(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))),
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [steps.length]);

  // Mobile Viewport-Center Scroll Detection
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 899px)").matches;
    if (!isMobile) return;

    let ticking = false;

    const updateActiveMobileStep = () => {
      let closestIndex = 0;
      let closestDistance = Infinity;
      const viewportCenter = window.innerHeight / 2;

      const cards = document.querySelectorAll(".process-mobile-card");
      
      cards.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = Number((el as HTMLElement).dataset.index);
        }
      });

      setActive(closestIndex);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveMobileStep();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    updateActiveMobileStep();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveMobileStep, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveMobileStep);
    };
  }, [steps.length]);

  return (
    <section id="process" ref={sectionRef} className="relative mx-auto min-h-0 max-w-7xl overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:min-h-screen lg:px-8">
      <ProcessBackground />
      <div className="process-pin grid min-h-0 items-center gap-9 lg:min-h-[78vh] lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
        <div>
          <KineticLabel label="/process" />
          <SplitTextReveal
            text="From idea to live link"
            className="font-display text-glitch-soft mt-4 text-[clamp(1.85rem,8.8vw,2.35rem)] font-black uppercase leading-[1.02] tracking-[-0.015em] text-white sm:text-5xl sm:leading-[0.95] sm:tracking-[-0.04em]"
          />
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/68 sm:mt-6 sm:text-lg sm:leading-8">
            A simple build path from initial direction to a responsive website that is ready to share.
          </p>
          <div className="mt-8 h-px overflow-hidden bg-white/12">
            <span className="block h-full bg-white transition-all duration-300" style={{ width: `${((active + 1) / steps.length) * 100}%` }} />
          </div>
        </div>
        <div className="relative grid gap-4">
          {steps.map((item, index) => {
            const isActive = index === active;
            return (
              <div
                key={item.step}
                data-index={index}
                className={cn(
                  "process-mobile-card border bg-black/76 p-5 transition duration-500 sm:p-6",
                  isActive 
                    ? "translate-x-0 border-white/60 bg-white/[0.03] opacity-100 shadow-[0_0_28px_rgba(255,255,255,0.07)] text-white lg:border-white/45" 
                    : "border-white/15 opacity-60 text-white/55 lg:translate-x-8 lg:opacity-50",
                )}
              >
                <p className={cn("font-mono text-[11px] uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.18em]", isActive ? "text-white" : "text-white/55")}>{item.step}</p>
                <p className={cn("mt-4 text-[15px] leading-7 sm:text-base sm:leading-8", isActive ? "text-white" : "text-white/55")}>{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
