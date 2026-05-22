import { TerminalLogStrip } from "@/components/backgrounds/VisualPrimitives";
import { ScrollGhostText } from "@/components/typography/ScrollGhostText";

export function FooterBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <ScrollGhostText text="ZAID.DEV" className="left-[-5vw] top-[2%] opacity-[0.16]" direction="up" />
      <TerminalLogStrip lines={["WEB DEVELOPMENT", "RESPONSIVE DESIGN", "LANDING PAGES", "BUSINESS WEBSITES", "DEPLOYMENT SUPPORT"]} className="bottom-0 opacity-80" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
      <div className="absolute bottom-8 right-8 h-28 w-28 border-b border-r border-white/14" />
    </div>
  );
}
