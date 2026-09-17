import React, { useState } from 'react';
import { InteractiveConsole } from './InteractiveConsole';

interface Chapter {
  id: string;
  num: string;
  label: string;
}

interface PersistentUIProps {
  chapters: Chapter[];
  activeChapter: string;
  onNavigate: (sectionId: string) => void;
}

export const PersistentUI: React.FC<PersistentUIProps> = ({
  chapters,
  activeChapter,
  onNavigate,
}) => {
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);
  const [hoveredLeftWord, setHoveredLeftWord] = useState<string | null>(null);
  const [hoveredRightTag, setHoveredRightTag] = useState<string | null>(null);
  const [hoveredCodeTag, setHoveredCodeTag] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 pointer-events-none select-none">
      {/* ======================================================================= */}
      {/* 1. TOP-LEFT EDITORIAL KEYWORDS: BUILD / ANALYZE / AUTOMATE (z-index: 20) */}
      {/* ======================================================================= */}
      <div className="absolute top-7 left-6 sm:left-10 md:left-12 pointer-events-auto flex flex-col items-start z-20">
        <div className="w-8 h-[1px] bg-[#3ec6ff]/40 mb-2.5" />
        <div className="flex flex-col font-sans leading-[1.3] tracking-[0.04em] select-none">
          {/* BUILD */}
          <div
            onMouseEnter={() => setHoveredLeftWord('BUILD')}
            onMouseLeave={() => setHoveredLeftWord(null)}
            className="flex items-center gap-2 cursor-default transition-all duration-300 group py-0.5"
            style={{
              transform: hoveredLeftWord === 'BUILD' ? 'scale(1.05) translateX(3px)' : 'scale(1) translateX(0)',
            }}
          >
            <span
              className={`text-[16px] sm:text-[18px] md:text-[19px] font-semibold transition-all duration-200 ${
                hoveredLeftWord === 'BUILD'
                  ? 'text-white brightness-125 drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                  : 'text-white/90'
              }`}
            >
              BUILD
            </span>
            <span
              className={`text-xs text-[#3ec6ff] transition-all duration-300 font-sans font-bold ${
                hoveredLeftWord === 'BUILD'
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-2 pointer-events-none'
              }`}
            >
              →
            </span>
          </div>

          {/* ANALYZE */}
          <div
            onMouseEnter={() => setHoveredLeftWord('ANALYZE')}
            onMouseLeave={() => setHoveredLeftWord(null)}
            className="flex items-center gap-2 cursor-default transition-all duration-300 group py-0.5"
            style={{
              transform: hoveredLeftWord === 'ANALYZE' ? 'scale(1.05) translateX(3px)' : 'scale(1) translateX(0)',
            }}
          >
            <span
              className={`text-[16px] sm:text-[18px] md:text-[19px] font-semibold transition-all duration-200 ${
                hoveredLeftWord === 'ANALYZE'
                  ? 'text-cyan-200 brightness-125 drop-shadow-[0_0_12px_rgba(62,198,255,0.85)]'
                  : 'text-[#3ec6ff]'
              }`}
            >
              ANALYZE
            </span>
            <span
              className={`text-xs text-[#3ec6ff] transition-all duration-300 font-sans font-bold ${
                hoveredLeftWord === 'ANALYZE'
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-2 pointer-events-none'
              }`}
            >
              →
            </span>
          </div>

          {/* AUTOMATE */}
          <div
            onMouseEnter={() => setHoveredLeftWord('AUTOMATE')}
            onMouseLeave={() => setHoveredLeftWord(null)}
            className="flex items-center gap-2 cursor-default transition-all duration-300 group py-0.5"
            style={{
              transform: hoveredLeftWord === 'AUTOMATE' ? 'scale(1.05) translateX(3px)' : 'scale(1) translateX(0)',
            }}
          >
            <span
              className={`text-[16px] sm:text-[18px] md:text-[19px] font-semibold transition-all duration-200 ${
                hoveredLeftWord === 'AUTOMATE'
                  ? 'text-purple-200 brightness-125 drop-shadow-[0_0_12px_rgba(139,123,255,0.85)]'
                  : 'text-[#8b7bff]'
              }`}
            >
              AUTOMATE
            </span>
            <span
              className={`text-xs text-[#8b7bff] transition-all duration-300 font-sans font-bold ${
                hoveredLeftWord === 'AUTOMATE'
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-2 pointer-events-none'
              }`}
            >
              →
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 2. TOP-RIGHT EDITORIAL TAGLINE: TURN / IDEAS / INTO / IMPACT (z-index: 20) */}
      {/* ======================================================================= */}
      <div className="absolute top-7 right-6 sm:right-10 md:right-12 pointer-events-auto flex flex-col items-end text-right z-20 mr-1 sm:mr-3">
        <div className="flex flex-col font-sans leading-[1.25] tracking-[0.04em] select-none font-semibold text-[15px] sm:text-[17px] md:text-[18px]">
          {[
            { word: 'TURN', color: 'text-white' },
            { word: 'IDEAS', color: 'text-white' },
            { word: 'INTO', color: 'text-[#3ec6ff]' },
            { word: 'IMPACT', color: 'text-[#3ec6ff]' },
          ].map((item) => {
            const isHovered = hoveredRightTag === item.word;
            return (
              <div
                key={item.word}
                onMouseEnter={() => setHoveredRightTag(item.word)}
                onMouseLeave={() => setHoveredRightTag(null)}
                className="relative flex flex-col items-end cursor-default transition-all duration-200 py-0.5"
                style={{
                  transform: isHovered ? 'translateX(-3px)' : 'translateX(0)',
                }}
              >
                <span
                  className={`transition-all duration-200 ${item.color} ${
                    isHovered
                      ? 'text-white drop-shadow-[0_0_10px_rgba(62,198,255,0.85)] brightness-125 opacity-100'
                      : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  {item.word}
                </span>
                {/* Thin underline on hover */}
                <div
                  className="h-[1.5px] bg-[#3ec6ff] transition-all duration-300 ease-out"
                  style={{
                    width: isHovered ? '100%' : '0px',
                    opacity: isHovered ? 0.95 : 0,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 3. RIGHT SIDE TAG STACK: CODE / LEARN / BUILD / GROW                    */}
      {/* ======================================================================= */}
      <div className="absolute top-28 right-6 sm:right-10 md:right-12 pointer-events-auto hidden lg:flex flex-col items-end text-right z-30 mr-1 sm:mr-3">
        <div className="relative p-2.5 border-r-2 border-[#3ec6ff]/40 flex flex-col items-end text-right font-sans text-[11px] font-semibold tracking-[0.06em] leading-relaxed">
          {/* Top corner tick */}
          <div className="absolute top-0 right-0 w-2.5 h-[2px] bg-[#3ec6ff]" />
          {/* Bottom corner tick */}
          <div className="absolute bottom-0 right-0 w-2.5 h-[2px] bg-[#3ec6ff]" />

          {[
            { word: 'CODE', baseColor: 'text-white', activeColor: 'text-cyan-200' },
            { word: 'LEARN', baseColor: 'text-[#3ec6ff]', activeColor: 'text-white' },
            { word: 'BUILD', baseColor: 'text-white', activeColor: 'text-cyan-200' },
            { word: 'GROW', baseColor: 'text-[#8b7bff]', activeColor: 'text-purple-200' },
          ].map((item) => {
            const isHovered = hoveredCodeTag === item.word;
            return (
              <div
                key={item.word}
                onMouseEnter={() => setHoveredCodeTag(item.word)}
                onMouseLeave={() => setHoveredCodeTag(null)}
                className="relative flex flex-col items-end cursor-default transition-all duration-200"
                style={{
                  transform: isHovered ? 'translateX(-3px)' : 'translateX(0)',
                }}
              >
                <span
                  className={`transition-all duration-200 font-bold ${
                    isHovered
                      ? `${item.activeColor} drop-shadow-[0_0_8px_rgba(62,198,255,0.7)] opacity-100`
                      : `${item.baseColor} opacity-75 hover:opacity-100`
                  }`}
                >
                  {item.word}
                </span>
                <div
                  className="h-[1px] bg-[#3ec6ff] transition-all duration-300 ease-out"
                  style={{
                    width: isHovered ? '100%' : '0px',
                    opacity: isHovered ? 0.9 : 0,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 4. LEFT SIDEBAR: VERTICALLY CENTERED NAVIGATION (01–08) (z-index: 20)   */}
      {/* ======================================================================= */}
      <aside
        aria-label="Section Navigation"
        className="absolute left-6 sm:left-10 md:left-12 top-1/2 -translate-y-1/2 pointer-events-auto hidden md:flex flex-col items-start z-20"
      >
        {/* Continuous vertical rail line with node dots */}
        <nav className="relative pl-6">
          <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/10" />

          <div className="flex flex-col gap-3.5">
            {chapters.map((chap) => {
              const isActive = chap.id === activeChapter;
              const isHovered = hoveredChapter === chap.id;

              return (
                <div key={chap.id} className="relative flex items-center">
                  {/* Rail Node Dot */}
                  <div className="absolute -left-[21px] flex items-center justify-center">
                    {isActive ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3ec6ff] rail-node-pulse shadow-[0_0_12px_#3ec6ff]" />
                    ) : (
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          isHovered
                            ? 'bg-[#3ec6ff] scale-125 shadow-[0_0_8px_#3ec6ff]'
                            : 'bg-slate-600'
                        }`}
                      />
                    )}
                  </div>

                  <button
                    onClick={() => onNavigate(chap.id)}
                    onMouseEnter={() => setHoveredChapter(chap.id)}
                    onMouseLeave={() => setHoveredChapter(null)}
                    data-cursor="nav"
                    className="group relative flex flex-col items-start text-left focus:outline-none cursor-pointer py-1"
                    style={{
                      transform: isHovered
                        ? 'translateX(6px)'
                        : isActive
                        ? 'translateX(3px)'
                        : 'translateX(0)',
                      transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease',
                      opacity: isActive ? 1 : isHovered ? 1 : 0.65,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Number (Manrope font-semibold) */}
                      <span
                        className={`font-sans text-xs font-semibold tracking-[0.04em] transition-colors duration-200 ${
                          isActive || isHovered
                            ? 'text-[#3ec6ff] font-bold'
                            : 'text-[#8a99b3]'
                        }`}
                      >
                        {chap.num}
                      </span>

                      {/* Label (Manrope font-semibold) */}
                      <span
                        className={`font-sans text-xs tracking-[0.06em] uppercase font-semibold transition-all duration-200 ${
                          isActive
                            ? 'text-[#3ec6ff] font-bold drop-shadow-[0_0_8px_rgba(62,198,255,0.7)]'
                            : isHovered
                            ? 'text-white font-bold drop-shadow-[0_0_6px_rgba(62,198,255,0.5)]'
                            : 'text-white/80'
                        }`}
                      >
                        {chap.label}
                      </span>
                    </div>

                    {/* Thin cyan line expansion on hover (0 -> 20px) */}
                    <div
                      className="h-[1.5px] bg-gradient-to-r from-[#3ec6ff] to-transparent mt-1 ml-7 transition-all duration-300 ease-out"
                      style={{
                        width: isHovered ? '24px' : isActive ? '16px' : '0px',
                        opacity: isHovered || isActive ? 1 : 0,
                      }}
                    />
                  </button>

                  {/* Hover tooltip HUD */}
                  {isHovered && !isActive && (
                    <span className="absolute left-28 px-2.5 py-1 rounded bg-[#050a14]/95 border border-[#3ec6ff]/35 text-[#3ec6ff] text-[11px] font-sans font-semibold uppercase tracking-[0.04em] backdrop-blur-md shadow-xl pointer-events-none whitespace-nowrap z-50">
                      Jump to {chap.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Word stack directly below nav: FOCUS / CREATE / SOLVE / REPEAT */}
        <div className="mt-6 pl-2 flex flex-col items-start border-l border-[#3ec6ff]/30 ml-1">
          <div className="flex flex-col font-sans text-[10px] text-[#8a99b3] tracking-[0.06em] leading-relaxed pl-2 uppercase font-semibold">
            {['FOCUS', 'CREATE', 'SOLVE', 'REPEAT'].map((word) => (
              <span
                key={word}
                className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-default"
              >
                {word}
              </span>
            ))}
          </div>
          <div className="w-8 h-[1px] bg-[#3ec6ff]/25 mt-2 ml-2" />
        </div>
      </aside>

      {/* Bottom-left corner pinned word stack: IDEAS / SKILLS / PROJECTS / PEOPLE / IMPACT */}
      <div className="absolute bottom-6 left-6 sm:left-10 md:left-12 pointer-events-auto hidden md:flex flex-col items-start z-20 border-l border-[#3ec6ff]/30 pl-2">
        <div className="flex flex-col font-sans text-[10px] text-[#8a99b3] tracking-[0.06em] leading-tight pl-2 uppercase space-y-1 font-semibold">
          {['IDEAS', 'SKILLS', 'PROJECTS', 'PEOPLE'].map((word) => (
            <span
              key={word}
              className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-default"
            >
              {word}
            </span>
          ))}
          <span className="text-slate-300 font-bold hover:text-[#3ec6ff] hover:translate-x-1 transition-all duration-200 cursor-default">
            IMPACT
          </span>
        </div>
        <div className="w-8 h-[1px] bg-[#3ec6ff]/25 mt-2 ml-2" />
      </div>

      {/* ======================================================================= */}
      {/* 5. INTERACTIVE TERMINAL WIDGET (FIXED BOTTOM-RIGHT, z-index: 50)         */}
      {/* ======================================================================= */}
      <InteractiveConsole
        onNavigate={onNavigate}
        activeChapter={activeChapter}
      />
    </div>
  );
};
