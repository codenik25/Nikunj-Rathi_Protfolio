import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profileData } from '../data/profile';
import { GraduationCap, MapPin, Target, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AboutProfile: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const monitorFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Camera zoom into monitor effect
    gsap.fromTo(
      monitorFrameRef.current,
      { scale: 0.92, opacity: 0.7 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 35%',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 sm:px-8 xl:px-16 flex flex-col items-center justify-center select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none" />

      {/* Monitor Outer Bezel Frame */}
      <div
        ref={monitorFrameRef}
        className="w-full max-w-5xl glass-panel rounded-3xl p-6 sm:p-10 border border-cyan-500/25 shadow-cyan-glow-lg bg-[#070b16f2] relative overflow-hidden"
      >
        {/* Monitor Screen Top Header Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-cyan-500/20 mb-8">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs text-portfolio-accent font-semibold tracking-wider ml-2">
              WORKSPACE://MONITOR_01/ENGINEERING_PROFILE.sys
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>FOCUS_EXPANDED</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="mb-8">
          <span className="font-mono text-xs text-portfolio-accent tracking-widest uppercase">
            02 &#47;&#47; ENGINEERING PROFILE
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-1">
            System Architect &amp; Developer
          </h2>
          <p className="font-sans text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed font-light">
            {profileData.introduction}
          </p>
        </div>

        {/* 4 Pillars Grid: Who I Am | Education | Focus | Approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Who I Am */}
          <div className="p-5 rounded-2xl bg-[#090f20] border border-cyan-500/15 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-portfolio-accent" />
              <span>WHO I AM</span>
            </div>
            <p className="font-sans text-slate-300 text-xs sm:text-sm leading-relaxed">
              A proactive Computer Science Engineering student passionate about engineering robust data pipelines, scalable cloud backends, and AI integrations. Committed to solving tangible problems through clean architectures and performance-first coding.
            </p>
            <div className="flex items-center gap-2 mt-auto text-[11px] font-mono text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-portfolio-accent" />
              <span>{profileData.about.location} &bull; Open to Global Relocation</span>
            </div>
          </div>

          {/* 2. Education */}
          <div className="p-5 rounded-2xl bg-[#090f20] border border-purple-500/20 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-semibold">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>EDUCATION &amp; CREDENTIALS</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-sans font-bold text-sm text-slate-100">
                {profileData.about.degree}
              </span>
              <span className="font-mono text-xs text-purple-300">
                {profileData.about.university} ({profileData.about.year})
              </span>
              <div className="inline-block mt-1 px-2.5 py-1 rounded bg-purple-500/15 border border-purple-500/30 text-purple-200 font-mono text-xs w-max">
                CGPA: {profileData.about.gpa} &bull; Top Academic Standing
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-auto font-mono">
              Coursework: Data Structures, Algorithms, DBMS, Computer Networks, Operating Systems, Machine Learning
            </p>
          </div>

          {/* 3. Core Focus */}
          <div className="p-5 rounded-2xl bg-[#090f20] border border-emerald-500/20 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-semibold">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>ENGINEERING FOCUS</span>
            </div>
            <ul className="space-y-2 text-xs font-mono text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Data Analytics, ETL Pipelines &amp; BI Modeling</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Applied AI, LLM Integrations &amp; Predictive Models</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Network Security, Intrusion Detection &amp; Cryptography</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Full-Stack Cloud Applications (React, FastAPI, Cloud)</span>
              </li>
            </ul>
          </div>

          {/* 4. Engineering Approach */}
          <div className="p-5 rounded-2xl bg-[#090f20] border border-cyan-500/15 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-semibold">
              <Terminal className="w-4 h-4 text-portfolio-accent" />
              <span>APPROACH &amp; METHODOLOGY</span>
            </div>
            <p className="font-sans text-slate-300 text-xs sm:text-sm leading-relaxed">
              &ldquo;Good Code, Better Ideas.&rdquo; I prioritize testability, deterministic system behaviors, and clean documentation. Every system is built to minimize latency, eliminate cognitive overhead, and provide measurable business value.
            </p>
            <div className="flex items-center gap-2 mt-auto font-mono text-[11px] text-cyan-300">
              <span>// METRICS-DRIVEN &bull; AUTOMATION-FIRST</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
