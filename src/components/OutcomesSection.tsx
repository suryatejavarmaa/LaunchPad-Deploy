import styles from './OutcomesSection.module.css';

export function OutcomesSection() {
    return (
        <section className={`${styles.section} ${styles.sectionAlt}`} id="outcomes">
            <div className={styles.header}>
                <h1>Real <span className={styles.grad}>Outcomes</span> for Students</h1>
                <p>What do you get after this program?</p>
            </div>

            <div className={styles.outcomesTwoCol}>
                {/* LEFT: WHAT YOU GET */}
                <div>
                    <h3 className={styles.colTitle}>What You Get After This Program</h3>

                    <div className={styles.outcomeList}>
                        <div className={styles.outcomeItem}>
                            <span className={styles.oiIcon}>🎁</span>
                            <div>
                                <strong>Elite Internships</strong>
                                <p>Access to high-quality internships aligned with real startup needs.</p>
                            </div>
                        </div>

                        <div className={styles.outcomeItem}>
                            <span className={styles.oiIcon}>🛠️</span>
                            <div>
                                <strong>Hands-on Project Experience</strong>
                                <p>Work on real problems, not mock assignments or theory-only tasks.</p>
                            </div>
                        </div>

                        <div className={styles.outcomeItem}>
                            <span className={styles.oiIcon}>📂</span>
                            <div>
                                <strong>Portfolio-Ready Work</strong>
                                <p>Documented outcomes you can confidently show to employers or investors.</p>
                            </div>
                        </div>

                        <div className={styles.outcomeItem}>
                            <span className={styles.oiIcon}>🏅</span>
                            <div>
                                <strong>Leadership Badges & Recognition</strong>
                                <p>Visible proof of responsibility, ownership, and execution capability.</p>
                            </div>
                        </div>

                        <div className={styles.outcomeItem}>
                            <span className={styles.oiIcon}>🚀</span>
                            <div>
                                <strong>Investor & Partner Exposure</strong>
                                <p>Opportunities to pitch ideas directly to founders and early investors.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: GROWTH ROLES */}
                <div className={styles.outcomesRight}>
                    <h3 className={styles.colTitle}>Possible Growth Roles</h3>

                    <div className={styles.growthMap}>
                        <div className={`${styles.growthItem} ${styles.heads}`}><span className={styles.growthIcon}>👥</span><div><strong>Department Heads</strong><p>Lead teams and execute strategies aligned with company goals.</p></div></div>
                        <div className={`${styles.growthItem} ${styles.leaders}`}><span className={styles.growthIcon}>🎯</span><div><strong>Strategic Leaders</strong><p>Drive long-term vision and high-impact decision making.</p></div></div>
                        <div className={`${styles.growthItem} ${styles.founders}`}><span className={styles.growthIcon}>🚀</span><div><strong>Startup Founders</strong><p>Build and scale your own ventures with full-stack competence.</p></div></div>
                        <div className={`${styles.growthItem} ${styles.execs}`}><span className={styles.growthIcon}>👑</span><div><strong>Early-stage Executives</strong><p>Take ownership of core business functions.</p></div></div>
                        <div className={`${styles.growthItem} ${styles.pm}`}><span className={styles.growthIcon}>📈</span><div><strong>Global Product Managers</strong><p>Bridge engineering, design, and business to launch products.</p></div></div>
                    </div>
                </div>
            </div>

            <p className={styles.finalNote}>Income grows with capability, not certificates.</p>
        </section>
    );
}
