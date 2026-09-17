import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import { ExternalLink, TerminalSquare } from 'lucide-react';
import { IconGithub } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export const ProjectShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!containerRef.current || !scrollWrapperRef.current) return;
      
      const scrollAmount = 2800;

      const anim = gsap.to(scrollWrapperRef.current, {
        x: () => -(scrollWrapperRef.current?.scrollWidth || 4500) + window.innerWidth - 100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          start: "top top",
          end: `+=${scrollAmount}`,
        }
      });

      return () => {
        anim.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative min-h-screen bg-[#0a0a0f] flex items-center overflow-hidden z-20 pt-20 lg:pt-0">
      <div className="absolute top-10 left-6 lg:left-24 z-30">
        <h2 className="text-sm font-mono text-portfolio-accent tracking-widest">04 // PROJECTS</h2>
      </div>

      <div ref={scrollWrapperRef} className="flex flex-col lg:flex-row w-full lg:w-max h-full lg:h-screen items-center px-6 lg:px-24 gap-12 lg:gap-24 py-20 lg:py-0">
        {projects.map((project) => (
          <div key={project.id} className="project-panel w-full lg:w-[80vw] max-w-5xl shrink-0 flex flex-col justify-center">
            <div className="glass-panel rounded-2xl overflow-hidden border border-[#292e42] relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-portfolio-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#292e42]">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-portfolio-accent text-xl">{project.number}</span>
                    <span className="h-[1px] w-12 bg-[#292e42]" />
                    <span className="text-xs font-mono text-portfolio-gray tracking-widest">{project.category}</span>
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-portfolio-light group-hover:text-portfolio-accent transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-portfolio-gray text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-[#1a1b26] rounded text-xs font-mono text-portfolio-light/70 border border-[#292e42]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-portfolio-accent text-slate-950 rounded-lg font-bold text-xs font-mono hover:bg-cyan-300 transition-colors shadow-cyan-glow">
                        <IconGithub className="w-4 h-4" /> Code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-cyan-500/40 text-cyan-300 rounded-lg font-semibold text-xs font-mono hover:border-cyan-300 hover:bg-cyan-950/40 transition-colors">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#070b16] p-6 lg:p-8 font-mono text-sm flex flex-col justify-between overflow-hidden border-t lg:border-t-0 border-[#292e42]">
                  <div className="flex items-center justify-between text-portfolio-gray/60 pb-3 border-b border-cyan-500/15 text-xs">
                    <div className="flex items-center gap-2">
                      <TerminalSquare className="w-4 h-4 text-portfolio-accent" />
                      <span>{project.id}_pipeline.sys</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold">● ACTIVE PIPELINE</span>
                  </div>

                  {/* Project 01: PricePulse-AI Analytics Dashboard */}
                  {project.id === 'pricepulse-ai' && (
                    <div className="my-4 flex flex-col gap-4">
                      {/* KPIs */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2.5 rounded-lg bg-[#0a1020] border border-cyan-500/20 text-center">
                          <span className="text-[9px] text-slate-400 block">VOLUME</span>
                          <span className="text-sm font-bold text-cyan-300 font-mono">$14.2K</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#0a1020] border border-cyan-500/20 text-center">
                          <span className="text-[9px] text-slate-400 block">ACCURACY</span>
                          <span className="text-sm font-bold text-emerald-400 font-mono">98.4%</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#0a1020] border border-cyan-500/20 text-center">
                          <span className="text-[9px] text-slate-400 block">STORES</span>
                          <span className="text-sm font-bold text-purple-300 font-mono">12 LIVE</span>
                        </div>
                      </div>

                      {/* SVG Line & Bar Wave */}
                      <div className="p-3 rounded-xl bg-[#050811] border border-cyan-500/20">
                        <div className="text-[10px] text-slate-400 mb-1 flex justify-between">
                          <span>PRICE TREND STREAM</span>
                          <span className="text-cyan-400">DAILY_SYNC</span>
                        </div>
                        <svg viewBox="0 0 200 60" className="w-full h-16">
                          <defs>
                            <linearGradient id="ppGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path d="M 0 50 Q 35 15, 70 35 T 140 20 T 200 30 L 200 60 L 0 60 Z" fill="url(#ppGrad)" />
                          <path d="M 0 50 Q 35 15, 70 35 T 140 20 T 200 30" fill="none" stroke="#00f0ff" strokeWidth="2" />
                          <circle cx="140" cy="20" r="3" fill="#00f0ff" className="animate-ping" />
                          <circle cx="140" cy="20" r="2" fill="#ffffff" />
                        </svg>
                      </div>

                      {/* Pipeline Path */}
                      <div className="flex items-center justify-between text-[9px] text-cyan-300/80 bg-[#090f22] p-2 rounded-lg border border-cyan-500/20 font-mono">
                        <span>API INGEST</span>
                        <span>&rarr;</span>
                        <span>ETL CLEAN</span>
                        <span>&rarr;</span>
                        <span>POSTGRES</span>
                        <span>&rarr;</span>
                        <span className="text-portfolio-accent font-bold">POWER BI</span>
                      </div>
                    </div>
                  )}

                  {/* Project 02: TrendTales GenAI Audio Pipeline */}
                  {project.id === 'trendtales' && (
                    <div className="my-4 flex flex-col gap-2.5">
                      <span className="text-[10px] text-purple-400 font-mono uppercase tracking-wider">GENERATIVE STORY PIPELINE</span>
                      <div className="flex flex-col gap-1.5 font-mono text-xs">
                        {[
                          { step: 'INPUT', desc: 'Artisan Product & Market Trends', color: 'border-slate-700 text-slate-300' },
                          { step: 'TRANSCRIPTION', desc: 'Whisper Audio Processing Engine', color: 'border-cyan-500/30 text-cyan-300' },
                          { step: 'GENERATIVE AI', desc: 'Vertex AI & LLM Narrative Synth', color: 'border-purple-500/40 text-purple-300 bg-purple-950/20' },
                          { step: 'SCRIPT', desc: 'Dynamic Multi-Scene Storyboard', color: 'border-slate-700 text-slate-300' },
                          { step: 'TTS', desc: 'Google Cloud High-Fidelity Voice', color: 'border-cyan-500/30 text-cyan-300' },
                          { step: 'CONTENT', desc: 'Instant Short-form Audio & Media', color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/20' },
                        ].map((item, idx) => (
                          <div key={idx} className={`p-2 rounded-lg border flex items-center justify-between ${item.color}`}>
                            <span className="font-bold text-[10px] tracking-wider">{item.step}</span>
                            <span className="text-[10px] text-slate-400 font-sans">{item.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project 03: Hackaholics Matchmaking Pipeline */}
                  {project.id === 'hackaholics' && (
                    <div className="my-4 flex flex-col gap-2.5">
                      <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider">ML MATCHMAKING ENGINE</span>
                      <div className="flex flex-col gap-1.5 font-mono text-xs">
                        {[
                          { step: 'PROFILE', desc: 'Candidate Resume & Skills Parsing', color: 'border-slate-700 text-slate-300' },
                          { step: 'FEATURES', desc: 'TF-IDF & Dense Skill Vectorization', color: 'border-cyan-500/30 text-cyan-300' },
                          { step: 'ML MODEL', desc: 'Scikit-Learn + XGBoost Classifier', color: 'border-purple-500/40 text-purple-300 bg-purple-950/20' },
                          { step: 'MATCHING', desc: 'Cosine Affinity Matrix (>94% Match)', color: 'border-cyan-500/30 text-cyan-300' },
                          { step: 'INTERNSHIP', desc: 'Personalized Top Recommendation', color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/20' },
                        ].map((item, idx) => (
                          <div key={idx} className={`p-2 rounded-lg border flex items-center justify-between ${item.color}`}>
                            <span className="font-bold text-[10px] tracking-wider">{item.step}</span>
                            <span className="text-[10px] text-slate-400 font-sans">{item.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project 04: SMS Spam Detection NLP Pipeline */}
                  {project.id === 'sms-spam-detection' && (
                    <div className="my-4 flex flex-col gap-2.5">
                      <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">NLP CLASSIFIER PIPELINE</span>
                      <div className="flex flex-col gap-2 font-mono text-xs">
                        {[
                          { step: 'SMS', desc: 'Raw Message Stream Ingestion', color: 'border-slate-700 text-slate-300' },
                          { step: 'NLP', desc: 'Tokenization, Stemming & Stopwords', color: 'border-cyan-500/30 text-cyan-300' },
                          { step: 'CLASSIFIER', desc: 'Multinomial Naive Bayes / SVM', color: 'border-purple-500/40 text-purple-300 bg-purple-950/20' },
                          { step: 'SPAM / LEGITIMATE', desc: '98% Test Accuracy Verification', color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/20 font-bold' },
                        ].map((item, idx) => (
                          <div key={idx} className={`p-2.5 rounded-lg border flex items-center justify-between ${item.color}`}>
                            <span className="font-bold text-[10px] tracking-wider">{item.step}</span>
                            <span className="text-[10px] text-slate-400 font-sans">{item.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bottom Pipeline Status */}
                  <div className="pt-3 border-t border-cyan-500/15 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>RESULT: {project.result || 'Production Verified'}</span>
                    <span className="text-portfolio-accent">LATENCY: &lt;45ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
