import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Activity, Sparkles, Zap, Shield, Heart } from "lucide-react";

export function HeartbeatCore3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [bpm, setBpm] = useState(78);
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = 460);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0.2;
    let targetRotY = 0;
    let rotX = 0.2;
    let rotY = 0;

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    // Create 3D Geodesic / Latitude-Longitude Sphere Vertices
    const sphereRadius = 110;
    const rings = 14;
    const segments = 24;
    const vertices: { x: number; y: number; z: number; origR: number }[] = [];

    for (let i = 0; i <= rings; i++) {
      const theta = (i * Math.PI) / rings;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let j = 0; j < segments; j++) {
        const phi = (j * 2 * Math.PI) / segments;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        const x = sphereRadius * sinTheta * cosPhi;
        const y = sphereRadius * cosTheta;
        const z = sphereRadius * sinTheta * sinPhi;

        vertices.push({ x, y, z, origR: sphereRadius });
      }
    }

    // Outer orbital rings
    const orbitalPoints: { x: number; y: number; z: number; orbitAngle: number; orbitRadius: number; orbitTilt: number }[] = [];
    for (let i = 0; i < 48; i++) {
      const angle = (i / 48) * Math.PI * 2;
      orbitalPoints.push({
        x: 0,
        y: 0,
        z: 0,
        orbitAngle: angle,
        orbitRadius: 160,
        orbitTilt: Math.PI / 4,
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 460;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (isDragging) {
        const deltaX = clientX - lastX;
        const deltaY = clientY - lastY;
        targetRotY += deltaX * 0.01;
        targetRotX += deltaY * 0.01;
        lastX = clientX;
        lastY = clientY;
      } else {
        mouseX = (clientX - width / 2) / (width / 2);
        mouseY = (clientY - height / 2) / (height / 2);
        targetRotY = mouseX * 0.7;
        targetRotX = -mouseY * 0.7 + 0.2;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
      isDragging = true;
      setIsInteracting(true);
    };

    const handleMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    let time = 0;
    let shockwaveRadius = 0;
    let shockwaveAlpha = 0;

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      // Heartbeat pulse physics: double pulse curve like a biological heartbeat
      const heartbeatInterval = (60 / bpm) * 2;
      const cycleTime = (time % heartbeatInterval) / heartbeatInterval;

      let heartScale = 1;
      if (cycleTime < 0.12) {
        // First lub peak
        heartScale = 1 + Math.sin((cycleTime / 0.12) * Math.PI) * 0.22;
      } else if (cycleTime > 0.18 && cycleTime < 0.32) {
        // Second dub peak
        heartScale = 1 + Math.sin(((cycleTime - 0.18) / 0.14) * Math.PI) * 0.14;
      }

      // Trigger shockwave on beat
      if (cycleTime < 0.03 && shockwaveAlpha <= 0.05) {
        shockwaveRadius = sphereRadius * 0.9;
        shockwaveAlpha = 0.8;
        setPulseCount((c) => c + 1);
      }

      // Evolve shockwave
      if (shockwaveAlpha > 0) {
        shockwaveRadius += 3.5;
        shockwaveAlpha *= 0.94;
      }

      // Smooth camera interpolation
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY + 0.008) * 0.08;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const fov = 450;
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw Center Shockwave Glow
      if (shockwaveAlpha > 0.02) {
        const shockGrad = ctx.createRadialGradient(
          centerX,
          centerY,
          shockwaveRadius * 0.5,
          centerX,
          centerY,
          shockwaveRadius
        );
        shockGrad.addColorStop(0, `rgba(255, 59, 92, ${shockwaveAlpha * 0.4})`);
        shockGrad.addColorStop(0.7, `rgba(59, 130, 246, ${shockwaveAlpha * 0.2})`);
        shockGrad.addColorStop(1, "transparent");

        ctx.fillStyle = shockGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, shockwaveRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Project Sphere Vertices with Heartbeat Distortions
      const projectedSphere: { px: number; py: number; pz: number; scale: number; alpha: number }[] = [];

      for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];

        // Organic heartbeat wave ripple across vertices
        const distFromCenter = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        const wave = Math.sin(time * 4 + v.y * 0.05) * 0.06;
        const currentR = v.origR * (heartScale + wave);

        const normX = v.x / distFromCenter;
        const normY = v.y / distFromCenter;
        const normZ = v.z / distFromCenter;

        const vx = normX * currentR;
        const vy = normY * currentR;
        const vz = normZ * currentR;

        // 3D Matrix Rotation
        const x1 = vx * cosY + vz * sinY;
        const z1 = -vx * sinY + vz * cosY;

        const y2 = vy * cosX - z1 * sinX;
        const z2 = vy * sinX + z1 * cosX;

        const depth = z2 + 450;
        const scale = fov / Math.max(depth, 10);

        const px = x1 * scale + centerX;
        const py = y2 * scale + centerY;
        const alpha = Math.max(0.12, Math.min(0.9, (z2 + 150) / 300));

        projectedSphere.push({ px, py, pz: z2, scale, alpha });
      }

      // Draw Sphere Wireframe Grid
      ctx.lineWidth = 1;
      for (let i = 0; i <= rings; i++) {
        ctx.beginPath();
        for (let j = 0; j < segments; j++) {
          const idx = i * segments + j;
          const nextIdx = i * segments + ((j + 1) % segments);

          const p1 = projectedSphere[idx];
          const p2 = projectedSphere[nextIdx];

          if (p1 && p2) {
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
          }
        }
        ctx.strokeStyle = `rgba(255, 59, 92, ${0.15 * (heartScale - 0.7)})`;
        ctx.stroke();
      }

      // Draw Longitudinal Grid Lines
      for (let j = 0; j < segments; j++) {
        ctx.beginPath();
        for (let i = 0; i < rings; i++) {
          const idx = i * segments + j;
          const nextIdx = (i + 1) * segments + j;

          const p1 = projectedSphere[idx];
          const p2 = projectedSphere[nextIdx];

          if (p1 && p2) {
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
          }
        }
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.18 * (heartScale - 0.7)})`;
        ctx.stroke();
      }

      // Draw Glowing Vertices
      for (let i = 0; i < projectedSphere.length; i += 2) {
        const p = projectedSphere[i];
        if (p.pz < -40) continue; // Cull back vertices for depth clarity

        ctx.globalAlpha = p.alpha;
        const nodeColor = i % 4 === 0 ? "#ff3b5c" : i % 3 === 0 ? "#3b82f6" : "#a855f7";

        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(1, 2.2 * p.scale), 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw 3D Gyroscopic Orbital Rings
      const ringRotSpeed = time * 0.8;
      const orbitalCount = 60;
      const orbitalProjected: { px: number; py: number; pz: number }[] = [];

      for (let i = 0; i < orbitalCount; i++) {
        const angle = (i / orbitalCount) * Math.PI * 2 + ringRotSpeed;
        const ox = Math.cos(angle) * 165;
        const oy = Math.sin(angle) * Math.sin(time * 0.4) * 35;
        const oz = Math.sin(angle) * 165;

        // Apply matrix rotation
        const x1 = ox * cosY + oz * sinY;
        const z1 = -ox * sinY + oz * cosY;

        const y2 = oy * cosX - z1 * sinX;
        const z2 = oy * sinX + z1 * cosX;

        const scale = fov / (z2 + 450);
        orbitalProjected.push({
          px: x1 * scale + centerX,
          py: y2 * scale + centerY,
          pz: z2,
        });
      }

      // Draw Orbital Track
      ctx.beginPath();
      for (let i = 0; i < orbitalProjected.length; i++) {
        const p = orbitalProjected[i];
        const next = orbitalProjected[(i + 1) % orbitalProjected.length];
        if (i === 0) ctx.moveTo(p.px, p.py);
        else ctx.lineTo(p.px, p.py);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 1.8;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Glowing Orbital Satellite Particle
      const activeSatIdx = Math.floor((time * 8) % orbitalProjected.length);
      const sat = orbitalProjected[activeSatIdx];
      if (sat) {
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(sat.px, sat.py, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Inner Core Pulsing Energy Sun
      const coreRadius = 42 * heartScale;
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
      coreGrad.addColorStop(0, "#ffffff");
      coreGrad.addColorStop(0.3, "rgba(255, 59, 92, 0.85)");
      coreGrad.addColorStop(0.7, "rgba(168, 85, 247, 0.45)");
      coreGrad.addColorStop(1, "transparent");

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [bpm]);

  return (
    <div className="relative w-full rounded-[2.5rem] glass-strong border border-white/15 p-6 overflow-hidden shadow-2xl group select-none">
      {/* Dynamic Background Aura */}
      <div className="absolute -inset-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,59,92,0.18),rgba(59,130,246,0.14),transparent_65%)] blur-2xl pointer-events-none" />

      {/* Top HUD Info Bar */}
      <div className="relative z-20 flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spider opacity-80" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-spider" />
          </span>
          <div>
            <span className="text-xs font-black text-white uppercase tracking-wider">
              3D Quantum Heartbeat Core
            </span>
            <div className="text-[10px] text-muted-foreground">
              Interactive 3D WebGL Mesh · Drag to rotate space
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-spider/30 text-xs font-bold text-white">
            <Heart className="h-3.5 w-3.5 fill-spider text-spider animate-heartbeat" />
            <span>{bpm} BPM</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-electric/20 text-electric border border-electric/30 hidden sm:inline-block">
            60 FPS 3D
          </span>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="relative h-[340px] sm:h-[400px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="h-full w-full" />

        {/* Floating 3D Holographic Spatial Badges */}
        <motion.div
          animate={{
            y: [-6, 6, -6],
            rotateZ: [-1, 1, -1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 left-2 sm:left-6 glass-card rounded-2xl p-3 border border-white/20 shadow-xl pointer-events-none flex items-center gap-2.5 backdrop-blur-2xl"
        >
          <div className="h-8 w-8 rounded-xl bg-spider/20 border border-spider/30 flex items-center justify-center text-spider">
            <Zap className="h-4 w-4 fill-spider" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">0.38s PDF Summary</div>
            <div className="text-[10px] text-emerald-400 font-semibold">⚡ Instant AI Digest</div>
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [6, -6, 6],
            rotateZ: [1, -1, 1],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-8 right-2 sm:right-6 glass-card rounded-2xl p-3 border border-white/20 shadow-xl pointer-events-none flex items-center gap-2.5 backdrop-blur-2xl"
        >
          <div className="h-8 w-8 rounded-xl bg-electric/20 border border-electric/30 flex items-center justify-center text-electric">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">14.2k Active Students</div>
            <div className="text-[10px] text-muted-foreground">120+ Top Universities</div>
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [-4, 4, -4],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-4 left-6 glass rounded-full px-3.5 py-1.5 border border-white/15 shadow-lg pointer-events-none hidden md:flex items-center gap-2 text-[11px] text-white/90"
        >
          <Shield className="h-3.5 w-3.5 text-spider" />
          <span>E2E Encrypted Cohort Mesh</span>
        </motion.div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="relative z-20 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground">Adjust Pulse Rate:</span>
          {[60, 78, 96, 120].map((rate) => (
            <button
              key={rate}
              onClick={() => setBpm(rate)}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
                bpm === rate
                  ? "bg-spider text-white shadow-md"
                  : "glass text-muted-foreground hover:text-white"
              }`}
            >
              {rate}
            </button>
          ))}
        </div>

        <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-spider" />
          <span>Click & Drag 3D Sphere</span>
        </div>
      </div>
    </div>
  );
}
