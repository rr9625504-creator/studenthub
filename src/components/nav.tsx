import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  Menu,
  X,
  Search,
  Bell,
  Sparkles,
  Command,
  MessageCircle,
  BrainCircuit,
  ListChecks,
  Zap,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

const links = [
  { to: "/", label: "Home", icon: Zap },
  { to: "/chat", label: "Chat", badge: "Live" },
  { to: "/ai-workspace", label: "AI Workspace", badge: "AI" },
  { to: "/productivity", label: "Productivity" },
  { to: "/pricing", label: "Pricing" },
];

const mockNotifications = [
  {
    id: "1",
    title: "CS301 Algorithms",
    desc: "Priya uploaded Lecture 07 notes (PDF)",
    time: "5m ago",
    unread: true,
  },
  {
    id: "2",
    title: "MONO AI Copilot",
    desc: "Your exam study plan for DSA is ready!",
    time: "25m ago",
    unread: true,
  },
  {
    id: "3",
    title: "Campus Hackathon Team",
    desc: "Alex started a voice study room in #dev-lounge",
    time: "1h ago",
    unread: false,
  },
];

const searchItems = [
  {
    title: "Chat & Direct Messages",
    to: "/chat",
    category: "Communication",
    icon: MessageCircle,
    desc: "Open live chat, study groups & communities",
  },
  {
    title: "AI Study Studio & Flashcards",
    to: "/ai-workspace",
    category: "AI Tools",
    icon: BrainCircuit,
    desc: "Summarize PDFs, generate quizzes & explain code",
  },
  {
    title: "Kanban Board & Tasks",
    to: "/productivity",
    category: "Productivity",
    icon: ListChecks,
    desc: "Manage assignments, deadlines & Pomodoro timer",
  },
  {
    title: "Student Pro Plan & Pricing",
    to: "/pricing",
    category: "Account",
    icon: Sparkles,
    desc: "Get unlimited AI and verified student discount",
  },
  {
    title: "Shared Notes & Documents",
    to: "/productivity",
    category: "Study Hub",
    icon: BookOpen,
    desc: "Real-time collaborative lecture notes",
  },
];

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setNotifOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Click outside to close notifications
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    toast.success("All notifications marked as read");
  };

  const filteredSearch = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-2xl bg-navy/80 border-b border-white/10 shadow-lg shadow-black/40 py-2.5"
            : "bg-transparent py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative h-10 w-10 rounded-2xl overflow-hidden shadow-md shadow-spider/30 group-hover:scale-105 transition-transform">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#ff3b5c,#3b82f6)] animate-gradient" />
              <div className="absolute inset-0 flex items-center justify-center font-black text-white text-xl tracking-tighter">
                M
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight text-white group-hover:text-spider transition-colors">
                  MONO
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-spider animate-pulse" />
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest -mt-1 hidden sm:block">
                Student OS
              </span>
            </div>
          </Link>

          {/* Center Navigation links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-full px-2 py-1 backdrop-blur-xl">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? "text-white shadow-sm"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-spider/30 to-electric/30 border border-white/20"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                  {l.badge && (
                    <span
                      className={`relative z-10 text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ${
                        l.badge === "Live"
                          ? "bg-spider/30 text-spider border border-spider/40"
                          : "bg-electric/30 text-electric border border-electric/40"
                      }`}
                    >
                      {l.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 rounded-full glass px-3.5 py-2 text-xs text-muted-foreground hover:text-white hover:border-white/25 transition-all group"
              title="Search anything (Cmd+K)"
            >
              <Search className="h-3.5 w-3.5 group-hover:text-spider transition-colors" />
              <span className="text-[11px] font-medium">Search...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 py-0.2 text-[10px] text-muted-foreground font-mono">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </button>

            {/* Notification Bell Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative h-9 w-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/20 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-spider text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 sm:w-96 glass-strong rounded-2xl border border-white/15 p-4 shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">Campus Alerts</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-spider/20 text-spider">
                          {unreadCount} new
                        </span>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllRead}
                          className="text-[11px] text-muted-foreground hover:text-white transition-colors"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            setNotifications((prev) =>
                              prev.map((item) =>
                                item.id === n.id ? { ...item, unread: false } : item
                              )
                            );
                            setNotifOpen(false);
                            navigate({ to: "/chat" });
                          }}
                          className={`p-3 rounded-xl border transition-all cursor-pointer ${
                            n.unread
                              ? "bg-white/[0.07] border-spider/30 hover:border-spider/60"
                              : "bg-white/[0.02] border-white/5 hover:border-white/15"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-semibold text-white">{n.title}</span>
                            <span className="text-[10px] text-muted-foreground">{n.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{n.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/pricing"
                className="text-xs font-semibold text-muted-foreground hover:text-white px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/chat"
                className="btn-brand px-4 py-2 rounded-full text-xs font-bold inline-flex items-center gap-1.5"
              >
                <Zap className="h-3.5 w-3.5 fill-white" />
                Launch App
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-xl glass text-white hover:bg-white/10 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass-strong border-t border-white/10 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-2">
                {/* Mobile Search trigger */}
                <button
                  onClick={() => {
                    setOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-2xl glass text-xs text-muted-foreground"
                >
                  <span className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-spider" /> Quick Search...
                  </span>
                  <kbd className="text-[10px] font-mono border border-white/10 px-1.5 py-0.5 rounded">
                    Cmd+K
                  </kbd>
                </button>

                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                      pathname === l.to
                        ? "bg-white/10 text-white border border-white/15"
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{l.label}</span>
                    {l.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-spider/20 text-spider border border-spider/30">
                        {l.badge}
                      </span>
                    )}
                  </Link>
                ))}

                <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                  <Link
                    to="/pricing"
                    className="btn-brand py-3 rounded-2xl text-sm font-bold text-center flex items-center justify-center gap-2"
                  >
                    <Zap className="h-4 w-4 fill-white" /> Get Started Free
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Quick Search Modal (Cmd+K) */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="relative w-full max-w-xl glass-strong rounded-3xl border border-white/20 p-4 shadow-2xl z-10 overflow-hidden"
            >
              <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10">
                <Search className="h-5 w-5 text-spider" />
                <input
                  type="text"
                  placeholder="Search features, tools, notes, study groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent text-sm text-white placeholder-muted-foreground outline-none font-medium"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 max-h-80 overflow-y-auto space-y-1.5 pr-1">
                {filteredSearch.length === 0 ? (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    No results found for "{searchQuery}". Try "AI", "Notes", "Tasks", or "Chat".
                  </div>
                ) : (
                  filteredSearch.map((item) => (
                    <Link
                      key={item.title}
                      to={item.to}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/10 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground group-hover:text-spider group-hover:border-spider/30 transition-colors">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-spider transition-colors">
                            {item.title}
                          </div>
                          <div className="text-xs text-muted-foreground">{item.desc}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </Link>
                  ))
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-muted-foreground px-2">
                <span>Navigation shortcut</span>
                <span className="flex items-center gap-2">
                  <kbd className="border border-white/10 px-1 rounded">ESC</kbd> to close
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
