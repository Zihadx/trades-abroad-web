"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
import { destinations, HUB } from "@/lib/data";

const R = 2;
// Stylised continents as ellipses [lat, lon, radiusLat, radiusLon] — procedural, no texture download needed.
const LAND: number[][] = [
  [50, -105, 20, 38], [30, -98, 10, 18], [15, -90, 8, 10], [72, -40, 8, 18], [-12, -60, 24, 15], [-36, -66, 12, 7],
  [50, 15, 10, 25], [54, -3, 5, 3], [5, 20, 30, 22], [-20, 26, 12, 15], [28, 45, 10, 12], [52, 90, 20, 55],
  [25, 80, 14, 22], [25, 106, 10, 14], [36, 138, 6, 3], [-3, 115, 4, 15], [-25, 134, 12, 18], [-41, 174, 5, 3],
];
const isLand = (lat: number, lon: number) =>
  LAND.some(([a, o, ra, ro]) => { let dl = Math.abs(lon - o); if (dl > 180) dl = 360 - dl; return ((lat - a) / ra) ** 2 + (dl / ro) ** 2 < 1; });
const toVec = (lat: number, lon: number, r = R) => {
  const phi = ((90 - lat) * Math.PI) / 180, th = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
};

function Dots({ count }: { count: number }) {
  const geo = useMemo(() => {
    const pts: number[] = [];
    const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const lat = (Math.asin(y) * 180) / Math.PI;
      const lon = (((ga * i * 180) / Math.PI) % 360) - 180;
      if (isLand(lat, lon)) { const v = toVec(lat, lon, R * 1.004); pts.push(v.x, v.y, v.z); }
    }
    return new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  }, [count]);
  return <points geometry={geo}><pointsMaterial color="#C8F169" size={0.024} sizeAttenuation transparent opacity={0.85} depthWrite={false} /></points>;
}

function Arc({ to, active }: { to: THREE.Vector3; active: boolean }) {
  const { curve, pts } = useMemo(() => {
    const a = toVec(HUB.lat, HUB.lon), mid = a.clone().add(to).multiplyScalar(0.5);
    mid.setLength(R + a.distanceTo(to) * 0.38);
    const c = new THREE.QuadraticBezierCurve3(a, mid, to);
    return { curve: c, pts: c.getPoints(56) };
  }, [to]);
  const dot = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => { dot.current?.position.copy(curve.getPoint((clock.elapsedTime * 0.22 + Math.abs(to.x)) % 1)); });
  return (
    <group>
      <Line points={pts} color={active ? "#E6FFA6" : "#8fbf3f"} lineWidth={active ? 2.4 : 1} transparent opacity={active ? 1 : 0.5} />
      <mesh ref={dot}><sphereGeometry args={[active ? 0.045 : 0.03, 12, 12]} /><meshBasicMaterial color="#F5FFD6" /></mesh>
    </group>
  );
}

function Scene({ active, onSelect, lite }: { active: string | null; onSelect: (s: string | null) => void; lite: boolean }) {
  const spin = useRef<THREE.Group>(null);
  const [hover, setHover] = useState<string | null>(null);
  const vecs = useMemo(() => destinations.map((d) => ({ ...d, v: toVec(d.lat, d.lon) })), []);
  useFrame((_, dt) => {
    const g = spin.current; if (!g) return;
    const d = vecs.find((x) => x.slug === active);
    if (d) {
      const target = Math.PI / 2 - ((d.lon + 180) * Math.PI) / 180;
      const diff = ((((target - g.rotation.y + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI;
      g.rotation.y += diff * Math.min(1, dt * 3);
    } else if (!hover) g.rotation.y += dt * 0.08;
  });
  return (
    <>
      <ambientLight intensity={0.5} /><directionalLight position={[5, 3, 5]} intensity={1.3} color="#dcffa8" />
      <group rotation={[0.28, 0, 0]}>
        <group ref={spin}>
          <mesh><sphereGeometry args={[R, 64, 48]} /><meshStandardMaterial color="#0d1610" roughness={0.9} /></mesh>
          <mesh><sphereGeometry args={[R * 1.002, 40, 28]} /><meshBasicMaterial wireframe color="#C8F169" transparent opacity={0.05} /></mesh>
          <Dots count={lite ? 5000 : 9000} />
          <mesh position={toVec(HUB.lat, HUB.lon)}><sphereGeometry args={[0.05, 16, 16]} /><meshBasicMaterial color="#ffffff" /></mesh>
          {vecs.map((d) => (
            <group key={d.slug}>
              <Arc to={d.v} active={active === d.slug || hover === d.slug} />
              <mesh position={d.v} onPointerOver={(e) => { e.stopPropagation(); setHover(d.slug); onSelect(d.slug); document.body.style.cursor = "pointer"; }} onPointerOut={() => { setHover(null); onSelect(null); document.body.style.cursor = ""; }}>
                <sphereGeometry args={[active === d.slug || hover === d.slug ? 0.075 : 0.05, 16, 16]} /><meshBasicMaterial color="#C8F169" />
              </mesh>
              {(hover === d.slug || active === d.slug) && <Html position={d.v} center distanceFactor={7} style={{ pointerEvents: "none" }}><div className="-translate-y-6 whitespace-nowrap rounded-full bg-lime px-3 py-1 text-xs font-semibold text-ink">{d.name}</div></Html>}
            </group>
          ))}
        </group>
      </group>
      <mesh scale={1.14}><sphereGeometry args={[R, 48, 32]} /><meshBasicMaterial color="#C8F169" transparent opacity={0.07} side={THREE.BackSide} /></mesh>
    </>
  );
}

export default function Globe({ active, onSelect, lite }: { active: string | null; onSelect: (s: string | null) => void; lite: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 6.4], fov: 38 }} dpr={[1, lite ? 1.5 : 2]} gl={{ antialias: !lite, alpha: true }}>
      <Scene active={active} onSelect={onSelect} lite={lite} />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.4} minPolarAngle={Math.PI / 3} maxPolarAngle={(2 * Math.PI) / 3} />
    </Canvas>
  );
}
