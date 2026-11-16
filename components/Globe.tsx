"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line, OrbitControls, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Component, Suspense, useMemo, useRef, useState, type ReactNode } from "react";
import { destinations, HUB } from "@/lib/data";

const R = 2;
// Real NASA "Blue Marble" satellite imagery + night-lights, loaded from public CDNs.
const TEX = {
  day: "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
  night: "https://unpkg.com/three-globe/example/img/earth-night.jpg",
  clouds: "https://threejs.org/examples/textures/planets/earth_clouds_1024.png",
};

const toVec = (lat: number, lon: number, r = R) => {
  const phi = ((90 - lat) * Math.PI) / 180, th = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
};

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

const EARTH_VS = `varying vec2 vUv; varying vec3 vN;
void main(){ vUv = uv; vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const EARTH_FS = `uniform sampler2D dayMap; uniform sampler2D nightMap; uniform vec3 sun; varying vec2 vUv; varying vec3 vN;
void main(){
  float d = dot(normalize(vN), sun);
  vec3 dc = texture2D(dayMap, vUv).rgb; vec3 nc = texture2D(nightMap, vUv).rgb;
  float k = smoothstep(-0.18, 0.28, d);
  vec3 night = nc * 1.7 + dc * 0.035;
  vec3 day = dc * (0.5 + 0.7 * max(d, 0.0));
  gl_FragColor = vec4(mix(night, day, k), 1.0);
  #include <colorspace_fragment>
}`;
const ATM_VS = `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const ATM_FS = `varying vec3 vN; void main(){ float i = pow(max(0.62 - dot(vN, vec3(0.0, 0.0, 1.0)), 0.0), 3.0); gl_FragColor = vec4(0.52, 0.86, 0.95, 1.0) * i * 1.6; }`;

function Earth() {
  const [day, night] = useTexture([TEX.day, TEX.night]);
  const mat = useMemo(() => {
    [day, night].forEach((t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; });
    return new THREE.ShaderMaterial({ uniforms: { dayMap: { value: day }, nightMap: { value: night }, sun: { value: new THREE.Vector3(5, 2, 4).normalize() } }, vertexShader: EARTH_VS, fragmentShader: EARTH_FS });
  }, [day, night]);
  return <mesh material={mat}><sphereGeometry args={[R, 96, 64]} /></mesh>;
}

function Clouds() {
  const map = useTexture(TEX.clouds);
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.012; });
  return <mesh ref={ref}><sphereGeometry args={[R * 1.012, 64, 48]} /><meshBasicMaterial map={map} transparent opacity={0.38} depthWrite={false} /></mesh>;
}

function isLand(lat: number, lon: number) {
  const L = [[50, -105, 20, 38], [30, -98, 10, 18], [-12, -60, 24, 15], [50, 15, 10, 25], [5, 20, 30, 22], [52, 90, 20, 55], [25, 80, 14, 22], [-25, 134, 12, 18]];
  return L.some(([a, o, ra, ro]) => { let dl = Math.abs(lon - o); if (dl > 180) dl = 360 - dl; return ((lat - a) / ra) ** 2 + (dl / ro) ** 2 < 1; });
}
function Procedural({ count }: { count: number }) { // fallback if textures can't load
  const geo = useMemo(() => {
    const pts: number[] = []; const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) { const y = 1 - (i / (count - 1)) * 2; const lat = (Math.asin(y) * 180) / Math.PI; const lon = (((ga * i * 180) / Math.PI) % 360) - 180; if (isLand(lat, lon)) { const v = toVec(lat, lon, R * 1.004); pts.push(v.x, v.y, v.z); } }
    return new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  }, [count]);
  return (<group><mesh><sphereGeometry args={[R, 48, 32]} /><meshBasicMaterial color="#0b140f" /></mesh><points geometry={geo}><pointsMaterial color="#C8F169" size={0.024} sizeAttenuation transparent opacity={0.85} /></points></group>);
}

