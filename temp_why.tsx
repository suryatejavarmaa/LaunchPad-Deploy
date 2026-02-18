import { useEffect, useRef } from 'react';
import { ShieldAlert, BookOpen, TrendingUp, Zap, Target, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './WhyDifferent.module.css';
import HorizontalScrollSection from './HorizontalScrollSection';

const FONTS = [
    // Original modern fonts (Keep)
    { family: "'Syne', sans-serif", style: "normal" },
    { family: "'Italiana', serif", style: "normal" }, // New Elegant
    { family: "'Rubik Mono One', monospace", style: "normal" },
    { family: "'Cormorant Garamond', serif", style: "italic" }, // New Slanted
    { family: "'Exo 2', sans-serif", style: "italic" }, // New Slanted Tech
    { family: "'Playfair Display', serif", style: "italic" }, // Original Slanted
    { family: "'Kanit', sans-serif", style: "italic" }, // New Slanted
    { family: "'Bebas Neue', sans-serif", style: "normal" },
    { family: "'Teko', sans-serif", style: "normal" }, // New Tech
    { family: "'Unbounded', sans-serif", style: "normal" },
    { family: "'Chakra Petch', sans-serif", style: "normal" }, // New Tech
    { family: "'Chakra Petch', sans-serif", style: "italic" }, // New Tech Slanted
    { family: "'Abril Fatface', serif", style: "normal" },

    // Tech & Futuristic (Keep + New)
    { family: "'Righteous', system-ui", style: "normal" },
    { family: "'Michroma', sans-serif", style: "normal" }, // New Futuristic
    { family: "'Orbitron', sans-serif", style: "normal" },
    { family: "'Orbitron', sans-serif", style: "italic" }, // New Futuristic Slanted
    { family: "'Gruppo', sans-serif", style: "normal" }, // New Stylish
    { family: "'Audiowide', system-ui", style: "normal" },
    { family: "'Syncopate', sans-serif", style: "normal" }, // New Modern
    { family: "'Monoton', system-ui", style: "normal" },
    { family: "'Tilt Prism', system-ui", style: "normal" }, // New Slanted 3D

    // Bold Display (Keep + New)
    { family: "'Tenor Sans', sans-serif", style: "normal" }, // New Humanist
    { family: "'Bungee', system-ui", style: "normal" },
    { family: "'Prata', serif", style: "normal" }, // New Elegant
    { family: "'Russo One', sans-serif", style: "normal" },
    { family: "'Racing Sans One', system-ui", style: "normal" }, // New Slanted Speed
    { family: "'Philosopher', sans-serif", style: "italic" }, // New Unique
    { family: "'Oswald', sans-serif", style: "normal" },
    { family: "'Cinzel', serif", style: "normal" }, // New Classic
    { family: "'Raleway', sans-serif", style: "normal" }
];

// --- Sub-Components (Panels) ---

function HeroPanel() {
    const titleRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const title = titleRef.current;
        if (!title) {
            console.log('Γ¥î titleRef.current is null');
            return;
        }

        console.log('Γ£à Font animation started');

        // Set initial font with !important to override CSS
        title.style.setProperty('font-family', FONTS[0].family, 'important');
        title.style.setProperty('font-style', FONTS[0].style, 'important');
        console.log('Initial font set to:', FONTS[0].family);

        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % FONTS.length;
            // Use setProperty with 'important' to override any CSS rules
            title.style.setProperty('font-family', FONTS[i].family, 'important');
            title.style.setProperty('font-style', FONTS[i].style, 'important');
            console.log(`Font changed to [${i}]:`, FONTS[i].family, FONTS[i].style);
        }, 120);

        return () => {
            console.log('Font animation cleanup');
            clearInterval(interval);
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
                            <li>Γ¥î Theory-based exams</li>
                            <li>Γ¥î Just motivational talks</li>
                            <li>Γ¥î Generic placement training</li>
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
                                <p className={styles.oldText}>Memorize ΓåÆ write ΓåÆ forget.</p>
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
                                    ΓÇó Production code<br />ΓÇó Real users<br />ΓÇó Live feedback
                                </p>
                            </div>
                            <div className={styles.card}>
                                <h3>PRESSURE</h3>
                                <p style={{ marginTop: '12px', color: '#CBD5E1' }}>Operate under real startup conditions.</p>
                                <p style={{ marginTop: '8px', color: '#94A3B8', fontSize: '15px', lineHeight: 1.6 }}>
                                    ΓÇó Daily reviews<br />ΓÇó Deadlines<br />ΓÇó Ownership mindset
                                </p>
                            </div>
                            <div className={styles.card}>
                                <h3>PROOF</h3>
                                <p style={{ marginTop: '12px', color: '#CBD5E1' }}>Show outcomes, not certificates.</p>
                                <p style={{ marginTop: '8px', color: '#94A3B8', fontSize: '15px', lineHeight: 1.6 }}>
                                    ΓÇó Portfolio<br />ΓÇó Metrics<br />ΓÇó Investor-ready demos
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
                        className={styles.ctaButton}
                        onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Apply to Launchpad ΓåÆ
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
