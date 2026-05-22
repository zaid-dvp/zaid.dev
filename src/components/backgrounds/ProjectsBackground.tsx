import { DepthDots, FloatingWireFrames, TerminalLogStrip } from "@/components/backgrounds/VisualPrimitives";
import { ScrollGhostText } from "@/components/typography/ScrollGhostText";

export function ProjectsBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <ScrollGhostText text="BUILD QUEUE" className="left-[-8vw] top-[2%] opacity-[0.14]" direction="left" />
      <div className="absolute inset-x-[-10%] bottom-[-22%] h-[58%] origin-bottom bg-[linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.48] [transform:perspective(700px)_rotateX(64deg)]" />
      <div className="absolute inset-x-[-5%] bottom-[-20%] h-[60%] origin-bottom bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:144px_144px] opacity-[0.35] [transform:perspective(700px)_rotateX(64deg)]" />
      <span className="absolute left-[14%] top-[18%] h-[38%] w-[30%] border border-white/14" />
      <FloatingWireFrames className="opacity-55" />
      <DepthDots className="opacity-40" />
      <TerminalLogStrip lines={["SELECTED WORK", "COMING SOON", "RESPONSIVE TRUE", "DEMO QUEUE"]} className="top-28 opacity-90" />
    </div>
  );
}
