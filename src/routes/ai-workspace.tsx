import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  FileText,
  Code2,
  Calculator,
  StickyNote,
  GraduationCap,
  BrainCircuit,
  CalendarClock,
  FileUser,
  MessagesSquare,
  Languages,
  SpellCheck,
  TerminalSquare,
  Search,
  Layers,
  BellRing,
  Send,
  Check,
  RotateCcw,
  Zap,
  HelpCircle,
  BookOpen,
  ArrowRight,
  Copy,
  Cpu,
  Box,
} from "lucide-react";
import { PageShell, PageHero, FeatureCard } from "../components/page-shell";
import { AiNeuralOrb3D } from "../components/3d/ai-neural-orb-3d";
import { FlashcardStudio3D } from "../components/3d/flashcard-studio-3d";
import { TiltCard3D, DepthLayer } from "../components/3d/tilt-card-3d";
import { toast } from "sonner";

export const Route = createFileRoute("/ai-workspace")({
  head: () => ({
    meta: [
      { title: "AI Study Studio & 3D Flashcards — MONO" },
      {
        name: "description",
        content:
          "Your personal AI study partner — summarize lecture PDFs, generate interactive 3D flashcards, solve LaTeX math, and simulate exams without leaving the chat.",
      },
      { property: "og:title", content: "AI Study Studio & 3D Flashcards — MONO" },
      {
        property: "og:description",
        content: "The 3D AI study partner that lives inside your student conversations.",
      },
    ],
  }),
  component: AIPage,
});

const samplePDFs = [
  {
    id: "algo",
    title: "CS301 — Dynamic Programming & Memoization (Lecture 07)",
    subject: "Computer Science",
    summary: [
      "Optimal Substructure: Optimal solution to problem contains optimal solutions to sub-problems.",
      "Overlapping Subproblems: Recursive algorithms revisit same subproblems repeatedly — cache with Memoization.",
      "Time Complexity: Knapsack reduced from O(2^N) brute force to O(N * W) pseudo-polynomial time.",
    ],
    terms: ["Memoization Table", "Bottom-Up Tabulation", "State Transition Equation"],
  },
  {
    id: "bio",
    title: "BIO210 — Cellular Respiration & ATP Synthesis (Chapter 4)",
    subject: "Biology / Pre-Med",
    summary: [
      "Glycolysis occurs in the cytoplasm, producing a net 2 ATP and 2 NADH per glucose molecule.",
      "Krebs Cycle generates 6 NADH, 2 FADH2, and 2 ATP per glucose inside the mitochondrial matrix.",
      "Oxidative Phosphorylation creates ~28-32 ATP via the Chemiosmotic ATP synthase motor.",
    ],
    terms: ["Proton-Motive Force", "Cristae Matrix", "Electron Transport Chain"],
  },
  {
    id: "econ",
    title: "ECON202 — IS-LM Keynesian Macro Equilibrium",
    subject: "Economics & Finance",
    summary: [
      "IS Curve represents equilibrium in the goods market where Investment equals Savings (Negative slope).",
      "LM Curve represents equilibrium in the money market where Liquidity equals Money supply (Positive slope).",
      "Fiscal expansion shifts IS right, increasing both output (Y) and interest rates (r).",
    ],
    terms: ["Liquidity Preference", "Crowding-Out Effect", "Multiplier Coefficient"],
  },
];

const flashcardDeck = [
  {
    q: "What is the primary difference between Memoization and Tabulation in DP?",
    a: "Memoization is Top-Down (recursive with a lookup cache), while Tabulation is Bottom-Up (iterative filling of a DP table from base cases).",
    tag: "CS 301",
  },
  {
    q: "Where does the Krebs Cycle occur in eukaryotic cells?",
    a: "Inside the Mitochondrial Matrix, across the inner membrane of the mitochondria.",
    tag: "BIO 210",
  },
  {
    q: "What causes the 'Crowding-Out Effect' during fiscal policy expansion?",
    a: "Increased government borrowing raises real interest rates, reducing private sector investment and consumption.",
    tag: "ECON 202",
  },
];

