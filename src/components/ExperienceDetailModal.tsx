import React, { useEffect, useState } from 'react';
import { X, Sparkles, CheckCircle2, ChevronRight, Layers, Award, Calendar, Lightbulb, ExternalLink } from 'lucide-react';
import { TechIcon } from './TechLogos';
import { AdaniSecurityOpsVisualizer } from './AdaniSecurityOpsVisualizer';
import { JicEcosystemVisualizer } from './JicEcosystemVisualizer';
import { TechSakshamAiVisualizer } from './TechSakshamAiVisualizer';
import { CodeAlphaCppVisualizer } from './CodeAlphaCppVisualizer';
import type { ExperienceItem, ExperienceTechChip } from '../data/experienceData';

interface ExperienceDetailModalProps {
  experience: ExperienceItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({
  experience,
  isOpen,
  onClose,
}) => {
  const [selectedTech, setSelectedTech] = useState<ExperienceTechChip | null>(null);

  // Reset selected tech on open
  useEffect(() => {
    if (isOpen && experience) {
      setSelectedTech(experience.technologies[0] || null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, experience]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !experience) return null;

  return (
    <div className="fixed inset-0 z-[110] flex flex-col justify-end select-none animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-xl transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Cinematic Fullscreen Panel (85-95% viewport height) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="experience-modal-title"
        className="relative z-10 w-full max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl border-t border-x border-cyan-500/30 bg-[#050a14] shadow-[0_-25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(0,240,255,0.15)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300"
      >
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Header */}
        <div className="px-6 sm:px-10 py-5 bg-[#070e1c] border-b border-white/10 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-4">
            <span className="font-display font-black text-2xl sm:text-3xl text-cyan-400">
              {experience.number}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-ibm text-xs text-cyan-300 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                  {experience.classification}
                </span>
                <span className="font-ibm text-[13.5px] sm:text-[14px] text-slate-300 font-medium">
                  {experience.date}
                </span>
              </div>
              <h2
                id="experience-modal-title"
                className="font-display font-black text-xl sm:text-3xl text-white tracking-wide mt-1"
              >
                {experience.role} <span className="text-cyan-400/90">• {experience.company}</span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            data-cursor="CLOSE"
            aria-label="Close experience details"
            className="p-2 rounded-xl border border-white/15 bg-white/5 text-slate-400 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar flex-1 space-y-10 font-instrument">
          {/* 1. Overview Narrative */}
          <div className="p-5 sm:p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/20 via-[#070e1c] to-purple-950/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-ibm text-[11px] text-cyan-400 uppercase tracking-widest block">
                ENGINEERING OVERVIEW
              </span>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-medium">
                {experience.overview}
              </p>
            </div>
          </div>

          {/* 2. Interactive Visualizer Component Specific to Experience */}
          <div>
            {experience.visualizerType === 'adani_secops' && <AdaniSecurityOpsVisualizer />}
            {experience.visualizerType === 'jic_ecosystem' && <JicEcosystemVisualizer />}
            {experience.visualizerType === 'techsaksham_ai' && <TechSakshamAiVisualizer />}
            {experience.visualizerType === 'codealpha_cpp' && experience.codeModules && (
              <CodeAlphaCppVisualizer modules={experience.codeModules} />
            )}
            {experience.visualizerType === 'systems_lifecycle' && (
              <div className="p-6 rounded-2xl border border-cyan-500/30 bg-[#070e1c] space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-ibm text-xs text-cyan-400 font-bold uppercase tracking-wider">
                    SYSTEMS ENGINEERING LIFECYCLE
                  </span>
                  <span className="font-ibm text-xs text-emerald-400">
                    4 SYSTEMS DEPLOYED ONLINE
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center font-ibm text-xs">
                  <div className="p-4 bg-[#0a1224] rounded-xl border border-white/10">
                    <span className="text-cyan-400 block text-[10px]">STAGE 01</span>
                    <span className="font-bold text-white mt-1 block">Research &amp; Specs</span>
                  </div>
                  <div className="p-4 bg-[#0a1224] rounded-xl border border-white/10">
                    <span className="text-cyan-400 block text-[10px]">STAGE 02</span>
                    <span className="font-bold text-white mt-1 block">ETL &amp; Vector Stores</span>
                  </div>
                  <div className="p-4 bg-[#0a1224] rounded-xl border border-white/10">
                    <span className="text-cyan-400 block text-[10px]">STAGE 03</span>
                    <span className="font-bold text-white mt-1 block">FastAPI &amp; Inference</span>
                  </div>
                  <div className="p-4 bg-[#0a1224] rounded-xl border border-white/10">
                    <span className="text-cyan-400 block text-[10px]">STAGE 04</span>
                    <span className="font-bold text-white mt-1 block">GCP Cloud Production</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Responsibilities & Contributions (Interactive Animated Rows) */}
          <div className="space-y-4">
            <h4 className="font-ibm text-xs text-cyan-400 uppercase tracking-widest">
              CORE CONTRIBUTIONS &amp; TECHNICAL WORK
            </h4>

            <div className="space-y-3">
              {experience.responsibilities.map((resp, idx) => (
                <div
                  key={idx}
                  className="group p-4 sm:p-5 rounded-xl border border-white/10 bg-[#070e1c] hover:border-cyan-400/60 hover:bg-[#091326] transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-default"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <h5 className="font-display font-bold text-base text-white group-hover:text-cyan-200 transition-colors">
                        {resp.title}
                      </h5>
                    </div>
                    <p className="text-sm text-slate-300 pl-6 leading-relaxed">
                      {resp.description}
                    </p>
                  </div>

                  <span className="font-ibm text-[10px] text-cyan-400/80 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 whitespace-nowrap self-start sm:self-center">
                    {resp.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Technologies & Tools Grid with Live Application Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-ibm text-xs text-cyan-400 uppercase tracking-widest">
                TECHNOLOGY ECOSYSTEM &amp; TOOLING
              </h4>
              <span className="font-ibm text-[11px] text-slate-500">
                CLICK CHIP TO INSPECT APPLIED USE
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {experience.technologies.map((tech) => {
                const isSelected = selectedTech?.id === tech.id;
                return (
                  <button
                    key={tech.id}
                    onClick={() => setSelectedTech(tech)}
                    className={`p-3 rounded-xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/50 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                        : 'border-white/10 bg-[#081224] hover:border-cyan-500/40 hover:bg-[#09152b]'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0a1224] border border-white/10 flex items-center justify-center mb-1.5">
                      <TechIcon techId={tech.id} size={16} />
                    </div>
                    <span className="font-ibm text-xs text-white font-semibold capitalize">
                      {tech.name}
                    </span>
                    <span className="font-ibm text-[9px] text-slate-400 line-clamp-1">
                      {tech.category}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedTech && (
              <div className="p-4 rounded-xl border border-cyan-500/30 bg-[#08142b] flex items-center gap-3 text-sm animate-in fade-in duration-200">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center flex-shrink-0">
                  <TechIcon techId={selectedTech.id} size={18} />
                </div>
                <div>
                  <span className="font-ibm text-xs text-cyan-300 font-bold uppercase mr-2">
                    {selectedTech.name} Application:
                  </span>
                  <span className="text-slate-200">{selectedTech.application}</span>
                </div>
              </div>
            )}
          </div>

          {/* 5. Key Learnings & Engineering Takeaways */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="font-ibm text-xs text-cyan-400 uppercase tracking-widest">
              KEY TECHNICAL LEARNINGS &amp; TAKEAWAYS
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {experience.keyLearnings.map((learning, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-white/10 bg-[#070e1c] space-y-2 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 text-cyan-400 font-ibm text-xs">
                    <Lightbulb className="w-4 h-4 text-cyan-400" />
                    <span>TAKEAWAY 0{i + 1}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-instrument">
                    {learning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-10 py-3.5 bg-[#070e1c] border-t border-white/10 flex items-center justify-between text-xs font-ibm text-slate-500 flex-shrink-0">
          <span>PRESS [ESC] OR CLICK OUTSIDE TO CLOSE</span>
          <span className="text-cyan-400/80">
            {experience.role.toUpperCase()} // {experience.company.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};
