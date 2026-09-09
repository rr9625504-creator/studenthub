import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  Sparkles,
  ChevronDown,
  Mail,
  MapPin,
  Twitter,
  Instagram,
  Github,
  Linkedin,
  Zap,
  HelpCircle,
  Search,
  ShieldCheck,
  GraduationCap,
  ArrowRight,
  Send,
  Building,
  Box,
} from "lucide-react";
import { PageShell, PageHero } from "../components/page-shell";
import { TiltCard3D, DepthLayer } from "../components/3d/tilt-card-3d";
import { toast } from "sonner";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing & Student Discounts — MONO" },
      {
        name: "description",
        content:
          "Simple, affordable pricing built for students. Start 100% free, upgrade for unlimited AI study tools and campus server features.",
      },
      { property: "og:title", content: "Pricing & Student Discounts — MONO" },
      {
        property: "og:description",
        content: "Free forever for core features. 50% off Pro with verified .edu email.",
      },
    ],
  }),
  component: PricingPage,
});

const faqs = [
  {
    q: "Is MONO really 100% free for students?",
    a: "Yes! The free plan includes unlimited group chats, voice notes, Kanban boards, collaborative notes, shared calendars, and 100 free AI queries per month.",
    category: "general",
  },
  {
    q: "Do I need a verified .edu email?",
    a: "No, anyone can use MONO Free. However, verifying your .edu email unlocks an automatic 50% discount on MONO Pro ($3/mo billed annually) plus exclusive campus server channels.",
    category: "billing",
  },
  {
    q: "How is MONO different from Discord or WhatsApp?",
    a: "Unlike generic chat apps, MONO has academic tools built into every conversation. You can drop a 60-page lecture slide to generate flashcards, sync syllabus deadlines to a group calendar, and run Pomodoro study rooms with one click.",
    category: "general",
  },
  {
    q: "Is my personal data and conversation private?",
    a: "Yes. All messages and shared files are encrypted in transit and at rest. We never sell your data or train foundation models on private cohort chats.",
    category: "privacy",
  },
  {
    q: "Can my student club, fraternity, or department use MONO?",
    a: "Absolutely! The Campus & Society tier allows spinning up university-wide servers with role management, announcement broadcasts, and unlimited file storage.",
    category: "billing",
  },
  {
    q: "What AI models power the MONO AI study partner?",
    a: "MONO AI uses specialized multimodal models optimized for academic reasoning, LaTeX rendering, step-by-step calculus solving, and PDF slide digestion.",
    category: "ai",
  },
];

const comparisonRows = [
  { feature: "1:1 & Group Chat Channels", free: "Unlimited", pro: "Unlimited", campus: "Unlimited" },
  { feature: "Voice Notes & Waveforms", free: "Unlimited", pro: "Unlimited (2x Speed)", campus: "Unlimited + HD" },
  { feature: "AI PDF Summarizer & Flashcards", free: "100 queries/mo", pro: "Unlimited", campus: "Unlimited" },
  { feature: "Kanban Task Boards & Notes", free: "5 Workspaces", pro: "Unlimited", campus: "Unlimited" },
  { feature: "Syllabus Auto-Sync Calendar", free: "✓", pro: "✓ Real-time Sync", campus: "✓ Dept-wide Sync" },
  { feature: "File Upload Size Limit", free: "25 MB / file", pro: "2 GB / file", campus: "10 GB / file" },
  { feature: "Custom Campus Server Roles", free: "Basic", pro: "Advanced", campus: "Full SSO & Admin" },
  { feature: "Priority Support & Early Features", free: "Community", pro: "Priority Email", campus: "Dedicated Rep" },
];

