import Hero from './ui/animated-shader-hero';
import FlowFieldBackground from './ui/flow-field-background';
import { ArrowDown } from 'lucide-react';
import RejouiceText from './ui/RejouiceText';
import HackathonModal from './ui/HackathonModal';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const [triggerLogo, setTriggerLogo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const delayedCallRef = useRef<gsap.core.Tween | null>(null);
  const hasPlayed = useRef(false); // Ensures animation only fires once per page load

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed.current) {
          // Only trigger if it hasn't played yet
          if (delayedCallRef.current) {
            delayedCallRef.current.kill();
          }

          delayedCallRef.current = gsap.delayedCall(2, () => {
            setTriggerLogo(true);
            hasPlayed.current = true; // Mark as played — never replay

            // Trigger Hackathon Modal after hero animation starts
            // Temporarily disabled sessionStorage check for verification
            setTimeout(() => {
              setIsModalOpen(true);
            }, 3000); // reduced to 3 seconds
          });
        }
        // No reset on exit — animation stays visible after playing
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (delayedCallRef.current) {
        delayedCallRef.current.kill();
      }
    };
  }, []);

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
    <>
      <div
        ref={sectionRef}
        id="home"
        className="relative min-h-screen lp-dual-energy"
        style={{ backgroundColor: 'var(--lp-bg-solid)' }}
      >
        {/* Flow Field Particle Background */}
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
          triggerAnimation={triggerLogo}
          headline={{
            lines: [
              {
                text: "Not a Course.",
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
                text: "Not a College.",
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
                isCustomAnimated: true,
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

      {/* Hackathon Modal — rendered outside the hero div to avoid clipping */}
      <HackathonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
