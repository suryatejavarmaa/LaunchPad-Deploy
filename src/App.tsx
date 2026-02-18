import { lazy, Suspense } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NavigationBar } from './components/NavigationBar';
import { ChatAssistant } from './components/ChatAssistant';
const HeroSection = lazy(() => import('./components/HeroSection'));
const WhatIsLaunchpad = lazy(() => import('./components/WhatIsLaunchpad').then(m => ({ default: m.WhatIsLaunchpad })));
const CareerOverview = lazy(() => import('./components/CareerOverview').then(m => ({ default: m.CareerOverview })));
const WhyDifferent = lazy(() => import('./components/WhyDifferent').then(m => ({ default: m.WhyDifferent })));
const SkillsSection = lazy(() => import('./components/SkillsSection').then(m => ({ default: m.SkillsSection })));
const JourneySection = lazy(() => import('./components/JourneySection').then(m => ({ default: m.JourneySection })));
const OutcomesSection = lazy(() => import('./components/OutcomesSection').then(m => ({ default: m.OutcomesSection })));
const BeliefSection = lazy(() => import('./components/BeliefSection').then(m => ({ default: m.BeliefSection })));
const GamificationSection = lazy(() => import('./components/GamificationSection').then(m => ({ default: m.GamificationSection })));
const ApplicationForm = lazy(() => import('./components/ApplicationForm').then(m => ({ default: m.ApplicationForm })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

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
          <div id="home">
            <HeroSection />
          </div>

          {/* ===== CEO's Content Structure ===== */}

          {/* 1. What Is Launchpad - Explanation */}
          <div id="what-is-launchpad">
            <RevealOnScroll>
              <WhatIsLaunchpad />
            </RevealOnScroll>
          </div>

          {/* 2. Two Clear Paths */}
          <div id="overview">
            <RevealOnScroll>
              <CareerOverview />
            </RevealOnScroll>
          </div>

          {/* 3. Why Launchpad Is Different */}
          <div id="why-different">
            <WhyDifferent />
          </div>

          {/* 4. What Students Learn - Skills */}
          <div id="curriculum">
            <RevealOnScroll>
              <SkillsSection />
            </RevealOnScroll>
          </div>

          {/* 5. 90-Day Transformation Journey */}
          <div id="journey">
            <RevealOnScroll>
              <JourneySection />
            </RevealOnScroll>
          </div>

          {/* 6. Real Outcomes */}
          <div id="outcomes">
            <RevealOnScroll>
              <OutcomesSection />
            </RevealOnScroll>
          </div>

          {/* 7. Why This Matters - Belief */}
          <div id="belief">
            <RevealOnScroll>
              <BeliefSection />
            </RevealOnScroll>
          </div>

          {/* 8. Gamification & Competition */}
          <div id="gamification">
            <RevealOnScroll>
              <GamificationSection />
            </RevealOnScroll>
          </div>

          {/* 9. Final CTA */}
          <div id="application">
            <RevealOnScroll>
              <ApplicationForm />
            </RevealOnScroll>
          </div>

          {/* Footer */}
          <RevealOnScroll>
            <Footer />
          </RevealOnScroll>
        </Suspense>

        {/* Chat Assistant - Floating */}
        <ChatAssistant />

        {/* ===== Legacy Sections (Kept After Footer) ===== */}
        {/* <ParticleTextSection /> */}
      </div>
    </ErrorBoundary>
  );
}

