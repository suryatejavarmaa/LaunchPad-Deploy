import { motion } from 'motion/react';
import { Briefcase, Rocket, CheckCircle2 } from 'lucide-react';

interface CardStackProps {
    type: 'entrepreneur' | 'career';
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    flipped: boolean;
    onFlip: () => void;
}

export function CardStack({ type, title, subtitle, description, features, flipped, onFlip }: CardStackProps) {
    const isEntrepreneur = type === 'entrepreneur';

    const colors = isEntrepreneur
        ? {
            borderColor: '#FF3333',
            glowColor: 'rgba(255, 51, 51, 1)',
            titleColor: '#F43F5E',
            accentBorder: 'rgba(225, 29, 72, 0.4)',
            badgeBg: 'linear-gradient(135deg, rgba(225, 29, 72, 0.2) 0%, rgba(225, 29, 72, 0.05) 100%)',
            badgeBorder: 'rgba(225, 29, 72, 0.3)',
            iconBg: 'linear-gradient(135deg, rgba(225, 29, 72, 0.3) 0%, rgba(225, 29, 72, 0.1) 100%)',
            iconBorder: 'rgba(225, 29, 72, 0.4)',
            iconShadow: 'rgba(225, 29, 72, 0.3)',
            checkColor: 'rgb(251, 113, 133)',
            cardBg: 'linear-gradient(145deg, rgba(40, 15, 20, 1) 0%, rgba(25, 10, 15, 1) 50%, rgba(15, 8, 12, 1) 100%)',
            gridColor: '#FF3333',
        }
        : {
            borderColor: '#00D9FF',
            glowColor: 'rgba(0, 217, 255, 1)',
            titleColor: '#38BDF8',
            accentBorder: 'rgba(14, 165, 233, 0.4)',
            badgeBg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(14, 165, 233, 0.05) 100%)',
            badgeBorder: 'rgba(14, 165, 233, 0.3)',
            iconBg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.3) 0%, rgba(14, 165, 233, 0.1) 100%)',
            iconBorder: 'rgba(14, 165, 233, 0.4)',
            iconShadow: 'rgba(14, 165, 233, 0.3)',
            checkColor: 'rgb(56, 189, 248)',
            cardBg: 'linear-gradient(145deg, rgba(15, 25, 40, 1) 0%, rgba(10, 18, 30, 1) 50%, rgba(5, 12, 22, 1) 100%)',
            gridColor: '#00D9FF',
        };

    const stackCards = [
        { rest: { rotate: -6, x: -18, opacity: 0.5, scale: 0.98 }, hover: { rotate: -15, x: -80, opacity: 0.6, scale: 0.96 } },
        { rest: { rotate: -4, x: -12, opacity: 0.5, scale: 0.99 }, hover: { rotate: -10, x: -55, opacity: 0.6, scale: 0.97 } },
        { rest: { rotate: -2, x: -6, opacity: 0.5, scale: 0.995 }, hover: { rotate: -5, x: -30, opacity: 0.65, scale: 0.98 } },
        { rest: { rotate: 2, x: 6, opacity: 0.5, scale: 0.995 }, hover: { rotate: 5, x: 30, opacity: 0.65, scale: 0.98 } },
        { rest: { rotate: 4, x: 12, opacity: 0.5, scale: 0.99 }, hover: { rotate: 10, x: 55, opacity: 0.6, scale: 0.97 } },
        { rest: { rotate: 6, x: 18, opacity: 0.5, scale: 0.98 }, hover: { rotate: 15, x: 80, opacity: 0.6, scale: 0.96 } },
    ];

    // Shared card face styles
    const cardFaceStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        borderRadius: '32px',
        background: colors.cardBg,
        border: `2px solid ${colors.borderColor}`,
        boxShadow: `
      0 0 20px ${colors.glowColor},
      0 0 40px ${colors.glowColor}80,
      0 0 60px ${colors.glowColor}40,
      inset 0 0 20px ${colors.glowColor}20,
      inset 0 1px 0 rgba(255, 255, 255, 0.05)
    `,
        backfaceVisibility: 'hidden' as const,
        WebkitBackfaceVisibility: 'hidden' as const,
        overflow: 'hidden',
    };

    return (
        <motion.div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '480px',
                height: '540px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                cursor: 'pointer',
                flexShrink: 0,
            }}
            initial="rest"
            whileHover="hover"
            animate="rest"
        >
            {/* Background stacked cards */}
            {stackCards.map((cardConfig, index) => (
                <motion.div
                    key={index}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: index < 3 ? index : (5 - index),
                        willChange: 'transform',
                    }}
                    variants={{
                        rest: cardConfig.rest,
                        hover: cardConfig.hover,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '32px',
                            background: colors.cardBg,
                            border: `2px solid ${colors.borderColor}`,
                            boxShadow: `0 0 15px ${colors.glowColor}80`,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                pointerEvents: 'none',
                                opacity: 0.4,
                                background: `radial-gradient(circle at 70% 20%, ${colors.glowColor}15, transparent 60%)`,
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                opacity: 0.3,
                                pointerEvents: 'none',
                                backgroundImage: `
                  linear-gradient(${colors.gridColor}50 1.5px, transparent 1.5px),
                  linear-gradient(90deg, ${colors.gridColor}50 1.5px, transparent 1.5px)
                `,
                                backgroundSize: '40px 40px',
                            }}
                        />
                    </div>
                </motion.div>
            ))}

            {/* Main card with 3D flip */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 10,
                    perspective: '1000px',
                    willChange: 'transform',
                }}
                variants={{
                    rest: { y: 0, scale: 1 },
                    hover: { y: -12, scale: 1.02 }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                <motion.div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        transformStyle: 'preserve-3d',
                        willChange: 'transform',
                    }}
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{
                        duration: 0.6,
                        ease: [0.25, 0.1, 0.25, 1],
                        type: 'tween',
                    }}
                >
                    {/* FRONT FACE */}
                    <div
                        style={{
                            ...cardFaceStyle,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '32px 40px',
                            pointerEvents: flipped ? 'none' : 'auto',
                        }}
                        onClick={onFlip}
                    >
                        {/* Top glow line */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '1px',
                                background: `linear-gradient(to right, transparent, ${colors.accentBorder}, transparent)`,
                            }}
                        />

                        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <div style={{ marginBottom: 'auto' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                    <div
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: colors.iconBg,
                                            border: `1px solid ${colors.iconBorder}`,
                                            boxShadow: `0 0 20px ${colors.iconShadow}`,
                                            padding: '8px',
                                        }}
                                    >
                                        {isEntrepreneur ? (
                                            <Rocket style={{ width: '24px', height: '24px', color: 'white' }} />
                                        ) : (
                                            <Briefcase style={{ width: '24px', height: '24px', color: 'white' }} />
                                        )}
                                    </div>
                                    <div
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '9999px',
                                            background: colors.badgeBg,
                                            border: `1px solid ${colors.badgeBorder}`,
                                        }}
                                    >
                                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'white', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                            {subtitle}
                                        </span>
                                    </div>
                                </div>
                                <h4
                                    style={{
                                        fontSize: 'clamp(1.875rem, 2vw, 2.25rem)',
                                        fontWeight: 900,
                                        marginBottom: '16px',
                                        letterSpacing: '-0.025em',
                                        color: colors.titleColor,
                                    }}
                                >
                                    {title}
                                </h4>
                                <p style={{ color: '#94a3b8', fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', lineHeight: 1.625, maxWidth: '24rem' }}>
                                    {description}
                                </p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px' }}>
                                {features.map((item, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px',
                                            padding: '12px 16px',
                                            borderRadius: '16px',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            transition: 'transform 0.3s',
                                        }}
                                    >
                                        <CheckCircle2 style={{ width: '20px', height: '20px', flexShrink: 0, color: colors.checkColor }} />
                                        <span style={{ color: 'white', fontWeight: 500, letterSpacing: '0.025em' }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* BACK FACE */}
                    <div
                        style={{
                            ...cardFaceStyle,
                            transform: 'rotateY(180deg)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '32px 40px',
                            pointerEvents: flipped ? 'auto' : 'none',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Grid pattern overlay */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                opacity: 0.3,
                                pointerEvents: 'none',
                                backgroundImage: `
                  linear-gradient(${colors.gridColor}50 1.5px, transparent 1.5px),
                  linear-gradient(90deg, ${colors.gridColor}50 1.5px, transparent 1.5px)
                `,
                                backgroundSize: '40px 40px',
                            }}
                        />

                        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '32px' }}>
                            <div>
                                <h3 style={{ fontSize: 'clamp(2.25rem, 3vw, 3rem)', fontWeight: 900, marginBottom: '16px', color: colors.titleColor }}>
                                    Ready to Start?
                                </h3>
                                <p style={{ color: '#94a3b8', fontSize: '1.125rem' }}>
                                    Begin your journey to {isEntrepreneur ? 'entrepreneurship' : 'career success'}
                                </p>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                style={{
                                    padding: '20px 40px',
                                    borderRadius: '16px',
                                    fontWeight: 700,
                                    fontSize: '1.25rem',
                                    color: 'white',
                                    background: `linear-gradient(135deg, ${colors.borderColor} 0%, ${colors.titleColor} 100%)`,
                                    boxShadow: `
                    0 0 30px ${colors.glowColor},
                    0 0 50px ${colors.glowColor}80,
                    0 10px 40px rgba(0, 0, 0, 0.5)
                  `,
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s',
                                }}
                            >
                                Get Started
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); onFlip(); }}
                                style={{
                                    color: '#94a3b8',
                                    fontSize: '0.875rem',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '4px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'color 0.2s',
                                }}
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
