import React from 'react';
import { HeroHeadline } from './HeroHeadline';
import { SystemStatusPanel } from './SystemStatusPanel';
import { FeaturedProjectCard } from './FeaturedProjectCard';
import { SkillsMatrixCard } from './SkillsMatrixCard';
import { DeveloperTerminalCard } from './DeveloperTerminalCard';
import { QuickStatsCard } from './QuickStatsCard';
import { RecentActivityCard } from './RecentActivityCard';
import { JourneyCard } from './JourneyCard';

interface DashboardShellProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenProject: (projectId: string) => void;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({
  onNavigateSection,
  onOpenProject,
}) => {
  return (
    <section id="home" className="relative min-h-screen w-full flex flex-col justify-between pt-14 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Cinematic Developer Studio Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        <img
          id="workspace-bg-image"
          src="/assets/workspace_bg.jpg"
          alt="Developer Workspace"
          className="w-full h-full object-cover object-center scale-100 opacity-80"
        />
        {/* Ambient Dark Atmospheric Gradient & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070e]/60 via-[#05070e]/25 to-[#05070e]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070e]/75 via-transparent to-[#05070e]/60" />
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(5,7,14,0.7)]" />
      </div>

      {/* UPPER HERO WORKSPACE */}
      <div className="w-full max-w-[1540px] 2xl:pr-8 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2 pb-4">
        {/* Left: Intro & Large Typography */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <HeroHeadline onExplore={() => onNavigateSection('projects')} />
        </div>

        {/* Right: Floating System Status Panel */}
        <div className="lg:col-span-4 flex justify-start lg:justify-end">
          <SystemStatusPanel onDetails={() => onNavigateSection('about')} />
        </div>
      </div>

      {/* LOWER DASHBOARD GRIDS */}
      <div className="w-full max-w-[1540px] 2xl:pr-8 mx-auto flex flex-col gap-4 pt-1">
        {/* Row 1: Featured Project | Skills Matrix | Developer Terminal */}
        <div id="dashboard-mid-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          <FeaturedProjectCard onOpenProject={onOpenProject} />
          <SkillsMatrixCard onViewAll={() => onNavigateSection('skills')} />
          <DeveloperTerminalCard />
        </div>

        {/* Row 2: Quick Stats | Recent Activity | Inspiration Journey */}
        <div id="dashboard-bottom-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          <QuickStatsCard onStatClick={(id) => onNavigateSection(id === 'projects' ? 'projects' : 'about')} />
          <RecentActivityCard />
          <JourneyCard onExploreMore={() => onNavigateSection('about')} />
        </div>
      </div>
    </section>
  );
};
