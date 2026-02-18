import { useState, useEffect } from 'react';
import styles from './JourneySection.module.css';
import ElectricBorder from './ui/ElectricBorder';

export function JourneySection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (!isPaused) {
            interval = setInterval(() => {
                setActiveIndex((current) => (current + 1) % 3);
            }, 4000);
        }

        return () => clearInterval(interval);
    }, [isPaused]);

    const handleMouseEnter = (index: number) => {
        setIsPaused(true);
        setActiveIndex(index);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    return (
        <section className={styles.section} id="journey">
            <div className={styles.header}>
                <h1>The 90-Day Transformation</h1>
                <p>Three phases. One complete transformation.</p>
            </div>

            <div className={styles.timeline}>
                {/* Card 1: Foundation (Ice Theme) */}
                <ElectricBorder
                    color="#00A9FF"
                    borderRadius={22}
                    className={`${styles.card} ${styles.foundation} ${activeIndex === 0 ? styles.active : ''}`}
                    onMouseEnter={() => handleMouseEnter(0)}
                    onMouseLeave={handleMouseLeave}
                    active={activeIndex === 0}
                >
                    <div className={styles.cardContent}>
                        <div className={styles.phase}>
                            <div className={styles.badge}>01</div>
                            <strong>Foundation</strong>
                        </div>
                        <h3>Build the Core</h3>
                        <ul>
                            <li>Strong core skills</li>
                            <li>AI tool mastery</li>
                            <li>Professional mindset</li>
                            <li>Department basics</li>
                        </ul>
                    </div>
                    <div className={styles.hoverContent}>
                        <p>Day 1–30: Skill & mindset reset</p>
                        <span>Focus on fundamentals, clarity, and professional habits.</span>
                    </div>
                    <div className={styles.cardBorder} />
                </ElectricBorder>

                {/* Card 2: Execution (Dual Theme) */}
                <ElectricBorder
                    color="#B1122C" // Fallback
                    gradientColors={['#B1122C', '#FF3A4A', '#00A9FF']}
                    borderRadius={22}
                    className={`${styles.card} ${styles.execution} ${activeIndex === 1 ? styles.active : ''}`}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                    active={activeIndex === 1}
                >
                    <div className={styles.cardContent}>
                        <div className={styles.phase}>
                            <div className={styles.badge}>02</div>
                            <strong>Execution</strong>
                        </div>
                        <h3>Do Real Work</h3>
                        <ul>
                            <li>Work on real projects</li>
                            <li>Handle real responsibility</li>
                            <li>Collaborate in teams</li>
                            <li>Deliver real outcomes</li>
                        </ul>
                    </div>
                    <div className={styles.hoverContent}>
                        <p>Day 31–60: Real pressure zone</p>
                        <span>Execution under constraints. Real teams. Real output.</span>
                    </div>
                    <div className={styles.cardBorder} />
                </ElectricBorder>

                {/* Card 3: Leadership (Fire Theme) */}
                <ElectricBorder
                    color="#FF3A4A"
                    borderRadius={22}
                    className={`${styles.card} ${styles.leadership} ${activeIndex === 2 ? styles.active : ''}`}
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}
                    active={activeIndex === 2}
                >
                    <div className={styles.cardContent}>
                        <div className={styles.phase}>
                            <div className={styles.badge}>03</div>
                            <strong>Leadership</strong>
                        </div>
                        <h3>Lead Systems</h3>
                        <ul>
                            <li>Build systems</li>
                            <li>Create SOPs</li>
                            <li>Pitch ideas</li>
                            <li>Lead operations</li>
                        </ul>
                    </div>
                    <div className={styles.hoverContent}>
                        <p>Day 61–90: Ownership mode</p>
                        <span>Systems thinking, decisions, and leadership mindset.</span>
                    </div>
                    <div className={styles.cardBorder} />
                </ElectricBorder>
            </div>

            <div className={styles.outcome}>
                <p className={styles.outcomeLine}>By Day 90, students are no longer learners.</p>
                <p className={styles.outcomeHighlight}>They are <span>leaders in training</span>.</p>
                <p className={styles.outcomeSub}>No confusion. No half-learning. One clear outcome.</p>
            </div>
        </section>
    );
}
