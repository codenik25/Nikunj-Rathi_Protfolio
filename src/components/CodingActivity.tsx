import React, { useState, useRef, useEffect } from 'react';
import { ArchiveActivityField } from './ArchiveActivityField';
import { ArchiveStatistics } from './ArchiveStatistics';
import { 
  ProblemSolvingOverlay, 
  PrimaryLanguageOverlay, 
  AlgorithmicToolkitOverlay 
} from './ArchiveOverlays';
import { Activity, Terminal } from 'lucide-react';

export const CodingActivity: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Overlay states
  const [isOpenProblemSolving, setIsOpenProblemSolving] = useState(false);
  const [isOpenPrimaryLanguage, setIsOpenPrimaryLanguage] = useState(false);
  const [isOpenAlgorithmicToolkit, setIsOpenAlgorithmicToolkit] = useState(false);

  // Viewport detection: triggers entrance once, does not loop
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="activity"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#030509] text-white py-32 px-6 sm:px-12 lg:px-20 overflow-hidden font-sans select-none"
    >
      <style>{`
        @keyframes float-telemetry {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-220px) translateX(25px); opacity: 0; }
        }
        @keyframes grid-drift-telemetry {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes glow-pulse-telemetry {
          0%, 100% { opacity: 0.04; transform: scale(1); }
          50% { opacity: 0.08; transform: scale(1.05); }
        }
      `}</style>

      {/* ===================================================================== */}
      {/* CONTINUOUS BACKGROUND SYSTEM (SEAMLESS WITH SECTIONS 04, 05, 07, 08)  */}
      {/* ===================================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#030509]" />
        
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_40%_35%,rgba(56,189,248,0.06),transparent_65%)] mix-blend-screen"
          style={{ animation: 'glow-pulse-telemetry 12s ease-in-out infinite' }}
        />

        {/* Cohesive 40px technical grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            animation: 'grid-drift-telemetry 24s linear infinite',
          }}
        />

        {/* Ambient floating telemetry nodes */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full mix-blend-screen opacity-0"
              style={{
                left: `${(i * 19 + 7) % 100}%`,
                top: `${(i * 27 + 13) % 100}%`,
                animation: `float-telemetry ${18 + (i % 5) * 3}s linear infinite`,
                animationDelay: `-${(i % 7) * 2.8}s`,
              }}
            />
          ))}
        </div>

        {/* Subtle film grain texture */}
        <div
          className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* ===================================================================== */}
      {/* SECTION CONTENT CONTAINER                                             */}
      {/* ===================================================================== */}
      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* 1. Section Label & Header Area */}
        <div className="max-w-4xl mb-16">
          
          {/* Step 1: Section Label */}
          <div
            className={`flex items-center gap-3 font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-cyan-400 mb-6 transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>06 // TELEMETRY &amp; ACTIVITY</span>
            <span className="h-px w-8 bg-cyan-500/30" />
            <span className="text-slate-500 hidden sm:inline">DEVELOPER VELOCITY</span>
          </div>

          {/* Step 2: Main Heading */}
          <h2
            className={`font-display font-bold text-5xl sm:text-7xl lg:text-[84px] leading-[0.92] text-white tracking-tight uppercase mb-6 transition-all duration-700 delay-150 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            CODING<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-[#8b7bff]">
              VELOCITY.
            </span>
          </h2>

          {/* Step 3: Subtitle */}
          <p
            className={`font-sans text-xl sm:text-2xl font-medium text-cyan-300 mb-4 tracking-tight transition-all duration-700 delay-300 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            How I build, learn, and solve.
          </p>

          {/* Step 4: Description */}
          <p
            className={`font-sans text-base sm:text-lg leading-relaxed text-slate-400 max-w-2xl transition-all duration-700 delay-450 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            An evolving record of problem solving, data work, software engineering, and continuous experimentation.
          </p>
        </div>

        {/* Step 5: Contribution Matrix Visualization */}
        <div
          className={`mb-16 transition-all duration-800 delay-600 ease-out ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <ArchiveActivityField />
        </div>

        {/* Step 6: Three Statistics Cards */}
        <div
          className={`transition-all duration-800 delay-750 ease-out ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <ArchiveStatistics
            onOpenProblemSolving={() => setIsOpenProblemSolving(true)}
            onOpenPrimaryLanguage={() => setIsOpenPrimaryLanguage(true)}
            onOpenAlgorithmicToolkit={() => setIsOpenAlgorithmicToolkit(true)}
          />
        </div>

      </div>

      {/* ===================================================================== */}
      {/* INTERACTIVE DETAIL OVERLAYS                                           */}
      {/* ===================================================================== */}
      <ProblemSolvingOverlay
        isOpen={isOpenProblemSolving}
        onClose={() => setIsOpenProblemSolving(false)}
      />

      <PrimaryLanguageOverlay
        isOpen={isOpenPrimaryLanguage}
        onClose={() => setIsOpenPrimaryLanguage(false)}
      />

      <AlgorithmicToolkitOverlay
        isOpen={isOpenAlgorithmicToolkit}
        onClose={() => setIsOpenAlgorithmicToolkit(false)}
      />
    </section>
  );
};

export default CodingActivity;
