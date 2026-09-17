import React from 'react';
import { History } from 'lucide-react';

export const RecentActivityCard: React.FC = () => {
  const activities = [
    {
      title: 'Working on new AI project',
      time: '2 days ago',
      active: true
    },
    {
      title: 'Completed a LeetCode problem',
      time: '3 days ago',
      active: false
    },
    {
      title: 'Updated portfolio website',
      time: '1 week ago',
      active: false
    },
    {
      title: 'Exploring Google Cloud',
      time: '1 week ago',
      active: false
    },
  ];

  return (
    <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between border border-cyan-500/20 hover:border-cyan-500/35 transition-all duration-300 shadow-cyan-glow bg-[#090e1cf0]">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-white/5">
        <div className="p-1 rounded-md bg-cyan-500/10 text-portfolio-accent">
          <History className="w-3.5 h-3.5" />
        </div>
        <span className="font-mono text-xs font-semibold tracking-wider text-slate-200">
          Recent Activity
        </span>
      </div>

      {/* 2x2 Grid or 4 Items */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3">
        {activities.map((act, i) => (
          <div key={i} className="flex items-start gap-2.5 group">
            <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
              act.active ? 'bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse' : 'bg-slate-600'
            }`} />
            <div className="flex flex-col">
              <span className="font-sans text-xs text-slate-200 group-hover:text-portfolio-accent transition-colors leading-tight">
                {act.title}
              </span>
              <span className="font-mono text-[10px] text-slate-500 mt-0.5">
                {act.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
