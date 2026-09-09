import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ListChecks,
  ClipboardList,
  Calendar,
  AlarmClock,
  Bell,
  StickyNote,
  Mic,
  FolderOpen,
  Layers,
  UserCheck,
  Users,
  LayoutDashboard,
  LineChart,
  KanbanSquare,
  CheckSquare,
  Check,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  Clock,
  Flame,
  FileCode,
  Tag,
  Share2,
  Box,
} from "lucide-react";
import { PageShell, PageHero, FeatureCard } from "../components/page-shell";
import { TiltCard3D, DepthLayer } from "../components/3d/tilt-card-3d";
import { toast } from "sonner";

export const Route = createFileRoute("/productivity")({
  head: () => ({
    meta: [
      { title: "Productivity Hub & 3D Kanban — MONO" },
      {
        name: "description",
        content:
          "Tasks, collaborative notes, Pomodoro focus timers, and semester milestone tracking in full 3D spatial view.",
      },
      { property: "og:title", content: "Productivity Hub & 3D Kanban — MONO" },
      {
        property: "og:description",
        content: "Turn group chats into finished projects with unified 3D productivity tools.",
      },
    ],
  }),
  component: ProductivityPage,
});

interface KanbanTask {
  id: string;
  title: string;
  course: string;
  priority: "urgent" | "high" | "normal";
  dueDate: string;
}

const initialKanban: Record<"todo" | "inProgress" | "done", KanbanTask[]> = {
  todo: [
    {
      id: "t1",
      title: "Read Chapter 4: Greedy Algorithms & Huffman Coding",
      course: "CS 301",
      priority: "high",
      dueDate: "Tomorrow, 5 PM",
    },
    {
      id: "t2",
      title: "Draft Macroeconomics monetary policy response outline",
      course: "ECON 202",
      priority: "normal",
      dueDate: "Friday",
    },
  ],
  inProgress: [
    {
      id: "t3",
      title: "Design Figma wireframes for campus startup project",
      course: "DES 340",
      priority: "urgent",
      dueDate: "Today, 11:59 PM",
    },
    {
      id: "t4",
      title: "Bio 210 Cell Respiration Lab Report write-up",
      course: "BIO 210",
      priority: "high",
      dueDate: "Thursday",
    },
  ],
  done: [
    {
      id: "t5",
      title: "Linear Algebra Problem Set 4 (Matrix transformations)",
      course: "MATH 220",
      priority: "normal",
      dueDate: "Completed",
    },
    {
      id: "t6",
      title: "Slide deck for Management 105 team pitch",
      course: "MGT 105",
      priority: "high",
      dueDate: "Completed",
    },
  ],
};

const features = [
  {
    icon: KanbanSquare,
    title: "Interactive Kanban Board",
    description: "Move assignments across To-Do, In-Progress, and Done with automated reminders.",
    tag: "Tasks",
  },
  {
    icon: Clock,
    title: "Pomodoro Focus Timer",
    description: "25-minute focus intervals synced with your study group's voice room lounge.",
    tag: "Focus",
  },
  {
    icon: StickyNote,
    title: "Multiplayer Lecture Notes",
    description: "Real-time collaborative note taking with rich LaTeX math and code blocks.",
    tag: "Notes",
  },
  {
    icon: Calendar,
    title: "Syllabus Sync Calendar",
    description: "Auto-extracts deadlines from PDF syllabi and syncs with Google Calendar.",
    tag: "Calendar",
  },
  {
    icon: AlarmClock,
    title: "Smart Exam Countdown",
    description: "Prioritizes high-weight exams and calculates recommended daily revision blocks.",
    tag: "Alerts",
  },
  {
    icon: FolderOpen,
    title: "Course Vault Storage",
    description: "Searchable repository of all past lecture PDFs, slides, and shared cheat-sheets.",
    tag: "Files",
  },
  {
    icon: Layers,
    title: "Group Project Spaces",
    description: "All-in-one dashboards for sprint goals, assignees, milestones, and deliverables.",
    tag: "Projects",
  },
  {
    icon: Users,
    title: "Live Note Collaboration",
    description: "See your classmates' cursors in real time as you co-author class lecture notes.",
    tag: "Collab",
  },
  {
    icon: LineChart,
    title: "Semester Analytics",
    description: "Track study hours, task completion rate, and GPA velocity over time.",
    tag: "Insights",
  },
  {
    icon: CheckSquare,
    title: "Sub-task Checklists",
    description: "Break complex term papers and capstone projects into manageable checklist steps.",
    tag: "Checklists",
  },
];

