const fs = require('fs');
let termData = fs.readFileSync('src/components/ExperienceTerminal.tsx', 'utf8');
termData = termData.replace(/\$\{exp\.year\}/g, "");
termData = termData.replace(/\$\{exp\.period\}/g, "");
fs.writeFileSync('src/components/ExperienceTerminal.tsx', termData, 'utf8');

let timeData = fs.readFileSync('src/components/ExperienceTimeline.tsx', 'utf8');
timeData = timeData.replace(/\{exp\.year\}/g, "{exp.date}");
timeData = timeData.replace(/\{exp\.period\}/g, "{exp.date}");
fs.writeFileSync('src/components/ExperienceTimeline.tsx', timeData, 'utf8');
