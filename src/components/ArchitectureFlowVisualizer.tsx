import React, { useState } from 'react';
import { Database, Cpu, Cloud, Layers, Sparkles, Terminal, Activity, CheckCircle2 } from 'lucide-react';
import type { ArchitectureNode } from '../data/projectsData';

interface ArchitectureFlowVisualizerProps {
  nodes: ArchitectureNode[];
  connections: { from: string; to: string }[];
  accentColor?: string;
}

export const ArchitectureFlowVisualizer: React.FC<ArchitectureFlowVisualizerProps> = ({
  nodes,
  connections,
  accentColor = '#3ec6ff',
}) => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const getNodeIcon = (type: ArchitectureNode['type']) => {
    switch (type) {
      case 'database':
        return <Database className="w-5 h-5 text-blue-400" />;
      case 'ai':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'service':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'source':
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'process':
        return <Terminal className="w-5 h-5 text-amber-400" />;
      case 'output':
        return <Activity className="w-5 h-5 text-teal-400" />;
      default:
        return <Cloud className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="w-full rounded-2xl border border-cyan-500/20 bg-[#060c18]/90 p-5 sm:p-7 relative overflow-hidden shadow-inner">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      
      {/* Header status */}
      <div className="relative z-10 flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-ibm text-xs text-cyan-300 uppercase tracking-wider font-semibold">
            LIVE ARCHITECTURE PIPELINE TELEMETRY
          </span>
        </div>
        <span className="font-ibm text-[11px] text-slate-400">
          HOVER NODES TO INSPECT DATA CONTRACT
        </span>
      </div>

      {/* Nodes Flow Container */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-center">
        {nodes.map((node, index) => {
          const isHovered = activeNodeId === node.id;
          const isNextInLine = index < nodes.length - 1;

          return (
            <div key={node.id} className="relative flex flex-col items-center">
              {/* The Node Card */}
              <div
                onMouseEnter={() => setActiveNodeId(node.id)}
                onMouseLeave={() => setActiveNodeId(null)}
                className={`w-full rounded-xl border p-4 flex flex-col items-center text-center transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_25px_rgba(0,240,255,0.3)] -translate-y-1.5'
                    : 'border-white/10 bg-[#091122]/80 hover:border-cyan-500/40 hover:bg-[#0c162e]'
                }`}
                style={{
                  boxShadow: isHovered ? `0 0 25px ${node.color}50` : undefined,
                }}
              >
                {/* Node Icon Circle */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-2.5 transition-transform duration-300"
                  style={{
                    backgroundColor: `${node.color}15`,
                    borderColor: `${node.color}40`,
                    borderWidth: 1,
                    transform: isHovered ? 'scale(1.15) rotate(4deg)' : 'scale(1)',
                  }}
                >
                  {getNodeIcon(node.type)}
                </div>

                {/* Step badge */}
                <span className="font-ibm text-[10px] text-slate-400 tracking-widest uppercase mb-1">
                  STAGE 0{index + 1}
                </span>

                {/* Node Title */}
                <h4 className="font-instrument font-bold text-sm text-white leading-tight mb-1 line-clamp-1">
                  {node.name}
                </h4>

                {/* Subtext */}
                <span className="font-ibm text-[11px] text-slate-400 line-clamp-1">
                  {node.subtext}
                </span>

                {/* Active Indicator dot */}
                <div className="mt-2 flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: node.color }}
                  />
                  <span className="font-ibm text-[9px] text-slate-400 uppercase">
                    ACTIVE
                  </span>
                </div>
              </div>

              {/* Connecting Arrow between nodes (hidden on mobile grid wrap) */}
              {isNextInLine && (
                <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 items-center justify-center text-cyan-400/60 pointer-events-none">
                  <span className="text-xs font-mono font-bold animate-pulse">→</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Animated SVG Circuit Packet Tracker below nodes */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/5">
        <svg
          className="w-full h-8 overflow-visible"
          viewBox="0 0 800 30"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Base pipeline track */}
          <path
            d="M 10 15 L 790 15"
            stroke="rgba(0, 240, 255, 0.15)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Traveling Data Packet 1 */}
          <circle r="4" fill="#3ec6ff" className="filter drop-shadow-[0_0_8px_#3ec6ff]">
            <animateMotion
              path="M 10 15 L 790 15"
              dur="4s"
              repeatCount="indefinite"
              calcMode="linear"
            />
          </circle>

          {/* Traveling Data Packet 2 */}
          <circle r="3" fill="#a855f7" className="filter drop-shadow-[0_0_8px_#a855f7]">
            <animateMotion
              path="M 10 15 L 790 15"
              dur="4s"
              begin="2s"
              repeatCount="indefinite"
              calcMode="linear"
            />
          </circle>

          {/* Traveling Data Packet 3 */}
          <circle r="3.5" fill="#10b981" className="filter drop-shadow-[0_0_8px_#10b981]">
            <animateMotion
              path="M 10 15 L 790 15"
              dur="3s"
              begin="1s"
              repeatCount="indefinite"
              calcMode="linear"
            />
          </circle>
        </svg>

        {/* Selected Node Inspector Detail Banner */}
        {activeNodeId ? (
          (() => {
            const activeNode = nodes.find((n) => n.id === activeNodeId);
            if (!activeNode) return null;
            return (
              <div className="mt-2 p-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-sm flex items-center justify-between gap-3 text-xs font-ibm text-slate-300 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-white">{activeNode.name}:</span>
                  <span>{activeNode.subtext}</span>
                </div>
                <span className="text-cyan-400 font-mono">LATENCY: &lt;12ms • ZERO LOSS</span>
              </div>
            );
          })()
        ) : (
          <div className="mt-2 text-center text-slate-500 font-ibm text-xs">
            Packet stream active • Zero pipeline dropouts • Continuous asynchronous message routing
          </div>
        )}
      </div>
    </div>
  );
};
