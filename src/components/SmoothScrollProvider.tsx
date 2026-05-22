import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.12,
      anchors: true,
      lerp: 0.08,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
    });

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const scrollToHash = (hash: string, immediate = false) => {
      const target = document.querySelector(hash);
      if (!target) return;
      lenis.scrollTo(target as HTMLElement, { offset: 96, immediate });
    };

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (window.location.hash) {
        scrollToHash(window.location.hash, true);
        window.setTimeout(() => {
          ScrollTrigger.refresh();
          scrollToHash(window.location.hash, true);
        }, 260);
      }
    });

    const handleHashClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
      const href = link?.getAttribute("href");
      if (!href || href === "#") return;

      event.preventDefault();
      ScrollTrigger.refresh();
      scrollToHash(href);
      window.history.pushState(null, "", href);
    };

    document.addEventListener("click", handleHashClick);

    return () => {
      document.removeEventListener("click", handleHashClick);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return children;
}
