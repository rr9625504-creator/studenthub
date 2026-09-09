import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { ParticleNetwork3D } from "./3d/particle-network-3d";
import { TiltCard3D, DepthLayer } from "./3d/tilt-card-3d";

export function PageShell({ children }: { children: ReactNode }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative overflow-x-clip bg-grid-pattern selection:bg-spider/30">
      <ParticleNetwork3D />
      <BubbleBackground />
      <Nav />
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative pt-20"
      >
        {children}
      </motion.main>
      <Footer />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 h-11 w-11 rounded-full glass-strong border border-white/20 flex items-center justify-center text-white shadow-xl hover:border-spider/60 hover:bg-spider/20 transition-all group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function BubbleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Top Left Spider Neon Glow */}
      <div className="absolute -top-32 -left-32 h-[560px] w-[560px] rounded-full bg-[#ff3b5c]/16 blur-[140px] animate-float" />
      {/* Middle Right Electric Glow */}
      <div
        className="absolute top-1/4 -right-32 h-[640px] w-[640px] rounded-full bg-[#3b82f6]/16 blur-[160px] animate-float"
        style={{ animationDelay: "2.5s" }}
      />
      {/* Center Violet Hub Glow */}
      <div
        className="absolute top-2/3 left-1/4 h-[500px] w-[500px] rounded-full bg-[#a855f7]/12 blur-[150px] animate-float"
        style={{ animationDelay: "4.5s" }}
      />
      {/* Bottom Spider Subtle Glow */}
      <div
        className="absolute -bottom-20 right-1/4 h-[420px] w-[420px] rounded-full bg-[#ff3b5c]/10 blur-[130px] animate-float"
        style={{ animationDelay: "1.5s" }}
      />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-16 pb-14 text-center relative">
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold text-white/90 border border-white/15 mb-6 shadow-lg shadow-black/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spider opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-spider"></span>
          </span>
          <span className="tracking-wide uppercase text-[11px] font-bold">{eyebrow}</span>
        </motion.div>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.6 }}
        className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06]"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="mt-6 text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
      >
        {subtitle}
      </motion.p>
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  tag,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tag?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.45 }}
      className="h-full"
    >
      <TiltCard3D maxTilt={14} glareOpacity={0.28} className="h-full">
        <div className="h-full group relative glass-card rounded-3xl p-6 hover:border-white/25 transition-all duration-300 overflow-hidden flex flex-col justify-between card-3d-shadow">
          {/* Card hover gradient highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-spider/8 via-transparent to-electric/8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div>
            <DepthLayer depth={25} className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-spider/40 transition-all duration-300 shadow-md">
                <Icon className="h-5 w-5 text-white group-hover:text-spider transition-colors" />
              </div>
              {tag && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-muted-foreground group-hover:text-white group-hover:border-spider/30 transition-colors">
                  {tag}
                </span>
              )}
            </DepthLayer>

            <DepthLayer depth={18}>
              <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-white transition-colors">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </DepthLayer>
          </div>

          <DepthLayer depth={12} className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-spider transition-colors font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Built-in 3D Tool</span>
          </DepthLayer>
        </div>
      </TiltCard3D>
    </motion.div>
  );
}