function Arc({ to, active }: { to: THREE.Vector3; active: boolean }) {
  const { curve, pts } = useMemo(() => {
    const a = toVec(HUB.lat, HUB.lon, R * 1.01), mid = a.clone().add(to).multiplyScalar(0.5);
    mid.setLength(R + a.distanceTo(to) * 0.38);
    const c = new THREE.QuadraticBezierCurve3(a, mid, to);
    return { curve: c, pts: c.getPoints(64) };
  }, [to]);
  const dot = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => { dot.current?.position.copy(curve.getPoint((clock.elapsedTime * 0.2 + Math.abs(to.x)) % 1)); });
  return (
    <group>
      <Line points={pts} color={active ? "#E6FFA6" : "#C8F169"} lineWidth={active ? 2.6 : 1.1} transparent opacity={active ? 1 : 0.55} />
      <mesh ref={dot}><sphereGeometry args={[active ? 0.05 : 0.032, 12, 12]} /><meshBasicMaterial color="#F5FFD6" /></mesh>
    </group>
  );
}

function Marker({ v, hot, onOver, onOut }: { v: THREE.Vector3; hot: boolean; onOver: () => void; onOut: () => void }) {
  const ring = useRef<THREE.Mesh>(null);
  const q = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), v.clone().normalize()), [v]);
  useFrame(({ clock }) => {
    const m = ring.current; if (!m) return;
    const t = (clock.elapsedTime * 0.7) % 1;
    m.scale.setScalar(1 + t * (hot ? 3.6 : 2.2));
    (m.material as THREE.MeshBasicMaterial).opacity = (1 - t) * (hot ? 0.95 : 0.55);
  });
  return (
    <group position={v} quaternion={q}>
      <mesh ref={ring} position={[0, 0, 0.012]}><ringGeometry args={[0.07, 0.09, 40]} /><meshBasicMaterial color="#C8F169" transparent depthWrite={false} /></mesh>
      <mesh onPointerOver={(e) => { e.stopPropagation(); onOver(); }} onPointerOut={onOut}><sphereGeometry args={[hot ? 0.085 : 0.058, 16, 16]} /><meshBasicMaterial color="#C8F169" /></mesh>
    </group>
  );
}

function Scene({ active, onSelect, lite }: { active: string | null; onSelect: (s: string | null) => void; lite: boolean }) {
  const spin = useRef<THREE.Group>(null);
  const [hover, setHover] = useState<string | null>(null);
  const vecs = useMemo(() => destinations.map((d) => ({ ...d, v: toVec(d.lat, d.lon, R * 1.01) })), []);
  useFrame((_, dt) => {
    const g = spin.current; if (!g) return;
    const d = vecs.find((x) => x.slug === active);
    if (d) {
      const target = Math.PI / 2 - ((d.lon + 180) * Math.PI) / 180;
      const diff = ((((target - g.rotation.y + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI;
      g.rotation.y += diff * Math.min(1, dt * 3);
    } else if (!hover) g.rotation.y += dt * 0.07;
  });
  return (
    <>
      <Stars radius={60} depth={30} count={lite ? 700 : 2200} factor={3} fade speed={0.5} />
      <group rotation={[0.3, 0, 0]}>
        <group ref={spin}>
          <Boundary fallback={<Procedural count={lite ? 5000 : 9000} />}>
            <Suspense fallback={<Procedural count={4000} />}><Earth /></Suspense>
          </Boundary>
          <Boundary fallback={null}><Suspense fallback={null}><Clouds /></Suspense></Boundary>
          <mesh position={toVec(HUB.lat, HUB.lon, R * 1.01)}><sphereGeometry args={[0.055, 16, 16]} /><meshBasicMaterial color="#ffffff" /></mesh>
          {vecs.map((d) => {
            const hot = active === d.slug || hover === d.slug;
            return (
              <group key={d.slug}>
                <Arc to={d.v} active={hot} />
                <Marker v={d.v} hot={hot} onOver={() => { setHover(d.slug); onSelect(d.slug); document.body.style.cursor = "pointer"; }} onOut={() => { setHover(null); onSelect(null); document.body.style.cursor = ""; }} />
                {hot && <Html position={d.v} center distanceFactor={7} style={{ pointerEvents: "none" }}><div className="-translate-y-7 whitespace-nowrap rounded-full bg-lime px-3 py-1 text-xs font-semibold text-ink shadow-lg">{d.name}</div></Html>}
              </group>
            );
          })}
        </group>
      </group>
      <mesh scale={1.16}><sphereGeometry args={[R, 64, 48]} /><shaderMaterial vertexShader={ATM_VS} fragmentShader={ATM_FS} side={THREE.BackSide} blending={THREE.AdditiveBlending} transparent depthWrite={false} /></mesh>
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
