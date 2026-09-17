import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, ArrowDown, Layers, MousePointer, Hand } from 'lucide-react';
import {
  TECHNOLOGIES,
  type TechnologyItem,
  RELATIONSHIP_MAP,
  TECH_BY_ID,
} from '../data/technologyStack';
import { TechIcon } from './TechLogos';
import { TechKnowledgeModal } from './TechKnowledgeModal';

gsap.registerPlugin(ScrollTrigger);

// Clean structural default network topology without random crossing lines
const DEFAULT_CONNECTIONS: Array<{
  id: string;
  sourceId: string;
  targetId: string;
  isCore: boolean;
  accentColor: string;
}> = [
  // 1. Spokes from Engineering Core to regional cluster hubs
  { id: 'core-python', sourceId: 'core', targetId: 'python', isCore: true, accentColor: '#3ec6ff' },
  { id: 'core-sql', sourceId: 'core', targetId: 'sql', isCore: true, accentColor: '#38bdf8' },
  { id: 'core-react', sourceId: 'core', targetId: 'react', isCore: true, accentColor: '#00d8ff' },
  { id: 'core-fastapi', sourceId: 'core', targetId: 'fastapi', isCore: true, accentColor: '#059669' },
  { id: 'core-postgresql', sourceId: 'core', targetId: 'postgresql', isCore: true, accentColor: '#336791' },
  { id: 'core-pandas', sourceId: 'core', targetId: 'pandas', isCore: true, accentColor: '#6474f5' },
  { id: 'core-vertexai', sourceId: 'core', targetId: 'vertexai', isCore: true, accentColor: '#8b7bff' },
  { id: 'core-gcp', sourceId: 'core', targetId: 'gcp', isCore: true, accentColor: '#4285f4' },
  { id: 'core-iam', sourceId: 'core', targetId: 'iam', isCore: true, accentColor: '#00f0ff' },

  // 2. Meaningful regional cluster branches
  // Languages
  { id: 'branch-cplusplus', sourceId: 'python', targetId: 'cplusplus', isCore: false, accentColor: '#00d2ff' },
  { id: 'branch-typescript', sourceId: 'python', targetId: 'typescript', isCore: false, accentColor: '#3178c6' },

  // Software & Development
  { id: 'branch-nodejs', sourceId: 'react', targetId: 'nodejs', isCore: false, accentColor: '#539e43' },
  { id: 'branch-restapis', sourceId: 'fastapi', targetId: 'restapis', isCore: false, accentColor: '#818cf8' },

  // Data
  { id: 'branch-numpy', sourceId: 'pandas', targetId: 'numpy', isCore: false, accentColor: '#4d77cf' },
  { id: 'branch-powerbi', sourceId: 'postgresql', targetId: 'powerbi', isCore: false, accentColor: '#f2c811' },
  { id: 'branch-mongodb', sourceId: 'nodejs', targetId: 'mongodb', isCore: false, accentColor: '#47a248' },

  // AI / ML
  { id: 'branch-scikitlearn', sourceId: 'vertexai', targetId: 'scikitlearn', isCore: false, accentColor: '#f7931e' },
  { id: 'branch-nlp', sourceId: 'vertexai', targetId: 'nlp', isCore: false, accentColor: '#a78bfa' },

  // Cloud
  { id: 'branch-cloudstorage', sourceId: 'gcp', targetId: 'cloudstorage', isCore: false, accentColor: '#38bdf8' },
  { id: 'branch-azure', sourceId: 'gcp', targetId: 'azure', isCore: false, accentColor: '#0078d4' },

  // Security
  { id: 'branch-pam', sourceId: 'iam', targetId: 'pam', isCore: false, accentColor: '#2dd4bf' },
  { id: 'branch-dlp', sourceId: 'iam', targetId: 'dlp', isCore: false, accentColor: '#38bdf8' },
  { id: 'branch-networksecurity', sourceId: 'iam', targetId: 'networksecurity', isCore: false, accentColor: '#0ea5e9' },
  { id: 'branch-cyberautomation', sourceId: 'iam', targetId: 'cyberautomation', isCore: false, accentColor: '#10b981' },
];

