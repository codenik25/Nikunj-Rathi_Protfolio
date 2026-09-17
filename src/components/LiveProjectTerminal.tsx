import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, ChevronRight, Minimize2, Maximize2, Sparkles } from 'lucide-react';
import type { ProjectCommandData } from '../data/projectsData';

interface LiveProjectTerminalProps {
  projects: ProjectCommandData[];
  onOpenProject: (projectId: string) => void;
}

interface TerminalLog {
  id: string;
  type: 'command' | 'output' | 'error' | 'system';
  text: string;
}

export const LiveProjectTerminal: React.FC<LiveProjectTerminalProps> = ({
  projects,
  onOpenProject,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLog[]>([
    {
      id: 'welcome-1',
      type: 'system',
      text: 'SYSTEM KERNEL v4.2 // PROJECT COMMAND CENTER ONLINE',
    },
    {
      id: 'welcome-2',
      type: 'system',
      text: 'Type "help" to list available operational commands.',
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto scroll terminal logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const cmdLog: TerminalLog = {
      id: `cmd-${Date.now()}`,
      type: 'command',
      text: `$ ${cmd}`,
    };

    setHistory((prev) => [...prev, cmdLog]);
    setInputVal('');

    // Handle commands
    if (cmd === 'help') {
      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: 'output',
          text: `AVAILABLE COMMANDS:
  help        - Displays this guide
  projects    - Lists all active production systems
  insightflow - Opens InsightFlow AI Case Study & Architecture
  documind    - Opens DocuMind AI Document Intelligence & Live Chat
  spam        - Opens SMS Spam Detection NLP Lab & Classifier
  trendtales  - Opens TrendTales AI Market Engine & Multimodal Story
  clear       - Clears terminal display buffer`,
        },
      ]);
    } else if (cmd === 'projects') {
      const listStr = projects
        .map(
          (p) =>
            `[${p.number}] ${p.title} (${p.category}) — STATUS: ${p.status}`
        )
        .join('\n');
      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: 'output',
          text: `ACTIVE SYSTEMS:\n${listStr}\n\nType project name to inspect (e.g. "insightflow").`,
        },
      ]);
    } else if (cmd === 'insightflow') {
      onOpenProject('insightflow-ai');
      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: 'output',
          text: '>> Initializing InsightFlow AI Case Study visualizer...',
        },
      ]);
    } else if (cmd === 'documind') {
      onOpenProject('documind-ai');
      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: 'output',
          text: '>> Initializing DocuMind AI Knowledge Assistant visualizer...',
        },
      ]);
    } else if (cmd === 'spam') {
      onOpenProject('sms-spam-detection');
      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: 'output',
          text: '>> Initializing SMS Spam Detection NLP Lab visualizer...',
        },
      ]);
    } else if (cmd === 'trendtales') {
      onOpenProject('trendtales-ai');
      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: 'output',
          text: '>> Initializing TrendTales AI Story Engine visualizer...',
        },
      ]);
    } else if (cmd === 'clear') {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for a list of commands.`,
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Floating Minimized Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          data-cursor="CLI"
          aria-label="Open Project Command Terminal"
          className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-cyan-500/40 bg-[#070e1c]/90 backdrop-blur-xl text-cyan-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all duration-300 cursor-pointer shadow-2xl"
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <Terminal className="w-4 h-4 text-cyan-400 group-hover:rotate-6 transition-transform" />
          <span className="font-ibm text-xs font-semibold tracking-wider">
            TERMINAL CLI
          </span>
          <span className="font-mono text-[10px] text-cyan-400/80 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
            &gt;_
          </span>
        </button>
      )}

      {/* Expanded Terminal Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[440px] rounded-2xl border border-cyan-500/40 bg-[#060c18]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Terminal Window Chrome Titlebar */}
          <div className="px-4 py-2.5 bg-[#091326] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-ibm text-xs font-bold text-slate-200 tracking-wider">
                COMMAND CENTER CLI // v4.2
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setHistory([])}
                title="Clear buffer"
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span className="font-mono text-[10px]">CLS</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize terminal"
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick command buttons strip */}
          <div className="px-3 py-1.5 bg-[#050a14] border-b border-white/5 flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
            <span className="text-slate-500">RUN:</span>
            {['help', 'projects', 'insightflow', 'documind', 'spam', 'trendtales'].map(
              (cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    setInputVal(cmd);
                    setTimeout(() => {
                      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                      inputVal !== cmd ? setInputVal(cmd) : null;
                    }, 50);
                  }}
                  className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-900/60 hover:border-cyan-400 transition-colors"
                >
                  {cmd}
                </button>
              )
            )}
          </div>

          {/* Terminal Logs Scrollback */}
          <div
            ref={scrollRef}
            className="p-3.5 h-56 overflow-y-auto space-y-2 font-mono text-[11px] text-slate-300 custom-scrollbar leading-relaxed"
          >
            {history.map((log) => (
              <div key={log.id} className="whitespace-pre-wrap">
                {log.type === 'command' && (
                  <div className="text-cyan-300 font-bold">{log.text}</div>
                )}
                {log.type === 'system' && (
                  <div className="text-slate-400">{log.text}</div>
                )}
                {log.type === 'output' && (
                  <div className="text-emerald-300 pl-2 border-l border-emerald-500/30">
                    {log.text}
                  </div>
                )}
                {log.type === 'error' && (
                  <div className="text-red-400">{log.text}</div>
                )}
              </div>
            ))}
          </div>

          {/* Command Prompt Input */}
          <form
            onSubmit={handleCommandSubmit}
            className="p-2.5 bg-[#040812] border-t border-white/10 flex items-center gap-2"
          >
            <span className="text-cyan-400 font-mono text-xs font-bold pl-1">
              &gt;
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type a command..."
              className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600"
            />
            <span className="w-1.5 h-3.5 bg-cyan-400 animate-pulse inline-block" />
          </form>
        </div>
      )}
    </div>
  );
};
