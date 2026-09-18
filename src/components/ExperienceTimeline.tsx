import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '../data/experience';
import { GitBranch, GitCommit, ShieldCheck, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;



    // Animate vertical branch line drawing down with scroll
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1,
        },
      }
    );

    // Stagger in commit nodes & cards
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0, x: index % 2 === 0 ? 40 : -40, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (section.contains(t.trigger as Node)) t.kill();
      });
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#05070b] py-32 px-6 sm:px-12 lg:px-20 select-none overflow-hidden"
    >
      {/* Editorial Chapter Header */}
      <div className="max-w-5xl mx-auto mb-20 text-center">
        <div className="flex items-center justify-center gap-2 font-mono text-xs text-cyan-400 tracking-[0.25em] uppercase mb-4">
          <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
          <span>05 // GIT-STYLE TIMELINE</span>
          <span className="text-slate-600">—</span>
          <span>BRANCH: MAIN</span>
        </div>
        <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
          PRACTICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-portfolio-secondary">EXPERIENCE</span>
        </h2>
        <p className="font-mono text-xs text-slate-400 mt-3 max-w-lg mx-auto">
          Project pipelines collapsing into an immutable sequence of production internships, incubation leadership, and engineering initiatives.
        </p>
      </div>

      {/* Vertical Git Branch Timeline */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Background Track */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />

        {/* Animated Glowing Active Cyan Branch Line */}
        <div
          ref={lineRef}
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-portfolio-secondary to-cyan-300 -translate-x-1/2 shadow-cyan-glow"
        />

        <div className="flex flex-col gap-16">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className={`relative flex flex-col md:flex-row gap-8 w-full ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Git Commit Node with Pulse Ring */}
              <div className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 z-10 flex items-center justify-center">
                <span className="w-4 h-4 rounded-full bg-[#05070b] border-2 border-cyan-400 shadow-cyan-glow" />
                <span className="absolute w-2 h-2 rounded-full bg-cyan-300" />
              </div>

              {/* Empty balance spacer */}
              <div className="hidden md:block md:w-1/2" />

              {/* Commit Content Card */}
              <div className="w-full md:w-1/2 pl-14 md:pl-0">
                <div
                  className={`p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#080d19]/90 backdrop-blur-md relative shadow-xl hover:border-cyan-500/40 transition-all ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}
                >
                  {/* Commit hash and year pill */}
                  <div className="flex items-center justify-between font-mono mb-3 border-b border-white/5 pb-2">
                    <span className="text-cyan-400 font-bold tracking-wider text-[14px]">{exp.date}</span>
                    <span className="text-slate-500 text-[10px]">commit #{exp.id.slice(0, 7)}</span>
                  </div>

                  <h3 className="font-display font-black text-xl text-white tracking-wide uppercase mb-1">
                    {exp.role}
                  </h3>
                  <div className="font-mono text-xs text-portfolio-secondary mb-4 flex items-center gap-1.5">
                    {exp.id === 'adani' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Cpu className="w-3.5 h-3.5" />}
                    <span>{exp.company}</span>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2 font-mono text-xs text-slate-300">
                    {exp.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <GitCommit className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
