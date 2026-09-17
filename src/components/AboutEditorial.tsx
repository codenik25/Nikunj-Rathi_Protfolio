import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, ArrowUpRight, X } from 'lucide-react';
import { AcademicModal } from './AcademicModal';
import { MethodologyKineticTypography } from './MethodologyKineticTypography';

gsap.registerPlugin(ScrollTrigger);

interface InteractiveKeywordProps {
  keyword: string;
  accent: string;
  glow: string;
}

const InteractiveKeyword: React.FC<InteractiveKeywordProps> = ({ keyword, accent, glow }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="EXPLORE"
      className="relative inline-block font-semibold cursor-pointer select-none transition-all duration-300 ease-out mx-0.5"
      style={{
        color: isHovered ? accent : '#ffffff',
        transform: isHovered ? 'translateY(-2px) scale(1.04)' : 'translateY(0) scale(1)',
        textShadow: isHovered ? `0 0 16px ${glow}` : 'none',
      }}
    >
      {keyword}
      <span
        className="absolute bottom-0 left-0 h-[1.5px] rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          backgroundColor: accent,
          width: isHovered ? '100%' : '0%',
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered ? `0 0 8px ${accent}` : 'none',
        }}
      />
    </span>
  );
};

interface CapabilityItem {
  num: string;
  categoryTag: string;
  title: string;
  cardTitle: string;
  cardTechs: string;
  description: string;
  technologies: string[];
  focusAreas: string[];
  accent: string;
  glowColor: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    num: '01',
    categoryTag: '01 / SOFTWARE',
    cardTitle: 'SOFTWARE',
    title: 'SOFTWARE ENGINEERING',
    cardTechs: 'FastAPI · React · C++ · REST APIs · Node.js',
    description: 'I build practical web and software systems using modern frontend, backend, and API technologies.',
    technologies: ['FastAPI', 'React', 'C++', 'Node.js', 'REST APIs'],
    focusAreas: ['Backend Development', 'Web Applications', 'API Development', 'Software Engineering'],
    accent: '#3ec6ff',
    glowColor: 'rgba(62, 198, 255, 0.35)',
  },
  {
    num: '02',
    categoryTag: '02 / DATA',
    cardTitle: 'DATA',
    title: 'DATA ANALYTICS',
    cardTechs: 'ETL Pipelines · PostgreSQL · Power BI · SQL',
    description: 'I work with data pipelines, databases, analytics, and dashboards to turn structured data into useful insights.',
    technologies: ['Python', 'SQL', 'Pandas', 'PostgreSQL', 'Power BI', 'ETL'],
    focusAreas: ['Data Analytics', 'ETL', 'Data Processing', 'Business Intelligence'],
    accent: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.35)',
  },
  {
    num: '03',
    categoryTag: '03 / AI / ML',
    cardTitle: 'AI / ML',
    title: 'APPLIED AI / MACHINE LEARNING',
    cardTechs: 'LLM Integration · Vertex AI · Scikit-learn · NLP',
    description: 'I build practical AI/ML solutions using machine learning, NLP, LLM integration, and cloud AI services.',
    technologies: ['Python', 'Scikit-learn', 'NLP', 'Vertex AI', 'LLM Integration'],
    focusAreas: ['Machine Learning', 'NLP', 'Generative AI', 'AI Applications'],
    accent: '#8b7bff',
    glowColor: 'rgba(139, 123, 255, 0.35)',
  },
  {
    num: '04',
    categoryTag: '04 / SECURITY',
    cardTitle: 'SECURITY',
    title: 'CYBERSECURITY AUTOMATION',
    cardTechs: 'Network Security · PAM · DLP · Azure · IAM',
    description: 'I work with cybersecurity automation and security analytics across identity, data protection, and network security workflows.',
    technologies: ['IAM', 'PAM', 'DLP', 'Azure', 'Network Security', 'Power BI'],
    focusAreas: ['Security Automation', 'IAM', 'PAM', 'DLP', 'Security Analytics'],
    accent: '#2dd4bf',
    glowColor: 'rgba(45, 212, 191, 0.35)',
  },
];

