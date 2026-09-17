import React, { useState } from 'react';
import { Layers, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { projects } from '../../data/projects';
import { IconGithub } from '../Icons';

interface FeaturedProjectCardProps {
  onOpenProject?: (id: string) => void;
}

export const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ onOpenProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProject = projects[currentIndex] || projects[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between border border-cyan-500/20 hover:border-cyan-500/35 transition-all duration-300 shadow-cyan-glow bg-[#090e1cf0]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-cyan-500/10 text-portfolio-accent">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono text-xs font-semibold tracking-wider text-slate-200">
            Featured Project
          </span>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span>
            {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-1 ml-1">
            <button
              onClick={handlePrev}
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Next Project"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Project Title and Metadata */}
      <div className="pt-3">
        <div className="flex items-baseline gap-2.5">
          <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30 text-portfolio-accent font-mono text-xs font-bold">
            {currentProject.number}
          </span>
          <h3 className="font-display font-bold text-lg text-slate-100 tracking-tight">
            {currentProject.title}
          </h3>
        </div>
        <p className="font-mono text-[11px] text-cyan-300/80 mt-0.5">
          {currentIndex === 0 ? 'E-commerce Price Analytics Platform' : currentProject.category}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {currentProject.techStack.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#11192e] text-slate-300 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Embedded Real Product / Analytics Preview Dashboard */}
      <div className="my-2 p-2.5 rounded-xl bg-[#060b17] border border-cyan-500/15 flex flex-col gap-2 shadow-inner">
        {/* Top Mini KPI Stats */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-white/5 pb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>ETL STREAM</span>
          </div>
          <span className="text-emerald-400 font-semibold">98.4% ACCURACY</span>
          <span className="text-cyan-300 font-semibold">$14.2K VOL</span>
        </div>

        {/* Multi-chart Preview Grid */}
        <div className="grid grid-cols-3 gap-2 items-center">
          {/* 1. Line Chart */}
          <div className="col-span-1 flex flex-col">
            <svg viewBox="0 0 100 40" className="w-full h-8 overflow-visible">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Area fill */}
              <path
                d="M 0 35 Q 20 12, 35 24 T 65 10 T 100 18 L 100 40 L 0 40 Z"
                fill="url(#lineGrad)"
              />
              {/* Line path */}
              <path
                d="M 0 35 Q 20 12, 35 24 T 65 10 T 100 18"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="65" cy="10" r="2.5" fill="#00f0ff" className="animate-ping" />
              <circle cx="65" cy="10" r="2" fill="#ffffff" />
            </svg>
            <span className="text-[8px] font-mono text-slate-400 text-center">Price Trends</span>
          </div>

          {/* 2. Bar Chart */}
          <div className="col-span-1 flex flex-col items-center justify-end h-9">
            <div className="flex items-end justify-between w-full h-7 px-1 gap-1">
              <div className="w-1.5 h-3 bg-cyan-500/40 rounded-t" />
              <div className="w-1.5 h-5 bg-cyan-400/70 rounded-t" />
              <div className="w-1.5 h-4 bg-cyan-500/50 rounded-t" />
              <div className="w-1.5 h-7 bg-portfolio-accent rounded-t shadow-[0_0_6px_#00f0ff]" />
              <div className="w-1.5 h-5 bg-cyan-400/80 rounded-t" />
              <div className="w-1.5 h-2.5 bg-cyan-500/30 rounded-t" />
            </div>
            <span className="text-[8px] font-mono text-slate-400 text-center">Discounts</span>
          </div>

          {/* 3. Donut Ring */}
          <div className="col-span-1 flex flex-col items-center">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {/* Background Ring */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#15203a" strokeWidth="4" />
                {/* Segments */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#ffd43b" strokeWidth="4" strokeDasharray="30 100" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#00f0ff" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-30" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#a855f7" strokeWidth="4" strokeDasharray="20 100" strokeDashoffset="-55" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-75" />
              </svg>
              <span className="absolute text-[7px] font-mono text-slate-200">ETL</span>
            </div>
            <span className="text-[8px] font-mono text-slate-400 text-center">Stores</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="font-sans text-[11px] text-slate-400/90 leading-relaxed line-clamp-2">
        {currentProject.description}
      </p>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-3.5 border-t border-white/5">
        <button
          onClick={() => onOpenProject && onOpenProject(currentProject.id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium transition-colors shadow-cyan-glow"
        >
          <span>View Project</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <a
          href={currentProject.githubUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono transition-colors"
        >
          <IconGithub className="w-3.5 h-3.5" />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
};
