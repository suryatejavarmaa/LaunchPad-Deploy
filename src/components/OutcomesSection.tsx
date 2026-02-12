import styles from './OutcomesSection.module.css';

export function OutcomesSection() {
    return (
        <section className={`${styles.section} ${styles.sectionAlt}`}>
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
                        <div className={`${styles.growthItem} ${styles.heads}`}><span className={styles.growthIcon}>👥</span>Department Heads</div>
                        <div className={`${styles.growthItem} ${styles.leaders}`}><span className={styles.growthIcon}>🎯</span>Strategic Leaders</div>
                        <div className={`${styles.growthItem} ${styles.founders}`}><span className={styles.growthIcon}>🚀</span>Startup Founders</div>
                        <div className={`${styles.growthItem} ${styles.execs}`}><span className={styles.growthIcon}>👑</span>Early-stage Executives</div>
                    </div>
                </div>
            </div>

            <p className={styles.finalNote}>Income grows with capability, not certificates.</p>
        </section>
    );
}
