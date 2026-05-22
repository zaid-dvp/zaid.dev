import { CodeRainMinimal, TerminalLogStrip } from "@/components/backgrounds/VisualPrimitives";
import { ScrollGhostText } from "@/components/typography/ScrollGhostText";

export function ProcessBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <ScrollGhostText text="PIPELINE" className="left-[-7vw] top-[8%] opacity-[0.12]" direction="up" />
      <div className="absolute bottom-[12%] left-[14%] top-[12%] w-px bg-white/16">
        <span className="pipeline-fill absolute inset-x-0 top-0 block h-1/2 bg-white/35 shadow-[0_0_24px_rgba(255,255,255,0.25)]" />
      </div>
      {[0, 1, 2, 3].map((item) => (
        <span key={item} className="absolute left-[calc(14%-5px)] h-2.5 w-2.5 border border-white/18 bg-white/15" style={{ top: `${18 + item * 20}%` }} />
      ))}
      <CodeRainMinimal lines={["> requirements.received()", "> sitemap.generated()", "> interface.building()", "> deployment.ready()"]} className="opacity-55" />
      <TerminalLogStrip lines={["DISCUSS", "PLAN", "BUILD", "LAUNCH"]} className="bottom-10 opacity-85" />
    </div>
  );
}
