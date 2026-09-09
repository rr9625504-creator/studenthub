import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Github, Twitter, Instagram, Linkedin, Send, Sparkles, ShieldCheck, Heart } from "lucide-react";
import { toast } from "sonner";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    toast.success("Subscribed to MONO Student Digest! 🎉");
    setNewsletterEmail("");
  };

  return (
    <footer className="mt-32 border-t border-white/10 bg-navy-1/80 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-spider/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-12 lg:grid-cols-5">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 rounded-xl overflow-hidden shadow-lg shadow-spider/30 group-hover:scale-105 transition-transform">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#ff3b5c,#3b82f6)]" />
              <div className="absolute inset-0 flex items-center justify-center font-black text-white text-lg">
                M
              </div>
            </div>
            <span className="font-black text-xl tracking-tight text-white group-hover:text-gradient transition-colors">
              MONO
            </span>
          </Link>

          <p className="max-w-sm text-xs sm:text-sm text-muted-foreground leading-relaxed">
            The next-generation unified study platform built for university students — messaging,
            interactive flashcards, collaborative notes, and AI that lives right where you talk.
          </p>

          {/* Operational Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 text-[11px] text-white/90">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>All Systems Operational · 99.99% Uptime</span>
          </div>

          <div className="pt-2 flex gap-2.5">
            {[
              { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="h-9 w-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-white hover:border-spider/50 transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Product Navigation */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-white mb-4">
            Study Platform
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
            <li>
              <Link to="/chat" className="hover:text-white hover:text-spider transition-colors">
                Cohort Chat & Audio
              </Link>
            </li>
            <li>
              <Link
                to="/ai-workspace"
                className="hover:text-white hover:text-spider transition-colors flex items-center gap-1"
              >
                <span>AI Study Studio</span>
                <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-electric/20 text-electric">
                  NEW
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/productivity"
                className="hover:text-white hover:text-spider transition-colors"
              >
                Kanban & Notes Hub
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-white hover:text-spider transition-colors">
                Student Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* Company & Resources */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-white mb-4">
            Ecosystem
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
            <li>
              <Link to="/pricing" hash="about" className="hover:text-white transition-colors">
                Our Student Mission
              </Link>
            </li>
            <li>
              <Link to="/pricing" hash="contact" className="hover:text-white transition-colors">
                Campus Ambassadors
              </Link>
            </li>
            <li>
              <a
                href="#security"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info("MONO uses AES-256 and TLS 1.3 encryption for all academic chats.");
                }}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Security & Privacy
              </a>
            </li>
            <li>
              <Link to="/pricing" hash="contact" className="hover:text-white transition-colors">
                Partner with MONO
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-white">
            Student Weekly Digest
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Get curated midterm cheat-sheets, AI prompt guides, and product drops once a week.
          </p>

          <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="you@university.edu"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-spider"
            />
            <button
              type="submit"
              className="w-full btn-brand py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-spider/20"
            >
              <Send className="h-3 w-3" /> Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Sub-footer bottom bar */}
      <div className="border-t border-white/5 bg-black/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} MONO Inc. More Than Messages. All rights reserved.</div>
          <div className="flex items-center gap-1 text-white/80">
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 text-spider fill-spider" />
            <span>for students worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