export const SkillConstellation: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgFrameRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Canvas center coordinates in 1000x1000 coordinate space
  const centerX = 500;
  const centerY = 500;

  // Hover and Modal interaction state
  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<TechnologyItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullStackView, setIsFullStackView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Live node positions tracked in a ref for zero-rerender 60fps performance
  const livePositionsRef = useRef<Record<string, { x: number; y: number }>>({});
  // Node DOM refs
  const nodeElementsRef = useRef<Record<string, SVGGElement | null>>({});
  // Circuit line DOM refs
  const lineElementsRef = useRef<Record<string, SVGLineElement | null>>({});
  // Dynamic hover relation lines DOM refs
  const hoverLineElementsRef = useRef<Record<string, SVGLineElement | null>>({});
  // Pause timestamps per node when hovered
  const pauseOffsetsRef = useRef<Record<string, number>>({});
  // Animation frame ID
  const animFrameIdRef = useRef<number | null>(null);
  // Is section visible via IntersectionObserver
  const isSectionVisibleRef = useRef<boolean>(true);

  // Check prefers-reduced-motion with devtools override support
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const searchParams = new URLSearchParams(window.location.search);
    const reducedParam = searchParams.get('reduced-motion');
    const motionParam = searchParams.get('motion');

    if (reducedParam === 'true') {
      setPrefersReducedMotion(true);
    } else if (motionParam === 'true' || reducedParam === 'false') {
      setPrefersReducedMotion(false);
    } else {
      setPrefersReducedMotion(false);
    }

    const handler = (e: MediaQueryListEvent) => {
      if (reducedParam === 'true') setPrefersReducedMotion(true);
      else if (motionParam === 'true' || reducedParam === 'false') setPrefersReducedMotion(false);
      else setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Compute base static positions for initial layout
  const basePositions = useMemo(() => {
    const pos: Record<string, { x: number; y: number }> = {};
    TECHNOLOGIES.forEach((tech) => {
      const rad = (tech.angle * Math.PI) / 180;
      pos[tech.id] = {
        x: Number((centerX + tech.distance * Math.cos(rad)).toFixed(2)),
        y: Number((centerY + tech.distance * Math.sin(rad)).toFixed(2)),
      };
    });
    return pos;
  }, []);

  // Initialize livePositionsRef
  useEffect(() => {
    livePositionsRef.current = { ...basePositions };
  }, [basePositions]);

  // Compute active tech & related tech IDs
  const activeTech = selectedTech || (hoveredTechId ? TECH_BY_ID[hoveredTechId] : null);

  const relatedTechIds = useMemo(() => {
    if (!activeTech) return new Set<string>();
    const rels = RELATIONSHIP_MAP[activeTech.id] || [];
    return new Set<string>(rels);
  }, [activeTech]);

  // Dynamic hover relation lines between active tech and related tech
  const dynamicHoverLines = useMemo(() => {
    if (!activeTech) return [];
    return activeTech.relatedIds.map((relId) => ({
      id: `hover-rel-${activeTech.id}-${relId}`,
      sourceId: activeTech.id,
      targetId: relId,
      accentColor: activeTech.accentColor,
    }));
  }, [activeTech]);

  // Modal open & close handlers
  const handleOpenTechModal = useCallback((tech: TechnologyItem) => {
    setSelectedTech(tech);
    setIsFullStackView(false);
    setIsModalOpen(true);
  }, []);

  const handleOpenFullStack = useCallback(() => {
    setIsFullStackView(true);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTech(null);
    setIsFullStackView(false);
  }, []);

  // =========================================================================
  // CONTINUOUS SLOW ORGANIC ORBITAL MOVEMENT WITH DYNAMIC SVG CIRCUIT TRACKING
  // =========================================================================
  useEffect(() => {
    if (prefersReducedMotion) return;

    let startTime: number | null = null;

    const animateOrbits = (now: number) => {
      if (!startTime) startTime = now;
      const totalElapsed = (now - startTime) / 1000; // in seconds

      if (isSectionVisibleRef.current) {
        // 1. Update each technology node's coordinates
        TECHNOLOGIES.forEach((tech) => {
          const nodeEl = nodeElementsRef.current[tech.id];
          if (!nodeEl) return;

          const isHovered = hoveredTechId === tech.id;
          const duration = tech.orbitDuration || 48;
          const direction = tech.orbitDirection || 1;
          const driftPhase = tech.driftPhase || 0;

          let effectiveElapsed = totalElapsed;
          if (isHovered) {
            // Lock the elapsed time for this node while hovered
            if (pauseOffsetsRef.current[tech.id] === undefined) {
              pauseOffsetsRef.current[tech.id] = totalElapsed;
            }
            effectiveElapsed = pauseOffsetsRef.current[tech.id];
          } else if (pauseOffsetsRef.current[tech.id] !== undefined) {
            // Resume smoothly
            delete pauseOffsetsRef.current[tech.id];
          }

          // Gentle living sectoral oscillation (±10 to 14 degrees) so nodes remain in their regional clusters without colliding
          const oscillation = Math.sin(effectiveElapsed * (0.35 / (duration / 40)) + driftPhase) * 12 * direction;
          const angleDeg = tech.angle + oscillation;
          const angleRad = (angleDeg * Math.PI) / 180;

          // Organic harmonic floating drift (±5px)
          const driftX = Math.sin(effectiveElapsed * 0.45 + driftPhase) * 5;
          const driftY = Math.cos(effectiveElapsed * 0.38 + driftPhase) * 5;

          const curX = Number((centerX + tech.distance * Math.cos(angleRad) + driftX).toFixed(2));
          const curY = Number((centerY + tech.distance * Math.sin(angleRad) + driftY).toFixed(2));

          livePositionsRef.current[tech.id] = { x: curX, y: curY };

          // Update node group transform directly without triggering React re-render
          nodeEl.setAttribute('transform', `translate(${curX}, ${curY})`);
        });

        // 2. Update default structural circuit lines dynamically to follow moving nodes
        DEFAULT_CONNECTIONS.forEach((line) => {
          const lineEl = lineElementsRef.current[line.id];
          if (!lineEl) return;

          let x1 = centerX;
          let y1 = centerY;
          if (line.sourceId !== 'core') {
            const p1 = livePositionsRef.current[line.sourceId];
            if (p1) {
              x1 = p1.x;
              y1 = p1.y;
            }
          }

          const p2 = livePositionsRef.current[line.targetId];
          if (p2) {
            lineEl.setAttribute('x1', String(x1));
            lineEl.setAttribute('y1', String(y1));
            lineEl.setAttribute('x2', String(p2.x));
            lineEl.setAttribute('y2', String(p2.y));
          }
        });

        // 3. Update dynamic hover lines if active
        dynamicHoverLines.forEach((hLine) => {
          const hLineEl = hoverLineElementsRef.current[hLine.id];
          if (!hLineEl) return;

          const p1 = livePositionsRef.current[hLine.sourceId];
          const p2 = livePositionsRef.current[hLine.targetId];
          if (p1 && p2) {
            hLineEl.setAttribute('x1', String(p1.x));
            hLineEl.setAttribute('y1', String(p1.y));
            hLineEl.setAttribute('x2', String(p2.x));
            hLineEl.setAttribute('y2', String(p2.y));
          }
        });
      }

      animFrameIdRef.current = requestAnimationFrame(animateOrbits);
    };

    animFrameIdRef.current = requestAnimationFrame(animateOrbits);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [prefersReducedMotion, dynamicHoverLines, hoveredTechId]);

  // IntersectionObserver to pause requestAnimationFrame when Section 03 is off-screen
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isSectionVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // GSAP Single-Run Entrance & Parallax Lifecycle
  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;

    const ctx = gsap.context(() => {
      // 1. Background image parallax scrub
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { scale: 0.94, y: 35, opacity: 0.3 },
          {
            scale: 1.05,
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top 15%',
              scrub: true,
            },
          }
        );

        gsap.to(bgImageRef.current, {
          scale: 1.15,
          y: -45,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 15%',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 2. Assembly entrance animation: PLAYS ONCE on section entry (no looping/restarting)
      if (!prefersReducedMotion) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 65%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

            // A. Section header and typography reveal
            tl.fromTo(
              '.editorial-header-elem',
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }
            );

            // B. Engineering Core emerges and scales
            tl.fromTo(
              '.core-node-group',
              { scale: 0.45, opacity: 0, transformOrigin: 'center center' },
              { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.4)' },
              '-=0.3'
            );

            // C. Orbital guide rings draw
            tl.fromTo(
              '.orbital-ring',
              { opacity: 0, scale: 0.85, transformOrigin: 'center center' },
              { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08 },
              '-=0.4'
            );

            // D. Connection lines fade in
            tl.fromTo(
              '.constellation-circuit-line',
              { opacity: 0 },
              { opacity: 1, duration: 0.5, stagger: 0.015 },
              '-=0.3'
            );

            // E. Technology nodes pop in
            tl.fromTo(
              '.tech-node-container',
              { scale: 0, opacity: 0, transformOrigin: 'center center' },
              {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                stagger: { amount: 0.5, from: 'center' },
                ease: 'back.out(1.4)',
              },
              '-=0.4'
            );
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#050a14] py-24 sm:py-28 px-4 sm:px-8 lg:px-12 flex flex-col items-center justify-center select-none overflow-hidden"
      style={{ zIndex: 5 }}
    >
      {/* ======================================================================= */}
      {/* 1. CINEMATIC SERVER DATA CENTER BACKGROUND                             */}
      {/* ======================================================================= */}
      <div
        ref={bgFrameRef}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none will-change-transform"
      >
        <img
          ref={bgImageRef}
          src="/assets/tech_bg.jpg"
          alt="Technology Architecture Network"
          className="w-full h-full object-cover object-center will-change-transform filter contrast-[1.12] brightness-[0.80]"
        />

        {/* Environmental dark overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: 'rgba(5, 10, 20, 0.84)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a14] via-transparent to-[#050a14] pointer-events-none" />
        <div className="absolute inset-0 scanline-overlay opacity-20 pointer-events-none" />

        {/* Local radial spotlight centered behind constellation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#3ec6ff]/10 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#8b7bff]/12 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* ======================================================================= */}
      {/* 2. MAIN CONTENT STAGE (40% Left Editorial / 60% Right Constellation)   */}
      {/* ======================================================================= */}
      <div className="relative z-[5] w-full max-w-[1540px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-8 my-auto px-4 sm:px-6 lg:px-8">
        {/* ------------------------------------------------------------------- */}
        {/* LEFT COLUMN: EDITORIAL TYPOGRAPHY & INTERACTION HINTS (~44%)        */}
        {/* ------------------------------------------------------------------- */}
        <div className="w-full xl:w-[44%] shrink-0 space-y-7 text-left overflow-visible">
          <div className="space-y-4 overflow-visible">
            {/* Section number & subtitle */}
            <div className="editorial-header-elem flex items-center gap-3">
              <span className="font-ibm text-[17px] font-semibold text-cyan-400">
                03
              </span>
              <span className="text-slate-500 font-light text-[17px]">/</span>
              <span className="font-instrument text-[17px] font-semibold text-slate-200 tracking-normal">
                Technology Constellation
              </span>
            </div>

            {/* Editorial Main Headline: Integrated Ecosystem (Syne) */}
            <div className="editorial-header-elem space-y-1.5 overflow-visible">
              <h2 className="font-syne text-[clamp(64px,6.2vw,98px)] font-bold text-white leading-[0.94] tracking-[-0.035em] whitespace-nowrap">
                Integrated
              </h2>
              <h2 className="font-syne text-[clamp(64px,6.2vw,98px)] font-bold leading-[0.94] tracking-[-0.035em] whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400">
                Ecosystem
              </h2>
            </div>

            {/* Editorial Description */}
            <p className="editorial-header-elem font-instrument text-[17.5px] sm:text-[18px] text-slate-300 leading-[1.55] max-w-[500px] pt-1">
              A connected view of the technologies I use across software, data, AI/ML, cloud, and security workflows.
            </p>

            {/* Interactive Hints (Mouse & Hand) */}
            <div className="editorial-header-elem pt-3 flex flex-col sm:flex-row xl:flex-col gap-3 font-instrument text-[15.5px] text-slate-200 font-medium">
              <div className="flex items-center gap-3 px-[18px] py-[14px] rounded-xl bg-white/[0.04] border border-white/12 shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-sm w-fit transition-colors hover:border-cyan-400/40">
                <MousePointer className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>Hover to trace connections</span>
              </div>
              <div className="flex items-center gap-3 px-[18px] py-[14px] rounded-xl bg-white/[0.04] border border-white/12 shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-sm w-fit transition-colors hover:border-purple-400/40">
                <Hand className="w-5 h-5 text-[#a78bfa] shrink-0" />
                <span>Click to explore</span>
              </div>
            </div>
          </div>

          {/* Bottom-left Quote & Philosophy */}
          <div className="editorial-header-elem pt-5 border-t border-white/10 space-y-2 hidden xl:block">
            <p className="font-instrument italic text-slate-300 text-[16.5px] leading-snug">
              &ldquo;Different technologies. A unified purpose.&rdquo;
            </p>
            <p className="font-instrument text-[14.5px] font-semibold text-cyan-400 tracking-normal">
              BUILD &bull; ANALYZE &bull; AUTOMATE
            </p>
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* RIGHT STAGE: LIVING CONSTELLATION CANVAS (~56%)                     */}
        {/* ------------------------------------------------------------------- */}
        <div className="relative flex-1 w-full xl:w-[56%] max-w-[960px] xl:max-w-[1020px] aspect-square flex items-center justify-center my-2 sm:my-4">
          <svg
            ref={svgRef}
            viewBox="0 0 1000 1000"
            className="w-full h-full overflow-visible pointer-events-auto select-none"
          >
            <defs>
              {/* Core radial glowing gradient */}
              <radialGradient id="livingCoreGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#8b7bff" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#050a14" stopOpacity="0" />
              </radialGradient>

              {/* Core Dark Glass Body Gradient */}
              <radialGradient id="coreGlassSphere" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#0f2444" />
                <stop offset="55%" stopColor="#081226" />
                <stop offset="100%" stopColor="#040816" />
              </radialGradient>

              {/* Circuit glowing filter */}
              <filter id="circuitGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* ------------------------------------------------------------- */}
            {/* CONCENTRIC ORBITAL GUIDE TRACKS                               */}
            {/* ------------------------------------------------------------- */}
            <circle
              cx={centerX}
              cy={centerY}
              r="195"
              stroke="rgba(0, 240, 255, 0.15)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 6"
              className="orbital-ring"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r="305"
              stroke="rgba(139, 123, 255, 0.14)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="6 8"
              className="orbital-ring"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r="415"
              stroke="rgba(255, 255, 255, 0.09)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="8 12"
              className="orbital-ring"
            />

            {/* ------------------------------------------------------------- */}
            {/* CATEGORY LABELS IN CONSTELLATION SPACE (Instrument Sans)      */}
            {/* ------------------------------------------------------------- */}
            <g className="category-space-labels pointer-events-none opacity-90">
              {/* CLOUD (Top) */}
              <g transform="translate(500, 32)">
                <circle cx="-34" cy="-4" r="3.5" fill="#38bdf8" />
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fill="#38bdf8"
                  className="font-instrument text-[15.5px] font-semibold tracking-normal"
                >
                  CLOUD
                </text>
              </g>

              {/* AI / ML (Top-Right) */}
              <g transform="translate(845, 180)">
                <circle cx="-32" cy="-4" r="3.5" fill="#a78bfa" />
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fill="#a78bfa"
                  className="font-instrument text-[15.5px] font-semibold tracking-normal"
                >
                  AI / ML
                </text>
              </g>

              {/* DATA (Right) */}
              <g transform="translate(925, 480)">
                <circle cx="-30" cy="-4" r="3.5" fill="#60a5fa" />
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fill="#60a5fa"
                  className="font-instrument text-[15.5px] font-semibold tracking-normal"
                >
                  DATA
                </text>
              </g>

              {/* SECURITY (Bottom) */}
              <g transform="translate(500, 970)">
                <circle cx="-42" cy="-4" r="3.5" fill="#2dd4bf" />
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fill="#2dd4bf"
                  className="font-instrument text-[15.5px] font-semibold tracking-normal"
                >
                  SECURITY
                </text>
              </g>

              {/* DEVELOPMENT (Bottom-Left) */}
              <g transform="translate(145, 840)">
                <circle cx="-62" cy="-4" r="3.5" fill="#34d399" />
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fill="#34d399"
                  className="font-instrument text-[15.5px] font-semibold tracking-normal"
                >
                  DEVELOPMENT
                </text>
              </g>

              {/* LANGUAGES (Left) */}
              <g transform="translate(65, 495)">
                <circle cx="-54" cy="-4" r="3.5" fill="#38bdf8" />
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fill="#38bdf8"
                  className="font-instrument text-[15.5px] font-semibold tracking-normal"
                >
                  LANGUAGES
                </text>
              </g>
            </g>

            {/* ------------------------------------------------------------- */}
            {/* CLEAN STRUCTURAL DEFAULT CIRCUIT CONNECTION LINES             */}
            {/* ------------------------------------------------------------- */}
            {DEFAULT_CONNECTIONS.map((line) => {
              const isDirectActive =
                activeTech &&
                (line.sourceId === activeTech.id || line.targetId === activeTech.id);

              const isRelatedActive =
                activeTech &&
                (relatedTechIds.has(line.sourceId) || relatedTechIds.has(line.targetId)) &&
                (line.sourceId === activeTech.id ||
                  line.targetId === activeTech.id ||
                  (relatedTechIds.has(line.sourceId) && relatedTechIds.has(line.targetId)));

              const isDimmed = activeTech && !isDirectActive && !isRelatedActive;

              let strokeColor = line.accentColor;
              let strokeWidth = 1.1;
              let strokeOpacity = 0.16;
              let filter = undefined;
              let extraClass = '';

              if (isDirectActive) {
                strokeColor = '#00f0ff';
                strokeWidth = 2.6;
                strokeOpacity = 0.95;
                filter = 'url(#circuitGlowFilter)';
                extraClass = 'circuit-pulse-active';
              } else if (isRelatedActive) {
                strokeColor = line.accentColor;
                strokeWidth = 1.8;
                strokeOpacity = 0.8;
                filter = 'url(#circuitGlowFilter)';
                extraClass = 'circuit-pulse-active';
              } else if (isDimmed) {
                strokeOpacity = 0.04;
                strokeWidth = 0.6;
              }

              // Initial base coordinates
              const p1 = line.sourceId === 'core' ? { x: centerX, y: centerY } : basePositions[line.sourceId] || { x: centerX, y: centerY };
              const p2 = basePositions[line.targetId] || { x: centerX, y: centerY };

              return (
                <line
                  key={line.id}
                  ref={(el) => {
                    lineElementsRef.current[line.id] = el;
                  }}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeOpacity={strokeOpacity}
                  filter={filter}
                  className={`constellation-circuit-line transition-colors duration-300 ${extraClass}`}
                />
              );
            })}

            {/* ------------------------------------------------------------- */}
            {/* DYNAMIC HOVER RELATIONSHIP LINES (Ignites on Hover)           */}
            {/* ------------------------------------------------------------- */}
            {dynamicHoverLines.map((hLine) => {
              const p1 = livePositionsRef.current[hLine.sourceId] || basePositions[hLine.sourceId] || { x: centerX, y: centerY };
              const p2 = livePositionsRef.current[hLine.targetId] || basePositions[hLine.targetId] || { x: centerX, y: centerY };

              return (
                <line
                  key={hLine.id}
                  ref={(el) => {
                    hoverLineElementsRef.current[hLine.id] = el;
                  }}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="#00f0ff"
                  strokeWidth={2.4}
                  strokeOpacity={0.92}
                  filter="url(#circuitGlowFilter)"
                  className="constellation-circuit-line circuit-pulse-active transition-opacity duration-300"
                />
              );
            })}

            {/* ------------------------------------------------------------- */}
            {/* ENLARGED, LAYERED LIVING ENGINEERING CORE (STATIONARY ANCHOR) */}
            {/* ------------------------------------------------------------- */}
            <g className="core-node-group select-none pointer-events-none">
              {/* Layer 1: Ambient Breathing Glow Pulse */}
              <circle
                cx={centerX}
                cy={centerY}
                r="145"
                fill="url(#livingCoreGradient)"
                className="core-breathing-glow"
              />

              {/* Layer 2: Outer Rotating Orbit Ring with Ticks (CW) */}
              <circle
                cx={centerX}
                cy={centerY}
                r="128"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="1.6"
                strokeOpacity="0.48"
                strokeDasharray="7 16 22 16"
                className="core-ring-cw"
              />

              {/* Layer 3: Secondary Counter-Rotating Marking Ring (CCW) */}
              <circle
                cx={centerX}
                cy={centerY}
                r="114"
                fill="none"
                stroke="#8b7bff"
                strokeWidth="1.2"
                strokeOpacity="0.40"
                strokeDasharray="10 8 4 8"
                className="core-ring-ccw"
              />

              {/* Layer 4: Dark Glass Spherical Core Body (196px Diameter) */}
              <circle
                cx={centerX}
                cy={centerY}
                r="98"
                fill="url(#coreGlassSphere)"
                stroke="#00f0ff"
                strokeWidth="2.5"
                strokeOpacity="0.95"
                filter="url(#circuitGlowFilter)"
              />

              {/* Layer 5: Cyber Grid Latitude/Longitude Lines inside Core */}
              <ellipse
                cx={centerX}
                cy={centerY}
                rx="88"
                ry="44"
                fill="none"
                stroke="rgba(0, 240, 255, 0.28)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <ellipse
                cx={centerX}
                cy={centerY}
                rx="44"
                ry="88"
                fill="none"
                stroke="rgba(139, 123, 255, 0.25)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* Layer 6: Core Typography (Enlarged & Confident) */}
              <text
                x={centerX}
                y={centerY - 12}
                textAnchor="middle"
                fill="#ffffff"
                className="font-syne font-bold text-[17.5px] tracking-[0.04em] uppercase"
              >
                ENGINEERING
              </text>
              <text
                x={centerX}
                y={centerY + 12}
                textAnchor="middle"
                fill="#3ec6ff"
                className="font-instrument font-bold text-[20px] tracking-[0.08em] uppercase"
              >
                CORE
              </text>
              <text
                x={centerX}
                y={centerY + 32}
                textAnchor="middle"
                fill="#94a3b8"
                className="font-instrument text-[10px] font-semibold tracking-wider uppercase opacity-95"
              >
                BUILD &bull; ANALYZE &bull; AUTOMATE
              </text>
            </g>

            {/* ------------------------------------------------------------- */}
            {/* TECHNOLOGY NODES (Rendered with real SVGs in foreignObject)  */}
            {/* ------------------------------------------------------------- */}
            {TECHNOLOGIES.map((tech) => {
              const basePos = basePositions[tech.id];
              if (!basePos) return null;

              const isHovered = hoveredTechId === tech.id;
              const isSelected = selectedTech?.id === tech.id;
              const isActive = isHovered || isSelected;
              const isRelated = relatedTechIds.has(tech.id);
              const isDimmed = activeTech && !isActive && !isRelated;

              // Node size hierarchy (Increased 20-30% as requested: 58-64px default, 76px active)
              const isMajorTech = ['python', 'react', 'fastapi', 'postgresql', 'gcp', 'vertexai', 'iam', 'sql', 'pandas'].includes(tech.id);
              const nodeSize = isActive ? 76 : isMajorTech ? 64 : 58;
              const iconSize = isActive ? 34 : isMajorTech ? 30 : 26;

              return (
                <g
                  key={tech.id}
                  ref={(el) => {
                    nodeElementsRef.current[tech.id] = el;
                  }}
                  className="tech-node-container"
                  transform={`translate(${basePos.x}, ${basePos.y})`}
                >
                  {/* Ambient glow halo behind active or related node */}
                  {(isActive || isRelated) && (
                    <circle
                      cx={0}
                      cy={0}
                      r={isActive ? 50 : 38}
                      fill={tech.accentColor}
                      fillOpacity={isActive ? 0.42 : 0.18}
                      filter="url(#circuitGlowFilter)"
                      className="transition-all duration-300"
                    />
                  )}

                  {/* Interactive Button in ForeignObject */}
                  <foreignObject
                    x={-nodeSize / 2}
                    y={-nodeSize / 2}
                    width={nodeSize}
                    height={nodeSize}
                    className="overflow-visible"
                  >
                    <button
                      type="button"
                      tabIndex={0}
                      role="button"
                      data-cursor="EXPLORE"
                      aria-label={`${tech.name} — ${tech.categoryLabel}`}
                      onClick={() => handleOpenTechModal(tech)}
                      onMouseEnter={() => setHoveredTechId(tech.id)}
                      onMouseLeave={() => setHoveredTechId(null)}
                      onFocus={() => setHoveredTechId(tech.id)}
                      onBlur={() => setHoveredTechId(null)}
                      className="w-full h-full rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      style={{
                        backgroundColor: isActive
                          ? 'rgba(10, 20, 44, 0.96)'
                          : 'rgba(7, 14, 30, 0.92)',
                        border: `2px solid ${isActive ? tech.accentColor : `${tech.accentColor}70`}`,
                        boxShadow: isActive
                          ? `0 0 32px ${tech.glowColor}, 0 0 16px ${tech.accentColor}`
                          : isRelated
                          ? `0 0 20px ${tech.glowColor}`
                          : 'none',
                        opacity: isDimmed ? 0.35 : 1,
                        transform: isActive ? 'scale(1.15)' : 'scale(1)',
                      }}
                    >
                      <TechIcon
                        techId={tech.id}
                        size={iconSize}
                        color={isActive ? '#ffffff' : tech.accentColor}
                        className="transition-colors duration-200"
                      />
                    </button>
                  </foreignObject>

                  {/* Node Title Label Underneath/Above (15-16px Instrument Sans, 18px on hover) */}
                  <text
                    x={0}
                    y={
                      tech.id === 'dlp'
                        ? -nodeSize / 2 - (isActive ? 14 : 11)
                        : basePos.y < 160
                        ? nodeSize / 2 + (isActive ? 22 : 18)
                        : basePos.y > centerY
                        ? nodeSize / 2 + (isActive ? 22 : 18)
                        : -nodeSize / 2 - (isActive ? 14 : 11)
                    }
                    textAnchor="middle"
                    fill={isActive ? '#00f0ff' : isDimmed ? '#475569' : '#e2e8f0'}
                    className={`font-instrument pointer-events-none transition-all duration-200 ${
                      isActive ? 'text-[18px] font-bold' : 'text-[15px] font-semibold'
                    }`}
                    style={{
                      opacity: isDimmed ? 0.35 : 1,
                      textShadow: isActive ? '0 0 12px rgba(0, 240, 255, 0.9), 0 0 22px rgba(0, 240, 255, 0.5)' : 'none',
                    }}
                  >
                    {tech.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* ------------------------------------------------------------- */}
          {/* FLOATING HOVER HUD TOOLTIP (Syne + Instrument Sans)           */}
          {/* ------------------------------------------------------------- */}
          {activeTech && !isModalOpen && (
            <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 bg-[#080e1c]/95 border border-cyan-400/40 px-5 py-3 rounded-2xl backdrop-blur-xl text-center pointer-events-none shadow-[0_0_25px_rgba(0,240,255,0.25)] z-20 transition-all duration-200 flex items-center gap-3.5">
              <div
                className="w-9 h-9 rounded-xl border flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${activeTech.accentColor}20`,
                  borderColor: `${activeTech.accentColor}50`,
                }}
              >
                <TechIcon techId={activeTech.id} size={20} color={activeTech.accentColor} />
              </div>

              <div className="text-left">
                <span className="font-syne font-bold text-[18px] text-white block leading-tight">
                  {activeTech.name.toUpperCase()}
                </span>
                <span className="font-instrument text-[13.5px] text-cyan-300 font-semibold block">
                  {activeTech.categoryLabel}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 3. VIEW FULL STACK ACTION & FOOTER BANNER                              */}
      {/* ======================================================================= */}
      <div className="relative z-[5] mt-8 flex flex-col items-center gap-4">
        <button
          onClick={handleOpenFullStack}
          data-cursor="EXPLORE"
          className="group flex items-center gap-3 h-[52px] px-[26px] rounded-xl border border-cyan-400/30 bg-cyan-950/20 hover:bg-cyan-900/30 hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] hover:-translate-y-0.5 transition-all duration-300 font-instrument text-[15.5px] font-semibold text-slate-100 hover:text-white select-none shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        >
          <Layers className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
          <span>VIEW FULL STACK DIRECTORY</span>
          <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform duration-300">↗</span>
        </button>

        {/* Ambient bottom status */}
        <div className="flex items-center gap-5 sm:gap-6 font-instrument text-[13.5px] text-slate-300 pt-2">
          <span>TECHNOLOGY TURNS IDEAS INTO IMPACT</span>
          <span className="text-slate-600">&bull;</span>
          <span className="text-cyan-400/90 font-semibold">SCROLL &bull; EXPLORE &bull; BUILD MORE</span>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 4. CRITICAL TRANSITION BANNER (Preserved Leading into Projects)         */}
      {/* ======================================================================= */}
      <div className="relative z-[5] w-full max-w-4xl mx-auto mt-8 p-5 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/20 via-[#070d1a] to-purple-950/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 font-ibm text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-300">
            <Cpu className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <span className="text-slate-400">NETWORK ROUTING: </span>
            <span className="text-cyan-300 font-bold">PYTHON \ DATA \ PIPELINE \ PROJECT</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-portfolio-secondary">
          <span>INITIALIZING PROJECT SHOWCASE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 5. TECHNOLOGY KNOWLEDGE MODAL / DOCKED CARD                             */}
      {/* ======================================================================= */}
      <TechKnowledgeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedTech={selectedTech}
        onSelectTech={handleOpenTechModal}
        isFullStackView={isFullStackView}
        onOpenFullStack={handleOpenFullStack}
      />
    </section>
  );
};
