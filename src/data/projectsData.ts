export interface ArchitectureNode {
  id: string;
  name: string;
  subtext: string;
  type: 'source' | 'process' | 'database' | 'service' | 'ai' | 'output';
  color: string;
}

export interface CodeSnippet {
  language: string;
  filename: string;
  code: string;
}

export interface TimelineStep {
  phase: string;
  title: string;
  description: string;
  duration: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  numericTarget: number;
  suffix: string;
  subtext: string;
}

export interface TechRationale {
  techId: string;
  name: string;
  category: string;
  reason: string;
}

export interface ProjectCommandData {
  id: string;
  commandName: string;
  number: string;
  title: string;
  category: string;
  categoryTags: ('AI' | 'DATA ANALYTICS' | 'CYBERSECURITY' | 'NLP' | 'CLOUD')[];
  status: 'ONLINE' | 'ACTIVE';
  heroTagline: string;
  summary: string;
  overview: string;
  liveMetric: string;
  thumbnailTheme: 'analytics' | 'document' | 'security' | 'creative';
  metrics: ProjectMetric[];
  techStack: string[];
  techRationales: Record<string, TechRationale>;
  features: string[];
  architectureNodes: ArchitectureNode[];
  architectureConnections: { from: string; to: string }[];
  codeSnippets: CodeSnippet[];
  githubStats: {
    commits: number;
    files: number;
    modules: number;
    aiModels: number;
    apis: number;
  };
  timeline: TimelineStep[];
  impact: {
    problemSolved: string;
    keyLearning: string;
    engineeringChallenges: string;
    futureImprovements: string;
  };
  githubUrl: string;
  demoType: 'chat' | 'spam_classifier' | 'pipeline_simulator' | 'multimodal_generator';
}

