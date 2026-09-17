import React, { useState } from 'react';
import { achievements } from '../data/achievements';
import { motion, AnimatePresence } from 'framer-motion';

interface SelectedMilestonesProps {
  onOpenMilestone: (id: string) => void;
}

export const SelectedMilestones: React.FC<SelectedMilestonesProps> = ({ onOpenMilestone }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Map the raw achievements to adding an index
  const items = achievements.map((ach, index) => ({
    ...ach,
    numberStr: (index + 1).toString().padStart(2, '0')
  }));

  return (
    <div className="py-12 relative z-10">
      <h3 className="font-sans text-sm font-bold text-slate-400 tracking-widest uppercase mb-12">
        Selected Milestones
      </h3>

      <div className="flex flex-col border-t border-white/10">
        {items.map((item) => {
          const isHovered = hoveredId === item.id;
          const isOtherHovered = hoveredId !== null && hoveredId !== item.id;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onOpenMilestone(item.id)}
              className={`group relative flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 py-6 md:py-8 cursor-pointer transition-all duration-500 ease-out ${
                isOtherHovered ? 'opacity-30' : 'opacity-100'
              }`}
            >
              {/* Background gradient on hover */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent transition-opacity duration-500 pointer-events-none ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`} 
              />

              {/* Left Side: Number + Title */}
              <div className="flex items-start md:items-center gap-6 md:gap-12 relative z-10">
                <span 
                  className={`font-display transition-all duration-500 ease-out ${
                    isHovered 
                      ? 'text-4xl md:text-5xl text-white font-bold translate-x-2 md:translate-x-4' 
                      : 'text-lg md:text-2xl text-slate-500 font-semibold'
                  }`}
                >
                  {item.numberStr}
                </span>

                {/* Optional thin connection line when hovered */}
                <div 
                  className={`hidden md:block h-[1px] bg-white/20 transition-all duration-500 ease-out origin-left ${
                    isHovered ? 'w-12 opacity-100 scale-x-100' : 'w-0 opacity-0 scale-x-0'
                  }`}
                />

                <div className={`transition-transform duration-500 ease-out ${isHovered ? 'md:translate-x-4' : ''}`}>
                  <h4 className="font-display font-bold text-xl md:text-3xl text-white tracking-wide mb-1 md:mb-2">
                    {item.title}
                  </h4>
                  <span className="font-sans text-sm md:text-base text-slate-400">
                    {item.organization} {item.date ? `• ${item.date}` : ''}
                  </span>
                </div>
              </div>

              {/* Right Side: Preview Panel (Only on desktop) */}
              <div className="hidden md:flex items-center mt-4 md:mt-0 relative z-10 w-[240px] justify-end">
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-24 bg-[#0a0f1a] border border-white/10 rounded-lg overflow-hidden flex items-center justify-center pointer-events-none shadow-2xl"
                    >
                      {/* Abstract graphics placeholder for preview */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-portfolio-secondary/10 opacity-50" />
                      <div className="w-full h-full relative">
                         <div className="absolute top-2 left-2 w-8 h-8 rounded-full border border-white/20" />
                         <div className="absolute bottom-2 right-2 w-12 h-px bg-white/30 transform -rotate-45" />
                      </div>
                      <span className="relative z-10 font-sans font-medium uppercase text-xs tracking-widest text-white/50">PREVIEW</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <span className={`font-sans text-xs font-medium uppercase tracking-widest transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100 text-slate-500'}`}>
                  EXPLORE →
                </span>
              </div>
              
              {/* Mobile Explore Label */}
              <div className="md:hidden mt-4 text-right">
                <span className="font-sans text-xs font-medium uppercase tracking-widest text-slate-500 group-hover:text-cyan-400 transition-colors">
                  EXPLORE →
                </span>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
