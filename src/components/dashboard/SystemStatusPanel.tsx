import React from 'react';
import { Activity, ChevronRight } from 'lucide-react';

export const SystemStatusPanel: React.FC<{ onDetails?: () => void }> = ({ onDetails }) => {
  const statuses = [
    { label: 'Code', state: 'Online', dotColor: 'bg-emerald-400' },
    { label: 'Ideas', state: 'Flowing', dotColor: 'bg-emerald-400' },
    { label: 'Learning', state: 'Always', dotColor: 'bg-emerald-400' },
    { label: 'Caffeine', state: 'Required', dotColor: 'bg-emerald-400' },
  ];

  return (
    <div
      id="system-status-panel"
      onClick={onDetails}
      className="glass-panel rounded-2xl p-4 w-64 border border-cyan-500/20 shadow-cyan-glow hover:border-cyan-500/40 transition-all duration-300 cursor-pointer group backdrop-blur-xl bg-[#090e1cd0]"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-cyan-500/10 text-portfolio-accent">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <span className="font-mono text-xs font-semibold tracking-wider text-slate-200">
            System Status
          </span>
        </div>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-portfolio-accent group-hover:translate-x-0.5 transition-all" />
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-2 font-mono text-[11px]">
        {statuses.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-0.5">
            <span className="text-slate-400 group-hover:text-slate-300 transition-colors">
              {item.label}
            </span>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor} shadow-[0_0_6px_#10b981] animate-pulse`} />
              <span className="text-emerald-400 font-medium tracking-wide">
                {item.state}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
