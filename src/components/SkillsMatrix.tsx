import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData } from '../data/skills';
import { Cpu, Terminal, Shield, Database, Cloud, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const SkillsMatrix: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.skill-category-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 25%',
          scrub: 1,
        },
      }
    );
  }, []);

  const getCategoryIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('programming')) return Terminal;
    if (lower.includes('ai') || lower.includes('data')) return Brain;
    if (lower.includes('database')) return Database;
    if (lower.includes('cloud')) return Cloud;
    if (lower.includes('security')) return Shield;
    return Cpu;
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 sm:px-8 xl:px-16 flex flex-col items-center justify-center select-none"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="font-mono text-xs text-portfolio-accent tracking-widest uppercase">
            03 &#47;&#47; TECHNOLOGY NETWORK
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mt-1">
            Core Competencies &amp; Matrix
          </h2>
          <p className="font-sans text-slate-400 text-sm max-w-xl mt-2">
            Interconnected technical domains built through coursework, continuous LeetCode problem-solving, and practical production deployments.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div ref={networkRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category, idx) => {
            const Icon = getCategoryIcon(category.title);
            return (
              <div
                key={idx}
                className="skill-category-card glass-panel rounded-2xl p-6 border border-cyan-500/15 hover:border-cyan-500/40 transition-all duration-300 shadow-cyan-glow group bg-[#080d1af0] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 pb-3 mb-4 border-b border-white/5">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-portfolio-accent group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-mono text-xs font-bold tracking-wider text-slate-200 uppercase">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#050b18] text-slate-300 border border-white/10 hover:border-cyan-400 hover:text-portfolio-accent hover:bg-cyan-950/40 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{category.skills.length} TECHNOLOGIES</span>
                  <span className="text-portfolio-accent group-hover:underline">VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
