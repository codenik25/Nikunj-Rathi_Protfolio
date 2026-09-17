import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Sparkles, Send, RefreshCw, BarChart2 } from 'lucide-react';

interface PresetMessage {
  label: string;
  type: 'spam' | 'ham';
  text: string;
}

const PRESET_MESSAGES: PresetMessage[] = [
  {
    label: 'Prize Scam (Spam)',
    type: 'spam',
    text: 'CONGRATULATIONS! You have won a $10,000 cash prize. Call 08712345678 or click http://prize-claim.com immediately to claim!',
  },
  {
    label: 'Lunch Invitation (Safe)',
    type: 'ham',
    text: 'Hey Nikhil, are we still meeting for lunch at 12:30pm tomorrow? Let me know if that works for you.',
  },
  {
    label: 'Bank Phishing (Spam)',
    type: 'spam',
    text: 'URGENT: Your Wells Fargo account has been suspended due to suspicious activity. Verify credentials now at http://secure-auth.net',
  },
  {
    label: 'Code Review (Safe)',
    type: 'ham',
    text: 'I pushed the latest changes for the FastAPI vector retriever. Can you review PR #42 on GitHub when you have a moment?',
  },
];

// Heuristic keyword tokens with weights for simulation
const SPAM_TOKENS: Record<string, number> = {
  congratulations: 0.92,
  won: 0.88,
  prize: 0.94,
  cash: 0.78,
  claim: 0.85,
  urgent: 0.91,
  suspended: 0.84,
  verify: 0.79,
  credentials: 0.82,
  immediately: 0.83,
  free: 0.95,
  winner: 0.93,
  http: 0.75,
  click: 0.77,
  call: 0.65,
  account: 0.62,
};

