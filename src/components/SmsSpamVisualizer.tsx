import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const SmsSpamVisualizer: React.FC = () => {
  const [inputText, setInputText] = useState('Congratulations! You have won a free iPhone. Click here to claim.');
  const [isClassifying, setIsClassifying] = useState(false);
  const [result, setResult] = useState<{ label: 'SPAM' | 'SAFE'; prob: number } | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleTest = () => {
    if (!inputText.trim() || isClassifying) return;
    
    setIsClassifying(true);
    setResult(null);

    // Simulated Classification Pipeline Animation
    const isSpam = inputText.toLowerCase().includes('won') || inputText.toLowerCase().includes('free') || inputText.toLowerCase().includes('click');
    const finalProb = isSpam ? 0.98 : 0.12;

    const ctx = gsap.context(() => {
      // Reset bar
      gsap.set(progressRef.current, { width: '0%' });
      
      // Animate pipeline
      gsap.to(progressRef.current, {
        width: `${finalProb * 100}%`,
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsClassifying(false);
          setResult({ label: isSpam ? 'SPAM' : 'SAFE', prob: finalProb });
        }
      });
    });

    return () => ctx.revert();
  };

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center relative p-8 gap-6 z-10">
      <div className="absolute inset-0 bg-gradient-to-bl from-orange-900/10 to-red-900/5 rounded-2xl border border-white/5 pointer-events-none" />

      {/* Header */}
      <div className="text-center">
        <h4 className="font-sans font-bold tracking-widest text-xs uppercase text-slate-400 mb-1">Live Demo Environment</h4>
        <p className="font-mono text-xs text-slate-500">TF-IDF + Naive Bayes Pipeline</p>
      </div>

      {/* Interactive Input */}
      <div className="w-full max-w-md bg-[#0a101d] border border-white/10 rounded-xl p-4 flex flex-col gap-4 shadow-xl">
        <textarea 
          className="w-full bg-transparent border-none outline-none resize-none font-sans text-sm text-slate-300 placeholder:text-slate-600"
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter message to classify..."
        />
        <div className="flex justify-between items-center border-t border-white/10 pt-4">
          <span className="font-mono text-[10px] text-slate-500">Feature Extractor Active</span>
          <button 
            onClick={handleTest}
            disabled={isClassifying}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-semibold uppercase tracking-wider rounded transition-colors disabled:opacity-50"
          >
            {isClassifying ? 'Analyzing...' : 'Test Model'}
          </button>
        </div>
      </div>

      {/* Processing Pipeline & Result */}
      <div className="w-full max-w-md flex items-center gap-4">
        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden relative border border-white/10">
          <div 
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-red-500 rounded-full"
            style={{ width: '0%' }}
          />
        </div>
      </div>

      {/* Output Verdict */}
      <div className="h-20 flex items-center justify-center">
        {result && (
          <div className={`flex flex-col items-center gap-1 animate-in fade-in zoom-in duration-300 ${result.label === 'SPAM' ? 'text-red-400' : 'text-emerald-400'}`}>
            <span className="font-display font-black text-4xl tracking-tight">{result.label}</span>
            <span className="font-sans font-medium text-xs tracking-widest uppercase opacity-80">
              Confidence: {(result.prob * 100).toFixed(1)}%
            </span>
          </div>
        )}
      </div>

    </div>
  );
};
