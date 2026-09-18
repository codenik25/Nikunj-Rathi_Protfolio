export interface Experience {
  id: string;
  date: string;
  role: string;
  company: string;
  points: string[];
}

export const experiences: Experience[] = [
  {
    id: 'adani',
    date: 'June 2025 \u2013 August 2025',
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
    date: '2023 \u2013 2024',
    role: 'JIC CORE TEAM',
    company: 'JECRC Incubation Centre',
    points: [
      'Technology / startup ecosystem',
      'Social media & technical activities'
    ]
  },
  {
    id: 'techsaksham',
    date: 'March 2024',
    role: 'AI LEARNING',
    company: 'TechSaksham (Microsoft & SAP CSR)',
    points: [
      'AI & Machine Learning foundations',
      'Hands-on algorithm implementations',
      'Microsoft & SAP industry case studies'
    ]
  }
];

