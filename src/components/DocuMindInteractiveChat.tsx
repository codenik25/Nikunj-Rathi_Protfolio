import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, FileText, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  citations?: string[];
  latency?: string;
  tokens?: number;
}

const PRESET_QUERIES = [
  'Summarize this report.',
  'What are the key financial projections for Q4?',
  'Extract all regulatory compliance citations.',
];

const CANNED_RESPONSES: Record<
  string,
  { text: string; citations: string[]; latency: string; tokens: number }
> = {
  'Summarize this report.': {
    text: 'Executive Summary: The technical prospectus outlines a 34% year-over-year expansion in distributed infrastructure reliability. Core bottlenecks in PostgreSQL ingestion were mitigated by implementing asynchronous batch partitioning and pgvector HNSW indexing, reducing vector search overhead from 1.4s to under 320ms.',
    citations: ['Page 2, §1.2', 'Page 8, Executive Brief', 'Table 4.1'],
    latency: '248ms',
    tokens: 384,
  },
  'What are the key financial projections for Q4?': {
    text: 'Financial Projections (Q4): Cloud operational expenditures are modeled to contract by 18.5% following automated serverless scaling on Google Cloud Run. Projected ARR throughput increases by $1.2M due to automated document processing pipelines with 99.2% extraction accuracy.',
    citations: ['Page 14, §4.3 Financials', 'Appendix B, Model P&L'],
    latency: '312ms',
    tokens: 418,
  },
  'Extract all regulatory compliance citations.': {
    text: 'Compliance Audit: Identified 3 core regulatory citations: (1) GDPR Article 32 (Pseudonymized Data Enclaves), (2) SOC2 Type II Trust Services Criteria (CC6.1 Logical Access Controls), and (3) ISO/IEC 27001 Annex A.12 cryptographic verification in vector stores.',
    citations: ['Page 22, §7.1 Compliance', 'Page 24, SOC2 Crosswalk'],
    latency: '275ms',
    tokens: 462,
  },
};

const DEFAULT_RESPONSE = {
  text: 'Based on semantic retrieval across the ingested PDF collection: The knowledge graph confirms all pipeline components are synchronized. High-density embeddings (768-dim) show an average cosine confidence score of 0.89 across relevant document chunks.',
  citations: ['Page 5, §2.4', 'Page 11, §3.8'],
  latency: '290ms',
  tokens: 350,
};

export const DocuMindInteractiveChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: 'DocuMind AI system initialized. PDF "Enterprise_Architecture_Report_2026.pdf" loaded (142 pages, 846 chunks indexed). Ask me anything about this report or select a preset prompt below.',
      citations: ['System Manifest §1.0'],
      latency: '12ms',
      tokens: 42,
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [displayedAiText, setDisplayedAiText] = useState('');
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, displayedAiText, isTyping]);

  const handleSend = (queryToSend?: string) => {
    const query = (queryToSend || inputQuery).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);
    setDisplayedAiText('');

    // Select canned or default response
    const canned = CANNED_RESPONSES[query] || DEFAULT_RESPONSE;
    const fullText = canned.text;
    let charIndex = 0;

    // Simulate streaming typing effect
    const interval = setInterval(() => {
      charIndex += 4;
      if (charIndex >= fullText.length) {
        clearInterval(interval);
        setDisplayedAiText('');
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: fullText,
            citations: canned.citations,
            latency: canned.latency,
            tokens: canned.tokens,
          },
        ]);
      } else {
        setDisplayedAiText(fullText.slice(0, charIndex));
      }
    }, 20);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'init-reset',
        sender: 'ai',
        text: 'Session reset. Document knowledge base reloaded. Ask a question or click a prompt below.',
        citations: ['System Manifest §1.0'],
        latency: '10ms',
        tokens: 38,
      },
    ]);
    setIsTyping(false);
    setDisplayedAiText('');
  };

  return (
    <div className="w-full rounded-2xl border border-cyan-500/20 bg-[#070d1a] p-4 sm:p-6 flex flex-col shadow-2xl relative overflow-hidden">
      {/* Top Banner with File Info */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-ibm">
        <div className="flex items-center gap-2 text-cyan-300">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold">Enterprise_Architecture_Report_2026.pdf</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">142 Pages / OCR Verified</span>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400/40 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="text-[10px]">RESET CHAT</span>
        </button>
      </div>

      {/* Preset Prompts */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="font-ibm text-[11px] text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" /> PROMPTS:
        </span>
        {PRESET_QUERIES.map((preset) => (
          <button
            key={preset}
            disabled={isTyping}
            onClick={() => handleSend(preset)}
            className="px-2.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-200 hover:bg-cyan-900/50 hover:border-cyan-400 text-xs font-instrument transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={chatScrollRef}
        className="h-64 sm:h-72 overflow-y-auto space-y-3.5 pr-2 custom-scrollbar text-sm font-instrument"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-cyan-400">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 ${
                msg.sender === 'user'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-[#0c162e] border border-cyan-500/20 text-slate-200'
              }`}
            >
              <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

              {/* Citations and metadata pills for AI messages */}
              {msg.sender === 'ai' && msg.citations && (
                <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-ibm">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-slate-400">CITATIONS:</span>
                    {msg.citations.map((c) => (
                      <span
                        key={c}
                        className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 font-mono text-[10px]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  {msg.latency && (
                    <span className="text-slate-400 font-mono text-[10px]">
                      {msg.latency} • {msg.tokens} TOKENS
                    </span>
                  )}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-white">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {/* Live Typing Stream Bubble */}
        {isTyping && (
          <div className="flex items-start gap-3 justify-start animate-in fade-in duration-200">
            <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-cyan-400">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="max-w-[85%] rounded-2xl p-3.5 bg-[#0c162e] border border-cyan-500/40 text-slate-200 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <p className="leading-relaxed">
                {displayedAiText}
                <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse align-middle" />
              </p>
              <div className="mt-2 text-[10px] font-mono text-cyan-400/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>RETRIEVING CONTEXTUAL CHUNKS FROM PGVECTOR...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-3 flex items-center gap-2 pt-3 border-t border-white/10"
      >
        <input
          type="text"
          value={inputQuery}
          disabled={isTyping}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask a question about the document or citations..."
          className="flex-1 bg-[#0c162e] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/70 font-instrument"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isTyping}
          className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)]"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
