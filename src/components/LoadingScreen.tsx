import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLogs = [
  '> Loading developer profile...',
  '> Loading projects...',
  '> Initializing AI modules...',
  '> Initializing analytics engine...',
  '> Security protocols initialized...',
  '> Cloud connection established...'
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [logIndex, setLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Progress counter over 2.4 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // Sync logs with progress
  useEffect(() => {
    const step = Math.min(Math.floor((progress / 100) * bootLogs.length), bootLogs.length);
    setLogIndex(step);
  }, [progress]);

  // Handle enter or trigger finish
  const triggerExit = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 900);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isReady && (e.key === 'Enter' || e.key === ' ')) {
        triggerExit();
      }
    };
    const handleWheel = () => {
      if (isReady) {
        triggerExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel);

    // Auto-advance after 1.2s of ready state if user doesn't press enter
    let autoTimer: ReturnType<typeof setTimeout>;
    if (isReady) {
      autoTimer = setTimeout(() => {
        triggerExit();
      }, 1200);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      if (autoTimer) clearTimeout(autoTimer);
    };
  }, [isReady]);

  const blockCount = 24;
  const filledBlocks = Math.floor((progress / 100) * blockCount);
  const emptyBlocks = blockCount - filledBlocks;
  const barString = `${'█'.repeat(filledBlocks)}${'░'.repeat(emptyBlocks)}`;

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="boot-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070e] text-portfolio-accent font-mono p-6 select-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            scale: 0.05,
            opacity: 0,
            filter: 'brightness(3) blur(8px)',
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          {/* Subtle Grid and Scanlines */}
          <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
          <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-40" />

          {/* Ambient center cyan glow */}
          <div className="absolute w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

          {/* Terminal Box */}
          <div className="relative w-full max-w-xl glass-panel rounded-2xl p-8 border border-cyan-500/30 shadow-cyan-glow-lg flex flex-col gap-6 backdrop-blur-2xl bg-[#090e1cf5]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="font-display font-bold text-sm tracking-widest text-slate-200 ml-2">
                  NIKUNJ.OS
                </span>
              </div>
              <span className="text-xs text-portfolio-accent/80 animate-pulse font-bold tracking-widest">
                {isReady ? 'ONLINE' : 'INITIALIZING...'}
              </span>
            </div>

            {/* System Logs */}
            <div className="h-40 flex flex-col justify-start gap-2 text-xs font-mono text-slate-300">
              {bootLogs.slice(0, logIndex).map((log, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-portfolio-accent">{log}</span>
                </div>
              ))}
              {!isReady && (
                <div className="flex items-center gap-2 text-portfolio-accent">
                  <span className="w-2 h-4 bg-portfolio-accent animate-pulse inline-block" />
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col gap-2 pt-2 border-t border-cyan-500/20">
              <div className="flex items-center justify-between text-xs tracking-wider">
                <span className="text-slate-400 font-mono">CORE STATUS</span>
                <span className="text-emerald-400 font-bold font-mono">{progress}%</span>
              </div>
              <div className="text-emerald-400 font-mono tracking-tighter text-sm sm:text-base break-all">
                {barString}
              </div>
            </div>

            {/* Prompt when Ready */}
            <div className="h-10 flex items-center justify-center">
              {isReady ? (
                <button
                  onClick={triggerExit}
                  className="px-6 py-2 rounded-full bg-portfolio-accent text-slate-950 font-bold text-xs font-mono tracking-widest hover:bg-cyan-300 transition-all shadow-cyan-glow animate-bounce cursor-pointer"
                >
                  SYSTEM READY &bull; PRESS ENTER / CLICK TO ENTER
                </button>
              ) : (
                <span className="text-xs text-slate-500 font-mono">
                  Loading neural modules and system telemetry...
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        /* Light Streak Expansion Transition */
        <motion.div
          key="streak-expand"
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-transparent"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <motion.div
            className="w-full h-[2px] bg-cyan-400 shadow-[0_0_50px_#00f0ff]"
            initial={{ scaleX: 0.05, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
