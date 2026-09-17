import React, { useEffect, useRef, useState } from 'react';
import { Database, Box, Server, Activity } from 'lucide-react';
import { gsap } from 'gsap';

export const InsightFlowVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dataVizRef = useRef<HTMLCanvasElement>(null);

  // Faux processing state
  const [progress, setProgress] = useState({ ext: 0, tra: 0, loa: 0, run: 0 });

  useEffect(() => {
    // Faux progress bars animation
    let animationFrameId: number;
    let time = 0;
    
    const updateProgress = () => {
      time += 0.02;
      setProgress({
        ext: Math.min(100, Math.floor(100 * Math.sin(time) * 0.5 + 50 + time * 10)),
        tra: Math.min(100, Math.floor(78 * Math.sin(time - 1) * 0.5 + 39 + time * 8)),
        loa: Math.min(100, Math.floor(42 * Math.sin(time - 2) * 0.5 + 21 + time * 5)),
        run: Math.min(100, Math.floor(12 * Math.sin(time - 3) * 0.5 + 6 + time * 2)),
      });
      animationFrameId = requestAnimationFrame(updateProgress);
    };
    updateProgress();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    // Canvas Data Visualization (lower right)
    const canvas = dataVizRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    
    // Resize handler
    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const particles: { x: number, y: number, z: number, origY: number, size: number, speed: number }[] = [];
    const numParticles = window.innerWidth < 768 ? 200 : 800; // responsive density
    
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2,
        origY: Math.random() * height,
        size: Math.random() * 1.5,
        speed: 0.005 + Math.random() * 0.01
      });
    }

    let time = 0;
    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      particles.forEach((p, i) => {
        // Wave motion
        p.y = p.origY + Math.sin(p.x * 0.01 + time + p.z) * 20;
        p.x -= p.speed * 20;
        
        if (p.x < 0) {
          p.x = width;
          p.origY = Math.random() * height;
        }

        const opacity = (p.z / 2) * 0.5;
        ctx.fillStyle = `rgba(0, 175, 255, ${opacity})`;
        
        // Occasional bright node
        if (i % 50 === 0) {
          ctx.fillStyle = `rgba(0, 255, 255, ${Math.sin(time * 5 + i) * 0.5 + 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

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

      // Node pulses (sequenced to simulate flow)
      const tl = gsap.timeline({ repeat: -1 });
      
      tl.to('.raw-data-glow', { opacity: 0.8, scale: 1.1, duration: 0.5 })
        .to('.raw-data-glow', { opacity: 0.2, scale: 1, duration: 1 })
        
        .to('.etl-glow', { opacity: 0.8, scale: 1.1, duration: 0.5 }, "-=0.5")
        .to('.etl-ring', { rotation: '+=180', duration: 1, ease: 'power2.out' }, "-=0.5")
        .to('.etl-glow', { opacity: 0.2, scale: 1, duration: 1 })
        
        .to('.ai-glow', { opacity: 0.8, scale: 1.1, duration: 0.5 }, "-=0.5")
        .to('.ai-pulse', { opacity: 1, scale: 1.5, duration: 0.5 }, "-=0.5")
        .to('.ai-pulse', { opacity: 0, scale: 2, duration: 0.5 })
        .to('.ai-glow', { opacity: 0.2, scale: 1, duration: 1 });
        
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px] flex items-center justify-center relative p-8 group overflow-hidden">
      
      {/* Background layer */}
      <div className="absolute inset-0 bg-[#04070a] rounded-2xl border border-white/5 pointer-events-none transition-colors duration-500 group-hover:border-cyan-500/20 group-hover:bg-[#060a13]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,175,255,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      </div>
      
      {/* Canvas Data Visualization in lower right */}
      <div className="absolute bottom-0 right-0 w-2/3 h-1/2 pointer-events-none mix-blend-screen opacity-50">
        <canvas ref={dataVizRef} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04070a] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#04070a] via-transparent to-transparent"></div>
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
        .scanline {
          animation: scan 4s linear infinite;
        }
        @keyframes scan {
          0% { transform: translateY(-10px); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(120px); opacity: 0; }
        }
      `}</style>

      {/* LIVE PROCESSING PANEL */}
      <div className="absolute top-6 left-6 z-20 w-56 bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-lg p-4 font-mono text-[10px] text-cyan-400 overflow-hidden shadow-[0_4px_20px_rgba(0,175,255,0.05)]">
        <div className="absolute top-0 left-0 w-full h-px bg-cyan-400/50 scanline"></div>
        <div className="flex items-center gap-2 mb-3 border-b border-cyan-500/20 pb-2">
          <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span className="font-bold tracking-widest">LIVE PROCESSING</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Extracting data</span>
            <span className="tabular-nums">100%</span>
          </div>
          <div className="w-full h-0.5 bg-white/5 rounded"><div className="h-full bg-cyan-400/50 rounded" style={{ width: '100%' }}></div></div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Transforming & cleaning</span>
            <span className="tabular-nums">{progress.tra}%</span>
          </div>
          <div className="w-full h-0.5 bg-white/5 rounded"><div className="h-full bg-cyan-400/50 rounded" style={{ width: `${progress.tra}%` }}></div></div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Loading to PostgreSQL</span>
            <span className="tabular-nums">{progress.loa}%</span>
          </div>
          <div className="w-full h-0.5 bg-white/5 rounded"><div className="h-full bg-cyan-400/50 rounded" style={{ width: `${progress.loa}%` }}></div></div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Running ML analysis</span>
            <span className="tabular-nums">{progress.run}%</span>
          </div>
          <div className="w-full h-0.5 bg-white/5 rounded"><div className="h-full bg-cyan-400/50 rounded" style={{ width: `${progress.run}%` }}></div></div>
        </div>
      </div>

      {/* Pipeline Container (Ambient Float) */}
      <div className="visualizer-content relative w-full max-w-4xl flex items-center justify-center px-4 md:px-12 z-10 scale-75 md:scale-90 lg:scale-100">
        
        {/* RAW DATA NODE */}
        <div className="relative flex flex-col items-center">
          <div className="raw-data-glow absolute -inset-6 bg-cyan-500/20 rounded-xl blur-2xl opacity-20 transition-opacity"></div>
          <div className="z-10 w-32 h-40 rounded-xl bg-black/60 border border-cyan-500/30 flex flex-col items-center justify-center gap-4 relative overflow-hidden backdrop-blur-md group-hover:border-cyan-400/50 transition-colors">
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            <span className="font-mono text-[10px] font-bold text-cyan-400 tracking-wider">RAW DATA</span>
            <Database className="w-8 h-8 text-cyan-300" strokeWidth={1} />
            <div className="text-center px-2">
              <p className="text-[9px] text-slate-400 leading-tight mt-1">Structured<br/>Pipelines</p>
            </div>
          </div>
        </div>

        {/* CONNECTION 1 */}
        <div className="relative w-20 md:w-28 h-32 flex-shrink-0 -mx-1 z-0">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Base thin path */}
            <path d="M 0,50 C 40,50 40,50 100,50" stroke="rgba(0,175,255,0.2)" fill="none" strokeWidth="1" />
            <path d="M 0,50 C 40,50 40,20 100,20" stroke="rgba(0,175,255,0.2)" fill="none" strokeWidth="1" />
            <path d="M 0,50 C 40,50 40,80 100,80" stroke="rgba(0,175,255,0.2)" fill="none" strokeWidth="1" />
            
            {/* Elegant Particle Dots */}
            <path d="M 0,50 C 40,50 40,50 100,50" stroke="#00AFFF" fill="none" strokeWidth="2" strokeDasharray="2 58" strokeLinecap="round" className="particle-path" />
            <path d="M 0,50 C 40,50 40,20 100,20" stroke="#00AFFF" fill="none" strokeWidth="2" strokeDasharray="2 58" strokeLinecap="round" className="particle-path" style={{ animationDelay: '-0.5s' }} />
            <path d="M 0,50 C 40,50 40,80 100,80" stroke="#00AFFF" fill="none" strokeWidth="2" strokeDasharray="2 58" strokeLinecap="round" className="particle-path" style={{ animationDelay: '-1s' }} />
          </svg>
        </div>

        {/* ETL NODE */}
        <div className="relative flex flex-col items-center">
          <div className="etl-glow absolute -inset-8 bg-blue-500/20 rounded-full blur-2xl opacity-20"></div>
          <div className="z-10 w-36 h-36 rounded-full bg-black/60 border border-blue-500/30 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(96,165,250,0.1)] relative backdrop-blur-md group-hover:border-blue-400/50 transition-colors">
            
            {/* Rotating Ring */}
            <div className="etl-ring absolute inset-[-6px] rounded-full border border-blue-500/20 border-t-blue-400/80 border-r-transparent border-b-blue-500/20 border-l-transparent"></div>
            
            <span className="absolute top-6 font-sans font-bold text-[9px] text-blue-400 tracking-widest uppercase">ETL</span>
            
            <div className="flex flex-col items-center mt-2">
              <Server className="w-8 h-8 text-blue-300 relative z-10" strokeWidth={1} />
              <span className="font-sans font-bold text-xs text-white mt-2">PostgreSQL</span>
            </div>
            
            <div className="absolute bottom-6 flex gap-1">
              <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse"></div>
              <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '200ms' }}></div>
              <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '400ms' }}></div>
            </div>
          </div>
        </div>

        {/* CONNECTION 2 */}
        <div className="relative w-20 md:w-28 h-32 flex-shrink-0 -mx-1 z-0">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Base thin path */}
            <path d="M 0,20 C 60,20 60,50 100,50" stroke="rgba(192,132,252,0.2)" fill="none" strokeWidth="1" />
            <path d="M 0,50 C 60,50 60,50 100,50" stroke="rgba(192,132,252,0.2)" fill="none" strokeWidth="1" />
            <path d="M 0,80 C 60,80 60,50 100,50" stroke="rgba(192,132,252,0.2)" fill="none" strokeWidth="1" />
            
            {/* Elegant Particle Dots */}
            <path d="M 0,20 C 60,20 60,50 100,50" stroke="#C084FC" fill="none" strokeWidth="2" strokeDasharray="2 58" strokeLinecap="round" className="particle-path" style={{ animationDelay: '-1.5s' }} />
            <path d="M 0,50 C 60,50 60,50 100,50" stroke="#C084FC" fill="none" strokeWidth="2" strokeDasharray="2 58" strokeLinecap="round" className="particle-path" style={{ animationDelay: '-0.2s' }} />
            <path d="M 0,80 C 60,80 60,50 100,50" stroke="#C084FC" fill="none" strokeWidth="2" strokeDasharray="2 58" strokeLinecap="round" className="particle-path" style={{ animationDelay: '-0.8s' }} />
          </svg>
        </div>

        {/* AI MODEL NODE */}
        <div className="relative flex flex-col items-center">
          <div className="ai-glow absolute -inset-6 bg-purple-500/20 rounded-xl blur-2xl opacity-20"></div>
          <div className="ai-pulse absolute inset-0 border border-purple-400 rounded-xl opacity-0 scale-100"></div>
          <div className="z-10 w-32 h-40 rounded-xl bg-black/60 border border-purple-500/30 flex flex-col items-center justify-center gap-4 relative overflow-hidden backdrop-blur-md group-hover:border-purple-400/50 transition-colors">
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            <span className="font-sans font-bold text-[10px] text-purple-400 tracking-widest uppercase">AI MODEL</span>
            <Box className="w-8 h-8 text-purple-300" strokeWidth={1} />
            <div className="text-center px-2">
              <p className="text-[9px] text-slate-400 leading-tight mt-1">Predictive<br/>Analytics</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


