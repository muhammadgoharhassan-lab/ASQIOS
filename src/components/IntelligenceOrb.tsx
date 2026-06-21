"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/** Detects whether a WebGL context can actually be created in this browser. */
function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Interactive 3D "Intelligence Orb" rendered with raw Three.js for a minimal
 * bundle footprint. A wireframe icosahedron sits inside an orbiting particle
 * shell with an ambient core glow; the whole rig rotates slowly and reacts
 * subtly to pointer movement. Honors prefers-reduced-motion.
 *
 * If WebGL is unavailable or context creation fails, it degrades gracefully to
 * an elegant CSS fallback rather than crashing the page.
 */
export function IntelligenceOrb() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    if (!webglAvailable()) {
      setFailed(true);
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 6.4;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      // Context creation can still throw even when detection passes — never
      // let this take down the React tree.
      setFailed(true);
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // --- Wireframe icosahedron (the "intelligence lattice") ---
    const icoGeo = new THREE.IcosahedronGeometry(2.05, 1);
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(icoGeo),
      new THREE.LineBasicMaterial({
        color: 0x4f8cff,
        transparent: true,
        opacity: 0.32,
      }),
    );
    group.add(wire);

    // --- Inner solid sphere with a faint gold sheen ---
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.55, 2),
      new THREE.MeshBasicMaterial({
        color: 0x0b1220,
        transparent: true,
        opacity: 0.9,
      }),
    );
    group.add(core);

    const coreEdges = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.55, 2)),
      new THREE.LineBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.14,
      }),
    );
    group.add(coreEdges);

    // --- Orbiting particle shell ---
    const count = 900;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.7 + Math.random() * 1.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        color: 0x9fb6e0,
        size: 0.022,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      }),
    );
    group.add(particles);

    // --- Ambient core glow via a sprite ---
    const glowTexture = makeGlowTexture();
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0x4f8cff,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    glow.scale.set(7.5, 7.5, 1);
    scene.add(glow);

    // --- Sizing ---
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    // --- Pointer parallax ---
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.6;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // --- Animation loop ---
    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      pointer.x += (target.x - pointer.x) * 0.04;
      pointer.y += (target.y - pointer.y) * 0.04;

      const speed = prefersReduced ? 0 : 1;
      group.rotation.y = t * 0.12 * speed + pointer.x;
      group.rotation.x = Math.sin(t * 0.18) * 0.15 * speed + pointer.y;
      particles.rotation.y = -t * 0.05 * speed;
      glow.material.opacity = 0.45 + Math.sin(t * 1.2) * 0.1;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      glowTexture.dispose();
      renderer.dispose();
      icoGeo.dispose();
      particleGeo.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
          obj.geometry?.dispose();
          const m = obj.material as THREE.Material | THREE.Material[];
          Array.isArray(m) ? m.forEach((mm) => mm.dispose()) : m.dispose();
        }
      });
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden>
      {failed && <OrbFallback />}
      <div ref={mountRef} className="absolute inset-0" />
    </div>
  );
}

/** Pure-CSS/SVG orb shown when WebGL is unavailable — keeps the hero intact. */
function OrbFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute h-3/4 w-3/4 rounded-full bg-radial-glow" />
      <svg viewBox="0 0 200 200" className="relative h-3/4 w-3/4">
        <defs>
          <radialGradient id="orbCore" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="rgba(120,170,255,0.5)" />
            <stop offset="60%" stopColor="rgba(79,140,255,0.08)" />
            <stop offset="100%" stopColor="rgba(79,140,255,0)" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="78" fill="url(#orbCore)" />
        {[78, 60, 42].map((r, i) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke={i === 2 ? "rgba(212,175,55,0.35)" : "rgba(79,140,255,0.28)"}
            strokeWidth="0.6"
            strokeDasharray={i === 0 ? "2 3" : undefined}
            className="motion-safe:animate-[spin_50s_linear_infinite]"
            style={{ transformOrigin: "100px 100px" }}
          />
        ))}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={100 + Math.cos(a) * 78}
              cy={100 + Math.sin(a) * 78}
              r="1.1"
              fill="#9fb6e0"
              opacity="0.7"
            />
          );
        })}
        <circle cx="100" cy="100" r="3" fill="#4F8CFF" />
      </svg>
    </div>
  );
}

/** Builds a soft radial-gradient texture used for the additive core glow. */
function makeGlowTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  grad.addColorStop(0, "rgba(255,255,255,0.9)");
  grad.addColorStop(0.2, "rgba(120,170,255,0.6)");
  grad.addColorStop(1, "rgba(79,140,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
