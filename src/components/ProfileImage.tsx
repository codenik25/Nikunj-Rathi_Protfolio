import React, { useRef, useState, useEffect } from 'react';

const profileImg = '/profile.jpg';

export const ProfileImage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Trigger entrance when Section 08 enters viewport; disconnect ensures once: true (no looping on scroll away)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor="PORTRAIT"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center shrink-0 group select-none"
      style={{
        // Prevent layout shift: reserved bounds for HUD rings
        width: 'clamp(280px, 35vw, 440px)',
        height: 'clamp(280px, 35vw, 440px)',
      }}
    >
      <style>{`
        @keyframes hud-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes hud-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes hud-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.015); }
        }
        .anim-hud-cw {
          transform-origin: 250px 250px;
          animation: hud-cw 34s linear infinite;
        }
        .anim-hud-cw-fast {
          transform-origin: 250px 250px;
          animation: hud-cw 18s linear infinite;
        }
        .anim-hud-ccw {
          transform-origin: 250px 250px;
          animation: hud-ccw 44s linear infinite;
        }
        .anim-hud-ccw-fast {
          transform-origin: 250px 250px;
          animation: hud-ccw 22s linear infinite;
        }
        .anim-ambient-glow {
          animation: hud-pulse 4s ease-in-out infinite;
        }
      `}</style>

      {/* ===================================================================== */}
      {/* 1. AMBIENT GLOW BACKDROP (BEHIND PHOTO, Z-0)                          */}
      {/* ===================================================================== */}
      <div
        className={`absolute inset-2 sm:inset-4 rounded-full pointer-events-none z-0 anim-ambient-glow transition-all duration-700 ${
          isInView
            ? isHovered
              ? 'opacity-90 scale-105'
              : 'opacity-55 scale-100'
            : 'opacity-0 scale-[0.88]'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.22) 0%, rgba(139, 92, 246, 0.12) 42%, transparent 72%)',
          filter: 'blur(20px)',
        }}
      />

      {/* ===================================================================== */}
      {/* 2. FUTURISTIC HUD FRAME (AROUND / BEHIND PHOTO, Z-0)                   */}
      {/* ===================================================================== */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible transition-all duration-800 ease-out ${
          isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <defs>
          <filter id="profile-cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="profile-purple-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="hud-arc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Outer Fine Guideline Ring */}
        <circle
          cx="250"
          cy="250"
          r="238"
          stroke="#22d3ee"
          strokeWidth="1"
          strokeOpacity={isHovered ? 0.45 : 0.2}
          className="transition-all duration-500"
        />

        {/* Segmented Outer Clockwise Ring with Primary Orbiting Node */}
        <g className={isHovered ? 'anim-hud-cw-fast' : 'anim-hud-cw'}>
          <circle
            cx="250"
            cy="250"
            r="230"
            stroke="url(#hud-arc-grad)"
            strokeWidth={isHovered ? 1.8 : 1.4}
            strokeDasharray="45 15 90 35 25 20 130 50"
            strokeLinecap="round"
            strokeOpacity={isHovered ? 0.9 : 0.6}
            className="transition-all duration-500"
            filter="url(#profile-cyan-glow)"
          />
          {/* Primary Orbiting Cyan Satellite Node */}
          <circle
            cx="250"
            cy="20"
            r={isHovered ? 4.5 : 3.5}
            fill="#22d3ee"
            filter="url(#profile-cyan-glow)"
            className="transition-all duration-500"
          />
          <circle cx="250" cy="20" r="1.5" fill="#ffffff" />
          {/* Secondary Opposite Accent Node */}
          <circle
            cx="250"
            cy="480"
            r="2.5"
            fill="#38bdf8"
            opacity="0.8"
          />
        </g>

        {/* Counter-Clockwise Subtle Inner Dashed Ring with Violet Node */}
        <g className={isHovered ? 'anim-hud-ccw-fast' : 'anim-hud-ccw'}>
          <circle
            cx="250"
            cy="250"
            r="216"
            stroke="#a78bfa"
            strokeWidth="1.2"
            strokeDasharray="4 12 18 12"
            strokeOpacity={isHovered ? 0.75 : 0.4}
            className="transition-all duration-500"
          />
          {/* Orbiting Violet Node */}
          <circle
            cx="466"
            cy="250"
            r={isHovered ? 3.5 : 2.5}
            fill="#c084fc"
            filter="url(#profile-purple-glow)"
            className="transition-all duration-500"
          />
          <circle cx="466" cy="250" r="1" fill="#ffffff" />
        </g>

        {/* Stationary Precision Crosshairs & Corner Ticks (0°, 90°, 180°, 270°) */}
        <g stroke="#38bdf8" strokeWidth="1.5" strokeOpacity={isHovered ? 0.8 : 0.4} className="transition-all duration-500">
          {/* Top */}
          <line x1="250" y1="5" x2="250" y2="15" />
          {/* Bottom */}
          <line x1="250" y1="485" x2="250" y2="495" />
          {/* Left */}
          <line x1="5" y1="250" x2="15" y2="250" />
          {/* Right */}
          <line x1="485" y1="250" x2="495" y2="250" />
        </g>

        {/* Precision HUD telemetry badges outside the photo perimeter */}
        <text
          x="250"
          y="244"
          textAnchor="middle"
          className="font-mono text-[8px] fill-cyan-400/50 uppercase tracking-[0.25em]"
          style={{ transform: 'translate(195px, -195px)' }}
        >
          SYS // 08
        </text>
      </svg>

      {/* ===================================================================== */}
      {/* 3. CIRCULAR PHOTO FRAME (Z-10, IN FRONT OF HUD)                      */}
      {/* ===================================================================== */}
      <div
        className={`relative z-10 w-[230px] h-[230px] sm:w-[260px] sm:h-[260px] md:w-[290px] md:h-[290px] lg:w-[320px] lg:h-[320px] xl:w-[345px] xl:h-[345px] rounded-full overflow-hidden bg-[#080d19] border-2 transition-all duration-700 ease-out cursor-pointer ${
          isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.92]'
        }`}
        style={{
          borderColor: isHovered ? 'rgba(34, 211, 238, 0.8)' : 'rgba(34, 211, 238, 0.3)',
          boxShadow: isHovered
            ? '0 0 50px rgba(34, 211, 238, 0.38), 0 0 25px rgba(168, 85, 247, 0.22)'
            : '0 0 30px rgba(34, 211, 238, 0.15)',
        }}
      >
        {/* The Real Profile Image */}
        <img
          src={profileImg}
          alt="Nikunj Rathi"
          className="w-full h-full object-cover object-center rounded-full transition-transform duration-500 ease-out"
          style={{
            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          }}
          loading="eager"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== '/profile.jpg') {
              target.src = '/profile.jpg';
            }
          }}
        />

        {/* Subtle Perimeter Edge Ring to blend with dark interface without covering face */}
        <div
          className="absolute inset-0 rounded-full ring-1 ring-inset transition-all duration-500 pointer-events-none"
          style={{
            borderColor: isHovered ? 'rgba(34, 211, 238, 0.4)' : 'rgba(255, 255, 255, 0.08)',
          }}
        />
      </div>
    </div>
  );
};
