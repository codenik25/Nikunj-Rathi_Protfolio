import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import { Activity, Layers, Bot, MessageSquare } from 'lucide-react';
import { IconGithub } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export const ProjectExpansionGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Apply scroll expansion to each project frame
    const projectCards = container.querySelectorAll('.project-expand-frame');
    projectCards.forEach((frame) => {
      const isMobile = window.innerWidth < 768;
      const initialScale = isMobile ? 0.94 : 0.88;

      gsap.fromTo(
        frame,
        {
          scale: initialScale,
          borderRadius: '24px',
          opacity: 0.85,
        },
        {
          scale: 1,
          borderRadius: '0px',
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: frame.parentElement,
            start: 'top 75%',
            end: 'center center',
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (container.contains(t.trigger as Node)) t.kill();
      });
    };
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative w-full bg-[#05070b] py-24 select-none">
      {/* Chapter Overview Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-20">
        <div className="flex items-center gap-3 font-mono text-xs text-cyan-400 tracking-[0.25em] uppercase mb-4">
          <span>04 // CENTERPIECE</span>
          <span className="text-slate-600">—</span>
          <span>CINEMATIC PROJECT EXPANSIONS</span>
        </div>
        <h2 className="font-display font-black text-4xl sm:text-7xl text-white uppercase tracking-tight">
          PRODUCTION <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-portfolio-secondary">SYSTEMS</span>
        </h2>
        <p className="font-mono text-xs sm:text-sm text-slate-400 mt-4 max-w-xl">
          Each project expands into an immersive full-screen architecture walkthrough highlighting data pipelines, real-time analytics, and machine learning models.
        </p>
      </div>

      {/* Full-Screen Expanding Project Chapters */}
      <div className="space-y-36">
        {/* PROJECT 01: PricePulse-AI */}
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-8 lg:p-12">
          <div
            data-cursor="project"
            className="project-expand-frame group w-full max-w-7xl min-h-[85vh] rounded-2xl border border-cyan-500/25 hover:border-cyan-400/50 bg-[#070b16] p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,240,255,0.15)] transition-all duration-300 cursor-pointer"
          >
            {/* Background cyber grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-40 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

            {/* Top metadata */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <span className="font-display font-black text-3xl sm:text-5xl text-cyan-400 group-hover:scale-105 transition-transform duration-300">
                  01
                </span>
                <div>
                  <span className="font-mono text-xs text-slate-400 tracking-widest uppercase block">
                    {projects[0].category}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-wide uppercase transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-100">
                    {projects[0].title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={projects[0].githubUrl || '#'}
                  data-cursor="external"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 hover:border-cyan-400/40 text-white font-mono text-xs transition-all"
                >
                  <IconGithub className="w-3.5 h-3.5 text-cyan-400" />
                  <span>REPOSITORY</span>
                </a>
              </div>
            </div>

            {/* Center: PricePulse-AI Analytics Dashboard Preview */}
            <div className="relative z-10 my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Description & Tech */}
              <div className="lg:col-span-5 space-y-6">
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  {projects[0].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {projects[0].techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md border border-cyan-500/20 bg-cyan-950/30 group-hover:border-cyan-400/40 group-hover:bg-cyan-950/50 text-cyan-300 font-mono text-xs transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-[#050812] font-mono text-xs text-slate-400 group-hover:border-cyan-500/20 transition-all">
                  <span className="text-emerald-400 font-bold block mb-1">KEY RESULT:</span>
                  {projects[0].result}
                </div>
              </div>

              {/* Dedicated Animated Analytics Dashboard (subtly scales 1.03x on frame hover) */}
              <div className="lg:col-span-7 rounded-2xl border border-cyan-500/30 group-hover:border-cyan-400/60 bg-[#060a14] p-6 shadow-2xl font-mono text-xs transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold">
                    <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>PRICE_ANALYTICS_CORE.sys</span>
                  </div>
                  <span className="text-emerald-400 text-[10px]">● ETL STREAM: 98.4% ACCURACY</span>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-[#090e1c] border border-cyan-500/10 group-hover:border-cyan-500/20 transition-all">
                    <span className="text-[10px] text-slate-400 uppercase">Volume Analyzed</span>
                    <span className="font-display font-black text-lg sm:text-xl text-white block">$14.2K</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#090e1c] border border-cyan-500/10 group-hover:border-cyan-500/20 transition-all">
                    <span className="text-[10px] text-slate-400 uppercase">Best Buy Score</span>
                    <span className="font-display font-black text-lg sm:text-xl text-cyan-300 block">94.8%</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#090e1c] border border-cyan-500/10 group-hover:border-cyan-500/20 transition-all">
                    <span className="text-[10px] text-slate-400 uppercase">Live Stores</span>
                    <span className="font-display font-black text-lg sm:text-xl text-portfolio-secondary block">12 STORES</span>
                  </div>
                </div>

                {/* Price Trends SVG Stream Chart */}
                <div className="p-4 rounded-lg bg-[#090e1c] border border-white/5 mb-6">
                  <div className="flex justify-between text-[10px] text-slate-400 mb-2">
                    <span>PRICE TREND STREAM &amp; DISCOUNT SPREAD</span>
                    <span className="text-cyan-400">DAILY_SCRAPE</span>
                  </div>
                  <svg viewBox="0 0 400 80" className="w-full h-20 overflow-visible">
                    <defs>
                      <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,55 Q50,20 100,45 T200,25 T300,50 T400,20 L400,80 L0,80 Z"
                      fill="url(#pGrad)"
                    />
                    <path
                      d="M0,55 Q50,20 100,45 T200,25 T300,50 T400,20"
                      fill="none"
                      stroke="#00f0ff"
                      strokeWidth="2"
                    />
                    <circle cx="200" cy="25" r="3.5" fill="#ffffff" stroke="#00f0ff" strokeWidth="2" />
                    <circle cx="400" cy="20" r="3.5" fill="#ffffff" stroke="#00f0ff" strokeWidth="2" />
                  </svg>
                </div>

                {/* Dedicated ETL Pipeline */}
                <div className="p-3 rounded-lg bg-black/40 border border-cyan-500/15 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                  <span className="text-slate-400">ETL PIPELINE:</span>
                  <span className="text-cyan-300">API INGEST</span>
                  <span className="text-slate-600">→</span>
                  <span className="text-cyan-300">ETL CLEAN</span>
                  <span className="text-slate-600">→</span>
                  <span className="text-cyan-300">POSTGRES</span>
                  <span className="text-slate-600">→</span>
                  <span className="text-emerald-400 font-bold">POWER BI VISUALS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECT 02: TrendTales */}
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-8 lg:p-12">
          <div
            data-cursor="project"
            className="project-expand-frame group w-full max-w-7xl min-h-[85vh] rounded-2xl border border-purple-500/25 hover:border-purple-400/50 bg-[#090916] p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)] transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-40 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <span className="font-display font-black text-3xl sm:text-5xl text-portfolio-secondary group-hover:scale-105 transition-transform duration-300">
                  02
                </span>
                <div>
                  <span className="font-mono text-xs text-slate-400 tracking-widest uppercase block">
                    {projects[1].category}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-wide uppercase transition-all duration-300 group-hover:translate-x-1 group-hover:text-purple-100">
                    {projects[1].title}
                  </h3>
                </div>
              </div>

              <a
                href={projects[1].githubUrl || '#'}
                data-cursor="external"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 hover:border-purple-400/40 text-white font-mono text-xs transition-all"
              >
                <IconGithub className="w-3.5 h-3.5 text-portfolio-secondary" />
                <span>REPOSITORY</span>
              </a>
            </div>

            <div className="relative z-10 my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-6">
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  {projects[1].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {projects[1].techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md border border-purple-500/20 bg-purple-950/30 group-hover:border-purple-400/40 group-hover:bg-purple-950/50 text-purple-300 font-mono text-xs transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-[#050812] font-mono text-xs text-slate-400 group-hover:border-purple-500/20 transition-all">
                  <span className="text-purple-400 font-bold block mb-1">KEY RESULT:</span>
                  {projects[1].result}
                </div>
              </div>

              {/* Dedicated TrendTales Generative Story Pipeline (scales 1.03x on frame hover) */}
              <div className="lg:col-span-7 rounded-2xl border border-purple-500/30 group-hover:border-purple-400/60 bg-[#070712] p-6 shadow-2xl font-mono text-xs transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2 text-purple-300 font-bold">
                    <Bot className="w-4 h-4 text-portfolio-secondary animate-pulse" />
                    <span>GENERATIVE_STORY_PIPELINE.sys</span>
                  </div>
                  <span className="text-cyan-300 text-[10px]">● VERTEX AI + GCP TTS</span>
                </div>

                <div className="space-y-3">
                  {[
                    { step: 'INPUT', label: 'Artisan Product & Market Trends', tag: 'REST API' },
                    { step: 'TRANSCRIPTION', label: 'Whisper Audio Processing Engine', tag: 'FastAPI' },
                    { step: 'AI GENERATION', label: 'Vertex AI & LLM Narrative Synthesis', tag: 'GCP Gemini' },
                    { step: 'SCRIPT', label: 'Dynamic Multi-Scene Storyboard', tag: 'JSON Engine' },
                    { step: 'TTS', label: 'Google Cloud High-Fidelity Voice Synthesis', tag: 'GCP TTS' },
                    { step: 'CONTENT', label: 'Instant Short-form Audio & Media Assets', tag: 'Output' },
                  ].map((pipe) => (
                    <div
                      key={pipe.step}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-[#0c0c1e] border border-white/5 group-hover:border-white/10 text-[11px] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-portfolio-secondary font-bold w-24">{pipe.step}</span>
                        <span className="text-slate-300">{pipe.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                        {pipe.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECT 03: Hackaholics */}
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-8 lg:p-12">
          <div
            data-cursor="project"
            className="project-expand-frame group w-full max-w-7xl min-h-[85vh] rounded-2xl border border-cyan-500/25 hover:border-cyan-400/50 bg-[#060b17] p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,240,255,0.15)] transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-40 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <span className="font-display font-black text-3xl sm:text-5xl text-cyan-300 group-hover:scale-105 transition-transform duration-300">
                  03
                </span>
                <div>
                  <span className="font-mono text-xs text-slate-400 tracking-widest uppercase block">
                    {projects[2].category}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-wide uppercase transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-100">
                    {projects[2].title}
                  </h3>
                </div>
              </div>

              <a
                href={projects[2].githubUrl || '#'}
                data-cursor="external"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 hover:border-cyan-400/40 text-white font-mono text-xs transition-all"
              >
                <IconGithub className="w-3.5 h-3.5 text-cyan-300" />
                <span>REPOSITORY</span>
              </a>
            </div>

            <div className="relative z-10 my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-6">
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  {projects[2].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {projects[2].techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md border border-cyan-500/20 bg-cyan-950/30 group-hover:border-cyan-400/40 group-hover:bg-cyan-950/50 text-cyan-300 font-mono text-xs transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-[#050812] font-mono text-xs text-slate-400 group-hover:border-cyan-500/20 transition-all">
                  <span className="text-cyan-400 font-bold block mb-1">KEY RESULT:</span>
                  {projects[2].result}
                </div>
              </div>

              {/* Dedicated Hackaholics ML Matching Pipeline (scales 1.03x on frame hover) */}
              <div className="lg:col-span-7 rounded-2xl border border-cyan-500/30 group-hover:border-cyan-400/60 bg-[#060914] p-6 shadow-2xl font-mono text-xs transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold">
                    <Layers className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>INTERNSHIP_MATCHMAKING_ENGINE.sys</span>
                  </div>
                  <span className="text-emerald-400 text-[10px]">● COSINE AFFINITY &gt; 94%</span>
                </div>

                <div className="space-y-3">
                  {[
                    { stage: 'STUDENT PROFILE', desc: 'Candidate Resume & Skills Vectorization', tag: 'TF-IDF' },
                    { stage: 'FEATURE EXTRACTION', desc: 'Dense Skill Vectors & Preference Matrix', tag: 'NumPy' },
                    { stage: 'ML MODEL', desc: 'Scikit-learn + XGBoost Classifier', tag: 'Inference' },
                    { stage: 'MATCHING', desc: 'Cosine Affinity Matrix (>94% Top Match)', tag: 'Engine' },
                    { stage: 'INTERNSHIP', desc: 'Personalized Opportunity Recommendation', tag: 'Live API' },
                  ].map((item) => (
                    <div
                      key={item.stage}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#0a0f20] border border-white/5 group-hover:border-white/10 text-[11px] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-cyan-400 font-bold w-36">{item.stage}</span>
                        <span className="text-slate-300">{item.desc}</span>
                      </div>
                      <span className="text-[10px] text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECT 04: SMS Spam Detection */}
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-8 lg:p-12">
          <div
            data-cursor="project"
            className="project-expand-frame group w-full max-w-7xl min-h-[85vh] rounded-2xl border border-emerald-500/25 hover:border-emerald-400/50 bg-[#060e14] p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-40 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <span className="font-display font-black text-3xl sm:text-5xl text-emerald-400 group-hover:scale-105 transition-transform duration-300">
                  04
                </span>
                <div>
                  <span className="font-mono text-xs text-slate-400 tracking-widest uppercase block">
                    {projects[3].category}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-wide uppercase transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-100">
                    {projects[3].title}
                  </h3>
                </div>
              </div>

              <a
                href={projects[3].githubUrl || '#'}
                data-cursor="external"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 hover:border-emerald-400/40 text-white font-mono text-xs transition-all"
              >
                <IconGithub className="w-3.5 h-3.5 text-emerald-400" />
                <span>REPOSITORY</span>
              </a>
            </div>

            <div className="relative z-10 my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-6">
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  {projects[3].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {projects[3].techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md border border-emerald-500/20 bg-emerald-950/30 group-hover:border-emerald-400/40 group-hover:bg-emerald-950/50 text-emerald-300 font-mono text-xs transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-[#050812] font-mono text-xs text-slate-400 group-hover:border-emerald-500/20 transition-all">
                  <span className="text-emerald-400 font-bold block mb-1">KEY RESULT:</span>
                  {projects[3].result}
                </div>
              </div>

              {/* Dedicated NLP Classifier Pipeline (scales 1.03x on frame hover) */}
              <div className="lg:col-span-7 rounded-2xl border border-emerald-500/30 group-hover:border-emerald-400/60 bg-[#050b10] p-6 shadow-2xl font-mono text-xs transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold">
                    <MessageSquare className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span>NLP_CLASSIFIER_PIPELINE.sys</span>
                  </div>
                  <span className="text-emerald-400 text-[10px]">● 98% TEST ACCURACY VERIFIED</span>
                </div>

                <div className="space-y-3">
                  {[
                    { step: 'SMS INGEST', detail: 'Raw Message Stream Ingestion', status: 'Clean' },
                    { step: 'TEXT PREPROCESSING', detail: 'Tokenization, Stemming & Stopwords Removal', status: 'Filtered' },
                    { step: 'NLP EMBEDDING', detail: 'TF-IDF Frequency Vectorization Matrix', status: 'Vectorized' },
                    { step: 'CLASSIFIER', detail: 'Multinomial Naive Bayes / SVM Engine', status: 'Inference' },
                    { step: 'CLASSIFICATION', detail: 'SPAM / LEGITIMATE (98% Test Accuracy)', status: 'VERIFIED ✓' },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#09131a] border border-white/5 group-hover:border-white/10 text-[11px] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400 font-bold w-36">{item.step}</span>
                        <span className="text-slate-300">{item.detail}</span>
                      </div>
                      <span className="text-[10px] text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
