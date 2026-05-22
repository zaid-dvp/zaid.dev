import { ElementRef, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: "home", label: "HOME" },
  { id: "services", label: "SERVICES" },
  { id: "process", label: "PROCESS" },
  { id: "projects", label: "PROJECTS" },
  { id: "stack", label: "STACK" },
  { id: "pricing", label: "PRICING" },
  { id: "contact", label: "CONTACT" },
];

export function ScrollProgressHud() {
  const barRef = useRef<ElementRef<"span"> | null>(null);
  const activeIdRef = useRef(sections[0].id);
  const [active, setActive] = useState(sections[0]);

  useEffect(() => {
    const updateActiveSection = () => {
      const viewportCenter = window.innerHeight / 2;
      const closest = sections
        .map((section) => {
          const element = document.getElementById(section.id);
          if (!element) return { section, distance: Number.POSITIVE_INFINITY };
          const rect = element.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const containsCenter = rect.top <= viewportCenter && rect.bottom >= viewportCenter;
          return {
            section,
            distance: containsCenter ? 0 : Math.abs(center - viewportCenter),
          };
        })
        .sort((a, b) => a.distance - b.distance)[0]?.section;

      if (closest && closest.id !== activeIdRef.current) {
        activeIdRef.current = closest.id;
        setActive(closest);
      }
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(barRef.current, {
            scaleY: self.progress,
            duration: 0.34,
            ease: "power3.out",
            overwrite: true,
          });
          updateActiveSection();
        },
      });
    });

    updateActiveSection();
    window.setTimeout(updateActiveSection, 120);
    window.setTimeout(updateActiveSection, 520);
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      ctx.revert();
    };
  }, []);

  return (
    <aside className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-3 opacity-70 lg:flex">
      <div className="flex flex-col items-end gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/32">
        <span>{active.label}</span>
        <span>{String(sections.findIndex((item) => item.id === active.id) + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}</span>
      </div>
      <div className="relative h-36 w-px overflow-hidden bg-white/10">
        <span ref={barRef} className="absolute inset-x-0 top-0 block h-full origin-top scale-y-0 bg-white shadow-[0_0_12px_rgba(255,255,255,0.35)]" />
      </div>
    </aside>
  );
}
