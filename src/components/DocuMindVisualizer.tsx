import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const DocuMindVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Document pages floating up
      gsap.to('.doc-page', {
        y: -40,
        opacity: 0,
        duration: 2,
        stagger: 0.3,
        repeat: -1,
        ease: 'power1.out'
      });

      // Embeddings pulsing
      gsap.to('.embedding-dot', {
        scale: 1.5,
        opacity: 0.2,
        duration: 1,
        stagger: {
          each: 0.1,
          from: 'random'
        },
        repeat: -1,
        yoyo: true
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px] flex flex-col items-center justify-center relative gap-8">
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/10 to-emerald-900/5 rounded-2xl border border-white/5 pointer-events-none" />
      
      {/* Top: Document -> Processing -> Embeddings */}
      <div className="flex items-center gap-6 relative z-10">
        
        {/* Document Stack */}
        <div className="relative w-16 h-20 bg-white/5 border border-white/20 rounded-md flex items-center justify-center">
          <span className="font-sans font-medium text-xs tracking-wider text-slate-300">PDF</span>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="doc-page absolute w-full h-full border border-white/10 rounded-md bg-white/5" style={{ top: i * 4, left: i * 4, zIndex: -1 }} />
          ))}
        </div>

        <div className="w-12 h-px bg-white/20" />

        {/* Processing Node */}
        <div className="w-20 h-20 rounded-xl bg-[#0a101d] border border-violet-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(139,123,255,0.1)]">
          <span className="font-sans text-xs font-medium uppercase tracking-widest text-violet-400">CHUNK</span>
        </div>

        <div className="w-12 h-px bg-white/20" />

        {/* Embeddings (Vector Space) */}
        <div className="w-24 h-24 relative bg-[#0a101d] border border-emerald-500/30 rounded-full flex items-center justify-center overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="embedding-dot absolute w-1 h-1 bg-emerald-400 rounded-full" 
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`
              }} 
            />
          ))}
          <span className="relative z-10 font-sans text-[10px] font-bold tracking-widest text-emerald-400 bg-[#0a101d] px-2 py-1 rounded">VECTORS</span>
        </div>

      </div>

      {/* Bottom: AI Response */}
      <div className="relative z-10 mt-8 w-64 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <div className="flex gap-2 items-center mb-3">
          <div className="w-4 h-4 rounded-full bg-cyan-400/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>
          <span className="font-sans text-xs text-white">AI Synthesis</span>
        </div>
        <div className="space-y-2">
          <div className="w-full h-2 rounded bg-white/20" />
          <div className="w-5/6 h-2 rounded bg-white/20" />
          <div className="w-4/6 h-2 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
};
