import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InsightFlowVisualizer } from './InsightFlowVisualizer';
import { DocuMindVisualizer } from './DocuMindVisualizer';
import { SmsSpamVisualizer } from './SmsSpamVisualizer';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';
import { PROJECTS_DATA, type ProjectCommandData } from '../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

export const ProjectCommandCenter: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Modals state
  const [selectedProject, setSelectedProject] = useState<ProjectCommandData | null>(null);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  const handleOpenProject = (id: string) => {
    const proj = PROJECTS_DATA.find((p) => p.id === id);
    if (proj) {
      setSelectedProject(proj);
      setIsCaseStudyOpen(true);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Data path animations connecting the projects
      const lines = gsap.utils.toArray('.data-path-line');
      lines.forEach((line: any) => {
        gsap.fromTo(line, 
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: line,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: true
            }
          }
        );
      });

      // Project module fade ins
      const modules = gsap.utils.toArray('.project-module');
      modules.forEach((mod: any) => {
        gsap.fromTo(mod,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mod,
              start: 'top 80%',
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="relative w-full bg-[#030509] min-h-screen text-white pt-32 pb-48 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Cinematic Background Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', mixBlendMode: 'overlay' }}></div>
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(62,198,255,0.05),rgba(255,255,255,0))] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col max-w-4xl mb-32">
          <span className="font-sans text-sm font-bold text-slate-400 tracking-widest uppercase mb-8 flex items-center gap-4">
            <span>04 / SELECTED SYSTEMS</span>
            <span className="h-px w-12 bg-white/20 block"></span>
          </span>
          <h2 className="font-display font-bold text-[clamp(72px,7vw,110px)] leading-[0.9] text-white tracking-tight mb-8">
            THINGS<br/>I BUILT.
          </h2>
          <p className="font-sans text-[17px] leading-relaxed text-slate-400 max-w-2xl">
            Three systems built around software engineering, data, artificial intelligence and security.
          </p>
        </div>

        {/* Project 01: InsightFlow AI */}
        <div className="project-module relative flex flex-col lg:flex-row items-center gap-16 min-h-[60vh] mb-32">
          <div className="lg:w-1/3 flex flex-col items-start cursor-pointer group" onClick={() => handleOpenProject('insightflow-ai')}>
            <span className="font-display text-2xl font-bold text-slate-500 mb-4 group-hover:text-cyan-400 transition-colors">01</span>
            <h3 className="font-display text-4xl lg:text-5xl font-bold mb-4 tracking-tight group-hover:text-cyan-400 transition-colors">INSIGHTFLOW AI</h3>
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-6 px-3 py-1 bg-cyan-400/10 rounded-full border border-cyan-400/20">AI / DATA ANALYTICS</span>
            <p className="font-sans text-[17px] text-slate-400 leading-relaxed mb-8">
              End-to-end data analytics and ML pipeline engineered to process, aggregate, and visualize high-dimensional structured datasets using PostgreSQL and Scikit-learn.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Python', 'FastAPI', 'PostgreSQL', 'Pandas', 'NumPy', 'Power BI', 'Scikit-learn'].map(tech => (
                <span key={tech} className="font-sans text-sm font-medium text-slate-300">{tech} •</span>
              ))}
            </div>
            <button className="font-sans text-xs font-medium uppercase tracking-widest text-white border-b border-white/30 pb-1 group-hover:border-cyan-400 group-hover:text-cyan-400 transition-colors">
              VIEW CASE STUDY →
            </button>
          </div>
          <div className="lg:w-2/3 h-[500px] w-full rounded-2xl overflow-hidden cursor-crosshair group relative" onClick={() => handleOpenProject('insightflow-ai')}>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
            <InsightFlowVisualizer />
          </div>
        </div>

        {/* Data Path Connection */}
        <div className="w-full flex justify-center mb-32 relative h-48 opacity-50">
           <div className="absolute top-0 w-px h-full bg-white/10" />
           <div className="data-path-line absolute top-0 w-px bg-gradient-to-b from-cyan-400 to-violet-400" />
        </div>

        {/* Project 02: DocuMind AI */}
        <div className="project-module relative flex flex-col lg:flex-row-reverse items-center gap-16 min-h-[60vh] mb-32">
          <div className="lg:w-1/3 flex flex-col items-start cursor-pointer group" onClick={() => handleOpenProject('documind-ai')}>
            <span className="font-display text-2xl font-bold text-slate-500 mb-4 group-hover:text-violet-400 transition-colors">02</span>
            <h3 className="font-display text-4xl lg:text-5xl font-bold mb-4 tracking-tight group-hover:text-violet-400 transition-colors">DOCUMIND AI</h3>
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-violet-400 mb-6 px-3 py-1 bg-violet-400/10 rounded-full border border-violet-400/20">AI / DOCUMENT INTELLIGENCE</span>
            <p className="font-sans text-[17px] text-slate-400 leading-relaxed mb-8">
              Retrieval-Augmented Generation (RAG) system utilizing Gemini 1.5 Pro and pgvector to interrogate dense PDF documents with high-fidelity semantic chunking.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
               {['Python', 'FastAPI', 'Gemini', 'pgvector', 'React', 'TypeScript'].map(tech => (
                <span key={tech} className="font-sans text-sm font-medium text-slate-300">{tech} •</span>
              ))}
            </div>
            <button className="font-sans text-xs font-medium uppercase tracking-widest text-white border-b border-white/30 pb-1 group-hover:border-violet-400 group-hover:text-violet-400 transition-colors">
              VIEW CASE STUDY →
            </button>
          </div>
          <div className="lg:w-2/3 h-[500px] w-full rounded-2xl overflow-hidden cursor-crosshair group relative" onClick={() => handleOpenProject('documind-ai')}>
             <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
             <DocuMindVisualizer />
          </div>
        </div>

        {/* Data Path Connection */}
        <div className="w-full flex justify-center mb-32 relative h-48 opacity-50">
           <div className="absolute top-0 w-px h-full bg-white/10" />
           <div className="data-path-line absolute top-0 w-px bg-gradient-to-b from-violet-400 to-emerald-400" />
        </div>

        {/* Project 03: SMS Spam Detection */}
        <div className="project-module relative flex flex-col lg:flex-row items-center gap-16 min-h-[60vh]">
          <div className="lg:w-1/3 flex flex-col items-start cursor-pointer group" onClick={() => handleOpenProject('sms-spam-detection')}>
            <span className="font-display text-2xl font-bold text-slate-500 mb-4 group-hover:text-emerald-400 transition-colors">03</span>
            <h3 className="font-display text-4xl lg:text-5xl font-bold mb-4 tracking-tight group-hover:text-emerald-400 transition-colors">SMS SPAM DETECTION</h3>
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-6 px-3 py-1 bg-emerald-400/10 rounded-full border border-emerald-400/20">NLP / MACHINE LEARNING</span>
            <p className="font-sans text-[17px] text-slate-400 leading-relaxed mb-8">
              NLP-based classification pipeline with optimized TF-IDF vectorization and calibrated probability models to detect malicious phising attempts in real-time.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
               {['Python', 'Scikit-learn', 'NLP', 'Pandas', 'NumPy', 'FastAPI'].map(tech => (
                <span key={tech} className="font-sans text-sm font-medium text-slate-300">{tech} •</span>
              ))}
            </div>
            <button className="font-sans text-xs font-medium uppercase tracking-widest text-white border-b border-white/30 pb-1 group-hover:border-emerald-400 group-hover:text-emerald-400 transition-colors">
              VIEW CASE STUDY →
            </button>
          </div>
          <div className="lg:w-2/3 h-[500px] w-full rounded-2xl overflow-hidden cursor-crosshair group relative">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
            <SmsSpamVisualizer />
          </div>
        </div>

      </div>

      {selectedProject && (
        <ProjectCaseStudyModal
          isOpen={isCaseStudyOpen}
          onClose={() => setIsCaseStudyOpen(false)}
          project={selectedProject}
          onSelectTechChip={() => {}}
        />
      )}
    </section>
  );
};
