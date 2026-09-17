import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { X, TrendingUp, Award, CheckCircle2 } from 'lucide-react';
import { academicPerformance, currentAcademicOverview, type SemesterData } from '../data/academicPerformance';

interface AcademicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AcademicModal: React.FC<AcademicModalProps> = ({ isOpen, onClose }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [hoveredSem, setHoveredSem] = useState<SemesterData | null>(null);
  const [chartAnimated, setChartAnimated] = useState(false);

  // Handle open / close animation states
  useEffect(() => {
    if (isOpen) {
      // Trigger entrance transition on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setModalVisible(true);
        });
      });
      // Start chart drawing animation 150ms after modal begins opening
      const timer = setTimeout(() => {
        setChartAnimated(true);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setModalVisible(false);
      setChartAnimated(false);
      setHoveredSem(null);
    }
  }, [isOpen]);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // SVG Chart Geometry Calculations
  // ViewBox: 560 x 240
  const chartConfig = useMemo(() => {
    const width = 560;
    const height = 240;
    const padding = { top: 35, right: 35, bottom: 45, left: 55 };

    const plotW = width - padding.left - padding.right;
    const plotH = height - padding.top - padding.bottom;

    const minCgpa = 8.90;
    const maxCgpa = 9.50;
    const cgpaRange = maxCgpa - minCgpa;

    const points = academicPerformance.map((item, index) => {
      const x = padding.left + (index / (academicPerformance.length - 1)) * plotW;
      const normalizedY = (item.cgpa - minCgpa) / cgpaRange;
      const y = padding.top + (1 - normalizedY) * plotH;
      return { ...item, x, y };
    });

    // Create polyline / path string
    const pathD = points.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
    }, '');

    // Area path string under the line
    const areaD = `${pathD} L ${points[points.length - 1].x},${padding.top + plotH} L ${points[0].x},${padding.top + plotH} Z`;

    // Horizontal grid lines: 9.40, 9.30, 9.20, 9.10, 9.00
    const gridLines = [9.40, 9.30, 9.20, 9.10, 9.00].map((val) => {
      const normalizedY = (val - minCgpa) / cgpaRange;
      const y = padding.top + (1 - normalizedY) * plotH;
      return { val: val.toFixed(2), y };
    });

    return {
      width,
      height,
      padding,
      plotW,
      plotH,
      points,
      pathD,
      areaD,
      gridLines,
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-3.5 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="academic-modal-title"
    >
      {/* 1. Backdrop Overlay (Z-Index: 80 layer in hierarchy) */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-md transition-opacity duration-300 ease-out"
        style={{ opacity: modalVisible ? 1 : 0 }}
      />

      {/* 2. Centered Modal Dialog Window (Z-Index: 90 layer) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-[90] w-full max-w-3xl rounded-2xl border bg-[#080e1c]/95 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl transition-all duration-350 ease-out max-h-[88vh] overflow-y-auto"
        style={{
          opacity: modalVisible ? 1 : 0,
          transform: modalVisible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(15px)',
          borderColor: 'rgba(62, 198, 255, 0.45)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 35px rgba(62, 198, 255, 0.18)',
        }}
      >
        {/* Top Accent Gradient Line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #3ec6ff, #8b7bff, transparent)',
          }}
        />

        {/* =================================================================== */}
        {/* HEADER: Eyebrow + Close Button                                      */}
        {/* =================================================================== */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2">
            <span className="font-sans text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded border border-[#3ec6ff]/40 bg-[#3ec6ff]/10 text-[#3ec6ff]">
              EDUCATION / ACADEMIC RECORD
            </span>
          </div>

          <button
            onClick={onClose}
            data-cursor="nav"
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/10 hover:rotate-90 transition-all duration-200 focus:outline-none cursor-pointer"
            aria-label="Close academic record modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Degree Title & Institution */}
        <div className="mb-6">
          <h2
            id="academic-modal-title"
            className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight"
          >
            {currentAcademicOverview.degree}
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-300 font-medium mt-1">
            {currentAcademicOverview.institution}
          </p>
        </div>

        {/* =================================================================== */}
        {/* CURRENT CGPA HIGHLIGHT CARD                                         */}
        {/* =================================================================== */}
        <div className="p-5 rounded-xl border border-white/10 bg-[#0d162a]/80 mb-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-sans text-xs text-slate-400 font-semibold tracking-wider uppercase">
              CURRENT CGPA
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-[#8b7bff]">
                {currentAcademicOverview.currentCGPA}
              </span>
              <span className="font-sans text-lg sm:text-xl text-slate-400 font-normal">
                / {currentAcademicOverview.maxCGPA}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-1.5 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Award className="w-3.5 h-3.5" />
              <span>Consistently Above 9.0 CGPA</span>
            </div>
            <span className="font-sans text-xs text-slate-400 font-medium">
              Evaluated across 6 semesters completed
            </span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* TWO-COLUMN DETAILS: SEMESTER TABLE & PROGRESSION GRAPH              */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* LEFT COLUMN: Clean Semester Table (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-xs font-semibold text-slate-400 uppercase tracking-wider">
                SEMESTER PERFORMANCE
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">
                1–6 SEMESTERS
              </span>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0a1224]/60 overflow-hidden divide-y divide-white/5">
              {/* Table Header */}
              <div className="grid grid-cols-12 px-4 py-2.5 bg-white/[0.02] text-slate-400 font-sans text-xs font-semibold uppercase tracking-wider">
                <div className="col-span-4">SEMESTER</div>
                <div className="col-span-4 text-center">CGPA</div>
                <div className="col-span-4 text-right">STATUS</div>
              </div>

              {/* Table Rows */}
              {academicPerformance.map((sem) => {
                const isHovered = hoveredSem?.semNum === sem.semNum;
                return (
                  <div
                    key={sem.semNum}
                    onMouseEnter={() => setHoveredSem(sem)}
                    onMouseLeave={() => setHoveredSem(null)}
                    className="grid grid-cols-12 items-center px-4 py-2.5 text-sm transition-colors duration-200 cursor-default select-none"
                    style={{
                      backgroundColor: isHovered
                        ? 'rgba(62, 198, 255, 0.08)'
                        : sem.isLatest
                        ? 'rgba(62, 198, 255, 0.03)'
                        : 'transparent',
                    }}
                  >
                    <div className="col-span-4 font-mono text-xs text-slate-300 font-medium flex items-center gap-1.5">
                      <span className={sem.isLatest ? 'text-[#3ec6ff] font-bold' : 'text-slate-400'}>
                        {sem.semShort}
                      </span>
                      <span className="text-slate-400 text-[11px] hidden sm:inline">
                        ({sem.semester.replace('Semester ', 'S')})
                      </span>
                    </div>

                    <div className="col-span-4 text-center font-sans font-bold text-sm">
                      <span
                        className={
                          sem.isLatest
                            ? 'text-emerald-400'
                            : isHovered
                            ? 'text-[#3ec6ff]'
                            : 'text-white'
                        }
                      >
                        {sem.cgpa.toFixed(2)}
                      </span>
                    </div>

                    <div className="col-span-4 text-right">
                      {sem.isLatest ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#3ec6ff]/15 text-[#3ec6ff] border border-[#3ec6ff]/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3ec6ff] animate-pulse" />
                          Current
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-normal">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive SVG Progression Line Chart (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#3ec6ff]" />
                <h3 className="font-sans text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  PERFORMANCE PROGRESSION GRAPH
                </h3>
              </div>
              <span className="text-[11px] text-[#3ec6ff] font-sans font-medium">
                S1 → S6 Trend
              </span>
            </div>

            <div className="relative rounded-xl border border-white/10 bg-[#0a1224]/80 p-3 sm:p-4 overflow-hidden select-none">
              {/* SVG Line Chart */}
              <svg
                viewBox={`0 0 ${chartConfig.width} ${chartConfig.height}`}
                className="w-full h-auto overflow-visible"
              >
                <defs>
                  {/* Line Gradient */}
                  <linearGradient id="academicLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3ec6ff" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b7bff" />
                  </linearGradient>

                  {/* Area Fill Gradient */}
                  <linearGradient id="academicAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3ec6ff" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#3ec6ff" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Dot Glow Filter */}
                  <filter id="academicDotGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Horizontal Grid Lines & Y-Axis Labels */}
                {chartConfig.gridLines.map((grid, i) => (
                  <g key={i}>
                    <line
                      x1={chartConfig.padding.left}
                      y1={grid.y}
                      x2={chartConfig.width - chartConfig.padding.right}
                      y2={grid.y}
                      stroke="rgba(255, 255, 255, 0.08)"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                    />
                    <text
                      x={chartConfig.padding.left - 10}
                      y={grid.y + 4}
                      fill="#64748b"
                      fontSize="10"
                      fontFamily="Manrope, sans-serif"
                      textAnchor="end"
                    >
                      {grid.val}
                    </text>
                  </g>
                ))}

                {/* Area under the curve */}
                <path
                  d={chartConfig.areaD}
                  fill="url(#academicAreaGradient)"
                  className="transition-opacity duration-1000"
                  style={{
                    opacity: chartAnimated ? 1 : 0,
                  }}
                />

                {/* Animated Line Path from S1 to S6 */}
                <path
                  d={chartConfig.pathD}
                  fill="none"
                  stroke="url(#academicLineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 750,
                    strokeDashoffset: chartAnimated ? 0 : 750,
                    transition: 'stroke-dashoffset 900ms cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                />

                {/* Data Points & X-Axis Labels */}
                {chartConfig.points.map((pt) => {
                  const isHovered = hoveredSem?.semNum === pt.semNum;
                  return (
                    <g
                      key={pt.semNum}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredSem(pt)}
                      onMouseLeave={() => setHoveredSem(null)}
                    >
                      {/* Vertical Guideline on Hover */}
                      {isHovered && (
                        <line
                          x1={pt.x}
                          y1={chartConfig.padding.top}
                          x2={pt.x}
                          y2={chartConfig.height - chartConfig.padding.bottom}
                          stroke="#3ec6ff"
                          strokeDasharray="2 2"
                          strokeWidth="1"
                          strokeOpacity="0.5"
                        />
                      )}

                      {/* Pulsing ring for latest semester */}
                      {pt.isLatest && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHovered ? 12 : 9}
                          fill="none"
                          stroke="#3ec6ff"
                          strokeWidth="1.5"
                          opacity="0.5"
                          className="animate-ping"
                          style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
                        />
                      )}

                      {/* Outer Ring on Hover */}
                      {isHovered && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="9"
                          fill="rgba(62, 198, 255, 0.2)"
                          stroke="#3ec6ff"
                          strokeWidth="1.5"
                        />
                      )}

                      {/* Main Circular Data Point */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 6 : 4.5}
                        fill="#080e1c"
                        stroke={isHovered ? '#ffffff' : pt.isLatest ? '#3ec6ff' : '#60a5fa'}
                        strokeWidth={isHovered ? 2.5 : 2}
                        filter="url(#academicDotGlow)"
                        style={{
                          opacity: chartAnimated ? 1 : 0,
                          transition: 'opacity 500ms ease, r 200ms ease, stroke 200ms ease',
                        }}
                      />

                      {/* X-Axis Label */}
                      <text
                        x={pt.x}
                        y={chartConfig.height - chartConfig.padding.bottom + 18}
                        fill={isHovered ? '#3ec6ff' : pt.isLatest ? '#e2e8f0' : '#64748b'}
                        fontSize="11"
                        fontWeight={isHovered || pt.isLatest ? '600' : '400'}
                        fontFamily="Manrope, sans-serif"
                        textAnchor="middle"
                      >
                        {pt.semShort}
                      </text>
                      <text
                        x={pt.x}
                        y={chartConfig.height - chartConfig.padding.bottom + 30}
                        fill="#475569"
                        fontSize="9"
                        fontFamily="Manrope, sans-serif"
                        textAnchor="middle"
                      >
                        Sem
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip on Hover */}
              {hoveredSem && (
                <div
                  className="absolute pointer-events-none transition-all duration-150 ease-out z-20 px-3 py-1.5 rounded-lg border border-[#3ec6ff]/40 bg-[#060c18]/95 backdrop-blur-md shadow-xl text-center"
                  style={{
                    left: `${(chartConfig.points[hoveredSem.semNum - 1].x / chartConfig.width) * 100}%`,
                    top: `${(chartConfig.points[hoveredSem.semNum - 1].y / chartConfig.height) * 100}%`,
                    transform: 'translate(-50%, -125%)',
                  }}
                >
                  <div className="font-sans text-[11px] font-bold text-slate-300">
                    {hoveredSem.semester}
                  </div>
                  <div className="font-sans text-xs font-extrabold text-[#3ec6ff]">
                    CGPA: {hoveredSem.cgpa.toFixed(2)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
