import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './WhyDifferent.module.css'; // We'll share the module styles for layout

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

            gsap.to(track, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${window.innerWidth * panels.length}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
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
