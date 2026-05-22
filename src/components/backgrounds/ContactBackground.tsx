import { CodeRainMinimal, RotatingRings } from "@/components/backgrounds/VisualPrimitives";
import { ScrollGhostText } from "@/components/typography/ScrollGhostText";

export function ContactBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <ScrollGhostText text="CONTACT" className="left-[-6vw] top-[4%] opacity-[0.14]" direction="up" />
      <RotatingRings className="opacity-45" />
      <CodeRainMinimal lines={["message.compose()", 'contact.route("/project")', "status.awaiting_input", "reply.available()"]} className="opacity-60" />
      <svg className="absolute bottom-[12%] left-0 h-36 w-full opacity-[0.22]" viewBox="0 0 1200 160" preserveAspectRatio="none">
        <path d="M0 90 C120 20 210 140 330 82 S560 20 690 90 910 146 1030 78 1140 44 1200 86" fill="none" stroke="rgba(255,255,255,0.42)" strokeWidth="1" />
        <path d="M0 112 C160 62 210 124 360 94 S610 42 720 106 940 132 1080 98 1160 76 1200 98" fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth="1" />
      </svg>
      <div className="absolute left-[38%] top-[32%] hidden h-px w-[22%] bg-white/20 lg:block" />
    </div>
  );
}
