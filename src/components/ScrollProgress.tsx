import React, { useMemo } from 'react';

interface ScrollProgressProps {
  chapters: { id: string; num: string; label: string }[];
  activeChapter: string;
  onNavigate: (id: string) => void;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  chapters,
  activeChapter,
  onNavigate,
}) => {
  const activeChapterIndex = useMemo(() => {
    const idx = chapters.findIndex((c) => c.id === activeChapter);
    return idx >= 0 ? idx : 0;
  }, [chapters, activeChapter]);

  return (
    <aside
      aria-label="Section Progress Indicator"
      className="fixed right-[28px] top-1/2 -translate-y-1/2 hidden md:flex flex-col items-end select-none pointer-events-auto"
      style={{ zIndex: 25 }}
    >
      <div className="relative flex flex-col items-end py-2">
        {/* Continuous vertical connecting rail passing through the center of all dots */}
        <div
          className="absolute top-3 bottom-3 right-[5.5px] w-[1px] bg-slate-700/50 pointer-events-none"
        />

        {/* Active progress track line */}
        <div
          className="absolute top-3 right-[5.5px] w-[1px] bg-gradient-to-b from-[#3ec6ff] to-[#8b7bff] pointer-events-none transition-all duration-300 ease-out"
          style={{
            height: `${Math.min(100, Math.max(0, (activeChapterIndex / (chapters.length - 1)) * 100))}%`,
          }}
        />

        {/* Section Waypoint Nodes */}
        {chapters.map((chap) => {
          const isActive = chap.id === activeChapter;
          return (
            <div
              key={chap.id}
              className="relative flex items-center justify-end my-2.5 group"
            >
              <button
                onClick={() => onNavigate(chap.id)}
                className="flex flex-row-reverse items-center gap-[14px] focus:outline-none cursor-pointer py-0.5 group"
                aria-label={`Navigate to section ${chap.label}`}
              >
                {/* Independent Circular Section Indicator Dot */}
                <div className="relative flex items-center justify-center w-[12px] h-[12px] shrink-0">
                  {isActive ? (
                    <>
                      <span className="absolute w-[18px] h-[18px] rounded-full bg-[#3ec6ff]/25 animate-ping pointer-events-none" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3ec6ff] shadow-[0_0_12px_#3ec6ff] ring-2 ring-[#3ec6ff]/35 transition-all duration-300" />
                    </>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500/70 group-hover:bg-cyan-300 group-hover:scale-150 transition-all duration-200" />
                  )}
                </div>

                {/* Section Name Label (Beside indicator, 14px gap, white-space: nowrap) */}
                <div
                  className={`flex items-center gap-1.5 whitespace-nowrap transition-all duration-200 pointer-events-none ${
                    isActive
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}
                >
                  <span
                    className={`font-sans text-[12px] sm:text-[13px] tracking-[0.03em] uppercase font-semibold px-2.5 py-1 rounded-md border backdrop-blur-md shadow-lg ${
                      isActive
                        ? 'text-[#3ec6ff] bg-[#050a14]/95 border-[#3ec6ff]/40 shadow-[0_0_14px_rgba(62,198,255,0.25)]'
                        : 'text-slate-300 bg-[#050a14]/90 border-white/10 group-hover:border-[#3ec6ff]/40 group-hover:text-white'
                    }`}
                  >
                    {chap.num} {chap.label}
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
