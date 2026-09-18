import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  CERTIFICATIONS_DATA, 
  type Certification, 
  type CredentialCategory 
} from '../data/achievements';
import { CredentialModal } from './CredentialModal';
import { ArrowUpRight, Sparkles, Filter } from 'lucide-react';

const CATEGORIES: CredentialCategory[] = [
  'ALL',
  'DATA',
  'CLOUD',
  'AI / ML',
  'SOFTWARE',
  'ENTREPRENEURSHIP',
];

const YEAR_SUBHEADINGS: Record<number, string> = {
  2026: 'DATA ANALYTICS & ENTERPRISE SIMULATION',
  2025: 'GOOGLE CLOUD & GENERATIVE AI ACADEMY',
  2024: 'SYSTEMS PROGRAMMING & APPLIED AI',
  2023: 'ENTREPRENEURSHIP & NATIONAL HACKATHONS',
};

export const CredentialArchive: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<CredentialCategory>('ALL');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeYearRail, setActiveYearRail] = useState<number | null>(null);

  // Entrance viewport detection: once only, never loops
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleOpenModal = (cert: Certification) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  // Filtered certifications list
  const filteredCertifications = useMemo(() => {
    if (selectedCategory === 'ALL') return CERTIFICATIONS_DATA;
    return CERTIFICATIONS_DATA.filter(
      (c) =>
        c.category === selectedCategory ||
        (c.secondaryCategories && c.secondaryCategories.includes(selectedCategory))
    );
  }, [selectedCategory]);

  // Group by year descending
  const groupedByYear = useMemo(() => {
    const map = new Map<number, Certification[]>();
    filteredCertifications.forEach((c) => {
      const arr = map.get(c.year) || [];
      arr.push(c);
      map.set(c.year, arr);
    });
    return Array.from(map.entries()).sort(([a], [b]) => b - a);
  }, [filteredCertifications]);

  // Featured certification (most recent: 2026 Business Analytics with Excel)
  const featuredCertification = useMemo(() => {
    return CERTIFICATIONS_DATA.find((c) => c.featured) || CERTIFICATIONS_DATA[0];
  }, []);

  // Distinct years available in dataset
  const allYears = useMemo(() => {
    const set = new Set(CERTIFICATIONS_DATA.map((c) => c.year));
    return Array.from(set).sort((a, b) => b - a);
  }, []);

  return (
    <section
      id="credentials"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#030509] text-white py-32 px-6 sm:px-12 lg:px-20 overflow-hidden font-sans select-none"
    >
      <style>{`
        @keyframes float-ambient {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-200px) translateX(30px); opacity: 0; }
        }
        @keyframes grid-drift {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes bg-breathe {
          0%, 100% { opacity: 0.03; transform: scale(1); }
          50% { opacity: 0.06; transform: scale(1.08); }
        }
      `}</style>

      {/* ===================================================================== */}
      {/* CONTINUOUS CINEMATIC BACKGROUND (SEAMLESS WITH SECTIONS 04 & 05)      */}
      {/* ===================================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#030509]" />
        {/* Subtle breathing radial glow */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,175,255,0.04),transparent_70%)] mix-blend-screen"
          style={{ animation: 'bg-breathe 10s ease-in-out infinite' }}
        />
        {/* Continuous technical 40px grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            animation: 'grid-drift 20s linear infinite',
          }}
        />
        {/* Ambient floating glowing nodes */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full mix-blend-screen opacity-0"
              style={{
                left: `${(i * 17 + 9) % 100}%`,
                top: `${(i * 23 + 11) % 100}%`,
                animation: `float-ambient ${16 + (i % 6) * 3}s linear infinite`,
                animationDelay: `-${(i % 8) * 2.5}s`,
              }}
            />
          ))}
        </div>
        {/* Film grain noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* ===================================================================== */}
      {/* SECTION CONTENT                                                       */}
      {/* ===================================================================== */}
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* 1. Header & Counter Statistics */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16 transition-all duration-700 ease-out ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Main Editorial Header */}
          <div className="max-w-3xl">
            <div className="font-sans text-xs sm:text-sm font-bold text-slate-400 tracking-widest uppercase mb-6 flex items-center gap-3">
              <span className="text-cyan-400">07 // CREDENTIAL ARCHIVE</span>
              <span className="h-px w-10 bg-white/20" />
              <span className="text-slate-500">AUTHENTICATED RECORDS</span>
            </div>

            <h2 className="font-display font-bold text-5xl sm:text-7xl lg:text-[84px] leading-[0.92] text-white tracking-tight uppercase mb-6">
              CERTIFICATIONS<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-portfolio-secondary">
                &amp; CREDENTIALS.
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg leading-relaxed text-slate-400 max-w-2xl">
              Selected certifications, technical programs, and industry learning milestones across
              cloud, data, AI, software engineering, and entrepreneurship.
            </p>
          </div>

          {/* Prominent Section Statistics */}
          <div className="flex items-center gap-6 sm:gap-10 p-6 rounded-2xl border border-white/10 bg-[#080d19]/80 backdrop-blur-md self-start lg:self-auto shrink-0 shadow-xl">
            <div>
              <div className="font-display font-black text-4xl sm:text-5xl text-cyan-300 leading-none mb-1">
                09
              </div>
              <div className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-slate-400 font-semibold">
                VERIFIED CREDENTIALS
              </div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <div className="font-display font-black text-2xl sm:text-3xl text-portfolio-secondary leading-none mb-1">
                2023 <span className="text-slate-500 font-normal">&mdash;</span> 2026
              </div>
              <div className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-slate-400 font-semibold">
                LEARNING TIMELINE
              </div>
            </div>
          </div>
        </div>

        {/* 2. Featured Credential Area (Most Recent Certification) */}
        {selectedCategory === 'ALL' && (
          <div
            onClick={() => handleOpenModal(featuredCertification)}
            className={`mb-16 p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-[#071326] via-[#09152b] to-[#0d0f24] hover:border-cyan-400/60 shadow-[0_0_40px_rgba(34,211,238,0.12)] transition-all duration-500 cursor-pointer group relative overflow-hidden ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cyan-300 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center gap-1.5 shadow-[0_0_12px_rgba(34,211,238,0.25)]">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    FEATURED RECENT CREDENTIAL
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {featuredCertification.date}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                  {featuredCertification.title}
                </h3>

                <div className="font-sans text-sm sm:text-base text-slate-300 flex items-center gap-2">
                  <span className="text-cyan-400 font-semibold">{featuredCertification.organization}</span>
                  <span className="text-slate-600">&bull;</span>
                  <span className="text-slate-400">Advanced Business Intelligence & Modeling</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {featuredCertification.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs px-2.5 py-1 rounded-md border border-cyan-500/20 bg-cyan-950/40 text-cyan-200"
                    >
                      [{skill.toUpperCase()}]
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side: Thumbnail Preview & View Credential CTA */}
              <div className="flex items-center gap-5 self-start lg:self-auto shrink-0">
                <div className="w-24 h-16 sm:w-32 sm:h-20 rounded-xl border border-cyan-500/30 bg-[#050811] p-1.5 flex items-center justify-center overflow-hidden shadow-lg group-hover:border-cyan-400/60 transition-colors shrink-0">
                  <img
                    src={featuredCertification.imageUrl}
                    alt={featuredCertification.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain rounded"
                  />
                </div>

                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300">
                  <span>VIEW CREDENTIAL</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Filter System */}
        <div className="mb-14 flex flex-wrap items-center gap-2 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 mr-3 text-slate-500 font-mono text-xs uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>FILTER ARCHIVE:</span>
          </div>

          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                data-cursor="FILTER"
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.5)] font-bold'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 4. Two-Column Archive Layout (Desktop) / Adaptive List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT: Year Navigation Rail (Sticky on Desktop) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 space-y-6 p-6 rounded-2xl border border-white/10 bg-[#070b14]/70 backdrop-blur-md">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-white/10 pb-3 flex items-center justify-between">
                <span>TIMELINE INDEX</span>
                <span className="text-cyan-400">9 RECORDS</span>
              </div>

              <div className="space-y-4">
                {allYears.map((year) => {
                  const count = CERTIFICATIONS_DATA.filter((c) => c.year === year).length;
                  const isHovered = activeYearRail === year;
                  return (
                    <div
                      key={year}
                      onMouseEnter={() => setActiveYearRail(year)}
                      onMouseLeave={() => setActiveYearRail(null)}
                      className="group flex items-center justify-between py-2 border-b border-white/5 cursor-pointer transition-colors"
                      onClick={() => {
                        const target = document.getElementById(`year-section-${year}`);
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isHovered ? 'bg-cyan-400 scale-150 shadow-[0_0_8px_#22d3ee]' : 'bg-slate-600'
                          }`}
                        />
                        <span
                          className={`font-display font-bold text-2xl transition-colors ${
                            isHovered ? 'text-cyan-300' : 'text-slate-400 group-hover:text-white'
                          }`}
                        >
                          {year}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-slate-500 group-hover:text-cyan-400 font-semibold">
                        [{count}]
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 text-[11px] font-mono text-slate-500 leading-relaxed">
                Click any year to jump directly to verified engineering records.
              </div>
            </div>
          </div>

          {/* RIGHT: Certification Entries Grouped by Year */}
          <div className="col-span-1 lg:col-span-9 space-y-16">
            {groupedByYear.map(([year, certs]) => (
              <div key={year} id={`year-section-${year}`} className="space-y-6">
                
                {/* Year Marker Header */}
                <div className="flex items-baseline justify-between border-b border-white/15 pb-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
                      {year}
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-cyan-400 uppercase tracking-widest hidden sm:inline-block">
                      // {YEAR_SUBHEADINGS[year] || 'VERIFIED CREDENTIALS'}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-500 font-semibold">
                    {certs.length} {certs.length === 1 ? 'CREDENTIAL' : 'CREDENTIALS'}
                  </span>
                </div>

                {/* Certification Horizontal Cards */}
                <div className="space-y-4">
                  {certs.map((cert) => {
                    const isHovered = hoveredId === cert.id;

                    return (
                      <div
                        key={cert.id}
                        onMouseEnter={() => setHoveredId(cert.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => handleOpenModal(cert)}
                        data-cursor="CREDENTIAL"
                        className={`group relative p-6 sm:p-7 rounded-2xl border transition-all duration-500 ease-out cursor-pointer overflow-hidden ${
                          isHovered
                            ? 'border-cyan-500/50 bg-[#08101e] translate-x-2 sm:translate-x-3 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(34,211,238,0.1)]'
                            : 'border-white/10 bg-[#060a14]/90 hover:border-white/20'
                        }`}
                      >
                        {/* Subtle Horizontal Accent Indicator Line on Hover */}
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-portfolio-secondary transition-all duration-500 ${
                            isHovered ? 'opacity-100' : 'opacity-0'
                          }`}
                        />

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          
                          {/* Left Details */}
                          <div className="flex items-start gap-4 sm:gap-6">
                            {/* Entry Number */}
                            <span
                              className={`font-display font-black text-2xl sm:text-3xl transition-colors duration-300 shrink-0 mt-0.5 ${
                                isHovered ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'
                              }`}
                            >
                              {cert.numberStr}
                            </span>

                            {/* Certificate Thumbnail Preview */}
                            <div className="w-16 h-12 sm:w-20 sm:h-14 shrink-0 rounded-lg border border-white/10 bg-[#050811] p-1 flex items-center justify-center overflow-hidden group-hover:border-cyan-500/40 transition-colors shadow-inner">
                              <img
                                src={cert.imageUrl}
                                alt={cert.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-contain rounded"
                              />
                            </div>

                            {/* Title & Metadata */}
                            <div className="space-y-2">
                              <h4 className="font-display font-bold text-xl sm:text-2xl lg:text-[26px] text-white tracking-wide group-hover:text-cyan-300 transition-colors leading-snug">
                                {cert.title}
                              </h4>

                              <div className="font-sans text-sm sm:text-base text-slate-300 flex flex-wrap items-center gap-x-3 gap-y-1">
                                <span className="font-semibold text-white">{cert.organization}</span>
                                <span className="text-slate-600">&bull;</span>
                                <span className="text-slate-400">{cert.date}</span>
                                {cert.credentialId && (
                                  <>
                                    <span className="text-slate-600">&bull;</span>
                                    <span className="font-mono text-xs text-cyan-400/80 bg-cyan-950/50 border border-cyan-500/30 px-2 py-0.5 rounded">
                                      ID: {cert.credentialId.length > 18 ? `${cert.credentialId.slice(0, 16)}...` : cert.credentialId}
                                    </span>
                                  </>
                                )}
                              </div>

                              {/* Skills Badges */}
                              {cert.skills && cert.skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-1">
                                  {cert.skills.map((skill) => (
                                    <span
                                      key={skill}
                                      className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 group-hover:border-cyan-500/20 transition-colors"
                                    >
                                      [{skill.toUpperCase()}]
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right Action: VIEW CREDENTIAL -> */}
                          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-400/80 group-hover:text-cyan-300 group-hover:translate-x-1.5 transition-all duration-300 shrink-0 self-start md:self-auto">
                            <span>VIEW CREDENTIAL</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Detail Modal */}
      <CredentialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        certification={selectedCert}
      />
    </section>
  );
};
