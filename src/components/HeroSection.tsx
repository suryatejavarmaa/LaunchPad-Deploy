import Hero from './ui/animated-shader-hero';
import FlowFieldBackground from './ui/flow-field-background';
import { ArrowDown } from 'lucide-react';
import RejouiceText from './ui/RejouiceText';

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
              colorClass: "opacity-60",
              style: {
                color: '#FFFFFF',
                fontStyle: 'italic',
                fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                fontWeight: 300,
                letterSpacing: '0.05em'
              }
            },
            {
              text: "Not a college.",
              colorClass: "opacity-60",
              style: {
                color: '#FFFFFF',
                fontStyle: 'italic',
                fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                fontWeight: 300,
                letterSpacing: '0.05em'
              }
            },
            {
              text: "This is",
              colorClass: "",
              style: {
                color: '#CBD5E1',
                fontWeight: 500,
                fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginTop: '1.5rem',
                marginBottom: '0.5rem'
              },
              isSmall: true
            },
            {
              text: <RejouiceText text="Launchpad" />,
              colorClass: "",
              style: {
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(3.5rem, 12vw, 8.5rem)',
                letterSpacing: '-0.03em',
                lineHeight: 0.9
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

