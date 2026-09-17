import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArchiveActivityField } from './ArchiveActivityField';
import { ArchiveStatistics } from './ArchiveStatistics';
import { SelectedMilestones } from './SelectedMilestones';
import { 
  ProblemSolvingOverlay, 
  PrimaryLanguageOverlay, 
  AlgorithmicToolkitOverlay, 
  MilestoneDetailOverlay 
} from './ArchiveOverlays';

export const CodingActivity: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Overlay states
  const [isProblemSolvingOpen, setIsProblemSolvingOpen] = useState(false);
  const [isPrimaryLanguageOpen, setIsPrimaryLanguageOpen] = useState(false);
  const [isAlgorithmicToolkitOpen, setIsAlgorithmicToolkitOpen] = useState(false);
  const [activeMilestoneId, setActiveMilestoneId] = useState<string | null>(null);

  // Background Parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.bg-typography-build', {
        x: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
      
      gsap.to('.bg-typography-learn', {
        x: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
      
      gsap.to('.bg-typography-solve', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="activity"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#030509] py-32 px-6 sm:px-12 lg:px-20 overflow-hidden font-sans"
    >
      {/* Background Mesh & Parallax Typography */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-5">
        <div className="bg-typography-build absolute top-[10%] left-[-5%] font-display font-black text-[25vw] leading-none text-white whitespace-nowrap">BUILD</div>
        <div className="bg-typography-learn absolute top-[40%] right-[-10%] font-display font-black text-[25vw] leading-none text-white whitespace-nowrap">LEARN</div>
        <div className="bg-typography-solve absolute bottom-[-5%] left-[10%] font-display font-black text-[25vw] leading-none text-white whitespace-nowrap">SOLVE</div>
      </div>
      
      {/* Subtle Grain & Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', mixBlendMode: 'overlay' }}></div>

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col gap-24">
        
        {/* Editorial Header */}
        <div className="flex flex-col max-w-3xl">
          <span className="font-sans text-sm font-bold text-slate-400 tracking-widest uppercase mb-8 flex items-center gap-4">
            <span>06 / ENGINEERING ARCHIVE</span>
            <span className="h-px w-12 bg-white/20 block"></span>
          </span>
          
          <h2 className="font-display font-bold text-6xl sm:text-[clamp(72px,7vw,110px)] leading-[0.9] text-white tracking-tight mb-12">
            CODE<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              IN MOTION.
            </span>
          </h2>

          <div className="max-w-[550px] space-y-6">
            <h3 className="text-xl md:text-2xl font-medium text-slate-200">
              How I build, learn, and solve.
            </h3>
            <p className="text-[17px] leading-relaxed text-slate-400">
              An evolving record of problem solving, data work, software engineering, and continuous experimentation.
            </p>
          </div>
        </div>

        {/* Hero Activity Visual */}
        <div className="w-full">
          <ArchiveActivityField />
        </div>

        {/* 3 Large Editorial Statistics */}
        <ArchiveStatistics 
          onOpenProblemSolving={() => setIsProblemSolvingOpen(true)}
          onOpenPrimaryLanguage={() => setIsPrimaryLanguageOpen(true)}
          onOpenAlgorithmicToolkit={() => setIsAlgorithmicToolkitOpen(true)}
        />

        {/* Selected Milestones (Achievements) */}
        <SelectedMilestones 
          onOpenMilestone={(id) => setActiveMilestoneId(id)}
        />

      </div>

      {/* Modals */}
      <ProblemSolvingOverlay 
        isOpen={isProblemSolvingOpen} 
        onClose={() => setIsProblemSolvingOpen(false)} 
      />
      <PrimaryLanguageOverlay 
        isOpen={isPrimaryLanguageOpen} 
        onClose={() => setIsPrimaryLanguageOpen(false)} 
      />
      <AlgorithmicToolkitOverlay 
        isOpen={isAlgorithmicToolkitOpen} 
        onClose={() => setIsAlgorithmicToolkitOpen(false)} 
      />
      <MilestoneDetailOverlay 
        isOpen={activeMilestoneId !== null} 
        onClose={() => setActiveMilestoneId(null)}
        milestoneId={activeMilestoneId}
      />
      
    </section>
  );
};
