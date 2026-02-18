import React from 'react';

// Types for component props
interface HeadlineLine {
  text: React.ReactNode;
  colorClass?: string;
  style?: React.CSSProperties;
  isSmall?: boolean;
  isCustomAnimated?: boolean; // If true, omits the standard animate-fade-in-up class
}

interface HeroProps {
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  headline: {
    lines: HeadlineLine[];
  };
  tagline?: string;
  subtitle: string;
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
    };
  };
  className?: string;
  triggerAnimation?: boolean; // Prop to sync animations
}

// Hero Component with multi-line headline support
const Hero: React.FC<HeroProps> = ({
  trustBadge,
  headline,
  tagline,
  subtitle,
  buttons,
  className = "",
  triggerAnimation = true
}) => {
  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* Gradient overlay for better text readability */}
      <div
        className="absolute inset-0 z-5"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.3) 50%, rgba(15, 23, 42, 0.6))'
        }}
      />

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        {/* Trust Badge */}
        {trustBadge && (
          <div className="mb-8 animate-fade-in-down">
            <div
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm backdrop-blur-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {trustBadge.icons && (
                <div className="flex">
                  {trustBadge.icons.map((icon, index) => (
                    <span key={index} className="text-slate-300">
                      {icon}
                    </span>
                  ))}
                </div>
              )}
              <span className="text-slate-300">{trustBadge.text}</span>
            </div>
          </div>
        )}

        <div className="text-center space-y-6 max-w-5xl mx-auto px-4">
          {/* Main Headlines - Multi-line with individual colors */}
          <div className="space-y-1">
            {headline.lines.map((line, index) => {
              const delay = index === 3 ? 2000 : 1000 + index * 200;
              const animationClass = line.isCustomAnimated ? "" : "animate-fade-in-up";

              return (
                <h1
                  key={index}
                  className={`${line.isSmall
                    ? 'text-xl md:text-2xl lg:text-3xl font-normal'
                    : 'text-4xl md:text-6xl lg:text-7xl font-bold'
                    } ${animationClass} ${line.colorClass || ''}`}
                  style={{
                    animationDelay: `${delay}ms`,
                    // Hide custom animated elements until they are triggered to prevent static appearance
                    opacity: line.isCustomAnimated ? (triggerAnimation ? 1 : 0) : undefined,
                    ...line.style
                  }}
                >
                  {React.isValidElement(line.text)
                    ? React.cloneElement(line.text as React.ReactElement<any>, { trigger: triggerAnimation })
                    : line.text}
                </h1>
              );
            })}
          </div>

          {/* Tagline - Neutral Color */}
          {tagline && (
            <div className="animate-fade-in-up" style={{ animationDelay: '2800ms' }}>
              <p className="text-lg md:text-xl font-medium tracking-widest uppercase text-slate-400">
                {tagline}
              </p>
            </div>
          )}

          {/* Subtitle - Neutral Color */}
          <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '3200ms' }}>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-300">
              {subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          {buttons && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-in-up" style={{ animationDelay: '3600ms' }}>
              {buttons.primary && (
                <button
                  onClick={buttons.primary.onClick}
                  className="px-8 py-4 rounded-full text-lg font-bold text-white transition-all duration-300 hover:scale-105 backdrop-blur-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {buttons.primary.text}
                </button>
              )}
              {buttons.secondary && (
                <button
                  onClick={buttons.secondary.onClick}
                  className="px-8 py-4 rounded-full text-lg font-medium text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 backdrop-blur-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {buttons.secondary.text}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;

