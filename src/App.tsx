import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { PersistentUI } from './components/PersistentUI';
import { HeroScene } from './components/HeroScene';
import { AboutEditorial } from './components/AboutEditorial';
import { SkillConstellation } from './components/SkillConstellation';
import { ProjectCommandCenter } from './components/ProjectCommandCenter';
import { ExperienceCommandCenter } from './components/ExperienceCommandCenter';
import { CodingActivity } from './components/CodingActivity';
import { CredentialArchive } from './components/CredentialArchive';
import { ContactTerminal } from './components/ContactTerminal';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  { id: 'hero', num: '01', label: 'HOME' },
  { id: 'about', num: '02', label: 'ABOUT' },
  { id: 'skills', num: '03', label: 'SKILLS' },
  { id: 'projects', num: '04', label: 'PROJECTS' },
  { id: 'experience', num: '05', label: 'EXPERIENCE' },
  { id: 'activity', num: '06', label: 'CODING' },
  { id: 'credentials', num: '07', label: 'CREDENTIALS' },
  { id: 'contact', num: '08', label: 'CONTACT' },
];

function App() {
  const [activeChapter, setActiveChapter] = useState('hero');

  // Track active chapter cleanly using ScrollTrigger (synchronized with pinned spacers)
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScrollFlag = () => {
      document.body.classList.add('is-scrolling');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 150);
    };

    window.addEventListener('scroll', handleScrollFlag, { passive: true });

    // Refresh ScrollTrigger to ensure correct initial measurements
    ScrollTrigger.refresh();

    const triggers: ScrollTrigger[] = [];
    CHAPTERS.forEach((chap) => {
      const el = document.getElementById(chap.id);
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveChapter(chap.id);
          }
        },
      });
      triggers.push(st);
    });

    return () => {
      window.removeEventListener('scroll', handleScrollFlag);
      clearTimeout(scrollTimeout);
      document.body.classList.remove('is-scrolling');
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // Single unified navigation function used by navigation buttons, terminal commands, and cues
  const navigateToSection = (sectionId: string) => {
    if (sectionId === 'hero' || sectionId === 'replay') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const targetTop = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050a14] text-[#e2e8f0] min-h-screen relative font-sans selection:bg-cyan-500/25 selection:text-cyan-300">
      {/* Contextual Custom Desktop Cursor */}
      <CustomCursor />

      {/* ======================================================================= */}
      {/* PERSISTENT UI LAYER: FIXED z-index: 20-50, OUTSIDE OF HERO CLIPPING    */}
      {/* Contains: SectionNavigation (01-08), SideKeywords, InteractiveTerminal */}
      {/* ======================================================================= */}
      <PersistentUI
        chapters={CHAPTERS}
        activeChapter={activeChapter}
        onNavigate={navigateToSection}
      />

      {/* Thin Right Side Vertical Journey Progress Track */}
      <ScrollProgress
        chapters={CHAPTERS}
        activeChapter={activeChapter}
        onNavigate={navigateToSection}
      />

      {/* Mobile-Only Bottom Minimal Navigation Capsule */}
      <nav
        aria-label="Mobile Chapter Navigation"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-3 py-1.5 rounded-full border border-white/10 bg-[#050a14]/90 backdrop-blur-xl shadow-2xl flex md:hidden items-center gap-1 select-none pointer-events-auto"
      >
        {CHAPTERS.map((chap) => {
          const isActive = chap.id === activeChapter;
          return (
            <button
              key={chap.id}
              onClick={() => navigateToSection(chap.id)}
              className={`px-2 py-1 rounded-full text-[10px] font-mono transition-all duration-200 focus:outline-none cursor-pointer ${
                isActive
                  ? 'bg-[#3ec6ff] text-slate-950 font-bold shadow-[0_0_10px_#3ec6ff]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{chap.num}</span>
            </button>
          );
        })}
      </nav>

      {/* ======================================================================= */}
      {/* CONTINUOUS SCROLL EXPANSION JOURNEY                                     */}
      {/* ======================================================================= */}
      <main className="w-full overflow-x-hidden">
        {/* CHAPTER 01: The Unified Scroll Expansion Hero Scene */}
        <HeroScene />

        {/* CHAPTER 02: About Editorial & Speed Scrub */}
        <AboutEditorial />

        {/* CHAPTER 03: Skills Dynamic Technology Constellation & Pipeline Routing */}
        <SkillConstellation />

        {/* CHAPTER 04: Project Command Center Engineering Showcase */}
        <ProjectCommandCenter />

        {/* CHAPTER 05: Experience & Engineering Journey Command Center */}
        <ExperienceCommandCenter />

        {/* CHAPTER 06: Coding Velocity & Telemetry Activity */}
        <CodingActivity />

        {/* CHAPTER 07: Engineering Credential Archive */}
        <CredentialArchive />

        {/* CHAPTER 08: Contact Terminal, Transmission Relay & Replay Journey */}
        <ContactTerminal onReplay={handleReplay} />
      </main>
    </div>
  );
}

export default App;
