import { useEffect, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Float, PerspectiveCamera, Stars, Text } from "@react-three/drei";
import { MathUtils } from "three";
import type { Group, Mesh } from "three";
import { useRef } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => (typeof window === "undefined" ? false : window.matchMedia(query).matches));

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function InterfacePanels() {
  const group = useRef<Group>(null);
  const ring = useRef<Mesh>(null);
  const panels = useMemo(
    () => [
      [-2.4, 0.4, -1.2, 0.12],
      [-0.45, -0.35, -1.9, -0.08],
      [1.8, 0.2, -1.45, 0.1],
      [3.15, -0.65, -2.2, -0.12],
    ],
    [],
  );

  useFrame(({ clock, camera }) => {
    const progress = MathUtils.clamp(window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1), 0, 1);
    camera.position.x = MathUtils.lerp(camera.position.x, progress * 1.6 - 0.6, 0.035);
    camera.position.y = MathUtils.lerp(camera.position.y, 0.4 - progress * 0.55, 0.035);
    camera.lookAt(0, 0, -1.5);

    if (group.current) {
      group.current.rotation.y = Math.sin(clock.elapsedTime * 0.18) * 0.08 + progress * 0.22;
      group.current.position.z = -progress * 0.75;
    }

    if (ring.current) {
      ring.current.rotation.x = clock.elapsedTime * 0.16;
      ring.current.rotation.z = clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={group}>
      <gridHelper args={[18, 36, "#ffffff", "#666666"]} position={[0, -2.2, -2.8]} rotation={[0, 0, 0]} />
      <mesh ref={ring} position={[1.7, 0.35, -2.5]}>
        <torusGeometry args={[1.2, 0.008, 10, 90]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>
      <mesh position={[1.7, 0.35, -2.5]} rotation={[0.45, 0.25, 0]}>
        <torusGeometry args={[0.72, 0.006, 10, 80]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.22} />
      </mesh>
      {panels.map(([x, y, z, rotate], index) => (
        <Float key={`${x}-${z}`} speed={1 + index * 0.12} rotationIntensity={0.25} floatIntensity={0.25}>
          <mesh position={[x, y, z]} rotation={[0.05, rotate, 0]}>
            <boxGeometry args={[1.25, 0.78, 0.018]} />
            <meshBasicMaterial color="#050505" transparent opacity={0.6} />
            <Edges color="#ffffff" scale={1.01} />
          </mesh>
        </Float>
      ))}
      <Text position={[-2.9, 1.55, -2.6]} rotation={[0, 0.18, 0]} fontSize={0.26} letterSpacing={0.12} color="white" anchorX="left">
        ZAID.DEV
      </Text>
    </group>
  );
}

export function PortfolioScene() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const canRender = !reducedMotion && !coarsePointer;

  if (!canRender) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden opacity-70 md:block">
      <Canvas dpr={[1, 1.35]} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}>
        <PerspectiveCamera makeDefault fov={46} position={[0, 0.35, 5.2]} />
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 5, 13]} />
        <Stars radius={12} depth={5} count={420} factor={1.7} saturation={0} fade speed={0.18} />
        <InterfacePanels />
      </Canvas>
    </div>
  );
}
