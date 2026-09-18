import React, { useEffect, useState } from 'react';
import {
  X,
  Check,
  Copy,
  ExternalLink,
  Calendar,
  Building2,
  Maximize2,
  Loader2,
  AlertCircle,
  ZoomIn,
} from 'lucide-react';
import type { Certification } from '../data/achievements';

interface CredentialModalProps {
  certification: Certification | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CredentialModal: React.FC<CredentialModalProps> = ({
  certification,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [prevCertId, setPrevCertId] = useState<string | null>(null);

  // Reset loading and zoom states when certification changes (React pattern: adjusting state during render)
  if (certification && certification.id !== prevCertId) {
    setPrevCertId(certification.id);
    setImageLoaded(false);
    setImageError(false);
    setIsZoomed(false);
  }

  // Handle ESC key (close zoom viewer first if open, else close modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isZoomed, onClose]);

  // Lock body scroll when modal or zoom viewer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopyId = () => {
    if (certification?.credentialId) {
      navigator.clipboard.writeText(certification.credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen || !certification) return null;

  const credentialSourceUrl = certification.credentialUrl || certification.imageUrl;

  return (
    <>
      <style>{`
        @keyframes modal-backdrop-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modal-panel-in {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes zoom-backdrop-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-image-in {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .anim-backdrop-in {
          animation: modal-backdrop-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .anim-panel-in {
          animation: modal-panel-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .anim-zoom-backdrop {
          animation: zoom-backdrop-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .anim-zoom-image {
          animation: zoom-image-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* ===================================================================== */}
      {/* MAIN CREDENTIAL MODAL                                                 */}
      {/* ===================================================================== */}
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer anim-backdrop-in"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="credential-modal-title"
          className="relative z-10 w-full max-w-3xl bg-[#070b14] border border-cyan-500/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(34,211,238,0.15)] overflow-hidden flex flex-col max-h-[90vh] anim-panel-in"
        >
          {/* Top Ambient Glow Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          {/* ================================================================= */}
          {/* MODAL HEADER                                                      */}
          {/* ================================================================= */}
          <div className="p-6 sm:p-8 border-b border-white/10 flex items-start justify-between gap-4 bg-[#090f1d]">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {certification.category}
                </span>
                <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {certification.date}
                </span>
              </div>

              <h3
                id="credential-modal-title"
                className="font-display font-bold text-2xl sm:text-3xl text-white tracking-wide leading-tight"
              >
                {certification.title}
              </h3>

              <div className="flex items-center gap-2 text-slate-300 font-sans text-sm sm:text-base">
                <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-semibold text-white">{certification.organization}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              data-cursor="CLOSE"
              aria-label="Close modal"
              className="p-2 rounded-xl border border-white/15 bg-white/5 text-slate-400 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ================================================================= */}
          {/* MODAL BODY                                                        */}
          {/* ================================================================= */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar">
            {/* 1. ACTUAL CERTIFICATE DISPLAY CONTAINER */}
            <div className="w-full rounded-2xl border border-white/10 bg-[#050811] p-3 sm:p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0_2px_12px_rgba(0,0,0,0.8)]">
              {/* Subtle background radial ambient glow (non-intrusive) */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.25)_0%,transparent_70%)] pointer-events-none" />

              {/* Certificate Image Frame */}
              <div
                onClick={() => {
                  if (imageLoaded && !imageError) {
                    setIsZoomed(true);
                  }
                }}
                className={`relative w-full h-[260px] sm:h-[340px] md:h-[380px] flex items-center justify-center rounded-xl overflow-hidden group/cert ${
                  imageLoaded && !imageError ? 'cursor-zoom-in' : ''
                }`}
              >
                {/* Skeleton / Loading Indicator */}
                {!imageLoaded && !imageError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#070b14] z-10 animate-pulse">
                    <Loader2 className="w-7 h-7 text-cyan-400 animate-spin" />
                    <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                      Authenticating &amp; Loading Certificate...
                    </span>
                  </div>
                )}

                {/* Error State */}
                {imageError ? (
                  <div className="relative z-10 flex flex-col items-center justify-center py-10 px-4 space-y-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shadow-lg">
                      <AlertCircle className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-sm sm:text-base font-bold text-slate-200 tracking-[0.15em] block uppercase">
                        CERTIFICATE PREVIEW UNAVAILABLE
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-sm">
                        Direct preview could not be loaded from the external source. You can view the authenticated document directly.
                      </p>
                    </div>
                    <a
                      href={credentialSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-400/50 bg-cyan-950/60 text-cyan-300 font-mono text-xs font-bold tracking-wider hover:bg-cyan-900/80 hover:border-cyan-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    >
                      <span>VIEW CREDENTIAL</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ) : (
                  <>
                    {/* The Untouched Real Certificate Image */}
                    <img
                      src={certification.imageUrl}
                      alt={`${certification.title} - ${certification.organization}`}
                      referrerPolicy="no-referrer"
                      onLoad={() => setImageLoaded(true)}
                      onError={() => {
                        setImageLoaded(false);
                        setImageError(true);
                      }}
                      className={`w-full h-full object-contain rounded-lg transition-all duration-300 ease-out group-hover/cert:scale-[1.015] group-hover/cert:brightness-[1.05] ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                      }}
                    />

                    {/* Small Hover Indicator: "CLICK TO VIEW" */}
                    {imageLoaded && (
                      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 pointer-events-none opacity-0 group-hover/cert:opacity-100 transition-all duration-300 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-cyan-400/50 text-cyan-300 font-mono text-[11px] font-bold tracking-wider shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                        <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>CLICK TO VIEW</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* 2. CREDENTIAL IDENTIFIER (IF AVAILABLE) */}
            {certification.credentialId && (
              <div className="p-4 rounded-xl border border-cyan-500/20 bg-[#080e1b] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 block">
                    Credential Identifier
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-semibold text-cyan-300 select-all break-all">
                    {certification.credentialId}
                  </span>
                </div>
                <button
                  onClick={handleCopyId}
                  data-cursor="COPY"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-300 font-mono text-xs font-semibold tracking-wider transition-all self-start sm:self-auto cursor-pointer shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY ID</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* 3. VERIFIED TECHNICAL SKILLS */}
            {certification.skills && certification.skills.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                  VERIFIED TECHNICAL SKILLS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {certification.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-sans text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-200 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ================================================================= */}
          {/* MODAL FOOTER                                                      */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 border-t border-white/10 bg-[#080d19] flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-slate-300">STATUS: VERIFIED</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={credentialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="EXTERNAL"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-cyan-400/50 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-sans text-xs sm:text-sm font-bold tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              >
                <span>VIEW CREDENTIAL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                data-cursor="CLOSE"
                aria-label="Close modal"
                className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-sans text-xs sm:text-sm font-medium tracking-wider transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* CLICK TO ZOOM LIGHTBOX (FULL-RESOLUTION VIEWER)                       */}
      {/* ===================================================================== */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4 sm:p-6 select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed certificate viewer"
        >
          {/* Dark Translucent Backdrop with Backdrop Blur */}
          <div
            onClick={() => setIsZoomed(false)}
            className="absolute inset-0 bg-black/92 backdrop-blur-xl cursor-pointer anim-zoom-backdrop"
            aria-hidden="true"
          />

          {/* Top Control Bar */}
          <div className="relative z-10 w-full max-w-5xl flex items-center justify-between pb-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 font-mono text-xs text-cyan-300 font-bold tracking-wider">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>EXPANDED VIEW &bull; 100% RESOLUTION</span>
              </div>
              <span className="font-sans text-xs sm:text-sm text-slate-400 hidden sm:inline truncate max-w-md">
                {certification.title}
              </span>
            </div>

            <button
              onClick={() => setIsZoomed(false)}
              data-cursor="CLOSE"
              aria-label="Close zoom viewer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold tracking-wider transition-all cursor-pointer"
            >
              <span>ESC / CLOSE</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Enlarged Authentic Image Display */}
          <div
            onClick={() => setIsZoomed(false)}
            className="relative z-10 w-full max-w-5xl flex items-center justify-center p-2 anim-zoom-image cursor-pointer"
          >
            <img
              src={certification.imageUrl}
              alt={`${certification.title} - Full Resolution`}
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82vh] max-w-full object-contain rounded-xl border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(34,211,238,0.2)] bg-[#050811] cursor-default"
              style={{
                maxWidth: '100%',
                maxHeight: '82vh',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
