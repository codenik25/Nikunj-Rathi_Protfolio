import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Minimize2 } from 'lucide-react';
import type { ExperienceItem } from '../data/experienceData';

interface ExperienceTerminalProps {
  experiences: ExperienceItem[];
  onOpenExperience: (expId: string) => void;
}

interface TerminalLog {
  id: string;
  type: 'cmd' | 'output' | 'system' | 'err';
  text: string;
}

export const ExperienceTerminal: React.FC<ExperienceTerminalProps> = ({
  experiences,
  onOpenExperience,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLog[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'EXPERIENCE CLI v5.0 // CAREER & SYSTEMS TELEMETRY ONLINE',
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Type "help" to inspect engineering journey milestones.',
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    setHistory((prev) => [
      ...prev,
      { id: `cmd-${Date.now()}`, type: 'cmd', text: `> ${cmd}` },
    ]);
    setInputVal('');

    if (cmd === 'help') {
      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: 'output',
          text: `AVAILABLE COMMANDS:
  help        - Show available commands
  experience  - List all 5 career milestones & roles
  adani       - Open Adani Enterprises Cybersecurity Internship
  jic         - Open JECRC Incubation Centre Core Team
  techsaksham - Open TechSaksham AI Learning Initiative
  codealpha   - Open CodeAlpha C++ Virtual Internship
  systems     - Open Systems & Product Engineering milestone
  clear       - Clear terminal output`,
        },
      ]);
    } else if (cmd === 'experience') {
      const list = experiences
        .map(
          (exp) =>
            `[${exp.number}]  • ${exp.role} (${exp.company}) — ${exp.classification}`
        )
        .join('\n');
      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: 'output',
          text: `ENGINEERING MILESTONES:\n${list}\n\nType a milestone command (e.g. "adani") to launch case study.`,
        },
      ]);
    } else if (cmd === 'adani') {
      onOpenExperience('adani');
      setHistory((prev) => [
        ...prev,
        { id: `out-${Date.now()}`, type: 'output', text: '>> Launching Adani Cybersecurity Operations Panel...' },
      ]);
    } else if (cmd === 'jic') {
      onOpenExperience('jic');
      setHistory((prev) => [
        ...prev,
        { id: `out-${Date.now()}`, type: 'output', text: '>> Launching JIC Startup Ecosystem Panel...' },
      ]);
    } else if (cmd === 'techsaksham') {
      onOpenExperience('techsaksham');
      setHistory((prev) => [
        ...prev,
        { id: `out-${Date.now()}`, type: 'output', text: '>> Launching TechSaksham AI Learning Matrix...' },
      ]);
    } else if (cmd === 'codealpha') {
      onOpenExperience('codealpha');
      setHistory((prev) => [
        ...prev,
        { id: `out-${Date.now()}`, type: 'output', text: '>> Launching CodeAlpha C++ Code Modules...' },
      ]);
    } else if (cmd === 'systems') {
      onOpenExperience('systems');
      setHistory((prev) => [
        ...prev,
        { id: `out-${Date.now()}`, type: 'output', text: '>> Launching Systems Engineering Milestone...' },
      ]);
    } else if (cmd === 'clear') {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          type: 'err',
          text: `Command not found: "${cmd}". Type "help" for valid options.`,
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Minimized Trigger */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          data-cursor="CLI"
          aria-label="Open Experience CLI"
          className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-cyan-500/40 bg-[#070e1c]/90 backdrop-blur-xl text-cyan-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all duration-300 cursor-pointer shadow-2xl"
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <Terminal className="w-4 h-4 text-cyan-400 group-hover:rotate-6 transition-transform" />
          <span className="font-ibm text-xs font-semibold tracking-wider">
            JOURNEY CLI
          </span>
          <span className="font-mono text-[10px] text-cyan-400/80 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
            &gt;_
          </span>
        </button>
      )}

      {/* Expanded Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[440px] rounded-2xl border border-cyan-500/40 bg-[#060c18]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="px-4 py-2.5 bg-[#091326] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-ibm text-xs font-bold text-slate-200 tracking-wider">
                ENGINEERING JOURNEY CLI // v5.0
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setHistory([])}
                className="p-1 rounded text-slate-400 hover:text-white font-mono text-[10px]"
              >
                CLS
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Buttons */}
          <div className="px-3 py-1.5 bg-[#050a14] border-b border-white/5 flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
            <span className="text-slate-500">RUN:</span>
            {['help', 'experience', 'adani', 'jic', 'techsaksham', 'codealpha', 'systems'].map(
              (c) => (
                <button
                  key={c}
                  onClick={() => {
                    setInputVal(c);
                  }}
                  className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-900/60 hover:border-cyan-400 transition-colors"
                >
                  {c}
                </button>
              )
            )}
          </div>

          {/* Logs */}
          <div
            ref={scrollRef}
            className="p-3.5 h-52 overflow-y-auto space-y-2 font-mono text-[11px] text-slate-300 custom-scrollbar leading-relaxed"
          >
            {history.map((log) => (
              <div key={log.id} className="whitespace-pre-wrap">
                {log.type === 'cmd' && (
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
                {log.type === 'err' && (
                  <div className="text-red-400">{log.text}</div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
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
              placeholder="type a milestone command..."
              className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600"
            />
            <span className="w-1.5 h-3.5 bg-cyan-400 animate-pulse inline-block" />
          </form>
        </div>
      )}
    </div>
  );
};
