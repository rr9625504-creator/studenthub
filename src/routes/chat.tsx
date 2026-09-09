import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageCircle,
  Users,
  Mic,
  Smile,
  Image as ImageIcon,
  FileText,
  Pin,
  Search,
  Eye,
  CircleDot,
  Phone,
  Video,
  Zap,
  Heart,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Radio,
  Share2,
  Boxes,
} from "lucide-react";
import { PageShell, PageHero, FeatureCard } from "../components/page-shell";
import { ChatMock } from "../components/chat-mock";
import { AudioWaveform3D } from "../components/3d/audio-waveform-3d";
import { TiltCard3D, DepthLayer } from "../components/3d/tilt-card-3d";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat Experience — MONO" },
      {
        name: "description",
        content:
          "Experience silky-smooth DMs, study group channels, voice note waveforms, media sharing, and instant AI collaboration.",
      },
      { property: "og:title", content: "Chat Experience — MONO" },
      {
        property: "og:description",
        content: "Built specifically for how students communicate, coordinate, and study together.",
      },
    ],
  }),
  component: ChatPage,
});

const features = [
  {
    icon: MessageCircle,
    title: "One-to-One Messaging",
    description: "Snappy DMs with glowing bubbles, typing indicators, and instant receipt sync.",
    tag: "Instant",
  },
  {
    icon: Users,
    title: "Study Groups & Cohorts",
    description: "Dedicated spaces for course teams with thread segregation and pinned lecture info.",
    tag: "Study",
  },
  {
    icon: Mic,
    title: "Waveform Voice Notes",
    description: "Send audio with live scrubbing waveforms, 1.5x/2x speedup, and instant AI transcripts.",
    tag: "Voice",
  },
  {
    icon: Sparkles,
    title: "Inline /AI Assistant",
    description: "Summon MONO AI directly into any conversation with /ai without switching apps.",
    tag: "AI 2.0",
  },
  {
    icon: Heart,
    title: "Custom Emoji Reactions",
    description: "React to important announcements or celebrate submitted problem sets with emoji counters.",
    tag: "Fun",
  },
  {
    icon: FileText,
    title: "Lecture PDF & Code Dumps",
    description: "Drop 50MB slides or syntax-highlighted code blocks with built-in previewers.",
    tag: "Media",
  },
  {
    icon: Pin,
    title: "Course Pinboard",
    description: "Pin syllabus links, Zoom links, and exam dates at the top of the group header.",
    tag: "Org",
  },
  {
    icon: Search,
    title: "Omni-Search",
    description: "Instant search across all group chats, shared notes, and PDF attachments in milliseconds.",
    tag: "Search",
  },
  {
    icon: Radio,
    title: "Live Audio Study Rooms",
    description: "Drop-in Discord-style voice lounges with background noise suppression.",
    tag: "Live",
  },
  {
    icon: ShieldCheck,
    title: "Granular Privacy",
    description: "Control read receipts, online indicators, and member invites per channel.",
    tag: "Security",
  },
  {
    icon: Phone,
    title: "Crystal Voice Calling",
    description: "Low-latency HD voice calls directly inside group chats for quick cram sessions.",
    tag: "Voice",
  },
  {
    icon: Video,
    title: "HD Video Collaboration",
    description: "Group video sessions with integrated whiteboard and document sharing.",
    tag: "Soon",
    soon: true,
  },
];

