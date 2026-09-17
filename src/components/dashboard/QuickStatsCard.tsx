import React from 'react';
import { Compass, Code, FolderGit2, Briefcase, GraduationCap } from 'lucide-react';
import { profileData } from '../../data/profile';

export const QuickStatsCard: React.FC<{ onStatClick?: (stat: string) => void }> = ({ onStatClick }) => {
  const stats = [
    {
      icon: Code,
      value: `${profileData.stats.leetcode}`,
      label: 'LeetCode Problems',
      color: 'text-portfolio-accent',
      id: 'leetcode'
    },
    {
      icon: FolderGit2,
      value: `${profileData.stats.projects}`,
      label: 'Major Projects',
      color: 'text-purple-400',
      id: 'projects'
    },
    {
      icon: Briefcase,
      value: profileData.stats.internships.padStart(2, '0'),
      label: 'Industry Internship',
      color: 'text-emerald-400',
      id: 'internship'
    },
    {
      icon: GraduationCap,
      value: `${profileData.stats.graduation}`,
      label: 'Graduation',
      color: 'text-slate-100',
      id: 'graduation'
    },
  ];

  return (
    <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between border border-cyan-500/20 hover:border-cyan-500/35 transition-all duration-300 shadow-cyan-glow bg-[#090e1cf0]">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-white/5">
        <div className="p-1 rounded-md bg-cyan-500/10 text-portfolio-accent">
          <Compass className="w-3.5 h-3.5" />
        </div>
        <span className="font-mono text-xs font-semibold tracking-wider text-slate-200">
          Quick Stats
        </span>
      </div>

      {/* 4 Stat Tiles */}
      <div className="grid grid-cols-4 gap-2 pt-3">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div
              key={i}
              onClick={() => onStatClick && onStatClick(st.id)}
              className="flex flex-col gap-1 p-2 rounded-xl hover:bg-white/5 transition-all duration-200 group cursor-pointer"
            >
              <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-portfolio-accent transition-colors mb-0.5" />
              <span className={`font-display font-bold text-2xl lg:text-3xl tracking-tight ${st.color} group-hover:scale-105 transition-transform origin-left`}>
                {st.value}
              </span>
              <span className="font-mono text-[10px] text-slate-400/90 leading-tight">
                {st.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
