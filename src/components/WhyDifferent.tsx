import { useEffect, useRef } from 'react';
import { ShieldAlert, BookOpen, TrendingUp, Zap, Target, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './WhyDifferent.module.css';
import HorizontalScrollSection from './HorizontalScrollSection';

const FONTS = [
    { family: "'Syne', sans-serif", style: "normal" },
    { family: "'Italiana', serif", style: "normal" },
    { family: "'Rubik Mono One', monospace", style: "normal" },
    { family: "'Cormorant Garamond', serif", style: "italic" },
    { family: "'Exo 2', sans-serif", style: "italic" },
    { family: "'Playfair Display', serif", style: "italic" },
    { family: "'Kanit', sans-serif", style: "italic" },
    { family: "'Bebas Neue', sans-serif", style: "normal" },
    { family: "'Teko', sans-serif", style: "normal" },
    { family: "'Unbounded', sans-serif", style: "normal" },
    { family: "'Chakra Petch', sans-serif", style: "normal" },
    { family: "'Chakra Petch', sans-serif", style: "italic" },
    { family: "'Abril Fatface', serif", style: "normal" },
    { family: "'Righteous', system-ui", style: "normal" },
    { family: "'Michroma', sans-serif", style: "normal" },
    { family: "'Orbitron', sans-serif", style: "normal" },
    { family: "'Orbitron', sans-serif", style: "italic" },
    { family: "'Gruppo', sans-serif", style: "normal" },
    { family: "'Audiowide', system-ui", style: "normal" },
    { family: "'Syncopate', sans-serif", style: "normal" },
    { family: "'Monoton', system-ui", style: "normal" },
    { family: "'Tilt Prism', system-ui", style: "normal" },
    { family: "'Tenor Sans', sans-serif", style: "normal" },
    { family: "'Bungee', system-ui", style: "normal" },
    { family: "'Prata', serif", style: "normal" },
    { family: "'Russo One', sans-serif", style: "normal" },
    { family: "'Racing Sans One', system-ui", style: "normal" },
    { family: "'Philosopher', sans-serif", style: "italic" },
    { family: "'Oswald', sans-serif", style: "normal" },
    { family: "'Cinzel', serif", style: "normal" },
    { family: "'Raleway', sans-serif", style: "normal" }
];

// --- Sub-Components (Panels) ---

function HeroPanel() {
    const titleRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const title = titleRef.current;
        if (!title) return;

        // Set initial font with !important to override CSS
        title.style.setProperty('font-family', FONTS[0].family, 'important');
        title.style.setProperty('font-style', FONTS[0].style, 'important');

        let interval: NodeJS.Timeout;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let i = 0;
                interval = setInterval(() => {
                    i = (i + 1) % FONTS.length;
                    title.style.setProperty('font-family', FONTS[i].family, 'important');
                    title.style.setProperty('font-style', FONTS[i].style, 'important');
                }, 120);
            } else {
                if (interval) clearInterval(interval);
            }
        }, { threshold: 0.1 });

        observer.observe(title);

        return () => {
            if (interval) clearInterval(interval);
            observer.disconnect();
        };
    }, []);

    return (
        <div className={`${styles.hero}`}>
            <div className={styles.heroContent} data-hero-content>
                <h1 className={styles.heroTitle}>
                    <span className={`${styles.heroLine} ${styles.heroWhy}`}>WHY</span>
                    <span className={`${styles.heroLine} ${styles.heroLaunchpad}`}>
                        <span ref={titleRef} id="lp-word" className={styles.lpWord}>LAUNCHPAD</span>
                    </span>
                    <span className={`${styles.heroLine} ${styles.heroDiff}`}>IS DIFFERENT?</span>
                </h1>
            </div>
        </div>
    );
}

function OldWayPanel() {
    return (
        <div className={`${styles.old}`}>
            <div className={styles.oldContent}>
                <div className={styles.choose}>
                    <div>
                        <h2>THE OLD WAY</h2>
                        <p className={styles.oldWarning}>WARNING: OBSOLETE</p>
                        <ul className={styles.oldList}>
                            <li>❌ Theory-based exams</li>
                            <li>❌ Just motivational talks</li>
                            <li>❌ Generic placement training</li>
                        </ul>
                    </div>

                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <ShieldAlert className={styles.icon} />
                            <div>
                                <h4 className={styles.oldTitle}>No Real Stakes</h4>
                                <p className={styles.oldText}>Zero pressure. Zero growth.</p>
                            </div>
                        </div>
                        <div className={styles.feature}>
                            <BookOpen className={styles.icon} />
                            <div>
                                <h4 className={styles.oldTitle}>Passive Learning</h4>
                                <p className={styles.oldText}>Memorize → write → forget.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NewSystemPanel() {
    return (
        <div className={`${styles.system}`}>
            <div className={styles.systemContent}>
                <div className={styles.stats}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
                        <h2 className={styles.newSystemTitle}>
                            THE NEW SYSTEM
                        </h2>
                        <p className={styles.newSystemDesc}>
                            Built like a startup. Run like a product company.
                        </p>
                        <div className={styles.cardGrid}>
                            <div className={styles.card}>
                                <h3>BUILD</h3>
                                <p style={{ marginTop: '12px', color: '#CBD5E1' }}>Design, build, and ship real products.</p>
                                <p style={{ marginTop: '8px', color: '#94A3B8', fontSize: '15px', lineHeight: 1.6 }}>
                                    • Production code<br />• Real users<br />• Live feedback
                                </p>
                            </div>
                            <div className={styles.card}>
                                <h3>PRESSURE</h3>
                                <p style={{ marginTop: '12px', color: '#CBD5E1' }}>Operate under real startup conditions.</p>
                                <p style={{ marginTop: '8px', color: '#94A3B8', fontSize: '15px', lineHeight: 1.6 }}>
                                    • Daily reviews<br />• Deadlines<br />• Ownership mindset
                                </p>
                            </div>
                            <div className={styles.card}>
                                <h3>PROOF</h3>
                                <p style={{ marginTop: '12px', color: '#CBD5E1' }}>Show outcomes, not certificates.</p>
                                <p style={{ marginTop: '8px', color: '#94A3B8', fontSize: '15px', lineHeight: 1.6 }}>
                                    • Portfolio<br />• Metrics<br />• Investor-ready demos
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function OutcomePanel() {
    return (
        <div className={`${styles.outcome}`}>


            <div className={styles.outcomeContent}>
                <div className={styles.cta}>
                    <h2>REAL PRESSURE.<br />REAL OUTCOMES.</h2>
                    <p style={{ marginTop: '32px', fontSize: '22px', lineHeight: 1.6 }}>
                        Students enter as learners.<br />
                        <strong>They leave as Leaders & Founders.</strong>
                    </p>
                    <p style={{ marginTop: '24px', fontSize: '18px', opacity: 0.75 }}>
                        Launchpad is not preparation for the real world.<br />
                        <strong>It is the real world.</strong>
                    </p>
                    <button
                        className={`${styles.ctaButton} btn-sweep`}
                        onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Apply to Launchpad →
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Main Component ---

export function WhyDifferent() {
    return (
        <div id="why-different">
            <HorizontalScrollSection
                panels={[HeroPanel, OldWayPanel, NewSystemPanel, OutcomePanel]}
            />
        </div>
    );
}
