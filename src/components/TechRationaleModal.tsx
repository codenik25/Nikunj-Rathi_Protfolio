import React, { useEffect } from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { TechIcon } from './TechLogos';
import type { TechRationale } from '../data/projectsData';

interface TechRationaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  rationale: TechRationale | null;
  projectName: string;
}

export const TechRationaleModal: React.FC<TechRationaleModalProps> = ({
  isOpen,
  onClose,
  rationale,
  projectName,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !rationale) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200">
      {/* Backdrop with heavy blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="tech-rationale-title"
        className="relative z-10 w-full max-w-lg rounded-2xl border border-cyan-500/30 bg-[#070d1a]/95 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(0,240,255,0.15)] overflow-hidden"
      >
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        
        {/* Background circuit grid watermark */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          data-cursor="CLOSE"
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-200 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Tech Icon & Category */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 rounded-xl border border-cyan-500/30 bg-[#0a1226] flex items-center justify-center p-3 shadow-[0_0_20px_rgba(0,240,255,0.15)] flex-shrink-0">
            <TechIcon techId={rationale.techId} size={32} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full border border-cyan-400/20 bg-cyan-950/40 text-cyan-300 font-ibm text-[11px] uppercase tracking-wider">
                {rationale.category}
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="font-ibm text-xs text-slate-400">
                {projectName}
              </span>
            </div>
            <h3
              id="tech-rationale-title"
              className="font-display font-black text-2xl text-white tracking-wide"
            >
              Why {rationale.name}?
            </h3>
          </div>
        </div>

        {/* Architectural Rationale Body */}
        <div className="space-y-4 text-slate-300 font-instrument text-[15px] leading-relaxed border-t border-white/10 pt-4">
          <div className="flex items-start gap-2.5 text-cyan-300 font-medium">
            <Sparkles className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
            <span>Architectural Decision & Value Contribution</span>
          </div>

          <p className="text-slate-200/90 pl-6 bg-cyan-950/10 border-l-2 border-cyan-400/40 py-2 pr-3 rounded-r-lg">
            {rationale.reason}
          </p>

          <div className="flex items-center gap-2 font-ibm text-xs text-emerald-400/90 pl-6 pt-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified production integration in {projectName}</span>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="font-ibm text-[11px] text-slate-500">
            PRESS [ESC] OR CLICK OUTSIDE TO CLOSE
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 font-instrument text-xs font-semibold hover:bg-cyan-500/20 hover:text-white transition-colors cursor-pointer"
          >
            GOT IT
          </button>
        </div>
      </div>
    </div>
  );
};
