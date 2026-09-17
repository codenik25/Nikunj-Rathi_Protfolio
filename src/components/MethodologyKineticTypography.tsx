import React, { useState, useEffect, useRef, useMemo } from 'react';

export interface MethodologyKeyword {
  word: string;
  contextLabel: string;
  gradientClass: string;
  gradientStyle: React.CSSProperties;
  glowColor: string;
  cursorColor: string;
}

export const METHODOLOGY_KEYWORDS: MethodologyKeyword[] = [
  {
    word: 'ANALYZE.',
    contextLabel: 'DATA & INSIGHTS',
    gradientClass: 'from-[#3ec6ff] via-[#38bdf8] to-[#3b82f6]',
    gradientStyle: {
      backgroundImage: 'linear-gradient(135deg, #3ec6ff 0%, #38bdf8 50%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
    },
    glowColor: 'rgba(62, 198, 255, 0.4)',
    cursorColor: '#3ec6ff',
  },
  {
    word: 'BUILD.',
    contextLabel: 'SOFTWARE SYSTEMS',
    gradientClass: 'from-[#38bdf8] via-[#3b82f6] to-[#8b7bff]',
    gradientStyle: {
      backgroundImage: 'linear-gradient(135deg, #38bdf8 0%, #3b82f6 50%, #8b7bff 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
    },
    glowColor: 'rgba(59, 130, 246, 0.4)',
    cursorColor: '#60a5fa',
  },
  {
    word: 'CREATE.',
    contextLabel: 'DIGITAL PRODUCTS',
    gradientClass: 'from-[#8b7bff] via-[#a78bfa] to-[#c084fc]',
    gradientStyle: {
      backgroundImage: 'linear-gradient(135deg, #8b7bff 0%, #a78bfa 50%, #c084fc 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
    },
    glowColor: 'rgba(139, 123, 255, 0.4)',
    cursorColor: '#a78bfa',
  },
  {
    word: 'AUTOMATE.',
    contextLabel: 'SECURITY WORKFLOWS',
    gradientClass: 'from-[#2dd4bf] via-[#3ec6ff] to-[#38bdf8]',
    gradientStyle: {
      backgroundImage: 'linear-gradient(135deg, #2dd4bf 0%, #3ec6ff 50%, #38bdf8 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
    },
    glowColor: 'rgba(45, 212, 191, 0.4)',
    cursorColor: '#2dd4bf',
  },
  {
    word: 'DESIGN.',
    contextLabel: 'SYSTEM ARCHITECTURES',
    gradientClass: 'from-[#38bdf8] via-[#3b82f6] to-[#6366f1]',
    gradientStyle: {
      backgroundImage: 'linear-gradient(135deg, #38bdf8 0%, #3b82f6 50%, #6366f1 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
    },
    glowColor: 'rgba(56, 189, 248, 0.4)',
    cursorColor: '#38bdf8',
  },
  {
    word: 'DEPLOY.',
    contextLabel: 'CLOUD & PLATFORMS',
    gradientClass: 'from-[#818cf8] via-[#8b7bff] to-[#c084fc]',
    gradientStyle: {
      backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #8b7bff 50%, #c084fc 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
    },
    glowColor: 'rgba(129, 140, 248, 0.4)',
    cursorColor: '#818cf8',
  },
  {
    word: 'ENGINEER.',
    contextLabel: 'ROBUST COMPUTING',
    gradientClass: 'from-[#3ec6ff] via-[#06b6d4] to-[#2dd4bf]',
    gradientStyle: {
      backgroundImage: 'linear-gradient(135deg, #3ec6ff 0%, #06b6d4 50%, #2dd4bf 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
    },
    glowColor: 'rgba(62, 198, 255, 0.4)',
    cursorColor: '#3ec6ff',
  },
  {
    word: 'SOLVE.',
    contextLabel: 'COMPLEX PROBLEMS',
    gradientClass: 'from-[#60a5fa] via-[#3b82f6] to-[#3ec6ff]',
    gradientStyle: {
      backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #3ec6ff 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
    },
    glowColor: 'rgba(96, 165, 250, 0.4)',
    cursorColor: '#60a5fa',
  },
];

type AnimationPhase = 'typing' | 'holding' | 'erasing' | 'paused';