const quizQuestions = [
  {
    q: "Which Big-O complexity best describes finding the optimal Knapsack 0/1 solution with Dynamic Programming?",
    options: ["O(N log N)", "O(N * W)", "O(2^N)", "O(N!)"],
    correct: 1,
    explanation: "Knapsack 0/1 runs in O(N * W) where N is items and W is max capacity.",
  },
  {
    q: "During Cellular Respiration, which stage produces the largest total amount of ATP?",
    options: ["Glycolysis", "Citric Acid Cycle", "Oxidative Phosphorylation", "Fermentation"],
    correct: 2,
    explanation: "Oxidative phosphorylation generates approximately 28 to 32 ATP via ATP synthase.",
  },
  {
    q: "If the central bank increases money supply, what happens to the LM curve?",
    options: ["Shifts upward / left", "Shifts downward / right", "Rotates clockwise", "Remains unchanged"],
    correct: 1,
    explanation: "Higher money supply lowers equilibrium interest rates, shifting the LM curve down and to the right.",
  },
];

const abilities = [
  {
    icon: MessagesSquare,
    title: "Ask AI in Any Chat",
    description: "Type /ai in any group or DM to summon context-aware answers instantly.",
    tag: "Instant",
  },
  {
    icon: FileText,
    title: "PDF & Slide Summarizer",
    description: "Drop 60-page professor slides and get concise bullet notes and exam cheat-sheets.",
    tag: "Core",
  },
  {
    icon: Code2,
    title: "Syntax Code Walkthroughs",
    description: "Line-by-line debugging, algorithm complexity breakdowns, and test cases.",
    tag: "Coding",
  },
  {
    icon: Calculator,
    title: "LaTeX Math Step-by-Step",
    description: "Differential equations, calculus, and matrix proofs rendered in clean LaTeX.",
    tag: "Math",
  },
  {
    icon: StickyNote,
    title: "Smart Lecture Notes",
    description: "Converts messy transcript recordings into structured, outline study guides.",
    tag: "Notes",
  },
  {
    icon: GraduationCap,
    title: "Assignment Rubric Helper",
    description: "Evaluate your essay drafts against grading criteria to maximize your GPA.",
    tag: "Writing",
  },
  {
    icon: BrainCircuit,
    title: "Auto Practice Quizzes",
    description: "Generate 10-question multiple choice quizzes based on your shared course files.",
    tag: "Exams",
  },
  {
    icon: CalendarClock,
    title: "Smart Study Planner",
    description: "Generates optimal daily study blocks based on exam dates and course credit hours.",
    tag: "Planner",
  },
  {
    icon: FileUser,
    title: "Internship Resume Polish",
    description: "Action-verb optimizer tailored for tech, finance, and medical internships.",
    tag: "Career",
  },
  {
    icon: MessagesSquare,
    title: "Technical Mock Interview",
    description: "Interactive behavioral and coding interview simulation with scoring.",
    tag: "Practice",
  },
  {
    icon: Languages,
    title: "Academic Translation",
    description: "Translate research papers and lecture slides accurately across 90+ languages.",
    tag: "Global",
  },
  {
    icon: SpellCheck,
    title: "Tone & Grammar Polisher",
    description: "Professional tone adjustor for professor emails and research papers.",
    tag: "Polish",
  },
  {
    icon: TerminalSquare,
    title: "CLI & Terminal Helper",
    description: "Explains tricky Git rebase commands, Dockerfiles, and Bash shell scripts.",
    tag: "Dev",
  },
  {
    icon: Search,
    title: "Citation & Source Finder",
    description: "Locate peer-reviewed academic papers with APA/MLA formatting automatically.",
    tag: "Research",
  },
  {
    icon: Layers,
    title: "Spaced Repetition Cards",
    description: "Smart flashcard scheduling that resurfaces difficult terms right before you forget.",
    tag: "Memory",
  },
  {
    icon: BellRing,
    title: "Smart Study Nudges",
    description: "Contextual reminders that respect your sleep schedule and exam calendar.",
    tag: "Habits",
  },
];

