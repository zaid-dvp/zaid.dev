import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { FooterBackground } from "@/components/backgrounds/FooterBackground";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextScramble } from "@/components/ui/text-scramble";
import { SplitTextReveal } from "@/components/typography/SplitTextReveal";
import { motionTimings } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  ["Start a Project", "#contact"],
  ["Email Me", "mailto:hello@example.com"],
  ["WhatsApp", "https://wa.me/000000000000"],
  ["GitHub", "https://github.com/placeholder"],
  ["LinkedIn", "https://linkedin.com/in/placeholder"],
  ["Back to Top", "#home"],
];

export function CinematicFooter() {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-giant",
        { yPercent: 18, opacity: 0.12 },
        {
          yPercent: -8,
          opacity: 0.28,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.8,
          },
        },
      );

      gsap.fromTo(
        ".footer-reveal",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: motionTimings.stagger,
          duration: motionTimings.text,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 72%",
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={ref} className="relative z-10 overflow-hidden border-t border-white/12 bg-black px-4 py-24 sm:px-6 lg:px-8">
      <FooterBackground />
      <div className="footer-giant text-stroke-soft font-display pointer-events-none absolute inset-x-0 top-0 select-none text-center text-[22vw] font-black uppercase leading-none tracking-[-0.08em] opacity-70">
        ZAID
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="footer-reveal mb-12 grid gap-3 border border-white/8 bg-black/50 p-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/32 sm:grid-cols-4">
          {["status.ready", "mode.remote", "focus.frontend", "handoff.clean"].map((item) => (
            <span key={item} className="border border-white/8 px-3 py-2">
              {item}
            </span>
          ))}
        </div>
        <p className="footer-reveal font-mono text-xs uppercase tracking-[0.24em] text-neutral-500">
          WEB DEVELOPMENT ✦ RESPONSIVE DESIGN ✦ LANDING PAGES ✦ BUSINESS WEBSITES ✦ PROJECT UI ✦ DEPLOYMENT SUPPORT
        </p>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <SplitTextReveal
              text="Ready to build something clean?"
              className="footer-reveal font-display text-glitch-soft max-w-4xl text-[2.75rem] font-black uppercase leading-[0.92] tracking-[-0.055em] text-white sm:text-6xl"
            />
            <p className="footer-reveal font-body mt-7 max-w-xl text-base leading-8 text-white/68">
              Send the idea, the goal, or even the rough version. I&apos;ll help turn it into a clear website plan.
            </p>
          </div>
          <div className="footer-reveal grid gap-3 sm:grid-cols-2">
            {footerLinks.map(([label, href]) => (
              <MagneticButton
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="justify-between"
              >
                <TextScramble text={label} />
                <ArrowUpRight size={15} />
              </MagneticButton>
            ))}
          </div>
        </div>
        <div className="footer-reveal mt-16 flex flex-col gap-3 border-t border-white/12 pt-6 font-mono text-xs text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <span>Zaid Rasool / Web Developer</span>
          <span>© 2026 Zaid Rasool. Built with care, code, and modern web tools.</span>
        </div>
      </div>
    </footer>
  );
}
