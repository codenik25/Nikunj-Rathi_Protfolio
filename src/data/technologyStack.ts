export interface TechnologyItem {
  id: string;
  name: string;
  category: 'LANGUAGES' | 'SOFTWARE' | 'DATA' | 'AI_ML' | 'CLOUD' | 'SECURITY';
  categoryLabel: string;
  accentColor: string;
  glowColor: string;
  ring: 'inner' | 'middle' | 'outer';
  angle: number; // in degrees (0 = right, 90 = bottom, 180 = left, 270 = top)
  distance: number; // radius from center (1000x1000 canvas, center 500)
  orbitDuration?: number; // in seconds
  orbitDirection?: number; // 1 (CW) or -1 (CCW)
  driftPhase?: number; // radians offset
  isBrand: boolean;
  whatIsIt: string;
  usedFor: string[];
  howIUseIt: string;
  relatedIds: string[];
  mobilePriority: boolean;
  docsUrl?: string;
}

export const TECHNOLOGIES: TechnologyItem[] = [
  // ==========================================
  // 1. LANGUAGES (Left Cluster, 165° - 215°)
  // ==========================================
  {
    id: 'python',
    name: 'Python',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Language',
    accentColor: '#3ec6ff',
    glowColor: 'rgba(62, 198, 255, 0.55)',
    ring: 'inner',
    angle: 195,
    distance: 195,
    orbitDuration: 30,
    orbitDirection: 1,
    driftPhase: 0.2,
    isBrand: true,
    whatIsIt:
      'Python is a general-purpose programming language widely used for software development, data analysis, automation, and AI/ML.',
    usedFor: [
      'Data analysis and data processing',
      'Machine learning and AI applications',
      'Backend development and APIs',
      'Automation and scripting',
      'Scientific computing',
    ],
    howIUseIt:
      'I use Python for data analytics, machine learning projects, backend APIs (FastAPI), and automation workflows.',
    relatedIds: ['pandas', 'numpy', 'scikitlearn', 'fastapi', 'vertexai'],
    mobilePriority: true,
    docsUrl: 'https://docs.python.org/3/',
  },
  {
    id: 'cplusplus',
    name: 'C++',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Language',
    accentColor: '#00d2ff',
    glowColor: 'rgba(0, 210, 255, 0.45)',
    ring: 'middle',
    angle: 180,
    distance: 305,
    orbitDuration: 48,
    orbitDirection: -1,
    driftPhase: 1.1,
    isBrand: true,
    whatIsIt:
      'A high-performance compiled programming language providing direct memory manipulation, system-level efficiency, and deterministic execution.',
    usedFor: [
      'Data structures and algorithm engineering',
      'High-throughput computational routines',
      'Low-level system and resource programming',
      'Competitive programming and DSA problem solving',
    ],
    howIUseIt:
      'I write C++ for core algorithmic challenges, data structure implementations, and understanding memory management concepts.',
    relatedIds: ['python'],
    mobilePriority: false,
    docsUrl: 'https://isocpp.org/',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Language',
    accentColor: '#3178c6',
    glowColor: 'rgba(49, 120, 198, 0.45)',
    ring: 'middle',
    angle: 215,
    distance: 305,
    orbitDuration: 52,
    orbitDirection: 1,
    driftPhase: 2.3,
    isBrand: true,
    whatIsIt:
      'A strongly typed superset of JavaScript that compiles to plain JavaScript, introducing static type checking, interfaces, and maintainability for modern codebases.',
    usedFor: [
      'Building robust web applications',
      'Enforcing compile-time type contracts across components',
      'Writing maintainable backend microservices and APIs',
      'Preventing runtime exceptions through comprehensive typing',
    ],
    howIUseIt:
      'I use TypeScript as the primary foundation for modern web applications, stateful dashboards, and reliable full-stack interfaces.',
    relatedIds: ['react', 'nodejs'],
    mobilePriority: true,
    docsUrl: 'https://www.typescriptlang.org/',
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'LANGUAGES',
    categoryLabel: 'Query Language',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    ring: 'inner',
    angle: 165,
    distance: 195,
    orbitDuration: 34,
    orbitDirection: -1,
    driftPhase: 3.5,
    isBrand: false,
    whatIsIt:
      'Structured Query Language (SQL) is the standard domain-specific language designed for managing, querying, and manipulating data stored in relational database management systems.',
    usedFor: [
      'Multi-table relational data extraction and joining',
      'Writing analytical aggregation queries and window functions',
      'Database schema creation and index optimization',
      'Data cleaning and warehouse transformations',
    ],
    howIUseIt:
      'I write complex SQL queries involving aggregations, windowing, and relational joins to prepare data sets for analytics dashboards.',
    relatedIds: ['postgresql', 'powerbi', 'pandas'],
    mobilePriority: true,
    docsUrl: 'https://en.wikipedia.org/wiki/SQL',
  },

  // ==========================================
  // 2. DEVELOPMENT (Bottom-Left Cluster, 115° - 150°)
  // ==========================================
  {
    id: 'react',
    name: 'React',
    category: 'SOFTWARE',
    categoryLabel: 'Frontend Library',
    accentColor: '#00d8ff',
    glowColor: 'rgba(0, 216, 255, 0.5)',
    ring: 'inner',
    angle: 135,
    distance: 195,
    orbitDuration: 32,
    orbitDirection: 1,
    driftPhase: 4.2,
    isBrand: true,
    whatIsIt:
      'A declarative component-based JavaScript/TypeScript library developed by Meta for constructing fast, reactive user interfaces.',
    usedFor: [
      'Single-page application (SPA) architecture',
      'Interactive dashboards and responsive user interfaces',
      'Component-driven UI engineering and state management',
      'Data-driven web experiences and micro-animations',
    ],
    howIUseIt:
      'I build component architectures, interactive portfolio experiences, dynamic metric dashboards, and state-driven web applications.',
    relatedIds: ['typescript', 'fastapi', 'nodejs'],
    mobilePriority: true,
    docsUrl: 'https://react.dev/',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'SOFTWARE',
    categoryLabel: 'Python Web Framework',
    accentColor: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.5)',
    ring: 'middle',
    angle: 145,
    distance: 305,
    orbitDuration: 50,
    orbitDirection: -1,
    driftPhase: 5.1,
    isBrand: true,
    whatIsIt:
      'A modern, high-performance Python framework for building REST APIs and backend microservices based on standard Python type hints.',
    usedFor: [
      'High-throughput asynchronous REST API endpoints',
      'Serving machine learning model inference pipelines',
      'Automated OpenAPI and Swagger documentation generation',
      'Data validation with Pydantic schemas',
    ],
    howIUseIt:
      'I develop backend endpoints that connect Python data analytics pipelines and AI models to frontend interfaces.',
    relatedIds: ['python', 'react', 'postgresql', 'restapis'],
    mobilePriority: true,
    docsUrl: 'https://fastapi.tiangolo.com/',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'SOFTWARE',
    categoryLabel: 'JavaScript Runtime',
    accentColor: '#539e43',
    glowColor: 'rgba(83, 158, 67, 0.45)',
    ring: 'middle',
    angle: 120,
    distance: 305,
    orbitDuration: 48,
    orbitDirection: 1,
    driftPhase: 0.9,
    isBrand: true,
    whatIsIt:
      'An open-source cross-platform JavaScript runtime environment built on Google Chrome’s V8 engine that executes JavaScript code outside a web browser.',
    usedFor: [
      'Event-driven asynchronous backend services',
      'REST API route handling and middleware',
      'Development tooling and build pipeline automation',
      'Microservice integration and webhook listeners',
    ],
    howIUseIt:
      'I use Node.js to power backend services, runtime tooling, and API integrations across my web projects.',
    relatedIds: ['typescript', 'react', 'mongodb', 'restapis'],
    mobilePriority: true,
    docsUrl: 'https://nodejs.org/',
  },
  {
    id: 'restapis',
    name: 'REST APIs',
    category: 'SOFTWARE',
    categoryLabel: 'API Architecture',
    accentColor: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.45)',
    ring: 'outer',
    angle: 152,
    distance: 415,
    orbitDuration: 72,
    orbitDirection: -1,
    driftPhase: 1.7,
    isBrand: false,
    whatIsIt:
      'Representational State Transfer (REST) is an architectural style for network-based hypermedia systems utilizing standard HTTP methods.',
    usedFor: [
      'Client-server communication protocols',
      'Stateless data interchange with JSON payloads',
      'Microservice orchestration and webhook communication',
      'Standardized CRUD endpoints and authentication headers',
    ],
    howIUseIt:
      'I design and consume RESTful endpoints for web applications, connecting user interfaces with backend databases and AI services.',
    relatedIds: ['fastapi', 'nodejs', 'react'],
    mobilePriority: false,
    docsUrl: 'https://restfulapi.net/',
  },

  // ==========================================
  // 3. SECURITY (Bottom Cluster, 65° - 110°)
  // ==========================================
  {
    id: 'iam',
    name: 'IAM',
    category: 'SECURITY',
    categoryLabel: 'Identity & Access Management',
    accentColor: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.45)',
    ring: 'middle',
    angle: 85,
    distance: 305,
    orbitDuration: 54,
    orbitDirection: 1,
    driftPhase: 2.8,
    isBrand: false,
    whatIsIt:
      'Identity and Access Management (IAM) is a cybersecurity framework of policies and technologies ensuring appropriate users have verified access to technical assets.',
    usedFor: [
      'Role-Based Access Control (RBAC) modeling',
      'Least-privilege permission policy configuration',
      'Authentication and single sign-on (SSO) lifecycles',
      'Audit logging and compliance boundary enforcement',
    ],
    howIUseIt:
      'I study and implement IAM access control matrices, evaluate role-based permissions, and design least-privilege policies.',
    relatedIds: ['pam', 'azure', 'gcp', 'cyberautomation'],
    mobilePriority: true,
    docsUrl: 'https://en.wikipedia.org/wiki/Identity_management',
  },
  {
    id: 'pam',
    name: 'PAM',
    category: 'SECURITY',
    categoryLabel: 'Privileged Access Management',
    accentColor: '#2dd4bf',
    glowColor: 'rgba(45, 212, 191, 0.45)',
    ring: 'outer',
    angle: 78,
    distance: 415,
    orbitDuration: 74,
    orbitDirection: -1,
    driftPhase: 3.6,
    isBrand: false,
    whatIsIt:
      'Privileged Access Management (PAM) encompasses security strategies and technologies to control, monitor, and audit elevated administrative accounts.',
    usedFor: [
      'Privileged credential vaulting and rotation',
      'Just-In-Time (JIT) administrative privilege granting',
      'Privileged session monitoring and keystroke recording',
      'Mitigating credential theft and lateral network movement',
    ],
    howIUseIt:
      'I research PAM controls, credential isolation architectures, and session audit requirements across enterprise workflows.',
    relatedIds: ['iam', 'networksecurity'],
    mobilePriority: false,
    docsUrl: 'https://en.wikipedia.org/wiki/Privileged_access_management',
  },
  {
    id: 'dlp',
    name: 'DLP',
    category: 'SECURITY',
    categoryLabel: 'Data Loss Prevention',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    ring: 'outer',
    angle: 96,
    distance: 415,
    orbitDuration: 70,
    orbitDirection: 1,
    driftPhase: 4.5,
    isBrand: false,
    whatIsIt:
      'Data Loss Prevention (DLP) consists of cybersecurity tools and practices designed to detect and prevent unauthorized exfiltration or exposure of sensitive data.',
    usedFor: [
      'Classifying PII, intellectual property, and financial records',
      'Detecting unauthorized egress attempts via network or storage',
      'Enforcing encryption and data masking across pipelines',
      'Compliance monitoring for regulatory standards',
    ],
    howIUseIt:
      'I analyze DLP policies, inspect regex patterns for PII detection, and integrate sanitization steps into data pipelines.',
    relatedIds: ['iam', 'networksecurity', 'cyberautomation'],
    mobilePriority: false,
    docsUrl: 'https://en.wikipedia.org/wiki/Data_loss_prevention_software',
  },
  {
    id: 'networksecurity',
    name: 'Network Security',
    category: 'SECURITY',
    categoryLabel: 'Infrastructure Protection',
    accentColor: '#0ea5e9',
    glowColor: 'rgba(14, 165, 233, 0.45)',
    ring: 'outer',
    angle: 118,
    distance: 415,
    orbitDuration: 76,
    orbitDirection: -1,
    driftPhase: 5.4,
    isBrand: false,
    whatIsIt:
      'Network security involves protocols, behavioral analyses, and defensive hardware/software measures that shield networks and network-accessible resources.',
    usedFor: [
      'Firewall rule and security group definition',
      'Traffic packet inspection and intrusion detection (IDS/IPS)',
      'Virtual Private Cloud (VPC) isolation and subnet segmentation',
      'Protecting communication channels with TLS/SSL encryption',
    ],
    howIUseIt:
      'I study network defense concepts, configure security groups and VPC subnets, and analyze traffic patterns for anomaly detection.',
    relatedIds: ['pam', 'cyberautomation'],
    mobilePriority: false,
    docsUrl: 'https://en.wikipedia.org/wiki/Network_security',
  },
  {
    id: 'cyberautomation',
    name: 'Cyber Automation',
    category: 'SECURITY',
    categoryLabel: 'Security Automation',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    ring: 'outer',
    angle: 58,
    distance: 415,
    orbitDuration: 72,
    orbitDirection: 1,
    driftPhase: 0.4,
    isBrand: false,
    whatIsIt:
      'Cybersecurity automation utilizes automated scripts and orchestration workflows to execute repetitive security operations without human delays.',
    usedFor: [
      'Automated log parsing and IOC identification',
      'Vulnerability scanning and misconfiguration alert dispatch',
      'Scripting incident response playbooks for rapid containment',
      'Repetitive compliance report aggregation',
    ],
    howIUseIt:
      'I write Python scripts that parse security logs, identify anomalous activity, and automate audit checks.',
    relatedIds: ['python', 'iam', 'networksecurity'],
    mobilePriority: true,
    docsUrl: 'https://en.wikipedia.org/wiki/Security_orchestration',
  },

  // ==========================================
  // 4. DATA (Bottom-Right / Right, 15° - 60°)
  // ==========================================
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'DATA',
    categoryLabel: 'Data Analysis Library',
    accentColor: '#130654',
    glowColor: 'rgba(100, 116, 245, 0.45)',
    ring: 'inner',
    angle: 50,
    distance: 195,
    orbitDuration: 32,
    orbitDirection: 1,
    driftPhase: 1.3,
    isBrand: true,
    whatIsIt:
      'A Python library providing high-performance, flexible data structures such as DataFrames and Series designed for data analysis and manipulation.',
    usedFor: [
      'Tabular dataset transformation and filtering',
      'Handling missing data and imputing null values',
      'Feature engineering and aggregation matrices',
      'Reading and exporting CSV, Excel, and SQL datasets',
    ],
    howIUseIt:
      'I use Pandas as my standard tool for data manipulation, exploratory analysis, and structuring datasets before visualization.',
    relatedIds: ['python', 'numpy', 'powerbi', 'scikitlearn'],
    mobilePriority: true,
    docsUrl: 'https://pandas.pydata.org/',
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'DATA',
    categoryLabel: 'Numerical Computing',
    accentColor: '#4d77cf',
    glowColor: 'rgba(77, 119, 207, 0.45)',
    ring: 'middle',
    angle: 35,
    distance: 305,
    orbitDuration: 48,
    orbitDirection: -1,
    driftPhase: 2.1,
    isBrand: true,
    whatIsIt:
      'The foundational Python package for scientific computing, providing support for large multi-dimensional arrays, matrices, and linear algebra routines.',
    usedFor: [
      'Fast N-dimensional array processing (ndarray)',
      'Vectorized mathematical operations without slow Python loops',
      'Linear algebra, matrix factorizations, and transformations',
      'Serving as the mathematical backbone for ML libraries',
    ],
    howIUseIt:
      'I use NumPy for numerical calculations, array transformations, and matrix operations within machine learning pipelines.',
    relatedIds: ['python', 'pandas', 'scikitlearn'],
    mobilePriority: false,
    docsUrl: 'https://numpy.org/',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'DATA',
    categoryLabel: 'Relational Database',
    accentColor: '#336791',
    glowColor: 'rgba(51, 103, 145, 0.45)',
    ring: 'middle',
    angle: 65,
    distance: 305,
    orbitDuration: 52,
    orbitDirection: 1,
    driftPhase: 3.2,
    isBrand: true,
    whatIsIt:
      'A powerful, open-source object-relational database management system with an emphasis on extensibility, SQL compliance, and transactional reliability.',
    usedFor: [
      'Relational transactional data storage (ACID compliant)',
      'Complex joins, subqueries, and indexing strategies',
      'Structured JSON storage with JSONB querying',
      'Enterprise application backend persistence',
    ],
    howIUseIt:
      'I use PostgreSQL as the primary relational database for structured project data, writing schemas and integrating with FastAPI backends.',
    relatedIds: ['sql', 'fastapi', 'python'],
    mobilePriority: true,
    docsUrl: 'https://www.postgresql.org/',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'DATA',
    categoryLabel: 'NoSQL Database',
    accentColor: '#47a248',
    glowColor: 'rgba(71, 162, 72, 0.45)',
    ring: 'outer',
    angle: 36,
    distance: 415,
    orbitDuration: 74,
    orbitDirection: -1,
    driftPhase: 4.1,
    isBrand: true,
    whatIsIt:
      'A document-oriented NoSQL database that stores operational data in flexible, JSON-like BSON documents with dynamic schema support.',
    usedFor: [
      'Flexible, evolving data schema requirements',
      'High-velocity unstructured or semi-structured data ingestion',
      'Content management and polymorphic record stores',
      'Aggregation pipeline processing on embedded documents',
    ],
    howIUseIt:
      'I use MongoDB for applications requiring flexible schemas and document-based records.',
    relatedIds: ['nodejs', 'react'],
    mobilePriority: false,
    docsUrl: 'https://www.mongodb.com/',
  },
  {
    id: 'powerbi',
    name: 'Power BI',
    category: 'DATA',
    categoryLabel: 'Business Intelligence',
    accentColor: '#f2c811',
    glowColor: 'rgba(242, 200, 17, 0.45)',
    ring: 'outer',
    angle: 18,
    distance: 415,
    orbitDuration: 70,
    orbitDirection: 1,
    driftPhase: 5.0,
    isBrand: true,
    whatIsIt:
      'A business analytics and data visualization platform by Microsoft that transforms disparate data sources into coherent, interactive dashboards.',
    usedFor: [
      'Executive KPI dashboards and interactive reports',
      'Data modeling with star schemas and relationships',
      'Writing DAX expressions for customized business metrics',
      'Drill-through reporting across operational datasets',
    ],
    howIUseIt:
      'I design interactive dashboards, write DAX calculations for core metrics, and model business data to communicate analytical insights.',
    relatedIds: ['sql', 'pandas'],
    mobilePriority: true,
    docsUrl: 'https://powerbi.microsoft.com/',
  },

  // ==========================================
  // 5. AI / ML (Top-Right Cluster, 300° - 350°)
  // ==========================================
  {
    id: 'scikitlearn',
    name: 'Scikit-learn',
    category: 'AI_ML',
    categoryLabel: 'Machine Learning',
    accentColor: '#f7931e',
    glowColor: 'rgba(247, 147, 30, 0.45)',
    ring: 'middle',
    angle: 348,
    distance: 305,
    orbitDuration: 50,
    orbitDirection: 1,
    driftPhase: 0.6,
    isBrand: true,
    whatIsIt:
      'A leading Python machine learning library built on NumPy, SciPy, and matplotlib for data mining, predictive modeling, and statistical analysis.',
    usedFor: [
      'Supervised classification and regression models',
      'Unsupervised clustering algorithms (K-Means, DBSCAN)',
      'Model evaluation (ROC-AUC, Precision/Recall, Confusion Matrices)',
      'Data preprocessing pipelines, cross-validation, and scaling',
    ],
    howIUseIt:
      'I train predictive models for classification and regression tasks, tune hyperparameters, and evaluate statistical metrics.',
    relatedIds: ['python', 'pandas', 'numpy'],
    mobilePriority: true,
    docsUrl: 'https://scikit-learn.org/',
  },
  {
    id: 'vertexai',
    name: 'Vertex AI',
    category: 'AI_ML',
    categoryLabel: 'Managed AI Platform',
    accentColor: '#8b7bff',
    glowColor: 'rgba(139, 123, 255, 0.5)',
    ring: 'inner',
    angle: 325,
    distance: 195,
    orbitDuration: 34,
    orbitDirection: -1,
    driftPhase: 1.8,
    isBrand: false,
    whatIsIt:
      'Google Cloud’s unified machine learning platform that simplifies training, evaluating, and deploying ML models and generative AI solutions at scale.',
    usedFor: [
      'Managed machine learning model training and endpoints',
      'Deploying generative AI foundations and Gemini API integrations',
      'MLOps pipeline management and experiment tracking',
      'Serving low-latency predictions via managed cloud endpoints',
    ],
    howIUseIt:
      'I explore Vertex AI for managed model deployment, experiment tracking, and integrating generative AI APIs into applications.',
    relatedIds: ['gcp', 'python', 'nlp'],
    mobilePriority: true,
    docsUrl: 'https://cloud.google.com/vertex-ai',
  },
  {
    id: 'nlp',
    name: 'NLP',
    category: 'AI_ML',
    categoryLabel: 'Text Processing',
    accentColor: '#a78bfa',
    glowColor: 'rgba(167, 139, 250, 0.45)',
    ring: 'middle',
    angle: 305,
    distance: 305,
    orbitDuration: 48,
    orbitDirection: 1,
    driftPhase: 2.9,
    isBrand: false,
    whatIsIt:
      'Natural Language Processing (NLP) is a branch of artificial intelligence focused on enabling computers to understand, interpret, and manipulate human language.',
    usedFor: [
      'Text tokenization, lemmatization, and vectorization',
      'Sentiment analysis and topic classification',
      'Named Entity Recognition (NER) in unstructured documents',
      'Embedding generation for semantic search and retrieval',
    ],
    howIUseIt:
      'I implement text cleaning, tokenization, TF-IDF vectorization, and sentiment classification scripts on text corpora.',
    relatedIds: ['python', 'vertexai', 'scikitlearn'],
    mobilePriority: false,
    docsUrl: 'https://en.wikipedia.org/wiki/Natural_language_processing',
  },

  // ==========================================
  // 6. CLOUD (Top Cluster, 240° - 285°)
  // ==========================================
  {
    id: 'gcp',
    name: 'GCP',
    category: 'CLOUD',
    categoryLabel: 'Cloud Platform',
    accentColor: '#4285f4',
    glowColor: 'rgba(66, 133, 244, 0.5)',
    ring: 'middle',
    angle: 250,
    distance: 305,
    orbitDuration: 52,
    orbitDirection: -1,
    driftPhase: 3.8,
    isBrand: true,
    whatIsIt:
      'Google Cloud Platform (GCP) is a suite of cloud computing services providing scalable virtual infrastructure, storage, databases, and AI tooling.',
    usedFor: [
      'Hosting cloud-native application infrastructure',
      'Serverless computing with Cloud Functions and Cloud Run',
      'Scalable object storage and database hosting',
      'Enterprise IAM access management and security audit controls',
    ],
    howIUseIt:
      'I utilize Google Cloud Platform for cloud computing concepts, deploying services, and configuring IAM access controls.',
    relatedIds: ['vertexai', 'cloudstorage', 'iam'],
    mobilePriority: true,
    docsUrl: 'https://cloud.google.com/',
  },
  {
    id: 'cloudstorage',
    name: 'Cloud Storage',
    category: 'CLOUD',
    categoryLabel: 'Object Storage',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    ring: 'inner',
    angle: 270,
    distance: 195,
    orbitDuration: 30,
    orbitDirection: 1,
    driftPhase: 4.7,
    isBrand: false,
    whatIsIt:
      'Scalable, highly available object storage services (such as Google Cloud Storage buckets or Azure Blob Storage) designed to store and access arbitrary unstructured files.',
    usedFor: [
      'Storing analytics raw data assets and training datasets',
      'Hosting static application build assets and media files',
      'Configuring lifecycle management and automated tier archiving',
      'Backup persistence and disaster recovery storage',
    ],
    howIUseIt:
      'I configure storage buckets, manage access permissions, and write automated Python upload/download pipeline scripts.',
    relatedIds: ['gcp', 'azure'],
    mobilePriority: false,
    docsUrl: 'https://cloud.google.com/storage',
  },
  {
    id: 'azure',
    name: 'Azure',
    category: 'CLOUD',
    categoryLabel: 'Cloud Platform',
    accentColor: '#0078d4',
    glowColor: 'rgba(0, 120, 212, 0.5)',
    ring: 'outer',
    angle: 275,
    distance: 415,
    orbitDuration: 74,
    orbitDirection: -1,
    driftPhase: 5.5,
    isBrand: true,
    whatIsIt:
      'Microsoft Azure is an enterprise cloud computing service providing infrastructure as a service (IaaS), platform as a service (PaaS), and enterprise security identity management.',
    usedFor: [
      'Enterprise identity integration via Microsoft Entra ID (Azure AD)',
      'Hosting virtual machines, app services, and relational databases',
      'Configuring cloud network security groups and role assignments',
      'Data warehousing and business intelligence pipeline integrations',
    ],
    howIUseIt:
      'I study Microsoft Azure cloud infrastructure, focusing on identity management (Entra ID) and role assignments.',
    relatedIds: ['iam', 'powerbi', 'cloudstorage'],
    mobilePriority: true,
    docsUrl: 'https://azure.microsoft.com/',
  },
];

