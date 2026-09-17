export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date?: string;
  description?: string;
}

export const achievements: Achievement[] = [
  {
    id: 'sih-2025',
    title: 'Smart India Hackathon 2025',
    organization: 'Govt. of India',
  },
  {
    id: 'gcp-foundations',
    title: 'Google Cloud Computing Foundations',
    organization: 'Google Cloud',
  },
  {
    id: 'gcp-genai',
    title: 'Google Cloud / GenAI Skill Badges',
    organization: 'Google Cloud',
  },
  {
    id: 'techsaksham',
    title: 'TechSaksham AI Program',
    organization: 'TechSaksham',
  },
  {
    id: 'ecell-iitb',
    title: 'Illuminate Entrepreneurship Bootcamp',
    organization: 'E-Cell IIT Bombay',
  }
];
