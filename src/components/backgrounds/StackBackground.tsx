export function StackBackground() {
  const rowOne = ["react.tsx", "tailwind.config", "vercel.json", "github.workflow", "codex.agent"];
  const rowTwo = ["deploy.preview", "responsive.ui", "component.map", "route.index", "client.ready"];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {[rowOne, rowTwo].map((row, index) => (
        <div key={index} className="toolchain-row absolute left-0 flex w-max gap-4 font-mono text-xs uppercase tracking-[0.18em] text-white/18" style={{ top: `${28 + index * 28}%`, animationDirection: index === 0 ? "normal" : "reverse" }}>
          {[...row, ...row, ...row].map((item, itemIndex) => (
            <span key={`${item}-${itemIndex}`} className="border border-white/14 bg-black/45 px-4 py-2">{item}</span>
          ))}
        </div>
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0_48%,rgba(255,255,255,0.08)_48.2%,transparent_48.5%)] opacity-72" />
    </div>
  );
}