// Lookup Map by ID
export const TECH_BY_ID: Record<string, TechnologyItem> = TECHNOLOGIES.reduce(
  (acc, tech) => {
    acc[tech.id] = tech;
    return acc;
  },
  {} as Record<string, TechnologyItem>
);

// Bidirectional Relationship Graph
export const RELATIONSHIP_MAP: Record<string, string[]> = TECHNOLOGIES.reduce(
  (acc, tech) => {
    acc[tech.id] = tech.relatedIds;
    return acc;
  },
  {} as Record<string, string[]>
);

// Grouped by Category for the Full Stack View
export const TECH_BY_CATEGORY: Record<
  string,
  { label: string; items: TechnologyItem[] }
> = {
  LANGUAGES: {
    label: 'LANGUAGES',
    items: TECHNOLOGIES.filter((t) => t.category === 'LANGUAGES'),
  },
  SOFTWARE: {
    label: 'SOFTWARE & DEVELOPMENT',
    items: TECHNOLOGIES.filter((t) => t.category === 'SOFTWARE'),
  },
  DATA: {
    label: 'DATA ARCHITECTURE',
    items: TECHNOLOGIES.filter((t) => t.category === 'DATA'),
  },
  AI_ML: {
    label: 'AI & MACHINE LEARNING',
    items: TECHNOLOGIES.filter((t) => t.category === 'AI_ML'),
  },
  CLOUD: {
    label: 'CLOUD & INFRASTRUCTURE',
    items: TECHNOLOGIES.filter((t) => t.category === 'CLOUD'),
  },
  SECURITY: {
    label: 'SECURITY & GOVERNANCE',
    items: TECHNOLOGIES.filter((t) => t.category === 'SECURITY'),
  },
};
