import React, { useState } from 'react';
import { Terminal, Copy, Check, Code2, BookOpen, Lightbulb, CheckCircle2 } from 'lucide-react';
import type { CppCodeModule } from '../data/experienceData';

interface CodeAlphaCppVisualizerProps {
  modules: CppCodeModule[];
}

export const CodeAlphaCppVisualizer: React.FC<CodeAlphaCppVisualizerProps> = ({ modules }) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(modules[0]?.id || 'cgpa');
  const [copied, setCopied] = useState(false);

  const activeModule = modules.find((m) => m.id === selectedModuleId) || modules[0];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-cyan-500/25 bg-[#060c18] p-5 sm:p-7 relative overflow-hidden shadow-2xl select-none">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <span className="font-ibm text-xs text-white font-bold tracking-wider uppercase">
            CODEALPHA // C++ PROGRAMMING VIRTUAL INTERNSHIP LAB
          </span>
        </div>
        <span className="font-ibm text-[11px] text-cyan-400/80">
          3 PRODUCTION ALGORITHM MODULES
        </span>
      </div>

      {/* 3 Interactive Code Module Selector Tabs */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {modules.map((m) => {
          const isSelected = selectedModuleId === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedModuleId(m.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_20px_rgba(0,240,255,0.25)] -translate-y-1'
                  : 'border-white/10 bg-[#081224] hover:border-cyan-500/40 hover:bg-[#0a1730]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-ibm text-[10px] text-cyan-400 uppercase tracking-widest">
                    MODULE
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 font-mono text-[9px] text-cyan-300">
                    C++ STL
                  </span>
                </div>
                <h5 className="font-display font-bold text-sm text-white leading-tight">
                  {m.title}
                </h5>
                <span className="font-ibm text-[11px] text-slate-400 line-clamp-1 mt-1">
                  {m.concept}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Code Editor Window with Syntax Code */}
      <div className="relative z-10 rounded-2xl border border-white/10 bg-[#070e1c] overflow-hidden shadow-2xl mb-6">
        <div className="px-4 py-2.5 bg-[#091326] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span className="font-ibm text-xs text-white font-mono">
              {activeModule.id}.cpp
            </span>
            <span className="text-slate-500 text-xs">•</span>
            <span className="font-ibm text-[11px] text-cyan-400">
              {activeModule.concept}
            </span>
          </div>

          <button
            onClick={() => handleCopy(activeModule.code)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400/40 text-xs font-mono transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-[11px]">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px]">COPY CODE</span>
              </>
            )}
          </button>
        </div>

        {/* Code View */}
        <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-cyan-200 leading-relaxed custom-scrollbar bg-[#050912]">
          <code>{activeModule.code}</code>
        </pre>
      </div>

      {/* Concept Breakdown & Takeaways */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-4 rounded-xl border border-cyan-500/20 bg-[#08152e] space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-400 font-ibm text-xs">
            <BookOpen className="w-4 h-4" />
            <span>ALGORITHMIC CONCEPT INVOLVED</span>
          </div>
          <p className="text-sm text-slate-300 font-instrument leading-relaxed">
            {activeModule.concept}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-400 font-ibm text-xs">
            <Lightbulb className="w-4 h-4" />
            <span>WHAT WAS LEARNED</span>
          </div>
          <p className="text-sm text-slate-300 font-instrument leading-relaxed">
            {activeModule.learned}
          </p>
        </div>
      </div>
    </div>
  );
};
