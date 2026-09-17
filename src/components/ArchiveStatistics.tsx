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
    <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-white/5">
      
      {/* 148+ LeetCode Problems */}
      <div 
        className="stat-item group cursor-pointer p-6 rounded-2xl hover:bg-white/5 transition-colors"
        onClick={onOpenProblemSolving}
      >
        <span ref={numRef} className="block font-display font-black text-5xl md:text-6xl text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors">
          0
        </span>
        <span className="block font-sans text-base text-slate-300 font-medium mb-1">
          LeetCode Problems
        </span>
        <span className="block font-sans text-xs font-medium uppercase tracking-widest text-slate-500 group-hover:text-cyan-400 transition-colors">
          Verified DSA Count →
        </span>
      </div>

      {/* C++ Primary Language */}
      <div 
        className="stat-item group cursor-pointer p-6 rounded-2xl hover:bg-white/5 transition-colors"
        onClick={onOpenPrimaryLanguage}
      >
        <span ref={langRef} className="block font-display font-black text-5xl md:text-6xl text-white mb-2 tracking-tight group-hover:text-portfolio-secondary transition-colors">
          C++
        </span>
        <span className="block font-sans text-base text-slate-300 font-medium mb-1">
          Primary Language
        </span>
        <span className="block font-sans text-xs font-medium uppercase tracking-widest text-slate-500 group-hover:text-portfolio-secondary transition-colors">
          Low-latency &amp; Algorithms →
        </span>
      </div>

      {/* DSA • GRAPH • DP Core Problem Solving */}
      <div 
        className="stat-item group cursor-pointer p-6 rounded-2xl hover:bg-white/5 transition-colors"
        onClick={onOpenAlgorithmicToolkit}
      >
        <span ref={algoRef} className="block font-display font-black text-3xl md:text-4xl text-white mb-4 tracking-tight leading-tight group-hover:text-emerald-400 transition-colors">
          DSA • GRAPH<br/>• DP
        </span>
        <span className="block font-sans text-base text-slate-300 font-medium mb-1">
          Core Problem Solving
        </span>
        <span className="block font-sans text-xs font-medium uppercase tracking-widest text-slate-500 group-hover:text-emerald-400 transition-colors">
          Algorithmic Toolkit →
        </span>
      </div>

    </div>
  );
};
