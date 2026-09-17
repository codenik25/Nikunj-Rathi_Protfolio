import React from 'react';

interface FloatingNavigationProps {
  chapters: { id: string; num: string; label: string }[];
  activeChapter: string;
  onNavigate: (id: string) => void;
}

export const FloatingNavigation: React.FC<FloatingNavigationProps> = ({
  chapters,
  activeChapter,
  onNavigate,
}) => {
  return (
    <>
      {/* Top Header Bar matching Reference Design */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-6 flex items-center justify-between pointer-events-none">
        {/* Left: NR Monogram + Name + Motto */}
        <button
          onClick={() => onNavigate('hero')}
          data-cursor="TOP"
          className="pointer-events-auto group flex items-center gap-3.5 text-left focus:outline-none"
        >
          {/* Cyan bordered square box */}
          <div className="w-9 h-9 rounded-lg border border-cyan-400/50 bg-[#05070be6] backdrop-blur-md flex items-center justify-center font-display font-black text-xs text-cyan-300 group-hover:border-cyan-400 group-hover:shadow-cyan-glow transition-all">
            NR
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-wider text-white group-hover:text-cyan-300 transition-colors">
              NIKUNJ RATHI
            </span>
            <span className="font-mono text-[9px] text-slate-400 tracking-[0.2em] uppercase">
              BUILD &nbsp; ANALYZE &nbsp; AUTOMATE
            </span>
          </div>
        </button>

        {/* Center / Right Metadata */}
        <div className="hidden lg:flex items-center gap-3 font-mono text-[11px] text-slate-400 tracking-wider">
          <span>JAIPUR, INDIA</span>
          <span className="text-slate-600">•</span>
          <span>CSE &apos;27</span>
          <span className="text-slate-600">•</span>
          <span>JECRC UNIVERSITY</span>
        </div>

        {/* Right: Available for Roles Pill */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => onNavigate('contact')}
            data-cursor="CONTACT"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 font-mono text-xs font-semibold tracking-wider transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] focus:outline-none"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE FOR ROLES</span>
          </button>
        </div>
      </header>

      {/* Mobile-Only Bottom Minimal Navigation Capsule */}
      <nav
        aria-label="Mobile Chapter Navigation"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-3 py-2 rounded-full border border-white/10 bg-[#05070be6] backdrop-blur-xl shadow-2xl flex md:hidden items-center gap-1 select-none pointer-events-auto"
      >
        {chapters.map((chap) => {
          const isActive = chap.id === activeChapter;
          return (
            <button
              key={chap.id}
              onClick={() => onNavigate(chap.id)}
              data-cursor="SELECT"
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-all duration-200 focus:outline-none ${
                isActive
                  ? 'bg-cyan-400 text-slate-950 font-bold shadow-cyan-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{chap.num}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
