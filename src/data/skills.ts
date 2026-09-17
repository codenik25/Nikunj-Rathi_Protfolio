export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['C++', 'Python', 'JavaScript', 'SQL']
  },
  {
    title: 'Development',
    skills: ['React.js', 'Node.js', 'FastAPI', 'Express.js', 'Django', 'REST APIs']
  },
  {
    title: 'Data & Analytics',
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'Power BI', 'SQL', 'Data Analytics', 'ETL']
  },
  {
    title: 'AI / ML',
    skills: ['Generative AI', 'NLP', 'Machine Learning', 'Vertex AI', 'Whisper']
  },
  {
    title: 'Cloud',
    skills: ['Google Cloud', 'Azure', 'Cloud Storage', 'BigQuery', 'IAM', 'Compute Engine', 'Pub/Sub']
  },
  {
    title: 'Databases',
    skills: ['PostgreSQL', 'MongoDB']
  },
  {
    title: 'Security',
    skills: ['Cybersecurity', 'IAM', 'PAM', 'DLP', 'Network Security', 'Security Automation']
  }
];
