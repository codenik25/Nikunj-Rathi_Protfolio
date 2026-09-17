import React from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { profileData } from '../data/profile';

interface TopStatusBarProps {
  onOpenOpportunities?: () => void;
  mobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  onOpenOpportunities,
  mobileMenuOpen,
  onToggleMobileMenu,
}) => {
  return (
    <header className="fixed top-0 left-0 xl:left-64 right-0 h-12 glass-topbar z-30 flex items-center justify-between px-4 sm:px-8 border-b border-cyan-500/10 text-xs font-mono select-none">
      {/* Left Metadata */}
      <div className="flex items-center gap-3 md:gap-5 overflow-hidden">
        {/* Mobile menu toggle */}
        <button
          onClick={onToggleMobileMenu}
          className="xl:hidden p-1 text-slate-400 hover:text-portfolio-accent"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="text-[11px] font-semibold text-emerald-400 tracking-wider uppercase">
            ONLINE
          </span>
        </div>

        {/* Location & University */}
        <div className="hidden sm:flex items-center gap-3 text-slate-400 text-[11px] tracking-wide">
          <span>{profileData.location}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Final Year CSE</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">{profileData.education.institution}</span>
        </div>
      </div>

      {/* Center Slogan */}
      <div className="hidden lg:block text-slate-400 italic text-[11px] tracking-wide font-sans opacity-90">
        Let&apos;s build something amazing together.
      </div>

      {/* Right Action */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenOpportunities}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-[11px] font-mono tracking-wider transition-all duration-300 shadow-cyan-glow"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Open to Opportunities</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </header>
  );
};
