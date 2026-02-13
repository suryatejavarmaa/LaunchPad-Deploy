import { motion } from 'motion/react';

export function WhatIsLaunchpad() {
    return (
        <section
            id="what-is-launchpad"
            className="py-16 md:py-24 relative overflow-hidden"
            style={{ backgroundColor: 'var(--lp-bg-solid)' }}
        >
            {/* Subtle background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
                    style={{
                        background: 'radial-gradient(ellipse, rgba(0, 169, 255, 0.08) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center"
                >
                    {/* Section Header */}
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-8 text-white"
                        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900 }}
                    >
                        What is <span className="lp-text-gradient inline-block">Launchpad</span>?
                    </h2>

                    {/* Main Explanation - Glassmorphic Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="rounded-2xl p-8 md:p-10"
                        style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 0 60px rgba(0, 169, 255, 0.1)',
                        }}
                    >
                        {/* Primary Statement */}
                        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-300 mb-6">
                            Launchpad is a structured <span className="text-white font-semibold">90-day execution ecosystem</span> designed
                            to convert students and young professionals into entrepreneurs, operators, or high-impact professionals.
                        </p>

                        {/* Divider */}
                        <div
                            className="w-24 h-px mx-auto my-6"
                            style={{
                                background: 'linear-gradient(to right, transparent, var(--lp-red) 30%, var(--lp-blue) 70%, transparent)'
                            }}
                        />

                        {/* Secondary Statement */}
                        <p className="text-base md:text-lg text-slate-300">
                            This is <span className="text-white font-medium">not theory-based learning</span>.
                            This is <span className="text-white font-medium">real work, real pressure, and real outcomes</span>.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