const TechTag: React.FC<{ name: string; accent: string }> = ({ name, accent }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="font-mono text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-default select-none"
      style={{
        backgroundColor: isHovered ? 'rgba(15, 25, 45, 0.95)' : 'rgba(13, 22, 42, 0.8)',
        borderColor: isHovered ? accent : 'rgba(255, 255, 255, 0.12)',
        color: isHovered ? '#ffffff' : '#cbd5e1',
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        boxShadow: isHovered ? `0 2px 10px -2px ${accent}40` : 'none',
      }}
    >
      {name}
    </span>
  );
};

const FULL_LINES = ['I BUILD', 'DIGITAL', 'SYSTEMS.'];

export const AboutEditorial: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const identityTextRef = useRef<HTMLDivElement>(null);

  // Typing headline state
  const [typedText, setTypedText] = useState({ line1: '', line2: '', line3: '' });
  const [activeLine, setActiveLine] = useState<number>(0); // 0 = waiting, 1, 2, 3, 4 = done
  const [showCursor, setShowCursor] = useState(false);
  const [cursorFading, setCursorFading] = useState(false);
  const hasTriggeredTypingRef = useRef(false);
  const typingIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Capabilities modal & hover states
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [eduHovered, setEduHovered] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<CapabilityItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Academic Education modal state
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);

  const openEduModal = useCallback(() => {
    setIsEduModalOpen(true);
  }, []);

  const closeEduModal = useCallback(() => {
    setIsEduModalOpen(false);
  }, []);

  // Modal open/close handlers with smooth entrance & exit animation
  const openModal = useCallback((cap: CapabilityItem) => {
    setSelectedCapability(cap);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setModalVisible(true);
      });
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedCapability(null);
      document.body.style.overflow = '';
    }, 320);
  }, []);

  // Keyboard accessibility: ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal]);

  // Clean up body overflow & intervals on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  // Start typing headline once (Target: ~1.1 - 1.3 seconds total, ~34ms per character)
  const startTyping = useCallback(() => {
    setShowCursor(true);
    setCursorFading(false);
    setActiveLine(1);

    let currentLine = 1;
    let charIdx = 0;

    typingIntervalRef.current = setInterval(() => {
      if (currentLine === 1) {
        charIdx++;
        setTypedText((prev) => ({ ...prev, line1: FULL_LINES[0].slice(0, charIdx) }));
        if (charIdx >= FULL_LINES[0].length) {
          currentLine = 2;
          charIdx = 0;
          setActiveLine(2);
        }
      } else if (currentLine === 2) {
        charIdx++;
        setTypedText((prev) => ({ ...prev, line2: FULL_LINES[1].slice(0, charIdx) }));
        if (charIdx >= FULL_LINES[1].length) {
          currentLine = 3;
          charIdx = 0;
          setActiveLine(3);
        }
      } else if (currentLine === 3) {
        charIdx++;
        setTypedText((prev) => ({ ...prev, line3: FULL_LINES[2].slice(0, charIdx) }));
        if (charIdx >= FULL_LINES[2].length) {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          setActiveLine(4);
          // THE CURSOR MUST CONTINUE BLINKING INDEFINITELY!
          setShowCursor(true);
          setCursorFading(false);
        }
      }
    }, 34); // ~34ms per character => intentional, cinematic reveal
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. IMAGE 01: CONTINUOUS CINEMATIC PARALLAX & DEPTH
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          {
            scale: 1.05,
            y: 0,
          },
          {
            scale: 1.10,
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // 2. SCROLL TRIGGER FOR TYPING HEADLINE: Plays ONCE, cursor continues blinking
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        end: 'bottom 15%',
        onEnter: () => {
          if (!hasTriggeredTypingRef.current) {
            hasTriggeredTypingRef.current = true;
            startTyping();
          } else {
            // Returned to About: resume cursor blinking, keep completed headline
            setShowCursor(true);
            setCursorFading(false);
          }
        },
        onEnterBack: () => {
          // Returned upward into About: resume cursor blinking
          setShowCursor(true);
          setCursorFading(false);
        },
        onLeave: () => {
          // Scrolled completely past bottom: fade cursor out
          setCursorFading(true);
          setTimeout(() => {
            setShowCursor(false);
          }, 300);
        },
        onLeaveBack: () => {
          // Scrolled completely past top: fade cursor out
          setCursorFading(true);
          setTimeout(() => {
            setShowCursor(false);
          }, 300);
        },
      });

      // 3. MAIN CONTENT CONTAINER REVEAL
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          {
            opacity: 0.15,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 65%',
              end: 'top 25%',
              scrub: 1,
            },
          }
        );
      }

      // 4. SUBTLE SCROLL PARALLAX ON BACKGROUND IDENTITY STATEMENT (translateY: 0 -> -20px, opacity: 0.35 -> 0.25)
      if (identityTextRef.current) {
        gsap.fromTo(
          identityTextRef.current,
          {
            y: 0,
            opacity: 0.35,
          },
          {
            y: -20,
            opacity: 0.25,
            ease: 'none',
            scrollTrigger: {
              trigger: identityTextRef.current,
              start: 'top 90%',
              end: 'bottom 10%',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [startTyping]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#050a14] py-32 px-6 sm:px-12 lg:px-20 select-none overflow-hidden"
      style={{ zIndex: 5 }}
    >
      {/* ======================================================================= */}
      {/* 1. CINEMATIC ENVIRONMENTAL BACKGROUND (Mountain Horizon)               */}
      {/* ======================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none will-change-transform">
        <img
          ref={bgImageRef}
          src="/assets/mountain_summit.jpg"
          alt="Engineering Horizon"
          className="w-full h-full object-cover object-center will-change-transform filter contrast-[1.08] brightness-[0.82]"
        />

        {/* Layered cinematic gradient overlay (dark top & bottom, visible middle) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: 'rgba(5, 10, 20, 0.82)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a14] via-transparent to-[#050a14] pointer-events-none" />
        <div className="absolute inset-0 scanline-overlay opacity-20 pointer-events-none" />

        {/* Ambient subtle atmospheric glows */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#8b7bff]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ======================================================================= */}
      {/* 2. SECTION CONTENT: ASYMMETRIC EDITORIAL COMPOSITION (z-index: 5)       */}
      {/* ======================================================================= */}
      <div ref={contentRef} className="relative z-[5] max-w-7xl mx-auto will-change-[opacity,transform]">
        {/* Asymmetric Two-Column Grid (Left: 38%, Right: 62%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* =================================================================== */}
          {/* LEFT COLUMN: 02 / IDENTITY + I BUILD DIGITAL SYSTEMS. (Scroll Typed) */}
          {/* =================================================================== */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-32">
            {/* Section Eyebrow: 02 / IDENTITY (Manrope Semibold, cyan accent) */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-sans text-xs sm:text-sm font-semibold text-[#3ec6ff] tracking-[0.06em] uppercase">
                02
              </span>
              <span className="text-[#3ec6ff]/40">/</span>
              <span className="font-sans text-xs sm:text-sm font-semibold text-slate-300 tracking-[0.06em] uppercase">
                IDENTITY
              </span>
              <div className="h-[1px] w-12 bg-gradient-to-r from-[#3ec6ff]/50 to-transparent" />
            </div>

            {/* Keyframe animation for typing cursor */}
            <style>{`
              @keyframes typingCursorBlink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }
              .typing-cursor-blink {
                animation: typingCursorBlink 550ms ease-in-out infinite;
              }
            `}</style>

            {/* Main Headline: Scroll-Triggered Typing with zero layout shift */}
            <div className="w-full relative">
              {/* Invisible Layout Anchor: Locks exact dimensions from frame 1 so page never jumps */}
              <div className="invisible select-none pointer-events-none opacity-0" aria-hidden="true">
                <div className="font-display font-bold uppercase tracking-tight text-[clamp(46px,5.6vw,90px)] leading-[0.94]">
                  I BUILD
                </div>
                <div className="font-display font-bold uppercase tracking-tight text-[clamp(46px,5.6vw,90px)] leading-[0.94]">
                  DIGITAL
                </div>
                <div className="font-display font-bold uppercase tracking-tight text-[clamp(46px,5.6vw,90px)] leading-[0.94]">
                  SYSTEMS.
                </div>
              </div>

              {/* Active Progressive Typing Container with Styled Colors */}
              <div className="absolute inset-0 flex flex-col justify-start">
                {/* Line 1: I BUILD (White) */}
                <div className="font-display font-bold uppercase tracking-tight text-[clamp(46px,5.6vw,90px)] leading-[0.94] flex items-center whitespace-pre">
                  <span className="text-white">{typedText.line1 || (activeLine > 1 ? FULL_LINES[0] : '')}</span>
                  {showCursor && activeLine === 1 && (
                    <span
                      className={`inline-block ml-0.5 text-[#3ec6ff] select-none font-light typing-cursor-blink transition-opacity duration-300 ${
                        cursorFading ? 'opacity-0' : 'opacity-100'
                      }`}
                      style={{ textShadow: '0 0 6px rgba(62, 198, 255, 0.45)', lineHeight: 1 }}
                    >
                      |
                    </span>
                  )}
                </div>

                {/* Line 2: DIGITAL (White to Cyan Gradient) */}
                <div className="font-display font-bold uppercase tracking-tight text-[clamp(46px,5.6vw,90px)] leading-[0.94] flex items-center whitespace-pre">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-100">
                    {typedText.line2 || (activeLine > 2 ? FULL_LINES[1] : '')}
                  </span>
                  {showCursor && activeLine === 2 && (
                    <span
                      className={`inline-block ml-0.5 text-[#3ec6ff] select-none font-light typing-cursor-blink transition-opacity duration-300 ${
                        cursorFading ? 'opacity-0' : 'opacity-100'
                      }`}
                      style={{ textShadow: '0 0 6px rgba(62, 198, 255, 0.45)', lineHeight: 1 }}
                    >
                      |
                    </span>
                  )}
                </div>

                {/* Line 3: SYSTEMS. (Cyan/Blue Gradient) */}
                <div className="font-display font-bold uppercase tracking-tight text-[clamp(46px,5.6vw,90px)] leading-[0.94] flex items-center whitespace-pre">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-[#3ec6ff]">
                    {typedText.line3 || (activeLine >= 4 ? FULL_LINES[2] : '')}
                  </span>
                  {showCursor && (activeLine === 3 || activeLine === 4) && (
                    <span
                      className={`inline-block ml-0.5 text-[#3ec6ff] select-none font-light typing-cursor-blink transition-opacity duration-300 ${
                        cursorFading ? 'opacity-0' : 'opacity-100'
                      }`}
                      style={{ textShadow: '0 0 6px rgba(62, 198, 255, 0.45)', lineHeight: 1 }}
                    >
                      |
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Subtle Divider Line */}
            <div className="w-16 h-[1.5px] bg-[#3ec6ff]/40 mt-8 mb-8" />

            {/* Quick Core Philosophy Note */}
            <p className="font-sans text-sm text-slate-400 font-normal leading-relaxed max-w-sm hidden lg:block">
              Focused on deterministic engineering, clean architectures, and turning technical capability into real-world software.
            </p>
          </div>

          {/* =================================================================== */}
          {/* RIGHT COLUMN: NARRATIVE + CAPABILITIES GRID + EDUCATION             */}
          {/* =================================================================== */}
          <div className="lg:col-span-7 flex flex-col space-y-12">
            {/* 1. PRIMARY NARRATIVE WITH INTERACTIVE KEYWORDS */}
            <div className="space-y-5">
              <p className="font-sans text-xl sm:text-2xl text-slate-100 font-normal leading-relaxed">
                I build practical{' '}
                <InteractiveKeyword
                  keyword="software systems"
                  accent="#3ec6ff"
                  glow="rgba(62,198,255,0.4)"
                />
                ,{' '}
                <InteractiveKeyword
                  keyword="data-driven applications"
                  accent="#3b82f6"
                  glow="rgba(59,130,246,0.4)"
                />
                ,{' '}
                <InteractiveKeyword
                  keyword="AI/ML solutions"
                  accent="#8b7bff"
                  glow="rgba(139,123,255,0.4)"
                />
                , and{' '}
                <InteractiveKeyword
                  keyword="cybersecurity automation"
                  accent="#2dd4bf"
                  glow="rgba(45,212,191,0.4)"
                />
                .
              </p>

              <p className="font-sans text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
                My work combines software engineering, data analytics, cloud technologies, artificial intelligence, and security to turn technical ideas into useful products.
              </p>
            </div>

            {/* 2. CAPABILITIES GRID: 4 CLICKABLE CATEGORIES WITH MODAL WINDOW */}
            <div>
              <div className="flex items-center gap-2 mb-4 font-sans text-xs font-semibold text-slate-400 uppercase tracking-[0.06em]">
                <span>CAPABILITIES &amp; SPECIALIZATIONS</span>
                <span className="text-slate-500 font-normal text-[11px] lowercase">(click card for details)</span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CAPABILITIES.map((cap) => {
                  const isHovered = hoveredCard === cap.num;
                  return (
                    <div
                      key={cap.num}
                      role="button"
                      tabIndex={0}
                      data-cursor="VIEW"
                      onClick={() => openModal(cap)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openModal(cap);
                        }
                      }}
                      onMouseEnter={() => setHoveredCard(cap.num)}
                      onMouseLeave={() => setHoveredCard(null)}
                      aria-label={`View details for ${cap.cardTitle}`}
                      className="group relative p-5 rounded-xl border transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-1 focus:ring-[#3ec6ff]/60 select-none"
                      style={{
                        backgroundColor: isHovered ? 'rgba(10, 18, 35, 0.88)' : 'rgba(5, 10, 20, 0.65)',
                        borderColor: isHovered ? cap.accent : 'rgba(255, 255, 255, 0.08)',
                        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                        boxShadow: isHovered
                          ? `0 10px 25px -5px rgba(0, 0, 0, 0.7), 0 0 20px -5px ${cap.accent}40`
                          : 'none',
                      }}
                    >
                      {/* Top Header: Num + Title + Arrow */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="font-sans text-xs font-bold transition-colors duration-200"
                            style={{ color: cap.accent }}
                          >
                            {cap.num}
                          </span>
                          <span
                            className="font-display text-sm sm:text-base font-bold tracking-tight transition-all duration-200"
                            style={{
                              color: isHovered ? cap.accent : '#e2e8f0',
                              transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
                              textShadow: isHovered ? `0 0 14px ${cap.glowColor}` : 'none',
                            }}
                          >
                            {cap.cardTitle}
                          </span>
                        </div>
                        {/* Interactive Top-Right Arrow (moves 4px right/up on hover) */}
                        <ArrowUpRight
                          className="w-4 h-4 transition-all duration-200 ease-out"
                          style={{
                            color: isHovered ? cap.accent : '#64748b',
                            transform: isHovered ? 'translate(4px, -4px)' : 'translate(0, 0)',
                          }}
                        />
                      </div>

                      {/* Expanding Accent Line underneath title */}
                      <div
                        className="h-[1.5px] rounded-full mb-3.5 transition-all duration-300 ease-out"
                        style={{
                          backgroundColor: cap.accent,
                          width: isHovered ? '100%' : '24px',
                          opacity: isHovered ? 0.95 : 0.35,
                          boxShadow: isHovered ? `0 0 8px ${cap.accent}` : 'none',
                        }}
                      />

                      {/* Technical values list */}
                      <p className="font-mono text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed">
                        {cap.cardTechs}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. EDUCATION INFORMATION BLOCK (Clickable -> Opens Academic Performance Modal) */}
            <div
              role="button"
              tabIndex={0}
              data-cursor="VIEW"
              onClick={openEduModal}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openEduModal();
                }
              }}
              onMouseEnter={() => setEduHovered(true)}
              onMouseLeave={() => setEduHovered(false)}
              aria-label="View academic record and semester performance details"
              className="group relative p-6 sm:p-7 rounded-xl border transition-all duration-300 ease-out cursor-pointer select-none focus:outline-none focus:ring-1 focus:ring-[#3ec6ff]/60"
              style={{
                backgroundColor: eduHovered ? 'rgba(10, 18, 35, 0.88)' : 'rgba(5, 10, 20, 0.65)',
                borderColor: eduHovered ? 'rgba(62, 198, 255, 0.55)' : 'rgba(255, 255, 255, 0.08)',
                transform: eduHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: eduHovered
                  ? '0 12px 30px -5px rgba(0, 0, 0, 0.75), 0 0 25px -5px rgba(62, 198, 255, 0.25)'
                  : 'none',
              }}
            >
              {/* Expanding Accent Top Line on Hover */}
              <div
                className="absolute top-0 left-6 right-6 h-[1.5px] rounded-full transition-all duration-300 ease-out"
                style={{
                  background: 'linear-gradient(90deg, #3ec6ff, #8b7bff)',
                  opacity: eduHovered ? 1 : 0,
                }}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between sm:justify-start gap-2 font-sans text-xs font-semibold text-[#3ec6ff] tracking-[0.06em] uppercase">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#3ec6ff]" />
                      <span>EDUCATION</span>
                    </div>
                    {/* Top-Right Arrow on Mobile */}
                    <ArrowUpRight
                      className="w-4 h-4 transition-all duration-200 ease-out sm:hidden"
                      style={{
                        color: eduHovered ? '#3ec6ff' : '#64748b',
                        transform: eduHovered ? 'translate(3px, -3px)' : 'translate(0, 0)',
                      }}
                    />
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                    B.Tech Computer Science Engineering
                  </h3>
                  <p className="font-sans text-sm text-slate-300 font-medium">
                    JECRC University · Final Year
                  </p>
                </div>

                {/* Factual CGPA display (9.27 / 10.0) + Top-Right Arrow on Desktop */}
                <div className="sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 flex sm:flex-col items-baseline sm:items-end justify-between">
                  <div className="flex items-center gap-1.5 sm:justify-end">
                    <span className="font-sans text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Current CGPA
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 transition-all duration-200 ease-out hidden sm:inline-block"
                      style={{
                        color: eduHovered ? '#3ec6ff' : '#64748b',
                        transform: eduHovered ? 'translate(4px, -4px)' : 'translate(0, 0)',
                      }}
                    />
                  </div>
                  <span
                    className={`font-sans text-lg sm:text-2xl font-bold transition-all duration-200 sm:mt-0.5 ${
                      eduHovered
                        ? 'text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]'
                        : 'text-emerald-400'
                    }`}
                  >
                    9.27 <span className="text-xs sm:text-sm font-normal text-slate-400">/ 10.0</span>
                  </span>
                </div>
              </div>

              {/* Subtle Secondary Prompt: VIEW ACADEMIC RECORD ↗ */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-sans">
                <span
                  className="inline-flex items-center gap-1 transition-all duration-200"
                  style={{
                    color: eduHovered ? '#3ec6ff' : '#94a3b8',
                    textDecoration: eduHovered ? 'underline' : 'none',
                    textUnderlineOffset: '4px',
                  }}
                >
                  <span className="font-medium">VIEW ACADEMIC RECORD</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
                <span className="font-mono text-[11px] text-slate-500">
                  Semester 1–6 CGPAs &amp; Chart
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 3. SCROLL PARALLAX IDENTITY & CONTINUOUS KINETIC TYPOGRAPHY             */}
        {/* ======================================================================= */}
        <div className="mt-32 pt-16 border-t border-white/5">
          {/* Background Identity Statement: COMPUTER SCIENCE ENGINEER */}
          <div
            ref={identityTextRef}
            className="flex flex-col gap-2 font-display font-bold text-4xl sm:text-6xl lg:text-8xl tracking-tight uppercase select-none text-slate-800 will-change-transform px-2 sm:px-4"
            style={{ opacity: 0.35 }}
          >
            <span className="text-white/35 whitespace-nowrap pl-2 sm:pl-6">
              COMPUTER
            </span>
            <span className="text-cyan-400/35 whitespace-nowrap pl-16 sm:pl-36">
              SCIENCE
            </span>
            <span className="text-[#8b7bff]/35 whitespace-nowrap pl-28 sm:pl-64">
              ENGINEER
            </span>
          </div>

          {/* Continuous Cinematic Kinetic Keyword Animation */}
          <MethodologyKineticTypography />
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 4. INTERACTIVE CAPABILITY DETAIL WINDOW / MODAL                         */}
      {/* ======================================================================= */}
      {isModalOpen && selectedCapability && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="capability-modal-title"
        >
          {/* Translucent Dark Backdrop Overlay (About section remains visible underneath) - Z-index 80 */}
          <div
            onClick={closeModal}
            className="fixed inset-0 z-[80] bg-black/65 backdrop-blur-md transition-opacity duration-300 ease-out"
            style={{
              opacity: modalVisible ? 1 : 0,
            }}
          />

          {/* Modal Container - Z-index 90 */}
          <div
            className="relative z-[90] w-full max-w-[720px] rounded-2xl border bg-[#080e1c]/95 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl transition-all duration-350 ease-out max-h-[85vh] overflow-y-auto"
            style={{
              opacity: modalVisible ? 1 : 0,
              transform: modalVisible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(15px)',
              borderColor: `${selectedCapability.accent}60`,
              boxShadow: `0 25px 70px rgba(0,0,0,0.9), 0 0 35px ${selectedCapability.glowColor}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Accent Gradient Line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${selectedCapability.accent}, transparent)`,
              }}
            />

            {/* Header: Tag + Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <span
                className="font-sans text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded border"
                style={{
                  color: selectedCapability.accent,
                  borderColor: `${selectedCapability.accent}40`,
                  backgroundColor: `${selectedCapability.accent}15`,
                }}
              >
                {selectedCapability.categoryTag}
              </span>

              <button
                onClick={closeModal}
                data-cursor="nav"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Title */}
            <h3
              id="capability-modal-title"
              className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-5"
            >
              {selectedCapability.title}
            </h3>

            {/* Two-Column Details Grid on Desktop: LEFT (Description + Focus), RIGHT (Technologies) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-5 border-t border-white/10">
              {/* Left Column: Description & Focus Areas */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <h4 className="font-sans text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    OVERVIEW
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                    {selectedCapability.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    FOCUS
                  </h4>
                  <div className="flex flex-col gap-2">
                    {selectedCapability.focusAreas.map((focus, i) => (
                      <div key={i} className="flex items-center gap-2.5 font-sans text-sm text-slate-200">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: selectedCapability.accent }}
                        />
                        <span>{focus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Technologies List */}
              <div className="md:col-span-5 space-y-3">
                <h4 className="font-sans text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedCapability.technologies.map((tech, i) => (
                    <TechTag key={i} name={tech} accent={selectedCapability.accent} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* 5. INTERACTIVE ACADEMIC PERFORMANCE MODAL                               */}
      {/* ======================================================================= */}
      <AcademicModal isOpen={isEduModalOpen} onClose={closeEduModal} />
    </section>
  );
};
