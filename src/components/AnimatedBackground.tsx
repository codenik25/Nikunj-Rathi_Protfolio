import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const AnimatedBackground: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle background movement based on mouse
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      gsap.to(bgRef.current, {
        x: x,
        y: y,
        duration: 1,
        ease: 'power1.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-portfolio-bg">
      <div 
        ref={bgRef}
        className="absolute inset-[-5%] w-[110%] h-[110%] bg-grid-pattern opacity-20"
      />
      {/* Ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-portfolio-accent/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-portfolio-secondary/5 blur-[120px]" />
    </div>
  );
};
