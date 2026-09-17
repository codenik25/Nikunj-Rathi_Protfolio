export interface ExperienceResponsibility {
  title: string;
  description: string;
  tag: string;
}

export interface ExperienceTechChip {
  id: string;
  name: string;
  category: string;
  application: string;
}

export interface CppCodeModule {
  id: string;
  title: string;
  concept: string;
  code: string;
  learned: string;
}

export interface ExperienceItem {
  id: string;
  commandName: string;
  number: string;
  year: string;
  period: string;
  role: string;
  company: string;
  classification: 'Cybersecurity Internship' | 'Leadership / Core Team' | 'AI Learning Initiative' | 'C++ Virtual Internship' | 'Systems & Product Engineering';
  categoryBadge: string;
  summary: string;
  overview: string;
  focusAreas: string[];
  responsibilities: ExperienceResponsibility[];
  technologies: ExperienceTechChip[];
  keyLearnings: string[];
  visualizerType: 'adani_secops' | 'jic_ecosystem' | 'techsaksham_ai' | 'codealpha_cpp' | 'systems_lifecycle';
  codeModules?: CppCodeModule[];
}

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'adani',
    commandName: 'adani',
    number: '01',
    year: '2026',
    period: '2026 — Present',
    role: 'Cybersecurity Intern',
    company: 'Adani Enterprises',
    classification: 'Cybersecurity Internship',
    categoryBadge: 'SECURITY • AUTOMATION • CLOUD',
    summary: 'Security automation, Power BI analytical dashboards, Azure cloud governance, PAM, DLP, IAM access engineering, and real-time security monitoring.',
    overview:
      'Engineered automated security monitoring workflows and visual analytics at Adani Enterprises. Focused on modern Identity & Access Management (IAM), Privileged Access Management (PAM), Data Loss Prevention (DLP) policies, and enterprise Azure cloud security telemetry, visualizing threat postures through integrated Power BI executive dashboards.',
    focusAreas: [
      'Security Automation & Orchestration',
      'Power BI Security Telemetry Dashboards',
      'Microsoft Azure Security Infrastructure',
      'Privileged Access Management (PAM)',
      'Data Loss Prevention (DLP) Policies',
      'Identity & Access Management (IAM)',
      'Enterprise Security Monitoring',
    ],
    responsibilities: [
      {
        title: 'SECURITY AUTOMATION & PIPELINES',
        description: 'Automated routine security log audits, user entitlement reviews, and threat detection alert triaging across enterprise directories.',
        tag: 'AUTOMATION',
      },
      {
        title: 'POWER BI EXECUTIVE DASHBOARDS',
        description: 'Engineered high-visibility telemetry dashboards aggregating vulnerability metrics, compliance pass-rates, and real-time risk scores.',
        tag: 'ANALYTICS',
      },
      {
        title: 'AZURE CLOUD SECURITY POSTURE',
        description: 'Configured cloud governance controls, role-based access control (RBAC), and security group boundaries across multi-tenant Azure environments.',
        tag: 'CLOUD',
      },
      {
        title: 'PAM, DLP & IAM ARCHITECTURE',
        description: 'Administered least-privilege credential vaults (PAM), confidential data loss prevention filters (DLP), and centralized directory access lifecycle (IAM).',
        tag: 'IDENTITY',
      },
      {
        title: 'ENTERPRISE THREAT MONITORING',
        description: 'Monitored anomalous sign-in triggers, cross-region privilege escalations, and policy violation logs with automated escalation dispatch.',
        tag: 'MONITORING',
      },
    ],
    technologies: [
      { id: 'azure', name: 'Microsoft Azure', category: 'Cloud Infrastructure', application: 'Tenant security configuration, RBAC policies, and cloud resource auditing.' },
      { id: 'powerbi', name: 'Power BI', category: 'Business Intelligence', application: 'Security telemetry dashboards, DAX KPI modeling, and executive reports.' },
      { id: 'pam', name: 'PAM', category: 'Privileged Access', application: 'Credential vaulting, just-in-time privilege elevation, and session audit recording.' },
      { id: 'dlp', name: 'DLP', category: 'Data Protection', application: 'Pattern-based classification and confidential outbound data exfiltration prevention.' },
      { id: 'iam', name: 'IAM', category: 'Identity Governance', application: 'Directory synchronization, SSO federation, and least-privilege user access lifecycle.' },
      { id: 'cyberautomation', name: 'Security Automation', category: 'SecOps', application: 'Scripted anomaly detection, compliance evidence extraction, and triage workflows.' },
    ],
    keyLearnings: [
      'Enterprise security is an automated pipeline discipline: real-time telemetry and least-privilege enforcement stop threats before manual investigation is needed.',
      'Translating raw SIEM/security audit logs into actionable Power BI executive metrics dramatically accelerates vulnerability remediation speed.',
      'Strict Zero Trust architecture requires treating internal network boundaries with the same zero-assumption posture as external attack surfaces.',
    ],
    visualizerType: 'adani_secops',
  },
  {
    id: 'jic',
    commandName: 'jic',
    number: '02',
    year: '2025',
    period: '2025',
    role: 'JIC Core Team',
    company: 'JECRC Incubation Centre',
    classification: 'Leadership / Core Team',
    categoryBadge: 'STARTUP ECOSYSTEM • LEADERSHIP',
    summary: 'Driving technology initiatives, startup incubation support, hackathon coordination, technical workshops, and social media/content outreach.',
    overview:
      'Served as a core student leader at JECRC Incubation Centre (JIC), fostering startup creation, technical innovation, and entrepreneurial culture. Managed technical activities, facilitated hackathons and founder bootcamps, supported early-stage startup founders with product development advice, and led digital ecosystem communication.',
    focusAreas: [
      'Startup Incubation Ecosystem',
      'Technical Workshop Orchestration',
      'Hackathon & Boot Camp Operations',
      'Social Media & Digital Content',
      'Founder Mentorship & Networking',
      'Ecosystem Community Growth',
    ],
    responsibilities: [
      {
        title: 'STARTUP INCUBATION OPERATIONS',
        description: 'Assisted cohort startups with technical roadmapping, pitch deck reviews, and prototyping advisory within the incubation center.',
        tag: 'INCUBATION',
      },
      {
        title: 'TECHNICAL EVENTS & HACKATHONS',
        description: 'Orchestrated university-wide hackathons, hands-on developer workshops, and investor demo days with 1,000+ student participants.',
        tag: 'OPERATIONS',
      },
      {
        title: 'CONTENT & COMMUNITY OUTREACH',
        description: 'Directed digital storytelling campaigns and technical showcases highlighting student founder milestones across social channels.',
        tag: 'MEDIA',
      },
      {
        title: 'INDUSTRY & MENTOR CONNECT',
        description: 'Coordinated guest lectures and technical fireside chats with startup founders, cloud architects, and angel investors.',
        tag: 'LEADERSHIP',
      },
    ],
    technologies: [
      { id: 'startups', name: 'Startup Incubation', category: 'Venture Ops', application: 'Prototyping roadmaps, MVP validation, and cohort founder tracking.' },
      { id: 'events', name: 'Event Management', category: 'Operations', application: 'Hackathon platform setup, participant registration, and judge evaluation scoring.' },
      { id: 'content', name: 'Digital Strategy', category: 'Outreach', application: 'Multi-channel technical storytelling, video reels, and startup spotlight articles.' },
      { id: 'community', name: 'Ecosystem Growth', category: 'Community', application: 'Campus developer evangelism and inter-college innovation partnerships.' },
    ],
    keyLearnings: [
      'Successful startups require tight coupling between technical feasibility and clear market validation before writing extensive code.',
      'Scaling tech community initiatives requires structured delegation, asynchronous documentation, and clear objective metrics.',
      'Mentoring early founders clarified how to communicate complex AI and cloud architectures to non-technical stakeholders.',
    ],
    visualizerType: 'jic_ecosystem',
  },
  {
    id: 'techsaksham',
    commandName: 'techsaksham',
    number: '03',
    year: '2024–2025',
    period: '2024 — 2025',
    role: 'AI Learning Program',
    company: 'TechSaksham (Microsoft & SAP CSR)',
    classification: 'AI Learning Initiative',
    categoryBadge: 'ARTIFICIAL INTELLIGENCE • LEARNING',
    summary: 'Joint educational initiative by Microsoft and SAP focused on core AI concepts, Machine Learning models, cloud intelligence, and hands-on practical applications.',
    overview:
      'Participated in the prestigious TechSaksham program, a joint CSR initiative by Microsoft and SAP designed to empower engineering students with cutting-edge industry skills. Completed intensive training covering Artificial Intelligence foundations, supervised and unsupervised machine learning algorithms, natural language processing, computer vision, and real-world technology applications.',
    focusAreas: [
      'Artificial Intelligence Principles',
      'Supervised & Unsupervised Machine Learning',
      'Microsoft & SAP Industry Case Studies',
      'Computer Vision & NLP Fundamentals',
      'Practical Hands-on Code Labs',
      'Emerging AI Tech Applications',
    ],
    responsibilities: [
      {
        title: 'AI FOUNDATIONS & APPLIED ML',
        description: 'Mastered mathematical and statistical foundations of regression, classification trees, clustering, and neural networks.',
        tag: 'THEORY',
      },
      {
        title: 'INDUSTRY PROBLEM SOLVING',
        description: 'Analyzed enterprise use-cases provided by Microsoft & SAP experts, exploring how AI optimizes supply chains and enterprise operations.',
        tag: 'CASE STUDY',
      },
      {
        title: 'HANDS-ON ALGORITHM IMPLEMENTATION',
        description: 'Engineered Python models utilizing Scikit-learn, NumPy, and Pandas to clean datasets and evaluate model precision, recall, and F1 metrics.',
        tag: 'PRACTICE',
      },
      {
        title: 'CAPSTONE PROJECT WORK',
        description: 'Applied machine learning concepts to real-world datasets with validation splitting, hyper-parameter tuning, and performance profiling.',
        tag: 'CAPSTONE',
      },
    ],
    technologies: [
      { id: 'python', name: 'Python', category: 'Programming', application: 'Primary language for developing ML algorithms, data wrangling, and metric evaluation.' },
      { id: 'scikitlearn', name: 'Scikit-learn', category: 'Machine Learning', application: 'Model training pipelines: Decision Trees, Random Forests, and SVMs.' },
      { id: 'pandas', name: 'Pandas & NumPy', category: 'Data Analysis', application: 'Feature normalization, matrix manipulation, and exploratory data analysis.' },
      { id: 'ai', name: 'Applied AI', category: 'Intelligence', application: 'NLP text preprocessing, sentiment heuristics, and computer vision classification.' },
    ],
    keyLearnings: [
      'Data preparation and feature engineering account for 80% of model performance gains; a clean feature set beats a complex un-tuned model.',
      'Understanding the underlying mathematical cost functions (cross-entropy, mean squared error) is vital for diagnosing gradient issues and overfitting.',
      'The TechSaksham curriculum solidified my desire to specialize in Applied AI and production-ready data pipelines.',
    ],
    visualizerType: 'techsaksham_ai',
  },
];

