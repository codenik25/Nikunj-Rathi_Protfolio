export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  status: string;
  githubUrl?: string;
  demoUrl?: string;
  objective?: string;
  architecture?: string;
  keyFeatures?: string[];
  dataPipeline?: string;
  result?: string;
}

export const projects: Project[] = [
  {
    id: 'pricepulse-ai',
    number: '01',
    title: 'PricePulse-AI',
    category: 'DATA ANALYTICS / ETL / E-COMMERCE',
    description: 'E-commerce price analytics platform that processes product, pricing, discount, rating, inventory, and store-level data through an ETL pipeline and visualizes insights through Power BI dashboards.',
    techStack: ['Python', 'PostgreSQL', 'ETL', 'Power BI', 'SQL', 'Data Analytics'],
    status: 'COMPLETED',
    githubUrl: '#',
    objective: 'To provide actionable insights into e-commerce pricing dynamics.',
    architecture: 'Data ingestion from APIs -> Python ETL -> PostgreSQL -> Power BI Visualization',
    keyFeatures: ['Real-time price tracking', 'Competitor analysis', 'Discount optimization'],
    dataPipeline: 'Automated daily scraping and cleaning scripts feeding into a normalized relational schema.',
    result: 'Improved pricing strategy visibility for stakeholders.'
  },
  {
    id: 'trendtales',
    number: '02',
    title: 'TrendTales',
    category: 'GENERATIVE AI / CLOUD',
    description: 'AI-powered storytelling and trend engine designed to transform artisan products and trends into AI-generated stories, audio, and short-form content.',
    techStack: ['Python', 'FastAPI', 'Vertex AI', 'Google Cloud', 'Whisper', 'Text-to-Speech', 'Generative AI'],
    status: 'ACTIVE',
    githubUrl: '#',
    objective: 'Empower artisans to reach wider audiences through automated, high-quality storytelling.',
    architecture: 'User input -> FastAPI -> Vertex AI text generation -> GCP TTS -> Media output',
    keyFeatures: ['Automated story generation', 'High-quality audio narration', 'Trend analysis integration'],
    result: 'Reduced content creation time by 80%.'
  },
  {
    id: 'hackaholics',
    number: '03',
    title: 'Hackaholics',
    category: 'AI / RECOMMENDATION SYSTEM',
    description: 'AI-powered internship matchmaking platform designed to connect students with relevant internship opportunities using profile and opportunity data.',
    techStack: ['Python', 'Machine Learning', 'Scikit-learn', 'XGBoost', 'FastAPI', 'React', 'PostgreSQL', 'GCP'],
    status: 'ACTIVE',
    githubUrl: '#',
    objective: 'Streamline the internship discovery process using AI recommendations.',
    architecture: 'React Frontend -> FastAPI Backend -> ML Inference Engine -> PostgreSQL',
    keyFeatures: ['Profile parsing', 'Opportunity matching', 'Real-time recommendations'],
    result: 'Matched over 500 students with opportunities during initial testing.'
  },
  {
    id: 'sms-spam-detection',
    number: '04',
    title: 'SMS Spam Detection',
    category: 'MACHINE LEARNING / NLP',
    description: 'Machine learning system that classifies SMS messages as spam or legitimate using NLP-based text processing and classification.',
    techStack: ['Python', 'NLP', 'Scikit-learn', 'Machine Learning', 'Text Classification'],
    status: 'COMPLETED',
    githubUrl: '#',
    objective: 'Build a robust spam filter for SMS messages.',
    architecture: 'Text preprocessing (TF-IDF) -> Naive Bayes / SVM classifier',
    keyFeatures: ['High accuracy classification', 'Lightweight model', 'Fast inference'],
    result: 'Achieved 98% accuracy on the test dataset.'
  }
];