export const MethodologyKineticTypography: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedLength, setDisplayedLength] = useState(0);
  const [phase, setPhase] = useState<AnimationPhase>('typing');
  const [isPulsing, setIsPulsing] = useState(false);
  const [inView, setInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const currentKeyword = METHODOLOGY_KEYWORDS[wordIndex];
  const targetWord = currentKeyword.word;

  // Check prefers-reduced-motion with dynamic DevTools emulation support
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const searchParams = new URLSearchParams(window.location.search);
    const motionParam = searchParams.get('motion');
    const reducedParam = searchParams.get('reduced-motion');

    if (reducedParam === 'true') {
      setPrefersReducedMotion(true);
    } else if (motionParam === 'true' || reducedParam === 'false') {
      setPrefersReducedMotion(false);
    }

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // IntersectionObserver to pause when out of view, resume when back in view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Main continuous typing / holding / erasing loop
  useEffect(() => {
    if (prefersReducedMotion) {
      setWordIndex(0);
      setDisplayedLength(METHODOLOGY_KEYWORDS[0].word.length);
      return;
    }

    if (!inView) {
      return; // Paused while out of view
    }

    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (displayedLength < targetWord.length) {
        timeoutId = setTimeout(() => {
          setDisplayedLength((prev) => prev + 1);
        }, 42); // 42ms per character (within 35–55ms)
      } else {
        // Typing finished! Pulse briefly (250ms), then hold
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 250);
        setPhase('holding');
      }
    } else if (phase === 'holding') {
      // Hold for 1100ms (within 900–1400ms)
      timeoutId = setTimeout(() => {
        setPhase('erasing');
      }, 1100);
    } else if (phase === 'erasing') {
      if (displayedLength > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedLength((prev) => prev - 1);
        }, 36); // 36ms per character (within 30–45ms)
      } else {
        // Erasing complete! Short pause before next word
        setPhase('paused');
      }
    } else if (phase === 'paused') {
      // Pause for 200ms (within 150–250ms) before typing next word
      timeoutId = setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % METHODOLOGY_KEYWORDS.length);
        setPhase('typing');
      }, 200);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [phase, displayedLength, targetWord, inView, prefersReducedMotion]);

  const visibleWord = targetWord.slice(0, displayedLength);

  // Transition style during erasing: subtle leftward translation and opacity easing
  const isErasing = phase === 'erasing';
  const eraseProgress = targetWord.length > 0 ? displayedLength / targetWord.length : 1;

  return (
    <div
      ref={containerRef}
      className="mt-20 flex flex-col items-center justify-center text-center select-none w-full"
    >
      {/* Keyframe animation for kinetic cursor and glow pulse */}
      <style>{`
        @keyframes kineticCursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .kinetic-cursor-blink {
          animation: kineticCursorBlink 550ms ease-in-out infinite;
        }
      `}</style>

      {/* Section Label: METHODOLOGY IN MOTION */}
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3ec6ff] animate-pulse" />
        <span className="font-sans text-xs font-semibold text-[#3ec6ff] tracking-[0.14em] uppercase">
          METHODOLOGY IN MOTION
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#3ec6ff] animate-pulse" />
      </div>

      {/* Main Kinetic Typography Display Area (Layout-locked with zero jumping) */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[120px] sm:min-h-[160px] lg:min-h-[200px]">
        {/* Invisible Layout Ghost: Locks maximum width & height of longest word (AUTOMATE. / ENGINEER.) so nothing shifts */}
        <div
          className="invisible select-none pointer-events-none opacity-0 font-display font-bold uppercase tracking-tight text-[clamp(70px,9vw,150px)] leading-[0.95]"
          aria-hidden="true"
        >
          AUTOMATE.|
        </div>

        {/* Active Centered Animated Keyword */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: isErasing ? 'translateX(-6px)' : 'translateX(0)',
          }}
        >
          <div className="flex items-center justify-center whitespace-pre">
            <h3
              id="kinetic-active-keyword"
              data-testid="kinetic-active-keyword"
              className="inline-block bg-clip-text text-transparent font-display font-bold uppercase tracking-tight text-[clamp(70px,9vw,150px)] leading-[0.95] transition-all duration-200"
              style={{
                ...currentKeyword.gradientStyle,
                filter: isPulsing
                  ? `drop-shadow(0 0 35px ${currentKeyword.glowColor}) drop-shadow(0 0 70px ${currentKeyword.glowColor}) brightness(1.25)`
                  : `drop-shadow(0 0 20px ${currentKeyword.glowColor}) brightness(1)`,
                opacity: isErasing ? Math.max(0.35, eraseProgress) : 1,
              }}
            >
              {visibleWord}
            </h3>

            {/* Continuous Thin Blinking Cursor */}
            <span
              id="kinetic-blinking-cursor"
              data-testid="kinetic-blinking-cursor"
              className="inline-block w-[3.5px] sm:w-[5px] lg:w-[6px] h-[clamp(52px,6.8vw,110px)] ml-2 sm:ml-3 kinetic-cursor-blink transition-colors duration-300 select-none rounded-full"
              style={{
                backgroundColor: currentKeyword.cursorColor,
                boxShadow: `0 0 12px ${currentKeyword.cursorColor}, 0 0 24px ${currentKeyword.cursorColor}`,
              }}
              aria-hidden="true"
            />
          </div>

          {/* Contextual Sub-label: Fades smoothly with the active word */}
          <div
            className="mt-3 font-sans text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase text-slate-400 transition-opacity duration-300"
            style={{
              opacity: phase === 'holding' ? 0.9 : phase === 'typing' && displayedLength > 3 ? 0.6 : 0.2,
            }}
          >
            {currentKeyword.contextLabel}
          </div>
        </div>
      </div>
    </div>
  );
};
