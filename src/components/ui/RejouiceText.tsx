import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface RejouiceTextProps {
    text: string;
    className?: string;
    colorClass?: string;
    style?: React.CSSProperties;
    trigger?: boolean; // When flipped to true, starts the drooping animation
}

const RejouiceText: React.FC<RejouiceTextProps> = ({ text, className = "", colorClass = "", style, trigger }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Timeline | null>(null);
    const letters = text.split("");

    useEffect(() => {
        if (!containerRef.current || !trigger) return;

        // Kill any existing animation
        if (animationRef.current) {
            animationRef.current.kill();
        }

        const letterElements = containerRef.current.querySelectorAll('.letter-inner');

        // Butter smooth drooping entrance
        animationRef.current = gsap.timeline();
        animationRef.current.fromTo(
            letterElements,
            { y: "-110%", opacity: 0 },
            {
                y: "0%",
                opacity: 1,
                stagger: 0.05,
                duration: 1.4,
                ease: "expo.out",
                force3D: true
            }
        );
    }, [trigger]);

    const totalLetters = letters.length;
    const gradientString = 'linear-gradient(90deg, #B1122C 0%, #FF3A4A 50%, #00A9FF 100%)';

    return (
        <div
            ref={containerRef}
            className={`py-1 ${className}`}
            style={{
                ...style,
                display: 'inline-flex',
                cursor: 'default',
            }}
        >
            {letters.map((char, index) => {
                const backgroundPositionX = totalLetters > 1
                    ? (100 / (totalLetters - 1)) * index
                    : 0;

                return (
                    <span
                        key={index}
                        className="letter-wrapper relative inline-block overflow-hidden"
                        style={{ height: '1.2em' }}
                    >
                        <span
                            className="letter-inner inline-block whitespace-pre"
                            style={{
                                background: gradientString,
                                backgroundSize: `${totalLetters * 100}% 100%`,
                                backgroundPosition: `${backgroundPositionX}% 0%`,
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                color: 'transparent',
                                opacity: 0, // Hidden by default — GSAP animates to 1
                            }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    </span>
                );
            })}
        </div>
    );
};

export default RejouiceText;
