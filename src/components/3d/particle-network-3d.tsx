import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseRadius: number;
  color: string;
  pulsePhase: number;
}

export function ParticleNetwork3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const colors = ["#ff3b5c", "#3b82f6", "#a855f7", "#38bdf8", "#ec4899"];
    const particleCount = Math.min(Math.floor((width * height) / 16000), 75);
    const particles: Particle[] = [];

    const fov = 400; // 3D Field of View

    // Initialize 3D particles in a spatial volume
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: (Math.random() - 0.5) * 600,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.3,
        baseRadius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) / (width / 2);
      mouseY = (e.clientY - height / 2) / (height / 2);
      targetRotY = mouseX * 0.25;
      targetRotX = -mouseY * 0.25;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Smooth camera interpolation
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      const cosY = Math.cos(rotY + time * 0.05);
      const sinY = Math.sin(rotY + time * 0.05);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Projected particles array for connection drawing
      const projected: { px: number; py: number; pz: number; p: Particle; scale: number; alpha: number }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update positions with boundary wrap
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        const maxSpreadX = width * 0.7;
        const maxSpreadY = height * 0.7;
        const maxSpreadZ = 400;

        if (p.x < -maxSpreadX) p.x = maxSpreadX;
        if (p.x > maxSpreadX) p.x = -maxSpreadX;
        if (p.y < -maxSpreadY) p.y = maxSpreadY;
        if (p.y > maxSpreadY) p.y = -maxSpreadY;
        if (p.z < -maxSpreadZ) p.z = maxSpreadZ;
        if (p.z > maxSpreadZ) p.z = -maxSpreadZ;

        // 3D Matrix Rotation (Y then X)
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Perspective Projection
        const depth = z2 + 650;
        if (depth <= 10) continue;

        const scale = fov / depth;
        const px = x1 * scale + width / 2;
        const py = y2 * scale + height / 2;

        const alpha = Math.max(0.1, Math.min(0.85, (depth - 150) / 700));

        projected.push({ px, py, pz: z2, p, scale, alpha });
      }

      // Draw 3D Connection Filaments between nodes
      const maxDistance = 140;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.22 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);

            // Gradient line matching node colors
            const grad = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py);
            grad.addColorStop(0, p1.p.color);
            grad.addColorStop(1, p2.p.color);

            ctx.strokeStyle = grad;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = Math.max(0.6, (p1.scale + p2.scale) * 0.5);
            ctx.stroke();
          }
        }
      }

      // Draw Projected 3D Nodes with Pulsing Glow
      for (let i = 0; i < projected.length; i++) {
        const { px, py, p, scale, alpha } = projected[i];
        const pulse = Math.sin(time * 2 + p.pulsePhase) * 0.35 + 1;
        const radius = p.baseRadius * scale * pulse;

        if (radius <= 0.2) continue;

        ctx.globalAlpha = alpha;

        // Outer Neon Bloom
        const glowRadius = radius * 4;
        const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, glowRadius);
        glowGrad.addColorStop(0, p.color);
        glowGrad.addColorStop(0.4, p.color);
        glowGrad.addColorStop(1, "transparent");

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(px, py, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Inner Core
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(px, py, Math.max(1, radius * 0.8), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70"
    />
  );
}
