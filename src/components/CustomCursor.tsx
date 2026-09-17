import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export type CursorMode = 'default' | 'text' | 'nav' | 'project' | 'terminal' | 'external' | 'explore' | 'custom';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailingRingRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [labelText, setLabelText] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device or mobile screen
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cursor = cursorRef.current;
    const trailingRing = trailingRingRef.current;
    if (!cursor || !trailingRing) return;

    // Set initial position off-screen
    gsap.set([cursor, trailingRing], {
      xPercent: -50,
      yPercent: -50,
      x: -100,
      y: -100,
    });

    // High performance GSAP quickTo setters for 120fps direct DOM manipulation
    const xToMain = gsap.quickTo(cursor, 'x', { duration: 0.05, ease: 'power3' });
    const yToMain = gsap.quickTo(cursor, 'y', { duration: 0.05, ease: 'power3' });

    const xToTrail = gsap.quickTo(trailingRing, 'x', {
      duration: prefersReducedMotion ? 0.05 : 0.18,
      ease: 'power2.out',
    });
    const yToTrail = gsap.quickTo(trailingRing, 'y', {
      duration: prefersReducedMotion ? 0.05 : 0.18,
      ease: 'power2.out',
    });

    let currentMode: CursorMode = 'default';
    let currentLabel = '';

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      xToMain(mouseX);
      yToMain(mouseY);
      xToTrail(mouseX);
      yToTrail(mouseY);

      if (!isVisible) {
        setIsVisible(true);
      }

      // Check element under cursor for interaction mode
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check for explicit data-cursor attributes
      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      const navTarget = target.closest('[data-cursor="nav"], button[data-nav], nav button') as HTMLElement | null;
      const projectTarget = target.closest('[data-cursor="project"], .project-expand-frame') as HTMLElement | null;
      const terminalTarget = target.closest('[data-cursor="terminal"], #interactive-terminal, .terminal-window') as HTMLElement | null;
      const exploreTarget = target.closest('[data-cursor="explore"], #hero-explore-btn') as HTMLElement | null;
      const externalLink = target.closest('a[target="_blank"], [data-cursor="external"]') as HTMLElement | null;
      const textTarget = target.closest('p, h1, h2, h3, blockquote, .cursor-text-target') as HTMLElement | null;
      const buttonTarget = target.closest('button, a') as HTMLElement | null;

      let nextMode: CursorMode = 'default';
      let nextLabel = '';

      if (exploreTarget) {
        nextMode = 'explore';
        nextLabel = 'ENTER ↓';
      } else if (projectTarget) {
        nextMode = 'project';
        nextLabel = 'VIEW';
      } else if (terminalTarget) {
        nextMode = 'terminal';
        nextLabel = 'TYPE';
      } else if (externalLink) {
        nextMode = 'external';
        nextLabel = 'OPEN ↗';
      } else if (navTarget) {
        nextMode = 'nav';
        nextLabel = '';
      } else if (cursorTarget) {
        const val = cursorTarget.getAttribute('data-cursor') || '';
        if (val === 'text') {
          nextMode = 'text';
        } else if (val) {
          nextMode = 'custom';
          nextLabel = val;
        }
      } else if (buttonTarget) {
        nextMode = 'nav';
      } else if (textTarget && !target.closest('button, a, input, textarea')) {
        nextMode = 'text';
      } else {
        nextMode = 'default';
        nextLabel = '';
      }

      if (nextMode !== currentMode || nextLabel !== currentLabel) {
        currentMode = nextMode;
        currentLabel = nextLabel;
        setCursorMode(nextMode);
        setLabelText(nextLabel);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch) return null;

  // Determine styles according to current mode:
  // Default: Small circular cursor ● with a subtle cyan glow
  // Text: Cursor slightly enlarges ○
  // Nav: Interactive indicator ◉
  // Project: VIEW
  // Terminal: TYPE
  // External: OPEN ↗
  // Explore: ENTER ↓
  const hasLabel = Boolean(labelText);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[100] overflow-hidden select-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. SOFT DELAYED TRAILING RING */}
      <div
        ref={trailingRingRef}
        className="fixed top-0 left-0 flex items-center justify-center will-change-transform pointer-events-none transition-[width,height,border-color,background-color,box-shadow] duration-200 ease-out"
        style={{
          width: hasLabel
            ? '62px'
            : cursorMode === 'nav'
            ? '28px'
            : cursorMode === 'text'
            ? '22px'
            : '18px',
          height: hasLabel
            ? '24px'
            : cursorMode === 'nav'
            ? '28px'
            : cursorMode === 'text'
            ? '22px'
            : '18px',
          borderRadius: hasLabel ? '9999px' : '50%',
          border:
            cursorMode === 'text'
              ? '1px solid rgba(62, 198, 255, 0.5)'
              : cursorMode === 'nav'
              ? '1.5px solid rgba(62, 198, 255, 0.7)'
              : hasLabel
              ? '1px solid rgba(62, 198, 255, 0.6)'
              : '1px solid rgba(62, 198, 255, 0.35)',
          backgroundColor: hasLabel
            ? 'rgba(5, 10, 20, 0.88)'
            : cursorMode === 'nav'
            ? 'rgba(62, 198, 255, 0.08)'
            : 'rgba(62, 198, 255, 0.02)',
          boxShadow:
            hasLabel
              ? '0 0 16px rgba(62, 198, 255, 0.25), inset 0 0 8px rgba(62, 198, 255, 0.1)'
              : cursorMode === 'nav'
              ? '0 0 14px rgba(62, 198, 255, 0.4)'
              : '0 0 10px rgba(62, 198, 255, 0.15)',
          backdropFilter: hasLabel ? 'blur(8px)' : 'none',
        }}
      >
        {/* Contextual Pill Label (Manrope, elegant small font) */}
        {hasLabel && (
          <span
            ref={labelRef}
            className="font-sans text-[10px] font-bold tracking-[0.06em] text-[#3ec6ff] uppercase whitespace-nowrap px-2 select-none"
          >
            {labelText}
          </span>
        )}
      </div>

      {/* 2. MAIN CENTER CURSOR */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 will-change-transform pointer-events-none flex items-center justify-center"
      >
        {/* The small central dot ● */}
        <div
          className="rounded-full transition-all duration-150 ease-out"
          style={{
            width:
              hasLabel
                ? '0px'
                : cursorMode === 'text'
                ? '0px'
                : cursorMode === 'nav'
                ? '6px'
                : '5px',
            height:
              hasLabel
                ? '0px'
                : cursorMode === 'text'
                ? '0px'
                : cursorMode === 'nav'
                ? '6px'
                : '5px',
            backgroundColor: '#3ec6ff',
            opacity: hasLabel || cursorMode === 'text' ? 0 : 1,
            boxShadow: '0 0 8px #3ec6ff, 0 0 16px rgba(62, 198, 255, 0.8)',
          }}
        />
      </div>
    </div>
  );
};
