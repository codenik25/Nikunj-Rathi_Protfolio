import React from 'react';

const sections = [
  { id: 'home', num: '01 / 07', name: 'IDENTITY' },
  { id: 'about', num: '02 / 07', name: 'PROFILE' },
  { id: 'skills', num: '03 / 07', name: 'SKILLS' },
  { id: 'projects', num: '04 / 07', name: 'PROJECTS' },
  { id: 'experience', num: '05 / 07', name: 'EXPERIENCE' },
  { id: 'activity', num: '06 / 07', name: 'ACTIVITY' },
  { id: 'contact', num: '07 / 07', name: 'CONNECT' },
];

export const ScrollIndicator: React.FC<{ activeSection: string; onSelect: (id: string) => void }> = ({
  activeSection,
  onSelect,
}) => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-3.5 select-none pointer-events-auto">
      {sections.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => onSelect(sec.id)}
            className="flex items-center justify-end gap-3.5 text-right group py-1"
          >
            <div className={`flex flex-col items-end transition-all duration-300 ${
              isActive ? 'text-portfolio-accent font-semibold opacity-100 translate-x-0' : 'text-slate-500 opacity-40 group-hover:opacity-100 group-hover:text-slate-300'
            }`}>
              <span className="text-[11px] font-ibm tracking-widest">{sec.num}</span>
              <span className="text-[14.5px] font-instrument font-medium tracking-wide">{sec.name}</span>
            </div>

            <div className={`transition-all duration-300 rounded-full ${
              isActive
                ? 'w-6 h-2 bg-portfolio-accent shadow-[0_0_10px_#00f0ff]'
                : 'w-2 h-2 bg-slate-700 group-hover:w-3.5 group-hover:bg-slate-400'
            }`} />
          </button>
        );
      })}
    </div>
  );
};
