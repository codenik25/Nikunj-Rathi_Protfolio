import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { profileData } from '../../data/profile';

interface HeroHeadlineProps {
  onExplore?: () => void;
}

export const HeroHeadline: React.FC<HeroHeadlineProps> = ({ onExplore }) => {
  const domains = ['Software', 'Data Analytics', 'AI / ML', 'Cybersecurity'];

  return (
    <div className="flex flex-col gap-5 max-w-xl select-none z-10">
      {/* Intro greeting */}
      <span id="hero-greeting" className="font-sans font-normal text-slate-300 text-lg md:text-xl tracking-wide">
        Hi, I&apos;m
      </span>

      {/* Big Name with Blinking Cursor */}
      <div id="hero-name-heading" className="flex flex-col">
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight">
          <span className="block text-slate-100 drop-shadow-sm">
            NIKUNJ
          </span>
          <span className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-portfolio-accent to-purple-400 text-glow-cyan">
            RATHI
            <span className="w-1.5 h-12 sm:h-14 lg:h-16 bg-portfolio-accent animate-pulse shadow-[0_0_12px_#00f0ff] inline-block ml-1" />
          </span>
        </h1>
      </div>

      {/* Title Subtitle */}
      <div id="hero-subtitle" className="flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-wider text-portfolio-accent">
        <span className="text-portfolio-accent/70">&gt;</span>
        <span className="uppercase">{profileData.role}</span>
      </div>

      {/* Description */}
      <p id="hero-description" className="font-sans text-slate-300/90 text-sm sm:text-base leading-relaxed max-w-lg font-light">
        {profileData.tagline}
      </p>

      {/* Domain pills */}
      <div id="hero-domain-pills" className="flex flex-wrap gap-2 pt-1">
        {domains.map((dom, i) => (
          <span
            key={i}
            className="px-3.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-[#0d1424]/80 text-cyan-300/90 border border-cyan-500/25 hover:border-cyan-400/60 hover:bg-cyan-950/40 transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
          >
            {dom}
          </span>
        ))}
      </div>

      {/* Call to Actions */}
      <div id="hero-cta-buttons" className="flex flex-wrap items-center gap-4 pt-2">
        <button
          onClick={onExplore}
          className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-portfolio-accent hover:bg-cyan-300 text-[#05070e] font-sans font-bold text-xs sm:text-sm tracking-wider transition-all duration-300 shadow-cyan-glow hover:shadow-cyan-glow-lg"
        >
          <span>Explore My Work</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <a
          href={profileData.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#0c1222]/80 hover:bg-[#131b31] text-slate-200 hover:text-white border border-cyan-500/30 hover:border-cyan-400 font-sans font-semibold text-xs sm:text-sm tracking-wider transition-all duration-300 backdrop-blur-md"
        >
          <span>Download Resume</span>
          <Download className="w-4 h-4 text-portfolio-accent group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};
