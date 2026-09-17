import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronDown } from 'lucide-react';

interface CinematicIntroProps {
  onScrollDown: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onScrollDown }) => {
  return (
    <section
      id="intro"
      className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-14 pt-24 sm:pt-28 z-20 select-none"
    >
      {/* Top Technical Status Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex items-center justify-between font-mono text-[11px] text-slate-400 border-b border-white/5 pb-4"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-300 font-semibold tracking-wider">SYSTEM INITIALIZED</span>
          <span className="text-slate-600">/</span>
          <span>v2.8.4</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-400">
          <span>JAIPUR, IN</span>
          <span>•</span>
          <span>JECRC UNIVERSITY</span>
          <span>•</span>
          <span className="text-emerald-400">STATUS: ONLINE</span>
        </div>
      </motion.div>

      {/* Main Massive Editorial Title */}
      <div className="max-w-5xl my-auto py-12">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-xs sm:text-sm text-cyan-400 tracking-[0.25em] uppercase mb-4"
        >
          01 // DIGITAL JOURNEY OF A DEVELOPER
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-none uppercase"
        >
          NIKUNJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-portfolio-secondary">RATHI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="font-display font-light text-2xl sm:text-4xl text-slate-300 mt-4 tracking-wide uppercase"
        >
          COMPUTER SCIENCE ENGINEER
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap items-center gap-3 sm:gap-6 mt-8 font-mono text-xs text-slate-400"
        >
          <span className="text-cyan-300">SOFTWARE</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-300">DATA ANALYTICS</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-300">AI / ML</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-300">CYBERSECURITY</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-300">CLOUD</span>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex items-center justify-between border-t border-white/5 pt-6 font-mono text-xs text-slate-400"
      >
        <div className="hidden sm:block text-[11px]">
          [ DIGITAL ENVIRONMENT READY — PROCEED DEEPER ]
        </div>

        <button
          onClick={onScrollDown}
          data-cursor="EXPAND"
          className="flex items-center gap-3 text-cyan-300 hover:text-white transition-colors cursor-pointer group focus:outline-none"
        >
          <span className="tracking-widest uppercase text-[11px]">SCROLL TO EXPAND &amp; ENTER</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
        </button>
      </motion.div>
    </section>
  );
};
