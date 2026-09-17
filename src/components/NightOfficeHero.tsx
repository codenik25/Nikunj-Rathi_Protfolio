import React, { useRef } from 'react';
import { ArrowDown } from 'lucide-react';

interface NightOfficeHeroProps {
  onNavigate?: (id: string) => void;
  activeNav?: string;
}

const NAV_ITEMS = [
  { id: 'hero', num: '01', label: 'Home' },
  { id: 'about', num: '02', label: 'About' },
  { id: 'skills', num: '03', label: 'Skills' },
  { id: 'projects', num: '04', label: 'Projects' },
  { id: 'experience', num: '05', label: 'Experience' },
  { id: 'activity', num: '06', label: 'Activity' },
  { id: 'contact', num: '07', label: 'Contact' },
  { id: 'replay', num: '08', label: 'Replay' },
];

export const NightOfficeHero: React.FC<NightOfficeHeroProps> = ({
  onNavigate,
  activeNav = 'hero',
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'hero' || id === 'replay') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[720px] bg-[#050a14] text-white select-none overflow-hidden"
      style={{
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* ========================================================================= */}
      {/* 1. FULL-BLEED PHOTOGRAPHIC CINEMATIC BACKGROUND WITH NAVY OVERLAY        */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Night workspace photo */}
        <img
          src="/assets/workspace_bg.jpg"
          alt="Night Office Workspace"
          className="w-full h-full object-cover object-center scale-[1.02] filter contrast-[1.08] brightness-[0.95]"
        />

        {/* Dark navy overlay (rgba(5,10,20,0.75)) per specs */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(5, 10, 20, 0.75)' }}
        />

        {/* Ambient Color Spotlight Glows */}
        <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] bg-[#3ec6ff]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[550px] h-[550px] bg-[#8b7bff]/12 rounded-full blur-[140px]" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#3ec6ff]/5 rounded-full blur-[100px]" />

        {/* Subtle screen grid scanline overlay */}
        <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none" />
      </div>

      {/* Far Right Decorative Rail Accent */}
      <div className="absolute right-4 top-8 bottom-8 w-[1px] bg-[#3ec6ff]/25 pointer-events-none hidden lg:block z-10">
        <div className="absolute top-0 right-0 w-2 h-[1px] bg-[#3ec6ff]" />
        <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-[#3ec6ff]" />
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP BAR                                                                */}
      {/* ========================================================================= */}
      <header className="relative z-20 w-full px-6 md:px-12 pt-6 pb-2 flex items-start justify-between pointer-events-auto">
        {/* Top-Left: Stacked uppercase words with thin line above */}
        <div className="flex flex-col items-start select-none">
          <div className="w-9 h-[1px] bg-[#3ec6ff]/40 mb-2.5" />
          <div className="flex flex-col leading-[1.15] tracking-[0.2em] font-mono">
            <span className="text-white font-extrabold text-xs sm:text-sm">
              BUILD
            </span>
            <span className="text-[#3ec6ff] font-bold text-xs sm:text-sm">
              ANALYZE
            </span>
            <span className="text-[#8b7bff] font-semibold text-xs sm:text-sm">
              AUTOMATE
            </span>
          </div>
        </div>

        {/* Top-Center: Small uppercase line with thin horizontal rules flanking */}
        <div className="hidden sm:flex items-center gap-4 text-center select-none pt-1">
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-[#3ec6ff]/40" />
          <span className="font-mono text-[10px] md:text-xs text-[#8a99b3] tracking-[0.22em] uppercase whitespace-nowrap">
            JAIPUR, INDIA &nbsp;·&nbsp; CSE &apos;27 &nbsp;·&nbsp; JECRC UNIVERSITY
          </span>
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-[#3ec6ff]/40" />
        </div>

        {/* Top-Right: 4-line vertical uppercase tagline, right-aligned */}
        <div className="flex flex-col items-end text-right leading-[1.15] font-mono tracking-[0.25em] select-none mr-2 lg:mr-4">
          <span className="text-white font-bold text-xs sm:text-sm">TURN</span>
          <span className="text-white font-bold text-xs sm:text-sm">IDEAS</span>
          <span className="text-[#3ec6ff] font-bold text-xs sm:text-sm">INTO</span>
          <span className="text-[#3ec6ff] font-bold text-xs sm:text-sm">IMPACT</span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. LEFT SIDEBAR: VERTICALLY CENTERED NAV (01–08) + STACKS                 */}
      {/* ========================================================================= */}
      <aside
        aria-label="Chapter Index Navigation"
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-start select-none"
      >
        {/* Continuous vertical rail line */}
        <div className="relative pl-6">
          <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/10" />

          <div className="flex flex-col gap-3.5 sm:gap-4">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.id || (item.id === 'hero' && activeNav === 'hero');

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="group relative flex items-center gap-3 text-left focus:outline-none transition-transform duration-200 hover:translate-x-1"
                >
                  {/* Node Dot on the rail */}
                  <div className="absolute -left-[21px] flex items-center justify-center">
                    {isActive ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3ec6ff] rail-node-pulse" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#3ec6ff] transition-colors" />
                    )}
                  </div>

                  {/* Number */}
                  <span
                    className={`font-mono text-xs tracking-wider transition-colors ${
                      isActive
                        ? 'text-[#3ec6ff] font-bold'
                        : 'text-[#8a99b3] group-hover:text-white'
                    }`}
                  >
                    {item.num}
                  </span>

                  {/* Label */}
                  <span
                    className={`font-mono text-xs tracking-widest uppercase transition-colors ${
                      isActive
                        ? 'text-[#3ec6ff] font-semibold drop-shadow-[0_0_8px_rgba(62,198,255,0.7)]'
                        : 'text-white/80 group-hover:text-white'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Word stack directly below the nav block: FOCUS / CREATE / SOLVE / REPEAT */}
        <div className="mt-6 pl-2 flex flex-col items-start border-l border-[#3ec6ff]/30 ml-1">
          <div className="flex flex-col font-mono text-[10px] text-[#8a99b3] tracking-[0.22em] leading-relaxed pl-2 uppercase">
            <span>FOCUS</span>
            <span>CREATE</span>
            <span>SOLVE</span>
            <span>REPEAT</span>
          </div>
          <div className="w-8 h-[1px] bg-[#3ec6ff]/25 mt-2 ml-2" />
        </div>
      </aside>

      {/* Bottom-left corner word stack: IDEAS / SKILLS / PROJECTS / PEOPLE / IMPACT */}
      <div className="absolute bottom-6 left-6 md:left-12 z-30 hidden md:flex flex-col items-start select-none border-l border-[#3ec6ff]/30 pl-2">
        <div className="flex flex-col font-mono text-[9px] text-[#8a99b3] tracking-[0.22em] leading-tight pl-2 uppercase space-y-1">
          <span>IDEAS</span>
          <span>SKILLS</span>
          <span>PROJECTS</span>
          <span>PEOPLE</span>
          <span className="text-slate-300">IMPACT</span>
        </div>
        <div className="w-8 h-[1px] bg-[#3ec6ff]/25 mt-2 ml-2" />
      </div>

      {/* ========================================================================= */}
      {/* 4. CENTER HERO CONTENT: DYNAMIC ESCALATING HEADLINE SCALE                */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center text-center px-4 md:px-12 my-auto pt-4 pb-20">
        {/* Eyebrow Label: ── 01 / DIGITAL JOURNEY ── */}
        <div className="flex items-center gap-3 mb-2 select-none">
          <div className="h-[1px] w-8 md:w-16 bg-[#3ec6ff]/40" />
          <span className="font-mono text-xs md:text-sm text-[#8a99b3] tracking-[0.25em] uppercase font-medium">
            01 &nbsp;/&nbsp; DIGITAL JOURNEY
          </span>
          <div className="h-[1px] w-8 md:w-16 bg-[#3ec6ff]/40" />
        </div>

        {/* Dynamic Escalating Headline: Small to Big Scale */}
        <div className="relative w-full max-w-5xl flex flex-col items-center justify-center my-1 select-none">
          {/* Subtle Crosshair Laser Guide Line */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#3ec6ff]/35 to-transparent pointer-events-none" />

          {/* Line 1: NIKUNJ (Refined, compact scale with letter-spacing rhythm) */}
          <h1
            className="hero-nikunj-gradient headline-scale-nikunj font-black text-5xl sm:text-6xl md:text-7xl lg:text-[6.8rem] xl:text-[7.6rem] tracking-wide uppercase leading-[0.92] select-none will-change-transform"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.04em',
            }}
          >
            NIKUNJ
          </h1>

          {/* Line 2: RATHI (Grand, escalating scale with vibrant cyan-to-purple gradient) */}
          <h1
            className="hero-rathi-gradient headline-scale-rathi font-black text-6xl sm:text-7xl md:text-8xl lg:text-[8.8rem] xl:text-[10.2rem] tracking-tight uppercase leading-[0.88] select-none will-change-transform mt-0.5 sm:mt-1"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.025em',
            }}
          >
            RATHI
          </h1>
        </div>

        {/* Subheading: COMPUTER SCIENCE ENGINEER */}
        <div className="mt-4 select-none">
          <p className="font-mono font-medium text-white text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.28em] uppercase">
            COMPUTER SCIENCE ENGINEER
          </p>
        </div>

        {/* Domain Tags Separated by Middots */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs md:text-sm text-[#8a99b3] tracking-[0.16em] uppercase select-none">
          <span>Software</span>
          <span className="text-[#3ec6ff]">•</span>
          <span>Data Analytics</span>
          <span className="text-[#3ec6ff]">•</span>
          <span>AI / ML</span>
          <span className="text-[#3ec6ff]">•</span>
          <span>Cybersecurity</span>
          <span className="text-[#3ec6ff]">•</span>
          <span>Cloud</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. RIGHT SIDEBAR TAG STACK: [ CODE / LEARN / BUILD / GROW ]               */}
      {/* ========================================================================= */}
      <div className="absolute right-6 md:right-12 top-28 z-20 hidden lg:flex flex-col items-end text-right select-none mr-2 lg:mr-4">
        <div className="relative p-3 border-r-2 border-[#3ec6ff]/40 flex flex-col items-end text-right font-mono text-[11px] tracking-[0.25em] leading-relaxed">
          {/* Top corner tick */}
          <div className="absolute top-0 right-0 w-3 h-[2px] bg-[#3ec6ff]" />
          {/* Bottom corner tick */}
          <div className="absolute bottom-0 right-0 w-3 h-[2px] bg-[#3ec6ff]" />

          <span className="text-white font-bold">CODE</span>
          <span className="text-[#3ec6ff] font-semibold">LEARN</span>
          <span className="text-white font-bold">BUILD</span>
          <span className="text-[#8b7bff] font-semibold">GROW</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. INTERACTIVE ANCHORED SCROLL PROMPT: FIXED FOOTER AT BOTTOM-CENTER      */}
      {/* ========================================================================= */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center select-none pointer-events-auto">
        <button
          onClick={() => handleNavClick('about')}
          className="group flex flex-col items-center focus:outline-none transition-all duration-300 cursor-pointer"
          aria-label="Scroll Down to Explore"
        >
          {/* Concentric Pulsing Cyan Target Ring with Expanding Soft Halo */}
          <div className="relative w-8 h-8 rounded-full border border-[#3ec6ff]/40 flex items-center justify-center shadow-[0_0_15px_rgba(62,198,255,0.25)] group-hover:border-[#3ec6ff] group-hover:shadow-[0_0_25px_rgba(62,198,255,0.7)] group-hover:scale-110 transition-all duration-300 mb-1.5">
            {/* Expanding looping halo ring */}
            <span className="absolute w-7 h-7 rounded-full border border-[#3ec6ff]/50 ring-pulse-halo pointer-events-none" />
            {/* Core glowing dot */}
            <span className="relative w-2.5 h-2.5 rounded-full bg-[#3ec6ff] shadow-[0_0_8px_#3ec6ff] group-hover:bg-cyan-200 group-hover:shadow-[0_0_12px_#3ec6ff] transition-all" />
          </div>

          {/* Interactive Text: Underline & Cyan Shift on Hover */}
          <span className="font-mono text-[10px] sm:text-xs text-white tracking-[0.24em] uppercase font-bold group-hover:text-[#3ec6ff] group-hover:underline decoration-[#3ec6ff]/70 underline-offset-4 group-hover:drop-shadow-[0_0_10px_rgba(62,198,255,0.8)] transition-all duration-200">
            EXPLORE THE JOURNEY
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] text-[#8a99b3] tracking-[0.2em] uppercase mt-0.5 group-hover:text-cyan-200/90 transition-colors">
            BY SCROLLING DOWN
          </span>

          {/* Continuous Subtle Bounce Down Arrow */}
          <ArrowDown className="w-3.5 h-3.5 text-[#3ec6ff] mt-1 arrow-bounce-subtle group-hover:scale-125 group-hover:text-cyan-200 transition-all duration-200" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 7. TERMINAL / CONSOLE WIDGET: CROPPED PEEK EFFECT                         */}
      {/* ========================================================================= */}
      <aside
        ref={terminalRef}
        aria-label="Developer Console Widget"
        className="absolute bottom-0 right-4 sm:right-6 md:right-12 z-30 w-[92vw] sm:w-[380px] md:w-[420px] pointer-events-auto select-none overflow-hidden"
      >
        {/* Terminal Box - Strictly capped height showing header, prompt, about, and skills */}
        <div className="terminal-glass rounded-t-xl p-3.5 sm:p-4 text-xs font-mono shadow-2xl border-b-0 relative">
          {/* Terminal Header Bar */}
          <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[#3ec6ff]/15">
            <span className="text-[#3ec6ff] font-semibold text-[11px] tracking-wider">
              nikunj@portfolio:~
            </span>

            {/* macOS Traffic Light Dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
          </div>

          {/* Terminal Body: Type help, > help, about, skills (active/highlighted) */}
          <div className="space-y-1.5 text-[11px] leading-relaxed">
            <p className="text-[#8a99b3] text-[10px] sm:text-[11px]">
              Type &apos;help&apos; to see available commands.
            </p>

            <div className="text-[#3ec6ff] font-semibold text-[11px]">
              &gt; help
            </div>

            {/* Command Rows: ONLY about and skills */}
            <div className="pt-0.5 space-y-1">
              {/* Row 1: about */}
              <button
                onClick={() => handleNavClick('about')}
                className="w-full grid grid-cols-12 gap-2 hover:bg-[#3ec6ff]/10 px-2 py-1 rounded text-left transition-colors group cursor-pointer focus:outline-none"
              >
                <span className="col-span-4 text-white font-bold group-hover:text-[#3ec6ff]">
                  about
                </span>
                <span className="col-span-1 text-[#8a99b3] text-center">–</span>
                <span className="col-span-7 text-[#8a99b3] group-hover:text-slate-300">
                  Learn more about me
                </span>
              </button>

              {/* Row 2: skills (with subtle highlighted/hovered lighter navy background showing active state) */}
              <button
                onClick={() => handleNavClick('skills')}
                className="w-full grid grid-cols-12 gap-2 bg-[#0d1c33] border border-[#3ec6ff]/35 px-2 py-1 rounded text-left transition-colors group cursor-pointer shadow-[0_0_12px_rgba(62,198,255,0.14)] focus:outline-none"
              >
                <span className="col-span-4 text-[#3ec6ff] font-bold">
                  skills
                </span>
                <span className="col-span-1 text-[#3ec6ff] text-center">–</span>
                <span className="col-span-7 text-slate-200">
                  View my tech stack
                </span>
              </button>
            </div>
          </div>

          {/* Small Pulsing Cyan Dot Marker near the bottom-right edge ("more below" indicator) */}
          <div
            className="absolute bottom-2 right-3 flex items-center gap-1.5 pointer-events-none select-none"
            title="Additional commands below"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3ec6ff] opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3ec6ff] shadow-[0_0_6px_#3ec6ff]" />
            </span>
          </div>
        </div>
      </aside>
    </section>
  );
};
