import { motion } from 'motion/react';
import styles from './ApplicationForm.module.css';
import ElectricBorder from './ui/electric-border';
import QRCode from 'react-qr-code';
import { ArrowRight, Zap } from 'lucide-react';
import { InteractiveRobotSpline } from './ui/interactive-3d-robot';

export function ApplicationForm() {
  // Placeholder Link - Replace with actual form URL
  const registrationLink = "https://forms.gle/placeholder";
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  return (
    <section id="application" className="py-20 flex justify-center items-center overflow-hidden relative">
      {/* Background Gradients from User CSS */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
                    radial-gradient(circle at 20% 25%, rgba(177,18,44,0.35), transparent 45%),
                    radial-gradient(circle at 80% 75%, rgba(0,169,255,0.35), transparent 45%),
                    #05070d
                `,
        zIndex: 0
      }} />

      <div className={styles.section}>
        {/* LEFT COLUMN */}
        <div className={styles.left}>
          <motion.div
            className={styles.headline}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h1>Join Launchpad</h1>
          </motion.div>

          <motion.div
            className={styles.subheading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Program Designed for Future Founders & Builders
          </motion.div>

          <div className={styles.topArea}>
            {/* Robot Box - Using ElectricBorder for "Robot Preview Block" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ width: '100%' }}
            >
              <div className={styles.robotBox}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  transform: 'scale(0.85) translateY(5%)', // Moved up slightly to reduce top space and show base
                  transformOrigin: 'center center'
                }}>
                  {/* DIAGNOSTIC: Temporarily disabling Spline to check load times */}
                  {/* <InteractiveRobotSpline
                    scene={ROBOT_SCENE_URL}
                    className="w-full h-full"
                  /> */}
                  <div className="w-full h-full flex items-center justify-center text-blue-400/50 text-sm italic">
                    3D Scene Paused (Testing Load Speed...)
                  </div>
                </div>
              </div>
            </motion.div>

            <div className={styles.sideCards}>
              {['Exclusive Founder Network', '12‑Week Intensive Program', '1‑on‑1 Mentorship', 'Investor Access', 'Lifetime Alumni Support'].map((text, i) => (
                <motion.div
                  key={i}
                  className={styles.pill}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                >
                  {text}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className={styles.contentBlob}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p>Build real skills in 12 weeks with elite mentors and direct access to the startup ecosystem.</p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <strong>500+</strong>
                <span>Alumni</span>
              </div>
              <div className={styles.stat}>
                <strong>$50M+</strong>
                <span>Raised</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.right}>
          <motion.div
            className={styles.qr}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <QRCode
              value={registrationLink}
              size={200}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox={`0 0 256 256`}
            />
          </motion.div>

          <motion.div
            className={styles.applyText}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            Scan to apply instantly
          </motion.div>

          <motion.a
            href={registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            Apply Now <ArrowRight size={18} className="ml-2" />
          </motion.a>

          <a href={registrationLink} target="_blank" rel="noopener noreferrer" className={styles.link}>
            Open in Browser
          </a>

          <div className={styles.tagline}>One Life. One Story.</div>
        </div>
      </div>
    </section>
  );
}

