import { CodeRainMinimal, DepthDots, FloatingWireFrames, TerminalLogStrip } from "@/components/backgrounds/VisualPrimitives";
import { ScrollGhostText } from "@/components/typography/ScrollGhostText";

export function IntroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <ScrollGhostText text="BOOT" className="left-[-5vw] top-[8%] opacity-[0.18]" direction="down" />
      <div className="absolute inset-0 scanlines opacity-55" />
      <div className="absolute inset-x-[12%] top-[18%] h-px bg-white/18" />
      <div className="absolute inset-x-[18%] bottom-[18%] h-px bg-white/18" />
      <div className="absolute left-[10%] top-[22%] h-[42%] w-px bg-white/20" />
      <div className="absolute right-[10%] top-[18%] h-[48%] w-px bg-white/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)] opacity-18" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.55),transparent_30%)]" />
      <FloatingWireFrames className="opacity-72" />
      <DepthDots className="opacity-45" />
      <div className="absolute right-6 top-14 flex flex-col items-end gap-2 text-[10px] uppercase tracking-[0.22em] text-white/35">
        <span className="font-mono text-white/40">HOME</span>
        <span className="h-px w-12 bg-white/20" />
        <span className="font-mono text-white/35">CLIENT_MODE</span>
        <span className="font-mono text-white/35">01 / 07</span>
      </div>
      <div className="absolute left-6 top-14 flex flex-col gap-2 text-[10px] uppercase tracking-[0.22em] text-white/35">
        <span className="font-mono text-white/40">SYSTEM</span>
        <span className="font-mono text-white/35">HUD ACTIVE</span>
      </div>
      <CodeRainMinimal
        lines={["boot.sequence()", "portfolio.mount()", "interface.ready()", "scroll.enabled()", "client.mode()"]}
        className="opacity-65"
      />
      <TerminalLogStrip
        lines={["ZAID.DEV", "PORTFOLIO_INTERFACE", "SCROLL_TO_ENTER", "BOOT_READY"]}
        className="bottom-10 inset-x-4 rounded-full border-white/20 bg-black/55 text-white/40 opacity-95"
      />
    </div>
  );
}
