import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface RejouiceTextProps {
    text: string;
    className?: string;
    colorClass?: string;
    style?: React.CSSProperties;
}

const RejouiceText: React.FC<RejouiceTextProps> = ({ text, className = "", colorClass = "", style }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const letters = text.split("");

    useEffect(() => {
        if (!containerRef.current) return;

        // 1. Entrance Animation (Drooping from above)
        const letterElements = containerRef.current.querySelectorAll('.letter-inner');

        gsap.fromTo(letterElements,
            {
                y: "-110%",
                opacity: 0
            },
            {
                y: "0%",
                opacity: 1,
                stagger: 0.1, // Slightly slower stagger for more fluidity
                duration: 1.5, // Increased duration for a smoother feel
                ease: "power3.out",
                delay: 0.4, // Initial delay to let the page settle
                force3D: true // GPU acceleration
            }
        );
    }, []);

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
                // Calculate the background position for each letter to make the gradient continuous
                // 100% / (totalLetters - 1) * index
                const backgroundPositionX = totalLetters > 1
                    ? (100 / (totalLetters - 1)) * index
                    : 0;

                return (
                    <span
                        key={index}
                        className="letter-wrapper relative inline-block overflow-hidden"
                        style={{ height: '1.2em' }}
                    >
                        {/* Animated Letter - each has its own segment of the same gradient */}
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
