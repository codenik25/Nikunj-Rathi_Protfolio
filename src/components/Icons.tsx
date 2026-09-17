import React from 'react';

export const IconGithub: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const IconLinkedin: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const IconX: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const IconMail: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// Tech Icons with accurate branding colors/paths
export const TechIconPython: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M11.9 2C6.9 2 7.2 4.1 7.2 4.1l.01 2.2h4.8v.7H5.2S2 6.6 2 11.8c0 5.1 2.8 5 2.8 5h1.7v-2.4s-.1-2.8 2.8-2.8h4.8s2.7.1 2.7-2.6V4.6S17 2 11.9 2zm-1.4 1.5a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z" fill="#3776AB"/>
    <path d="M12.1 22c5 0 4.7-2.1 4.7-2.1l-.01-2.2H12v-.7h6.8s3.2.4 3.2-4.8c0-5.1-2.8-5-2.8-5h-1.7v2.4s.1 2.8-2.8 2.8H9.9s-2.7-.1-2.7 2.6v4.3S7 22 12.1 22zm1.4-1.5a.9.9 0 1 1 0-1.8.9.9 0 0 1 0-1.8z" fill="#FFD43B"/>
  </svg>
);

export const TechIconCpp: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7.8v11.6L12 22l10-2.6V7.8L12 2z" fill="#00599C" opacity="0.8"/>
    <path d="M12 5.5a6.5 6.5 0 1 0 4.6 11.1l-1.8-1.8a4 4 0 1 1 0-5.6l1.8-1.8A6.47 6.47 0 0 0 12 5.5z" fill="#FFFFFF"/>
    <path d="M18 10h-1v2h-2v1h2v2h1v-2h2v-1h-2v-2zm4 0h-1v2h-2v1h2v2h1v-2h2v-1h-2v-2z" fill="#004482"/>
  </svg>
);

export const TechIconJS: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
    <path d="M6.5 18.5l2-1.2c.4.7.8 1.2 1.6 1.2.8 0 1.3-.3 1.3-1.5v-7.5h2.5v7.5c0 2.4-1.4 3.5-3.8 3.5-2 0-3.1-1-3.6-2zm8.5 0l2-1.2c.5.8 1.1 1.4 2.2 1.4 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.9-1.6l-.7-.3c-2-.9-3.3-2-3.3-4.3 0-2.2 1.7-3.8 4.2-3.8 1.8 0 3.1.6 4 2.2l-2 1.3c-.4-.7-.9-1-1.9-1-.9 0-1.5.5-1.5 1.1 0 .7.6 1 1.8 1.5l.7.3c2.4 1 3.5 2.1 3.5 4.5 0 2.6-2 4-4.5 4-2.5 0-4-1.2-4.7-2.9z" fill="#000000"/>
  </svg>
);

export const TechIconReact: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="-11.5 -10.23174 23 20.46348">
    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

export const TechIconNext: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill="#000000" stroke="#333" strokeWidth="1"/>
    <path d="M15.5 8.5v7m-7-7v7l7.5-7.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TechIconPostgres: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#336791" opacity="0.2"/>
    <path d="M12 4c-4.42 0-8 3.58-8 8 0 3.31 2.01 6.16 4.88 7.35.34.07.46-.15.46-.33v-1.18c-2.22.48-2.69-.95-2.69-.95-.36-.92-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .19.12.41.47.34A8.01 8.01 0 0 0 20 12c0-4.42-3.58-8-8-8z" fill="#336791"/>
  </svg>
);

export const TechIconAzure: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M13.05 3.5L5.7 15.3l4.65 3.2 8.55-15h-5.85z" fill="#0089D6"/>
    <path d="M13.6 15.2l-3.3 4.3 8 2.5 3.7-6.8H13.6z" fill="#0072C6"/>
  </svg>
);

export const TechIconGCP: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/>
  </svg>
);
