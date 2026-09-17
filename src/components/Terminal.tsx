import React, { useState, useRef, useEffect } from 'react';
import { profileData } from '../data/profile';

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    'nikunj@portfolio:~$ system --status',
    'System ready.',
    'Type "help" to see available commands.',
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let response = '';

    switch (trimmedCmd) {
      case 'help':
        response = `Available commands:
  help       - Show this message
  about      - Display basic profile info
  projects   - Navigate to projects
  skills     - View technical skills
  experience - View timeline
  contact    - Connect options
  clear      - Clear terminal output
  whoami     - Identify user`;
        break;
      case 'about':
        response = `${profileData.name}\n${profileData.role}\n${profileData.about.degree} at ${profileData.about.university}`;
        break;
      case 'whoami':
        response = profileData.name;
        break;
      case 'projects':
        window.location.hash = '#projects';
        response = 'Navigating to projects...';
        break;
      case 'skills':
        window.location.hash = '#skills';
        response = 'Navigating to skills...';
        break;
      case 'experience':
        window.location.hash = '#experience';
        response = 'Navigating to experience...';
        break;
      case 'contact':
        window.location.hash = '#contact';
        response = 'Navigating to contact...';
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        break;
      default:
        response = `Command not found: ${trimmedCmd}. Type 'help' to see available commands.`;
    }

    setHistory((prev) => [
      ...prev,
      `nikunj@portfolio:~$ ${cmd}`,
      ...(response ? response.split('\n') : [])
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div 
      className="glass-panel rounded-lg overflow-hidden font-mono text-sm w-full max-w-2xl mx-auto interactive cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="bg-[#1a1b26] border-b border-[#292e42] px-4 py-2 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-[#a9b1d6] text-xs ml-2 opacity-50 flex-1 text-center pr-8">
          nikunj@portfolio ~ /sys
        </div>
      </div>
      <div 
        ref={containerRef}
        className="p-4 h-[250px] overflow-y-auto text-portfolio-light/80"
      >
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap leading-relaxed">
            {line.startsWith('nikunj@portfolio:~$') ? (
              <span className="text-portfolio-success">{line}</span>
            ) : (
              line
            )}
          </div>
        ))}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-portfolio-success">nikunj@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-portfolio-light"
            spellCheck={false}
            autoComplete="off"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};
