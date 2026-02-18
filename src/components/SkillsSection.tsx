import { motion } from 'motion/react';
import { Palette, Code, TrendingUp, BarChart3, Lightbulb, Rocket } from 'lucide-react';
import RadialOrbitalTimeline from './ui/radial-orbital-timeline';

export function SkillsSection() {
    // 6 nodes alternating: Entrepreneur (red) and Career (blue)
    const timelineData = [
        // 🔴 ENTREPRENEUR - Startup Foundations
        {
            id: 1,
            title: 'Startup Foundations',
            date: 'Entrepreneur Track',
            content: [
                'Master lean startup frameworks from ideation to MVP.',
                'Validate business models & navigate early-stage challenges.',
                'Build a solid foundation for a scalable venture.'
            ] as any,
            category: 'Entrepreneur',
            icon: Rocket,
            relatedIds: [2, 6],
            status: 'completed' as const,
            energy: 95,
        },
        // 🔵 CAREER - Tech & Development
        {
            id: 2,
            title: 'Tech & Development',
            date: 'Career Track',
            content: [
                'Build production-grade apps with modern full-stack tech.',
                'Master cloud infrastructure, DevOps, and scalable architecture.',
                'Deploy robust, high-performance software solutions.'
            ] as any,
            category: 'Career',
            icon: Code,
            relatedIds: [1, 3],
            status: 'in-progress' as const,
            energy: 90,
        },
        // 🔴 ENTREPRENEUR - Growth & Marketing
        {
            id: 3,
            title: 'Growth & Marketing',
            date: 'Entrepreneur Track',
            content: [
                'Unlock explosive growth with data-driven strategies.',
                'Master content marketing, SEO, and paid channels.',
                'Optimize funnels for maximum conversion.'
            ] as any,
            category: 'Entrepreneur',
            icon: TrendingUp,
            relatedIds: [2, 4],
            status: 'completed' as const,
            energy: 85,
        },
        // 🔵 CAREER - Creative & Design
        {
            id: 4,
            title: 'Creative & Design',
            date: 'Career Track',
            content: [
                'Craft brand identities that resonate deeply.',
                'Master UI/UX principles for intuitive interfaces.',
                'Tell compelling visual stories that elevate your product.'
            ] as any,
            category: 'Career',
            icon: Palette,
            relatedIds: [3, 5],
            status: 'in-progress' as const,
            energy: 80,
        },
        // 🔴 ENTREPRENEUR - Business Operations
        {
            id: 5,
            title: 'Business Operations',
            date: 'Entrepreneur Track',
            content: [
                'Build operational backbone with financial modeling.',
                'Master legal frameworks and team management.',
                'Ensure efficient scaling without friction.'
            ] as any,
            category: 'Entrepreneur',
            icon: BarChart3,
            relatedIds: [4, 6],
            status: 'completed' as const,
            energy: 75,
        },
        // 🔵 CAREER - Leadership & Management
        {
            id: 6,
            title: 'Leadership & Management',
            date: 'Career Track',
            content: [
                'Cultivate executive presence and strategic decision-making.',
                'Navigate organizational dynamics to inspire shared vision.',
                'Develop emotional intelligence for high-performance teams.'
            ] as any,
            category: 'Career',
            icon: Lightbulb,
            relatedIds: [5, 1],
            status: 'in-progress' as const,
            energy: 70,
        },
    ];

    return (
        <section
            id="curriculum"
            className="relative z-20 overflow-hidden bg-[#020617] py-10"
        >
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4 mb-4">
                <motion.div
                    className="text-center max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase">Interactive Curriculum</span>
                    </div>

                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl text-white mb-6 tracking-tight"
                        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900 }}
                    >
                        What Students <br />
                        <span
                            className="block mt-2 lp-text-gradient pb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900 }}
                        >
                            Actually Learn
                        </span>
                    </h2>

                    <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
                        We don't just teach theory. We build <span className="text-white font-medium border-b border-blue-500/30 pb-0.5">market-ready capabilities</span> by combining an entrepreneurial mindset with high-demand technical skills.
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-grow flex items-center"
            >
                <RadialOrbitalTimeline
                    timelineData={timelineData}
                />
            </motion.div>
        </section>
    );
}
