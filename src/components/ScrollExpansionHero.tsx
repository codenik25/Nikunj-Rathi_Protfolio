import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Shield, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollExpansionHeroProps {
  onCompleteScroll?: () => void;
}

export const ScrollExpansionHero: React.FC<ScrollExpansionHeroProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const mediaFrameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const leftTitleRef = useRef<HTMLHeadingElement>(null);
  const rightTitleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bottomMetaRef = useRef<HTMLDivElement>(null);
  const hudStatusRef = useRef<HTMLDivElement>(null);
  const sideQuotesRef = useRef<HTMLDivElement>(null);
  const bottomRadarRef = useRef<HTMLDivElement>(null);
  const bottomFooterRef = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  const mediaHudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const mediaFrame = mediaFrameRef.current;
    const image = imageRef.current;
    const leftTitle = leftTitleRef.current;
    const rightTitle = rightTitleRef.current;
    const subtitle = subtitleRef.current;
    const bottomMeta = bottomMetaRef.current;
    const hudStatus = hudStatusRef.current;
    const sideQuotes = sideQuotesRef.current;
    const bottomRadar = bottomRadarRef.current;
    const bottomFooter = bottomFooterRef.current;
    const bgOverlay = bgOverlayRef.current;
    const mediaHud = mediaHudRef.current;

    if (!container || !mediaFrame || !leftTitle || !rightTitle) return;

    const isMobile = window.innerWidth < 768;
    const initialSmallWidth = isMobile ? Math.min(window.innerWidth * 0.82, 300) : 380;
    const initialSmallHeight = isMobile ? 180 : 240;
    const splitDistance = isMobile ? window.innerWidth * 0.65 : Math.max(window.innerWidth * 0.52, 640);

    const calcInset = (w: number, h: number, radius: number) => {
      const top = Math.max(0, (window.innerHeight - h) / 2);
      const right = Math.max(0, (window.innerWidth - w) / 2);
      const bottom = Math.max(0, (window.innerHeight - h) / 2);
      const left = Math.max(0, (window.innerWidth - w) / 2);
      return `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius}px)`;
    };

    // Initial setup
    gsap.set(mediaFrame, {
      xPercent: -50,
      yPercent: -50,
      width: '100vw',
      height: '100vh',
      opacity: 0,
      scale: 0.8,
      clipPath: calcInset(initialSmallWidth, initialSmallHeight, 24),
      transformOrigin: 'center center',
    });

    gsap.set([leftTitle, rightTitle], {
      x: 0,
      opacity: 1,
    });

    if (image) {
      gsap.set(image, { scale: 1.05 });
    }

    // Master ScrollTrigger Scrub Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=2400',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // 0.0 - 0.15: Peripheral UI elements (status HUD, quotes, radar, subtext) dissolve on initial scroll
    const uiElements = [
      subtitle,
      bottomMeta,
      hudStatus,
      sideQuotes,
      bottomRadar,
      bottomFooter,
    ].filter(Boolean);

    if (uiElements.length > 0) {
      tl.to(
        uiElements,
        {
          opacity: 0,
          y: -10,
          duration: 0.12,
          ease: 'power1.out',
        },
        0
      );
    }

    // 0.0 - 0.15: Image appears immediately between words and titles start separating
    tl.to(
      mediaFrame,
      {
        opacity: 1,
        scale: 1,
        duration: 0.15,
        ease: 'power1.out',
      },
      0
    )
      .to(
        leftTitle,
        {
          x: -splitDistance * 0.22,
          duration: 0.15,
          ease: 'power1.out',
        },
        0
      )
      .to(
        rightTitle,
        {
          x: splitDistance * 0.22,
          duration: 0.15,
          ease: 'power1.out',
        },
        0
      );

    // 0.15 - 0.55: Continuous outward translation and media expansion
    tl.to(
      leftTitle,
      {
        x: -splitDistance * 0.72,
        opacity: 0.85,
        duration: 0.4,
        ease: 'power1.inOut',
      },
      0.15
    )
      .to(
        rightTitle,
        {
          x: splitDistance * 0.72,
          opacity: 0.85,
          duration: 0.4,
          ease: 'power1.inOut',
        },
        0.15
      )
      .to(
        mediaFrame,
        {
          clipPath: () => {
            const midW = isMobile ? window.innerWidth * 0.94 : window.innerWidth * 0.74;
            const midH = isMobile ? window.innerHeight * 0.65 : window.innerHeight * 0.62;
            return calcInset(midW, midH, 18);
          },
          duration: 0.4,
          ease: 'power2.inOut',
        },
        0.15
      );

    // Fade background overlay to spotlight expanding workspace media
    if (bgOverlay) {
      tl.to(
        bgOverlay,
        {
          opacity: 0,
          duration: 0.35,
          ease: 'power1.inOut',
        },
        0.15
      );
    }

    // Reveal telemetry badges inside media frame
    if (mediaHud) {
      tl.to(
        mediaHud,
        {
          opacity: 1,
          duration: 0.2,
          ease: 'power1.out',
        },
        0.35
      );
    }

    // 0.55 - 0.85: Media approaches full viewport, names reach edges and dissolve
    tl.to(
      leftTitle,
      {
        x: -splitDistance * 1.15,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      },
      0.55
    )
      .to(
        rightTitle,
        {
          x: splitDistance * 1.15,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        0.55
      )
      .to(
        mediaFrame,
        {
          clipPath: () => calcInset(window.innerWidth, window.innerHeight, 0),
          duration: 0.3,
          ease: 'power2.inOut',
        },
        0.55
      );

    // 0.85 - 1.0: Fullscreen workspace camera movement into About transition
    if (image) {
      tl.to(
        image,
        {
          scale: 1.14,
          duration: 0.15,
          ease: 'none',
        },
        0.85
      );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill(true);
      });
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen bg-[#05070b] select-none overflow-hidden"
    >
      {/* Pinned Viewport Stage */}
      <div
        ref={stickyRef}
        className="h-full w-full relative flex flex-col justify-between overflow-hidden"
      >
        {/* Cinematic Developer Studio Background matching reference environment */}
        <div
          ref={bgOverlayRef}
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
        >
          {/* Base Workspace Photography */}
          <img
            src="/assets/workspace_bg.jpg"
            alt="Cinematic Developer Workspace"
            className="w-full h-full object-cover object-center opacity-40 scale-100"
          />

          {/* Gradients & Dark Vignette so all UI & Typography pops with high contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070b] via-[#05070b]/60 to-[#05070b]/80" />
          <div className="absolute inset-0 bg-radial-vignette opacity-80" />

          {/* Subtle Ambient Glows from reference image (Optimized with radial gradients instead of heavy CSS blurs) */}
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(139,123,255,0.15) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 scanline-overlay opacity-25" />
        </div>

        {/* Right-Side HUD Status Card matching Reference Design */}
        <div
          ref={hudStatusRef}
          className="absolute top-24 right-6 sm:right-12 z-20 hidden md:flex flex-col items-end pointer-events-none select-none"
        >
          {/* Sleek Glass HUD Card */}
          <div className="w-56 p-4 rounded-xl hud-border relative">
            {/* Top Cyan Accent Bar */}
            <div className="absolute -top-3 right-4 w-1 h-6 bg-cyan-400 shadow-cyan-glow" />

            {/* Header */}
            <div className="font-mono text-[11px] text-slate-400 tracking-wider mb-3">
              &gt; system.status
            </div>

            {/* Metrics List */}
            <div className="space-y-1.5 font-mono text-[10px]">
              <div className="flex items-center justify-between text-slate-400">
                <span>Code</span>
                <span className="text-emerald-400 font-semibold">[ ONLINE ]</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Ideas</span>
                <span className="text-cyan-300 font-semibold">[ FLOWING ]</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Learning</span>
                <span className="text-portfolio-secondary font-semibold">[ ALWAYS ]</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Caffeine</span>
                <span className="text-amber-400 font-semibold">[ REQUIRED ]</span>
              </div>
            </div>

            {/* Bottom divider dashes */}
            <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-slate-600">
              <span>—</span>
              <span>—</span>
            </div>
          </div>
        </div>

        {/* Right-Side Editorial Text Tags from Reference */}
        <div
          ref={sideQuotesRef}
          className="absolute right-6 sm:right-12 bottom-28 z-20 hidden lg:flex flex-col items-end gap-6 pointer-events-none select-none font-mono text-[9px] text-slate-500 tracking-[0.25em] uppercase text-right"
        >
          <div className="flex flex-col leading-tight">
            <span>TURN</span>
            <span>IDEAS</span>
            <span>INTO</span>
            <span className="text-slate-400">IMPACT</span>
          </div>

          <div className="flex flex-col leading-tight">
            <span>SCROLL</span>
            <span>WITHOUT</span>
            <span className="text-slate-400">LIMITS</span>
            <span className="text-slate-600 mt-1">—</span>
          </div>
        </div>

        {/* Centerpiece: Symmetrical Headline + Center Expanding Frame */}
        <div className="relative z-20 my-auto flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 pt-16">
          {/* Subtitle above name: // COMPUTER SCIENCE ENGINEER // */}
          <p
            ref={subtitleRef}
            className="font-mono text-xs sm:text-sm text-cyan-400 tracking-[0.35em] uppercase mb-4 text-center font-medium drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]"
          >
            // COMPUTER SCIENCE ENGINEER //
          </p>

          {/* Symmetrical Center-Anchored Headline Container */}
          <div className="relative w-full flex items-center justify-center min-h-[140px] sm:min-h-[180px] lg:min-h-[220px]">
            {/* Left Half: NIKUNJ (Solid White Metallic) */}
            <h1
              ref={leftTitleRef}
              className="metallic-title font-display font-black text-[10vw] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] tracking-tighter uppercase whitespace-nowrap z-20 select-none will-change-transform"
              style={{
                position: 'absolute',
                right: '50%',
                marginRight: '0.5rem',
              }}
            >
              NIKUNJ
            </h1>

            {/* Central Expanding Workstation Frame */}
            <div
              id="hero-media-frame"
              ref={mediaFrameRef}
              data-cursor="EXPAND"
              className="absolute z-10 overflow-hidden border border-cyan-400/50 bg-[#070b16] flex items-center justify-center will-change-transform"
              style={{
                left: '50%',
                top: '50%',
              }}
            >
              {/* Workstation Media Visual */}
              <img
                ref={imageRef}
                src="/assets/workspace_bg.jpg"
                alt="Nikunj's Digital Workstation"
                className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
                loading="eager"
              />

              {/* Futuristic Cyber Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070b]/90 via-transparent to-[#05070b]/40 pointer-events-none" />
              <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-30" />

              {/* Telemetry Badges inside frame */}
              <div
                ref={mediaHudRef}
                className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between font-mono text-[11px] text-slate-300 opacity-0 pointer-events-none transition-opacity"
              >
                <div className="flex items-center gap-4 bg-[#05070bf0]/90 px-3 py-1.5 rounded-lg border border-cyan-500/20 backdrop-blur-md">
                  <div className="flex items-center gap-1.5 text-cyan-300">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>AI_ENGINE: 98.4%</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-portfolio-secondary">
                    <Database className="w-3.5 h-3.5" />
                    <span>ETL_STREAM: ACTIVE</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-emerald-400">
                    <Shield className="w-3.5 h-3.5" />
                    <span>SECURITY: SECURE</span>
                  </div>
                </div>

                <div className="bg-[#05070bf0]/90 px-3 py-1.5 rounded-lg border border-cyan-500/20 text-cyan-400 font-bold backdrop-blur-md">
                  WORKSPACE://MONITOR_01
                </div>
              </div>
            </div>

            {/* Right Half: RATHI (Hollow Cyan-to-Violet Outline matching Reference) */}
            <h1
              ref={rightTitleRef}
              className="hollow-stroke-gradient font-display font-black text-[10vw] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] tracking-tighter uppercase whitespace-nowrap z-20 select-none will-change-transform"
              style={{
                position: 'absolute',
                left: '50%',
                marginLeft: '0.5rem',
              }}
            >
              RATHI
            </h1>
          </div>

          {/* Domain Pills below Headline matching Reference Design */}
          <div
            ref={bottomMetaRef}
            className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm text-slate-300 tracking-[0.2em] uppercase select-none text-center"
          >
            <span>SOFTWARE</span>
            <span className="text-cyan-400">•</span>
            <span>DATA ANALYTICS</span>
            <span className="text-cyan-400">•</span>
            <span>AI / ML</span>
            <span className="text-cyan-400">•</span>
            <span>CYBERSECURITY</span>
            <span className="text-cyan-400">•</span>
            <span>CLOUD</span>
          </div>
        </div>

        {/* Bottom Radar Indicator & Footer Metadata */}
        <div className="relative z-20 pb-8 px-6 sm:px-12 flex items-end justify-between w-full pointer-events-none select-none">
          {/* Left Slogan */}
          <div
            ref={bottomFooterRef}
            className="font-mono text-[10px] text-slate-500 tracking-[0.2em] uppercase hidden sm:block"
          >
            &lt; CREATING A BETTER, SMARTER TOMORROW /&gt;
          </div>

          {/* Center Concentric Glowing Radar Target */}
          <div
            ref={bottomRadarRef}
            className="mx-auto relative w-11 h-11 rounded-full border border-cyan-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            <div className="w-5 h-5 rounded-full border border-cyan-400/60 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-cyan-glow animate-ping" />
            </div>
          </div>

          {/* Right Version Badge */}
          <div className="font-mono text-[10px] text-slate-500 tracking-widest hidden sm:block">
            [ v2.8.4 ]
          </div>
        </div>
      </div>
    </section>
  );
};