function ProductivityPage() {
  const [kanban, setKanban] = useState(initialKanban);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCourse, setNewTaskCourse] = useState("CS 301");
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Pomodoro timer state
  const [timerMode, setTimerMode] = useState<"work" | "shortBreak" | "longBreak">("work");
  const [timerSecs, setTimerSecs] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [streakCount, setStreakCount] = useState(4);

  // Collaborative notes mock state
  const [notesChecked, setNotesChecked] = useState([true, false, false]);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timerSecs > 0) {
      interval = setInterval(() => setTimerSecs((prev) => prev - 1), 1000);
    } else if (timerSecs === 0) {
      setIsRunning(false);
      toast.success("Pomodoro session completed! Take a well-deserved break! 🎉");
      setStreakCount((prev) => prev + 1);
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSecs]);

  const switchTimerMode = (mode: "work" | "shortBreak" | "longBreak") => {
    setTimerMode(mode);
    setIsRunning(false);
    if (mode === "work") setTimerSecs(25 * 60);
    if (mode === "shortBreak") setTimerSecs(5 * 60);
    if (mode === "longBreak") setTimerSecs(15 * 60);
  };

  const handleMoveTask = (
    fromCol: "todo" | "inProgress" | "done",
    toCol: "todo" | "inProgress" | "done",
    taskId: string
  ) => {
    const task = kanban[fromCol].find((t) => t.id === taskId);
    if (!task) return;

    setKanban((prev) => ({
      ...prev,
      [fromCol]: prev[fromCol].filter((t) => t.id !== taskId),
      [toCol]: [...prev[toCol], task],
    }));

    if (toCol === "done") {
      toast.success(`"${task.title}" marked as Done! 🎉`);
    } else {
      toast.info(`Moved to ${toCol === "inProgress" ? "In Progress" : "To Do"}`);
    }
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: KanbanTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      course: newTaskCourse,
      priority: "high",
      dueDate: "Friday, 5 PM",
    };

    setKanban((prev) => ({
      ...prev,
      todo: [newTask, ...prev.todo],
    }));

    setNewTaskTitle("");
    setIsAddingTask(false);
    toast.success("New assignment added to Kanban board!");
  };

  const formatTimer = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="The Productivity Hub"
        title={
          <>
            Everything <span className="text-gradient">beyond messaging.</span>
          </>
        }
        subtitle="Tasks, collaborative notes, Pomodoro study rooms, and deadline trackers — the tools that turn chats into finished, high-grade work."
      >
        <Link
          to="/pricing"
          className="btn-brand px-7 py-3 rounded-full text-xs font-bold inline-flex items-center gap-2"
        >
          <Zap className="h-3.5 w-3.5 fill-white" /> Get Started Free
        </Link>
      </PageHero>

      {/* Interactive Kanban Board Workspace */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-spider uppercase tracking-wider px-3.5 py-1 rounded-full glass border border-spider/30 inline-block mb-2">
              Interactive Semester Kanban
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Coursework & Sprint Board
            </h2>
          </div>

          <button
            onClick={() => setIsAddingTask(!isAddingTask)}
            className="btn-brand px-5 py-2.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 shadow-lg"
          >
            <Plus className="h-4 w-4" /> Add Assignment
          </button>
        </div>

        {/* Add Task Dropdown Form */}
        <AnimatePresence>
          {isAddingTask && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleAddNewTask}
              className="glass-strong rounded-3xl p-5 border border-white/20 mb-8 space-y-4 overflow-hidden"
            >
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-spider" /> Add Assignment or Problem Set
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Task title (e.g., 'Finish CS301 Problem Set 4')..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  required
                  className="sm:col-span-2 rounded-2xl bg-white/5 border border-white/15 px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-spider"
                />
                <select
                  value={newTaskCourse}
                  onChange={(e) => setNewTaskCourse(e.target.value)}
                  className="rounded-2xl bg-navy-2 border border-white/15 px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-spider"
                >
                  <option value="CS 301">CS 301 Algorithms</option>
                  <option value="BIO 210">BIO 210 Biology</option>
                  <option value="ECON 202">ECON 202 Macro</option>
                  <option value="MATH 220">MATH 220 Calculus</option>
                  <option value="DES 340">DES 340 Design</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingTask(false)}
                  className="px-4 py-2 rounded-full glass text-xs font-semibold text-muted-foreground hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-brand px-6 py-2 rounded-full text-xs font-bold"
                >
                  Save Task
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Kanban 3 Columns */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Column 1: To Do */}
          <div className="h-full">
            <TiltCard3D maxTilt={8} glareOpacity={0.2} className="h-full">
              <div className="glass-card rounded-3xl p-5 border border-white/10 flex flex-col justify-between min-h-[440px] h-full card-3d-shadow">
                <div>
                  <DepthLayer depth={25} className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-spider animate-pulse" />
                      <span className="font-bold text-sm text-white uppercase tracking-wider">
                        To Do
                      </span>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-spider/20 text-spider">
                      {kanban.todo.length}
                    </span>
                  </DepthLayer>

                  <div className="space-y-3">
                    {kanban.todo.map((task) => (
                      <DepthLayer
                        key={task.id}
                        depth={15}
                        className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-spider/40 transition-all group shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-white group-hover:text-spider transition-colors">
                            {task.title}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground font-semibold">
                            {task.course}
                          </span>
                          <button
                            onClick={() => handleMoveTask("todo", "inProgress", task.id)}
                            className="text-xs font-bold text-electric hover:text-white transition-colors"
                          >
                            Start →
                          </button>
                        </div>
                      </DepthLayer>
                    ))}
                  </div>
                </div>
                <DepthLayer depth={10} className="text-[11px] text-muted-foreground pt-4 text-center">
                  Click "Start" to advance to In Progress
                </DepthLayer>
              </div>
            </TiltCard3D>
          </div>

          {/* Column 2: In Progress */}
          <div className="h-full">
            <TiltCard3D maxTilt={8} glareOpacity={0.25} className="h-full">
              <div className="glass-card rounded-3xl p-5 border border-white/10 flex flex-col justify-between min-h-[440px] h-full card-3d-shadow">
                <div>
                  <DepthLayer depth={25} className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-electric animate-pulse" />
                      <span className="font-bold text-sm text-white uppercase tracking-wider">
                        In Progress
                      </span>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-electric/20 text-electric">
                      {kanban.inProgress.length}
                    </span>
                  </DepthLayer>

                  <div className="space-y-3">
                    {kanban.inProgress.map((task) => (
                      <DepthLayer
                        key={task.id}
                        depth={20}
                        className="p-4 rounded-2xl bg-white/[0.07] border border-electric/30 hover:border-electric transition-all shadow-md"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-white">{task.title}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                          <span className="px-2 py-0.5 rounded-full bg-electric/10 text-electric font-semibold border border-electric/20">
                            {task.course} • {task.dueDate}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleMoveTask("inProgress", "done", task.id)}
                              className="text-xs font-bold text-emerald-400 hover:text-white transition-colors"
                            >
                              Complete ✓
                            </button>
                          </div>
                        </div>
                      </DepthLayer>
                    ))}
                  </div>
                </div>
                <DepthLayer depth={10} className="text-[11px] text-muted-foreground pt-4 text-center">
                  Click "Complete" when assignment is submitted
                </DepthLayer>
              </div>
            </TiltCard3D>
          </div>

          {/* Column 3: Done */}
          <div className="h-full">
            <TiltCard3D maxTilt={8} glareOpacity={0.2} className="h-full">
              <div className="glass-card rounded-3xl p-5 border border-white/10 flex flex-col justify-between min-h-[440px] h-full card-3d-shadow">
                <div>
                  <DepthLayer depth={25} className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <span className="font-bold text-sm text-white uppercase tracking-wider">
                        Done & Submitted
                      </span>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                      {kanban.done.length}
                    </span>
                  </DepthLayer>

                  <div className="space-y-3">
                    {kanban.done.map((task) => (
                      <DepthLayer
                        key={task.id}
                        depth={12}
                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 opacity-70 hover:opacity-100 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span className="text-xs font-semibold text-white/80 line-through">
                            {task.title}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-muted-foreground mt-2">
                          <span>{task.course}</span>
                          <span className="text-emerald-400 font-bold">Submitted 100%</span>
                        </div>
                      </DepthLayer>
                    ))}
                  </div>
                </div>
                <DepthLayer depth={10} className="text-[11px] text-emerald-400/80 pt-4 text-center font-semibold">
                  🎉 Great job staying ahead of deadlines!
                </DepthLayer>
              </div>
            </TiltCard3D>
          </div>
        </div>
      </section>

      {/* Dual Section: Dedicated Focus Pomodoro Timer & Collaborative Notes Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Focus Timer Studio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <TiltCard3D maxTilt={10} glareOpacity={0.3} className="h-full">
              <div className="glass-strong rounded-[2.5rem] p-8 border border-white/15 shadow-2xl relative overflow-hidden text-center h-full card-3d-shadow">
                <div className="absolute -inset-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,59,92,0.15),transparent_60%)] pointer-events-none" />

                <DepthLayer depth={25} className="inline-flex items-center gap-2 rounded-full glass px-4 py-1 text-xs font-bold text-spider uppercase tracking-wider mb-6">
                  <Clock className="h-3.5 w-3.5" /> 3D Pomodoro Study Room
                </DepthLayer>

                {/* Mode Switcher */}
                <DepthLayer depth={20} className="flex justify-center gap-2 mb-8">
                  {[
                    { id: "work", label: "Focus (25m)" },
                    { id: "shortBreak", label: "Short Break (5m)" },
                    { id: "longBreak", label: "Long Break (15m)" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => switchTimerMode(m.id as any)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                        timerMode === m.id
                          ? "bg-spider text-white shadow-md"
                          : "glass text-muted-foreground hover:text-white"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </DepthLayer>

                {/* Huge Timer Display with 3D Depth */}
                <DepthLayer depth={35}>
                  <div className="text-6xl sm:text-7xl font-black text-white font-mono tracking-tight my-4 text-gradient">
                    {formatTimer(timerSecs)}
                  </div>
                </DepthLayer>

                <DepthLayer depth={15}>
                  <p className="text-xs text-muted-foreground mb-8">
                    {timerMode === "work"
                      ? "Deep focus session in progress • Discord voice sync active"
                      : "Rest your eyes, stretch, and hydrate!"}
                  </p>
                </DepthLayer>

                {/* Controls */}
                <DepthLayer depth={25} className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setIsRunning(!isRunning);
                      toast.info(isRunning ? "Timer paused" : "Timer started! Lock in 🔒");
                    }}
                    className="btn-brand px-8 py-3.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl shadow-spider/30"
                  >
                    {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                    <span>{isRunning ? "Pause" : "Start Session"}</span>
                  </button>
                  <button
                    onClick={() => switchTimerMode(timerMode)}
                    className="h-12 w-12 rounded-full glass hover:bg-white/10 flex items-center justify-center text-white"
                    title="Reset Timer"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </DepthLayer>

                {/* Study Streak Pill */}
                <DepthLayer depth={18} className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-3 text-xs font-semibold text-white">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Flame className="h-4 w-4 fill-amber-400" /> {streakCount} Study Sessions Today
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">3.5 hrs logged this week</span>
                </DepthLayer>
              </div>
            </TiltCard3D>
          </motion.div>

          {/* Real-Time Collaborative Notes Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <TiltCard3D maxTilt={8} glareOpacity={0.25} className="h-full">
              <div className="glass-strong rounded-[2.5rem] p-8 border border-white/15 shadow-2xl space-y-5 h-full card-3d-shadow">
                <DepthLayer depth={25} className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <StickyNote className="h-5 w-5 text-electric" />
                    <div>
                      <h3 className="text-sm font-bold text-white">CS301_Lecture07_CollabNotes.md</h3>
                      <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span>Maya, Alex & Priya editing now</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toast.info("Note export to PDF ready!")}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-white glass px-3 py-1.5 rounded-full"
                  >
                    <Share2 className="h-3 w-3" /> Export
                  </button>
                </DepthLayer>

                {/* Notes Content */}
                <div className="space-y-3.5 text-xs text-white/90">
                  <DepthLayer depth={18} className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 font-semibold text-electric">
                    # Dynamic Programming: Memoization vs Tabulation
                  </DepthLayer>

                  <DepthLayer depth={12}>
                    <p className="leading-relaxed text-muted-foreground">
                      In classical recursion, (T(n) = 2T(n-1) + O(1)) leads to exponential explosion. By
                      caching state evaluations in a hash table or 2D array, we guarantee each state is
                      computed exactly once.
                    </p>
                  </DepthLayer>

                  {/* Interactive Checklist in Note */}
                  <DepthLayer depth={22} className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-2.5">
                    <div className="text-[11px] font-bold text-white uppercase tracking-wider">
                      Live Checklist for Study Group:
                    </div>
                    {[
                      "Trace Fib(6) call tree with memo array",
                      "Implement 0/1 Knapsack in Python (bottom-up)",
                      "Solve LeetCode #70 (Climbing Stairs) before class",
                    ].map((item, idx) => (
                      <div
                        key={item}
                        onClick={() => {
                          setNotesChecked((prev) => {
                            const copy = [...prev];
                            copy[idx] = !copy[idx];
                            return copy;
                          });
                          toast.success("Note checklist updated!");
                        }}
                        className="flex items-center gap-2.5 cursor-pointer text-xs"
                      >
                        <div
                          className={`h-4 w-4 rounded border flex items-center justify-center ${
                            notesChecked[idx]
                              ? "bg-electric border-electric text-white"
                              : "border-white/20"
                          }`}
                        >
                          {notesChecked[idx] && <Check className="h-3 w-3" />}
                        </div>
                        <span className={notesChecked[idx] ? "line-through text-muted-foreground" : ""}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </DepthLayer>
                </div>
              </div>
            </TiltCard3D>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Engineered for <span className="text-gradient">high achievers.</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            Every feature is designed to reduce mental clutter and keep your grade trajectory high.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 0.02} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
