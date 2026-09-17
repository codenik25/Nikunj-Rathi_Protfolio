import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, FileLock, Cloud, BarChart3, Activity, Zap, CheckCircle2 } from 'lucide-react';

interface SecNode {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const SEC_NODES: SecNode[] = [
  {
    id: 'pam',
    name: 'PAM',
    category: 'Privileged Access Management',
    description: 'Enforces just-in-time privilege elevation, automated credential rotation, and session monitoring to stop credential theft.',
    icon: <Key className="w-5 h-5 text-amber-400" />,
    color: '#f59e0b',
  },
  {
    id: 'dlp',
    name: 'DLP',
    category: 'Data Loss Prevention',
    description: 'Monitors endpoint, network, and cloud channels with pattern matching to detect and block unauthorized data exfiltration.',
    icon: <FileLock className="w-5 h-5 text-cyan-400" />,
    color: '#3ec6ff',
  },
  {
    id: 'iam',
    name: 'IAM',
    category: 'Identity & Access Management',
    description: 'Centralized directory federation, multi-factor authentication (MFA), and least-privilege role-based access control (RBAC).',
    icon: <Lock className="w-5 h-5 text-blue-400" />,
    color: '#3b82f6',
  },
  {
    id: 'azure',
    name: 'AZURE',
    category: 'Cloud Infrastructure Governance',
    description: 'Multi-tenant cloud policy enforcement, network security groups, and automated resource compliance posture.',
    icon: <Cloud className="w-5 h-5 text-sky-400" />,
    color: '#0ea5e9',
  },
  {
    id: 'powerbi',
    name: 'POWER BI',
    category: 'Executive Security Analytics',
    description: 'Interactive DAX-modeled executive dashboards transforming raw SIEM audit logs into actionable risk scores and SLA metrics.',
    icon: <BarChart3 className="w-5 h-5 text-yellow-400" />,
    color: '#eab308',
  },
  {
    id: 'automation',
    name: 'SECURITY AUTOMATION',
    category: 'Automated Response & Triage',
    description: 'Automated policy violation triage, audit evidence aggregation, and instant webhook alert dispatch for anomalies.',
    icon: <Zap className="w-5 h-5 text-emerald-400" />,
    color: '#10b981',
  },
];

const PIPELINE_STAGES = [
  { id: 'auto', label: 'AUTOMATION', sub: 'Event Triggers' },
  { id: 'data', label: 'SECURITY DATA', sub: 'SIEM & Audit Logs' },
  { id: 'analytics', label: 'ANALYTICS', sub: 'Anomaly Engine' },
  { id: 'powerbi', label: 'POWER BI', sub: 'Telemetry Dashboards' },
  { id: 'monitoring', label: 'MONITORING', sub: 'Active Defense' },
];

export const AdaniSecurityOpsVisualizer: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('pam');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const activeNode = SEC_NODES.find((n) => n.id === selectedNodeId) || SEC_NODES[0];

  return (
    <div className="w-full rounded-2xl border border-cyan-500/25 bg-[#060c18] p-5 sm:p-7 relative overflow-hidden shadow-2xl select-none">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span className="font-ibm text-xs text-white font-bold tracking-wider uppercase">
            ADANI SECURITY OPERATIONS TELEMETRY PIPELINE
          </span>
        </div>
        <span className="font-ibm text-[11px] text-cyan-400/80">
          ZERO TRUST GOVERNANCE ARCHITECTURE
        </span>
      </div>

      {/* 1. The 5-Stage Animated SecOps Data Pipeline */}
      <div className="relative z-10 mb-8 p-4 rounded-xl border border-white/10 bg-[#081224]/80">
        <span className="font-ibm text-[10px] text-slate-400 tracking-widest uppercase block mb-3">
          CONTINUOUS SECURITY DATA FLOW
        </span>

        {/* Stages Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 items-center">
          {PIPELINE_STAGES.map((stage, idx) => (
            <div
              key={stage.id}
              className="relative p-3 rounded-lg border border-cyan-500/20 bg-[#0c1833] text-center flex flex-col items-center justify-center shadow-sm"
            >
              <span className="font-ibm text-[9px] text-cyan-400 tracking-wider">
                STAGE 0{idx + 1}
              </span>
              <h5 className="font-display font-bold text-xs sm:text-sm text-white mt-0.5">
                {stage.label}
              </h5>
              <span className="font-ibm text-[10px] text-slate-400">
                {stage.sub}
              </span>

              {/* Connecting arrow */}
              {idx < PIPELINE_STAGES.length - 1 && (
                <span className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-cyan-400/70 font-mono text-xs z-20">
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Animated Flowing SVG Packet Track */}
        <div className="relative mt-4">
          <svg className="w-full h-5 overflow-visible" viewBox="0 0 700 20" fill="none">
            <path
              d="M 10 10 L 690 10"
              stroke="rgba(0, 240, 255, 0.2)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Packet 1 */}
            <circle r="3.5" fill="#3ec6ff" className="drop-shadow-[0_0_6px_#3ec6ff]">
              <animateMotion
                path="M 10 10 L 690 10"
                dur="3.5s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </circle>
            {/* Packet 2 */}
            <circle r="3" fill="#10b981" className="drop-shadow-[0_0_6px_#10b981]">
              <animateMotion
                path="M 10 10 L 690 10"
                dur="3.5s"
                begin="1.8s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </circle>
          </svg>
        </div>
      </div>

      {/* 2. The 6 Interactive Security Nodes */}
      <div className="relative z-10 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-ibm text-xs text-slate-300 font-semibold uppercase tracking-wider">
            SECURITY CAPABILITY ENCLAVES
          </span>
          <span className="font-ibm text-[10px] text-slate-500">
            CLICK NODE TO INSPECT CONTROLS
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {SEC_NODES.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;

            return (
              <button
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                className={`p-3 rounded-xl border flex flex-col items-center text-center transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/50 shadow-[0_0_20px_rgba(0,240,255,0.3)] -translate-y-1'
                    : isHovered
                    ? 'border-cyan-500/40 bg-[#09152b]'
                    : 'border-white/10 bg-[#081224] hover:border-white/20'
                }`}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-1.5 transition-transform"
                  style={{
                    backgroundColor: `${node.color}15`,
                    borderColor: `${node.color}35`,
                    borderWidth: 1,
                    transform: isSelected || isHovered ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {node.icon}
                </div>
                <span className="font-display font-black text-xs text-white">
                  {node.name}
                </span>
                <span className="font-ibm text-[9px] text-slate-400 line-clamp-1 mt-0.5">
                  {node.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Selected Node Deep-Dive Card */}
      <div className="relative z-10 p-4 rounded-xl border border-cyan-500/30 bg-[#08152e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
        <div className="space-y-1">
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
            <span className="text-white font-medium">{activeNode.category}</span>
          </div>
          <p className="text-sm text-slate-300 font-instrument leading-relaxed">
            {activeNode.description}
          </p>
        </div>

        <div className="flex items-center gap-2 font-ibm text-xs text-emerald-400 flex-shrink-0">
          <CheckCircle2 className="w-4 h-4" />
          <span>PRODUCTION VERIFIED</span>
        </div>
      </div>
    </div>
  );
};
