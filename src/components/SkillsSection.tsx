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
            content: 'Transform your innovative ideas into viable business ventures. Learn lean startup methodology, validate your concepts, develop MVPs, and master the art of pitching to investors. Build the entrepreneurial mindset needed to disrupt industries.',
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
            content: 'Master modern development stacks and build production-grade applications. Learn full-stack development, cloud infrastructure, AI/ML integration, and DevOps practices that top companies demand from their engineering teams.',
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
            content: 'Drive explosive startup growth through strategic marketing. Master viral loops, content strategy, paid acquisition, SEO, and the art of turning users into passionate advocates who fuel your startup\'s organic expansion.',
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
            content: 'Craft compelling brand identities and user experiences that captivate. Master design systems, visual storytelling, UI/UX principles, and create designs that leave lasting impressions and differentiate products in the market.',
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
            content: 'Build scalable business systems and operational excellence. Master financial modeling, team management, supply chain optimization, legal frameworks, and create the infrastructure that supports rapid startup growth.',
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
            content: 'Develop executive presence and leadership capabilities. Master team dynamics, strategic planning, stakeholder management, and AI-powered decision making to lead organizations through digital transformation.',
            category: 'Career',
            icon: Lightbulb,
            relatedIds: [5, 1],
            status: 'in-progress' as const,
            energy: 70,
        },
    ];

    return (
        <section
            id="skills"
            className="relative overflow-hidden bg-[#020617]"
        >
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4 pt-20 pb-0">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-12 lg:mb-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
                        Curriculum
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        What Students <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Actually Learn</span>
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Beyond theory, we focus on the high-impact skills that drive real-world success in both entrepreneurial ventures and corporate careers.
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <RadialOrbitalTimeline
                    timelineData={timelineData}
                />
            </motion.div>
        </section>
    );
}
