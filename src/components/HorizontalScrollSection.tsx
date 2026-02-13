import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './WhyDifferent.module.css';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollSectionProps {
    panels: React.ComponentType[];
}

export default function HorizontalScrollSection({ panels }: HorizontalScrollSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current;
            const section = sectionRef.current;

            if (!track || !section) return;

            // Target only the text content inside the hero panel (not the background)
            const heroText = section.querySelector('[data-hero-content]');

            // Set initial state - text starts invisible and slightly below
            if (heroText) {
                gsap.set(heroText, { opacity: 0, y: 60 });
            }

            // Create a timeline for both phases
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    // Reduced distance: Just the width of panels for a tighter feel
                    end: () => `+=${window.innerWidth * panels.length}`,
                    scrub: 0.5,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    preventOverlaps: true,
                    fastScrollEnd: true,
                }
            });

            // Phase 1: Quick fade in and slide up the text
            if (heroText) {
                tl.to(heroText, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                });
            }

            // Phase 2: Horizontal scroll of all panels
            tl.to(track, {
                xPercent: -100 * (panels.length - 1),
                duration: panels.length,
                ease: "none",
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [panels.length]);

    return (
        <section ref={sectionRef} className={styles.scrollSection}>
            <div ref={trackRef} className={styles.scrollTrack}>
                {panels.map((Panel, i) => (
                    <div className={styles.scrollPanel} key={i}>
                        <Panel />
                    </div>
                ))}
            </div>
        </section>
    );
}
