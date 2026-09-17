import React, { useState } from 'react';
import { Cpu, ChevronRight, BarChart3, Brain, Code, ShieldCheck, Cloud } from 'lucide-react';
import {
  TechIconPython,
  TechIconCpp,
  TechIconJS,
  TechIconReact,
  TechIconNext,
  TechIconPostgres,
  TechIconAzure,
  TechIconGCP
} from '../Icons';

interface SkillsMatrixCardProps {
  onViewAll?: () => void;
}

export const SkillsMatrixCard: React.FC<SkillsMatrixCardProps> = ({ onViewAll }) => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const dockIcons = [
    { name: 'Python', icon: TechIconPython, desc: 'Advanced • Data Analysis, ML & Backend' },
    { name: 'C / C++', icon: TechIconCpp, desc: 'Core • Data Structures & Algorithms' },
    { name: 'JavaScript', icon: TechIconJS, desc: 'Proficient • ES6+, Full Stack' },
    { name: 'React', icon: TechIconReact, desc: 'Advanced • SPA, Hooks, Modern UI' },
    { name: 'Next.js', icon: TechIconNext, desc: 'Intermediate • SSR & Full Stack' },
    { name: 'PostgreSQL', icon: TechIconPostgres, desc: 'Proficient • Schema & Optimization' },
    { name: 'Azure', icon: TechIconAzure, desc: 'Cloud • Solutions & Deployment' },
    { name: 'Google Cloud', icon: TechIconGCP, desc: 'Cloud • Storage, Vertex AI, APIs' },
  ];

  return (
    <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between border border-cyan-500/20 hover:border-cyan-500/35 transition-all duration-300 shadow-cyan-glow bg-[#090e1cf0] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5 z-10">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-cyan-500/10 text-portfolio-accent">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono text-xs font-semibold tracking-wider text-slate-200">
            Skills Matrix
          </span>
        </div>

        <button
          onClick={onViewAll}
          className="flex items-center gap-1 font-mono text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Central Holographic Starburst / Sphere & Orbital Nodes */}
      <div className="relative h-44 flex items-center justify-center my-1 select-none">
        {/* SVG Connecting Bezier Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 180">
          <defs>
            <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8a2be2" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Orbital rings */}
          <ellipse cx="160" cy="90" rx="130" ry="50" fill="none" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1" strokeDasharray="3 4" />
          <ellipse cx="160" cy="90" rx="80" ry="70" fill="none" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
          
          {/* Branch Lines from center (160, 90) */}
          <line x1="160" y1="60" x2="160" y2="28" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="125" y1="90" x2="65" y2="90" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="195" y1="90" x2="255" y2="90" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.6" />
          <path d="M 135 110 Q 110 135 90 152" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.6" />
          <path d="M 185 110 Q 210 135 230 152" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.6" />

          {/* Traveling energy pulses on wires */}
          <circle cx="160" cy="44" r="2" fill="#00f0ff" className="animate-pulse" />
          <circle cx="95" cy="90" r="2" fill="#a855f7" className="animate-pulse" />
          <circle cx="225" cy="90" r="2" fill="#00f0ff" className="animate-pulse" />
        </svg>

        {/* Central Glowing Holographic Sphere */}
        <div className="relative z-10 w-16 h-16 rounded-full border border-cyan-400/50 bg-[#061226]/90 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] group">
          <div className="absolute inset-1 rounded-full border border-cyan-400/30 overflow-hidden flex items-center justify-center">
            <div className="w-full h-[1px] bg-cyan-400/40" />
            <div className="absolute h-full w-[1px] bg-cyan-400/40" />
          </div>
          
          <span className="font-display font-black text-[11px] tracking-widest text-white text-glow-cyan">
            SKILLS
          </span>
        </div>

        {/* Node 1: Top - Data & Analytics */}
        <div className="absolute top-0.5 left-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer">
          <div className="p-1 rounded-md bg-[#0e172e] border border-cyan-500/40 text-cyan-300 shadow-cyan-glow group-hover:scale-110 transition-transform">
            <BarChart3 className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono text-[9px] text-slate-200 mt-0.5 font-medium tracking-wide">
            Data &amp; Analytics
          </span>
        </div>

        {/* Node 2: Left - AI / ML */}
        <div className="absolute left-1 top-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
          <div className="p-1 rounded-md bg-[#19102c] border border-purple-500/40 text-purple-300 shadow-purple-glow group-hover:scale-110 transition-transform">
            <Brain className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono text-[9px] text-slate-200 mt-0.5 font-medium tracking-wide">
            AI / ML
          </span>
        </div>

        {/* Node 3: Right - Development */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
          <div className="p-1 rounded-md bg-[#0e172e] border border-cyan-500/40 text-cyan-300 shadow-cyan-glow group-hover:scale-110 transition-transform">
            <Code className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono text-[9px] text-slate-200 mt-0.5 font-medium tracking-wide">
            Development
          </span>
        </div>

        {/* Node 4: Bottom-Left - Cybersecurity */}
        <div className="absolute bottom-0 left-10 flex flex-col items-center group cursor-pointer">
          <div className="p-1 rounded-md bg-[#201509] border border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono text-[9px] text-slate-200 mt-0.5 font-medium tracking-wide">
            Cybersecurity
          </span>
        </div>

        {/* Node 5: Bottom-Right - Cloud */}
        <div className="absolute bottom-0 right-10 flex flex-col items-center group cursor-pointer">
          <div className="p-1 rounded-md bg-[#0d1733] border border-blue-500/40 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-transform">
            <Cloud className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono text-[9px] text-slate-200 mt-0.5 font-medium tracking-wide">
            Cloud
          </span>
        </div>
      </div>

      {/* Bottom Tech Icons Dock */}
      <div className="pt-2 border-t border-white/5 flex flex-col items-center">
        <div className="flex items-center justify-between w-full px-2 py-1.5 rounded-xl bg-[#060b17] border border-white/5">
          {dockIcons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onMouseEnter={() => setActiveSkill(item.name)}
                onMouseLeave={() => setActiveSkill(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-transform duration-200 hover:scale-125 focus:outline-none"
                title={item.name}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        {/* Dynamic Skill Details Caption */}
        <div className="h-4 flex items-center justify-center mt-1 text-[10px] font-mono">
          {activeSkill ? (
            <span className="text-portfolio-accent animate-fadeIn">
              {activeSkill}: {dockIcons.find(d => d.name === activeSkill)?.desc}
            </span>
          ) : (
            <span className="text-slate-500">
              Hover over a skill to see details
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
