import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  GitBranch,
  FileCode,
  Layers,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Activity,
  Calendar,
  AlertCircle,
  Lightbulb,
  Cpu,
  ChevronRight,
} from 'lucide-react';
import { TechIcon } from './TechLogos';
import { ArchitectureFlowVisualizer } from './ArchitectureFlowVisualizer';
import { DocuMindInteractiveChat } from './DocuMindInteractiveChat';
import { SmsSpamClassifierDemo } from './SmsSpamClassifierDemo';
import { IconGithub } from './Icons';
import type { ProjectCommandData, TechRationale } from '../data/projectsData';

interface ProjectCaseStudyModalProps {
  project: ProjectCommandData | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectTechChip: (rationale: TechRationale, projectName: string) => void;
}

type TabType = 'overview' | 'architecture' | 'demo' | 'code' | 'timeline';

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  isOpen,
  onClose,
  onSelectTechChip,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  // Reset to overview when project changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, project]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end select-none animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-xl transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Sliding Bottom Sheet Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        className="relative z-10 w-full max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl border-t border-x border-cyan-500/30 bg-[#050a14] shadow-[0_-25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(0,240,255,0.15)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300"
      >
        {/* Top Decorative Cyber Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Modal Header */}
        <div className="px-6 sm:px-10 py-5 bg-[#070e1c] border-b border-white/10 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-4">
            <span className="font-display font-black text-2xl sm:text-3xl text-cyan-400">
              {project.number}
            </span>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-ibm text-xs text-cyan-300 uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                  {project.category}
                </span>
                <span className="flex items-center gap-1.5 font-ibm text-xs text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  STATUS: {project.status}
                </span>
              </div>
              <h2
                id="case-study-title"
                className="font-display font-black text-xl sm:text-3xl text-white tracking-wide mt-1"
              >
                {project.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GITHUB"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-cyan-400/50 transition-all font-instrument text-xs font-semibold text-slate-200"
            >
              <IconGithub className="w-4 h-4" />
              <span className="hidden sm:inline">VIEW CODE</span>
              <ExternalLink className="w-3 h-3 text-cyan-400" />
            </a>

            <button
              onClick={onClose}
              data-cursor="CLOSE"
              aria-label="Close case study"
              className="p-2 rounded-xl border border-white/15 bg-white/5 text-slate-400 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Bar Navigation */}
        <div className="px-6 sm:px-10 bg-[#060c18] border-b border-white/10 flex items-center gap-2 sm:gap-4 overflow-x-auto custom-scrollbar flex-shrink-0">
          {[
            { id: 'overview', label: 'OVERVIEW & METRICS', icon: Activity },
            { id: 'architecture', label: 'ARCHITECTURE PIPELINE', icon: Layers },
            { id: 'demo', label: 'INTERACTIVE LIVE DEMO', icon: Sparkles },
            { id: 'code', label: 'CODE & IMPLEMENTATION', icon: FileCode },
            { id: 'timeline', label: 'TIMELINE & IMPACT', icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 py-3 px-3 border-b-2 font-ibm text-xs tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-950/20'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body Scroll Area */}
        <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar flex-1 space-y-10 font-instrument">
          {/* TAB 1: OVERVIEW & METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Tagline Banner */}
              <div className="p-5 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 via-[#070e1c] to-purple-950/20 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-ibm text-[11px] text-cyan-400 uppercase tracking-widest block">
                    ENGINEERING OBJECTIVE
                  </span>
                  <p className="text-white font-medium text-base sm:text-lg">
                    {project.heroTagline}
                  </p>
                </div>
              </div>

              {/* 4 Animated Numeric Metric Counters */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-white/10 bg-[#091122]/90 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                  >
                    <span className="font-ibm text-xs text-slate-400 uppercase tracking-wider">
                      {m.label}
                    </span>
                    <div className="my-2">
                      <span className="font-display font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                        {m.value}
                      </span>
                    </div>
                    <span className="font-ibm text-[11px] text-cyan-400/90">
                      {m.subtext}
                    </span>
                  </div>
                ))}
              </div>

              {/* Deep Technical Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-3">
                      Executive Engineering Summary
                    </h3>
                    <p className="text-slate-300 text-base leading-relaxed">
                      {project.overview}
                    </p>
                  </div>

                  {/* Key Capabilities */}
                  <div>
                    <h4 className="font-ibm text-xs text-cyan-400 uppercase tracking-wider mb-3">
                      KEY ARCHITECTURAL CAPABILITIES
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {project.features.map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-3 rounded-xl border border-white/5 bg-[#091122] text-sm text-slate-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Interactive Tech Stack Chips & GitHub Telemetry */}
                <div className="space-y-6">
                  {/* Interactive Tech Stack */}
                  <div className="p-5 rounded-2xl border border-cyan-500/20 bg-[#070e1c]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-ibm text-xs text-cyan-300 uppercase tracking-wider font-semibold">
                        TECHNOLOGY STACK
                      </span>
                      <span className="font-ibm text-[10px] text-slate-500">
                        CLICK CHIP FOR RATIONALE
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((techId) => {
                        const rationale = project.techRationales[techId];
                        return (
                          <button
                            key={techId}
                            onClick={() => {
                              if (rationale) {
                                onSelectTechChip(rationale, project.title);
                              }
                            }}
                            className="group flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-[#0a1224] hover:border-cyan-400/60 hover:bg-cyan-950/40 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all cursor-pointer select-none"
                          >
                            <TechIcon techId={techId} size={16} />
                            <span className="font-ibm text-xs text-slate-300 group-hover:text-white capitalize">
                              {rationale?.name || techId}
                            </span>
                            <span className="text-[10px] text-cyan-400 opacity-60 group-hover:opacity-100">
                              ℹ
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Animated GitHub Stats Card */}
                  <div className="p-5 rounded-2xl border border-white/10 bg-[#070e1c] flex flex-col gap-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                      <IconGithub className="w-4 h-4 text-cyan-400" />
                      <span className="font-ibm text-xs text-white font-semibold tracking-wider">
                        REPOSITORY TELEMETRY
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 font-ibm text-xs">
                      <div className="p-2.5 rounded-lg bg-[#0a1224] border border-white/5">
                        <span className="text-slate-400 block text-[10px]">COMMITS</span>
                        <span className="font-bold text-white text-sm font-mono">
                          {project.githubStats.commits}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#0a1224] border border-white/5">
                        <span className="text-slate-400 block text-[10px]">SOURCE FILES</span>
                        <span className="font-bold text-white text-sm font-mono">
                          {project.githubStats.files}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#0a1224] border border-white/5">
                        <span className="text-slate-400 block text-[10px]">AI MODELS</span>
                        <span className="font-bold text-cyan-400 text-sm font-mono">
                          {project.githubStats.aiModels}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#0a1224] border border-white/5">
                        <span className="text-slate-400 block text-[10px]">REST ENDPOINTS</span>
                        <span className="font-bold text-emerald-400 text-sm font-mono">
                          {project.githubStats.apis}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE PIPELINE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  Asynchronous Architecture Flow
                </h3>
                <p className="text-slate-300 text-sm max-w-3xl">
                  Inspect the live data stream sequence below. Packets flow from initial ingestion
                  sources through transformation layers, persistence models, and downstream UI/analytics visualizers.
                </p>
              </div>

              {/* Animated SVG Pipeline Flow */}
              <ArchitectureFlowVisualizer
                nodes={project.architectureNodes}
                connections={project.architectureConnections}
              />

              {/* Architecture Deep Dive Description Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-5 rounded-2xl border border-white/10 bg-[#070e1c] space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-ibm text-xs">
                    <Cpu className="w-4 h-4" />
                    <span>INGESTION & CONCURRENCY</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Designed around non-blocking event loops using asynchronous Python workers.
                    Incoming payloads are pre-validated against Pydantic models before entering the transformation queues.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-white/10 bg-[#070e1c] space-y-2">
                  <div className="flex items-center gap-2 text-purple-400 font-ibm text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>AI INFERENCE & VECTOR STORES</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Vector representations and ML embeddings are indexed using HNSW / inverted indexes,
                    ensuring high-dimensional nearest-neighbor lookups execute with sub-millisecond latencies.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INTERACTIVE LIVE DEMO */}
          {activeTab === 'demo' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  Interactive Live Demonstration Lab
                </h3>
                <p className="text-slate-300 text-sm max-w-3xl">
                  Test the actual intelligence engine in real time. Interact with the models and observe live telemetry outputs.
                </p>
              </div>

              {/* Specific interactive demo per project */}
              {project.demoType === 'chat' && <DocuMindInteractiveChat />}
              {project.demoType === 'spam_classifier' && <SmsSpamClassifierDemo />}
              {project.demoType === 'pipeline_simulator' && (
                <div className="p-6 rounded-2xl border border-cyan-500/30 bg-[#070e1c] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-cyan-400 font-ibm text-xs">
                      <Activity className="w-4 h-4 animate-spin" />
                      <span>HIGH-THROUGHPUT BATCH INGESTION SIMULATOR</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                      BUFFER: HEALTHY
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">
                    Simulating 120,000 synthetic transaction records streamed into PostgreSQL with continuous materialized view refresh.
                  </p>
                  <div className="grid grid-cols-3 gap-3 font-mono text-center">
                    <div className="p-3 bg-[#0a1224] rounded-xl border border-white/10">
                      <span className="text-[10px] text-slate-400 block">THROUGHPUT</span>
                      <span className="text-xl text-cyan-400 font-bold">120,412/s</span>
                    </div>
                    <div className="p-3 bg-[#0a1224] rounded-xl border border-white/10">
                      <span className="text-[10px] text-slate-400 block">LATENCY</span>
                      <span className="text-xl text-emerald-400 font-bold">1.4ms</span>
                    </div>
                    <div className="p-3 bg-[#0a1224] rounded-xl border border-white/10">
                      <span className="text-[10px] text-slate-400 block">MEMORY USE</span>
                      <span className="text-xl text-purple-400 font-bold">342 MB</span>
                    </div>
                  </div>
                </div>
              )}
              {project.demoType === 'multimodal_generator' && (
                <div className="p-6 rounded-2xl border border-cyan-500/30 bg-[#070e1c] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-cyan-400 font-ibm text-xs">
                      <Sparkles className="w-4 h-4" />
                      <span>TRENDTALES MULTIMODAL STORY GENERATOR</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs">
                      GCS CACHE: ACTIVE
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">
                    Extracts trending topics from Google Trends and drafts studio-quality short-form scripts with synchronized scene cues.
                  </p>
                  <div className="p-4 rounded-xl bg-[#091122] border border-white/10 font-mono text-xs text-slate-300 space-y-2">
                    <div className="text-cyan-300">&gt; DETECTED TREND: "Handcrafted Ceramics Ceramic Glaze 2026" (Velocity: +340%)</div>
                    <div className="text-white">&gt; GENERATING REEL HOOK: "The secret to 1,200°C kiln magic nobody talks about..."</div>
                    <div className="text-emerald-400">&gt; AUDIO SYNTHESIS: Studio HD (Whisper neural timbre matched) [2.1s rendered]</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CODE & IMPLEMENTATION */}
          {activeTab === 'code' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  Codebase & Core Implementation Snippets
                </h3>
                <p className="text-slate-300 text-sm max-w-3xl">
                  Direct extracts from the production repository showcasing asynchronous request handling,
                  vector retrieval pipelines, and optimized data transformations.
                </p>
              </div>

              <div className="space-y-6">
                {project.codeSnippets.map((snippet, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-[#070e1c] overflow-hidden shadow-2xl"
                  >
                    {/* Code Window Header */}
                    <div className="px-4 py-2.5 bg-[#091326] border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-cyan-400" />
                        <span className="font-ibm text-xs text-slate-200 font-mono">
                          {snippet.filename}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono uppercase">
                          {snippet.language}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyCode(snippet.code, idx)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400/40 text-xs font-mono transition-colors cursor-pointer"
                      >
                        {copiedCodeIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 text-[11px]">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[11px]">COPY</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Syntax Code Body */}
                    <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-cyan-200 leading-relaxed custom-scrollbar bg-[#050912]">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TIMELINE & IMPACT */}
          {activeTab === 'timeline' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Engineering Journey Timeline */}
              <div>
                <h3 className="font-display font-bold text-2xl text-white mb-4">
                  Engineering Journey Timeline
                </h3>
                <div className="relative pl-6 sm:pl-8 border-l border-cyan-500/30 space-y-6">
                  {project.timeline.map((step, idx) => (
                    <div key={idx} className="relative group">
                      {/* Node Dot */}
                      <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#050a14] border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 transition-transform">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      </div>

                      <div className="p-4 rounded-xl border border-white/10 bg-[#070e1c] hover:border-cyan-500/40 transition-all">
                        <div className="flex items-center justify-between gap-2 mb-1 font-ibm text-xs">
                          <span className="text-cyan-400 font-bold uppercase">
                            PHASE {step.phase}: {step.title}
                          </span>
                          <span className="text-slate-500 font-mono">{step.duration}</span>
                        </div>
                        <p className="text-slate-300 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact & Retrospective Grid */}
              <div className="pt-6 border-t border-white/10">
                <h3 className="font-display font-bold text-2xl text-white mb-4">
                  Engineering Impact & Retrospective
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-ibm text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>PROBLEM SOLVED</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.impact.problemSolved}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/10 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-ibm text-xs">
                      <Lightbulb className="w-4 h-4" />
                      <span>KEY ARCHITECTURAL LEARNING</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.impact.keyLearning}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-950/10 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-ibm text-xs">
                      <AlertCircle className="w-4 h-4" />
                      <span>ENGINEERING CHALLENGES OVERCOME</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.impact.engineeringChallenges}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-950/10 space-y-2">
                    <div className="flex items-center gap-2 text-purple-400 font-ibm text-xs">
                      <Sparkles className="w-4 h-4" />
                      <span>FUTURE ROADMAP & IMPROVEMENTS</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.impact.futureImprovements}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-10 py-3.5 bg-[#070e1c] border-t border-white/10 flex items-center justify-between text-xs font-ibm text-slate-500 flex-shrink-0">
          <span>PRESS [ESC] OR CLICK OUTSIDE TO EXIT MODAL</span>
          <span className="text-cyan-400/80">
            {project.title.toUpperCase()} // PRODUCTION DEPLOYMENT
          </span>
        </div>
      </div>
    </div>
  );
};
