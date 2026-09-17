import React from 'react';
import { ArrowRight } from 'lucide-react';

interface JourneyCardProps {
  onExploreMore?: () => void;
}

export const JourneyCard: React.FC<JourneyCardProps> = ({ onExploreMore }) => {
  return (
    <div
      onClick={onExploreMore}
      className="glass-panel rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-cyan-glow group cursor-pointer bg-[#080c18]"
    >
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/mountain_summit.jpg"
          alt="Explorer on Mountain Ridge"
          className="w-full h-full object-cover object-center opacity-45 group-hover:scale-105 group-hover:opacity-55 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b16] via-[#070b16]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col pt-1 select-none">
        <h3 className="font-display font-black text-xl lg:text-2xl leading-tight tracking-tight text-white flex flex-col">
          <span>BUILD</span>
          <span>LEARN</span>
          <span>IMPROVE</span>
          <span className="text-portfolio-accent text-glow-cyan">REPEAT</span>
        </h3>
      </div>

      {/* Bottom Subtitle & Arrow */}
      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono">
        <span className="text-slate-400 text-[11px] tracking-wider">
          &#47;&#47; JOURNEY_CONTINUES...
        </span>
        <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-portfolio-accent group-hover:bg-portfolio-accent group-hover:text-black group-hover:translate-x-1 transition-all">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
