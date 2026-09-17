import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ExperienceDetailModal } from './ExperienceDetailModal';
import { EXPERIENCES_DATA, type ExperienceItem } from '../data/experienceData';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export const ExperienceCommandCenter: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const brightPathRef = useRef<SVGPathElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Hover & selection state
  const [hoveredExpId, setHoveredExpId] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isNavVisible, setIsNavVisible] = useState(false);

  const handleOpenExperience = (exp: ExperienceItem) => {
    setSelectedExperience(exp);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let handleMouseMove: (e: MouseEvent) => void;

    const ctx = gsap.context(() => {
      // 1. Mouse Parallax
      const xTo = gsap.quickTo(backgroundRef.current, 'x', { duration: 1, ease: 'power3' });
      const yTo = gsap.quickTo(backgroundRef.current, 'y', { duration: 1, ease: 'power3' });
      
      handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        xTo(x);
        yTo(y);
      };
      window.addEventListener('mousemove', handleMouseMove);

      // 2. Intro Area Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.intro-container',
          start: 'top 75%',
        }
      });

      tl.fromTo('.intro-label', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0)
        .fromTo('.intro-where', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.1)
        .fromTo('.intro-learned', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.18)
        .fromTo('.intro-build', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.25)
        .fromTo('.intro-dot', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, 0.25)
        .fromTo('.intro-desc', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.35);

      // 3. SVG Path Drawing & Particle Scrub
      if (brightPathRef.current) {
        const length = brightPathRef.current.getTotalLength();
        gsap.set(brightPathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        
        const pathScrollTrigger = {
          trigger: '.journey-container',
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: true,
        };

        gsap.to(brightPathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: pathScrollTrigger
        });

        // Particle moving along path
        gsap.to('.journey-particle', {
          motionPath: {
            path: brightPathRef.current,
            align: brightPathRef.current,
            alignOrigin: [0.5, 0.5],
          },
          ease: 'none',
          scrollTrigger: pathScrollTrigger
        });
      }

      // 4. Experience Nodes scroll triggers & animations
      const nodes = gsap.utils.toArray('.journey-node-container');
      nodes.forEach((node: any, i) => {
        // Active state trigger
        ScrollTrigger.create({
          trigger: node,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });

        // Entrance animation
        const q = gsap.utils.selector(node);
        gsap.fromTo(q('.exp-year'), { opacity: 0 }, { opacity: 1, duration: 0.5, scrollTrigger: { trigger: node, start: 'top 80%' } });
        gsap.fromTo(q('.exp-company'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: node, start: 'top 80%' } });
        gsap.fromTo(q('.exp-role'), { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.1, scrollTrigger: { trigger: node, start: 'top 80%' } });
      });

      // Nav visibility
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: self => setIsNavVisible(self.isActive),
      });

    }, section);

    return () => {
      ctx.revert();
      if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="experience" 
      className="relative w-full bg-[#030509] min-h-screen text-white pt-32 pb-48 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      <style>{`
        @keyframes float-ambient {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-200px) translateX(30px); opacity: 0; }
        }
        @keyframes ring-pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

      {/* Cinematic Background */}
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#04060B]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,175,255,0.03),transparent_70%)] mix-blend-screen" style={{ animation: 'bg-breathe 8s ease-in-out infinite' }}></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px', animation: 'grid-drift 20s linear infinite' }}></div>
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1 h-1 bg-cyan-400 rounded-full mix-blend-screen opacity-0" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-ambient ${15 + Math.random() * 15}s linear infinite`,
                animationDelay: `-${Math.random() * 20}s`
              }} 
            />
          ))}
        </div>
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', mixBlendMode: 'overlay' }}></div>
      </div>

      {/* Right-side Experience Timeline Nav */}
      <div className={`hidden lg:flex fixed right-48 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-50 pointer-events-none transition-opacity duration-500 ${isNavVisible ? 'opacity-100' : 'opacity-0'}`}>
        {[0, 1, 2].map((index) => {
          const isActive = activeIndex === index;
          const isPast = activeIndex > index;
          
          let colorClass = 'bg-slate-600';
          let ringColorClass = 'border-slate-500';
          let textColorClass = 'text-slate-500';
          let activeColorClass = 'bg-cyan-400';
          
          if (index === 0) {
            activeColorClass = 'bg-cyan-400';
            ringColorClass = 'border-cyan-400';
            textColorClass = 'text-cyan-400';
          } else if (index === 1) {
            activeColorClass = 'bg-violet-400';
            ringColorClass = 'border-violet-400';
            textColorClass = 'text-violet-400';
          } else if (index === 2) {
            activeColorClass = 'bg-emerald-400';
            ringColorClass = 'border-emerald-400';
            textColorClass = 'text-emerald-400';
          }

          if (isActive || isPast) colorClass = activeColorClass;

          return (
            <div key={index} className="flex flex-col items-center gap-6">
              <div className="relative flex items-center justify-center w-6 h-6 transition-all duration-500">
                <span className={`font-mono text-[10px] font-bold absolute right-8 transition-opacity duration-500 ${isActive ? `opacity-100 ${textColorClass}` : 'opacity-0'}`}>
                  0{index + 1}
                </span>
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isActive ? `${colorClass} scale-125` : `${colorClass} scale-100 opacity-50`}`} />
                {isActive && (
                  <div className={`absolute inset-0 border rounded-full ${ringColorClass}`} style={{ animation: 'ring-pulse 2s ease-out infinite' }} />
                )}
              </div>
              {index < 2 && (
                <div className="w-px h-12 bg-white/10 relative overflow-hidden">
                  <div className={`absolute top-0 w-full transition-all duration-1000 ${isPast ? 'h-full bg-slate-500' : 'h-0'}`} />
                </div>
              )}
            </div>
          );
        })}
        <span className="font-sans text-[10px] tracking-[0.2em] text-slate-500 uppercase mt-4 [writing-mode:vertical-rl] rotate-180">
          Experience
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Intro Section Header */}
        <div className="intro-container flex flex-col max-w-4xl mb-64 mt-16">
          <span className="intro-label font-sans text-sm font-bold text-slate-400 tracking-widest uppercase mb-8 flex items-center gap-4">
            <span>05 / ENGINEERING JOURNEY</span>
            <span className="h-px w-12 bg-white/20 block"></span>
          </span>
          <h2 className="font-display font-bold text-[clamp(72px,7vw,110px)] leading-[0.9] text-white tracking-tight mb-8">
            <div className="intro-where overflow-hidden inline-block"><span className="block">WHERE</span></div><br/>
            <div className="intro-learned overflow-hidden inline-block"><span className="block">I LEARNED</span></div><br/>
            <div className="flex items-end">
              <div className="intro-build overflow-hidden inline-block"><span className="block">TO BUILD</span></div>
              <div className="intro-dot w-4 h-4 md:w-6 md:h-6 bg-cyan-400 rounded-full ml-2 md:ml-4 mb-2 md:mb-4"></div>
            </div>
          </h2>
          <p className="intro-desc font-sans text-[17px] leading-relaxed text-slate-400 max-w-2xl">
            From security operations and automation to incubation and applied AI, each experience shaped how I approach real engineering problems.
          </p>
        </div>

        {/* Journey Container */}
        <div className="journey-container relative w-full min-h-[1000px] py-12 flex flex-col items-center">
          
          {/* Shared Container for SVG and Nodes */}
          <div className="absolute inset-y-12 w-full max-w-5xl mx-auto">
            
            {/* Animated SVG Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 1000">
              <defs>
                <linearGradient id="journey-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan */}
                  <stop offset="50%" stopColor="#a78bfa" /> {/* Violet */}
                  <stop offset="100%" stopColor="#34d399" /> {/* Emerald */}
                </linearGradient>
              </defs>

              {/* Base Dim Path */}
              <path 
                id="journey-path"
                ref={pathRef}
                d="M 500 0 C 500 75, 650 75, 650 150 C 650 325, 250 325, 250 500 C 250 650, 600 650, 600 800 C 600 900, 500 900, 500 1000" 
                fill="none" 
                stroke="rgba(255,255,255,0.05)" 
                strokeWidth="2" 
                vectorEffect="non-scaling-stroke"
              />

              {/* Bright Overlay Path */}
              <path 
                ref={brightPathRef}
                d="M 500 0 C 500 75, 650 75, 650 150 C 650 325, 250 325, 250 500 C 250 650, 600 650, 600 800 C 600 900, 500 900, 500 1000" 
                fill="none" 
                stroke="url(#journey-gradient)" 
                strokeWidth="3" 
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Ambient moving particle along path */}
              <circle className="journey-particle fill-white opacity-90 shadow-[0_0_15px_#ffffff]" r="4" vectorEffect="non-scaling-stroke" />
            </svg>

            {/* Nodes (Manually positioned along the curve) */}
            
            {/* 1. ADANI */}
            <div 
              className={`journey-node-container absolute left-[65%] top-[15%] z-10 cursor-pointer group transition-all duration-700 ${hoveredExpId && hoveredExpId !== 'adani' ? 'opacity-30' : 'opacity-100'} ${activeIndex < 0 ? 'opacity-50' : 'opacity-100'}`}
              style={{ transform: 'translate(-12px, -50%)' }}
              onMouseEnter={() => setHoveredExpId('adani')}
              onMouseLeave={() => setHoveredExpId(null)}
              onClick={() => handleOpenExperience(EXPERIENCES_DATA[0])}
            >
              <div className="relative flex items-center gap-8">
                <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center z-10 transition-all duration-700 ${activeIndex >= 0 ? 'bg-cyan-400/20 border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-110' : 'bg-white/5 border border-white/20'} group-hover:scale-125`}>
                   <div className={`w-2 h-2 rounded-full transition-colors duration-700 ${activeIndex >= 0 ? 'bg-cyan-400' : 'bg-slate-500'}`} />
                   {activeIndex === 0 && <div className="absolute inset-0 border border-cyan-400 rounded-full" style={{ animation: 'ring-pulse 2s ease-out infinite' }} />}
                </div>
                <div className="flex flex-col group-hover:translate-x-4 transition-transform duration-500">
                  <span className="exp-year font-sans text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">2026</span>
                  <span className={`exp-company font-display text-5xl font-bold mb-2 transition-colors duration-700 ${activeIndex >= 0 ? 'text-white' : 'text-slate-500'} group-hover:text-cyan-400`}>ADANI</span>
                  <span className="exp-role font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20 self-start">CYBERSECURITY INTERN</span>
                </div>
              </div>
            </div>

            {/* 2. JIC */}
            <div 
              className={`journey-node-container absolute right-[75%] top-[50%] z-10 cursor-pointer group transition-all duration-700 ${hoveredExpId && hoveredExpId !== 'jic' ? 'opacity-30' : 'opacity-100'} ${activeIndex < 1 ? 'opacity-50' : 'opacity-100'}`}
              style={{ transform: 'translate(12px, -50%)' }}
              onMouseEnter={() => setHoveredExpId('jic')}
              onMouseLeave={() => setHoveredExpId(null)}
              onClick={() => handleOpenExperience(EXPERIENCES_DATA[1])}
            >
              <div className="relative flex flex-row-reverse items-center gap-8 text-right">
                <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center z-10 transition-all duration-700 ${activeIndex >= 1 ? 'bg-violet-400/20 border-2 border-violet-400 shadow-[0_0_20px_rgba(167,139,250,0.4)] scale-110' : 'bg-white/5 border border-white/20'} group-hover:scale-125`}>
                   <div className={`w-2 h-2 rounded-full transition-colors duration-700 ${activeIndex >= 1 ? 'bg-violet-400' : 'bg-slate-500'}`} />
                   {activeIndex === 1 && <div className="absolute inset-0 border border-violet-400 rounded-full" style={{ animation: 'ring-pulse 2s ease-out infinite' }} />}
                </div>
                <div className="flex flex-col group-hover:-translate-x-4 transition-transform duration-500 items-end">
                  <span className="exp-year font-sans text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">2025</span>
                  <span className={`exp-company font-display text-5xl font-bold mb-2 transition-colors duration-700 ${activeIndex >= 1 ? 'text-white' : 'text-slate-500'} group-hover:text-violet-400`}>JIC</span>
                  <span className="exp-role font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full border border-violet-400/20">CORE TEAM</span>
                </div>
              </div>
            </div>

            {/* 3. TECHSAKSHAM */}
            <div 
              className={`journey-node-container absolute left-[60%] top-[80%] z-10 cursor-pointer group transition-all duration-700 ${hoveredExpId && hoveredExpId !== 'techsaksham' ? 'opacity-30' : 'opacity-100'} ${activeIndex < 2 ? 'opacity-50' : 'opacity-100'}`}
              style={{ transform: 'translate(-12px, -50%)' }}
              onMouseEnter={() => setHoveredExpId('techsaksham')}
              onMouseLeave={() => setHoveredExpId(null)}
              onClick={() => handleOpenExperience(EXPERIENCES_DATA[2])}
            >
              <div className="relative flex items-center gap-8">
                <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center z-10 transition-all duration-700 ${activeIndex >= 2 ? 'bg-emerald-400/20 border-2 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-110' : 'bg-white/5 border border-white/20'} group-hover:scale-125`}>
                   <div className={`w-2 h-2 rounded-full transition-colors duration-700 ${activeIndex >= 2 ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                   {activeIndex === 2 && <div className="absolute inset-0 border border-emerald-400 rounded-full" style={{ animation: 'ring-pulse 2s ease-out infinite' }} />}
                </div>
                <div className="flex flex-col group-hover:translate-x-4 transition-transform duration-500">
                  <span className="exp-year font-sans text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">2024–25</span>
                  <span className={`exp-company font-display text-5xl font-bold mb-2 transition-colors duration-700 ${activeIndex >= 2 ? 'text-white' : 'text-slate-500'} group-hover:text-emerald-400`}>TECHSAKSHAM</span>
                  <span className="exp-role font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 self-start">AI LEARNING</span>
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

