import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const bootMessages = [
  '> Loading developer profile...',
  '> Loading projects...',
  '> Initializing AI modules...',
  '> Initializing analytics engine...',
  '> Initializing security systems...',
  '> Connecting cloud services...',
  '> Establishing workspace...',
];

const progressSteps = [0, 12, 27, 41, 58, 73, 89, 100];

interface EntranceAnimationProps {
  onAnimationComplete: () => void;
  replayTrigger?: number;
}

export const EntranceAnimation: React.FC<EntranceAnimationProps> = ({
  onAnimationComplete,
  replayTrigger = 0,
}) => {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lightGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset state on trigger
    setTypedLines([]);
    setCurrentProgress(0);
    setIsReady(false);
    setShowScrollPrompt(false);

    if (overlayRef.current) {
      gsap.set(overlayRef.current, { display: 'flex', opacity: 1 });
    }
    if (terminalRef.current) {
      gsap.set(terminalRef.current, { scale: 1, opacity: 1 });
    }
    if (gridRef.current) {
      gsap.set(gridRef.current, { scale: 1, opacity: 0.15 });
    }
    if (lightGlowRef.current) {
      gsap.set(lightGlowRef.current, { scale: 0.2, opacity: 0 });
    }

    // Sequential line typing with natural delays
    let currentLine = 0;
    const lineIntervals = [200, 240, 220, 260, 230, 250, 210];

    const typeNextLine = () => {
      if (currentLine < bootMessages.length) {
        const msg = bootMessages[currentLine];
        setTypedLines((prev) => [...prev, msg]);
        setCurrentProgress(progressSteps[currentLine + 1] || 100);
        currentLine++;
        if (currentLine < bootMessages.length) {
          setTimeout(typeNextLine, lineIntervals[currentLine] || 250);
        } else {
          // Reached 100%
          setCurrentProgress(100);
          setIsReady(true);
          // 400ms silent pause before cinematic transition
          setTimeout(runCinematicTransition, 450);
        }
      }
    };

    // Initial delay before first line
    const startTimer = setTimeout(typeNextLine, 350);

    return () => clearTimeout(startTimer);
  }, [replayTrigger]);

  const runCinematicTransition = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setShowScrollPrompt(true);
        onAnimationComplete();
      },
    });

    // Step 1: Terminal begins scaling down (1 -> 0.85)
    tl.to(terminalRef.current, {
      scale: 0.85,
      opacity: 0,
      duration: 0.65,
      ease: 'power2.inOut',
    });

    // Step 2: Background grid expands outward
    tl.to(
      gridRef.current,
      {
        scale: 1.4,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.4'
    );

    // Step 3 & 4: Soft cyan light appears behind terminal and expands across the screen
    tl.to(
      lightGlowRef.current,
      {
        scale: 4,
        opacity: 0.8,
        duration: 0.7,
        ease: 'power2.in',
      },
      '-=0.6'
    );

    tl.to(lightGlowRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Fade out overlay revealing the prepared workspace underneath
    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.display = 'none';
          }
        },
      },
      '-=0.3'
    );

    // Layered Reveal Choreography on the Workspace Elements
    // 1. Background environment zoom & unblur (camera forward)
    tl.fromTo(
      '#workspace-bg-image',
      { scale: 1.18, filter: 'blur(16px)' },
      { scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
      '-=0.8'
    );

    // 2. Left navigation slides in
    tl.fromTo(
      'aside.glass-sidebar',
      { xPercent: -100, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.9'
    );

    // 3. Top status bar drops in
    tl.fromTo(
      'header.glass-topbar',
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.7'
    );

    // 4. Hero typography renders with blur -> sharp & scale
    tl.fromTo(
      '#hero-greeting',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.6'
    );

    tl.fromTo(
      '#hero-name-heading',
      { opacity: 0, scale: 0.96, filter: 'blur(12px)', letterSpacing: '0.05em' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', letterSpacing: '-0.02em', duration: 0.9, ease: 'power3.out' },
      '-=0.5'
    );

    tl.fromTo(
      '#hero-subtitle',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.4'
    );

    tl.fromTo(
      '#hero-description',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );

    // 5. Capability domain tags
    tl.fromTo(
      '#hero-domain-pills span',
      { opacity: 0, scale: 0.85, y: 8 },
      { opacity: 1, scale: 1, y: 0, stagger: 0.08, duration: 0.4, ease: 'back.out(1.5)' },
      '-=0.3'
    );

    // 6. CTA buttons
    tl.fromTo(
      '#hero-cta-buttons button, #hero-cta-buttons a',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );

    // 7. System Status panel materializes
    tl.fromTo(
      '#system-status-panel',
      { opacity: 0, scale: 0.92, y: -10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.5'
    );

    // 8. Middle cards (Featured Project, Skills Matrix, Terminal)
    tl.fromTo(
      '#dashboard-mid-cards > div',
      { opacity: 0, y: 25, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.12, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    );

    // 9. Bottom cards (Quick Stats, Recent Activity, Journey Card)
    tl.fromTo(
      '#dashboard-bottom-cards > div',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    );
  };

  const blockCount = 28;
  const filledBlocks = Math.floor((currentProgress / 100) * blockCount);
  const emptyBlocks = blockCount - filledBlocks;
  const barString = `${'█'.repeat(filledBlocks)}${'░'.repeat(emptyBlocks)}`;

  return (
    <>
      {/* Full-screen Cinematic Boot Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070e] select-none overflow-hidden"
      >
        {/* Subtle Dark Blue Ambient Glow */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-900/15 blur-[160px] pointer-events-none" />

        {/* Fine Grid Background */}
        <div ref={gridRef} className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

        {/* Faint Scanline & Digital Noise Overlay */}
        <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-30" />

        {/* Soft Cyan Light Burst behind terminal */}
        <div
          ref={lightGlowRef}
          className="absolute w-72 h-72 rounded-full bg-cyan-400/40 blur-[80px] pointer-events-none opacity-0"
        />

        {/* Technical Terminal Box */}
        <div
          ref={terminalRef}
          className="relative w-full max-w-lg glass-panel rounded-2xl p-7 sm:p-8 border border-cyan-500/30 shadow-cyan-glow-lg flex flex-col gap-5 backdrop-blur-2xl bg-[#070b16fa] mx-4"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 font-mono">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              <span className="font-display font-bold text-xs tracking-widest text-slate-200 ml-2">
                NIKUNJ.OS
              </span>
            </div>
            <span className="text-[10px] text-portfolio-accent tracking-widest font-semibold uppercase">
              {isReady ? 'READY' : 'BOOT://SYS_INIT'}
            </span>
          </div>

          {/* Subtitle */}
          <div className="font-mono text-xs text-slate-400 tracking-wider">
            INITIALIZING DIGITAL ENVIRONMENT...
          </div>

          {/* Sequential System Logs */}
          <div className="h-44 flex flex-col justify-start gap-1.5 font-mono text-xs text-slate-300 pr-1 overflow-hidden">
            {typedLines.map((line, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-cyan-300 font-mono">{line}</span>
              </div>
            ))}
            {!isReady && (
              <div className="flex items-center gap-1 text-portfolio-accent pt-0.5">
                <span className="w-2 h-3.5 bg-portfolio-accent animate-pulse inline-block" />
              </div>
            )}
          </div>

          {/* Progress Bar & Status */}
          <div className="flex flex-col gap-2 pt-3 border-t border-cyan-500/20 font-mono">
            <div className="flex items-center justify-between text-[11px] tracking-wider text-slate-400">
              <span>SYSTEM INITIALIZATION</span>
              <span className="text-emerald-400 font-bold">{currentProgress}%</span>
            </div>
            <div className="text-emerald-400 text-xs sm:text-sm tracking-tighter break-all">
              {barString}
            </div>
            <div className="flex items-center justify-between pt-1 text-[11px]">
              <span className="text-slate-500">CORE STATUS:</span>
              <span className={`font-bold tracking-wider ${isReady ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`}>
                {isReady ? 'STATUS: READY' : 'PROCESSING...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Subtle "SCROLL TO EXPLORE ↓" Indicator */}
      {showScrollPrompt && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 xl:left-[calc(50%+8rem)] z-30 pointer-events-none flex flex-col items-center gap-1.5 animate-bounce">
          <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-300/90 font-medium">
            SCROLL TO EXPLORE &darr;
          </span>
          <span className="w-1 h-3 bg-portfolio-accent/60 rounded-full shadow-[0_0_8px_#00f0ff]" />
        </div>
      )}
    </>
  );
};
