import React, { useState } from 'react';

interface LeftVerticalNavProps {
  chapters: { id: string; num: string; label: string }[];
  activeChapter: string;
  onNavigate: (id: string) => void;
}

export const LeftVerticalNav: React.FC<LeftVerticalNavProps> = ({
  chapters,
  activeChapter,
  onNavigate,
}) => {
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);

  return (
    <aside
      aria-label="Chapter Index Navigation"
      className="fixed left-6 sm:left-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-start select-none pointer-events-auto"
    >
      {/* Subtle top indicator */}
      <div className="font-mono text-[10px] text-slate-500 tracking-widest mb-3 pl-0.5">
        07
      </div>

      {/* Vertical Track of Chapter Numbers */}
      <div className="relative flex flex-col gap-3.5 pl-3 border-l border-white/10">
        {chapters.map((chap) => {
          const isActive = chap.id === activeChapter;

          return (
            <div key={chap.id} className="relative flex items-center">
              {/* Active Cyan Glowing Pill / Indicator */}
              {isActive && (
                <span className="absolute -left-[15px] w-2 h-2 rounded-full bg-cyan-400 shadow-cyan-glow animate-pulse" />
              )}

              <button
                onClick={() => onNavigate(chap.id)}
                onMouseEnter={() => setHoveredChapter(chap.id)}
                onMouseLeave={() => setHoveredChapter(null)}
                data-cursor="SELECT"
                aria-label={`Jump to chapter ${chap.num} ${chap.label}`}
                className={`font-mono text-xs transition-all duration-200 focus:outline-none ${
                  isActive
                    ? 'text-cyan-300 font-bold scale-110 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]'
                    : 'text-slate-500 hover:text-slate-200 hover:scale-105'
                }`}
              >
                {chap.num}
              </button>

              {/* Hover Tooltip display */}
              {hoveredChapter === chap.id && !isActive && (
                <span className="absolute left-7 px-2.5 py-1 rounded border border-cyan-500/30 bg-[#05070bf0] text-cyan-300 text-[10px] font-mono uppercase tracking-wider whitespace-nowrap backdrop-blur-md shadow-xl pointer-events-none z-50">
                  {chap.num} {chap.label}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Vertical Label */}
      <div className="mt-8 font-mono text-[9px] text-slate-500 tracking-[0.25em] uppercase flex flex-col gap-0.5 leading-tight select-none">
        <span>EXPLORE</span>
        <span className="text-slate-400">THE JOURNEY</span>
      </div>
    </aside>
  );
};
