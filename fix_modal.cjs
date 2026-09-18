const fs = require('fs');
let data = fs.readFileSync('src/components/ExperienceDetailModal.tsx', 'utf8');

data = data.replace(/{experience\.period}/g, "{experience.date}");
data = data.replace(/{experience\.year}/g, "{experience.date}");

fs.writeFileSync('src/components/ExperienceDetailModal.tsx', data, 'utf8');
