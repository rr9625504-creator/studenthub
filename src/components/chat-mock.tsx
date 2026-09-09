import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCheck,
  Paperclip,
  Mic,
  Smile,
  Send,
  Sparkles,
  Play,
  Pause,
  Hash,
  Bot,
  FileText,
  Volume2,
  Share2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

interface MessageItem {
  id: string;
  from: string;
  isMe?: boolean;
  isAi?: boolean;
  avatarColor?: string;
  text?: string;
  type?: "text" | "file" | "voice" | "ai";
  fileName?: string;
  fileSize?: string;
  voiceDuration?: string;
  reactions?: { emoji: string; count: number; reacted?: boolean }[];
  time: string;
}

const initialChannels: Array<{ id: string; name: string; icon?: LucideIcon; unread?: number; online: number; badge?: string; isDm?: boolean }> = [
  { id: "cse", name: "CSE-301 Algorithms", icon: Hash, unread: 2, online: 14 },
  { id: "ai", name: "MONO AI Copilot", icon: Bot, badge: "AI", online: 1 },
  { id: "hackathon", name: "Hackathon Team", icon: Users, online: 5 },
  { id: "maya", name: "Maya Lin", icon: Users, isDm: true, online: 1 },
];

const defaultMessages: Record<string, MessageItem[]> = {
  cse: [
    {
      id: "1",
      from: "Vino",
      avatarColor: "#a855f7",
      text: "Anyone got notes from today's Dynamic Programming lecture?",
      time: "10:14 AM",
      reactions: [{ emoji: "🙋‍♂️", count: 3 }],
    },
    {
      id: "2",
      from: "You",
      isMe: true,
      text: "Just uploaded the PDF lecture slides and summary! 📎",
      time: "10:15 AM",
    },
    {
      id: "3",
      from: "You",
      isMe: true,
      type: "file",
      fileName: "CS301_DP_Lecture07.pdf",
      fileSize: "3.2 MB",
      time: "10:15 AM",
    },
    {
      id: "4",
      from: "Mohan",
      avatarColor: "#22c55e",
      text: "Legend 🔥 saving my grade this midterm.",
      time: "10:16 AM",
      reactions: [
        { emoji: "❤️", count: 4, reacted: true },
        { emoji: "🔥", count: 6 },
      ],
    },
    {
      id: "5",
      from: "MONO AI",
      isAi: true,
      text: "I analyzed the PDF — 3 Core takeaways: Memoization tables, Optimal Substructure, and Knapsack 0/1. Would you like a 5-question practice quiz?",
      time: "10:16 AM",
    },
  ],
  ai: [
    {
      id: "a1",
      from: "MONO AI",
      isAi: true,
      text: "Hi Alex! I'm your dedicated student AI. Ask me to summarize lecture PDFs, explain tricky code, or generate flashcards.",
      time: "Just now",
    },
    {
      id: "a2",
      from: "You",
      isMe: true,
      text: "Can you explain Dijkstra's algorithm with a real-life analogy?",
      time: "Just now",
    },
    {
      id: "a3",
      from: "MONO AI",
      isAi: true,
      text: "Think of Dijkstra like a GPS finding the fastest route to campus. It explores nearest intersections first, calculating total travel time, and never looks back at slower paths once optimal distance is verified.",
      time: "Just now",
    },
  ],
  hackathon: [
    {
      id: "h1",
      from: "Sarah (Design)",
      avatarColor: "#f59e0b",
      text: "Figma wireframes for the Student OS dashboard are finalized! Check them out.",
      time: "9:30 AM",
      reactions: [{ emoji: "🚀", count: 5 }],
    },
    {
      id: "h2",
      from: "Devin (Backend)",
      avatarColor: "#3b82f6",
      type: "voice",
      voiceDuration: "0:28",
      text: "Voice note regarding API endpoints and WebSocket live sync...",
      time: "9:45 AM",
    },
  ],
  maya: [
    {
      id: "m1",
      from: "Maya",
      avatarColor: "#ec4899",
      text: "Are we meeting in the library at 4 PM for the group project?",
      time: "11:02 AM",
    },
    {
      id: "m2",
      from: "You",
      isMe: true,
      text: "Yes! 3rd floor study room B is booked.",
      time: "11:05 AM",
    },
  ],
};

