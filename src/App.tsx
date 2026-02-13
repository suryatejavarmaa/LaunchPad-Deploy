import { lazy, Suspense } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NavigationBar } from './components/NavigationBar';
import { ChatAssistant } from './components/ChatAssistant';
// import { ParticleTextSection } from './components/ParticleTextSection';
import { CareerOverview } from './components/CareerOverview';
import { ApplicationForm } from './components/ApplicationForm';
import { Footer } from './components/Footer';
// New Sections per CEO's Content
import { WhatIsLaunchpad } from './components/WhatIsLaunchpad';
import { WhyDifferent } from './components/WhyDifferent';
import { SkillsSection } from './components/SkillsSection';
import { GamificationSection } from './components/GamificationSection';
import { JourneySection } from './components/JourneySection';
import { OutcomesSection } from './components/OutcomesSection';
import { BeliefSection } from './components/BeliefSection';

// Lazy load heavy components to prevent timeout issues
const HeroSection = lazy(() => import('./components/HeroSection'));

import { RevealOnScroll } from './components/ui/RevealOnScroll';

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen lp-bg" style={{ backgroundColor: 'var(--lp-bg-solid)' }}>
        <NavigationBar />
        <Suspense fallback={
          <div className="w-full h-screen lp-bg lp-dual-energy flex items-center justify-center" style={{ backgroundColor: 'var(--lp-bg-solid)' }}>
            <div className="lp-text-gradient text-xl font-medium">Loading Launchpad...</div>
          </div>
        }>
          <HeroSection />
        </Suspense>

        {/* ===== CEO's Content Structure ===== */}

        {/* 1. What Is Launchpad - Explanation */}
        <RevealOnScroll>
          <WhatIsLaunchpad />
        </RevealOnScroll>

        {/* 2. Two Clear Paths */}
        <RevealOnScroll>
          <CareerOverview />
        </RevealOnScroll>

        {/* 3. Why Launchpad Is Different */}
        {/* WhyDifferent has its own internal scroll logic, skipping wrapper to avoid conflicts */}
        <WhyDifferent />

        {/* 4. What Students Learn - Skills */}
        <RevealOnScroll>
          <SkillsSection />
        </RevealOnScroll>

        {/* 5. 90-Day Transformation Journey */}
        <RevealOnScroll>
          <JourneySection />
        </RevealOnScroll>

        {/* 6. Real Outcomes */}
        <RevealOnScroll>
          <OutcomesSection />
        </RevealOnScroll>

        {/* 7. Why This Matters - Belief */}
        <RevealOnScroll>
          <BeliefSection />
        </RevealOnScroll>

        {/* 8. Gamification & Competition */}
        <RevealOnScroll>
          <GamificationSection />
        </RevealOnScroll>

        {/* 9. Final CTA */}
        <RevealOnScroll>
          <ApplicationForm />
        </RevealOnScroll>

        {/* Footer */}
        <RevealOnScroll>
          <Footer />
        </RevealOnScroll>

        {/* Chat Assistant - Floating */}
        <ChatAssistant />

        {/* ===== Legacy Sections (Kept After Footer) ===== */}
        {/* <ParticleTextSection /> */}
      </div>
    </ErrorBoundary>
  );
}

