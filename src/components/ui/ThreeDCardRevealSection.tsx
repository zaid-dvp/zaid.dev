import { ElementRef, ReactNode, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectsBackground } from "@/components/backgrounds/ProjectsBackground";
import { ServicesBackground } from "@/components/backgrounds/ServicesBackground";
import { KineticLabel } from "@/components/typography/KineticLabel";
import { SplitTextReveal } from "@/components/typography/SplitTextReveal";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type RevealCard = {
  title: string;
  description?: string;
  type?: string;
  status?: string;
  tags?: string[];
  code?: string;
  meta?: [string, string][];
};

type ThreeDCardRevealSectionProps = {
  id?: string;
  label: string;
  title: string;
  subtitle?: string;
  cards: RevealCard[];
  mode?: "services" | "projects";
  cta?: ReactNode;
};

const nextState = {
  autoAlpha: 0,
  x: 84,
  y: 64,
  z: -300,
  rotateX: 12,
  rotateY: -22,
  scale: 0.86,
  filter: "blur(8px)",
};

export function ThreeDCardRevealSection({
  id,
  label,
  title,
  subtitle,
  cards,
  mode = "services",
  cta,
}: ThreeDCardRevealSectionProps) {
  const sectionRef = useRef<ElementRef<"section">>(null);
  const pinRef = useRef<ElementRef<"div">>(null);
  const carouselRef = useRef<ElementRef<"div">>(null);
  const cardRefs = useRef<Array<ElementRef<"article"> | null>>([]);
  const [active, setActive] = useState(0);

  const handleCardMove = (event: PointerEvent<HTMLElement>, index: number) => {
    if (index !== active || window.matchMedia("(pointer: coarse)").matches) return;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    target.style.setProperty("--tilt-y", `${x * 3.2}deg`);
    target.style.setProperty("--tilt-x", `${y * -2.4}deg`);
    target.style.setProperty("--sheen-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--sheen-y", `${event.clientY - rect.top}px`);
  };

  const handleCardLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
  };

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)": () => {
          const timeline = gsap.timeline({
            defaults: { ease: "power3.out", duration: 1.28 },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${cards.length * 110}%`,
              pin,
              scrub: 1.35,
              invalidateOnRefresh: true,
              onUpdate: (self) => setActive(Math.min(cards.length - 1, Math.floor(self.progress * cards.length))),
            },
          });

          gsap.set(cardRefs.current, nextState);
          gsap.set(cardRefs.current[0], {
            autoAlpha: 1,
            x: 0,
            y: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            filter: "blur(0px)",
          });

          cards.forEach((_, index) => {
            const card = cardRefs.current[index];
            const previous = cardRefs.current[index - 1];

            if (previous) {
              timeline.to(
                previous,
                {
                  autoAlpha: 0.26,
                  x: -116,
                  y: -22 - index * 6,
                  z: -210 - index * 20,
                  rotateX: 4,
                  rotateY: 14,
                  scale: 0.9,
                  filter: "blur(1.2px)",
                },
                index,
              );
            }

            timeline.to(
              card,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                z: 0,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                filter: "blur(0px)",
              },
              index,
            );

            const scanLine = card?.querySelector(".card-scan");
            if (scanLine) {
              timeline.fromTo(
                scanLine,
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 0.45, duration: 0.72, ease: "power3.out" },
                index + 0.12,
              );
            }

            timeline.to({}, { duration: 0.58 });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [cards]);

  useEffect(() => {
    const container = carouselRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.matchMedia("(min-width: 900px)").matches) {
            ticking = false;
            return;
          }
          
          const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;
          let closestIndex = 0;
          let minDistance = Infinity;
          
          cardRefs.current.forEach((card, index) => {
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distance = Math.abs(cardCenter - containerCenter);
            
            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = index;
            }
          });
          
          setActive(closestIndex);
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    
    // Initial check for mobile on mount
    if (window.matchMedia("(max-width: 899px)").matches) {
      onScroll();
    }

    // Bug Fix: Recalculate active index dynamically on vertical scroll.
    // This fixes the issue where iOS/mobile browsers reset scrollLeft but 
    // IntersectionObserver thresholds weren't fully crossed.
    const handleGlobalScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      // Only recalculate if the section is actually in the viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        onScroll();
      }
    };

    if (mode === "services") {
      window.addEventListener("scroll", handleGlobalScroll, { passive: true });
    }

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", handleGlobalScroll);
    };
  }, [cards.length, mode]);

  return (
    <section id={id} ref={sectionRef} className="relative mx-auto min-h-0 max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:min-h-screen lg:px-8">
      {mode === "projects" ? <ProjectsBackground /> : <ServicesBackground activeWord={cards[active]?.title} />}
      <div ref={pinRef} className="grid min-h-0 items-center gap-9 py-0 sm:gap-12 lg:min-h-screen lg:grid-cols-[0.78fr_1.22fr] lg:gap-14 lg:py-12">
        <div className="relative z-10 max-w-xl">
          <KineticLabel label={label} />
          <SplitTextReveal
            text={title}
            className="font-display text-glitch-soft mt-4 text-[clamp(1.85rem,8.8vw,2.35rem)] font-black uppercase leading-[1.02] tracking-[-0.015em] text-white sm:text-5xl sm:leading-[0.95] sm:tracking-[-0.04em]"
          />
          {subtitle ? <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/68 sm:mt-6 sm:text-lg sm:leading-8">{subtitle}</p> : null}
          <div className="mt-7 lg:hidden font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 sm:mt-8">
            Swipe to browse
          </div>
          <div className="mt-3 lg:mt-7 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45 lg:sm:mt-8 sm:text-xs sm:tracking-[0.18em]">
            <span>{String(active + 1).padStart(2, "0")}</span>
            <div className="h-px flex-1 overflow-hidden bg-white/12">
              <span className="block h-full bg-white transition-all duration-300" style={{ width: `${((active + 1) / cards.length) * 100}%` }} />
            </div>
            <span>{String(cards.length).padStart(2, "0")}</span>
          </div>

          {cta ? <div className="mt-8">{cta}</div> : null}
        </div>

        <div 
          ref={carouselRef}
          className="three-d-stage relative min-h-0 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 -mx-4 px-4 pb-8 lg:block lg:overflow-visible lg:gap-0 lg:snap-none lg:mx-0 lg:px-0 lg:pb-0 lg:min-h-[620px]"
        >
          {cards.map((card, index) => (
            <article
              key={card.title}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              onPointerMove={(event) => handleCardMove(event, index)}
              onPointerLeave={handleCardLeave}
              className={cn(
                "three-d-card group lg:absolute lg:inset-0 lg:m-auto lg:h-fit lg:w-[min(540px,42vw)]",
                "shrink-0 snap-center w-[86vw] max-w-[420px] transition-all duration-500 lg:w-auto lg:max-w-none lg:shrink lg:snap-align-none",
                "border border-white/18 p-6 shadow-[0_0_38px_rgba(255,255,255,0.055)] backdrop-blur-xl sm:p-8 lg:mb-0 lg:p-8",
                mode === "projects" ? "bg-black/84" : "bg-black/82",
                index === active && "is-active",
                index !== active ? "opacity-65 scale-[0.96] lg:opacity-100 lg:scale-100" : "opacity-100 scale-100"
              )}
            >
              <div className="card-sheen pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="card-scan pointer-events-none absolute left-0 right-0 top-0 h-px origin-left bg-white opacity-0 shadow-[0_0_18px_rgba(255,255,255,0.8)]" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute inset-x-5 top-5 h-px bg-white/35" />
                <div className="absolute bottom-5 right-5 h-16 w-16 border-b border-r border-white/25" />
              </div>
              <div className="three-d-card-inner">
                <div className="flex items-start justify-between gap-5">
                  <p className="font-display text-4xl font-black leading-none text-white/12 sm:text-7xl">{String(index + 1).padStart(2, "0")}</p>
                  <span className="border border-white/14 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 sm:tracking-[0.2em]">
                    {card.status || "available"}
                  </span>
                </div>
                <h3 className="font-display mt-6 text-xl font-black uppercase leading-tight tracking-[-0.025em] text-white sm:mt-7 sm:text-3xl sm:tracking-[-0.035em]">
                  {card.title}
                </h3>
                {card.type ? <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45 sm:text-xs sm:tracking-[0.16em]">{card.type}</p> : null}
                {card.description ? <p className="mt-5 text-[15px] leading-7 text-white/68 sm:text-base sm:leading-8">{card.description}</p> : null}
                {card.tags?.length ? (
                  <div className="mt-6 flex flex-wrap gap-2 sm:mt-7">
                    {card.tags.map((tag) => (
                      <span key={tag} className="border border-white/12 bg-white/[0.035] px-2.5 py-1.5 font-mono text-[10px] uppercase text-neutral-300 sm:text-[11px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                {card.code ? (
                  <pre className="mt-6 max-w-full overflow-x-auto whitespace-pre-wrap break-words border border-white/12 bg-white/[0.03] p-3 font-mono text-[11px] leading-6 text-white/68 sm:mt-7 sm:p-4 sm:text-xs">
                    {card.code}
                  </pre>
                ) : null}
                {card.meta?.length ? (
                  <div className="mt-6 grid gap-2 border-t border-white/12 pt-5 font-mono text-[11px] text-white/48 sm:mt-7 sm:text-xs">
                    {card.meta.map(([key, value]) => (
                      <p key={key}>
                        <span className="text-white/72">{key}</span> = &quot;{value}&quot;
                      </p>
                    ))}
                  </div>
                ) : null}
                {mode === "projects" ? (
                  <div className="mt-7 grid h-24 grid-cols-4 gap-2 border border-white/12 p-3 opacity-70">
                    {Array.from({ length: 12 }).map((_, lineIndex) => (
                      <span key={lineIndex} className={cn("border border-white/10", lineIndex % 3 === 0 && "col-span-2 bg-white/[0.04]")} />
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
