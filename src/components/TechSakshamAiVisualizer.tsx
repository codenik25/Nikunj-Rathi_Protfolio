import React, { useState } from 'react';
import { Brain, Cpu, Database, Eye, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';

interface AiLearningNode {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const AI_TREE_NODES: AiLearningNode[] = [
  {
    id: 'ml',
    title: 'Machine Learning Foundations',
    subtitle: 'Supervised & Unsupervised Algorithms',
    description: 'Explored regression, decision trees, random forests, clustering, and SVM algorithms with cross-validation and hyper-parameter optimization.',
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    tags: ['Scikit-learn', 'Regression', 'Classification', 'Clustering'],
  },
  {
    id: 'apps',
    title: 'AI Applications & NLP',
    subtitle: 'Text Processing & Computer Vision',
    description: 'Applied natural language processing heuristics, tokenization, sentiment detection, and basic image feature extraction pipelines.',
    icon: <Eye className="w-5 h-5 text-purple-400" />,
    tags: ['NLP', 'TF-IDF', 'Tokenization', 'Computer Vision'],
  },
  {
    id: 'tech',
    title: 'Technology & Python Ecosystem',
    subtitle: 'Scientific Data Computing Stack',
    description: 'Mastered high-performance data wrangling in Pandas and NumPy, handling missing values, matrix transforms, and statistical feature engineering.',
    icon: <Database className="w-5 h-5 text-blue-400" />,
    tags: ['Python', 'Pandas', 'NumPy', 'Data Pipelines'],
  },
  {
    id: 'practical',
    title: 'Practical Learning & Labs',
    subtitle: 'Hands-on Model Evaluation',
    description: 'Conducted rigorous model benchmarking evaluating precision, recall, ROC-AUC, and F1 scores against enterprise case studies from Microsoft and SAP.',
    icon: <Terminal className="w-5 h-5 text-emerald-400" />,
    tags: ['F1-Score', 'ROC Curves', 'Cross-Validation', 'Case Studies'],
  },
];

export const TechSakshamAiVisualizer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('ml');
  const activeNode = AI_TREE_NODES.find((n) => n.id === selectedId) || AI_TREE_NODES[0];

  return (
    <div className="w-full rounded-2xl border border-cyan-500/25 bg-[#060c18] p-5 sm:p-7 relative overflow-hidden shadow-2xl select-none">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Header with Microsoft & SAP CSR Badges */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <Brain className="w-5 h-5 text-cyan-400" />
          <span className="font-ibm text-xs text-white font-bold tracking-wider uppercase">
            TECHSAKSHAM // AI LEARNING CURRICULUM & SKILLS MATRIX
          </span>
        </div>
        <div className="flex items-center gap-2 font-ibm text-[11px]">
          <span className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300">
            MICROSOFT CSR
          </span>
          <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300">
            SAP CSR INITIATIVE
          </span>
        </div>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {AI_TREE_NODES.map((node) => {
          const isSelected = selectedId === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedId(node.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_20px_rgba(0,240,255,0.25)] -translate-y-1'
                  : 'border-white/10 bg-[#081224] hover:border-cyan-500/40 hover:bg-[#0a1730]'
              }`}
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center mb-3">
                  {node.icon}
                </div>
                <h5 className="font-display font-bold text-sm text-white leading-tight">
                  {node.title}
                </h5>
                <span className="font-ibm text-[11px] text-cyan-400/90 block mt-1">
                  {node.subtitle}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1">
                {node.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 rounded bg-[#0c162e] font-mono text-[9px] text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Pillar Deep Dive Card */}
      <div className="relative z-10 p-5 rounded-xl border border-cyan-500/30 bg-[#08152e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-ibm text-xs">
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold uppercase tracking-wider border border-cyan-500/40">
              {activeNode.title}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-white font-medium">{activeNode.subtitle}</span>
          </div>
          <p className="text-sm text-slate-300 font-instrument leading-relaxed">
            {activeNode.description}
          </p>
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="font-ibm text-[10px] text-slate-400 mr-1">TOPICS:</span>
            {activeNode.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-[10px]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 font-ibm text-xs text-emerald-400 flex-shrink-0">
          <CheckCircle2 className="w-4 h-4" />
          <span>TECHSAKSHAM CERTIFIED</span>
        </div>
      </div>
    </div>
  );
};
