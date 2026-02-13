import styles from './GamificationSection.module.css';

export function GamificationSection() {
    return (
        <section className={styles.gamificationSection} id="gamification">
            <div className={styles.gamiContainer}>

                <div className={styles.gamiHeader}>
                    <h2>Gamification & Competition</h2>
                    <p>Because growth should feel rewarding</p>
                </div>

                <div className={styles.gamiGrid}>

                    <div className={`${styles.gamiCard} ${styles.gold}`}>
                        <div className={styles.gamiIcon}>🏆</div>
                        <h4>Leaderboards</h4>
                        <p>See where you rank among peers in real-time</p>
                    </div>

                    <div className={`${styles.gamiCard} ${styles.red}`}>
                        <div className={styles.gamiIcon}>🎮</div>
                        <h4>Games & Challenges</h4>
                        <p>Level up through engaging weekly challenges</p>
                    </div>

                    <div className={`${styles.gamiCard} ${styles.blue}`}>
                        <div className={styles.gamiIcon}>📊</div>
                        <h4>Performance Tracking</h4>
                        <p>Data-driven insights on your progress</p>
                    </div>

                    <div className={`${styles.gamiCard} ${styles.purple}`}>
                        <div className={styles.gamiIcon}>🎖️</div>
                        <h4>Rewards & Recognition</h4>
                        <p>Earn badges and unlock achievements</p>
                    </div>

                </div>

                <div className={styles.gamiFooter}>
                    <p>Launchpad is a <strong>real startup environment</strong>.</p>
                    <p>Performance is <strong>visible, tracked, and rewarded</strong>.</p>
                </div>

            </div>
        </section>
    );
}
