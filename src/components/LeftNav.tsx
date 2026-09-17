import React from 'react';
import { Home, User, FolderGit2, Briefcase, Cpu, Award, Mail } from 'lucide-react';
import { IconGithub, IconLinkedin, IconX, IconMail } from './Icons';
import { profileData } from '../data/profile';

interface LeftNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export const LeftNav: React.FC<LeftNavProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: 'home', num: '01', label: 'Home', icon: Home },
    { id: 'about', num: '02', label: 'About', icon: User },
    { id: 'projects', num: '03', label: 'Projects', icon: FolderGit2 },
    { id: 'experience', num: '04', label: 'Experience', icon: Briefcase },
    { id: 'skills', num: '05', label: 'Skills', icon: Cpu },
    { id: 'achievements', num: '06', label: 'Achievements', icon: Award },
    { id: 'contact', num: '07', label: 'Contact', icon: Mail },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 glass-sidebar z-40 hidden xl:flex flex-col justify-between p-6 select-none border-r border-cyan-500/10">
      {/* Top Header / Monogram */}
      <div className="flex flex-col items-center text-center">
        {/* Glowing NR Monogram */}
        <div className="relative mb-3 group cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-14 h-14 rounded-xl border-2 border-portfolio-accent/60 bg-[#0a101f]/90 flex items-center justify-center shadow-cyan-glow group-hover:border-portfolio-accent transition-all duration-300">
            <span className="font-display font-extrabold text-2xl tracking-tighter text-portfolio-accent text-glow-cyan">
              NR
            </span>
          </div>
          <div className="absolute -inset-1 rounded-xl bg-portfolio-accent/20 blur-sm -z-10 group-hover:bg-portfolio-accent/30 transition-all duration-300" />
        </div>

        <h1 className="font-display font-bold text-sm tracking-widest text-slate-100 uppercase">
          {profileData.name}
        </h1>
        <p className="font-mono text-[9px] tracking-[0.25em] text-portfolio-accent/90 uppercase mt-1">
          BUILD • ANALYZE • AUTOMATE
        </p>
      </div>

      {/* Nav Items List */}
      <nav className="flex flex-col gap-1.5 my-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-mono transition-all duration-200 group text-left ${
                isActive
                  ? 'bg-portfolio-accent/15 text-portfolio-accent border border-portfolio-accent/40 shadow-cyan-glow font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 transition-colors ${
                isActive ? 'text-portfolio-accent' : 'text-slate-500 group-hover:text-slate-300'
              }`} />
              <span className={`text-[10px] ${isActive ? 'text-portfolio-accent' : 'text-slate-600 group-hover:text-slate-400'}`}>
                {item.num}
              </span>
              <span className="tracking-wider">
                {item.label}
              </span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-portfolio-accent shadow-[0_0_8px_#00f0ff]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Quote */}
      <div className="px-2 text-center">
        <p className="font-serif italic text-xs text-slate-400/80 leading-relaxed">
          &ldquo;Better Systems<br />For A Brighter<br />Tomorrow.&rdquo;
        </p>
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-4 py-2 border-t border-b border-white/5">
        <a
          href={profileData.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-portfolio-accent transition-colors p-1"
          aria-label="GitHub"
        >
          <IconGithub className="w-4 h-4" />
        </a>
        <a
          href={profileData.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-portfolio-accent transition-colors p-1"
          aria-label="LinkedIn"
        >
          <IconLinkedin className="w-4 h-4" />
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-portfolio-accent transition-colors p-1"
          aria-label="Twitter/X"
        >
          <IconX className="w-4 h-4" />
        </a>
        <a
          href={`mailto:${profileData.contact.email}`}
          className="text-slate-400 hover:text-portfolio-accent transition-colors p-1"
          aria-label="Email"
        >
          <IconMail className="w-4 h-4" />
        </a>
      </div>

      {/* Bottom Radar / Sonar Explorer */}
      <div className="flex items-center gap-3 pt-2">
        <div className="relative w-11 h-11 rounded-full border border-cyan-500/30 bg-[#06101c] flex items-center justify-center overflow-hidden shrink-0 shadow-[inset_0_0_10px_rgba(0,240,255,0.15)]">
          {/* Inner concentric ring */}
          <div className="w-6 h-6 rounded-full border border-cyan-500/20" />
          {/* Crosshairs */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-[1px] bg-cyan-500/20" />
            <div className="absolute h-full w-[1px] bg-cyan-500/20" />
          </div>
          {/* Radar Sweep Needle */}
          <div className="absolute inset-0 radar-sweep-anim origin-center pointer-events-none">
            <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/40 via-cyan-400/10 to-transparent origin-bottom-right" />
          </div>
          {/* Pulsing target point */}
          <div className="absolute w-1.5 h-1.5 rounded-full bg-portfolio-accent shadow-[0_0_6px_#00f0ff] animate-ping" />
        </div>
        <div className="flex flex-col text-[10px] leading-tight">
          <span className="text-slate-500 font-mono">Currently Exploring</span>
          <span className="font-mono text-cyan-300 font-medium tracking-wide">
            AI &times; Data &times; Security
          </span>
        </div>
      </div>
    </aside>
  );
};