function ChatPage() {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<"1x" | "1.5x" | "2x">("1.5x");
  const [isMuted, setIsMuted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const toggleVoicePlay = () => {
    setIsPlayingVoice(!isPlayingVoice);
    if (!isPlayingVoice) toast.info("Playing 3D spatial lecture audio explanation...");
  };

  const filteredFeatures =
    activeCategory === "all"
      ? features
      : features.filter((f) => {
          if (activeCategory === "ai") return f.tag?.includes("AI");
          if (activeCategory === "voice") return f.tag === "Voice" || f.tag === "Live";
          if (activeCategory === "media") return f.tag === "Media" || f.tag === "Org";
          return true;
        });

  return (
    <PageShell>
      <PageHero
        eyebrow="The 3D Chat Experience"
        title={
          <>
            Messaging built for <span className="text-gradient">student life.</span>
          </>
        }
        subtitle="Unbelievably fast, beautifully designed, and packed with the study tools you actually need — right inside the conversation."
      >
        <Link
          to="/pricing"
          className="btn-brand px-7 py-3 rounded-full text-xs font-bold inline-flex items-center gap-2"
        >
          <Zap className="h-3.5 w-3.5 fill-white" /> Start Free Student Account
        </Link>
        <Link
          to="/ai-workspace"
          className="glass px-6 py-3 rounded-full text-xs font-bold text-white hover:bg-white/10 transition-colors"
        >
          Explore AI Assistant →
        </Link>
      </PageHero>

      {/* Interactive Chat Mock Simulator with 3D Perspective */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <ChatMock />
      </section>

      {/* Interactive 3D Voice Note Showcase */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold text-spider uppercase tracking-wider mb-4">
              3D Spatial Audio & Waveforms
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Explain tricky concepts in <span className="text-gradient">3D sound.</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              Typing out complex math proofs or algorithm logic takes minutes. Tap record, speak
              freely, and MONO automatically generates real-time 3D spatial waveforms and an AI text
              transcript.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "3D Cylindrical audio equalizer with 360° rotation",
                "Speed up long audio up to 2x without pitch distortion",
                "Instant AI text transcript with searchable keywords",
                "Background noise filter for noisy dorms and campus cafes",
              ].map((point) => (
                <div key={point} className="flex items-center gap-2.5 text-xs text-white/90">
                  <div className="h-5 w-5 rounded-full bg-spider/20 border border-spider/30 flex items-center justify-center text-spider font-bold text-[10px]">
                    ✓
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interactive 3D Waveform Studio Component */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AudioWaveform3D
              isPlaying={isPlayingVoice}
              onTogglePlay={toggleVoicePlay}
              title="Vino (CS 301 Study Group) · DP Memoization"
              speaker="Audio Note · 0:48 duration"
            />
          </motion.div>
        </div>
      </section>


      {/* Feature Grid with Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Built from the ground up for <span className="text-gradient">modern cohorts.</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            Every button, animation, and permission was crafted to make student discussions effortless.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              { id: "all", label: "All Features" },
              { id: "ai", label: "AI & Smart Tools" },
              { id: "voice", label: "Audio & Voice Rooms" },
              { id: "media", label: "PDFs & Collaboration" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-white/20 text-white border border-white/25 shadow-md"
                    : "glass text-muted-foreground hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFeatures.map((f, i) => (
            <div key={f.title} className="relative">
              <FeatureCard {...f} delay={i * 0.02} />
              {f.soon && (
                <span className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-electric/20 text-electric border border-electric/30">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Community Types Showcase */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
            Campus Ecosystems
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Spaces for every aspect of <span className="text-gradient">campus life.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              emoji: "📚",
              title: "Study Groups & Cram Crews",
              text: "Coordinate problem sets, share lecture recordings, and prepare for finals together in focused course hubs.",
              stat: "4,200+ Active Study Groups",
              color: "#ff3b5c",
            },
            {
              emoji: "🚀",
              title: "Hackathons & Project Teams",
              text: "Dedicated Kanban boards, live voice lounges, and GitHub code embeds for your weekend engineering sprint.",
              stat: "850+ Projects Built",
              color: "#3b82f6",
            },
            {
              emoji: "🏠",
              title: "Dorm & Social Societies",
              text: "Keep flatmates and student club members in sync with announcements, chore reminders, and social hangouts.",
              stat: "320+ University Dorms",
              color: "#a855f7",
            },
          ].map((u, i) => (
            <motion.div
              key={u.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="h-full"
            >
              <TiltCard3D maxTilt={14} glareOpacity={0.25} className="h-full">
                <div className="glass-card rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between h-full card-3d-shadow">
                  <div>
                    <DepthLayer depth={25} className="text-4xl mb-4">
                      {u.emoji}
                    </DepthLayer>
                    <DepthLayer depth={18} className="font-bold text-lg text-white mb-2">
                      {u.title}
                    </DepthLayer>
                    <DepthLayer depth={12} className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                      {u.text}
                    </DepthLayer>
                  </div>
                  <DepthLayer depth={15} className="pt-4 border-t border-white/10 text-xs font-bold text-white flex items-center justify-between">
                    <span className="text-muted-foreground">{u.stat}</span>
                    <span className="text-spider">Explore →</span>
                  </DepthLayer>
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

