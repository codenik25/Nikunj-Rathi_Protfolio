import React, { useState } from 'react';
import { Rocket, Cpu, Building2, Calendar, FileText, Share2, Sparkles, CheckCircle2 } from 'lucide-react';

interface EcoNode {
  id: string;
  name: string;
  subtext: string;
  detail: string;
  icon: React.ReactNode;
  color: string;
}

const ECO_NODES: EcoNode[] = [
  {
    id: 'startups',
    name: 'STARTUPS',
    subtext: 'Cohort Prototyping',
    detail: 'Supported student-led startups with MVP roadmapping, tech architecture selection, and product pitch formulation.',
    icon: <Rocket className="w-5 h-5 text-purple-400" />,
    color: '#a855f7',
  },
  {
    id: 'technology',
    name: 'TECHNOLOGY',
    subtext: 'Engineering Advisory',
    detail: 'Advised early-stage teams on scalable backend frameworks, cloud storage solutions, and prototype feasibility.',
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    color: '#3ec6ff',
  },
  {
    id: 'incubation',
    name: 'INCUBATION',
    subtext: 'Incubation Operations',
    detail: 'Facilitated core incubator operations, cohort progress tracking, mentor syncs, and founder collaboration spaces.',
    icon: <Building2 className="w-5 h-5 text-blue-400" />,
    color: '#3b82f6',
  },
  {
    id: 'events',
    name: 'EVENTS',
    subtext: 'Hackathons & Bootcamps',
    detail: 'Organized flagship hackathons, coding bootcamps, and investor pitch sessions engaging over 1,000+ university participants.',
    icon: <Calendar className="w-5 h-5 text-amber-400" />,
    color: '#f59e0b',
  },
  {
    id: 'content',
    name: 'CONTENT',
    subtext: 'Technical Showcases',
    detail: 'Drafted technical founder spotlights, project retrospectives, and event documentation for campus media.',
    icon: <FileText className="w-5 h-5 text-emerald-400" />,
    color: '#10b981',
  },
  {
    id: 'socialmedia',
    name: 'SOCIAL MEDIA',
    subtext: 'Digital Outreach',
    detail: 'Managed digital campaign announcements and live hackathon coverage, building incubator community engagement.',
    icon: <Share2 className="w-5 h-5 text-rose-400" />,
    color: '#f43f5e',
  },
];

export const JicEcosystemVisualizer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('startups');
  const activeNode = ECO_NODES.find((n) => n.id === selectedId) || ECO_NODES[0];

  return (
    <div className="w-full rounded-2xl border border-cyan-500/25 bg-[#060c18] p-5 sm:p-7 relative overflow-hidden shadow-2xl select-none">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span className="font-ibm text-xs text-white font-bold tracking-wider uppercase">
            JECRC INCUBATION CENTRE // ECOSYSTEM ARCHITECTURE
          </span>
        </div>
        <span className="font-ibm text-[11px] text-purple-300">
          STUDENT LEADERSHIP & VENTURE CREATION
        </span>
      </div>

      {/* 6 Interconnected Ecosystem Nodes Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {ECO_NODES.map((node) => {
          const isSelected = selectedId === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedId(node.id)}
              className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'border-purple-400 bg-purple-950/40 shadow-[0_0_20px_rgba(168,85,247,0.3)] -translate-y-1'
                  : 'border-white/10 bg-[#081224] hover:border-purple-400/40 hover:bg-[#0a1730]'
              }`}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-transform"
                style={{
                  backgroundColor: `${node.color}15`,
                  borderColor: `${node.color}35`,
                  borderWidth: 1,
                  transform: isSelected ? 'scale(1.15) rotate(4deg)' : 'scale(1)',
                }}
              >
                {node.icon}
              </div>
              <h5 className="font-display font-bold text-xs text-white">
                {node.name}
              </h5>
              <span className="font-ibm text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                {node.subtext}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Node Details Card */}
      <div className="relative z-10 p-5 rounded-xl border border-purple-500/30 bg-[#0c1328] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-ibm text-xs">
            <span
              className="px-2 py-0.5 rounded font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${activeNode.color}25`,
                color: activeNode.color,
                border: `1px solid ${activeNode.color}50`,
              }}
            >
              {activeNode.name}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-white font-medium">{activeNode.subtext}</span>
          </div>
          <p className="text-sm text-slate-200 font-instrument leading-relaxed">
            {activeNode.detail}
          </p>
        </div>

        <div className="flex items-center gap-2 font-ibm text-xs text-purple-300 flex-shrink-0">
          <CheckCircle2 className="w-4 h-4" />
          <span>JIC CORE TEAM VERIFIED</span>
        </div>
      </div>
    </div>
  );
};
