export interface Experience {
  id: string;
  year: string;
  role: string;
  company: string;
  points: string[];
}

export const experiences: Experience[] = [
  {
    id: 'adani',
    year: '2026',
    role: 'CYBERSECURITY INTERN',
    company: 'Adani Enterprises',
    points: [
      'Security automation',
      'Power BI dashboards',
      'Azure',
      'PAM / DLP / IAM',
      'Security monitoring'
    ]
  },
  {
    id: 'jic',
    year: '2025',
    role: 'JIC CORE TEAM',
    company: 'JECRC Incubation Centre',
    points: [
      'Technology / startup ecosystem',
      'Social media & technical activities'
    ]
  }
];
