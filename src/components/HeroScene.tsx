import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  Cpu,
  Database,
  Shield,
  Code2,
  BarChart2,
  Sparkles,
  ShieldCheck,
  Cloud,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillDomain {
  name: string;
  shortTag: string;
  techs: string;
  accent: string;
  glowColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SKILL_DOMAINS: SkillDomain[] = [
  {
    name: 'Software',
    shortTag: 'SOFTWARE',
    techs: 'C++ · Python · React · TypeScript',
    accent: '#3ec6ff', // cyan
    glowColor: 'rgba(62, 198, 255, 0.45)',
    icon: Code2,
  },
  {
    name: 'Data Analytics',
    shortTag: 'DATA ANALYTICS',
    techs: 'Python · SQL · Pandas · Power BI',
    accent: '#3b82f6', // blue
    glowColor: 'rgba(59, 130, 246, 0.45)',
    icon: BarChart2,
  },
  {
    name: 'AI / ML',
    shortTag: 'AI / ML',
    techs: 'Python · Scikit-learn · Vertex AI',
    accent: '#8b7bff', // violet
    glowColor: 'rgba(139, 123, 255, 0.45)',
    icon: Sparkles,
  },
  {
    name: 'Cybersecurity',
    shortTag: 'CYBERSECURITY',
    techs: 'IAM · PAM · DLP · Azure',
    accent: '#2dd4bf', // cyan/blue
    glowColor: 'rgba(45, 212, 191, 0.45)',
    icon: ShieldCheck,
  },
  {
    name: 'Cloud',
    shortTag: 'CLOUD',
    techs: 'GCP · Azure · Cloud Storage',
    accent: '#818cf8', // violet/blue
    glowColor: 'rgba(129, 140, 248, 0.45)',
    icon: Cloud,
  },
];

const SkillKeywordItem: React.FC<{ domain: SkillDomain }> = ({ domain }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.22;
    const deltaY = (e.clientY - centerY) * 0.22;
    setMagneticOffset({
      x: Math.max(-3.5, Math.min(3.5, deltaX)),
      y: Math.max(-3.5, Math.min(3.5, deltaY)),
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMagneticOffset({ x: 0, y: 0 });
  };

  const IconComponent = domain.icon;

  return (
    <div
      data-cursor="EXPLORE"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-flex items-center cursor-pointer select-none py-1 px-1.5 transition-all duration-300 ease-out"
      style={{
        transform: isHovered
          ? `translate3d(${magneticOffset.x}px, ${magneticOffset.y - 2}px, 0) scale(1.07)`
          : 'translate3d(0, 0, 0) scale(1)',
      }}
    >
      {/* Tiny Hover Icon appearing smoothly */}
      <span
        className={`inline-flex items-center transition-all duration-250 ease-out overflow-hidden ${
          isHovered ? 'opacity-100 w-4 mr-1.5 translate-y-0' : 'opacity-0 w-0 mr-0 translate-y-1'
        }`}
        style={{ color: domain.accent }}
      >
        <IconComponent className="w-3.5 h-3.5 shrink-0" />
      </span>

      {/* Main Keyword Text */}
      <span
        className="font-sans text-[15px] sm:text-[16px] md:text-[17px] font-medium tracking-[0.02em] transition-all duration-250 ease-out"
        style={{
          color: isHovered ? domain.accent : '#B8C2D1',
          textShadow: isHovered ? `0 0 14px ${domain.glowColor}` : 'none',
        }}
      >
        {domain.name}
      </span>

      {/* Growing Thin Underline using keyword accent color */}
      <span
        className="absolute bottom-0.5 left-1.5 right-1.5 h-[1.5px] rounded-full transition-all duration-250 ease-out pointer-events-none"
        style={{
          backgroundColor: domain.accent,
          width: isHovered ? 'calc(100% - 12px)' : '0%',
          boxShadow: isHovered ? `0 0 8px ${domain.accent}` : 'none',
          transformOrigin: 'left',
        }}
      />

      {/* Discreet, elegant floating tooltip below keyword */}
      {isHovered && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-30 pointer-events-none whitespace-nowrap animate-fade-in"
          style={{ animationDuration: '200ms' }}
        >
          <div className="flex flex-col items-center bg-[#050a14]/95 border border-[#3ec6ff]/25 shadow-2xl shadow-black/90 px-3 py-1.5 rounded-lg backdrop-blur-xl">
            <span
              className="font-sans text-[10px] font-bold tracking-wider uppercase"
              style={{ color: domain.accent }}
            >
              {domain.shortTag}
            </span>
            <span className="font-sans text-[11px] text-slate-300 font-medium">
              {domain.techs}
            </span>
          </div>
          {/* Subtle little upward indicator notch */}
          <div className="w-2 h-2 bg-[#050a14] border-l border-t border-[#3ec6ff]/25 rotate-45 mx-auto -mt-1" />
        </div>
      )}
    </div>
  );
};

interface HeroSceneProps {
  onCompleteScroll?: () => void;
}

export const HeroScene: React.FC<HeroSceneProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaFrameRef = useRef<HTMLDivElement>(null);
  const mediaImageRef = useRef<HTMLImageElement>(null);
  const image01Ref = useRef<HTMLImageElement>(null);
  const leftTitleRef = useRef<HTMLHeadingElement>(null);
  const rightTitleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const domainsRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLButtonElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  const telemetryBadgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const initialWidth = isMobile ? Math.min(window.innerWidth * 0.84, 280) : 380;
      const initialHeight = isMobile ? 160 : 220;
      const splitDistance = isMobile ? window.innerWidth * 0.65 : Math.max(window.innerWidth * 0.55, 600);

      const calcInset = (w: number, h: number, radius: number) => {
        const top = Math.max(0, (window.innerHeight - h) / 2);
        const right = Math.max(0, (window.innerWidth - w) / 2);
        const bottom = Math.max(0, (window.innerHeight - h) / 2);
        const left = Math.max(0, (window.innerWidth - w) / 2);
        return `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius}px)`;
      };

      // Initial setup
      gsap.set(mediaFrameRef.current, {
        xPercent: -50,
        yPercent: -50,
        width: '100vw',
        height: '100vh',
        opacity: 0,
        scale: 0.6,
        clipPath: calcInset(initialWidth, initialHeight, 20),
        transformOrigin: 'center center',
      });

      gsap.set([leftTitleRef.current, rightTitleRef.current], {
        x: 0,
        opacity: 1,
      });

      if (image01Ref.current) {
        gsap.set(image01Ref.current, {
          opacity: 0,
          scale: 0.88,
        });
      }

      // Master ScrollTrigger Scrub Timeline (One continuous scrub, strictly repeatable on reverse)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=2200',
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 0.0 - 0.15: Peripheral UI elements fade away on first scroll
      const peripheralUI = [eyebrowRef.current, subtitleRef.current, domainsRef.current, scrollPromptRef.current].filter(Boolean);
      if (peripheralUI.length > 0) {
        tl.to(
          peripheralUI,
          {
            opacity: 0,
            y: -12,
            duration: 0.12,
            ease: 'power1.out',
          },
          0
        );
      }

      // 0.0 - 0.20: First scroll immediately triggers NIKUNJ <- and RATHI -> splitting
      tl.to(
        leftTitleRef.current,
        {
          x: -splitDistance * 0.35,
          duration: 0.2,
          ease: 'power1.out',
        },
        0
      )
        .to(
          rightTitleRef.current,
          {
            x: splitDistance * 0.35,
            duration: 0.2,
            ease: 'power1.out',
          },
          0
        )
        .to(
          mediaFrameRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.2,
            ease: 'power1.out',
          },
          0
        );

      // 0.20 - 0.60: Continuous outward translation and media expansion
      tl.to(
        leftTitleRef.current,
        {
          x: -splitDistance * 0.85,
          opacity: 0.7,
          duration: 0.4,
          ease: 'power1.inOut',
        },
        0.2
      )
        .to(
          rightTitleRef.current,
          {
            x: splitDistance * 0.85,
            opacity: 0.7,
            duration: 0.4,
            ease: 'power1.inOut',
          },
          0.2
        )
        .to(
          mediaFrameRef.current,
          {
            clipPath: () => {
              const midW = isMobile ? window.innerWidth * 0.94 : window.innerWidth * 0.76;
              const midH = isMobile ? window.innerHeight * 0.65 : window.innerHeight * 0.64;
              return calcInset(midW, midH, 16);
            },
            duration: 0.4,
            ease: 'power2.inOut',
          },
          0.2
        );

      // Fade background overlay to spotlight expanding workspace media
      if (bgOverlayRef.current) {
        tl.to(
          bgOverlayRef.current,
          {
            opacity: 0.15,
            duration: 0.35,
            ease: 'power1.inOut',
          },
          0.2
        );
      }

      // Reveal telemetry badges inside media frame
      if (telemetryBadgesRef.current) {
        tl.to(
          telemetryBadgesRef.current,
          {
            opacity: 1,
            duration: 0.2,
            ease: 'power1.out',
          },
          0.38
        );
      }

      // 0.60 - 0.82: Media reaches full viewport, names dissolve off-screen
      tl.to(
        leftTitleRef.current,
        {
          x: -splitDistance * 1.35,
          opacity: 0,
          duration: 0.22,
          ease: 'power2.in',
        },
        0.6
      )
        .to(
          rightTitleRef.current,
          {
            x: splitDistance * 1.35,
            opacity: 0,
            duration: 0.22,
            ease: 'power2.in',
          },
          0.6
        )
        .to(
          mediaFrameRef.current,
          {
            clipPath: () => calcInset(window.innerWidth, window.innerHeight, 0),
            duration: 0.22,
            ease: 'power2.inOut',
          },
          0.6
        );

      // Fade out telemetry badges as fullscreen is achieved
      if (telemetryBadgesRef.current) {
        tl.to(
          telemetryBadgesRef.current,
          {
            opacity: 0,
            duration: 0.15,
            ease: 'power1.in',
          },
          0.68
        );
      }

      // 0.80 - 1.00: Seamless Layered Image 01 Transition (Hero -> About)
      // Hero workspace image scales forward and fades out gradually
      if (mediaImageRef.current) {
        tl.to(
          mediaImageRef.current,
          {
            scale: 1.15,
            opacity: 0,
            duration: 0.2,
            ease: 'power1.inOut',
          },
          0.8
        );
      }

      // Layer 2: Image 01 enters within the composition, scales 0.88 -> 1.05 and fades 0 -> 1
      if (image01Ref.current) {
        tl.to(
          image01Ref.current,
          {
            opacity: 1,
            scale: 1.05,
            duration: 0.2,
            ease: 'power1.inOut',
          },
          0.8
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleScrollClick = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[100svh] bg-[#050a14] select-none"
      style={{ zIndex: 5 }}
    >
      {/* Pinned Viewport Stage */}
      <div
        ref={stageRef}
        className="h-full w-full relative flex flex-col justify-between overflow-hidden"
      >
        {/* ======================================================================= */}
        {/* 1. CINEMATIC DEVELOPER WORKSPACE BACKGROUND (z-index: 0)                */}
        {/* ======================================================================= */}
        <div
          ref={bgOverlayRef}
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 overflow-hidden"
        >
          {/* Base Workspace Photography */}
          <img
            src="/assets/workspace_bg.jpg"
            alt="Cinematic Developer Workspace"
            className="w-full h-full object-cover object-center scale-[1.02] filter contrast-[1.08] brightness-[0.95]"
          />

          {/* Dark navy overlay (rgba(5,10,20,0.75)) */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(5, 10, 20, 0.75)' }}
          />

          {/* Ambient Spotlight Glows */}
          <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] bg-[#3ec6ff]/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[550px] h-[550px] bg-[#8b7bff]/12 rounded-full blur-[140px]" />
          <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none" />
        </div>

        {/* ======================================================================= */}
        {/* 2. TOP CENTER METADATA BAR (Manrope, 12-14px, weight 500)               */}
        {/* ======================================================================= */}
        <div className="relative z-10 w-full pt-7 px-6 flex items-center justify-center pointer-events-auto">
          <div className="flex items-center gap-4 text-center select-none">
            <div className="h-[1px] w-10 sm:w-20 bg-gradient-to-r from-transparent to-[#3ec6ff]/40" />
            <div className="font-sans text-xs sm:text-[13px] md:text-sm font-medium text-[#8a99b3] tracking-[0.04em] uppercase whitespace-nowrap flex items-center gap-2">
              <a
                href="https://www.google.com/maps/place/Jaipur,+Rajasthan"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN ↗"
                className="hover:text-[#3ec6ff] hover:underline decoration-[#3ec6ff]/60 underline-offset-4 hover:-translate-y-0.5 inline-block transition-all duration-200 cursor-pointer text-[#8a99b3]"
                title="Open Jaipur, India in Google Maps"
                aria-label="Open Jaipur, India in Google Maps (opens in new tab)"
              >
                JAIPUR, INDIA
              </a>
              <span className="text-[#3ec6ff]/40 select-none">·</span>
              <span className="text-slate-400 select-none">CSE &apos;27</span>
              <span className="text-[#3ec6ff]/40 select-none">·</span>
              <a
                href="https://www.google.com/maps/place/JECRC+University/@26.7823528,75.8770146,17z"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN ↗"
                className="hover:text-[#3ec6ff] hover:underline decoration-[#3ec6ff]/60 underline-offset-4 hover:-translate-y-0.5 inline-block transition-all duration-200 cursor-pointer text-[#8a99b3]"
                title="Open JECRC University in Google Maps"
                aria-label="Open JECRC University in Google Maps (opens in new tab)"
              >
                JECRC UNIVERSITY
              </a>
            </div>
            <div className="h-[1px] w-10 sm:w-20 bg-gradient-to-l from-transparent to-[#3ec6ff]/40" />
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 3. CENTER HERO: HEADLINE + EXPANDING MEDIA + SUBTITLE                   */}
        {/* ======================================================================= */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4 pt-2">
          {/* Eyebrow Label: 01 / DIGITAL JOURNEY (Manrope, reduced letter spacing) */}
          <div
            ref={eyebrowRef}
            className="flex items-center gap-3 mb-2 select-none"
          >
            <div className="h-[1px] w-10 sm:w-16 bg-[#3ec6ff]/40" />
            <span className="font-sans text-xs sm:text-[13px] font-semibold text-[#8a99b3] tracking-[0.08em] uppercase">
              01 &nbsp;/&nbsp; DIGITAL JOURNEY
            </span>
            <div className="h-[1px] w-10 sm:w-16 bg-[#3ec6ff]/40" />
          </div>

          {/* Symmetrical Center-Anchored Headline Container + Central Expanding Media */}
          <div className="relative w-full flex flex-col items-center justify-center my-1 select-none">
            {/* Subtle Crosshair Laser Line */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#3ec6ff]/35 to-transparent pointer-events-none" />

            {/* Central Expanding Media Frame (initial: centered behind/between text) */}
            <div
              id="hero-media-frame"
              ref={mediaFrameRef}
              className="absolute z-10 overflow-hidden border border-[#3ec6ff]/40 bg-[#070b16] flex items-center justify-center will-change-transform"
              style={{
                left: '50%',
                top: '50%',
              }}
            >
              {/* Layer 1: Hero Workspace Media Photography */}
              <img
                ref={mediaImageRef}
                src="/assets/workspace_bg.jpg"
                alt="Nikunj's Digital Workstation"
                className="absolute inset-0 w-full h-full object-cover object-center will-change-transform filter contrast-[1.08] brightness-[0.95]"
                loading="eager"
              />

              {/* Layer 2: Image 01 (mountain_summit.jpg) - Seamless transition to About */}
              <img
                ref={image01Ref}
                src="/assets/mountain_summit.jpg"
                alt="Engineer Summit Journey"
                className="absolute inset-0 w-full h-full object-cover object-center will-change-transform filter contrast-[1.08] brightness-[0.88] opacity-0"
                loading="eager"
              />

              {/* Cyber Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/90 via-transparent to-[#050a14]/40 pointer-events-none" />
              <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-30" />

              {/* Telemetry Badges inside frame (revealed during expansion) */}
              <div
                ref={telemetryBadgesRef}
                className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between font-mono text-[11px] text-slate-300 opacity-0 pointer-events-none transition-opacity"
              >
                <div className="flex items-center gap-3 bg-[#050a14]/90 px-3 py-1.5 rounded-lg border border-[#3ec6ff]/20 backdrop-blur-md">
                  <div className="flex items-center gap-1.5 text-[#3ec6ff]">
                    <Cpu className="w-3.5 h-3.5 text-[#3ec6ff]" />
                    <span>AI_ENGINE: ACTIVE</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-[#8b7bff]">
                    <Database className="w-3.5 h-3.5" />
                    <span>SYSTEMS: ONLINE</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-emerald-400">
                    <Shield className="w-3.5 h-3.5" />
                    <span>SECURITY: VERIFIED</span>
                  </div>
                </div>

                <div className="bg-[#050a14]/90 px-3 py-1.5 rounded-lg border border-[#3ec6ff]/20 text-[#3ec6ff] font-bold backdrop-blur-md">
                  WORKSPACE://STUDIO_01
                </div>
              </div>
            </div>

            {/* Line 1: NIKUNJ (Space Grotesk, font-weight: 700, White / Silver Metallic) */}
            <h1
              ref={leftTitleRef}
              className="hero-nikunj-gradient font-display font-bold tracking-tight uppercase leading-[0.88] select-none will-change-transform z-20 text-center"
              style={{
                fontSize: 'clamp(68px, 10.8vw, 180px)',
                letterSpacing: '-0.025em',
              }}
            >
              NIKUNJ
            </h1>

            {/* Line 2: RATHI (Space Grotesk, font-weight: 700, Cyan -> Blue -> Violet Gradient) */}
            <h1
              ref={rightTitleRef}
              className="hero-rathi-gradient font-display font-bold tracking-tight uppercase leading-[0.88] select-none will-change-transform z-20 text-center mt-1"
              style={{
                fontSize: 'clamp(68px, 10.8vw, 180px)',
                letterSpacing: '-0.025em',
              }}
            >
              RATHI
            </h1>
          </div>

          {/* Subheading: COMPUTER SCIENCE ENGINEER (Manrope, 18-22px, font-weight: 600, reduced letter-spacing) */}
          <div className="mt-4 select-none">
            <p
              ref={subtitleRef}
              className="font-sans font-semibold text-slate-100 text-[18px] sm:text-[20px] md:text-[22px] tracking-[0.04em] uppercase text-center"
            >
              COMPUTER SCIENCE ENGINEER
            </p>
          </div>

          {/* Domain Tags: Interactive Skill Keywords (Manrope 15-17px, individual hover, scale, underline, glow) */}
          <div
            ref={domainsRef}
            className="mt-3.5 flex flex-wrap items-center justify-center gap-1 sm:gap-2 select-none text-center"
          >
            {SKILL_DOMAINS.map((domain, index) => (
              <React.Fragment key={domain.name}>
                <SkillKeywordItem domain={domain} />
                {index < SKILL_DOMAINS.length - 1 && (
                  <span className="text-[#3ec6ff]/35 text-xs sm:text-sm select-none font-bold px-0.5">
                    ·
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 4. "EXPLORE THE JOURNEY" ANCHORED SCROLL PROMPT (Manrope 13-15px)       */}
        {/* ======================================================================= */}
        <div className="relative z-10 pb-6 sm:pb-8 flex flex-col items-center justify-center select-none">
          <button
            ref={scrollPromptRef}
            onClick={handleScrollClick}
            data-cursor="ENTER"
            className="group flex flex-col items-center focus:outline-none transition-all duration-300 cursor-pointer"
            aria-label="Scroll down to explore"
          >
            {/* Concentric Pulsing Cyan Target Dot */}
            <div className="relative w-8 h-8 rounded-full border border-[#3ec6ff]/40 flex items-center justify-center shadow-[0_0_15px_rgba(62,198,255,0.25)] group-hover:border-[#3ec6ff] group-hover:shadow-[0_0_25px_rgba(62,198,255,0.7)] group-hover:scale-110 transition-all duration-300 mb-1.5">
              <span className="absolute w-7 h-7 rounded-full border border-[#3ec6ff]/50 ring-pulse-halo pointer-events-none" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-[#3ec6ff] shadow-[0_0_8px_#3ec6ff] group-hover:bg-cyan-200 group-hover:shadow-[0_0_12px_#3ec6ff] transition-all" />
            </div>

            <span className="font-sans text-[13px] sm:text-[14px] text-white tracking-[0.08em] uppercase font-bold group-hover:scale-105 group-hover:text-white group-hover:underline decoration-[#3ec6ff]/70 underline-offset-4 group-hover:drop-shadow-[0_0_10px_rgba(62,198,255,0.8)] transition-all duration-200">
              EXPLORE THE JOURNEY
            </span>
            <span className="font-sans text-[11px] sm:text-[12px] text-[#8a99b3] tracking-[0.04em] uppercase mt-0.5 group-hover:text-cyan-200 transition-colors">
              BY SCROLLING DOWN
            </span>

            <ArrowDown className="w-3.5 h-3.5 text-[#3ec6ff] mt-1 arrow-bounce-subtle group-hover:scale-125 group-hover:translate-y-1 group-hover:text-cyan-200 transition-all duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
};
