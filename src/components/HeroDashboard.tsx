import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { profileData } from '../data/profile';
import { Terminal } from './Terminal';

export const HeroDashboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial entrance after loading screen
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
    tl.fromTo(statsRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    // Parallax effect on scroll
    gsap.to(containerRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 px-6 lg:px-24">
      <div ref={containerRef} className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div ref={textRef} className="flex flex-col gap-6 z-10">
          <div className="inline-block px-4 py-2 border border-portfolio-accent/30 bg-portfolio-accent/10 rounded-full text-portfolio-accent text-xs font-mono w-max">
            SYSTEM STATUS ● ONLINE
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            {profileData.name}
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-mono text-portfolio-gray">
            {profileData.role}
          </h2>
          
          <div className="text-lg md:text-xl font-sans text-portfolio-light/80 max-w-lg mt-4 border-l-2 border-portfolio-secondary pl-6 whitespace-pre-line">
            {profileData.tagline}
          </div>

          <p className="text-portfolio-gray/80 max-w-lg mt-2">
            {profileData.introduction}
          </p>
        </div>

        <div ref={statsRef} className="flex flex-col gap-8 z-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-6 rounded-xl flex flex-col gap-2">
              <span className="text-4xl font-mono text-portfolio-accent">{profileData.stats.leetcode}</span>
              <span className="text-xs text-portfolio-gray font-mono uppercase tracking-wider">LeetCode Problems</span>
            </div>
            <div className="glass-panel p-6 rounded-xl flex flex-col gap-2">
              <span className="text-4xl font-mono text-portfolio-secondary">{profileData.stats.projects}</span>
              <span className="text-xs text-portfolio-gray font-mono uppercase tracking-wider">Major Projects</span>
            </div>
            <div className="glass-panel p-6 rounded-xl flex flex-col gap-2">
              <span className="text-4xl font-mono text-portfolio-success">0{profileData.stats.internships}</span>
              <span className="text-xs text-portfolio-gray font-mono uppercase tracking-wider">Industry Internship</span>
            </div>
            <div className="glass-panel p-6 rounded-xl flex flex-col gap-2">
              <span className="text-4xl font-mono text-portfolio-light">{profileData.stats.graduation}</span>
              <span className="text-xs text-portfolio-gray font-mono uppercase tracking-wider">Graduation</span>
            </div>
          </div>
          
          <Terminal />
        </div>
      </div>
    </section>
  );
};
