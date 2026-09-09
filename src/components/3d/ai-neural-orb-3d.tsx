import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { BrainCircuit, Sparkles, Cpu, Zap } from "lucide-react";

export function AiNeuralOrb3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeModel, setActiveModel] = useState<"copilot" | "reasoning" | "vision">("copilot");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 460);
    let height = (canvas.height = 360);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    // Mathematical symbols floating in 3D orbit
    const mathSymbols = ["∑", "∫", "∂x", "λ", "π", "e^x", "O(n)", "∇", "≈", "∞", "Δt", "√x"];
    const symbolNodes: {
      symbol: string;
      theta: number;
      phi: number;
      r: number;
      speed: number;
    }[] = mathSymbols.map((sym, idx) => ({
      symbol: sym,
      theta: (idx / mathSymbols.length) * Math.PI * 2,
      phi: ((idx % 3) - 1) * 0.7,
      r: 130 + (idx % 2) * 20,
      speed: 0.015 + (idx % 3) * 0.005,
    }));

    // Neural Synapse Vertices
    const nodeCount = 38;
    const neuralNodes: {
      x: number;
      y: number;
      z: number;
      origX: number;
      origY: number;
      origZ: number;
      color: string;
    }[] = [];

    const sphereR = 85;
    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * sphereR;

      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      const colors = ["#ff3b5c", "#3b82f6", "#a855f7", "#38bdf8"];
      neuralNodes.push({
        x,
        y,
        z,
        origX: x,
        origY: y,
        origZ: z,
        color: colors[i % colors.length],
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseX = (clientX - width / 2) / (width / 2);
      mouseY = (clientY - height / 2) / (height / 2);
      targetRotY = mouseX * 0.8;
      targetRotX = -mouseY * 0.8;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      rotX += (targetRotX - rotX) * 0.06;
      rotY += (targetRotY - rotY + 0.01) * 0.06;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const fov = 420;
      const centerX = width / 2;
      const centerY = height / 2;

      // Project neural synapse nodes
      const projectedNodes: { px: number; py: number; pz: number; color: string; scale: number }[] = [];

      for (let i = 0; i < neuralNodes.length; i++) {
        const n = neuralNodes[i];
        // Jitter oscillation
        const jx = n.origX + Math.sin(time * 3 + i) * 6;
        const jy = n.origY + Math.cos(time * 3 + i * 2) * 6;
        const jz = n.origZ + Math.sin(time * 2 + i * 3) * 6;

        const x1 = jx * cosY + jz * sinY;
        const z1 = -jx * sinY + jz * cosY;

        const y2 = jy * cosX - z1 * sinX;
        const z2 = jy * sinX + z1 * cosX;

        const scale = fov / (z2 + 420);
        projectedNodes.push({
          px: x1 * scale + centerX,
          py: y2 * scale + centerY,
          pz: z2,
          color: n.color,
          scale,
        });
      }

      // Draw Synaptic Filaments
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];

          const dx = n1.px - n2.px;
          const dy = n1.py - n2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 75) {
            const alpha = (1 - dist / 75) * 0.35;
            ctx.beginPath();
            ctx.moveTo(n1.px, n1.py);
            ctx.lineTo(n2.px, n2.py);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw Glowing Synapse Vertices
      for (let i = 0; i < projectedNodes.length; i++) {
        const n = projectedNodes[i];
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.px, n.py, Math.max(1.2, 3 * n.scale), 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Floating 3D LaTeX Math Symbols
      ctx.font = "bold 13px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < symbolNodes.length; i++) {
        const s = symbolNodes[i];
        s.theta += s.speed;

        const sx = Math.cos(s.theta) * s.r * Math.cos(s.phi);
        const sy = Math.sin(s.phi) * s.r;
        const sz = Math.sin(s.theta) * s.r * Math.cos(s.phi);

        const x1 = sx * cosY + sz * sinY;
        const z1 = -sx * sinY + sz * cosY;

        const y2 = sy * cosX - z1 * sinX;
        const z2 = sy * sinX + z1 * cosX;

        const scale = fov / (z2 + 420);
        const px = x1 * scale + centerX;
        const py = y2 * scale + centerY;

        const alpha = Math.max(0.2, Math.min(0.95, (z2 + 150) / 300));
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillText(s.symbol, px, py);

        // Small glow dot under symbol
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(px, py + 12, 2 * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Center Core Glowing Fusion Reactor
      const corePulse = Math.sin(time * 3) * 0.15 + 1;
      const coreR = 34 * corePulse;
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreR);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.3, "rgba(59, 130, 246, 0.8)");
      grad.addColorStop(0.7, "rgba(168, 85, 247, 0.4)");
      grad.addColorStop(1, "transparent");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreR, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full glass-strong rounded-[2.5rem] p-6 border border-white/15 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-4 w-4 text-electric" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            3D Neural Study Core
          </span>
        </div>
        <div className="flex gap-1.5">
          {(["copilot", "reasoning", "vision"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setActiveModel(m)}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase transition-all ${
                activeModel === m
                  ? "bg-electric text-white shadow-md"
                  : "glass text-muted-foreground hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-[300px] w-full flex items-center justify-center">
        <canvas ref={canvasRef} className="h-full w-full" />

        {/* 3D Floating Feature Chips */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 left-4 glass rounded-xl px-3 py-1.5 border border-white/15 shadow-lg text-[10px] font-bold text-white flex items-center gap-1.5 pointer-events-none"
        >
          <Sparkles className="h-3 w-3 text-spider" /> LaTeX Solver Active
        </motion.div>

        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-4 right-4 glass rounded-xl px-3 py-1.5 border border-white/15 shadow-lg text-[10px] font-bold text-electric flex items-center gap-1.5 pointer-events-none"
        >
          <Cpu className="h-3 w-3" /> Multi-modal Slide Engine
        </motion.div>
      </div>

      <div className="pt-3 border-t border-white/10 text-center text-[11px] text-muted-foreground">
        Interactive 3D mathematical knowledge engine · Hover over neural core
      </div>
    </div>
  );
}
