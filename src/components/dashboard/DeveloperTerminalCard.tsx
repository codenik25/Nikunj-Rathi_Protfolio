import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import { profileData } from '../../data/profile';
import { projects } from '../../data/projects';

export const DeveloperTerminalCard: React.FC = () => {
  const [history, setHistory] = useState<Array<{ command: string; output: string | React.ReactNode }>>([
    {
      command: 'whoami',
      output: (
        <div className="text-slate-300">
          <div>{profileData.name}</div>
          <div className="text-slate-400">Final Year CSE | {profileData.education.institution}</div>
        </div>
      )
    },
    {
      command: 'focus',
      output: (
        <div className="text-portfolio-accent/90">
          <div>&gt; Software Engineering</div>
          <div>&gt; Data Analytics</div>
          <div>&gt; Artificial Intelligence</div>
          <div>&gt; Cybersecurity</div>
        </div>
      )
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let output: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div className="text-slate-300 grid grid-cols-2 gap-1 text-[11px]">
            <div><span className="text-cyan-400">whoami</span> - Developer identity</div>
            <div><span className="text-cyan-400">focus</span> - Engineering pillars</div>
            <div><span className="text-cyan-400">projects</span> - View project inventory</div>
            <div><span className="text-cyan-400">skills</span> - Core technologies</div>
            <div><span className="text-cyan-400">contact</span> - Communication channels</div>
            <div><span className="text-cyan-400">clear</span> - Clear terminal session</div>
          </div>
        );
        break;
      case 'whoami':
        output = `${profileData.name} — ${profileData.role} (${profileData.location})`;
        break;
      case 'focus':
        output = (
          <div className="text-portfolio-accent/90">
            <div>&gt; Software Engineering &amp; Distributed Systems</div>
            <div>&gt; Data Analytics &amp; ETL Pipelines</div>
            <div>&gt; Applied Artificial Intelligence &amp; NLP</div>
            <div>&gt; Cybersecurity &amp; Network Automation</div>
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="text-slate-300">
            {projects.map((p, i) => (
              <div key={i}>[{p.number}] {p.title} - {p.category}</div>
            ))}
          </div>
        );
        break;
      case 'skills':
        output = 'Python, C/C++, JavaScript, React, Next.js, PostgreSQL, Azure, Google Cloud, Docker, Git';
        break;
      case 'contact':
        output = `Email: ${profileData.contact.email} | GitHub: ${profileData.contact.github}`;
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        output = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { command: inputVal, output }]);
    setInputVal('');
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="glass-panel rounded-2xl p-5 flex flex-col justify-between border border-cyan-500/20 hover:border-cyan-500/35 transition-all duration-300 shadow-cyan-glow bg-[#080d1af5] cursor-text"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-cyan-500/10 text-portfolio-accent">
            <TerminalIcon className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono text-xs font-semibold tracking-wider text-slate-200">
            Developer Terminal
          </span>
        </div>

        <div className="flex items-center gap-1 font-mono text-[11px] text-slate-400">
          <span>Try typing: <span className="text-portfolio-accent">help</span></span>
          <ChevronRight className="w-3 h-3 text-slate-500" />
        </div>
      </div>

      {/* Terminal Screen / History */}
      <div className="my-2.5 h-48 overflow-y-auto font-mono text-xs text-slate-300 space-y-2.5 pr-1 scanline-overlay">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <span className="text-emerald-400">nikunj@portfolio</span>
              <span className="text-slate-500">:</span>
              <span className="text-purple-400">~</span>
              <span className="text-slate-400">$</span>
              <span className="text-white">{item.command}</span>
            </div>
            <div className="pl-4 text-[11px] text-slate-300 leading-relaxed font-mono">
              {item.output}
            </div>
          </div>
        ))}

        {/* Current prompt input */}
        <form onSubmit={handleCommand} className="flex items-center gap-1.5 text-cyan-400 pt-1">
          <span className="text-emerald-400">nikunj@portfolio</span>
          <span className="text-slate-500">:</span>
          <span className="text-purple-400">~</span>
          <span className="text-slate-400">$</span>
          <input
            ref={inputRef}
            type="text"
            id="terminal-input"
            name="terminal-command"
            aria-label="Terminal command prompt"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent text-white text-xs font-mono outline-none border-none p-0 focus:ring-0"
            autoComplete="off"
            spellCheck="false"
            placeholder=""
          />
          <span className="w-2 h-3.5 bg-portfolio-accent animate-pulse inline-block" />
        </form>
        <div ref={bottomRef} />
      </div>

      {/* Bottom Hint */}
      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span>BASH v5.2 • ACTIVE SESSION</span>
        <span className="text-emerald-400">● RUNNING</span>
      </div>
    </div>
  );
};
