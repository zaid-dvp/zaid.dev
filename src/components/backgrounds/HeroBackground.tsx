import { CodeRainMinimal, DepthDots, FloatingWireFrames } from "@/components/backgrounds/VisualPrimitives";
import { ScrollGhostText } from "@/components/typography/ScrollGhostText";

export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <ScrollGhostText text="ZAID.DEV" className="left-[-4vw] top-[10%] opacity-[0.14]" direction="left" />
      <div className="absolute inset-0 opacity-30 scanlines" />
      <div className="absolute inset-0 opacity-70 bg-[linear-gradient(90deg,transparent_0_22%,rgba(255,255,255,0.12)_22.1%,transparent_22.35%,transparent_78%,rgba(255,255,255,0.08)_78.1%,transparent_78.35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_22%)] opacity-20" />
      <FloatingWireFrames className="opacity-60" />
      <DepthDots className="opacity-36" />
      <CodeRainMinimal lines={["BUILD", "INTERFACE", "CLIENT_READY", "REACT", "DEPLOY", "RESPONSIVE.UI"]} className="opacity-55" />
      <span className="absolute left-8 top-28 h-16 w-16 border-l border-t border-white/16" />
      <span className="absolute bottom-16 right-8 h-20 w-20 border-b border-r border-white/16" />
    </div>
  );
}
