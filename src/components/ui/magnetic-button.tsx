"use client";

import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEvent,
  ReactNode,
  RefObject,
  useRef,
} from "react";
import gsap from "gsap";
import { motionTimings } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export function MagneticButton({
  children,
  className,
  href,
  type = "button",
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    onMouseMove?.(event as never);

    if (window.matchMedia("(pointer: coarse)").matches) return;
    const target = ref.current;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(target, {
      x: x * 0.08,
      y: y * 0.1,
      scale: 1.01,
      duration: motionTimings.hover,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    onMouseLeave?.(event as never);

    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.42,
      ease: "power3.out",
    });
  };

  const sharedClassName = cn(
    "inline-flex min-h-12 items-center justify-center gap-3 border border-white/22 bg-black px-5 py-3.5 text-center font-mono text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors duration-300 ease-out hover:border-white/70 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:tracking-[0.18em]",
    className,
  );

  if (href) {
    return (
      <a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        className={sharedClassName}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      type={type}
      className={sharedClassName}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}