export const PROJECTS_DATA: ProjectCommandData[] = [
  {
    id: 'insightflow-ai',
    commandName: 'insightflow',
    number: '01',
    title: 'InsightFlow AI',
    category: 'AI Analytics Platform',
    categoryTags: ['AI', 'DATA ANALYTICS', 'CLOUD'],
    status: 'ONLINE',
    heroTagline: 'Autonomous enterprise analytics pipeline with predictive machine learning and Power BI synchronization',
    summary: 'Intelligent analytics platform that transforms raw business data into actionable insights using AI-assisted analytics pipelines and interactive dashboards.',
    overview:
      'InsightFlow AI is an end-to-end intelligent analytics ecosystem engineered to resolve massive enterprise data fragmentation. The system orchestrates high-throughput ETL ingestion, performs automated schema normalization in PostgreSQL, executes predictive anomaly and trend detection using Scikit-learn and Vertex AI, and streams live KPI data directly into interactive Power BI executive dashboards.',
    liveMetric: '15+ Analytics Components',
    thumbnailTheme: 'analytics',
    metrics: [
      { label: 'ETL Throughput', value: '120k/s', numericTarget: 120, suffix: 'k rec/s', subtext: 'Distributed batch streaming' },
      { label: 'Dashboard Latency', value: '94% Faster', numericTarget: 94, suffix: '% Faster', subtext: 'Pre-computed materializations' },
      { label: 'Prediction Accuracy', value: '96.2%', numericTarget: 96, suffix: '.2%', subtext: 'Cross-validated trend models' },
      { label: 'Pipeline Automation', value: '100%', numericTarget: 100, suffix: '%', subtext: 'Zero manual data intervention' },
    ],
    techStack: ['python', 'fastapi', 'postgresql', 'powerbi', 'pandas', 'numpy', 'scikitlearn', 'vertexai'],
    techRationales: {
      python: {
        techId: 'python',
        name: 'Python',
        category: 'Core Language',
        reason: 'Selected as the foundational language for its peerless scientific computing ecosystem, robust pandas/numpy integrations, and unified support for both backend REST APIs and ML inference workloads.',
      },
      fastapi: {
        techId: 'fastapi',
        name: 'FastAPI',
        category: 'API Engine',
        reason: 'Provides asynchronous, high-throughput microsecond response times for analytics query endpoints, automatic OpenAPI documentation, and native Pydantic data validation for incoming telemetry streams.',
      },
      postgresql: {
        techId: 'postgresql',
        name: 'PostgreSQL',
        category: 'Relational Database',
        reason: 'Used for normalized time-series storage, transactional consistency (ACID), and hyper-optimized analytical queries utilizing JSONB and advanced indexing for sub-second aggregations.',
      },
      powerbi: {
        techId: 'powerbi',
        name: 'Power BI',
        category: 'Business Intelligence',
        reason: 'Direct integration for automated data modeling, multi-layered DAX metrics, dynamic drill-through executive dashboards, and scheduled enterprise report delivery.',
      },
      pandas: {
        techId: 'pandas',
        name: 'Pandas',
        category: 'Data Processing',
        reason: 'Drives the high-performance ETL transformations, missing-value imputation, hierarchical groupings, and temporal aggregations across millions of pricing records.',
      },
      numpy: {
        techId: 'numpy',
        name: 'NumPy',
        category: 'Numerical Computing',
        reason: 'Handles vectorized array calculations and high-speed statistical transformations for pricing elasticities and standard deviation outliers.',
      },
      scikitlearn: {
        techId: 'scikitlearn',
        name: 'Scikit-learn',
        category: 'Machine Learning',
        reason: 'Implements regression algorithms, anomaly detection pipelines (Isolation Forests), and clustering models to identify uncharacteristic price shifts and market spikes.',
      },
      vertexai: {
        techId: 'vertexai',
        name: 'Vertex AI',
        category: 'Cloud AI Platform',
        reason: 'Scales model retraining in the Google Cloud ecosystem, hosting endpoint prediction serving and autoML model monitoring pipelines.',
      },
    },
    features: [
      'Autonomous AI analytics engine identifying pricing anomalies in real-time',
      'High-throughput ETL pipeline ingesting disparate e-commerce & enterprise data',
      'Automated schema generation and incremental PostgreSQL materializations',
      'Trend prediction models with confidence intervals and demand forecast alerts',
      'Smart heuristic recommendations on stock reorder points & pricing elasticity',
      'Real-time KPI monitoring with webhook alerts for sudden deviation triggers',
      'Native SQL integration with automated query optimization routines',
    ],
    architectureNodes: [
      { id: 'src', name: 'Data Sources', subtext: 'APIs, CSVs & Webhooks', type: 'source', color: '#3ec6ff' },
      { id: 'etl', name: 'ETL Pipeline', subtext: 'Pandas & Validation', type: 'process', color: '#6474f5' },
      { id: 'db', name: 'PostgreSQL', subtext: 'Time-Series Warehouse', type: 'database', color: '#336791' },
      { id: 'api', name: 'FastAPI Server', subtext: 'Async Query Layer', type: 'service', color: '#059669' },
      { id: 'ai', name: 'AI Engine', subtext: 'Vertex AI & Scikit-learn', type: 'ai', color: '#8b7bff' },
      { id: 'dash', name: 'Power BI', subtext: 'Executive Dashboards', type: 'output', color: '#f2c811' },
    ],
    architectureConnections: [
      { from: 'src', to: 'etl' },
      { from: 'etl', to: 'db' },
      { from: 'db', to: 'api' },
      { from: 'api', to: 'ai' },
      { from: 'ai', to: 'dash' },
    ],
    codeSnippets: [
      {
        language: 'python',
        filename: 'pipeline/analytics_engine.py',
        code: `@router.post("/v1/analytics/predict-trends")
async def generate_predictive_insights(
    query: AnalyticsQuery,
    db: AsyncSession = Depends(get_db)
) -> InsightResponse:
    """Executes vectorized ETL aggregation and serves ML forecasting."""
    raw_df = await fetch_historical_metrics(db, query.store_id, days=90)
    
    # Feature engineering & outlier clipping
    clean_df = DataPipeline(raw_df).preprocess().detect_anomalies()
    
    # Run Scikit-learn regression model
    predictions = TrendPredictor.infer(clean_df.features)
    
    return InsightResponse(
        confidence=predictions.score,
        forecast_kpi=predictions.forecast,
        anomalies_detected=clean_df.anomaly_count,
        generated_at=datetime.utcnow()
    )`,
      },
      {
        language: 'sql',
        filename: 'db/materialized_views.sql',
        code: `CREATE MATERIALIZED VIEW mv_daily_pricing_analytics AS
SELECT 
    date_trunc('day', recorded_at) AS metric_day,
    store_id,
    AVG(price) AS mean_price,
    STDDEV(price) AS price_volatility,
    COUNT(*) FILTER (WHERE discount_pct > 0.20) AS heavy_discount_volume
FROM raw_price_telemetry
GROUP BY 1, 2
WITH DATA;

CREATE UNIQUE INDEX idx_mv_pricing_day_store 
ON mv_daily_pricing_analytics (metric_day, store_id);`,
      },
    ],
    githubStats: {
      commits: 148,
      files: 64,
      modules: 12,
      aiModels: 4,
      apis: 18,
    },
    timeline: [
      { phase: '01', title: 'Problem Discovery', description: 'Audited enterprise pricing data pipelines suffering from 48-hour reporting lag and brittle CSV ingestion scripts.', duration: 'Week 1-2' },
      { phase: '02', title: 'Architecture & Schema Design', description: 'Designed normalized PostgreSQL time-series schema with materialized views and FastAPI asynchronous contract.', duration: 'Week 3-4' },
      { phase: '03', title: 'ETL & ML Model Development', description: 'Engineered pandas pipeline and trained Scikit-learn regression & anomaly detection algorithms on 500k+ records.', duration: 'Week 5-7' },
      { phase: '04', title: 'Power BI & Cloud Integration', description: 'Configured automated REST gateway connectors to Power BI and deployed Dockerized services to GCP.', duration: 'Week 8-9' },
      { phase: '05', title: 'Production Hardening', description: 'Stress-tested pipeline with 120,000 synthetic records/second; verified sub-second dashboard query responsiveness.', duration: 'Week 10' },
    ],
    impact: {
      problemSolved: 'Reduced pricing reporting latency from 48 hours to near real-time (under 3 seconds), allowing executive stakeholders to instantly identify margin dips and demand trends.',
      keyLearning: 'Vectorized in-memory Pandas transforms combined with PostgreSQL materialized views outperformed naive iterative Python loops by over 60x.',
      engineeringChallenges: 'Handling sudden upstream API schema drift without crashing automated background ingestion required dynamic Pydantic schema adapters and dead-letter queues.',
      futureImprovements: 'Implementing real-time Kafka event streaming and continuous online learning models for dynamic pricing reinforcement.',
    },
    githubUrl: 'https://github.com',
    demoType: 'pipeline_simulator',
  },
  {
    id: 'documind-ai',
    commandName: 'documind',
    number: '02',
    title: 'DocuMind AI',
    category: 'AI Knowledge Assistant',
    categoryTags: ['AI', 'NLP', 'CLOUD'],
    status: 'ONLINE',
    heroTagline: 'Context-aware multimodal document intelligence system with vector retrieval and citation extraction',
    summary: 'AI-powered document understanding platform that extracts, summarizes, and answers deep contextual questions from complex PDFs using LLMs and vector embeddings.',
    overview:
      'DocuMind AI eliminates the friction of manual document research. It leverages optical character recognition (OCR) and layout-aware document chunking to transform unstructured PDFs, legal contracts, and financial prospectuses into dense vector embeddings. Built with LangChain and Google Gemini, it provides lightning-fast semantic question-answering accompanied by exact page-and-section citation provenance.',
    liveMetric: '99.2% Retrieval Precision',
    thumbnailTheme: 'document',
    metrics: [
      { label: 'Retrieval Precision', value: '99.2%', numericTarget: 99, suffix: '.2%', subtext: 'Cosine similarity threshold > 0.82' },
      { label: 'Query Latency', value: '<350ms', numericTarget: 350, suffix: 'ms', subtext: 'Vector cache response time' },
      { label: 'Chunking Density', value: '512 Tok', numericTarget: 512, suffix: ' Tokens', subtext: 'Semantic boundary overlap' },
      { label: 'Citation Faithfulness', value: '100%', numericTarget: 100, suffix: '%', subtext: 'Zero hallucinated page references' },
    ],
    techStack: ['python', 'fastapi', 'gemini', 'vertexai', 'postgresql', 'nlp', 'restapis'],
    techRationales: {
      python: {
        techId: 'python',
        name: 'Python',
        category: 'Core Language',
        reason: 'Provides seamless access to leading document parsing libraries (PyMuPDF, pdfplumber), text tokenization tools, and the LangChain framework.',
      },
      fastapi: {
        techId: 'fastapi',
        name: 'FastAPI',
        category: 'Backend Microservice',
        reason: 'Delivers high-performance Server-Sent Events (SSE) streaming for real-time AI token generation in the interactive document chat interface.',
      },
      gemini: {
        techId: 'gemini',
        name: 'Gemini 1.5 Pro',
        category: 'Large Language Model',
        reason: 'Offers immense context-window capabilities, state-of-the-art multimodal reasoning, and exceptional precision in parsing structured financial tables and complex citations.',
      },
      vertexai: {
        techId: 'vertexai',
        name: 'Vertex AI Embeddings',
        category: 'Vector Embeddings',
        reason: 'Generates 768-dimensional dense vector embeddings with semantic multilingual preservation across domain-specific technical terminology.',
      },
      postgresql: {
        techId: 'postgresql',
        name: 'pgvector (PostgreSQL)',
        category: 'Vector Database',
        reason: 'Utilizes the pgvector extension for high-dimensional HNSW vector similarity search combined with relational document metadata filtering in a single ACID store.',
      },
      nlp: {
        techId: 'nlp',
        name: 'Natural Language Processing',
        category: 'Text Intelligence',
        reason: 'Drives semantic sentence boundary chunking, named-entity extraction (NER), and contextual reranking to suppress irrelevant context windows.',
      },
    },
    features: [
      'Multi-page PDF upload with layout-preserving OCR text extraction',
      'Semantic document chunking with boundary-aware sliding token windows',
      'High-speed vector similarity search using HNSW indexing in pgvector',
      'Interactive document chat with streaming LLM answers and source provenance',
      'Automated multi-level document summaries (executive briefing & deep dive)',
      'Direct page and section citation extraction with clickable preview jumps',
      'Multi-document knowledge repository with cross-document synthesis',
    ],
    architectureNodes: [
      { id: 'pdf', name: 'PDF Ingestion', subtext: 'OCR & Parser', type: 'source', color: '#3ec6ff' },
      { id: 'chunk', name: 'Semantic Chunker', subtext: 'Layout & Overlap', type: 'process', color: '#6474f5' },
      { id: 'embed', name: 'Embedding Model', subtext: '768-dim Vectors', type: 'ai', color: '#8b7bff' },
      { id: 'vdb', name: 'Vector DB (pgvector)', subtext: 'HNSW Indexing', type: 'database', color: '#336791' },
      { id: 'llm', name: 'Gemini 1.5 Pro', subtext: 'RAG Synthesis', type: 'ai', color: '#00f0ff' },
      { id: 'ui', name: 'Answer Engine', subtext: 'Citations & Stream', type: 'output', color: '#10b981' },
    ],
    architectureConnections: [
      { from: 'pdf', to: 'chunk' },
      { from: 'chunk', to: 'embed' },
      { from: 'embed', to: 'vdb' },
      { from: 'vdb', to: 'llm' },
      { from: 'llm', to: 'ui' },
    ],
    codeSnippets: [
      {
        language: 'python',
        filename: 'rag/retriever.py',
        code: `async def query_document_knowledge_base(
    doc_id: str,
    user_query: str,
    top_k: int = 4
) -> AnswerStream:
    """Executes vector retrieval + Gemini 1.5 Pro augmented generation."""
    query_vector = await embedding_client.get_embedding(user_query)
    
    # HNSW Cosine distance match in pgvector
    relevant_chunks = await vector_store.similarity_search(
        collection_id=doc_id,
        embedding=query_vector,
        limit=top_k
    )
    
    prompt = RAGPromptTemplate.format(
        context="\\n\\n".join([c.page_content for c in relevant_chunks]),
        question=user_query
    )
    
    return gemini_client.generate_content_stream(
        prompt=prompt,
        citations=[c.metadata for c in relevant_chunks]
    )`,
      },
    ],
    githubStats: {
      commits: 112,
      files: 52,
      modules: 9,
      aiModels: 3,
      apis: 14,
    },
    timeline: [
      { phase: '01', title: 'Problem Discovery', description: 'Analyzed the pain point of legal and compliance teams spending 15+ hours weekly reading dense compliance reports.', duration: 'Week 1-2' },
      { phase: '02', title: 'Chunking & Embedding Pipeline', description: 'Prototyped layout-aware chunkers to prevent splitting tables and headers across discrete vector boundaries.', duration: 'Week 3-4' },
      { phase: '03', title: 'Vector Database Benchmarking', description: 'Benchmarked pgvector vs Pinecone on 10,000 PDF pages; chose pgvector for self-hosted data governance and ACID integrity.', duration: 'Week 5-6' },
      { phase: '04', title: 'Gemini RAG Integration', description: 'Implemented grounded system prompts with strict anti-hallucination guardrails and page-provenance verification.', duration: 'Week 7-8' },
      { phase: '05', title: 'Streaming UI & Polish', description: 'Developed token-by-token WebSocket / SSE chat interface with inline citation badges.', duration: 'Week 9' },
    ],
    impact: {
      problemSolved: 'Accelerated document research time by 85%, allowing knowledge workers to query 200-page complex filings in seconds with 100% cited source accuracy.',
      keyLearning: 'Naive token chunking destroys tabular semantics; preserving parent document layout coordinates in vector metadata was crucial for accurate citation retrieval.',
      engineeringChallenges: 'Preventing LLM hallucinations when documents contained ambiguous or contradictory disclosures required strict multi-pass verification prompts.',
      futureImprovements: 'Adding cross-document graph neural networks (GraphRAG) to uncover hidden entity relationships across disparate filings.',
    },
    githubUrl: 'https://github.com',
    demoType: 'chat',
  },
  {
    id: 'sms-spam-detection',
    commandName: 'spam',
    number: '03',
    title: 'SMS Spam Detection NLP',
    category: 'Cyber AI Security',
    categoryTags: ['AI', 'CYBERSECURITY', 'NLP'],
    status: 'ONLINE',
    heroTagline: 'High-speed NLP classification model with TF-IDF feature engineering and probabilistic threat calibration',
    summary: 'NLP-based spam detection model that classifies incoming SMS messages into Spam or Legitimate (Ham) using machine learning pipelines and real-time inference.',
    overview:
      'SMS Spam Detection NLP is a production-grade cybersecurity model engineered to combat mobile phishing (smishing) and promotional spam. Built with Scikit-learn and NLTK, the pipeline performs text cleaning, regex tokenization, stopword removal, and TF-IDF vectorization before classifying text through optimized Naive Bayes, Support Vector Machines, and ensemble classifiers with 98.6% cross-validated accuracy.',
    liveMetric: '98.6% Accuracy',
    thumbnailTheme: 'security',
    metrics: [
      { label: 'Classification Accuracy', value: '98.6%', numericTarget: 98, suffix: '.6%', subtext: 'Stratified 5-fold cross validation' },
      { label: 'Precision (Spam)', value: '97.9%', numericTarget: 97, suffix: '.9%', subtext: 'Extremely low false-positive rate' },
      { label: 'Recall (Spam)', value: '98.2%', numericTarget: 98, suffix: '.2%', subtext: 'Comprehensive threat detection' },
      { label: 'Inference Speed', value: '1.2ms', numericTarget: 1, suffix: '.2ms', subtext: 'Ultra-lightweight deployment' },
    ],
    techStack: ['python', 'scikitlearn', 'pandas', 'numpy', 'nlp', 'fastapi'],
    techRationales: {
      python: {
        techId: 'python',
        name: 'Python',
        category: 'Core Language',
        reason: 'The industry-standard language for natural language tokenization, statistical modeling, and ML classification benchmarks.',
      },
      scikitlearn: {
        techId: 'scikitlearn',
        name: 'Scikit-learn',
        category: 'Machine Learning',
        reason: 'Provides optimized implementations of Multinomial Naive Bayes, Linear Support Vector Machines (LinearSVC), TF-IDF vectorizers, and confusion matrix evaluators.',
      },
      nlp: {
        techId: 'nlp',
        name: 'NLTK & NLP',
        category: 'Natural Language Processing',
        reason: 'Drives regex pattern extraction (detecting currency symbols, shortened URLs, urgent imperatives), lowercasing, and Porter stemming.',
      },
      pandas: {
        techId: 'pandas',
        name: 'Pandas',
        category: 'Data Wrangling',
        reason: 'Handles SMS dataset ingestion, class balancing, label encoding, and stratified train/test partitioning.',
      },
      numpy: {
        techId: 'numpy',
        name: 'NumPy',
        category: 'Matrix Operations',
        reason: 'Accelerates sparse matrix multiplications generated by n-gram TF-IDF vectorizers.',
      },
      fastapi: {
        techId: 'fastapi',
        name: 'FastAPI',
        category: 'Real-time API',
        reason: 'Hosts the serialized ML pipeline with microsecond inference times for mobile gateway integration.',
      },
    },
    features: [
      'Automated text cleaning (punctuation removal, regex URL/phone normalization)',
      'TF-IDF n-gram feature extraction (unigrams & bigrams) with sublinear term frequency',
      'Ensemble classification comparing MultinomialNB, Logistic Regression & LinearSVC',
      'Real-time confidence scoring and probability calibration bar',
      'Highlighted keyword token weights displaying exact spam trigger words',
      'Rigorous evaluation with Confusion Matrix, ROC-AUC curve, and F1-score tracking',
      'Ultra-lightweight serialized model footprint (<5MB) suitable for edge deployment',
    ],
    architectureNodes: [
      { id: 'sms', name: 'Incoming SMS', subtext: 'Raw Message Stream', type: 'source', color: '#3ec6ff' },
      { id: 'clean', name: 'Text Preprocessing', subtext: 'Regex & Stemming', type: 'process', color: '#6474f5' },
      { id: 'tfidf', name: 'TF-IDF Vectorizer', subtext: 'N-Gram Weighting', type: 'ai', color: '#8b7bff' },
      { id: 'model', name: 'Classifier Engine', subtext: 'Calibrated Naive Bayes / SVM', type: 'ai', color: '#00f0ff' },
      { id: 'score', name: 'Probability Gauge', subtext: 'Threshold Check', type: 'process', color: '#f59e0b' },
      { id: 'verdict', name: 'Verdict Output', subtext: 'SPAM vs SAFE (Ham)', type: 'output', color: '#ef4444' },
    ],
    architectureConnections: [
      { from: 'sms', to: 'clean' },
      { from: 'clean', to: 'tfidf' },
      { from: 'tfidf', to: 'model' },
      { from: 'model', to: 'score' },
      { from: 'score', to: 'verdict' },
    ],
    codeSnippets: [
      {
        language: 'python',
        filename: 'model/spam_pipeline.py',
        code: `def build_spam_classifier_pipeline():
    """Builds an optimized NLP classification pipeline."""
    return Pipeline([
        ('tfidf', TfidfVectorizer(
            ngram_range=(1, 2),
            max_features=5000,
            sublinear_tf=True,
            stop_words='english'
        )),
        ('clf', CalibratedClassifierCV(
            LinearSVC(C=1.0, max_iter=2000, class_weight='balanced'),
            method='sigmoid'
        ))
    ])

def predict_message(raw_text: str, pipeline) -> dict:
    cleaned = preprocess_text(raw_text)
    prob_spam = pipeline.predict_proba([cleaned])[0][1]
    is_spam = prob_spam >= 0.50
    return {
        "verdict": "SPAM" if is_spam else "SAFE",
        "confidence": float(prob_spam if is_spam else 1.0 - prob_spam),
        "raw_prob": float(prob_spam)
    }`,
      },
    ],
    githubStats: {
      commits: 84,
      files: 38,
      modules: 6,
      aiModels: 3,
      apis: 8,
    },
    timeline: [
      { phase: '01', title: 'Data Gathering & Cleaning', description: 'Curated and scrubbed UCI SMS Spam Collection dataset with over 5,500 labeled real-world SMS samples.', duration: 'Week 1' },
      { phase: '02', title: 'EDA & Feature Engineering', description: 'Analyzed word frequency distributions; created specialized feature detectors for urgent keywords and short links.', duration: 'Week 2' },
      { phase: '03', title: 'Model Exploration & Tuning', description: 'Trained Naive Bayes, Random Forest, and LinearSVC; utilized GridSearch to find optimal TF-IDF hyper-parameters.', duration: 'Week 3-4' },
      { phase: '04', title: 'Probability Calibration', description: 'Calibrated SVM decision boundaries via Platt scaling to produce reliable probabilistic confidence outputs.', duration: 'Week 5' },
      { phase: '05', title: 'API Deployment', description: 'Packaged serialized pickle pipeline in FastAPI container with sub-2 millisecond latency benchmarks.', duration: 'Week 6' },
    ],
    impact: {
      problemSolved: 'Built an ultra-fast, zero-overhead spam firewall capable of filtering malicious smishing texts with 98.6% accuracy without relying on expensive cloud API calls.',
      keyLearning: 'Bi-gram TF-IDF combined with sublinear term frequency scaling significantly outperformed basic CountVectorizer by penalizing repetitive common tokens.',
      engineeringChallenges: 'Imbalanced dataset (87% ham vs 13% spam) caused naive models to underpredict spam; resolved using class weighting and calibrated Platt probabilities.',
      futureImprovements: 'Fine-tuning lightweight quantized transformer encoders (DistilBERT) for adversarial evasion resistance.',
    },
    githubUrl: 'https://github.com',
    demoType: 'spam_classifier',
  },
];

