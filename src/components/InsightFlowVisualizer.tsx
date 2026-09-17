import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const InsightFlowVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Data particles flowing through pipeline
      gsap.to('.particle', {
        x: 'random(100, 300)',
        y: 'random(-20, 20)',
        opacity: 0,
        duration: 'random(1, 2)',
        repeat: -1,
        stagger: {
          each: 0.1,
          from: 'random'
        },
        ease: 'power1.inOut'
      });
      
      // Node pulse
      gsap.to('.node', {
        boxShadow: '0 0 20px 2px rgba(62, 198, 255, 0.4)',
        borderColor: 'rgba(62, 198, 255, 0.8)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px] flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-blue-900/5 rounded-2xl border border-white/5 pointer-events-none" />
      
      {/* Pipeline Container */}
      <div className="relative w-full max-w-lg h-64 flex items-center justify-between px-8">
        
        {/* Particles */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="particle absolute w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ left: 0, top: 0 }} />
          ))}
        </div>

        {/* Nodes */}
        <div className="node z-10 w-24 h-24 rounded-2xl bg-[#0a101d] border border-cyan-500/30 flex flex-col items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          <span className="font-mono text-xs text-cyan-400">RAW DATA</span>
          <div className="w-6 h-6 border-2 border-cyan-400/50 rounded-full" />
        </div>

        <div className="w-16 h-px bg-gradient-to-r from-cyan-500/50 to-blue-500/50 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-cyan-400 blur-[2px] -translate-y-1/2" />
        </div>

        <div className="node z-10 w-28 h-28 rounded-full bg-[#0a101d] border border-blue-500/30 flex flex-col items-center justify-center gap-2 shadow-[0_0_15px_rgba(100,116,245,0.1)]">
          <span className="font-sans font-medium text-xs text-blue-400 tracking-widest uppercase">ETL</span>
          <span className="font-sans font-bold text-sm text-white">PostgreSQL</span>
        </div>

        <div className="w-16 h-px bg-gradient-to-r from-blue-500/50 to-violet-500/50 relative" />

        <div className="node z-10 w-24 h-24 rounded-2xl bg-[#0a101d] border border-violet-500/30 flex flex-col items-center justify-center gap-2 shadow-[0_0_15px_rgba(139,123,255,0.1)]">
          <span className="font-sans font-medium text-xs text-violet-400 tracking-widest uppercase">AI MODEL</span>
          <span className="font-sans font-bold text-sm text-white">Analysis</span>
        </div>

      </div>
    </div>
  );
};
