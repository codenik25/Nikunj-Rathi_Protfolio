import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MessageSquare, Layers, Cpu, ShieldAlert } from 'lucide-react';

export const SmsSpamVisualizer: React.FC = () => {
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

      // Flow sequence timeline (Deterministic)
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      // Message enters
      tl.set('.msg-node', { opacity: 0, x: -20 })
        .to('.msg-node', { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' })
        .to('.msg-node', { borderColor: 'rgba(239, 68, 68, 0.8)', duration: 0.2 })
        
        // Features extraction
        .to('.feature-node', { borderColor: 'rgba(239, 68, 68, 0.8)', scale: 1.05, duration: 0.5 }, "+=0.2")
        .to('.feature-ring', { rotation: '+=90', duration: 0.5, ease: 'power2.inOut' }, "-=0.5")
        
        // Model analysis
        .to('.model-node', { borderColor: 'rgba(239, 68, 68, 0.8)', scale: 1.05, duration: 0.5 }, "+=0.2")
        .to('.model-pulse', { opacity: 1, scale: 1.5, duration: 0.5 }, "-=0.5")
        .to('.model-pulse', { opacity: 0, scale: 2, duration: 0.5 })
        
        // Classification Result
        .to('.result-panel', { opacity: 1, y: 0, duration: 0.5 }, "+=0.2")
        .fromTo('.conf-number', { innerHTML: 0 }, { 
          innerHTML: 98, 
          duration: 1, 
          snap: { innerHTML: 1 },
          ease: 'power2.out' 
        }, "-=0.5")
        
        // Hold result then fade out
        .to({}, { duration: 2 })
        .to('.msg-node, .feature-node, .model-node', { borderColor: 'rgba(255, 255, 255, 0.1)', scale: 1, duration: 0.5 })
        .to('.result-panel', { opacity: 0, y: 10, duration: 0.5 }, "-=0.5")
        .to('.msg-node', { opacity: 0, x: 20, duration: 0.5 }, "-=0.5");
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px] flex items-center justify-center relative p-8 group overflow-hidden">
      
      {/* Background layer */}
      <div className="absolute inset-0 bg-[#04070a] rounded-2xl border border-white/5 pointer-events-none transition-colors duration-500 group-hover:border-red-500/20 group-hover:bg-[#060a13]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(239,68,68,0.05),transparent_50%)]"></div>
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
      <div className="visualizer-content relative w-full max-w-4xl flex items-center justify-center px-4 md:px-12 z-10 scale-75 md:scale-90 lg:scale-100">
        
        {/* MESSAGE NODE */}
        <div className="msg-node relative w-24 h-24 bg-black/60 border border-white/10 rounded-xl flex flex-col items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.1)] transition-colors opacity-0">
          <MessageSquare className="w-8 h-8 text-slate-300 mb-2" strokeWidth={1.5} />
          <span className="font-sans font-bold text-[9px] text-slate-400 tracking-wider uppercase">SMS IN</span>
        </div>

        {/* CONNECTION 1 */}
        <div className="relative w-16 md:w-24 h-4 flex-shrink-0 z-0">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M 0,10 L 100,10" stroke="rgba(239,68,68,0.2)" fill="none" strokeWidth="1" />
            <path d="M 0,10 L 100,10" stroke="#EF4444" fill="none" strokeWidth="2" strokeDasharray="2 20" strokeLinecap="round" className="particle-path" />
          </svg>
        </div>

        {/* FEATURE EXTRACTION NODE */}
        <div className="feature-node relative w-28 h-28 bg-black/60 border border-white/10 rounded-full flex flex-col items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.1)] transition-transform">
          <div className="feature-ring absolute inset-[-4px] rounded-full border border-red-500/20 border-t-red-400/80 border-r-transparent border-b-red-500/20 border-l-transparent"></div>
          <Layers className="w-8 h-8 text-orange-400 mb-1" strokeWidth={1.5} />
          <span className="font-sans font-bold text-[8px] text-orange-300 tracking-wider">TF-IDF</span>
        </div>

        {/* CONNECTION 2 */}
        <div className="relative w-16 md:w-24 h-4 flex-shrink-0 z-0">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M 0,10 L 100,10" stroke="rgba(239,68,68,0.2)" fill="none" strokeWidth="1" />
            <path d="M 0,10 L 100,10" stroke="#EF4444" fill="none" strokeWidth="2" strokeDasharray="2 20" strokeLinecap="round" className="particle-path" />
          </svg>
        </div>

        {/* MODEL NODE */}
        <div className="model-node relative w-28 h-28 bg-black/60 border border-white/10 rounded-xl flex flex-col items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.1)] transition-transform overflow-hidden">
          <div className="model-pulse absolute inset-0 border border-red-400 rounded-xl opacity-0 scale-100"></div>
          <Cpu className="w-8 h-8 text-red-400 mb-1" strokeWidth={1.5} />
          <span className="font-sans font-bold text-[8px] text-red-300 tracking-wider">CLASSIFIER</span>
        </div>

      </div>

      {/* CLASSIFICATION RESULT PANEL */}
      <div className="result-panel absolute bottom-8 right-8 w-64 p-5 rounded-xl bg-black/80 border border-red-500/30 backdrop-blur-md shadow-[0_10px_30px_rgba(239,68,68,0.2)] opacity-0 translate-y-10">
        <div className="flex gap-3 items-center justify-center mb-2">
          <ShieldAlert className="w-6 h-6 text-red-500 animate-pulse" />
          <span className="font-display font-black text-3xl tracking-tight text-red-400">SPAM</span>
        </div>
        <div className="w-full text-center">
          <span className="font-sans font-bold text-[10px] text-slate-400 tracking-widest uppercase">
            CONFIDENCE: <span className="conf-number text-red-300">0</span>.0%
          </span>
        </div>
      </div>

    </div>
  );
};

