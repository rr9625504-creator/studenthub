import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, Mic, Radio } from "lucide-react";
import { toast } from "sonner";

interface AudioWaveform3DProps {
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  title?: string;
  speaker?: string;
}

export function AudioWaveform3D({
  isPlaying: externalPlaying,
  onTogglePlay,
  title = "CS301 Dynamic Programming Memoization (0:48)",
  speaker = "Vino (Course TA)",
}: AudioWaveform3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [internalPlaying, setInternalPlaying] = useState(false);
  const isPlaying = externalPlaying !== undefined ? externalPlaying : internalPlaying;

  const handleToggle = () => {
    if (onTogglePlay) {
      onTogglePlay();
    } else {
      setInternalPlaying(!internalPlaying);
      if (!internalPlaying) toast.info("Playing 3D spatial audio recording...");
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 440);
    let height = (canvas.height = 240);

    const barCount = 42;
    const cylinderRadius = 90;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 240;
    };

    window.addEventListener("resize", handleResize);

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      const fov = 380;
      const centerX = width / 2;
      const centerY = height / 2 + 10;

      const rotY = time * 0.4;
      const rotX = 0.45; // Fixed 3D perspective tilt looking slightly down

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Collect projected bars
      const projectedBars: {
        px: number;
        py: number;
        pz: number;
        barH: number;
        color: string;
        alpha: number;
        scale: number;
      }[] = [];

      for (let i = 0; i < barCount; i++) {
        const angle = (i / barCount) * Math.PI * 2;
        const bx = Math.cos(angle) * cylinderRadius;
        const bz = Math.sin(angle) * cylinderRadius;

        // Dynamic frequency height calculation
        const freqNoise = Math.sin(i * 1.2 + time * 3) * Math.cos(i * 0.6 + time * 2);
        const baseHeight = isPlaying ? 16 + Math.abs(freqNoise) * 55 : 8 + Math.sin(time + i * 0.5) * 4;

        // 3D Matrix Rotation
        const x1 = bx * cosY + bz * sinY;
        const z1 = -bx * sinY + bz * cosY;

        const y2 = 0 * cosX - z1 * sinX;
        const z2 = 0 * sinX + z1 * cosX;

        const scale = fov / (z2 + 380);
        const px = x1 * scale + centerX;
        const py = y2 * scale + centerY;

        const alpha = Math.max(0.2, Math.min(0.95, (z2 + 100) / 200));
        const color = i % 3 === 0 ? "#ff3b5c" : i % 2 === 0 ? "#3b82f6" : "#a855f7";

        projectedBars.push({
          px,
          py,
          pz: z2,
          barH: baseHeight * scale,
          color,
          alpha,
          scale,
        });
      }

      // Sort by Z-depth for correct occlusion (painter's algorithm)
      projectedBars.sort((a, b) => a.pz - b.pz);

      // Draw 3D Equalizer Pillars
      for (let i = 0; i < projectedBars.length; i++) {
        const bar = projectedBars[i];
        ctx.globalAlpha = bar.alpha;

        const pillarWidth = Math.max(2, 5 * bar.scale);
        const topY = bar.py - bar.barH;
        const bottomY = bar.py + bar.barH * 0.3;

        // Linear Gradient for each vertical 3D bar
        const grad = ctx.createLinearGradient(bar.px, topY, bar.px, bottomY);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.3, bar.color);
        grad.addColorStop(1, "rgba(11, 18, 32, 0.4)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(bar.px - pillarWidth / 2, topY, pillarWidth, bottomY - topY, 4);
        ctx.fill();

        // Top glowing cap
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(bar.px, topY, pillarWidth / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw 3D Base Reflection Ellipse
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + 15, cylinderRadius * 0.9, cylinderRadius * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  return (
    <div className="glass-strong rounded-3xl p-5 border border-white/15 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-spider/20 border border-spider/30 flex items-center justify-center text-spider">
            <Radio className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-none">
              {title}
            </div>
            <div className="text-[10px] text-muted-foreground">{speaker}</div>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          3D Spatial Waveform
        </span>
      </div>

      <div className="relative h-[200px] w-full flex items-center justify-center">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <button
          onClick={handleToggle}
          className="btn-brand px-5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-spider/30"
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5 fill-white" /> : <Play className="h-3.5 w-3.5 fill-white" />}
          <span>{isPlaying ? "Pause Waveform" : "Play 3D Audio"}</span>
        </button>
        <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
          <Volume2 className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{isPlaying ? "0:24 / 0:48" : "0:00 / 0:48"}</span>
        </div>
      </div>
    </div>
  );
}