export function ChatMock({ compact = false }: { compact?: boolean }) {
  const [activeChannel, setActiveChannel] = useState("cse");
  const [messages, setMessages] = useState<Record<string, MessageItem[]>>(defaultMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [playingVoice, setPlayingVoice] = useState(false);

  const currentChannel = initialChannels.find((c) => c.id === activeChannel)!;
  const CurrentChannelIcon = currentChannel.icon ?? Users;
  const channelMessages = messages[activeChannel] || [];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg: MessageItem = {
      id: Date.now().toString(),
      from: "You",
      isMe: true,
      text: text.trim(),
      time: "Just now",
    };

    setMessages((prev) => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMsg],
    }));
    setInputText("");

    // Simulate smart AI or peer response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "Got it! Let's conquer this assignment together 🚀";
      if (activeChannel === "ai" || text.includes("/ai") || text.includes("?")) {
        replyText =
          "⚡ MONO AI: I've processed your prompt and added key formula cards to your study dashboard!";
      }

      const botMsg: MessageItem = {
        id: (Date.now() + 1).toString(),
        from: activeChannel === "ai" ? "MONO AI" : "Priya",
        isAi: activeChannel === "ai",
        avatarColor: "#3b82f6",
        text: replyText,
        time: "Just now",
        reactions: [{ emoji: "💡", count: 1 }],
      };

      setMessages((prev) => ({
        ...prev,
        [activeChannel]: [...(prev[activeChannel] || []), botMsg],
      }));
      toast.success("New message received in " + currentChannel.name);
    }, 1200);
  };

  const handleReactionClick = (msgId: string, emoji: string) => {
    setMessages((prev) => {
      const chatList = prev[activeChannel] || [];
      return {
        ...prev,
        [activeChannel]: chatList.map((msg) => {
          if (msg.id !== msgId) return msg;
          const existing = msg.reactions || [];
          const found = existing.find((r) => r.emoji === emoji);
          if (found) {
            return {
              ...msg,
              reactions: existing.map((r) =>
                r.emoji === emoji
                  ? { ...r, count: r.reacted ? r.count - 1 : r.count + 1, reacted: !r.reacted }
                  : r
              ),
            };
          } else {
            return {
              ...msg,
              reactions: [...existing, { emoji, count: 1, reacted: true }],
            };
          }
        }),
      };
    });
  };

  return (
    <div className={`relative ${compact ? "" : "w-full max-w-5xl mx-auto"}`}>
      {/* Background glow orb */}
      <div className="absolute -inset-4 sm:-inset-8 bg-[radial-gradient(ellipse_at_center,rgba(255,59,92,0.2),rgba(59,130,246,0.15),transparent_70%)] blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative glass-strong rounded-[2rem] border border-white/20 overflow-hidden shadow-2xl grid md:grid-cols-[240px_1fr] min-h-[540px] card-3d-shadow"
      >
        {/* Left Channels & Chat List */}
        <aside className="border-r border-white/10 p-3.5 bg-black/30 flex flex-col justify-between hidden md:flex">
          <div>
            <div className="flex items-center justify-between px-2.5 py-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-[linear-gradient(135deg,#ff3b5c,#3b82f6)] flex items-center justify-center font-black text-white text-xs">
                  M
                </div>
                <span className="font-bold text-xs tracking-wider text-white">CHANNELS</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                LIVE
              </span>
            </div>

            <div className="space-y-1">
              {initialChannels.map((c) => {
                const active = activeChannel === c.id;
                const ChannelIcon = c.icon ?? Users;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveChannel(c.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                      active
                        ? "bg-white/15 text-white shadow-md border border-white/15"
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div
                        className={`h-6 w-6 rounded-lg flex items-center justify-center ${
                          active
                            ? "bg-spider/30 text-spider"
                            : "bg-white/5 text-muted-foreground"
                        }`}
                      >
                        <ChannelIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="truncate">{c.name}</span>
                    </div>
                    {c.unread && !active && (
                      <span className="h-2 w-2 rounded-full bg-spider animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Prompts */}
            <div className="mt-6 pt-4 border-t border-white/10 px-2">
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-spider" /> AI Shortcuts
              </div>
              <div className="space-y-1.5">
                {[
                  { label: "Summarize PDF", cmd: "Summarize the CS301 PDF into 3 bullet points" },
                  { label: "Generate Quiz", cmd: "Create a 3-question quiz on Dynamic Programming" },
                  { label: "Explain Dijkstra", cmd: "Explain Dijkstra algorithm step by step" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSendMessage(item.cmd)}
                    className="w-full text-left text-[11px] text-muted-foreground hover:text-white hover:bg-white/10 px-2.5 py-1.5 rounded-xl transition-colors truncate border border-transparent hover:border-white/10"
                  >
                    ⚡ {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-2 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-2.5">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-[linear-gradient(135deg,#ff3b5c,#3b82f6)] flex items-center justify-center font-bold text-white text-xs">
                A
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-navy" />
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-white">Alex Chen</div>
              <div className="text-[10px] text-muted-foreground">CS · Junior</div>
            </div>
          </div>
        </aside>

        {/* Main Chat Stream */}
        <div className="flex flex-col justify-between bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08),transparent_60%)]">
          {/* Channel Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-black/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-spider/20 to-electric/20 border border-white/15 flex items-center justify-center text-white font-bold text-xs">
                  <CurrentChannelIcon className="h-4 w-4 text-spider" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-navy" />
              </div>
              <div>
                <div className="font-bold text-sm text-white flex items-center gap-2">
                  <span>{currentChannel.name}</span>
                  {currentChannel.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-spider/20 text-spider border border-spider/30">
                      {currentChannel.badge}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{currentChannel.online} active students · Live Sync</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toast.info("Voice study room link copied to clipboard!")}
                className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white glass px-3 py-1.5 rounded-full transition-colors"
              >
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="p-5 space-y-3.5 overflow-y-auto max-h-[380px] min-h-[340px]">
            {channelMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-end gap-2.5 max-w-[85%] sm:max-w-[75%]`}>
                  {!msg.isMe && (
                    <div
                      className={`h-7 w-7 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-md ${
                        msg.isAi
                          ? "bg-[linear-gradient(135deg,#ff3b5c,#3b82f6)] animate-pulse-glow"
                          : ""
                      }`}
                      style={
                        !msg.isAi
                          ? { background: `linear-gradient(135deg, ${msg.avatarColor || "#ff3b5c"}, #0b1220)` }
                          : undefined
                      }
                    >
                      {msg.isAi ? <Sparkles className="h-3.5 w-3.5" /> : msg.from[0]}
                    </div>
                  )}

                  <div className="relative group">
                    {!msg.isMe && (
                      <div className="text-[11px] text-muted-foreground font-medium mb-1 px-1 flex items-center gap-1.5">
                        <span>{msg.from}</span>
                        {msg.isAi && (
                          <span className="text-[9px] font-bold px-1.5 rounded bg-electric/20 text-electric">
                            AI BOT
                          </span>
                        )}
                      </div>
                    )}

                    {/* Message Body Types */}
                    {msg.type === "file" ? (
                      <div className="glass-card rounded-2xl rounded-br-md p-3.5 flex items-center gap-3 border border-white/15 hover:border-spider/40 transition-colors shadow-lg cursor-pointer">
                        <div className="h-10 w-10 rounded-xl bg-spider/20 border border-spider/30 flex items-center justify-center text-spider font-black text-xs">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">{msg.fileName}</div>
                          <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                            <span>{msg.fileSize}</span>
                            <span>• Click to open</span>
                          </div>
                        </div>
                      </div>
                    ) : msg.type === "voice" ? (
                      <div className="glass-card rounded-2xl rounded-bl-md p-3 flex items-center gap-3 border border-white/15">
                        <button
                          onClick={() => setPlayingVoice(!playingVoice)}
                          className="h-8 w-8 rounded-full btn-brand flex items-center justify-center"
                        >
                          {playingVoice ? (
                            <Pause className="h-3.5 w-3.5 fill-white" />
                          ) : (
                            <Play className="h-3.5 w-3.5 fill-white ml-0.5" />
                          )}
                        </button>
                        <div className="flex items-center gap-0.5 h-6 w-32">
                          {Array.from({ length: 24 }).map((_, i) => (
                            <div
                              key={i}
                              className={`flex-1 rounded-full transition-all duration-200 ${
                                playingVoice && i < 14
                                  ? "bg-spider"
                                  : "bg-white/20"
                              }`}
                              style={{
                                height: `${30 + Math.sin(i * 0.8) * 50 + (playingVoice ? Math.random() * 20 : 0)}%`,
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {msg.voiceDuration}
                        </span>
                      </div>
                    ) : (
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                          msg.isMe
                            ? "bg-[linear-gradient(135deg,#ff3b5c,#3b82f6)] text-white shadow-lg shadow-spider/20 rounded-br-md font-medium"
                            : msg.isAi
                            ? "glass-strong border border-electric/40 text-white rounded-bl-md"
                            : "glass text-white rounded-bl-md"
                        }`}
                      >
                        {msg.text}
                      </div>
                    )}

                    {/* Reactions pill */}
                    {msg.reactions && msg.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {msg.reactions.map((r) => (
                          <button
                            key={r.emoji}
                            onClick={() => handleReactionClick(msg.id, r.emoji)}
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] transition-all ${
                              r.reacted
                                ? "bg-spider/30 border border-spider text-white shadow-sm"
                                : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10"
                            }`}
                          >
                            <span>{r.emoji}</span>
                            <span className="font-semibold text-[10px]">{r.count}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    <div
                      className={`text-[10px] text-muted-foreground mt-1 flex items-center gap-1 ${
                        msg.isMe ? "justify-end" : "justify-start"
                      }`}
                    >
                      <span>{msg.time}</span>
                      {msg.isMe && <CheckCheck className="h-3 w-3 text-electric" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2"
              >
                <div className="h-6 w-6 rounded-full bg-[linear-gradient(135deg,#ff3b5c,#3b82f6)] flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <div className="glass rounded-full px-3.5 py-1.5 flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-electric"
                      style={{ animation: `typing-dot 1.2s ${i * 0.15}s infinite` }}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-muted-foreground">Thinking...</span>
              </motion.div>
            )}
          </div>

          {/* Interactive Composer */}
          <div className="border-t border-white/10 p-3 bg-black/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={() => toast.info("PDF/File uploaded to conversation!")}
                className="h-9 w-9 rounded-full glass hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
                title="Attach lecture PDF or notes"
              >
                <Paperclip className="h-4 w-4" />
              </button>

              <div className="flex-1 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs sm:text-sm text-white flex items-center justify-between focus-within:border-spider/50 focus-within:bg-white/[0.08] transition-all">
                <input
                  type="text"
                  placeholder={`Message ${currentChannel.name}... (try asking /ai)`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setInputText((prev) => prev + " 🔥")}
                  className="text-muted-foreground hover:text-amber-400 transition-colors ml-2"
                >
                  <Smile className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => toast.info("Voice note recording simulation ready")}
                className="h-9 w-9 rounded-full glass hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
                title="Hold to record voice note"
              >
                <Mic className="h-4 w-4" />
              </button>

              <button
                type="submit"
                className="h-9 w-9 rounded-full btn-brand flex items-center justify-center shadow-lg shadow-spider/30"
                title="Send Message"
              >
                <Send className="h-4 w-4 fill-white" />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
