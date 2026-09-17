import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExperienceDetailModal } from './ExperienceDetailModal';
import { EXPERIENCES_DATA, type ExperienceItem } from '../data/experienceData';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceCommandCenter: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // Hover & selection state
  const [hoveredExpId, setHoveredExpId] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenExperience = (exp: ExperienceItem) => {
    setSelectedExperience(exp);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Draw the SVG path
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            end: 'bottom 80%',
            scrub: 1,
          }
        });
      }

      // Nodes reveal
      const nodes = gsap.utils.toArray('.journey-node-container');
      nodes.forEach((node: any, i) => {
        gsap.fromTo(node,
          { opacity: 0, scale: 0.8, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: node,
              start: 'top 80%',
            }
          }
        );
      });

      // Glowing particle following path
      gsap.to('.journey-particle', {
        motionPath: {
          path: '#journey-path',
          align: '#journey-path',
          alignOrigin: [0.5, 0.5],
        },
        duration: 10,
        repeat: -1,
        ease: 'linear'
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="experience" 
      className="relative w-full bg-[#030509] min-h-screen text-white py-32 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', mixBlendMode: 'overlay' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#030509] via-blue-900/5 to-[#030509] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col max-w-4xl mb-32">
          <span className="font-sans text-sm font-bold text-slate-400 tracking-widest uppercase mb-8 flex items-center gap-4">
            <span>05 / ENGINEERING JOURNEY</span>
            <span className="h-px w-12 bg-white/20 block"></span>
          </span>
          <h2 className="font-display font-bold text-[clamp(72px,7vw,110px)] leading-[0.9] text-white tracking-tight mb-8">
            WHERE<br/>I LEARNED<br/>TO BUILD.
          </h2>
          <p className="font-sans text-[17px] leading-relaxed text-slate-400 max-w-2xl">
            From security operations and automation to incubation and applied AI, each experience shaped how I approach real engineering problems.
          </p>
        </div>

        {/* Journey Container */}
        <div className="relative w-full min-h-[800px] py-12 flex flex-col items-center">
          
          {/* Animated SVG Path */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000 1200">
            <path 
              id="journey-path"
              ref={pathRef}
              d="M 500 50 C 700 300, 200 600, 500 900 C 800 1100, 500 1200, 500 1200" 
              fill="none" 
              stroke="rgba(255,255,255,0.15)" 
              strokeWidth="2" 
              className="transition-colors duration-500"
              style={{ stroke: hoveredExpId ? 'rgba(62,198,255,0.4)' : 'rgba(255,255,255,0.15)' }}
            />
            {/* Ambient moving particles along path */}
            <circle className="journey-particle w-2 h-2 fill-cyan-400 opacity-80 shadow-[0_0_10px_#00f0ff]" r="4" />
          </svg>

          {/* Nodes (Manually positioned along the curve) */}
          <div className="absolute w-full h-full max-w-5xl mx-auto">
            
            {/* 1. ADANI */}
            <div 
              className={`journey-node-container absolute left-[65%] top-[15%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all duration-500 ${hoveredExpId && hoveredExpId !== 'adani' ? 'opacity-30' : 'opacity-100'}`}
              onMouseEnter={() => setHoveredExpId('adani')}
              onMouseLeave={() => setHoveredExpId(null)}
              onClick={() => handleOpenExperience(EXPERIENCES_DATA[0])}
            >
              <div className="relative flex items-center gap-8">
                <div className="w-6 h-6 rounded-full bg-cyan-400/20 border-2 border-cyan-400 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(62,198,255,0.3)] group-hover:scale-125 transition-transform duration-500">
                   <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
                <div className="flex flex-col group-hover:translate-x-4 transition-transform duration-500">
                  <span className="font-display text-5xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">ADANI</span>
                  <span className="font-sans text-xs font-semibold uppercase tracking-widest text-slate-400">2026 • CYBERSECURITY INTERN</span>
                </div>
              </div>
            </div>

            {/* 2. JIC */}
            <div 
              className={`journey-node-container absolute left-[25%] top-[50%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all duration-500 ${hoveredExpId && hoveredExpId !== 'jic' ? 'opacity-30' : 'opacity-100'}`}
              onMouseEnter={() => setHoveredExpId('jic')}
              onMouseLeave={() => setHoveredExpId(null)}
              onClick={() => handleOpenExperience(EXPERIENCES_DATA[1])}
            >
              <div className="relative flex flex-row-reverse items-center gap-8 text-right">
                <div className="w-6 h-6 rounded-full bg-violet-400/20 border-2 border-violet-400 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(139,123,255,0.3)] group-hover:scale-125 transition-transform duration-500">
                   <div className="w-2 h-2 rounded-full bg-violet-400" />
                </div>
                <div className="flex flex-col group-hover:-translate-x-4 transition-transform duration-500">
                  <span className="font-display text-5xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">JIC</span>
                  <span className="font-sans text-xs font-semibold uppercase tracking-widest text-slate-400">2025 • CORE TEAM</span>
                </div>
              </div>
            </div>

            {/* 3. TECHSAKSHAM */}
            <div 
              className={`journey-node-container absolute left-[60%] top-[80%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all duration-500 ${hoveredExpId && hoveredExpId !== 'techsaksham' ? 'opacity-30' : 'opacity-100'}`}
              onMouseEnter={() => setHoveredExpId('techsaksham')}
              onMouseLeave={() => setHoveredExpId(null)}
              onClick={() => handleOpenExperience(EXPERIENCES_DATA[2])}
            >
              <div className="relative flex items-center gap-8">
                <div className="w-6 h-6 rounded-full bg-emerald-400/20 border-2 border-emerald-400 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-125 transition-transform duration-500">
                   <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="flex flex-col group-hover:translate-x-4 transition-transform duration-500">
                  <span className="font-display text-5xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">TECHSAKSHAM</span>
                  <span className="font-sans text-xs font-semibold uppercase tracking-widest text-slate-400">2024–25 • AI LEARNING</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {selectedExperience && (
        <ExperienceDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          experience={selectedExperience}
        />
      )}
    </section>
  );
};
