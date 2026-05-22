import { cn } from "@/lib/utils";

export function FloatingWireFrames({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {[0, 1, 2, 3].map((item) => (
        <span
          key={item}
          className="floating-frame absolute block border border-white/16"
          style={{
            width: `${10 + item * 4}rem`,
            height: `${6 + item * 2}rem`,
            left: `${8 + item * 21}%`,
            top: `${14 + (item % 2) * 46}%`,
            animationDelay: `${item * -3.8}s`,
          }}
        />
      ))}
    </div>
  );
}

export function CodeRainMinimal({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden font-mono text-[10px] uppercase tracking-[0.18em] text-white/22", className)}>
      {lines.map((line, index) => (
        <span
          key={`${line}-${index}`}
          className="code-rain-line absolute whitespace-nowrap"
          style={{
            left: `${8 + (index * 17) % 78}%`,
            animationDelay: `${index * -3.2}s`,
            animationDuration: `${26 + (index % 4) * 6}s`,
          }}
        >
          {line}
        </span>
      ))}
    </div>
  );
}

export function RotatingRings({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <span className="rotating-ring absolute right-[10%] top-[18%] h-64 w-64 rounded-full border border-white/14" />
      <span className="rotating-ring reverse absolute bottom-[12%] left-[8%] h-36 w-36 rounded-full border border-white/18" />
    </div>
  );
}

export function TerminalLogStrip({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("terminal-log-strip pointer-events-none absolute inset-x-0 overflow-hidden border-y border-white/8 bg-black/25 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/24", className)}>
      <div className="terminal-log-track flex w-max gap-10">
        {[...lines, ...lines].map((line, index) => (
          <span key={`${line}-${index}`}>{line}</span>
        ))}
      </div>
    </div>
  );
}

export function DepthDots({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {Array.from({ length: 34 }).map((_, index) => (
        <span
          key={index}
          className="depth-dot absolute h-1 w-1 bg-white/25"
          style={{
            left: `${(index * 23) % 100}%`,
            top: `${(index * 37) % 100}%`,
            animationDelay: `${index * -0.42}s`,
          }}
        />
      ))}
    </div>
  );
}