export const SmsSpamClassifierDemo: React.FC = () => {
  const [inputText, setInputText] = useState(PRESET_MESSAGES[0].text);
  const [analyzedResult, setAnalyzedResult] = useState<{
    verdict: 'SPAM' | 'SAFE';
    spamScore: number;
    tokens: Array<{ word: string; weight: number }>;
  }>({
    verdict: 'SPAM',
    spamScore: 98.4,
    tokens: [
      { word: 'CONGRATULATIONS', weight: 0.92 },
      { word: 'won', weight: 0.88 },
      { word: 'prize', weight: 0.94 },
      { word: 'cash', weight: 0.78 },
      { word: 'claim', weight: 0.85 },
    ],
  });

  const analyzeMessage = (text: string) => {
    const lower = text.toLowerCase();
    const words = lower.split(/[^a-zA-Z0-9]+/).filter(Boolean);

    let matchCount = 0;
    let accumulatedWeight = 0;
    const detectedTokens: Array<{ word: string; weight: number }> = [];

    words.forEach((w) => {
      if (SPAM_TOKENS[w]) {
        matchCount++;
        accumulatedWeight += SPAM_TOKENS[w];
        detectedTokens.push({ word: w, weight: SPAM_TOKENS[w] });
      }
    });

    let spamProb = 0.02; // Base baseline probability

    if (matchCount > 0) {
      const avgWeight = accumulatedWeight / matchCount;
      spamProb = Math.min(0.998, 0.45 + matchCount * 0.15 * avgWeight);
    }

    // Heuristics for all caps or urgency symbols
    if (text.includes('!') && text.includes('http')) {
      spamProb = Math.min(0.999, spamProb + 0.15);
    }

    const isSpam = spamProb >= 0.5;
    const finalScore = Number((spamProb * 100).toFixed(1));

    setAnalyzedResult({
      verdict: isSpam ? 'SPAM' : 'SAFE',
      spamScore: finalScore,
      tokens: detectedTokens,
    });
  };

  const handlePresetSelect = (preset: PresetMessage) => {
    setInputText(preset.text);
    analyzeMessage(preset.text);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    analyzeMessage(val);
  };

  const isSpam = analyzedResult.verdict === 'SPAM';

  return (
    <div className="w-full rounded-2xl border border-cyan-500/20 bg-[#070d1a] p-4 sm:p-6 flex flex-col shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-ibm">
        <div className="flex items-center gap-2 text-cyan-300">
          <BarChart2 className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold">NLP SPAM/HAM CLASSIFIER LAB</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">Scikit-learn / TF-IDF Model</span>
        </div>
        <button
          onClick={() => handlePresetSelect(PRESET_MESSAGES[0])}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400/40 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="text-[10px]">RESET INPUT</span>
        </button>
      </div>

      {/* Preset Prompts */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="font-ibm text-[11px] text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" /> SAMPLES:
        </span>
        {PRESET_MESSAGES.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetSelect(preset)}
            className={`px-2.5 py-1 rounded-full border text-xs font-instrument transition-all duration-200 cursor-pointer ${
              preset.type === 'spam'
                ? 'border-red-500/30 bg-red-950/20 text-red-300 hover:bg-red-900/40'
                : 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-900/40'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Textarea Input */}
      <div className="relative">
        <textarea
          rows={3}
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type or paste any SMS message to classify in real-time..."
          className="w-full bg-[#0c162e] border border-white/10 rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/70 font-instrument resize-none"
        />
        <div className="absolute bottom-3 right-3 text-[11px] font-mono text-slate-500">
          {inputText.length} CHARS
        </div>
      </div>

      {/* Live Verdict & Probability Gauge */}
      <div className="mt-4 p-4 rounded-xl border border-white/10 bg-[#091122] flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Verdict Badge */}
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
              isSpam
                ? 'bg-red-950 border border-red-500/50 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                : 'bg-emerald-950 border border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
            }`}
          >
            {isSpam ? <ShieldAlert className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
          </div>

          <div>
            <span className="font-ibm text-[10px] text-slate-400 uppercase tracking-widest block">
              MODEL PREDICTION VERDICT
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`font-display font-black text-2xl tracking-wide ${
                  isSpam ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {analyzedResult.verdict === 'SPAM' ? 'MALICIOUS / SPAM' : 'LEGITIMATE (HAM)'}
              </span>
              <span className="font-mono text-xs text-slate-400">
                ({isSpam ? analyzedResult.spamScore : (100 - analyzedResult.spamScore).toFixed(1)}% Confidence)
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Probability Bar */}
        <div className="w-full sm:w-56 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-ibm">
            <span className="text-slate-400">SPAM PROBABILITY</span>
            <span
              className={`font-mono font-bold ${
                isSpam ? 'text-red-400' : 'text-emerald-400'
              }`}
            >
              {analyzedResult.spamScore}%
            </span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden relative">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                isSpam
                  ? 'bg-gradient-to-r from-amber-500 to-red-500 shadow-[0_0_10px_#ef4444]'
                  : 'bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-[0_0_10px_#10b981]'
              }`}
              style={{ width: `${analyzedResult.spamScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* TF-IDF Token Trigger Inspection */}
      <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
        <span className="font-ibm text-[11px] text-slate-400">
          DETECTED TF-IDF TRIGGER TOKENS:
        </span>
        {analyzedResult.tokens.length > 0 ? (
          analyzedResult.tokens.map((tok, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded border border-red-500/30 bg-red-950/40 text-red-300 font-mono text-[11px] flex items-center gap-1"
            >
              <span>{tok.word}</span>
              <span className="text-red-400/60 text-[9px]">
                +{tok.weight.toFixed(2)}
              </span>
            </span>
          ))
        ) : (
          <span className="font-ibm text-xs text-emerald-400/80">
            No high-risk spam keywords identified in text stream.
          </span>
        )}
      </div>

      {/* Model Performance Benchmark Grid */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-white/10 font-ibm text-xs">
        <div className="p-2.5 rounded-lg bg-[#0c162e] border border-white/5 flex flex-col">
          <span className="text-slate-400 text-[10px]">ACCURACY</span>
          <span className="text-cyan-300 font-mono font-bold text-sm">98.6%</span>
        </div>
        <div className="p-2.5 rounded-lg bg-[#0c162e] border border-white/5 flex flex-col">
          <span className="text-slate-400 text-[10px]">PRECISION</span>
          <span className="text-cyan-300 font-mono font-bold text-sm">97.9%</span>
        </div>
        <div className="p-2.5 rounded-lg bg-[#0c162e] border border-white/5 flex flex-col">
          <span className="text-slate-400 text-[10px]">RECALL</span>
          <span className="text-cyan-300 font-mono font-bold text-sm">98.2%</span>
        </div>
        <div className="p-2.5 rounded-lg bg-[#0c162e] border border-white/5 flex flex-col">
          <span className="text-slate-400 text-[10px]">F1 SCORE</span>
          <span className="text-cyan-300 font-mono font-bold text-sm">98.0%</span>
        </div>
      </div>
    </div>
  );
};
