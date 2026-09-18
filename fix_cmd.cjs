const fs = require('fs');
let data = fs.readFileSync('src/components/ExperienceCommandCenter.tsx', 'utf8');

// Replace Adani's year
data = data.replace(
    /className="exp-year font-sans text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">2026<\/span>/g,
    'className="exp-year font-sans text-[14px] font-semibold tracking-widest text-slate-300 mb-1">{EXPERIENCES_DATA[0].date}</span>'
);

// Replace JIC's year
data = data.replace(
    /className="exp-year font-sans text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">2025<\/span>/g,
    'className="exp-year font-sans text-[14px] font-semibold tracking-widest text-slate-300 mb-1">{EXPERIENCES_DATA[1].date}</span>'
);

// Replace TechSaksham's year
data = data.replace(
    /className="exp-year font-sans text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">.*?<\/span>/, // since this is the only one left and it has garbled chars like 2024?"25, we just match the tag content
    'className="exp-year font-sans text-[14px] font-semibold tracking-widest text-slate-300 mb-1">{EXPERIENCES_DATA[2].date}</span>'
);

fs.writeFileSync('src/components/ExperienceCommandCenter.tsx', data, 'utf8');