function AIPage() {
  const [activeTab, setActiveTab] = useState<"summary" | "flashcards" | "code" | "quiz">("flashcards");
  const [selectedPDF, setSelectedPDF] = useState(samplePDFs[0]);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Custom Prompt Studio
  const [promptInput, setPromptInput] = useState("");
  const [promptOutput, setPromptOutput] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRunPrompt = (promptText?: string) => {
    const text = promptText || promptInput;
    if (!text.trim()) return;

    setIsGenerating(true);
    setPromptOutput(null);

    setTimeout(() => {
      setIsGenerating(false);
      setPromptOutput(
        `⚡ MONO 3D AI Analysis for: "${text}"\n\n1. Key Principle: Every complex academic challenge can be reduced to foundational axioms.\n2. Step-by-Step Breakdown: First define base variables, establish recurrence relation, and verify edge conditions.\n3. Study Tip: 90% of exam questions test the boundary conditions — focus on edge cases.`
      );
      toast.success("AI generated your study breakdown!");
    }, 1000);
  };

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === quizQuestions[quizIdx].correct) {
      setQuizScore((prev) => prev + 1);
      toast.success("Correct answer! +1 point 🎉");
    } else {
      toast.error("Incorrect. Review explanation below!");
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setQuizIdx((prev) => (prev + 1) % quizQuestions.length);
  };

  return (
    <PageShell>
      {/* 3D AI Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold text-white/90 border border-white/15 mb-6 shadow-lg shadow-black/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spider opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-spider"></span>
              </span>
              <span className="tracking-wide uppercase text-[11px] font-bold">
                MONO AI Study Partner · V2.0 3D
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
              className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.06] text-white"
            >
              Your personal AI that lives{" "}
              <span className="text-gradient">inside your chats.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              Not a generic chatbot in a separate tab. MONO AI understands your lecture slides,
              your course assignments, and your group conversations with spatial 3D visualization.
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/pricing"
                className="btn-brand px-7 py-3 rounded-full text-xs font-bold inline-flex items-center gap-2 shadow-xl shadow-spider/30"
              >
                <Zap className="h-3.5 w-3.5 fill-white" /> Get Unlimited AI with Pro
              </Link>
              <a
                href="#studio"
                className="glass px-6 py-3 rounded-full text-xs font-bold text-white hover:bg-white/10 transition-colors inline-flex items-center gap-1.5"
              >
                <Cpu className="h-3.5 w-3.5 text-electric" /> Try 3D AI Studio
              </a>
            </div>
          </div>

          {/* 3D Holographic AI Neural Orb Viewport */}
          <div>
            <AiNeuralOrb3D />
          </div>
        </div>
      </section>

      {/* Interactive AI Study Studio Playground */}
      <section id="studio" className="mx-auto max-w-5xl px-4 sm:px-6 pb-20 scroll-mt-24">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-spider uppercase tracking-wider px-3.5 py-1 rounded-full glass border border-spider/30 inline-block mb-3">
            Interactive AI Study Studio
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Test the 4 AI superpowers live right now:
          </h2>

          {/* Mode Switcher Tabs */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              { id: "flashcards", label: "🎴 3D Spatial Flashcards", icon: Layers },
              { id: "summary", label: "📄 PDF Summarizer", icon: FileText },
              { id: "code", label: "💻 Math & Code Solver", icon: Code2 },
              { id: "quiz", label: "🎯 Exam Simulator Quiz", icon: BrainCircuit },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-spider to-electric text-white shadow-lg border border-white/20"
                    : "glass text-muted-foreground hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>


        {/* Studio View Container */}
        <div className="glass-strong rounded-[2.5rem] border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden min-h-[480px]">
          {/* Mode 1: PDF Summarizer */}
          {activeTab === "summary" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-bold text-spider uppercase tracking-wider">
                    Select Sample Course Lecture:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {samplePDFs.map((pdf) => (
                      <button
                        key={pdf.id}
                        onClick={() => setSelectedPDF(pdf)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedPDF.id === pdf.id
                            ? "bg-white/20 text-white border border-white/25 shadow-sm"
                            : "glass text-muted-foreground hover:text-white"
                        }`}
                      >
                        {pdf.subject}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ⚡ Summarized in 0.38s
                  </span>
                </div>
              </div>

              {/* PDF Document Summary Card */}
              <div className="glass-card rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-spider/20 border border-spider/30 flex items-center justify-center text-spider font-black text-xs">
                    PDF
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {selectedPDF.title}
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      Original: 48 Slides • Compressed to 3 Core Exam Takeaways
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Executive Exam Summary:
                  </div>
                  {selectedPDF.summary.map((point, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white/[0.04] border border-white/5 flex items-start gap-2.5 text-xs sm:text-sm text-white/90 leading-relaxed"
                    >
                      <span className="h-2 w-2 rounded-full bg-spider mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Key Term Pills */}
                <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">Key Exam Terms:</span>
                  {selectedPDF.terms.map((term) => (
                    <span
                      key={term}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white font-medium"
                    >
                      🏷️ {term}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Mode 2: 3D Interactive Flashcards */}
          {activeTab === "flashcards" && (
            <motion.div
              key="flashcards"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FlashcardStudio3D cards={flashcardDeck} />
            </motion.div>
          )}

          {/* Mode 3: Math & Code Explainer */}
          {activeTab === "code" && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-bold text-spider uppercase tracking-wider">
                    LaTeX Math & Algorithm Walkthrough
                  </span>
                  <div className="text-xs text-muted-foreground">
                    Step-by-step logic breakdown with time complexity
                  </div>
                </div>
                <button
                  onClick={() => toast.success("LaTeX & code snippet copied to clipboard!")}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white glass px-3 py-1.5 rounded-full transition-colors"
                >
                  <Copy className="h-3.5 w-3.5" /> Copy Code
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Code Block */}
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs text-white/90 overflow-x-auto space-y-1">
                  <div className="text-muted-foreground pb-2 border-b border-white/10 font-sans text-[11px] flex justify-between">
                    <span>Python 3 · Dijkstra DP</span>
                    <span className="text-emerald-400">O(V + E log V)</span>
                  </div>
                  <pre className="pt-2 text-emerald-400">
{`def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        curr_d, curr_node = heapq.heappop(pq)
        if curr_d > distances[curr_node]:
            continue
            
        for neighbor, weight in graph[curr_node].items():
            dist = curr_d + weight
            if dist < distances[neighbor]:
                distances[neighbor] = dist
                heapq.heappush(pq, (dist, neighbor))
    return distances`}
                  </pre>
                </div>

                {/* Explanation Block */}
                <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="text-xs font-bold text-spider uppercase tracking-wider">
                      Why this works:
                    </div>
                    <div className="text-xs text-white/80 leading-relaxed">
                      1. <strong>Min-Heap Priority Queue:</strong> Guarantees the vertex with the
                      smallest provisional distance is extracted in (O(\log V)) time.
                    </div>
                    <div className="text-xs text-white/80 leading-relaxed">
                      2. <strong>Relaxation Invariant:</strong> Whenever (d[u] + w(u,v) &lt; d[v]),
                      we found a strictly shorter path through vertex (u).
                    </div>
                    <div className="text-xs text-white/80 leading-relaxed">
                      3. <strong>Non-Negative Weights:</strong> Dijkstra fails on negative cycles —
                      use Bellman-Ford if edge weights can be negative.
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-muted-foreground">
                    💡 Exam Tip: Practice tracing priority queue states by hand.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Mode 4: Live Exam Simulator Quiz */}
          {activeTab === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-bold text-spider uppercase tracking-wider">
                    Interactive Exam Practice Quiz
                  </span>
                  <div className="text-xs text-muted-foreground">
                    Question {quizIdx + 1} of {quizQuestions.length} • Score: {quizScore} /{" "}
                    {quizQuestions.length}
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-spider/20 text-spider border border-spider/30">
                  Live Grading
                </span>
              </div>

              {/* Question Text */}
              <div className="glass-card rounded-2xl p-5 border border-white/10">
                <div className="text-sm sm:text-base font-bold text-white mb-4">
                  {quizQuestions[quizIdx].q}
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-2.5">
                  {quizQuestions[quizIdx].options.map((opt, i) => {
                    const isSelected = selectedOption === i;
                    const isCorrect = i === quizQuestions[quizIdx].correct;
                    let btnClass = "bg-white/[0.04] border-white/10 hover:border-white/30 text-white";

                    if (selectedOption !== null) {
                      if (isCorrect) {
                        btnClass = "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md";
                      } else if (isSelected) {
                        btnClass = "bg-red-500/20 border-red-500 text-red-300";
                      } else {
                        btnClass = "bg-white/[0.02] border-white/5 opacity-50 text-muted-foreground";
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleOptionSelect(i)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${btnClass}`}
                      >
                        <span>{opt}</span>
                        {selectedOption !== null && isCorrect && (
                          <Check className="h-4 w-4 text-emerald-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 p-3.5 rounded-xl bg-white/[0.06] border border-white/15"
                  >
                    <div className="text-[11px] font-bold text-spider uppercase tracking-wider mb-1 flex items-center gap-1">
                      <HelpCircle className="h-3.5 w-3.5" /> Explanation:
                    </div>
                    <p className="text-xs text-white/90 leading-relaxed">
                      {quizQuestions[quizIdx].explanation}
                    </p>
                  </motion.div>
                )}
              </div>

              {selectedOption !== null && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuiz}
                    className="btn-brand px-6 py-2.5 rounded-full text-xs font-bold inline-flex items-center gap-2"
                  >
                    <span>Next Question</span> <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Interactive Custom Prompt Bar */}
        <div className="mt-8 glass-strong rounded-3xl p-6 border border-white/15">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-spider" /> Test Any Custom Student Prompt:
            </span>
            <span className="text-[11px] text-muted-foreground">Powered by MONO AI</span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunPrompt();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything (e.g. 'Explain Knapsack DP' or 'Generate 5 Bio flashcards')..."
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              className="flex-1 rounded-full bg-white/5 border border-white/15 px-5 py-3 text-xs sm:text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-spider"
            />
            <button
              type="submit"
              disabled={isGenerating}
              className="btn-brand px-6 py-3 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg shrink-0"
            >
              {isGenerating ? "Analyzing..." : <><Send className="h-3.5 w-3.5" /> Run</>}
            </button>
          </form>

          {/* Quick preset chips */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              "Explain Knapsack DP",
              "Give me 5 Organic Chem mnemonics",
              "How to structure an Economics thesis",
              "Review my DSA binary search code",
            ].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setPromptInput(preset);
                  handleRunPrompt(preset);
                }}
                className="text-[11px] px-3 py-1 rounded-full glass hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
              >
                ⚡ {preset}
              </button>
            ))}
          </div>

          {promptOutput && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-2xl bg-white/[0.06] border border-electric/30 text-xs text-white/90 whitespace-pre-line leading-relaxed"
            >
              {promptOutput}
            </motion.div>
          )}
        </div>
      </section>

      {/* 16 Superpowers Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Sixteen ways to <span className="text-gradient">study smarter.</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            Every tool is designed to save hours of prep time and maximize exam performance.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {abilities.map((a, i) => (
            <FeatureCard key={a.title} {...a} delay={i * 0.02} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
