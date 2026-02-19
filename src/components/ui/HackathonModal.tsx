import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Rocket } from 'lucide-react';

interface HackathonModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const HackathonModal: React.FC<HackathonModalProps> = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleRegister = () => {
        onClose();
        window.open('/hackathon/', '_blank');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                /* ── Full-screen overlay ── */
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '24px',
                    }}
                >
                    {/* Dark blurred backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                        }}
                    />

                    {/* ── Modal card ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 24 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 340 }}
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '420px',
                            background: 'linear-gradient(165deg, rgba(18, 24, 42, 0.98) 0%, rgba(10, 15, 30, 0.99) 100%)',
                            borderRadius: '28px',
                            padding: '48px 36px 40px',
                            textAlign: 'center' as const,
                            border: '1.5px solid rgba(255, 255, 255, 0.08)',
                            boxShadow: '0 0 60px rgba(0, 169, 255, 0.12), 0 0 120px rgba(177, 18, 44, 0.08), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            overflow: 'hidden',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Gradient border glow (pseudo-element via div) */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: '28px',
                                padding: '1.5px',
                                background: 'linear-gradient(135deg, #B1122C 0%, #FF3A4A 40%, #00A9FF 100%)',
                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'xor',
                                maskComposite: 'exclude' as any,
                                pointerEvents: 'none' as const,
                            }}
                        />

                        {/* Top-right glow */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-60px',
                                right: '-60px',
                                width: '160px',
                                height: '160px',
                                background: 'rgba(0, 169, 255, 0.15)',
                                borderRadius: '50%',
                                filter: 'blur(60px)',
                                pointerEvents: 'none',
                            }}
                        />

                        {/* Bottom-left glow */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '-60px',
                                left: '-60px',
                                width: '160px',
                                height: '160px',
                                background: 'rgba(177, 18, 44, 0.15)',
                                borderRadius: '50%',
                                filter: 'blur(60px)',
                                pointerEvents: 'none',
                            }}
                        />

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            aria-label="Close modal"
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                width: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: 'rgba(255, 255, 255, 0.5)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                zIndex: 10,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#fff';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.transform = 'rotate(90deg)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                e.currentTarget.style.transform = 'rotate(0deg)';
                            }}
                        >
                            <X size={18} />
                        </button>

                        {/* ── Badge ── */}
                        <div style={{ marginBottom: '28px' }}>
                            <span
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: 'rgba(255, 58, 74, 0.12)',
                                    border: '1px solid rgba(255, 58, 74, 0.25)',
                                    borderRadius: '9999px',
                                    padding: '8px 18px',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase' as const,
                                    color: '#FF3A4A',
                                }}
                            >
                                <Rocket size={14} className="animate-pulse" />
                                Limited Spots
                            </span>
                        </div>

                        {/* ── Headline ── */}
                        <h2
                            style={{
                                fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
                                fontWeight: 900,
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                                color: '#fff',
                                margin: '0 0 24px',
                            }}
                        >
                            Participate in the
                            <span
                                className="lp-text-gradient"
                                style={{
                                    display: 'block',
                                    fontSize: 'clamp(2rem, 9vw, 3.2rem)',
                                    margin: '8px 0',
                                    lineHeight: 1,
                                    textTransform: 'uppercase',
                                    letterSpacing: '-0.01em',
                                }}
                            >
                                Launchpad
                            </span>
                            <span
                                style={{
                                    display: 'block',
                                    color: '#FF3A4A',
                                    fontSize: 'clamp(1.5rem, 6vw, 2.2rem)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.15em',
                                }}
                            >
                                Hackathon
                            </span>
                        </h2>

                        {/* ── Subtext ── */}
                        <p
                            style={{
                                fontSize: '15px',
                                lineHeight: 1.7,
                                color: 'rgba(203, 213, 225, 0.85)',
                                maxWidth: '320px',
                                margin: '0 auto 32px',
                            }}
                        >
                            Join ambitious builders and compete in a high-impact hackathon designed for future founders.
                        </p>

                        {/* ── CTA Button ── */}
                        <button
                            onClick={handleRegister}
                            style={{
                                width: '100%',
                                maxWidth: '320px',
                                padding: '16px 32px',
                                borderRadius: '16px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #B1122C 0%, #FF3A4A 40%, #00A9FF 100%)',
                                backgroundSize: '200% auto',
                                color: '#fff',
                                fontSize: '16px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.4s ease',
                                boxShadow: '0 8px 30px rgba(177, 18, 44, 0.3), 0 4px 15px rgba(0, 169, 255, 0.2)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundPosition = 'right center';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 169, 255, 0.4), 0 6px 20px rgba(177, 18, 44, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundPosition = 'left center';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(177, 18, 44, 0.3), 0 4px 15px rgba(0, 169, 255, 0.2)';
                            }}
                        >
                            Apply for Hackathon →
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default HackathonModal;
