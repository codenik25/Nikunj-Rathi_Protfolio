import React, { useRef, useEffect } from 'react';

interface ExperienceCircuitPathProps {
  activeNodeIndex?: number | null;
}

export const ExperienceCircuitPath: React.FC<ExperienceCircuitPathProps> = ({
  activeNodeIndex = null,
}) => {
  const isHighlighted = activeNodeIndex !== null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        className="w-full h-full min-h-[900px]"
        viewBox="0 0 1000 1600"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3ec6ff" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#00f0ff" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#a855f7" stopOpacity="0.7" />
            <stop offset="85%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
          </linearGradient>

          <filter id="circuitGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* 1. Base Circuit Path Geometry Connecting the 5 Node Zones */}
        <path
          id="mainCircuitTrack"
          d="M 280,140 C 350,220 650,240 720,380 C 780,520 220,620 280,780 C 340,940 760,1020 720,1180 C 680,1320 380,1400 480,1520"
          stroke="rgba(0, 240, 255, 0.12)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* 2. Illuminated Overlay Path */}
        <path
          d="M 280,140 C 350,220 650,240 720,380 C 780,520 220,620 280,780 C 340,940 760,1020 720,1180 C 680,1320 380,1400 480,1520"
          stroke="url(#circuitGrad)"
          strokeWidth={isHighlighted ? '4' : '2'}
          strokeDasharray="8 6"
          fill="none"
          filter={isHighlighted ? 'url(#circuitGlow)' : undefined}
          className="transition-all duration-500"
          opacity={isHighlighted ? 0.95 : 0.65}
        />

        {/* 3. Continuously Traveling Data Particles */}
        {/* Packet 1 */}
        <circle r="5" fill="#3ec6ff" filter="url(#circuitGlow)">
          <animateMotion
            dur={isHighlighted ? '4s' : '7s'}
            repeatCount="indefinite"
            calcMode="linear"
          >
            <mpath href="#mainCircuitTrack" />
          </animateMotion>
        </circle>

        {/* Packet 2 */}
        <circle r="4" fill="#a855f7" filter="url(#circuitGlow)">
          <animateMotion
            dur={isHighlighted ? '4.5s' : '8s'}
            begin="2.5s"
            repeatCount="indefinite"
            calcMode="linear"
          >
            <mpath href="#mainCircuitTrack" />
          </animateMotion>
        </circle>

        {/* Packet 3 */}
        <circle r="3.5" fill="#00f0ff" filter="url(#circuitGlow)">
          <animateMotion
            dur={isHighlighted ? '3.5s' : '6s'}
            begin="1.2s"
            repeatCount="indefinite"
            calcMode="linear"
          >
            <mpath href="#mainCircuitTrack" />
          </animateMotion>
        </circle>

        {/* Packet 4 */}
        <circle r="4" fill="#10b981" filter="url(#circuitGlow)">
          <animateMotion
            dur={isHighlighted ? '4s' : '7s'}
            begin="4.5s"
            repeatCount="indefinite"
            calcMode="linear"
          >
            <mpath href="#mainCircuitTrack" />
          </animateMotion>
        </circle>
      </svg>
    </div>
  );
};
