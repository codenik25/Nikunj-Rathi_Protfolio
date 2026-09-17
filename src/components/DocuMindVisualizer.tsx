import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FileText, Cpu, Database } from 'lucide-react';

export const DocuMindVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ambient floating motion
      gsap.to('.visualizer-content', {
        y: -4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Document pages floating up
      gsap.to('.doc-page', {
        y: -40,
        opacity: 0,
        duration: 2,
        stagger: 0.3,
        repeat: -1,
        ease: 'power1.out'
      });

      // Flow sequence timeline
      const tl = gsap.timeline({ repeat: -1 });
      
      tl.to('.pdf-node', { borderColor: 'rgba(139, 92, 246, 0.8)', duration: 0.5 })
        .to('.pdf-node', { borderColor: 'rgba(139, 92, 246, 0.3)', duration: 1 })
        
        .to('.chunk-node', { borderColor: 'rgba(139, 92, 246, 0.8)', scale: 1.05, duration: 0.5 }, "-=0.5")
        .to('.chunk-node', { borderColor: 'rgba(139, 92, 246, 0.3)', scale: 1, duration: 1 })
        
        // Vector clustering highlight
        .to('.embedding-cluster', { backgroundColor: '#34d399', scale: 1.5, opacity: 1, duration: 0.5 }, "-=0.5")
        .to('.embedding-cluster', { backgroundColor: '#10b981', scale: 1, opacity: 0.5, duration: 1 })
        
        // AI Synthesis active
        .to('.ai-synthesis', { borderColor: 'rgba(52, 211, 153, 0.8)', duration: 0.5 }, "-=0.5")
        .to('.ai-indicator', { backgroundColor: '#34d399', opacity: 1, duration: 0.5 }, "-=0.5")
        .to('.ai-line-1', { width: '100%', duration: 0.5 })
        .to('.ai-line-2', { width: '85%', duration: 0.4 })
        .to('.ai-line-3', { width: '60%', duration: 0.3 })
        .to('.ai-indicator', { backgroundColor: 'rgba(52, 211, 153, 0.2)', opacity: 0.5, duration: 1, delay: 0.5 })
        .to('.ai-synthesis', { borderColor: 'rgba(255, 255, 255, 0.1)', duration: 1 })
        .to('.ai-line-1, .ai-line-2, .ai-line-3', { width: '0%', duration: 0.5 });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px] flex items-center justify-center relative p-8 group overflow-hidden">
      
      {/* Background layer */}
      <div className="absolute inset-0 bg-[#04070a] rounded-2xl border border-white/5 pointer-events-none transition-colors duration-500 group-hover:border-violet-500/20 group-hover:bg-[#060a13]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      </div>
      
      <style>{`
        @keyframes particle-flow {
          from { stroke-dashoffset: 60; }
          to { stroke-dashoffset: 0; }
        }
        .particle-path {
          animation: particle-flow 1.5s linear infinite;
        }
        .group:hover .particle-path {
          animation-duration: 1s;
        }
      `}</style>

      {/* Pipeline Container (Ambient Float) */}
      <div className="visualizer-content relative w-full max-w-4xl flex flex-col items-center justify-center px-4 md:px-12 z-10 scale-75 md:scale-90 lg:scale-100 gap-8">
        
        {/* Top Flow */}
        <div className="flex items-center justify-center w-full">
          
          {/* PDF NODE */}
          <div className="pdf-node relative w-24 h-28 bg-black/60 border border-violet-500/30 rounded-xl flex flex-col items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-colors">
            <FileText className="w-8 h-8 text-violet-400 mb-2" strokeWidth={1.5} />
            <span className="font-sans font-bold text-[10px] text-violet-300 tracking-wider">PDF</span>
            
            {/* Floating Pages */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="doc-page absolute w-full h-full border border-violet-400/20 rounded-xl bg-violet-500/5 pointer-events-none" style={{ top: 0, left: 0, zIndex: -1 }} />
            ))}
          </div>

          {/* CONNECTION 1 */}
          <div className="relative w-16 md:w-24 h-4 flex-shrink-0 z-0">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M 0,10 L 100,10" stroke="rgba(139,92,246,0.2)" fill="none" strokeWidth="1" />
              <path d="M 0,10 L 100,10" stroke="#8B5CF6" fill="none" strokeWidth="2" strokeDasharray="2 20" strokeLinecap="round" className="particle-path" />
            </svg>
          </div>

          {/* CHUNK NODE */}
          <div className="chunk-node relative w-24 h-24 bg-black/60 border border-violet-500/30 rounded-full flex flex-col items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-transform">
            <Cpu className="w-8 h-8 text-violet-400 mb-1" strokeWidth={1.5} />
            <span className="font-sans font-bold text-[9px] text-violet-300 tracking-wider">CHUNK</span>
          </div>

          {/* CONNECTION 2 */}
          <div className="relative w-16 md:w-24 h-4 flex-shrink-0 z-0">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M 0,10 L 100,10" stroke="rgba(52,211,153,0.2)" fill="none" strokeWidth="1" />
              <path d="M 0,10 L 100,10" stroke="#34D399" fill="none" strokeWidth="2" strokeDasharray="2 20" strokeLinecap="round" className="particle-path" />
            </svg>
          </div>

          {/* VECTORS NODE */}
          <div className="relative w-32 h-32 bg-black/60 border border-emerald-500/30 rounded-xl flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(52,211,153,0.1)] overflow-hidden">
            <Database className="absolute opacity-10 w-16 h-16 text-emerald-400" />
            <span className="absolute top-2 left-3 font-sans font-bold text-[9px] text-emerald-400 tracking-wider">VECTORS</span>
            
            {/* Vector Points */}
            <div className="absolute inset-4 relative">
              {Array.from({ length: 25 }).map((_, i) => {
                const isCluster = i % 5 === 0;
                return (
                  <div 
                    key={i} 
                    className={`absolute w-1 h-1 rounded-full transition-all duration-500 ${isCluster ? 'embedding-cluster bg-emerald-500/50 scale-100' : 'bg-emerald-500/30'}`} 
                    style={{
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`
                    }} 
                  />
                );
              })}
            </div>
          </div>

        </div>

        {/* CONNECTION DOWNWARD */}
        <div className="relative h-16 w-4 flex-shrink-0 z-0 my-[-10px]">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 20 100" preserveAspectRatio="none">
            <path d="M 10,0 L 10,100" stroke="rgba(52,211,153,0.2)" fill="none" strokeWidth="1" />
            <path d="M 10,0 L 10,100" stroke="#34D399" fill="none" strokeWidth="2" strokeDasharray="2 20" strokeLinecap="round" className="particle-path" />
          </svg>
        </div>

        {/* AI SYNTHESIS PANEL */}
        <div className="ai-synthesis relative w-80 p-5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-colors">
          <div className="flex gap-3 items-center mb-4">
            <div className="w-5 h-5 rounded-full bg-emerald-400/10 flex items-center justify-center">
              <div className="ai-indicator w-2 h-2 rounded-full bg-emerald-400/20" />
            </div>
            <span className="font-mono font-bold text-[10px] text-emerald-400 tracking-widest uppercase">AI Synthesis</span>
          </div>
          <div className="space-y-3">
            <div className="w-full h-2 rounded bg-white/5 overflow-hidden">
              <div className="ai-line-1 h-full bg-emerald-400/80 rounded" style={{ width: '0%' }} />
            </div>
            <div className="w-full h-2 rounded bg-white/5 overflow-hidden">
              <div className="ai-line-2 h-full bg-emerald-400/60 rounded" style={{ width: '0%' }} />
            </div>
            <div className="w-full h-2 rounded bg-white/5 overflow-hidden">
              <div className="ai-line-3 h-full bg-emerald-400/40 rounded" style={{ width: '0%' }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

