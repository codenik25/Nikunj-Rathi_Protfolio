import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2 } from 'lucide-react';

interface InteractiveConsoleProps {
  onNavigate: (sectionId: string) => void;
  activeChapter?: string;
}

interface HistoryLine {
  text: string;
  color?: string;
  isHeading?: boolean;
}

export const InteractiveConsole: React.FC<InteractiveConsoleProps> = ({
  onNavigate,
  activeChapter = 'hero',
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Detect mobile screen: auto-minimize on mobile so it does not obstruct the hero
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setIsMinimized(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Section change responsiveness: adapt terminal mode
  useEffect(() => {
    if (activeChapter === 'contact') {
      setIsMinimized(false);
    }
  }, [activeChapter]);

  // Initial load auto-type animation:
  // Shows prompt -> types 'help' -> displays available commands -> returns to active prompt
  useEffect(() => {
    const textToType = 'help';
    let currentIdx = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // Step 1: Initial load brief pause
    const t0 = setTimeout(() => {
      // Step 2: Typewriter for "help"
      const interval = setInterval(() => {
        currentIdx++;
        const partial = textToType.slice(0, currentIdx);
        setHistory([{ text: `nikunj@portfolio:~$ ${partial}`, color: '#3ec6ff' }]);

        if (currentIdx >= textToType.length) {
          clearInterval(interval);

          // Step 3: Print command list output
          const t1 = setTimeout(() => {
            setHistory([
              { text: 'nikunj@portfolio:~$ help', color: '#3ec6ff' },
              { text: 'available commands:', color: '#8a99b3', isHeading: true },
              { text: '  about        – developer profile & background', color: '#cbd5e1' },
              { text: '  skills       – interactive tech ecosystem', color: '#3ec6ff' },
              { text: '  projects     – full production gallery', color: '#cbd5e1' },
              { text: '  experience   – career timeline & milestones', color: '#cbd5e1' },
              { text: '  activity     – telemetry & commit heatmaps', color: '#cbd5e1' },
              { text: '  contact      – transmission relay & direct channels', color: '#cbd5e1' },
              { text: '  clear        – clear terminal buffer', color: '#8a99b3' },
            ]);
          }, 250);
          timeouts.push(t1);
        }
      }, 90);

      // Store interval cleanup
      timeouts.push(interval as unknown as ReturnType<typeof setTimeout>);
    }, 500);

    timeouts.push(t0);

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  // Auto-scroll terminal to bottom when history changes
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd || isExecuting) return;

    // Log the user prompt
    setHistory((prev) => [...prev, { text: `nikunj@portfolio:~$ ${raw}`, color: '#3ec6ff' }]);
    setInputValue('');

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    if (cmd === 'help') {
      setHistory((prev) => [
        ...prev,
        { text: 'available commands:', color: '#8a99b3', isHeading: true },
        { text: '  about        – developer profile & background', color: '#cbd5e1' },
        { text: '  skills       – interactive tech ecosystem', color: '#3ec6ff' },
        { text: '  projects     – full production gallery', color: '#cbd5e1' },
        { text: '  experience   – career timeline & milestones', color: '#cbd5e1' },
        { text: '  activity     – telemetry & commit heatmaps', color: '#cbd5e1' },
        { text: '  contact      – transmission relay & direct channels', color: '#cbd5e1' },
        { text: '  clear        – clear terminal buffer', color: '#8a99b3' },
      ]);
      return;
    }

    setIsExecuting(true);

    switch (cmd) {
      case 'projects':
        setHistory((prev) => [
          ...prev,
          { text: '> loading project archive...', color: '#8a99b3' },
          { text: '> 03 projects found.', color: '#3ec6ff' },
          { text: '  • InsightFlow AI      [Analytics & ETL Engine]', color: '#e2e8f0' },
          { text: '  • DocuMind AI         [RAG & Document Intelligence]', color: '#8b7bff' },
          { text: '  • SMS Spam Detection  [NLP Naive Bayes Classifier]', color: '#10b981' },
          { text: '> Navigating to Projects...', color: '#00ff88' },
        ]);
        setTimeout(() => {
          setIsExecuting(false);
          onNavigate('projects');
        }, 500);
        break;

      case 'skills':
        setHistory((prev) => [
          ...prev,
          { text: '> querying tech stack constellation...', color: '#8a99b3' },
          { text: '> 16 active nodes: Python, C++, React, SQL, Cloud, AI/ML', color: '#3ec6ff' },
          { text: '> Navigating to Skills...', color: '#00ff88' },
        ]);
        setTimeout(() => {
          setIsExecuting(false);
          onNavigate('skills');
        }, 450);
        break;

      case 'about':
        setHistory((prev) => [
          ...prev,
          { text: '> loading biography & telemetry...', color: '#8a99b3' },
          { text: '> Nikunj Rathi · CSE 2027 · Jaipur, India', color: '#3ec6ff' },
          { text: '> Navigating to About...', color: '#00ff88' },
        ]);
        setTimeout(() => {
          setIsExecuting(false);
          onNavigate('about');
        }, 450);
        break;

      case 'experience':
        setHistory((prev) => [
          ...prev,
          { text: '> querying git commit branch history...', color: '#8a99b3' },
          { text: '> verifying milestone commits...', color: '#3ec6ff' },
          { text: '> Navigating to Experience...', color: '#00ff88' },
        ]);
        setTimeout(() => {
          setIsExecuting(false);
          onNavigate('experience');
        }, 450);
        break;

      case 'activity':
        setHistory((prev) => [
          ...prev,
          { text: '> streaming telemetry & commit heatmaps...', color: '#8a99b3' },
          { text: '> 98.4% pipeline uptime confirmed', color: '#3ec6ff' },
          { text: '> Navigating to Activity...', color: '#00ff88' },
        ]);
        setTimeout(() => {
          setIsExecuting(false);
          onNavigate('activity');
        }, 450);
        break;

      case 'contact':
        setHistory((prev) => [
          ...prev,
          { text: '> opening encrypted transmission channel...', color: '#8a99b3' },
          { text: '> secure relay ready', color: '#3ec6ff' },
          { text: '> Navigating to Contact...', color: '#00ff88' },
        ]);
        setTimeout(() => {
          setIsExecuting(false);
          onNavigate('contact');
        }, 450);
        break;

      default:
        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            { text: `command not found: "${cmd}". Type 'help' for valid commands.`, color: '#f87171' },
          ]);
          setIsExecuting(false);
        }, 200);
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputValue);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        data-cursor="terminal"
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#050a14]/90 border border-[#3ec6ff]/40 text-[#3ec6ff] shadow-2xl backdrop-blur-md hover:bg-[#3ec6ff]/15 transition-all focus:outline-none cursor-pointer"
        aria-label="Open developer terminal"
      >
        <TerminalIcon className="w-4 h-4" />
        <span className="font-mono text-xs font-semibold">&gt;_ TERMINAL</span>
      </button>
    );
  }

  // Minimized Compact Bar
  if (isMinimized) {
    return (
      <div
        className="fixed bottom-8 right-8 z-50 pointer-events-auto"
        data-cursor="terminal"
      >
        <div
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#050a14]/95 border border-[#3ec6ff]/35 text-white shadow-2xl backdrop-blur-xl hover:border-[#3ec6ff] hover:shadow-[0_0_20px_rgba(62,198,255,0.3)] transition-all cursor-pointer font-mono text-xs group"
        >
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] group-hover:brightness-125 transition-all" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] group-hover:brightness-125 transition-all" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] group-hover:brightness-125 transition-all" />
          </div>

          <span className="text-[#3ec6ff] font-semibold">nikunj@portfolio:~</span>
          <span className="text-slate-400 text-[11px] hidden sm:inline">&gt; help</span>
          <Maximize2 className="w-3.5 h-3.5 text-[#3ec6ff] ml-1 group-hover:scale-110 transition-transform" />
        </div>
      </div>
    );
  }

  return (
    <div
      id="interactive-terminal"
      data-cursor="terminal"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-8 right-8 z-50 pointer-events-auto w-[calc(100vw-36px)] sm:w-[400px] md:w-[440px] select-none font-mono transition-all duration-300"
      style={{
        maxWidth: '440px',
      }}
    >
      {/* Floating Glass Terminal Window */}
      <div
        className={`relative rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-2xl ${
          isHovered
            ? 'border-[#3ec6ff]/70 bg-[#050a14]/98 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(62,198,255,0.3)]'
            : 'border-[#3ec6ff]/30 bg-[#050a14]/95 shadow-[0_15px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(62,198,255,0.12)]'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Top Cyan Accent Strip (Activates brightly on hover) */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3ec6ff] to-transparent transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0.35 }}
        />

        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a1020]/90 border-b border-[#3ec6ff]/15">
          {/* Prompt Label */}
          <div className="flex items-center gap-2">
            <TerminalIcon
              className={`w-3.5 h-3.5 transition-colors duration-200 ${
                isHovered ? 'text-white' : 'text-[#3ec6ff]'
              }`}
            />
            <span
              className={`font-bold text-xs tracking-wide transition-colors duration-200 ${
                isHovered ? 'text-white drop-shadow-[0_0_8px_rgba(62,198,255,0.8)]' : 'text-[#3ec6ff]'
              }`}
            >
              nikunj@portfolio:~
            </span>
          </div>

          {/* Window Action Controls & Traffic Lights */}
          <div className="flex items-center gap-3">
            {/* Minimize button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(true);
              }}
              className="text-slate-400 hover:text-white transition-colors focus:outline-none p-0.5"
              title="Minimize terminal"
              aria-label="Minimize terminal"
            >
              <Minimize2 className="w-3 h-3" />
            </button>

            {/* Traffic Lights (Hovering red, yellow, green subtly brightens with glow) */}
            <div className="flex items-center gap-1.5 pl-1.5 border-l border-white/10">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] hover:brightness-150 hover:shadow-[0_0_8px_#ff5f56] transition-all cursor-pointer"
                title="Close terminal"
              />
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(true);
                }}
                className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] hover:brightness-150 hover:shadow-[0_0_8px_#ffbd2e] transition-all cursor-pointer"
                title="Minimize"
              />
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(false);
                }}
                className="w-2.5 h-2.5 rounded-full bg-[#27c93f] hover:brightness-150 hover:shadow-[0_0_8px_#27c93f] transition-all cursor-pointer"
                title="Expand"
              />
            </div>
          </div>
        </div>

        {/* Terminal Output & Interactive Body */}
        <div
          ref={terminalBodyRef}
          className="p-3.5 sm:p-4 max-h-[250px] sm:max-h-[280px] overflow-y-auto text-xs leading-relaxed space-y-1.5 select-text"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(62,198,255,0.3) transparent',
          }}
        >
          {/* Command history output */}
          {history.map((item, idx) => (
            <div
              key={idx}
              className={`text-[11px] leading-relaxed ${item.isHeading ? 'font-bold mt-1' : ''}`}
              style={{ color: item.color || '#e2e8f0' }}
            >
              {item.text}
            </div>
          ))}

          {/* Clickable Quick Command Chips */}
          <div className="pt-2 pb-1 border-t border-white/5 grid grid-cols-3 gap-1 select-none">
            {['about', 'skills', 'projects', 'experience', 'activity', 'contact'].map((cmd) => (
              <button
                key={cmd}
                onClick={(e) => {
                  e.stopPropagation();
                  executeCommand(cmd);
                }}
                className="flex items-center justify-center px-2 py-1 rounded bg-[#0a1428]/70 hover:bg-[#3ec6ff]/20 border border-[#3ec6ff]/20 hover:border-[#3ec6ff]/60 text-[#3ec6ff] hover:text-white font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer focus:outline-none"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Interactive Prompt & Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span
              className={`font-bold text-xs whitespace-nowrap transition-colors duration-200 ${
                isHovered ? 'text-white drop-shadow-[0_0_6px_rgba(62,198,255,0.8)]' : 'text-[#3ec6ff]'
              }`}
            >
              nikunj@portfolio:~$
            </span>
            <input
              ref={inputRef}
              id="terminal-command-input"
              name="terminal-command"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isExecuting}
              placeholder={isExecuting ? 'running...' : 'type command...'}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs p-0 focus:ring-0 placeholder:text-slate-600 disabled:opacity-50"
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input"
            />
            {/* Blinking cursor that pulses faster when hovered */}
            <span
              className="w-1.5 h-3.5 bg-[#3ec6ff] inline-block"
              style={{
                animation: isHovered
                  ? 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  : 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
          </div>
        </div>

        {/* Terminal Footer Status Bar */}
        <div className="px-3.5 py-1.5 bg-[#03060c] border-t border-white/5 flex items-center justify-between text-[9px] text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ONLINE
          </span>
          <span className="text-slate-400 tracking-wider">PORTFOLIO v2.8.4</span>
        </div>
      </div>
    </div>
  );
};
