import styles from './BeliefSection.module.css';
import GlitterBackground from './ui/animated-hero-with-web-gl-glitter';

export function BeliefSection() {
    return (
        <section className={styles.section} id="belief">
            <div className={styles.whyBg}></div>

            {/* WebGL Glitter Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <GlitterBackground speed={0.4} intensity={2.5} />
            </div>

            <div className={styles.header}>
                <h1>Why This <span className={styles.grad}>Matters</span> for Your Future</h1>
                <p>This is the line that separates credentials from capability.</p>
            </div>

            <div className={styles.whyContrast}>
                <div className={`${styles.whyBlock} ${styles.negative}`}>
                    <h3>🚫 The future does <strong>NOT</strong> belong to</h3>
                    <ul>
                        <li>🎓 Degree holders</li>
                        <li>📜 Certificate collectors</li>
                        <li>🔍 Job seekers</li>
                    </ul>
                </div>

                <div className={styles.whyDivider}>
                    <span>VS</span>
                </div>

                <div className={`${styles.whyBlock} ${styles.positive}`}>
                    <h3>✅ The future <strong>BELONGS</strong> to</h3>
                    <ul>
                        <li>🛠️ Builders</li>
                        <li>🧠 Decision makers</li>
                        <li>👑 Leaders</li>
                        <li>💡 Problem solvers</li>
                    </ul>
                </div>
            </div>

            <div className={styles.whyStatement}>
                <p className={styles.lineMuted}><span>Bristletech</span> does not create followers.</p>
                <p className={styles.lineBold}>We create <span>AI leaders, Innovators, and Founders</span> 🚀</p>
            </div>
        </section>
    );
}
