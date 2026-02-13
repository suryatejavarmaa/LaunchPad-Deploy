import Hero from './ui/animated-shader-hero';
import FlowFieldBackground from './ui/flow-field-background';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToContent = () => {
    const element = document.getElementById('what-is-launchpad');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyNow = () => {
    const element = document.getElementById('application');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative min-h-screen lp-dual-energy" style={{ backgroundColor: 'var(--lp-bg-solid)' }}>
      {/* Flow Field Particle Background - dashboard/control-room feel */}
      <div className="absolute inset-0 w-full h-full z-0">
        <FlowFieldBackground
          color="#00A9FF"
          trailOpacity={0.12}
          speed={0.8}
          particleCount={500}
        />
      </div>

      {/* Hero Content Layer */}
      <Hero
        headline={{
          lines: [
            {
              text: "Not a course.",
              colorClass: "",
              style: {
                color: '#FFFFFF',
                fontStyle: 'italic',
                opacity: 0.95
              }
            },
            {
              text: "Not a college.",
              colorClass: "",
              style: {
                color: '#FFFFFF',
                fontStyle: 'italic',
                opacity: 0.95
              }
            },
            {
              text: "This is",
              colorClass: "",
              style: {
                color: '#CBD5E1',
                fontWeight: 400,
                fontSize: '1em'
              },
              isSmall: true
            },
            {
              text: "Launchpad",
              colorClass: "lp-text-gradient",
              style: {
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                letterSpacing: '-0.02em',
                textShadow: '0 0 60px rgba(255, 58, 74, 0.4), 0 0 120px rgba(0, 169, 255, 0.3)'
              }
            }
          ]
        }}
        tagline="One Life. One Story."
        subtitle="From Student to Founder in 90 Days"
        buttons={{
          primary: {
            text: "Join Launchpad",
            onClick: handleApplyNow
          },
          secondary: {
            text: "Learn More",
            onClick: scrollToContent
          }
        }}
      />

      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all animate-bounce hover:scale-110"
        style={{ color: 'var(--lp-blue)' }}
      >
        <ArrowDown size={32} />
      </button>
    </div>
  );
}

