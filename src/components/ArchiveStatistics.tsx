import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ArchiveStatisticsProps {
  onOpenProblemSolving: () => void;
  onOpenPrimaryLanguage: () => void;
  onOpenAlgorithmicToolkit: () => void;
}

export const ArchiveStatistics: React.FC<ArchiveStatisticsProps> = ({
  onOpenProblemSolving,
  onOpenPrimaryLanguage,
  onOpenAlgorithmicToolkit
}) => {
  const statsRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const langRef = useRef<HTMLSpanElement>(null);
  const algoRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup ScrollTrigger for the stats row
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          }
        }
      );

      // Number counter animation (0 -> 148)
      gsap.fromTo(
        numRef.current,
        { textContent: 0 },
        {
          textContent: 148,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          },
          onUpdate: function() {
            if (numRef.current) {
              numRef.current.innerHTML = Math.round(Number(this.targets()[0].textContent)) + '+';
            }
          }
        }
      );

    }, statsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
      
      {/* Card 1: LEETCODE PROBLEMS 148+ */}
      <div 
        className="stat-item group cursor-pointer p-8 rounded-2xl bg-[#060b17]/70 border border-white/10 hover:border-cyan-400/50 hover:bg-[#091326]/90 transition-all duration-400 hover:-translate-y-2 shadow-xl hover:shadow-[0_12px_30px_rgba(34,211,238,0.15)] flex flex-col justify-between"
        onClick={onOpenProblemSolving}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-cyan-300 transition-colors duration-400">
              LEETCODE PROBLEMS
            </span>
            <span className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-sm">
              ↗
            </span>
          </div>
          <span ref={numRef} className="block font-display font-black text-5xl md:text-6xl text-white mb-3 tracking-tight group-hover:text-cyan-200 group-hover:drop-shadow-[0_0_16px_rgba(34,211,238,0.5)] transition-all duration-400">
            148+
          </span>
        </div>
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500 group-hover:text-cyan-300 transition-colors duration-400">
            VERIFIED DSA COUNT &rarr;
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-400" />
        </div>
      </div>

      {/* Card 2: PRIMARY LANGUAGE C++ */}
      <div 
        className="stat-item group cursor-pointer p-8 rounded-2xl bg-[#060b17]/70 border border-white/10 hover:border-[#8b7bff]/50 hover:bg-[#100d28]/90 transition-all duration-400 hover:-translate-y-2 shadow-xl hover:shadow-[0_12px_30px_rgba(139,123,255,0.15)] flex flex-col justify-between"
        onClick={onOpenPrimaryLanguage}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-portfolio-secondary transition-colors duration-400">
              PRIMARY LANGUAGE
            </span>
            <span className="text-slate-600 group-hover:text-portfolio-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-sm">
              ↗
            </span>
          </div>
          <span ref={langRef} className="block font-display font-black text-5xl md:text-6xl text-white mb-3 tracking-tight group-hover:text-purple-200 group-hover:drop-shadow-[0_0_16px_rgba(139,123,255,0.5)] transition-all duration-400">
            C++
          </span>
        </div>
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500 group-hover:text-portfolio-secondary transition-colors duration-400">
            LOW-LATENCY &amp; ALGORITHMS &rarr;
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-portfolio-secondary opacity-40 group-hover:opacity-100 transition-opacity duration-400" />
        </div>
      </div>

      {/* Card 3: CORE RIGOR DSA • GRAPH • DP */}
      <div 
        className="stat-item group cursor-pointer p-8 rounded-2xl bg-[#060b17]/70 border border-white/10 hover:border-emerald-400/50 hover:bg-[#061816]/90 transition-all duration-400 hover:-translate-y-2 shadow-xl hover:shadow-[0_12px_30px_rgba(16,185,129,0.15)] flex flex-col justify-between"
        onClick={onOpenAlgorithmicToolkit}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-emerald-300 transition-colors duration-400">
              CORE RIGOR
            </span>
            <span className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-sm">
              ↗
            </span>
          </div>
          <span ref={algoRef} className="block font-display font-black text-3xl md:text-4xl text-white mb-3 tracking-tight leading-tight group-hover:text-emerald-200 group-hover:drop-shadow-[0_0_16px_rgba(16,185,129,0.5)] transition-all duration-400">
            DSA &bull; GRAPH<br />&bull; DP
          </span>
        </div>
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500 group-hover:text-emerald-300 transition-colors duration-400">
            ALGORITHMIC TOOLKIT &rarr;
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-40 group-hover:opacity-100 transition-opacity duration-400" />
        </div>
      </div>

    </div>
  );
};
