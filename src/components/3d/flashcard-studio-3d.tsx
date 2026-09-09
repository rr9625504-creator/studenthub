import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw, Check, Sparkles, HelpCircle, Layers, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface Flashcard {
  q: string;
  a: string;
  tag: string;
  hint?: string;
}

export function FlashcardStudio3D({
  cards,
  onReset,
}: {
  cards: Flashcard[];
  onReset?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<number[]>([]);
  const [direction, setDirection] = useState(0);

  const currentCard = cards[index];

  const handleNext = (mastered = false) => {
    setIsFlipped(false);
    setDirection(1);
    if (mastered && !masteredIds.includes(index)) {
      setMasteredIds((prev) => [...prev, index]);
      toast.success("Card marked as Mastered! 🧠");
    }
    setIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setDirection(-1);
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleResetDeck = () => {
    setIndex(0);
    setIsFlipped(false);
    setMasteredIds([]);
    if (onReset) onReset();
    toast.info("Deck reset to start!");
  };

  return (
    <div className="relative w-full py-4 select-none">
      {/* HUD Bar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
        <div>
          <span className="text-[11px] font-bold text-spider uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" /> 3D Spaced Repetition Engine
          </span>
          <div className="text-xs text-muted-foreground mt-0.5">
            Card {index + 1} of {cards.length} • {masteredIds.length} Mastered
          </div>
        </div>

        <button
          onClick={handleResetDeck}
          className="p-2 rounded-xl glass hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
          title="Reset Deck"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* 3D Perspective Card Viewport */}
      <div
        className="relative h-72 sm:h-80 w-full flex items-center justify-center my-2"
        style={{ perspective: "1200px" }}
      >
        {/* Background Stack Cards with 3D Depth Layering */}
        <div
          className="absolute inset-x-8 -top-3 h-full rounded-[2.5rem] bg-white/[0.02] border border-white/5 pointer-events-none transition-all duration-300"
          style={{
            transform: "translateZ(-60px) scale(0.92)",
          }}
        />
        <div
          className="absolute inset-x-4 -top-1.5 h-full rounded-[2.5rem] bg-white/[0.04] border border-white/10 pointer-events-none transition-all duration-300"
          style={{
            transform: "translateZ(-30px) scale(0.96)",
          }}
        />

        {/* Active 3D Flipping Card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100, rotateY: direction * 15, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, x: -direction * 100, rotateY: -direction * 15, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              transformStyle: "preserve-3d",
            }}
            className="cursor-pointer relative h-full w-full rounded-[2.5rem] glass-strong border border-white/20 p-7 sm:p-9 flex flex-col justify-between shadow-2xl hover:border-spider/50 transition-colors group overflow-hidden"
          >
            {/* Holographic Refraction Highlight */}
            <div className="absolute -inset-20 bg-[radial-gradient(ellipse_at_top_right,rgba(255,59,92,0.15),transparent_60%)] pointer-events-none" />

            {/* Card Header */}
            <div className="relative z-10 flex justify-between items-center text-xs">
              <span className="font-bold px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white shadow-sm">
                {currentCard.tag}
              </span>
              <span className="text-[11px] font-semibold text-muted-foreground group-hover:text-spider transition-colors flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                {isFlipped ? "Showing Answer (Tap to see question)" : "Tap card to reveal answer"}
              </span>
            </div>

            {/* Card Center Content */}
            <div className="relative z-10 my-auto text-center px-2">
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-black mb-3">
                {isFlipped ? "💡 Verified Solution & Proof" : "❓ Academic Challenge Question"}
              </div>
              <div className="text-base sm:text-xl font-bold text-white leading-relaxed">
                {isFlipped ? currentCard.a : currentCard.q}
              </div>
            </div>

            {/* Card Footer */}
            <div className="relative z-10 flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-white/10">
              <span>{masteredIds.includes(index) ? "✅ Mastered" : "⏳ Reviewing"}</span>
              <span className="italic">Click anywhere to flip 3D card</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3D Card Navigation & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="h-10 w-10 rounded-full glass hover:bg-white/10 flex items-center justify-center text-white transition-colors"
            title="Previous Card"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleNext(false)}
            className="h-10 w-10 rounded-full glass hover:bg-white/10 flex items-center justify-center text-white transition-colors"
            title="Next Card"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleNext(false)}
            className="px-5 py-2.5 rounded-full glass hover:bg-white/10 text-xs font-bold text-white border border-white/15"
          >
            🔄 Still Learning
          </button>
          <button
            onClick={() => handleNext(true)}
            className="btn-brand px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-spider/30"
          >
            <Check className="h-4 w-4" /> Mark Mastered
          </button>
        </div>
      </div>
    </div>
  );
}
