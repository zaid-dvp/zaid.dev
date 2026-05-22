import { RotatingRings } from "@/components/backgrounds/VisualPrimitives";
import { ScrollGhostText } from "@/components/typography/ScrollGhostText";

export function PricingBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <ScrollGhostText text="PRICING" className="right-[-6vw] top-[8%] opacity-[0.14]" direction="right" />
      <RotatingRings className="opacity-55" />
      <div className="absolute inset-x-[8%] top-[34%] h-px bg-white/[0.12]" />
      <div className="absolute bottom-[16%] left-[18%] h-32 w-72 border border-white/[0.12] bg-white/[0.03]" />
      <div className="absolute right-[12%] top-[24%] h-44 w-52 border border-white/[0.12] bg-white/[0.03]" />
    </div>
  );
}