function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [studentEmail, setStudentEmail] = useState("");
  const [discountVerified, setDiscountVerified] = useState(false);
  const [faqSearch, setFaqSearch] = useState("");
  const [faqCategory, setFaqCategory] = useState("all");

  // Contact form state
  const [contactSubject, setContactSubject] = useState("Feature Request");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const handleVerifyStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentEmail.trim()) return;
    setDiscountVerified(true);
    toast.success("Student email verified! 50% discount unlocked across all plans 🎉");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    toast.success("Message sent! Our student team will reply within 24 hours.");
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.a.toLowerCase().includes(faqSearch.toLowerCase());
    const matchesCat = faqCategory === "all" || f.category === faqCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <PageShell>
      <PageHero
        eyebrow="Simple, Student-First Pricing"
        title={
          <>
            Fair pricing. <span className="text-gradient">Built for students.</span>
          </>
        }
        subtitle="Start free, upgrade when you want unlimited AI and campus servers. No sneaky trials or credit card tricks."
      >
        {/* Billing Switcher */}
        <div className="inline-flex items-center p-1.5 rounded-full glass border border-white/15 shadow-xl">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              billingCycle === "monthly"
                ? "bg-white/20 text-white border border-white/20 shadow-md"
                : "text-muted-foreground hover:text-white"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              billingCycle === "annual"
                ? "bg-gradient-to-r from-spider to-electric text-white shadow-lg"
                : "text-muted-foreground hover:text-white"
            }`}
          >
            <span>Annual (Save 25%)</span>
            <span className="text-[9px] bg-white/20 px-1.5 py-0.2 rounded-full uppercase font-black">
              2 MO FREE
            </span>
          </button>
        </div>
      </PageHero>

      {/* Pricing Cards Grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {/* Tier 1: Free */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <TiltCard3D maxTilt={10} glareOpacity={0.2} className="h-full">
              <div className="glass-card rounded-3xl p-7 border border-white/10 flex flex-col justify-between h-full card-3d-shadow">
                <div>
                  <DepthLayer depth={20} className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    MONO Free
                  </DepthLayer>
                  <DepthLayer depth={30} className="mt-3 flex items-baseline gap-1">
                    <div className="text-5xl font-black text-white">$0</div>
                    <div className="text-xs text-muted-foreground font-semibold">/ forever</div>
                  </DepthLayer>
                  <DepthLayer depth={15}>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      Everything essential for university group work and communication.
                    </p>
                  </DepthLayer>

                  <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                    {[
                      "Unlimited group chats & DMs",
                      "3D Waveform voice notes",
                      "Tasks, calendar & study boards",
                      "100 AI study queries / mo",
                      "25 MB file uploads",
                    ].map((feat) => (
                      <DepthLayer key={feat} depth={18} className="flex items-center gap-2.5 text-xs text-white/90">
                        <div className="h-4 w-4 rounded-full bg-white/5 flex items-center justify-center text-electric">
                          <Check className="h-3 w-3" />
                        </div>
                        <span>{feat}</span>
                      </DepthLayer>
                    ))}
                  </ul>
                </div>

                <DepthLayer depth={22}>
                  <Link
                    to="/chat"
                    className="mt-8 w-full py-3 rounded-2xl glass hover:bg-white/10 text-xs font-bold text-white text-center transition-colors block"
                  >
                    Get Started Free
                  </Link>
                </DepthLayer>
              </div>
            </TiltCard3D>
          </motion.div>

          {/* Tier 2: Pro Student (Featured) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="h-full"
          >
            <TiltCard3D maxTilt={14} glareOpacity={0.35} className="h-full">
              <div className="relative rounded-3xl p-7 border border-spider/50 glow-ring bg-gradient-to-br from-spider/15 via-black/50 to-electric/15 flex flex-col justify-between shadow-2xl h-full card-3d-shadow">
                <DepthLayer depth={35} className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white bg-[linear-gradient(135deg,#ff3b5c,#3b82f6)] shadow-md">
                  <Sparkles className="h-3 w-3" /> Most Popular · Student Choice
                </DepthLayer>

                <div>
                  <DepthLayer depth={20} className="text-sm font-bold text-spider uppercase tracking-wider mt-1">
                    MONO Pro Student 3D
                  </DepthLayer>
                  <DepthLayer depth={35} className="mt-3 flex items-baseline gap-1">
                    <div className="text-5xl font-black text-white">
                      {billingCycle === "annual" ? "$3" : "$4"}
                    </div>
                    <div className="text-xs text-muted-foreground font-semibold">
                      / month {billingCycle === "annual" && "(billed $36/yr)"}
                    </div>
                  </DepthLayer>
                  <DepthLayer depth={15}>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      Supercharge your GPA with unlimited AI summaries and 3D flashcards.
                    </p>
                  </DepthLayer>

                  <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                    {[
                      "Everything in Free",
                      "Unlimited AI queries & PDF reading",
                      "Auto-generated 3D spatial flashcards",
                      "2 GB file uploads (Full lecture videos)",
                      "LaTeX math step-by-step solver",
                      "Priority 3D voice lounges",
                    ].map((feat) => (
                      <DepthLayer key={feat} depth={20} className="flex items-center gap-2.5 text-xs text-white">
                        <div className="h-4 w-4 rounded-full bg-spider/20 flex items-center justify-center text-spider">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span className="font-medium">{feat}</span>
                      </DepthLayer>
                    ))}
                  </ul>
                </div>

                <DepthLayer depth={25}>
                  <button
                    onClick={() => toast.success("MONO Pro Student plan selected! Redirecting to checkout...")}
                    className="mt-8 w-full py-3.5 rounded-2xl btn-brand text-xs font-bold text-center shadow-lg shadow-spider/30"
                  >
                    Start 14-Day Free Pro Trial
                  </button>
                </DepthLayer>
              </div>
            </TiltCard3D>
          </motion.div>

          {/* Tier 3: Campus & Society */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-full"
          >
            <TiltCard3D maxTilt={10} glareOpacity={0.2} className="h-full">
              <div className="glass-card rounded-3xl p-7 border border-white/10 flex flex-col justify-between h-full card-3d-shadow">
                <div>
                  <DepthLayer depth={20} className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Campus & Societies
                  </DepthLayer>
                  <DepthLayer depth={30} className="mt-3 flex items-baseline gap-1">
                    <div className="text-5xl font-black text-white">$29</div>
                    <div className="text-xs text-muted-foreground font-semibold">/ term</div>
                  </DepthLayer>
                  <DepthLayer depth={15}>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      For student clubs, hackathons, fraternities, and academic departments.
                    </p>
                  </DepthLayer>

                  <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                    {[
                      "Everything in Pro",
                      "Up to 500 club members",
                      "Department announcement broadcasts",
                      "10 GB file vaults & slide repos",
                      "Admin permissions & role badges",
                      "Dedicated community onboarding",
                    ].map((feat) => (
                      <DepthLayer key={feat} depth={18} className="flex items-center gap-2.5 text-xs text-white/90">
                        <div className="h-4 w-4 rounded-full bg-white/5 flex items-center justify-center text-electric">
                          <Check className="h-3 w-3" />
                        </div>
                        <span>{feat}</span>
                      </DepthLayer>
                    ))}
                  </ul>
                </div>

                <DepthLayer depth={22}>
                  <a
                    href="#contact"
                    className="mt-8 w-full py-3 rounded-2xl glass hover:bg-white/10 text-xs font-bold text-white text-center transition-colors block"
                  >
                    Contact Campus Team
                  </a>
                </DepthLayer>
              </div>
            </TiltCard3D>
          </motion.div>
        </div>
      </section>

      {/* Student ID & .edu Discount Validator */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-[2rem] p-8 border border-white/15 text-center relative overflow-hidden"
        >
          <div className="max-w-xl mx-auto">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-spider to-electric flex items-center justify-center mx-auto mb-4 shadow-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-black text-white">
              Verify your Student Email for <span className="text-gradient">Instant 50% Off</span>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              Enter any university or .edu address to unlock verified student pricing across all tiers.
            </p>

            <form onSubmit={handleVerifyStudent} className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                placeholder="your.name@university.edu"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                required
                className="flex-1 rounded-full bg-white/5 border border-white/15 px-5 py-3 text-xs sm:text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-spider"
              />
              <button
                type="submit"
                className="btn-brand px-6 py-3 rounded-full text-xs font-bold shrink-0"
              >
                Verify Student ID
              </button>
            </form>

            {discountVerified && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center justify-center gap-2"
              >
                <Check className="h-4 w-4" /> 50% Academic discount active for {studentEmail}
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Compare all plan features</h2>
        </div>

        <div className="glass-strong rounded-3xl border border-white/15 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/30">
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Plan Feature
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-white">
                    Free
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-spider">
                    Pro ($3/mo)
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-electric">
                    Campus & Clubs
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white/90">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-muted-foreground">{row.free}</td>
                    <td className="p-4 sm:p-5 font-bold text-white">{row.pro}</td>
                    <td className="p-4 sm:p-5 text-muted-foreground">{row.campus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Searchable FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-muted-foreground text-xs sm:text-sm">
            Everything you need to know about plans, student verification, and security.
          </p>

          {/* FAQ Search Bar */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="h-4 w-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search FAQs (e.g., 'data', '.edu', 'free')..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full rounded-full bg-white/5 border border-white/15 pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-spider"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((f, i) => (
            <FAQItem key={i} {...f} />
          ))}
        </div>
      </section>

      {/* Contact & Support Section */}
      <section id="contact" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 scroll-mt-24">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Get in Touch
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              We're here for <span className="text-gradient">students.</span>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-md">
              Have a suggestion, question, or want MONO for your campus club? Send us a message — our
              student team replies within 24 hours.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3.5 text-xs text-white/90">
                <div className="h-10 w-10 rounded-2xl glass flex items-center justify-center text-spider">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Direct Student Inquiries</div>
                  <div className="text-muted-foreground">hello@mono.chat</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-xs text-white/90">
                <div className="h-10 w-10 rounded-2xl glass flex items-center justify-center text-electric">
                  <Building className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Campus Ambassador Program</div>
                  <div className="text-muted-foreground">ambassadors@mono.chat</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              {[Twitter, Instagram, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Interactive Contact Form */}
          <form
            onSubmit={handleContactSubmit}
            className="glass-strong rounded-3xl p-6 sm:p-8 border border-white/15 space-y-4"
          >
            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Inquiry Topic:
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Feature Request", "Campus Ambassador", "Bug Report", "Society Plan"].map((top) => (
                  <button
                    key={top}
                    type="button"
                    onClick={() => setContactSubject(top)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                      contactSubject === top
                        ? "bg-spider text-white shadow-sm"
                        : "glass text-muted-foreground hover:text-white"
                    }`}
                  >
                    {top}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Alex Chen"
                className="mt-1.5 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-xs sm:text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-spider"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Student / Personal Email
              </label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="alex@stanford.edu"
                className="mt-1.5 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-xs sm:text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-spider"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Message
              </label>
              <textarea
                rows={4}
                required
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="How can we help your study group?"
                className="mt-1.5 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-xs sm:text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-spider resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-brand rounded-2xl py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-spider/30"
            >
              <Send className="h-4 w-4" /> Send Message
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left text-white"
      >
        <span className="font-bold text-xs sm:text-sm">{q}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
            open ? "rotate-180 text-spider" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-white/5 pt-3">
          {a}
        </div>
      </motion.div>
    </div>
  );
}

