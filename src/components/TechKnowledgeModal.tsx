import React, { useEffect, useState } from 'react';
import { X, ArrowUpRight, Layers, HelpCircle, CheckCircle2, Terminal, Network, ExternalLink } from 'lucide-react';
import { type TechnologyItem, TECH_BY_ID, TECH_BY_CATEGORY } from '../data/technologyStack';
import { TechIcon } from './TechLogos';

export interface TechKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTech: TechnologyItem | null;
  onSelectTech: (tech: TechnologyItem) => void;
  isFullStackView: boolean;
  onOpenFullStack: () => void;
}

export const TechKnowledgeModal: React.FC<TechKnowledgeModalProps> = ({
  isOpen,
  onClose,
  selectedTech,
  onSelectTech,
  isFullStackView,
  onOpenFullStack,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'useCases' | 'experience' | 'related'>('overview');

  // ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll only on mobile/tablet viewports so desktop can scroll smoothly if needed
  useEffect(() => {
    if (isOpen && window.innerWidth < 1280) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const docsUrl = selectedTech?.docsUrl || (selectedTech ? `https://www.google.com/search?q=${encodeURIComponent(selectedTech.name + ' documentation')}` : '#');

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center xl:justify-end xl:pr-12 p-4 sm:p-6 select-none pointer-events-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tech-modal-title"
    >
      {/* Translucent Dark Backdrop (Closes on click, subtle on desktop so constellation remains visible) */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[120] bg-black/60 xl:bg-black/15 backdrop-blur-sm xl:backdrop-blur-none transition-opacity duration-300 pointer-events-auto"
        aria-hidden="true"
      />

      {/* Main Knowledge Window Card */}
      <div
        className="relative z-[125] w-full max-w-[500px] rounded-2xl border bg-[#080e1c]/95 backdrop-blur-2xl p-6 sm:p-7 shadow-2xl transition-all duration-300 pointer-events-auto max-h-[90vh] overflow-y-auto"
        style={{
          borderColor: selectedTech ? `${selectedTech.accentColor}55` : 'rgba(62, 198, 255, 0.35)',
          boxShadow: selectedTech
            ? `0 25px 60px rgba(0,0,0,0.85), 0 0 30px ${selectedTech.glowColor}`
            : '0 25px 60px rgba(0,0,0,0.85), 0 0 30px rgba(62, 198, 255, 0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient Line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
          style={{
            background: selectedTech
              ? `linear-gradient(90deg, transparent, ${selectedTech.accentColor}, transparent)`
              : 'linear-gradient(90deg, transparent, #3ec6ff, #8b7bff, transparent)',
          }}
        />

        {/* ============================================================= */}
        {/* 1. SINGLE TECHNOLOGY KNOWLEDGE VIEW                           */}
        {/* ============================================================= */}
        {!isFullStackView && selectedTech && (
          <div className="space-y-5">
            {/* Header: Logo + Title + Subtitle + Actions */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                {/* Visual Icon Halo Box */}
                <div
                  className="w-13 h-13 p-2.5 rounded-xl border flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${selectedTech.accentColor}18`,
                    borderColor: `${selectedTech.accentColor}50`,
                    boxShadow: `0 0 16px ${selectedTech.glowColor}`,
                  }}
                >
                  <TechIcon
                    techId={selectedTech.id}
                    size={28}
                    color={selectedTech.accentColor}
                  />
                </div>

                <div>
                  <h3
                    id="tech-modal-title"
                    className="font-syne text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight"
                  >
                    {selectedTech.name}
                  </h3>
                  <p className="font-instrument text-xs sm:text-sm text-slate-300 font-medium">
                    {selectedTech.categoryLabel}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={onOpenFullStack}
                  title="View full stack directory"
                  className="px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-cyan-400/40 hover:bg-white/5 text-slate-400 hover:text-cyan-300 transition-all font-instrument text-xs flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Index</span>
                </button>

                <button
                  onClick={onClose}
                  aria-label="Close knowledge window"
                  className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 text-slate-400 hover:text-white hover:bg-white/5 transition-all focus:outline-none focus:ring-1 focus:ring-cyan-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Navigation Tabs (Matching reference design) */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/5 font-instrument text-xs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'overview'
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('useCases')}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'useCases'
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Use Cases
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'experience'
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                My Experience
              </button>
              <button
                onClick={() => setActiveTab('related')}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'related'
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Related
              </button>
            </div>

            {/* Content Sections */}
            <div className="space-y-4">
              {/* Section 1: What is it? */}
              <div className={`space-y-1.5 ${activeTab !== 'overview' ? 'hidden sm:block' : ''}`}>
                <h4 className="font-syne text-xs sm:text-sm font-semibold text-cyan-300 flex items-center gap-2">
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>What is {selectedTech.name}?</span>
                </h4>
                <p className="font-instrument text-xs sm:text-[13.5px] text-slate-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  {selectedTech.whatIsIt}
                </p>
              </div>

              {/* Section 2: What is it used for? */}
              <div className={`space-y-2 ${activeTab !== 'useCases' ? 'hidden sm:block' : ''}`}>
                <h4 className="font-syne text-xs sm:text-sm font-semibold text-cyan-300 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>What is it used for?</span>
                </h4>
                <ul className="space-y-1.5 font-instrument text-xs sm:text-[13px] text-slate-300">
                  {selectedTech.usedFor.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-white/[0.015] border border-white/5"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: selectedTech.accentColor }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 3: How I use it? */}
              <div className={`space-y-1.5 ${activeTab !== 'experience' ? 'hidden sm:block' : ''}`}>
                <h4 className="font-syne text-xs sm:text-sm font-semibold text-cyan-300 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>How I use it?</span>
                </h4>
                <div
                  className="p-3 rounded-xl border font-instrument text-xs sm:text-[13.5px] text-slate-200 leading-relaxed"
                  style={{
                    backgroundColor: `${selectedTech.accentColor}08`,
                    borderColor: `${selectedTech.accentColor}30`,
                  }}
                >
                  <p>{selectedTech.howIUseIt}</p>
                </div>
              </div>

              {/* Section 4: Related Technologies */}
              {selectedTech.relatedIds.length > 0 && (
                <div className={`pt-2 border-t border-white/5 space-y-2 ${activeTab !== 'related' ? 'hidden sm:block' : ''}`}>
                  <h4 className="font-syne text-xs sm:text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Network className="w-3.5 h-3.5 text-[#8b7bff]" />
                    <span>Related Technologies</span>
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {selectedTech.relatedIds.map((relId) => {
                      const relTech = TECH_BY_ID[relId];
                      if (!relTech) return null;
                      return (
                        <button
                          key={relId}
                          onClick={() => onSelectTech(relTech)}
                          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-200 text-xs font-instrument select-none hover:scale-[1.03]"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            borderColor: `${relTech.accentColor}40`,
                            color: '#e2e8f0',
                          }}
                        >
                          <TechIcon
                            techId={relTech.id}
                            size={14}
                            color={relTech.accentColor}
                          />
                          <span className="group-hover:text-cyan-300 transition-colors font-medium">
                            {relTech.name}
                          </span>
                          <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-300 transition-colors" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action CTA Button */}
            <div className="pt-2">
              <a
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2 font-syne font-semibold text-xs text-white transition-all duration-200 hover:brightness-110 shadow-lg"
                style={{
                  backgroundColor: `${selectedTech.accentColor}25`,
                  borderColor: `${selectedTech.accentColor}60`,
                  boxShadow: `0 4px 18px ${selectedTech.glowColor}`,
                }}
              >
                <span>Explore {selectedTech.name} Docs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* 2. FULL STACK DIRECTORY VIEW                                  */}
        {/* ============================================================= */}
        {isFullStackView && (
          <div>
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="font-ibm text-xs text-[#3ec6ff] tracking-wide uppercase block mb-1">
                  FULL TECHNICAL DIRECTORY
                </span>
                <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  INTEGRATED ECOSYSTEM
                </h3>
              </div>

              <button
                onClick={onClose}
                aria-label="Close directory"
                className="p-2 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all focus:outline-none focus:ring-1 focus:ring-cyan-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-slate-300 font-instrument">
              Select any technology below to explore its specific implementation, purpose, and role in my projects.
            </p>

            <div className="mt-5 space-y-5">
              {Object.entries(TECH_BY_CATEGORY).map(([catKey, catData]) => (
                <div key={catKey} className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3ec6ff]" />
                    <span className="font-syne text-xs font-bold tracking-wider uppercase text-slate-200">
                      {catData.label}
                    </span>
                    <div className="h-[1px] flex-1 bg-white/5" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {catData.items.map((tech) => (
                      <div
                        key={tech.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelectTech(tech)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelectTech(tech);
                          }
                        }}
                        className="group p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-200 cursor-pointer flex items-center justify-between"
                        style={{
                          borderColor: `${tech.accentColor}35`,
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: `${tech.accentColor}15`,
                              borderColor: `${tech.accentColor}40`,
                            }}
                          >
                            <TechIcon techId={tech.id} size={18} color={tech.accentColor} />
                          </div>

                          <div>
                            <span className="font-syne font-bold text-sm text-white block group-hover:text-cyan-300 transition-colors">
                              {tech.name}
                            </span>
                            <span className="font-instrument text-[11px] text-slate-400 block">
                              {tech.categoryLabel}
                            </span>
                          </div>
                        </div>

                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-300 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
