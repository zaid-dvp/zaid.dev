import { FloatingWireFrames } from "@/components/backgrounds/VisualPrimitives";
import { ScrollGhostText } from "@/components/typography/ScrollGhostText";

export function ServicesBackground({ activeWord = "LANDING" }: { activeWord?: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <ScrollGhostText text={activeWord} className="right-[-8vw] top-[14%] max-w-none opacity-[0.12]" direction="right" />
      <FloatingWireFrames className="opacity-60" />
      <div className="absolute inset-y-0 left-[42%] w-px bg-white/12" />
      <div className="absolute left-[6%] right-[8%] top-[24%] h-px bg-white/12" />
      <div className="absolute bottom-[18%] left-[10%] right-[16%] h-px bg-white/12" />
      {['LANDING', 'BUSINESS', 'FRONTEND', 'REDESIGN'].map((word, index) => (
        <span key={word} className="service-word-drift absolute font-mono text-[10px] uppercase tracking-[0.3em] text-white/18" style={{ left: `${11 + index * 22}%`, top: `${18 + (index % 2) * 58}%`, animationDelay: `${index * -1.3}s` }}>
          {word}
        </span>
      ))}
    </div>
  );
}
